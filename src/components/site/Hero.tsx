import { ArrowRight, MapPin } from "lucide-react";
import { Btn } from "@/components/ui/btn";

// Preloaded as WebP via <link rel="preload"> in index.html for fastest LCP.
const HERO_WEBP = "/images/hero-market.webp";
const HERO_WEBP_960 = "/images/hero-market-960.webp";
const HERO_WEBP_480 = "/images/hero-market-480.webp";

/**
 * Hero — Split-color panel.
 *
 * LCP-critical elements (hero image + h1 headline) are rendered as plain DOM
 * with pure CSS animations. No framer-motion on the LCP path — JS-based
 * animation libraries delay LCP registration and cost Lighthouse points.
 *
 * Reduced-motion users get a static render via prefers-reduced-motion inside
 * index.css (animation: none).
 */
const Hero = () => {
  const headline = ["Grocery", "Delivered at", "your Doorstep"];

  return (
    <section
      aria-label="Chaldal — fresh groceries delivered"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[hsl(8_72%_42%)]"
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr]">
        {/* LEFT — Tomato red sidebar */}
        <div className="relative z-10 flex flex-col gap-8 bg-[hsl(8_72%_42%)] px-6 pb-10 pt-24 text-[hsl(38_45%_96%)] sm:px-10 lg:min-h-[100svh] lg:justify-center lg:gap-10 lg:px-14 lg:pt-28">
          <div className="hero-fade-up flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-[hsl(38_45%_96%)]/75">
            <span>Est. 2013 · Dhaka</span>
            <span className="hidden sm:inline">No. 01 — Daily Market</span>
          </div>

          <div className="mt-4 lg:mt-0">
            <span
              className="hero-fade-up font-chalk mb-3 inline-block text-[clamp(1.4rem,2.6vw,1.85rem)] leading-none text-[hsl(38_90%_72%)]"
              style={{ animationDelay: "0.05s" }}
            >
              Fresh from the morning haat —
            </span>
            {/* h1 — THE LCP element. Pure DOM, no JS animation. */}
            <h1 className="lcp-fade font-body text-[clamp(2.25rem,5vw,3.75rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[hsl(38_45%_96%)]">
              <span className="block">{headline[0]}</span>
              <span className="block text-[hsl(38_90%_72%)]">{headline[1]}</span>
              <span className="block">{headline[2]}</span>
            </h1>

            <p
              className="hero-fade-up mt-8 max-w-md text-base leading-relaxed text-[hsl(38_45%_96%)]/85 sm:text-lg"
              style={{ animationDelay: "0.15s" }}
            >
              Groceries from the Karwan Bazar morning auction to your kitchen counter — in one hour, all over Dhaka.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="hero-fade-up mt-2"
            style={{ animationDelay: "0.25s" }}
          >
            <label className="mb-3 block text-[11px] uppercase tracking-[0.28em] text-[hsl(38_45%_96%)]/65">
              Where should we deliver?
            </label>
            <div className="flex items-stretch gap-2 border-b-2 border-[hsl(38_45%_96%)]/35 pb-2 transition-colors focus-within:border-[hsl(38_45%_96%)]">
              <span className="grid place-items-center pr-1 text-[hsl(38_45%_96%)]/70">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="1209  ·  Dhanmondi"
                aria-label="Enter your postcode or area"
                className="min-w-0 flex-1 bg-transparent py-2 font-body text-lg text-[hsl(38_45%_96%)] outline-none placeholder:text-[hsl(38_45%_96%)]/45"
              />
              <Btn
                type="submit"
                variant="ivory"
                size="sm"
                className="group shrink-0 !rounded-none"
                aria-label="Check delivery to my area"
              >
                Start
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Btn>
            </div>

            <div
              className="hero-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[hsl(38_45%_96%)]/70"
              style={{ animationDelay: "0.35s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_72%)]" />
                Min order ৳299
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_72%)]" />
                Free over ৳999
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_72%)]" />
                Cash · bKash · card
              </span>
            </div>
          </form>
        </div>

        {/* RIGHT — Full-bleed produce image (LCP image). Plain <img>, no JS animation. */}
        <div className="relative min-h-[60svh] overflow-hidden bg-[hsl(8_72%_42%)] lg:min-h-[100svh]">
          <img
            src={HERO_WEBP_480}
            srcSet={`${HERO_WEBP_480} 480w, ${HERO_WEBP_960} 960w, ${HERO_WEBP} 1920w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
            alt="An overhead market display of fresh produce — leafy greens, tomatoes, mangoes, eggplants, strawberries, eggs and milk"
            width={1920}
            height={1280}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(8_72%_42%)]/85 to-transparent"
          />

          {/* Fresh-today chalk stamp — top-right */}
          <div
            aria-hidden
            className="hero-fade-up pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-10 lg:top-10"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="fresh-badge">
              <span>
                Fresh<br />Today<br />
                <span className="text-[0.7rem] opacity-70">— 4:30 am</span>
              </span>
            </div>
          </div>

          {/* Hand-written price tags floating over produce */}
          <div
            aria-hidden
            className="hero-fade-up pointer-events-none absolute bottom-24 right-6 hidden sm:block lg:bottom-32 lg:right-12"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="price-tag">৳ 60 / kg · Tomato</span>
          </div>
          <div
            aria-hidden
            className="hero-fade-up pointer-events-none absolute bottom-8 left-8 hidden sm:block lg:bottom-12 lg:left-16"
            style={{ animationDelay: "0.6s" }}
          >
            <span className="price-tag" style={{ transform: "rotate(4deg)" }}>
              ৳ 35 / bunch · Lal Shak
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
