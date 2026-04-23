import { Truck, Leaf, BadgeDollarSign, Headphones } from "lucide-react";

const props = [
  {
    icon: Truck,
    title: "1-hour delivery",
    body: "Order before 10 PM, get it the same day. Free over ৳999.",
  },
  {
    icon: Leaf,
    title: "Always-fresh promise",
    body: "Every fruit and vegetable is hand-checked before it leaves our hub.",
  },
  {
    icon: BadgeDollarSign,
    title: "Honest market prices",
    body: "We post the daily Karwan Bazar rate next to ours. No surcharges, ever.",
  },
  {
    icon: Headphones,
    title: "Real humans, all day",
    body: "Chat or call our Dhanmondi support team between 7 AM and 11 PM.",
  },
];

const ValueProps = () => {
  return (
    <section id="why" className="border-t border-border bg-background py-20 md:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
            <span className="h-px w-10 bg-accent" />
            Why Chaldal
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
            Not just groceries — a market you can trust on busy days.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {props.map((p) => (
            <li
              key={p.title}
              className="group flex flex-col gap-4 bg-card p-7 transition-colors duration-300 hover:bg-secondary md:p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-leaf/10 text-leaf transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                <p.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ValueProps;
