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

/**
 * ValueProps — hairline-divided 4-up grid (Untill values aesthetic).
 */
const ValueProps = () => {
  return (
    <section
      id="why"
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-20 md:py-24"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
            ( Why Chaldal )
          </p>
          <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-[hsl(155_18%_14%)]">
            Not just groceries — a market you can trust on busy days.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 md:grid-cols-2 lg:grid-cols-4">
          {props.map((p) => (
            <li
              key={p.title}
              className="flex flex-col gap-5 bg-[hsl(38_45%_96%)] p-7 transition-colors hover:bg-[hsl(38_45%_94%)] md:p-8"
            >
              <p.icon
                className="h-5 w-5 text-[hsl(8_72%_42%)]"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-untill-display text-lg text-[hsl(155_18%_14%)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[hsl(155_18%_14%)]/65">
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
