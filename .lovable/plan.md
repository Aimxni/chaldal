# Recover desktop PageSpeed score (49 → ~99)

## Root cause recap

The previous change set `loading="eager"` + `fetchPriority="high"` on ~22 below-the-fold images (6 category tiles, 8 brand logos, 1 phone image). On desktop these now compete with the hero LCP image for bandwidth and main-thread decode time, and the 8 brand PNGs alone weigh ~734KB. That tanked LCP and Total Blocking Time → score dropped to 49.

## Step 1 — Revert eager loading on below-fold images

**`src/components/site/CategoryGrid.tsx`**
- Remove the `eager = i < 6` logic.
- Restore `loading="lazy"` and `fetchPriority="auto"` (or just drop the prop) for all 12 tiles.

**`src/components/site/PopularBrands.tsx`**
- Change all 8 brand `<img>` tags from `loading="eager"` to `loading="lazy"`.

**`src/components/site/AppDownload.tsx`**
- Change the phone `<img>` from `loading="eager"` back to `loading="lazy"`.

These sections sit well below the fold; lazy loading is the correct default and frees the network for the hero LCP.

## Step 2 — Convert brand PNGs to WebP (~734KB → ~70-80KB)

For each of the 8 logos in `src/assets/`:
- `brand-cocacola.png` (9.2K), `brand-fresh.png` (108K), `brand-godrej.png` (181K), `brand-marico.png` (49K), `brand-nestle.png` (133K), `brand-pran.png` (19K), `brand-reckitt.png` (77K), `brand-unilever.png` (158K)

Actions:
1. Use `cwebp -q 85` (or `sharp` via a quick Node script) to produce `brand-*.webp` versions at 512×512.
2. Update imports in `src/components/site/PopularBrands.tsx` from `.png` → `.webp`.
3. Delete the original `.png` files to keep the bundle clean.

Expected per-logo size: 5-15KB. Total drop: ~734KB → ~80KB across the strip.

## Step 3 — Verify

After redeploy, re-run PageSpeed on the published URL. Expected outcome:
- Desktop score back to ~95-99
- LCP improves (hero no longer competing with brand PNG downloads)
- Total page weight drops by ~650KB

## What we are NOT doing

- Not touching the hero image, fonts, or `index.html` — those are already optimal.
- Not removing `LazyRoomCard` or `whileInView` (none present on homepage anyway).
- Not changing route-level lazy loading.

## Files edited

- `src/components/site/CategoryGrid.tsx` (revert eager flags)
- `src/components/site/PopularBrands.tsx` (lazy + .webp imports)
- `src/components/site/AppDownload.tsx` (lazy phone)
- `src/assets/brand-*.webp` (8 new files)
- `src/assets/brand-*.png` (8 files deleted)

Approve to switch to default mode and execute.