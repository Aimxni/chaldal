import { Sparkles } from "lucide-react";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";
import phoneImg from "@/assets/app-phone.png";

/**
 * Compact "Download the Chaldal app" promo. Deep leaf-green panel with
 * sun-yellow discount accent, store badges centered on the left, and a
 * phone illustration anchored to the right.
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

          <div className="relative grid grid-cols-1 items-center gap-6 p-7 md:grid-cols-12 md:gap-8 md:p-10">
            {/* Copy + badges (centered as a block) */}
            <div className="md:col-span-8">
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

              {/* Badges centered horizontally within the copy column */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
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

            {/* Phone — positioned on the right, doesn't grow the box */}
            <div className="relative md:col-span-4">
              <div className="relative mx-auto h-[260px] w-full max-w-[200px] md:absolute md:-top-10 md:right-0 md:h-[340px] md:max-w-[240px] lg:h-[380px] lg:max-w-[260px]">
                <img
                  src={phoneImg}
                  alt="Chaldal mobile app"
                  width={896}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain drop-shadow-[0_24px_48px_hsl(150_30%_8%/0.45)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
