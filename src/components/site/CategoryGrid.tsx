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

// Mirrors Chaldal's 12 "Popular Categories" tiles.
const categories = [
  { name: "Fruits & Vegetables", img: catFruits, to: "/rooms?cat=fruits-vegetables" },
  { name: "Meat & Fish", img: catMeatFish, to: "/rooms?cat=meat-fish" },
  { name: "Cooking", img: catCooking, to: "/rooms?cat=cooking" },
  { name: "Beverages", img: catBeverages, to: "/rooms?cat=beverages" },
  { name: "Home & Cleaning", img: catCleaning, to: "/rooms?cat=cleaning" },
  { name: "Pest Control", img: catPestControl, to: "/rooms?cat=pest-control" },
  { name: "Stationery & Office", img: catStationery, to: "/rooms?cat=stationery-office" },
  { name: "Beauty Products", img: catBeauty, to: "/rooms?cat=personal-care" },
  { name: "Health Products", img: catHealth, to: "/rooms?cat=hygiene" },
  { name: "Pet Care", img: catPet, to: "/rooms?cat=pet-care" },
  { name: "Kitchen Appliances", img: catKitchen, to: "/rooms?cat=kitchen-appliances" },
  { name: "Baby Care", img: catBaby, to: "/rooms?cat=babycare" },
];

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
                    alt={c.name}
                    width={600}
                    height={600}
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
