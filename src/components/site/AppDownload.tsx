import { Apple, Smartphone, Sparkles } from "lucide-react";

/**
 * "Download the Chaldal app" — themed promo section.
 *
 * Cream surface with a leaf-green gradient panel, sun-yellow discount chip,
 * and a stylized phone mockup built from divs (no third-party screenshot)
 * so the visual stays on-brand and crisp at any density.
 */
const AppDownload = () => {
  return (
    <section
      id="download-app"
      className="relative border-t border-border bg-background py-20 md:py-28"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-[hsl(150_35%_18%)] shadow-elegant md:rounded-[2.5rem]">
          {/* Background flourishes */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-leaf)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[hsl(8_72%_42%)]/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(hsl(38 45% 96% / 0.8) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
            }}
          />

          <div className="relative grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-12 md:gap-8 md:p-14 lg:p-16">
            {/* Copy */}
            <div className="md:col-span-7">
              <p className="mb-5 inline-flex items-center gap-3 rounded-full bg-[hsl(38_45%_96%)]/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.32em] text-[hsl(38_90%_72%)]">
                <Sparkles className="h-3 w-3" />
                Mobile exclusive
              </p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[hsl(38_45%_98%)] text-balance">
                Download the Chaldal app and
                <span className="text-[hsl(45_96%_56%)]"> save 5%</span> on
                your first order.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[hsl(38_45%_96%)]/75 md:text-base">
                Faster checkout, real-time order tracking, and exclusive
                in-app deals — all in your pocket.
              </p>

              {/* Store badges */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[hsl(38_45%_98%)] px-5 py-3 text-[hsl(150_35%_18%)] shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Apple className="h-6 w-6" strokeWidth={1.5} />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[hsl(150_18%_12%)]/60">
                      Download on the
                    </span>
                    <span className="mt-0.5 font-display text-base font-medium tracking-tight">
                      App Store
                    </span>
                  </span>
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-[hsl(38_45%_98%)] px-5 py-3 text-[hsl(150_35%_18%)] shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Smartphone className="h-6 w-6" strokeWidth={1.5} />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[hsl(150_18%_12%)]/60">
                      Get it on
                    </span>
                    <span className="mt-0.5 font-display text-base font-medium tracking-tight">
                      Google Play
                    </span>
                  </span>
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-[hsl(38_45%_96%)]/70">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(45_96%_56%)]" />
                  4.8 ★ on App Store
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(45_96%_56%)]" />
                  2M+ downloads
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(45_96%_56%)]" />
                  Free to use
                </span>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="relative md:col-span-5">
              <div className="relative mx-auto aspect-[9/18] w-[220px] md:w-[260px]">
                {/* Floating discount chip */}
                <div className="absolute -left-4 top-10 z-20 rotate-[-8deg] rounded-2xl bg-[hsl(45_96%_56%)] px-4 py-2.5 shadow-elegant md:-left-10">
                  <p className="font-display text-2xl font-medium leading-none tracking-tight text-[hsl(150_35%_14%)]">
                    5% OFF
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-[hsl(150_35%_14%)]/75">
                    First order
                  </p>
                </div>

                {/* Device frame */}
                <div className="absolute inset-0 rounded-[2.5rem] border-[10px] border-[hsl(150_18%_8%)] bg-[hsl(150_18%_8%)] shadow-elegant">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-[hsl(38_45%_97%)]">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-medium text-[hsl(150_18%_12%)]">
                      <span>9:41</span>
                      <span className="h-3 w-12 rounded-full bg-[hsl(150_18%_8%)]" />
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-3 rounded-sm bg-[hsl(150_18%_12%)]" />
                      </span>
                    </div>

                    {/* App header */}
                    <div className="mt-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-[hsl(8_72%_42%)] font-display text-sm italic text-[hsl(38_45%_96%)]">
                          c
                        </span>
                        <span className="font-display text-sm tracking-tight text-[hsl(150_35%_18%)]">
                          chaldal<span className="text-[hsl(8_72%_42%)]">.</span>
                        </span>
                      </div>
                      <div className="mt-3 h-7 rounded-full bg-[hsl(38_25%_92%)]" />
                    </div>

                    {/* Product list */}
                    <div className="mt-3 space-y-2 px-3">
                      {[
                        { name: "Chicken Eggs", price: "৳ 99", color: "hsl(45 90% 70%)" },
                        { name: "Young Coconut", price: "৳ 79", color: "hsl(90 35% 78%)" },
                        { name: "Mango (1kg)", price: "৳ 439", color: "hsl(38 95% 65%)" },
                        { name: "Pineapple", price: "৳ 39", color: "hsl(50 85% 65%)" },
                        { name: "Coffee Jar", price: "৳ 495", color: "hsl(25 35% 38%)" },
                      ].map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-2 rounded-xl bg-[hsl(38_25%_94%)] p-1.5"
                        >
                          <span
                            className="h-7 w-7 shrink-0 rounded-md"
                            style={{ background: p.color }}
                          />
                          <div className="flex-1">
                            <p className="text-[9px] font-medium leading-tight text-[hsl(150_18%_12%)]">
                              {p.name}
                            </p>
                            <p className="text-[8px] leading-tight text-[hsl(150_10%_38%)]">
                              {p.price}
                            </p>
                          </div>
                          <span className="grid h-5 w-5 place-items-center rounded-md bg-[hsl(45_96%_56%)] text-xs font-bold leading-none text-[hsl(150_35%_14%)]">
                            +
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating cart pill */}
                <div className="absolute -right-3 bottom-16 z-20 rotate-[6deg] rounded-2xl bg-[hsl(8_72%_42%)] px-3.5 py-2 shadow-elegant md:-right-8">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-[hsl(38_45%_96%)]/80">
                    Cart
                  </p>
                  <p className="mt-0.5 font-display text-sm font-medium leading-none text-[hsl(38_45%_96%)]">
                    ৳ 1,240
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
