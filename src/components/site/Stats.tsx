import { useEffect, useRef, useState } from "react";

type Stat = {
  target: number;
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

// Smoothly counts up from 0 → target when scrolled into view. Pure rAF.
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

/**
 * Stats — quiet hairline-divided numbers + cities (Untill aesthetic).
 */
const Stats = () => {
  return (
    <section
      id="stats"
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-20"
    >
      <div className="container">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="bg-[hsl(38_45%_96%)] p-7 md:p-8">
              <p className="font-untill-display text-[clamp(2rem,4vw,3rem)] leading-none text-[hsl(155_18%_14%)]">
                <AnimatedNumber
                  target={s.target}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </p>
              <p className="font-untill-mono mt-3 text-[11px] uppercase tracking-[0.16em] leading-relaxed text-[hsl(155_18%_14%)]/55">
                {s.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
              ( Currently delivering in )
            </p>
            <h2 className="font-untill-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-[hsl(155_18%_14%)]">
              Three cities. One promise: groceries at your door in an hour.
            </h2>
          </div>
          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 md:col-span-7">
            {cities.map((city) => (
              <li
                key={city}
                className="bg-[hsl(38_45%_96%)] p-5 text-center md:p-7"
              >
                <span className="font-untill-display text-base text-[hsl(155_18%_14%)] md:text-xl">
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
