import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mirrors Chaldal's "Shop & Get More" trio: Shop & Earn, Deal of the Day, Premium Care.
const cards = [
  {
    eyebrow: "Egg Club",
    title: "Shop & Earn Points",
    body: "The more you shop, the more you earn — cashback, free shipping, exclusive offers and more. Discover the perks of Egg Club membership.",
    cta: "Join Egg Club",
    to: "/rooms",
    tone: "bg-leaf text-primary-foreground",
  },
  {
    eyebrow: "Daily savings",
    title: "Deal of the Day",
    body: "Stock up on your favorite groceries for less with our unbeatable deals. Don't miss out — limited stock every day.",
    cta: "See today's deals",
    to: "/rooms",
    tone: "bg-accent text-accent-foreground",
  },
  {
    eyebrow: "White-glove service",
    title: "Premium Care",
    body: "Too busy to place an order or handling order issues? No need to worry — get a dedicated assistant with our premium plan.",
    cta: "Learn more",
    to: "/rooms",
    tone: "bg-foreground text-background",
  },
];

const ShopAndGetMore = () => {
  return (
    <section
      id="shop-and-get-more"
      className="border-t border-border bg-gradient-cream py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Shop & Get More
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
            Three more reasons to make Chaldal your daily ritual.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {cards.map((c) => (
            <li key={c.title}>
              <Link
                to={c.to}
                className={`group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl p-8 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card md:p-10 ${c.tone}`}
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] opacity-70">
                    {c.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed opacity-90">
                    {c.body}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  {c.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
