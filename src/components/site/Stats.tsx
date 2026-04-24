import { useEffect, useRef, useState } from "react";

// Mirrors Chaldal's stats strip + "Currently Delivering in" cities.
type Stat = {
  // The numeric portion that animates
  target: number;
  // Optional prefix (e.g. "৳") and suffix (e.g. "M+", "K")
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { target: 26, label: "warehouses all over Bangladesh" },
  { target: 5, suffix: "M+", label: "orders have been delivered" },
  { target: 100, suffix: "K", label: "families are being served" },
  { target: 340, prefix: "৳", suffix: "M", label: "in customer savings" },
];

const cities = ["Dhaka", "Chattogram", "Jashore"];

// Smoothly counts up from 0 → target when scrolled into view.
// Pure rAF — no framer-motion, keeps the vendor-motion chunk off critical path.
const AnimatedNumber = ({
  target,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let start = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const run = () => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        setValue(Math.round(ease(p) * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            start = 0;
            run();
            io.disconnect();
          }
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return <span ref={ref}>{`${prefix}${value.toLocaleString()}${suffix}`}</span>;
};

const Stats = () => {
  return (
    <section
      id="stats"
      className="border-t border-border bg-background py-20 md:py-24"
    >
      <div className="container">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <li
              key={s.label}
              className="bg-card p-7 md:p-8"
            >
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-tight text-foreground">
                <AnimatedNumber target={s.target} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
              <span className="h-px w-10 bg-accent" />
              Currently Delivering in
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
              Three cities. One promise: groceries at your door in an hour.
            </h2>
          </div>
          <ul className="md:col-span-7 grid grid-cols-3 gap-3 md:gap-5">
            {cities.map((city) => (
              <li
                key={city}
                className="rounded-2xl border border-border bg-card p-5 text-center md:p-7"
              >
                <span className="font-display text-lg font-medium text-foreground md:text-2xl">
                  {city}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stats;
