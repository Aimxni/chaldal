import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Preloaded as WebP via <link rel="preload"> in index.html for fastest LCP.
const HERO_WEBP = "/images/hero-market.webp";
const HERO_WEBP_960 = "/images/hero-market-960.webp";

// Word-by-word reveal for the headline. Stagger handled by parent.
const WORD_VARIANTS = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const HEADLINE_PARENT = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.5 + i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/**
 * Hero — Split-color panel with framer-motion choreography.
 * - Headline: word-by-word mask reveal (no animation-delay on h1 itself, mask
 *   only travels after first paint, so LCP timing is preserved).
 * - Meta / paragraph / form / chips: staggered fade-up.
 * - Right photo: subtle scroll parallax (translateY) + initial scale-in.
 * - Image: responsive srcset so mobile pulls a 69 KB version instead of 238 KB.
 */
const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax: image drifts up to 80px as the user scrolls past the hero.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const headline = ["Real food.", "Real fast.", "Real cheap."];

  return (
    <section
      ref={sectionRef}
      aria-label="Chaldal — fresh groceries delivered"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[hsl(8_72%_42%)]"
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr]">
        {/* LEFT — Tomato red sidebar */}
        <div className="relative z-10 flex flex-col justify-between bg-[hsl(8_72%_42%)] px-6 pb-10 pt-24 text-[hsl(38_45%_96%)] sm:px-10 lg:min-h-[100svh] lg:px-14 lg:pt-32">
          {/* Top row: tiny meta info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            custom={0}
            className="flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-[hsl(38_45%_96%)]/75"
          >
            <span>Est. 2013 · Dhaka</span>
            <span className="hidden sm:inline">No. 01 — Daily Market</span>
          </motion.div>

          {/* Headline block — pushed to vertical center */}
          <div className="mt-14 lg:mt-0">
            {/* h1 — THE LCP element. Word-mask reveal preserves LCP. */}
            <h1 className="font-body text-[clamp(3rem,11vw,7.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[hsl(38_45%_96%)]">
              {reduce ? (
                <>
                  <span className="block">{headline[0]}</span>
                  <span className="block text-[hsl(38_90%_72%)]">{headline[1]}</span>
                  <span className="block">{headline[2]}</span>
                </>
              ) : (
                <motion.span
                  initial="hidden"
                  animate="visible"
                  variants={HEADLINE_PARENT}
                  className="block"
                >
                  {headline.map((line, i) => (
                    <span
                      key={line}
                      className="block overflow-hidden pb-[0.05em]"
                      style={{ lineHeight: 0.92 }}
                    >
                      <motion.span
                        variants={WORD_VARIANTS}
                        className={
                          i === 1
                            ? "block text-[hsl(38_90%_72%)]"
                            : "block"
                        }
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </motion.span>
              )}
            </h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={FADE_UP}
              custom={1}
              className="mt-8 max-w-md text-base leading-relaxed text-[hsl(38_45%_96%)]/85 sm:text-lg"
            >
              Groceries from the Karwan Bazar morning auction to your kitchen
              counter — in one hour, all over Dhaka.
            </motion.p>
          </div>

          {/* Bottom: Postcode entry form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            custom={2}
            onSubmit={(e) => e.preventDefault()}
            className="mt-14"
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
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group inline-flex shrink-0 items-center gap-2 bg-[hsl(38_45%_96%)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(8_72%_42%)] hover:bg-[hsl(150_35%_18%)] hover:text-[hsl(38_45%_96%)]"
                aria-label="Check delivery to my area"
              >
                Start
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.button>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={FADE_UP}
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[hsl(38_45%_96%)]/70"
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
            </motion.div>
          </motion.form>
        </div>

        {/* RIGHT — Full-bleed produce image (LCP image) with parallax */}
        <div className="relative min-h-[60svh] overflow-hidden lg:min-h-[100svh]">
          <motion.img
            src={HERO_WEBP}
            srcSet={`${HERO_WEBP_960} 960w, ${HERO_WEBP} 1920w`}
            sizes="(max-width: 1024px) 100vw, 60vw"
            alt="An overhead market display of fresh produce — leafy greens, tomatoes, mangoes, eggplants, strawberries, eggs and milk"
            width={1920}
            height={1280}
            fetchPriority="high"
            decoding="sync"
            style={reduce ? undefined : { y: imageY, scale: imageScale }}
            initial={reduce ? false : { scale: 1.08, opacity: 0.6 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          {/* Subtle red bleed on the seam so the two panels feel intentional */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(8_72%_42%)]/85 to-transparent"
          />
          {/* Bottom-right marker — vertical "today's date" type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute bottom-6 right-6 hidden text-right text-[hsl(38_45%_96%)] mix-blend-difference lg:block"
          >
            <div className="font-body text-[10px] uppercase tracking-[0.32em] opacity-80">
              Today's harvest
            </div>
            <div className="font-body text-3xl font-bold tracking-tight">
              ৳ 120
              <span className="ml-1 text-xs font-medium uppercase tracking-[0.2em] opacity-80">
                /kg mango
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
