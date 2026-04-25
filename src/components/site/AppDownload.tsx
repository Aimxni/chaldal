import { useEffect, useRef, useState } from "react";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";
import phoneImg from "@/assets/app-phone.webp";
import phoneImg424 from "@/assets/app-phone-424.webp";
import phoneImg636 from "@/assets/app-phone-636.webp";

/**
 * AppDownload — Untill-style: red gradient panel (matches hero), quiet
 * monospace eyebrow, big display headline, phone anchored right.
 */
const AppDownload = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="download-app"
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-16 md:py-20"
    >
      <div className="container">
        <div
          className="relative overflow-hidden rounded-3xl text-[hsl(38_45%_96%)] shadow-elegant"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(8 72% 38%) 0%, hsl(8 72% 46%) 55%, hsl(15 78% 54%) 100%)",
          }}
        >
          <div className="relative grid grid-cols-1 items-center gap-8 p-9 md:grid-cols-12 md:gap-10 md:p-14">
            {/* Copy + badges */}
            <div className="md:col-span-8">
              <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(38_45%_96%)]/75">
                ( Mobile exclusive )
              </p>
              <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-[hsl(38_45%_96%)]">
                Download the Chaldal app and{" "}
                <span className="text-[hsl(38_90%_78%)]">save 5%</span> on your
                first order.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[hsl(38_45%_96%)]/75">
                Faster checkout, real-time tracking, and in-app deals — all in
                your pocket.
              </p>

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

            {/* Phone */}
            <div
              className="relative flex items-center justify-center md:col-span-4 md:min-h-[420px] lg:min-h-[480px]"
              style={{ perspective: "1200px" }}
            >
              <div
                ref={phoneRef}
                className={`phone-popin relative w-[180px] sm:w-[200px] md:w-[220px] lg:w-[260px] xl:w-[280px] ${visible ? "is-visible" : ""}`}
                style={{
                  aspectRatio: "848 / 1264",
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                <img
                  src={phoneImg}
                  srcSet={`${phoneImg424} 424w, ${phoneImg636} 636w, ${phoneImg} 848w`}
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 260px, (min-width: 768px) 220px, (min-width: 640px) 200px, 180px"
                  alt="Chaldal mobile app showing the home screen with grocery categories"
                  width={848}
                  height={1264}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_28px_56px_hsl(0_0%_0%/0.4)]"
                  style={{ aspectRatio: "848 / 1264" }}
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
