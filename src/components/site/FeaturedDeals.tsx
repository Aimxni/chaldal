import { Plus } from "lucide-react";
import prodMango from "@/assets/prod-mango.jpg";
import prodMilk from "@/assets/prod-milk.jpg";
import prodBread from "@/assets/prod-bread.jpg";
import prodStrawberry from "@/assets/prod-strawberry.jpg";
import { useCart } from "@/stores/cart";
import { toast } from "@/hooks/use-toast";

type Deal = {
  name: string;
  unit: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  img: string;
};

const deals: Deal[] = [
  { name: "Himsagar mango", unit: "1 kg", price: 120, oldPrice: 160, badge: "In season", img: prodMango },
  { name: "Fresh whole milk", unit: "1 L bottle", price: 95, img: prodMilk },
  { name: "Artisan sourdough", unit: "500 g loaf", price: 180, badge: "Baked today", img: prodBread },
  { name: "Strawberries", unit: "250 g crate", price: 220, oldPrice: 260, img: prodStrawberry },
  { name: "Himsagar mango", unit: "1 kg", price: 120, oldPrice: 160, badge: "In season", img: prodMango },
  { name: "Fresh whole milk", unit: "1 L bottle", price: 95, img: prodMilk },
];

const FeaturedDeals = () => {
  const addToCart = useCart((s) => s.add);
  return (
    <section id="deals" className="border-t border-border bg-gradient-cream py-20 md:py-28">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-accent">
              <span className="h-px w-10 bg-accent" />
              This week's basket
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
              Picked at sunrise. Priced for every kitchen.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground md:text-right">
            New deals refresh every morning at 6 AM — straight from Karwan Bazar
            and our partner farms.
          </p>
        </div>

        {/* Horizontal scroll rail on mobile, grid on desktop.
            Native scroll-snap = zero JS, zero TBT. */}
        <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-6">
          {deals.map((d, i) => (
            <li
              key={i}
              className="group relative w-[68vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-card shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card sm:w-[40vw] md:w-auto"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-secondary">
                {d.badge && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                    {d.badge}
                  </span>
                )}
                <img
                  src={d.img}
                  alt={d.name}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-base font-medium leading-tight text-foreground md:text-lg">
                    {d.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{d.unit}</p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-lg font-semibold text-foreground">
                      ৳{d.price}
                    </span>
                    {d.oldPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ৳{d.oldPrice}
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={`Add ${d.name} to cart`}
                  onClick={() => {
                    addToCart({
                      id: `deal-${i}-${d.name}`,
                      name: d.name,
                      unit: d.unit,
                      price: d.price,
                      img: d.img,
                    });
                    toast({
                      title: "Added to cart",
                      description: `${d.name} · ${d.unit}`,
                    });
                  }}
                  className="btn-icon shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedDeals;
