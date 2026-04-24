import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import catFruits from "@/assets/cat-fruits.webp";
import catFruits200 from "@/assets/cat-fruits-200.webp";
import catFruits400 from "@/assets/cat-fruits-400.webp";
import catVeg from "@/assets/cat-vegetables.webp";
import catVeg200 from "@/assets/cat-vegetables-200.webp";
import catVeg400 from "@/assets/cat-vegetables-400.webp";
import catDairy from "@/assets/cat-dairy.webp";
import catDairy200 from "@/assets/cat-dairy-200.webp";
import catDairy400 from "@/assets/cat-dairy-400.webp";
import catPantry from "@/assets/cat-pantry.webp";
import catPantry200 from "@/assets/cat-pantry-200.webp";
import catPantry400 from "@/assets/cat-pantry-400.webp";
import catMeatFish from "@/assets/cat-meat-fish.webp";
import catMeatFish200 from "@/assets/cat-meat-fish-200.webp";
import catMeatFish400 from "@/assets/cat-meat-fish-400.webp";
import catBeverages from "@/assets/cat-beverages.webp";
import catBeverages200 from "@/assets/cat-beverages-200.webp";
import catBeverages400 from "@/assets/cat-beverages-400.webp";
import catCooking from "@/assets/cat-cooking.webp";
import catCooking200 from "@/assets/cat-cooking-200.webp";
import catCooking400 from "@/assets/cat-cooking-400.webp";
import catPestControl from "@/assets/cat-pest-control.webp";
import catPestControl200 from "@/assets/cat-pest-control-200.webp";
import catPestControl400 from "@/assets/cat-pest-control-400.webp";
import catCleaning from "@/assets/cat-cleaning.webp";
import catCleaning200 from "@/assets/cat-cleaning-200.webp";
import catCleaning400 from "@/assets/cat-cleaning-400.webp";
import catStationery from "@/assets/cat-stationery.webp";
import catStationery200 from "@/assets/cat-stationery-200.webp";
import catStationery400 from "@/assets/cat-stationery-400.webp";
import catHealth from "@/assets/cat-health.webp";
import catHealth200 from "@/assets/cat-health-200.webp";
import catHealth400 from "@/assets/cat-health-400.webp";
import catBeauty from "@/assets/cat-beauty.webp";
import catBeauty200 from "@/assets/cat-beauty-200.webp";
import catBeauty400 from "@/assets/cat-beauty-400.webp";
import catKitchen from "@/assets/cat-kitchen.webp";
import catKitchen200 from "@/assets/cat-kitchen-200.webp";
import catKitchen400 from "@/assets/cat-kitchen-400.webp";
import catBaby from "@/assets/cat-baby.webp";
import catBaby200 from "@/assets/cat-baby-200.webp";
import catBaby400 from "@/assets/cat-baby-400.webp";
import catPet from "@/assets/cat-pet.webp";
import catPet200 from "@/assets/cat-pet-200.webp";
import catPet400 from "@/assets/cat-pet-400.webp";

// Mirrors Chaldal's 12 "Popular Categories" tiles. Each entry carries three
// resolutions so the browser can pick the smallest crisp variant per device.
const categories = [
  { name: "Fruits & Vegetables", img: catFruits, img200: catFruits200, img400: catFruits400, to: "/rooms?cat=fruits-vegetables" },
  { name: "Meat & Fish", img: catMeatFish, img200: catMeatFish200, img400: catMeatFish400, to: "/rooms?cat=meat-fish" },
  { name: "Cooking", img: catCooking, img200: catCooking200, img400: catCooking400, to: "/rooms?cat=cooking" },
  { name: "Beverages", img: catBeverages, img200: catBeverages200, img400: catBeverages400, to: "/rooms?cat=beverages" },
  { name: "Home & Cleaning", img: catCleaning, img200: catCleaning200, img400: catCleaning400, to: "/rooms?cat=cleaning" },
  { name: "Pest Control", img: catPestControl, img200: catPestControl200, img400: catPestControl400, to: "/rooms?cat=pest-control" },
  { name: "Stationery & Office", img: catStationery, img200: catStationery200, img400: catStationery400, to: "/rooms?cat=stationery-office" },
  { name: "Beauty Products", img: catBeauty, img200: catBeauty200, img400: catBeauty400, to: "/rooms?cat=personal-care" },
  { name: "Health Products", img: catHealth, img200: catHealth200, img400: catHealth400, to: "/rooms?cat=hygiene" },
  { name: "Pet Care", img: catPet, img200: catPet200, img400: catPet400, to: "/rooms?cat=pet-care" },
  { name: "Kitchen Appliances", img: catKitchen, img200: catKitchen200, img400: catKitchen400, to: "/rooms?cat=kitchen-appliances" },
  { name: "Baby Care", img: catBaby, img200: catBaby200, img400: catBaby400, to: "/rooms?cat=babycare" },
];

// Suppress unused-import warnings for assets reserved for future tiles.
void catVeg; void catVeg200; void catVeg400;
void catDairy; void catDairy200; void catDairy400;
void catPantry; void catPantry200; void catPantry400;

// Mirrors the Tailwind grid breakpoints below: 2/3/4/6 columns at 0/640/768/1024px.
const TILE_SIZES =
  "(min-width: 1024px) 16vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw";

const CategoryGrid = () => {
  return (
    <section id="categories" className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
              <span className="h-px w-10 bg-accent" />
              Popular Categories
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
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                to={c.to}
                className="group relative block h-full overflow-hidden rounded-3xl bg-card shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={c.img}
                    srcSet={`${c.img200} 200w, ${c.img} 320w, ${c.img400} 400w`}
                    sizes={TILE_SIZES}
                    alt={c.name}
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="font-display text-sm font-medium leading-tight text-white md:text-base">
                    {c.name}
                  </h3>
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
