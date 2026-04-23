import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Clock, Heart } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    n: "01",
    t: "Verified hosts",
    d: "Every property is visited and photographed by us. No filters, no surprises at check-in.",
  },
  {
    icon: Sparkles,
    n: "02",
    t: "Hospitality-grade",
    d: "Fresh linen, spotless washrooms, working AC. The basics, done seriously.",
  },
  {
    icon: Clock,
    n: "03",
    t: "Self check-in, 24/7",
    d: "Late train? Early flight? Most stays let you arrive on your schedule, not ours.",
  },
  {
    icon: Heart,
    n: "04",
    t: "Couple-friendly",
    d: "Discreet, welcoming, no awkward questions. Hospitality the way it should be.",
  },
];

const Story = () => {
  return (
    <section id="story" className="container py-24 md:py-32">
      <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Why Travela
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl"
          >
            Hospitality, <span className="italic text-accent">remembered</span>.
          </motion.h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg">
          Hotels in Dhaka can feel impersonal. Apartments online can feel risky. We started Travela
          because the city deserved a third option — homes you'd want to stay in, hosted by people
          who care, with the standards of a small boutique hotel and the warmth of a guest room.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group flex flex-col gap-5 bg-card p-8 transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-7 w-7 text-accent transition-transform duration-500 group-hover:scale-110" />
                <span className="font-display text-sm text-accent">{p.n}</span>
              </div>
              <h3 className="font-display text-2xl">{p.t}</h3>
              <p className="text-sm text-muted-foreground transition-colors group-hover:text-primary-foreground/75">
                {p.d}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Story;
