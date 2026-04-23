import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import catFruits from "@/assets/cat-fruits.jpg";
import catVeg from "@/assets/cat-vegetables.jpg";
import catDairy from "@/assets/cat-dairy.jpg";
import catPantry from "@/assets/cat-pantry.jpg";

const categories = [
  { name: "Fruits", count: "120+ items", img: catFruits, accent: "bg-accent/10 text-accent", to: "/rooms?cat=fruits" },
  { name: "Vegetables", count: "80+ items", img: catVeg, accent: "bg-leaf/10 text-leaf", to: "/rooms?cat=veg" },
  { name: "Dairy & eggs", count: "45+ items", img: catDairy, accent: "bg-gold/15 text-foreground", to: "/rooms?cat=dairy" },
  { name: "Pantry", count: "200+ items", img: catPantry, accent: "bg-secondary text-secondary-foreground", to: "/rooms?cat=pantry" },
];

const CategoryGrid = () => {
  return (
    <section id="categories" className="bg-background py-20 md:py-28">
      <div className="container">
        {/* Editorial section header */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
              <span className="h-px w-10 bg-accent" />
              Shop by aisle
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
              Walk our market — without leaving the kitchen.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Browse everything
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 2x2 on mobile, 4-up on desktop with editorial size variation */}
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                to={c.to}
                className="group relative block h-full overflow-hidden rounded-3xl bg-card shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 md:p-5">
                  <div>
                    <h3 className="font-display text-xl font-medium leading-tight text-white md:text-2xl">
                      {c.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-white/80">{c.count}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-card text-foreground shadow-soft transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryGrid;
