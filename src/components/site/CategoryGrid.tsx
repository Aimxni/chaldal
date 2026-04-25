import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import catFruits from "@/assets/cat-fruits.webp";
import catVeg from "@/assets/cat-vegetables.webp";
import catDairy from "@/assets/cat-dairy.webp";
import catPantry from "@/assets/cat-pantry.webp";
import catMeatFish from "@/assets/cat-meat-fish.webp";
import catBeverages from "@/assets/cat-beverages.webp";
import catCooking from "@/assets/cat-cooking.webp";
import catPestControl from "@/assets/cat-pest-control.webp";
import catCleaning from "@/assets/cat-cleaning.webp";
import catStationery from "@/assets/cat-stationery.webp";
import catHealth from "@/assets/cat-health.webp";
import catBeauty from "@/assets/cat-beauty.webp";
import catKitchen from "@/assets/cat-kitchen.webp";
import catBaby from "@/assets/cat-baby.webp";
import catPet from "@/assets/cat-pet.webp";

// Each links into the matching shop aisle so clicks from the landing page
// take you straight to filtered products.
const cat = (label: string) => `/shop?cat=${encodeURIComponent(label)}`;
const categories = [
  { name: "Fruits & Vegetables", img: catFruits,      to: cat("Fruits & Vegetables"), unit: "per kg" },
  { name: "Meat & Fish",         img: catMeatFish,    to: cat("Meat & Fish"),         unit: "per kg" },
  { name: "Dairy & Eggs",        img: catDairy,       to: cat("Dairy & Eggs"),        unit: "fresh today" },
  { name: "Pantry",              img: catPantry,      to: cat("Pantry"),              unit: "rice · oil" },
  { name: "Bakery",              img: catCooking,     to: cat("Bakery"),              unit: "warm" },
  { name: "Beverages",           img: catBeverages,   to: cat("Beverages"),           unit: "per bottle" },
  { name: "Snacks",              img: catBeauty,      to: cat("Snacks"),              unit: "biscuits" },
  { name: "Household",           img: catCleaning,    to: cat("Household"),           unit: "essentials" },
  { name: "Pest Control",        img: catPestControl, to: cat("Household"),           unit: "essentials" },
  { name: "Stationery & Office", img: catStationery,  to: cat("Household"),           unit: "office" },
  { name: "Health Products",     img: catHealth,      to: cat("Household"),           unit: "wellness" },
  { name: "Baby Care",           img: catBaby,        to: cat("Household"),           unit: "for baby" },
];

/**
 * CategoryGrid — minimal "team-card" tiles, mirroring the /shop product grid.
 * Image on top, name + meta below the frame, hairline hover.
 */
const CategoryGrid = () => {
  return (
    <section
      id="categories"
      className="relative bg-[hsl(38_45%_96%)] px-6 py-20 md:py-24"
    >
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-9">
            <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
              ( Today's stalls )
            </p>
            <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] text-[hsl(155_18%_14%)]">
              Walk our market — without leaving the kitchen.
            </h2>
          </div>
          <div className="md:col-span-3 md:text-right">
            <Link
              to="/rooms"
              className="font-untill-mono inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[hsl(155_18%_14%)]/75 transition-colors hover:text-[hsl(8_72%_42%)]"
            >
              View all stalls
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                to={c.to}
                className="group flex h-full flex-col focus-visible:outline-none"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[hsl(38_45%_94%)]">
                  <img
                    src={c.img}
                    alt={c.name}
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-untill-display mt-3 text-[0.95rem] leading-tight text-[hsl(155_18%_14%)] transition-colors group-hover:text-[hsl(8_72%_42%)]">
                  {c.name}
                </h3>
                <p className="font-untill-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-[hsl(155_18%_14%)]/50">
                  {c.unit}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CategoryGrid;
