import { Sparkles } from "lucide-react";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";

/**
 * Compact "Download the Chaldal app" promo. Deep leaf-green panel with
 * sun-yellow discount accent and the official-looking store badges.
 */
const AppDownload = () => {
  return (
    <section
      id="download-app"
      className="relative border-t border-border bg-background py-14 md:py-16"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-[hsl(150_35%_18%)] shadow-elegant md:rounded-[2rem]">
          {/* Background flourishes */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-leaf)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[hsl(8_72%_42%)]/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(38 45% 96% / 0.8) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          <div className="relative flex flex-col items-start gap-6 p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            {/* Copy */}
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[hsl(38_45%_96%)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-[hsl(38_90%_72%)]">
                <Sparkles className="h-3 w-3" />
                Mobile exclusive
              </p>
              <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[hsl(38_45%_98%)] text-balance">
                Download the Chaldal app and
                <span className="text-[hsl(45_96%_56%)]"> save 5%</span> on
                your first order.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[hsl(38_45%_96%)]/70">
                Faster checkout, real-time tracking, and in-app deals — all in
                your pocket.
              </p>
            </div>

            {/* Store badges */}
            <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-end md:gap-3">
              <a
                href="#"
                aria-label="Download on the App Store"
                className="inline-block transition-transform duration-300 hover:-translate-y-0.5"
              >
                <img
                  src={badgeAppStore}
                  alt="Download on the App Store"
                  width={1584}
                  height={672}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto md:h-14"
                />
              </a>
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="inline-block transition-transform duration-300 hover:-translate-y-0.5"
              >
                <img
                  src={badgeGooglePlay}
                  alt="Get it on Google Play"
                  width={1584}
                  height={672}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto md:h-14"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
