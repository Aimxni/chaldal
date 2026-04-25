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

// 12 market "stalls". Per-unit chips give a true grocery-shelf feel.
const categories = [
  { name: "Fruits & Vegetables", img: catFruits, to: "/rooms?cat=fruits-vegetables", unit: "per kg" },
  { name: "Meat & Fish",         img: catMeatFish, to: "/rooms?cat=meat-fish", unit: "per kg" },
  { name: "Cooking",             img: catCooking, to: "/rooms?cat=cooking", unit: "pantry" },
  { name: "Beverages",           img: catBeverages, to: "/rooms?cat=beverages", unit: "per bottle" },
  { name: "Home & Cleaning",     img: catCleaning, to: "/rooms?cat=cleaning", unit: "household" },
  { name: "Pest Control",        img: catPestControl, to: "/rooms?cat=pest-control", unit: "household" },
  { name: "Stationery & Office", img: catStationery, to: "/rooms?cat=stationery-office", unit: "office" },
  { name: "Beauty Products",     img: catBeauty, to: "/rooms?cat=personal-care", unit: "personal" },
  { name: "Health Products",     img: catHealth, to: "/rooms?cat=hygiene", unit: "wellness" },
  { name: "Pet Care",            img: catPet, to: "/rooms?cat=pet-care", unit: "for pets" },
  { name: "Kitchen Appliances",  img: catKitchen, to: "/rooms?cat=kitchen-appliances", unit: "for home" },
  { name: "Baby Care",           img: catBaby, to: "/rooms?cat=babycare", unit: "for baby" },
];

const CategoryGrid = () => {
  return (
    <section
      id="categories"
      className="relative bg-kraft py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
              <span className="h-px w-10 bg-accent" />
              Aisle 02 — Today's Stalls
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-foreground text-balance">
              Walk our market —{" "}
              <span className="font-chalk text-[1.15em] text-leaf">without leaving the kitchen.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              View all stalls
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
          {categories.map((c, i) => (
            <li key={c.name}>
              <Link
                to={c.to}
                className="group relative block h-full overflow-hidden rounded-[1.25rem] bg-crate p-1.5 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                {/* Two "nail heads" on the wood crate */}
                <span aria-hidden className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />
                <span aria-hidden className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />

                <div className="relative aspect-square w-full overflow-hidden rounded-[0.95rem]">
                  <img
                    src={c.img}
                    alt={c.name}
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent" />

                  {/* Handwritten unit chip — top-right */}
                  <span
                    className="font-chalk absolute right-2 top-2 rounded-md bg-background/85 px-2 py-0.5 text-xs leading-none text-foreground shadow-sm backdrop-blur-sm"
                    style={{ transform: `rotate(${(i % 2 === 0 ? -2 : 3)}deg)` }}
                  >
                    {c.unit}
                  </span>
                </div>

                {/* Price-tag-style name strip below */}
                <div className="px-2 pb-2 pt-2.5 text-center">
                  <h3 className="font-marker text-[0.95rem] leading-tight text-background drop-shadow-[0_1px_2px_hsl(0_0%_0%/0.4)] md:text-base">
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
