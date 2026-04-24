# Premium buttons — three directions

Right now buttons across the site use one-off Tailwind classes (Hero "Start", Footer "Get app", FeaturedDeals "+", JoinFamily card CTAs, Navbar location chip, etc.). They work but feel utility-grade — flat fills, abrupt color swaps on hover, no depth, no signature press feedback.

Below are three cohesive design directions. Pick one (or mix) and I'll roll it out as a reusable system.

---

## Option A — Editorial Sun (warm, brand-forward)

Leans into Chaldal's sun-yellow + tomato. Feels confident and editorial, like a high-end grocer's printed campaign.

- Primary CTA: solid `--accent` (sun yellow) with a subtle warm gradient (`gradient-sun`), deep ink text, 1px inner highlight on top edge, soft drop shadow that lifts ~2px on hover.
- Secondary: cream/ivory fill with a hairline tomato border, ink text.
- Ghost: transparent with leaf-green underline that grows on hover.
- Icon button (e.g. FeaturedDeals "+"): circular, gradient-sun fill, soft glow shadow, gentle scale on press.
- Micro-interaction: 220ms ease-out on transform + shadow. No color "flip" — hover deepens the existing tone.

Best if: you want buttons that feel uniquely Chaldal and grab attention.

## Option B — Quiet Luxury (refined, restrained)

Inspired by Aesop / Apple — almost no color, all in the typography and spacing.

- Primary CTA: deep leaf-green (`--primary`) flat fill, generous horizontal padding, slightly tighter letter-spacing (`tracking-wide`), 12px uppercase label, no shadow at rest, tiny shadow + 1px lift on hover.
- Secondary: 1px ink border, transparent fill, ink text. Hover fills with ink, text inverts to cream — but transitioned smoothly (300ms).
- Ghost / link: text + animated underline (left-to-right reveal).
- Icon button: square-ish 12px radius (instead of full pill), neutral surface, accent ring on focus.
- Type: switch CTA labels to `font-display` (Fraunces) at small sizes for a couture feel — *or* keep Inter but tighten tracking.

Best if: you want to read as premium / mature without shouting.

## Option C — Soft Neumorphic Glass (tactile, modern)

Buttons feel like physical objects with light passing through them. Subtle, not 2010-skeuomorphic.

- Primary CTA: leaf-green base with a soft top-to-bottom inner gradient, layered shadows (one tight + one wide diffuse), 1px highlight on top edge, 1px shadow on bottom edge. On press, shadows collapse inward (active state actually feels clicked).
- Secondary: frosted-glass effect — `bg-white/60 backdrop-blur` with hairline border, works beautifully on the green AppDownload panel and image-heavy areas.
- Icon button: 3D pill with the same inner-gradient + double-shadow recipe.
- Hover: shadow expands and the button lifts 1–2px (`translate-y`). Press: shadow contracts, button drops back.
- Optional: shimmer sweep on primary CTA hover (re-uses the existing `hero-shimmer` keyframe).

Best if: you want depth and tactile feedback without losing the editorial feel.

---

## What gets touched (any option)

I'll create a single source of truth so we don't keep re-implementing button styles inline:

1. **New `src/components/ui/btn.tsx`** — a tiny variant-driven component (`variant: primary | secondary | ghost | icon`, `size: sm | md | lg`). No new dependency — just `cva`-style class composition (already in `lib/utils.ts` via `cn`).
2. **Add 2–3 utility classes in `src/index.css`** under `@layer components` for the chosen recipe (e.g. `.btn-primary`, `.btn-icon`, `.btn-press`) so the look is consistent and easy to tweak globally.
3. **Refactor existing call sites** to use the new component / classes:
   - `Hero.tsx` — "Start" submit button
   - `Footer.tsx` — "Get app", language toggle, help bubble
   - `FeaturedDeals.tsx` — circular "+" add-to-cart
   - `JoinFamily.tsx` — card CTA arrows (keep as text + arrow, just refine)
   - `Navbar.tsx` — location chip, login button, mobile menu trigger
   - `AppDownload.tsx` — store badge area (keep image badges, but unify any text CTAs)
   - `Checkout.tsx` & `RoomDetail.tsx` — primary action buttons
4. **Focus states** — every variant gets a visible accent-color focus ring (accessibility).
5. **Reduced motion** — all hover/press transforms disabled under `prefers-reduced-motion`.

## Technical notes

- No new dependencies. Pure Tailwind + a few CSS custom properties already defined (`--shadow-soft`, `--shadow-glow`, `--ease-out-expo`).
- Bundle impact: ~negligible (one small component file, a handful of utility classes). Removes inline class duplication on net.
- Keeps the 8-component `ui/` directory we just slimmed down — `btn.tsx` is a small, intentional addition, not a re-introduction of shadcn `button.tsx`.
- Performance: no `framer-motion`, no JS animation, no layout thrash. All transitions are `transform` + `box-shadow` + `background` (compositor-friendly).

---

**Tell me which direction (A, B, or C)** — or call out specific bits to mix (e.g. "B for primary, but C's icon button"). Once you pick, I'll implement the full system and refactor every site button in one pass.
