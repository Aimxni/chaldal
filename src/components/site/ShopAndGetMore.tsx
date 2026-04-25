import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mirrors Chaldal's "Shop & Get More" trio: Shop & Earn, Deal of the Day, Premium Care.
const cards = [
  {
    eyebrow: "Egg Club",
    title: "Shop & Earn Points",
    body: "The more you shop, the more you earn — cashback, free shipping, exclusive offers. Discover the perks of Egg Club membership.",
    cta: "Join Egg Club",
    to: "/rooms",
  },
  {
    eyebrow: "Daily savings",
    title: "Deal of the Day",
    body: "Stock up on your favorite groceries for less with our unbeatable deals. Don't miss out — limited stock every day.",
    cta: "See today's deals",
    to: "/rooms",
  },
  {
    eyebrow: "White-glove service",
    title: "Premium Care",
    body: "Too busy to place an order or handle order issues? Get a dedicated assistant with our premium plan.",
    cta: "Learn more",
    to: "/rooms",
  },
];

/**
 * ShopAndGetMore — three quiet text-cards on cream, hairline divided.
 * Untill values-block aesthetic.
 */
const ShopAndGetMore = () => {
  return (
    <section
      id="shop-and-get-more"
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-20 md:py-24"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
            ( Shop & get more )
          </p>
          <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-[hsl(155_18%_14%)]">
            Three more reasons to make Chaldal your daily ritual.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.title} className="bg-[hsl(38_45%_96%)] transition-colors hover:bg-[hsl(38_45%_94%)]">
              <Link
                to={c.to}
                className="group flex h-full flex-col justify-between gap-10 p-8 md:p-10"
              >
                <div>
                  <p className="font-untill-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(155_18%_14%)]/55">
                    ( {c.eyebrow.toLowerCase()} )
                  </p>
                  <h3 className="font-untill-display mt-3 text-2xl text-[hsl(155_18%_14%)] md:text-[1.65rem]">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[hsl(155_18%_14%)]/65">
                    {c.body}
                  </p>
                </div>
                <span className="font-untill-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[hsl(155_18%_14%)]/75 transition-colors group-hover:text-[hsl(8_72%_42%)]">
                  {c.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShopAndGetMore;
