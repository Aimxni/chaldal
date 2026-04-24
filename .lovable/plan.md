## Goal

Eliminate the "image larger than displayed dimensions" warnings on the category tiles (and apply the same pattern to brand logos) by serving **responsive images** — multiple resolutions per image, with the browser picking the smallest one that still looks crisp.

## Why srcset + sizes

A single 320×320 file wastes bytes on mobile (displayed at ~195×195) but is too small for a 2× retina display showing the tile at ~195×195 (which actually wants ~390×390 source pixels).

`srcset` + `sizes` lets us ship:
- a small variant (~200px) for 1× mobile
- a medium variant (~400px) for 2× mobile / 1× desktop
- the original 320 stays as the fallback `src` for old browsers

The browser reads `sizes` to know the CSS slot width at each breakpoint, multiplies by device pixel ratio, then picks the closest `srcset` entry.

## Scope

1. **Category tiles** — `src/assets/cat-*.webp` (15 files) and `src/components/site/CategoryGrid.tsx`
2. **Brand logos** — `src/assets/brand-*.webp` and `.png` (8 files) and `src/components/site/PopularBrands.tsx`

The Chaldal header/footer logo is already correctly sized at 240×78 — no change needed there.

## Steps

### 1. Generate resized variants for every category image

Re-encode each `src/assets/cat-*.webp` into two extra sizes alongside the existing 320 file:

```text
src/assets/cat-fruits.webp        (existing — keep as fallback, treat as 320w)
src/assets/cat-fruits-200.webp    (new — for 1× mobile)
src/assets/cat-fruits-400.webp    (new — for 2× retina / desktop)
```

Use ImageMagick (already available via `nix run nixpkgs#imagemagick`) with WebP quality 80 for visual parity with the existing files.

Repeat for all 15 cat-*.webp files.

### 2. Update `CategoryGrid.tsx` to emit srcset

Replace the static `import` per file with a small helper that imports all three sizes, then render:

```tsx
<img
  src={c.img}                          // 320 fallback
  srcSet={`${c.img200} 200w, ${c.img} 320w, ${c.img400} 400w`}
  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
  alt={c.name}
  width={320}
  height={320}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover ..."
/>
```

The `sizes` mirrors the Tailwind grid breakpoints already in the component:
- `lg:grid-cols-6` (≥1024px) → each tile ≈ 16vw
- `md:grid-cols-4` (≥768px) → 25vw
- `sm:grid-cols-3` (≥640px) → 33vw
- mobile → 50vw

### 3. Same treatment for brand logos

The `PopularBrands.tsx` `brands` array currently has per-logo `w`/`h`. Generate `-half` variants of each brand asset (roughly half the pixel width of the source) and add `srcSet` with `1x` / `2x` descriptors — simpler than `w` descriptors since logos use fixed dimensions, not fluid grid cells:

```tsx
<img
  src={b.img}
  srcSet={`${b.imgHalf} 1x, ${b.img} 2x`}
  width={b.w}
  height={b.h}
  ...
/>
```

### 4. Verify

- Run `bun run build` to confirm Vite bundles all the new asset imports cleanly.
- Spot-check that hashed filenames appear under `dist/assets/` for each new variant.

## Expected payload reduction

For the category grid alone:
- Current: 15 tiles × ~10 KB avg = ~150 KB
- After (mobile, 1×): 15 × ~4 KB = ~60 KB → saves ~90 KB on mobile
- 2× retina mobile keeps quality (uses the 400 variant) at ~6 KB each, still lighter than today's 320 file at 2× upscale

This clears the Lighthouse "properly size images" warning across both sections.

## Technical notes

- WebP encode command: `convert input.webp -resize 200x200 -quality 80 output-200.webp`
- Vite handles the new imports automatically — each becomes a hashed asset URL.
- We keep `width`/`height` attributes on the intrinsic 320 size so layout reservation still works correctly; the browser uses these for aspect ratio regardless of which `srcset` entry it picks.
- No change needed to `SmartImage` — it already spreads `...props`, so `srcSet`/`sizes` flow through if we ever migrate the category grid to use it.

## Out of scope

- Migrating to `<picture>` with AVIF — WebP is already excellent and adds complexity for marginal gains.
- Build-time image optimization plugin (e.g. `vite-imagetools`) — overkill for ~25 static assets; manual variants are simpler and fully cached.
