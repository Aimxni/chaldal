import { ArrowRight, MapPin } from "lucide-react";
import { Btn } from "@/components/ui/btn";

// Preloaded as WebP via <link rel="preload"> in index.html for fastest LCP.
const HERO_WEBP = "/images/hero-market.webp";
const HERO_WEBP_960 = "/images/hero-market-960.webp";
const HERO_WEBP_480 = "/images/hero-market-480.webp";

/**
 * Hero — Split-color panel (Untill-style typography).
 *
 * LCP-critical elements (hero image + h1 headline) are rendered as plain DOM
 * with pure CSS animations. No framer-motion on the LCP path.
 *
 * Design language matches the /shop page:
 *  • Diagonal red gradient on the left panel
 *  • font-untill-display headline + font-untill-mono eyebrows
 *  • Frosted .search-glass postcode pill
 */
const Hero = () => {
  return (
    <section
      aria-label="Chaldal — fresh groceries delivered"
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, hsl(8 72% 38%) 0%, hsl(8 72% 46%) 55%, hsl(15 78% 54%) 100%)",
      }}
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr]">
        {/* LEFT — Tomato-red sidebar with diagonal gradient */}
        <div
          className="relative z-10 flex flex-col gap-8 px-6 pb-10 pt-24 text-[hsl(38_45%_96%)] sm:px-10 lg:min-h-[100svh] lg:justify-center lg:gap-10 lg:px-14 lg:pt-28"
          style={{
            backgroundImage:
              "linear-gradient(160deg, hsl(8 72% 36%) 0%, hsl(8 72% 44%) 60%, hsl(15 78% 52%) 100%)",
          }}
        >
          <div className="hero-fade-up font-untill-mono flex items-center justify-between text-[11px] tracking-[0.05em] text-[hsl(38_45%_96%)]/75">
            <span>( est. 2013 · dhaka )</span>
            <span className="hidden sm:inline">No. 01 — Daily Market</span>
          </div>

          <div className="mt-4 lg:mt-0">
            {/* h1 — THE LCP element. Pure DOM, no JS animation. */}
            <h1 className="lcp-fade font-untill-display text-[clamp(2.75rem,6vw,4.5rem)] text-[hsl(38_45%_96%)]">
              <span className="block">Grocery,</span>
              <span className="block text-[hsl(38_90%_78%)]">delivered at</span>
              <span className="block">your doorstep.</span>
            </h1>

            <p
              className="hero-fade-up mt-6 max-w-md text-base leading-relaxed text-[hsl(38_45%_96%)]/85 sm:text-lg"
              style={{ animationDelay: "0.15s" }}
            >
              Groceries from the Karwan Bazar morning auction to your kitchen
              counter — in one hour, all over Dhaka.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="hero-fade-up mt-2"
            style={{ animationDelay: "0.25s" }}
          >
            <label className="font-untill-mono mb-3 block text-[11px] uppercase tracking-[0.18em] text-[hsl(38_45%_96%)]/65">
              Where should we deliver?
            </label>
            <div className="search-glass flex items-stretch gap-2 rounded-full px-5 py-2.5">
              <MapPin
                className="h-4 w-4 self-center text-[hsl(38_45%_96%)]/80"
                strokeWidth={1.75}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="1209  ·  Dhanmondi"
                aria-label="Enter your postcode or area"
                className="font-untill-mono min-w-0 flex-1 bg-transparent text-sm text-[hsl(38_45%_96%)] outline-none placeholder:text-[hsl(38_45%_96%)]/50"
              />
              <Btn
                type="submit"
                variant="ivory"
                size="sm"
                className="group shrink-0"
                aria-label="Check delivery to my area"
              >
                Start
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Btn>
            </div>

            <div
              className="hero-fade-up font-untill-mono mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-[hsl(38_45%_96%)]/75"
              style={{ animationDelay: "0.35s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_78%)]" />
                Min order ৳299
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_78%)]" />
                Free over ৳999
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_78%)]" />
                Cash · bKash · card
              </span>
            </div>
          </form>
        </div>

        {/* RIGHT — Full-bleed produce image (LCP image). */}
        <div className="relative min-h-[60svh] overflow-hidden lg:min-h-[100svh]">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
