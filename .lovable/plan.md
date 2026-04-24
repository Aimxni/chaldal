## Fix low-contrast eyebrow text on "Shop & Get More" cards

Remove `opacity-70` from the eyebrow label in `src/components/site/ShopAndGetMore.tsx` so it renders fully opaque against each card background, clearing the WCAG AA contrast warning for "EGG CLUB" and "DAILY SAVINGS".

### Change

In `src/components/site/ShopAndGetMore.tsx`, update the eyebrow `<p>`:

- Before: `className="text-[11px] uppercase tracking-[0.32em] opacity-70"`
- After: `className="text-[11px] uppercase tracking-[0.32em]"`

Each card already sets a high-contrast text color via its `tone` (`text-primary-foreground`, `text-accent-foreground`, `text-background`), so removing the opacity restores full contrast without any other changes. Body copy stays at `opacity-90` (already passing).
