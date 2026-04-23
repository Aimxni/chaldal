import heroImg from "@/assets/hero-groceries.jpg";

// Preloaded as WebP via <link rel="preload"> in index.html for fastest LCP.
const HERO_WEBP = "/images/hero-groceries.webp";

/**
 * Hero — the LCP element. Pure CSS animations, NO framer-motion.
 * - LCP h1 has no animation-delay
 * - LCP fade starts at opacity: 0.01 (Lighthouse rule)
 * - Hero image preloaded with fetchpriority="high" in index.html
 */
const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background bg-grain">
      {/* Decorative ripe-tomato blob — pure CSS, no main-thread cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-leaf/10 blur-3xl"
      />

      <div className="container relative z-10 grid min-h-screen grid-cols-1 items-center gap-10 pb-12 pt-28 md:grid-cols-12 md:gap-8 md:pb-16 md:pt-32">
        {/* LEFT: Text column */}
        <div className="md:col-span-7">
          <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
            <span className="h-px w-10 bg-accent" />
            Dhaka's freshest market
          </p>

          {/* h1 — THE LCP element. Visible from first CSS paint. */}
          <h1 className="lcp-fade max-w-[18ch] font-display text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-foreground">
            Today's market,{" "}
            <em className="font-medium not-italic text-primary">
              <span className="italic">at your door.</span>
            </em>
          </h1>

          <p className="hero-fade-up mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Hand-picked fruits, vegetables, dairy and pantry essentials —
            delivered across Dhaka in <span className="text-foreground font-medium">under an hour</span>.
            Real prices, real freshness, no surprises.
          </p>

          {/* Search bar */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="hero-fade-up mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-card"
            style={{ animationDelay: "150ms" }}
          >
            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Try mango, eggs, basmati rice…"
              aria-label="Search groceries"
              className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground/70 md:text-base"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground transition-[background-color,transform] duration-150 hover:bg-primary active:scale-[0.97] md:px-6"
            >
              Shop
            </button>
          </form>

          {/* Trust row */}
          <div
            className="hero-fade-up mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
            style={{ animationDelay: "300ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf/10 text-leaf">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>1-hour delivery</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf/10 text-leaf">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Always-fresh promise</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf/10 text-leaf">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Cash or bKash</span>
            </span>
          </div>
        </div>

        {/* RIGHT: Hero image */}
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-secondary shadow-elegant">
            <img
              src={heroImg}
              alt="Fresh produce — tomatoes, basil, mangoes, milk and bread on a cream linen surface"
              width={1600}
              height={2000}
              fetchPriority="high"
              decoding="sync"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center" }}
            />
            {/* Floating price tag */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-card/95 px-4 py-2.5 text-sm shadow-card backdrop-blur">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-foreground font-display italic">
                ৳
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Today</span>
                <span className="block font-semibold text-foreground">Mango ৳120/kg</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
