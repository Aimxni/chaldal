import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const skyline = "/images/dhaka-skyline.webp";

const neighbourhoods = [
  {
    name: "Dhanmondi",
    sub: "Cultural heart",
    blurb: "Lakeside walks, late-night cha, the city at its most thoughtful.",
    count: "1,820 stays",
  },
  {
    name: "Lalmatia",
    sub: "Quiet residential",
    blurb: "Tree-lined streets, family-run cafés, longer stays welcome.",
    count: "184 stays",
  },
  {
    name: "Dhanmondi 15",
    sub: "Best value",
    blurb: "Affordable rooms minutes from the lake — our locals' favourite.",
    count: "230 stays",
  },
  {
    name: "Rayer Bazar",
    sub: "Off-the-map",
    blurb: "Where West Dhanmondi quietens. Slow mornings, real Dhaka.",
    count: "146 stays",
  },
];

const Neighbourhoods = () => {
  return (
    <section id="neighbourhoods" className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <img
          src={skyline}
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-night" />
      </div>

      <div className="container relative grid grid-cols-1 gap-16 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-primary-foreground/65">
            <span className="h-px w-10 bg-accent" /> Neighbourhoods
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl"
          >
            The city, by <span className="italic text-accent">street</span>.
          </motion.h2>
          <p className="mt-6 max-w-md text-primary-foreground/70">
            Dhaka isn't one city — it's a hundred small ones. We've spent years getting to know the
            lanes, lakes and late-night chai stalls so you don't have to.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-primary-foreground/15 sm:grid-cols-2">
            {neighbourhoods.map((n, i) => (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="group relative flex flex-col gap-4 border-b border-r border-primary-foreground/15 bg-primary/40 p-7 transition-colors duration-500 hover:bg-primary/70"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-accent">{n.sub}</div>
                    <h3 className="mt-2 font-display text-3xl">{n.name}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 -translate-y-0 translate-x-0 text-primary-foreground/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <p className="text-sm text-primary-foreground/70">{n.blurb}</p>
                <Link
                  to="/rooms"
                  className="mt-2 text-[10px] uppercase tracking-[0.25em] text-primary-foreground/85"
                >
                  {n.count} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Neighbourhoods;
