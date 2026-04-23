import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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
const AnimatedNumber = ({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const display = useTransform(spring, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString()}${suffix}`,
  );
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (inView) {
      motionValue.set(0);
      // next frame so spring registers the change
      requestAnimationFrame(() => motionValue.set(target));
    } else {
      motionValue.set(0);
    }
  }, [inView, target, motionValue]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  return <span ref={ref}>{text}</span>;
};

const Stats = () => {
  return (
    <section
      id="stats"
      className="border-t border-border bg-background py-20 md:py-24"
    >
      <div className="container">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card p-7 md:p-8"
            >
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-tight text-foreground">
                <AnimatedNumber target={s.target} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
            </motion.li>
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
            {cities.map((city, i) => (
              <motion.li
                key={city}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-80px" }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border bg-card p-5 text-center md:p-7"
              >
                <span className="font-display text-lg font-medium text-foreground md:text-2xl">
                  {city}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stats;
