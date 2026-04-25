import { useDeferredValue, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import AisleDivider from "@/components/site/AisleDivider";
import { Btn, BtnLink } from "@/components/ui/btn";
import { rooms, NEIGHBORHOODS, formatBDT } from "@/data/rooms";
import { useCart, selectCartCount } from "@/stores/cart";

type SortKey = "fresh" | "price-asc" | "price-desc" | "rating";

// Re-frame the existing neighborhoods as market "aisles" so the page reads
// as a grocery shop without changing the underlying data model.
const AISLES: { key: string; label: string; chalk: string }[] = [
  { key: "All",                label: "All aisles",        chalk: "everything" },
  { key: "Dhanmondi",          label: "Fruits & Veg",      chalk: "today's haat" },
  { key: "West Dhanmondi",     label: "Meat & Fish",       chalk: "morning catch" },
  { key: "Dhanmondi 15",       label: "Pantry",            chalk: "rice · dal · oil" },
  { key: "Lalmatia",           label: "Dairy & Eggs",      chalk: "fresh today" },
  { key: "Rayer Bazar",        label: "Bakery",            chalk: "warm from the oven" },
];

const Shop = () => {
  const [aisle, setAisle] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("fresh");
  const [pickOnly, setPickOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(7000);
  const deferredMaxPrice = useDeferredValue(maxPrice);

  const cartCount = useCart(selectCartCount);
  const cartTotal = useCart((s) =>
    s.items.reduce((sum, i) => sum + i.qty * i.price, 0),
  );

  const filtered = useMemo(() => {
    let list = rooms.filter((r) => r.price <= deferredMaxPrice);
    if (aisle !== "All") {
      list = list.filter((r) => r.neighborhood === aisle);
    }
    if (pickOnly) {
      list = list.filter((r) => r.badges.includes("Highly Recommended"));
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) =>
            Number(b.badges.includes("Highly Recommended")) -
            Number(a.badges.includes("Highly Recommended")),
        );
    }
    return list;
  }, [aisle, sort, pickOnly, deferredMaxPrice]);

  return (
    <main className="bg-kraft">
      <Navbar />

      {/* ===== Chalkboard hero ===== */}
      <section className="bg-chalkboard relative pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="container">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[hsl(45_96%_60%)]">
            <span className="h-px w-10 bg-[hsl(45_96%_60%)]" />
            Open · Daily 7 am – 11 pm
          </p>

          <h1 className="hero-fade-up max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-[hsl(38_45%_94%)] md:text-7xl">
            <span className="font-chalk block text-[0.55em] leading-none text-[hsl(45_96%_60%)]">
              today at the market —
            </span>
            Fresh{" "}
            <span className="italic text-[hsl(45_96%_60%)]">groceries,</span>{" "}
            chalked daily.
          </h1>

          <p className="mt-6 max-w-xl text-base text-[hsl(38_45%_94%)]/80">
            <span className="font-chalk text-xl text-[hsl(45_96%_60%)]">{filtered.length}</span>{" "}
            of {rooms.length} stalls open right now. Picked at dawn from Karwan Bazar — on your
            counter within the hour.
          </p>

          {/* Chalk arrows — pure decoration */}
          <div className="font-chalk mt-8 flex flex-wrap gap-x-6 gap-y-2 text-lg text-[hsl(38_45%_94%)]/70">
            <span>↳ free delivery over ৳999</span>
            <span>↳ cash · bKash · card</span>
            <span>↳ swap anything you don't love</span>
          </div>
        </div>
      </section>

      {/* ===== Aisle filter strip — sticky chalkboard ribbon ===== */}
      <section className="bg-chalkboard sticky top-20 z-30 border-y border-[hsl(38_45%_94%)]/10 backdrop-blur">
        <div className="container flex flex-wrap items-center gap-2 py-4">
          {AISLES.map((a) => {
            const active = aisle === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setAisle(a.key)}
                className={[
                  "group/chip relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] transition-all",
                  active
                    ? "border-[hsl(45_96%_60%)] bg-[hsl(45_96%_60%)] text-[hsl(150_35%_14%)] shadow-[0_4px_12px_-4px_hsl(45_96%_50%/0.6)]"
                    : "border-[hsl(38_45%_94%)]/30 text-[hsl(38_45%_94%)]/85 hover:border-[hsl(45_96%_60%)] hover:text-[hsl(45_96%_60%)]",
                ].join(" ")}
              >
                <span className="font-medium">{a.label}</span>
                <span
                  className={[
                    "font-chalk text-sm leading-none normal-case tracking-normal",
                    active ? "text-[hsl(150_35%_14%)]/70" : "text-[hsl(45_96%_60%)]/70",
                  ].join(" ")}
                >
                  · {a.chalk}
                </span>
              </button>
            );
          })}

          {/* Right-aligned controls */}
          <div className="ml-auto flex flex-wrap items-center gap-4 text-[hsl(38_45%_94%)]/85">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
              <span>Max</span>
              <span className="font-chalk text-base normal-case tracking-normal text-[hsl(45_96%_60%)]">
                {formatBDT(maxPrice)}
              </span>
              <input
                type="range"
                min={500}
                max={7000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-[hsl(45_96%_60%)]"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
              <input
                type="checkbox"
                checked={pickOnly}
                onChange={(e) => setPickOnly(e.target.checked)}
                className="h-4 w-4 accent-[hsl(45_96%_60%)]"
              />
              Today's picks only
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-md border border-[hsl(38_45%_94%)]/30 bg-transparent px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-[hsl(38_45%_94%)] outline-none transition-colors hover:border-[hsl(45_96%_60%)] focus:border-[hsl(45_96%_60%)]"
            >
              <option className="bg-[hsl(155_18%_14%)]" value="fresh">Freshest first</option>
              <option className="bg-[hsl(155_18%_14%)]" value="price-asc">Price · low → high</option>
              <option className="bg-[hsl(155_18%_14%)]" value="price-desc">Price · high → low</option>
              <option className="bg-[hsl(155_18%_14%)]" value="rating">Top rated</option>
            </select>
          </div>
        </div>
      </section>

      <AisleDivider number={`Aisle ${aisle === "All" ? "01" : "02"}`} label={AISLES.find((a) => a.key === aisle)?.label ?? "All aisles"} />

      {/* ===== Product shelves ===== */}
      <section className="container pb-28 pt-4 md:pb-36">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-foreground/20 bg-background/60 py-20 text-center">
            <p className="font-chalk text-4xl text-leaf">Stall's empty — try another aisle.</p>
            <p className="mt-3 text-sm text-muted-foreground">Widen the price or pick a different aisle above.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((r, i) => (
              <li key={r.id}>
                <ProductCard room={r} index={i} priority={i < 4} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ===== Sticky basket bar (only when items in cart) ===== */}
      {cartCount > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 pointer-events-none">
          <div className="bg-chalkboard pointer-events-auto flex items-center gap-4 rounded-full border border-[hsl(38_45%_94%)]/15 px-4 py-2.5 shadow-elegant">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(45_96%_60%)] text-[hsl(150_35%_14%)]">
              <ShoppingBasket className="h-4 w-4" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-chalk text-base text-[hsl(38_45%_94%)]/80">
                {cartCount} {cartCount === 1 ? "item" : "items"} in basket
              </span>
              <span className="font-display text-sm text-[hsl(45_96%_60%)]">
                {formatBDT(cartTotal)} · free over ৳999
              </span>
            </div>
            <BtnLink to="/checkout" variant="accent" size="sm" className="ml-2">
              Checkout
            </BtnLink>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Shop;
