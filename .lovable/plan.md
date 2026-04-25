## Goal

Port the **visual language and layout structure** of `untillabs.com/our-team` onto the shop page (`/rooms`), while keeping:
- All shop functionality (search, filters, cart, product grid, pagination)
- Your existing tomato-red + cream brand palette

This is a **visual restyle only**, not a true 1-to-1 clone — Untillabs is a team directory, your page is e-commerce, so a literal copy isn't possible.

---

## What changes (section by section)

### 1. Hero — ditch the split-panel, go centered & atmospheric

Replace the current red/image split hero with Untillabs' centered, full-bleed style:

- **Full-width hero** (~90vh) with a soft, cloudy **tomato-red gradient background** (radial blurs from `hsl(8 72% 42%)` to a warmer `hsl(8 72% 55%)`) — same dreamy "sky" vibe but in your brand red instead of blue.
- **Centered monospace tagline** in parentheses near the top: `( fresh from karwan bazar, hourly. )` — small, ivory, letter-spaced, monospace font (use a Google mono like `JetBrains Mono` or reuse `Space Grotesk` at small caps).
- **Oversized hero title** centered at the bottom of the hero — a single huge word/phrase like `The Shop` (or `Fresh Today`) in a large display sans (Fraunces is already loaded, or use Inter Black). Cream-colored, ~clamp(5rem, 14vw, 13rem).
- **Search bar** sits as a centered pill below the tagline (frosted glass on the red), much smaller and quieter than the current giant search.
- **Hero hero-image is removed** from this layout — the empty atmospheric red is the point. (We keep the optimized webp assets in case you want them back.)

### 2. Intro paragraph block (new — mirrors Untillabs' "We value signal over status")

Directly under the hero, a centered narrow column on cream background:

- Small uppercase eyebrow: `( Our shelves )`
- Big editorial sub-headline: `We stock what we'd cook tonight.`
- One paragraph of body copy explaining the philosophy (sourcing, freshness, no upsells), max-width ~640px, centered.

### 3. Filter strip — keep, but quieter

The cream filter ribbon stays where it is. Adjustments:

- Drop the heavy borders, switch chips to flat text-buttons separated by hairlines (Untillabs nav style).
- Active chip = underline + tomato color, not a filled pill.
- Right-side controls (price slider, picks toggle, sort) become smaller and lighter-weight.

### 4. Product grid — restyled to look like Untillabs' team cards

This is the biggest visual shift. Cards become minimal "portrait" tiles:

- Remove the wood-crate background, nail-heads, dark gradient overlay, chalk badges, and all decorative tilt.
- Card = **image only** in a clean rounded rectangle (`rounded-2xl`), no border, no shadow, hover = subtle lift.
- Below image (outside the frame, like Untillabs): **product name** as a medium-weight serif/sans heading, then **a single muted line** for "role" — in your case, `category · price` (e.g. `Fish · ৳480/kg`).
- One small **"Basket" link/button** per card, styled like their `CONNECT` link — ivory-on-red pill on hover, plain underlined text by default, bottom-right of the card.
- Grid: `2 → 3 → 4` columns (matches their `2 → 4` density on desktop).
- Remove the AisleDivider component from this page entirely (their site has no equivalent).

### 5. Values strip — new section before the footer

Mirrors their "What We Care About" block:

- Section heading: `What we care about`
- 6 small cells in a `3 × 2` grid (matches them exactly), each with a short bold label + one-line description. Examples tailored to a grocer:
  - `Picked at dawn` — Every minute on the shelf matters.
  - `Real prices` — No surge, no fake discounts.
  - `Honest weights` — What the tag says is what you get.
  - `Swap freely` — Don't love it? Swap or refund.
  - `Family of farms` — We know every supplier by name.
  - `One-hour promise` — Counter to door, every order.
- Cream background, hairline dividers between cells, monospace small caps for labels.

### 6. Sticky basket bar — keep as is (works well)

---

## Layout sketch

```text
┌─────────────────────────────────────────────────────┐
│  [glass navbar pill]                                │  ← unchanged
│                                                      │
│           ( fresh from karwan bazar, hourly. )       │
│                                                      │
│                                                      │  ← red gradient hero
│              [ search this market ]                  │
│                                                      │
│                  T h e   S h o p                     │
└─────────────────────────────────────────────────────┘
                ( Our shelves )
        We stock what we'd cook tonight.
   Short paragraph of philosophy copy here…

  All · Fish · Vegetables · …          [filters · sort]   ← cream strip

  ┌────┐  ┌────┐  ┌────┐  ┌────┐
  │img │  │img │  │img │  │img │
  └────┘  └────┘  └────┘  └────┘
  Mango   Ilish   Tomato  Doi
  Fruit   Fish    Veg     Dairy
  ৳90/kg  ৳480/k  ৳40/kg  ৳180
                                        … infinite scroll

                What we care about
  ┌──────────┬──────────┬──────────┐
  │ Picked   │ Real     │ Honest   │
  │ at dawn  │ prices   │ weights  │
  ├──────────┼──────────┼──────────┤
  │ Swap     │ Family   │ One-hour │
  │ freely   │ of farms │ promise  │
  └──────────┴──────────┴──────────┘

  [footer]
```

---

## Technical details

**Files to edit**
- `src/pages/Rooms.tsx` — full rewrite of hero, filter strip styling, intro block, values block. Remove `AisleDivider` import and split-panel hero markup.
- `src/components/site/ProductCard.tsx` — strip wood-crate styling, dark overlay, badges, nail-heads, chalk text. Move name/meta below image. Replace heavy "Basket" button with text-link CTA.
- `src/index.css` — add a `.untill-mono` utility (monospace tracking-widest small-caps) and a `.untill-display` utility for the oversized hero title. Add a `@keyframes` for a slow gradient drift on the hero background (optional, very subtle).
- `index.html` — add `JetBrains Mono` (or `IBM Plex Mono`) to the existing Google Fonts `<link>` so the parenthetical taglines have a real monospace. Update the route-conditional preload to skip the shop hero image (we no longer use it).
- `public/app-shell` styles in `index.html` — update the `/rooms` app-shell to a centered-on-red layout instead of split, so first paint matches the new hero (no CLS).

**What stays the same**
- All filtering/search/sort/pagination logic in `Rooms.tsx` (the `useMemo`, `useDeferredValue`, IntersectionObserver — all untouched).
- Cart store, sticky basket bar, navbar, footer, routing.
- Brand color tokens in `index.css` (we just use them in new ways).

**What gets removed**
- The split-panel hero (left red sidebar + right produce image)
- The `AisleDivider` between filters and grid (still exists for other pages if needed)
- `font-chalk` / `Permanent Marker` / `Caveat` usage on this page — replaced by mono + display sans
- "Today at the market" chalk eyebrow, "Fresh Today" stamp, floating price tags
- Wood-crate `bg-crate`, nail-heads, dark gradient overlay on product cards

**Performance**
- Hero is now CSS-only (no LCP image) → LCP becomes the hero `<h1>` text, which is faster than any image. The route-preload script in `index.html` becomes a no-op for `/rooms`.
- Product card simplification removes ~6 absolutely-positioned children per card — lighter DOM, faster paint on long scrolls.

**Responsive**
- Hero title scales `clamp(3.5rem, 14vw, 13rem)` so the giant word fits at 320px through 1920px without overflow.
- Product grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`.
- Values grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

---

## Out of scope (flag for follow-up if you want them)

- Untillabs' navbar pill style (you already have a glass pill — keeping yours).
- Their footer / "Join Us" CTA banner — your footer is a different beast.
- Replicating their actual cloudy sky photo — we're using a red gradient instead per your palette choice.
