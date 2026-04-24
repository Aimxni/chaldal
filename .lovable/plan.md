## Trim oversized images flagged by PageSpeed

PageSpeed flagged category tiles, brand logos, and Chaldal nav/footer logos as larger than displayed. I'll resize each asset to ~2x its real display size, recompress, and update each component's `width`/`height` attributes to match the new intrinsic dimensions (clears both the "image too large" and CLS warnings).

### Asset resizing (already prepared)

| Group | Before | After | Notes |
| --- | --- | --- | --- |
| `cat-*.webp` (15 files) | 400×400, 274.9 KB | 320×320 q=72, 163.5 KB | Display ≤195×195 → 320 covers retina |
| `brand-*.webp` (7 files) | 256×~280, ~100 KB | longest side 240, q=70, ~94 KB | Aspect-correct, no longer cropped square |
| `brand-cocacola.png` | 374×226, 4.2 KB (re-sized earlier) | 240×145 palette PNG, 5.1 KB | Aspect-correct |
| `chaldal-logo*.png` (3 files) | 320×104 | 240×78 quantized PNG | ~3.5 KB each |

### Component updates

**`src/components/site/PopularBrands.tsx`** — give each brand its real intrinsic dimensions so the browser doesn't see a 256×256 box for non-square logos:

```ts
const brands = [
  { name: "Pran",      img: brandPran,     w: 240, h: 158 },
  { name: "Reckitt",   img: brandReckitt,  w: 240, h: 124 },
  { name: "Nestlé",    img: brandNestle,   w: 232, h: 240 },
  { name: "Unilever",  img: brandUnilever, w: 216, h: 240 },
  { name: "Marico",    img: brandMarico,   w: 240, h: 208 },
  { name: "Godrej",    img: brandGodrej,   w: 240, h: 116 },
  { name: "Coca-Cola", img: brandCocaCola, w: 240, h: 145 },
  { name: "Fresh",     img: brandFresh,    w: 240, h: 128 },
];
```

Then on the `<img>`: `width={b.w} height={b.h}` instead of the hardcoded 256/256.

**`src/components/site/CategoryGrid.tsx`** — change `width={400} height={400}` → `width={320} height={320}`.

**`src/components/site/Navbar.tsx`** — both `<img>` tags: `width={320} height={104}` → `width={240} height={78}`.

**`src/components/site/Footer.tsx`** — logo `<img>`: `width={320} height={104}` → `width={240} height={78}`.

No layout/visual change — every image is still sized via Tailwind classes (`h-9`, `h-11`, aspect-square). Only the underlying pixel dimensions and `width/height` HTML attributes change.
