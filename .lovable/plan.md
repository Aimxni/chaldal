

## Floating Glass Pill Navbar (untillabs.com style)

Transform the current full-width navbar into an animated floating pill that shrinks on scroll-down and expands on scroll-up, with a frosted glass effect throughout.

### Behavior

**At top of hero (expanded state):**
- Navbar spans nearly full width with small side margins (~24px)
- Subtle translucent tint with light glass blur so it floats over the hero image
- Tall pill height (~64px), generous horizontal padding

**On scroll down (collapsed state):**
- Navbar shrinks horizontally to ~max 1100px, centered, with larger side gutters
- Slightly shorter height (~52px)
- Stronger frosted glass: heavier `backdrop-blur`, more opaque tinted background, soft drop shadow, fine inner border for the "glass rim" look
- All transitions animate together (width, height, padding, radius, blur, shadow, bg) using a smooth easing curve (`--ease-out-expo`, ~500ms)

**Scroll up:** reverses smoothly back to the expanded state.

### Visual treatment

- Pill shape: `rounded-full` at all times
- Glass: `backdrop-blur-xl` + semi-transparent `bg-foreground/30` (dark green tint matching brand) when over hero; switches to a cream-tinted glass after scrolling past hero
- Border: 1px translucent inner border for glass rim (`border-white/15`)
- Shadow: soft elevated shadow appears once collapsed (`shadow-elegant`)
- "Join Us"-style CTA: the existing Cart button stays as the cream/red pill on the right (already matches reference)

### Technical changes

**`src/components/site/Navbar.tsx`**
- Replace the `inset-x-0` fixed header with a centered wrapper using `left-1/2 -translate-x-1/2` and an animated `max-width` (e.g. `max-w-[calc(100vw-32px)]` expanded → `max-w-5xl` collapsed)
- Animate `height`, `padding-x`, `max-width`, `background`, `backdrop-filter`, `box-shadow`, and `border-color` together via Tailwind transitions (`transition-all duration-500 ease-[var(--ease-out-expo)]`)
- Keep the existing `scrolled` boolean (already debounced via rAF) but lower threshold to ~16px so the morph triggers sooner
- Mobile (<md): keep the navbar pill but skip the width-shrink (already nearly full width on small viewports); preserve current mobile drawer
- Keep `onHero` color logic for text/icons; tune the hero state to use a darkened glass tint instead of fully transparent so the pill shape is visible from the start (matches reference)

**`src/index.css`**
- No new tokens required — reuse existing `--ease-out-expo`, `--shadow-elegant`, brand HSLs

### Files touched
- `src/components/site/Navbar.tsx` (main change)

No other files need edits. No new dependencies.

