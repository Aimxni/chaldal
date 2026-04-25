import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShoppingBasket, Search } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import AisleDivider from "@/components/site/AisleDivider";
import { BtnLink } from "@/components/ui/btn";
import {
  products,
  CATEGORIES,
  formatBDT,
  type ProductCategory,
} from "@/data/products";
import { useCart, selectCartCount } from "@/stores/cart";

type AisleKey = "All" | ProductCategory;
type SortKey = "fresh" | "price-asc" | "price-desc" | "rating" | "popular";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [aisle, setAisle] = useState<AisleKey>("All");
  const [sort, setSort] = useState<SortKey>("fresh");
  const [pickOnly, setPickOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(2500);
  const deferredMaxPrice = useDeferredValue(maxPrice);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  // Pre-select aisle from ?cat=… so landing-page category clicks land on the
  // matching shelf. We accept any case and only switch if it's a real category.
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (!cat) return;
    const match = CATEGORIES.find(
      (c) => c.key.toLowerCase() === cat.toLowerCase(),
    );
    if (match) setAisle(match.key);
  }, [searchParams]);


  const cartCount = useCart(selectCartCount);
  const cartTotal = useCart((s) =>
    s.items.reduce((sum, i) => sum + i.qty * i.price, 0),
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= deferredMaxPrice);
    if (aisle !== "All") {
      list = list.filter((p) => p.category === aisle);
    }
    if (pickOnly) {
      list = list.filter((p) => p.badges.includes("Today's Pick"));
    }
    if (deferredQuery) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(deferredQuery) ||
          p.origin.toLowerCase().includes(deferredQuery) ||
          p.category.toLowerCase().includes(deferredQuery),
      );
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
      case "popular":
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // "fresh" — picks first, then by rating
        list = [...list].sort(
          (a, b) =>
            Number(b.badges.includes("Today's Pick")) -
              Number(a.badges.includes("Today's Pick")) ||
            b.rating - a.rating,
        );
    }
    return list;
  }, [aisle, sort, pickOnly, deferredMaxPrice, deferredQuery]);

  // Aisle chip list — "All" first, then real categories
  const aisleChips: { key: AisleKey; label: string; chalk: string }[] = [
    { key: "All", label: "All aisles", chalk: "everything" },
    ...CATEGORIES.map((c) => ({ key: c.key, label: c.key, chalk: c.chalk })),
  ];

  return (
    <main className="bg-kraft">
      <Navbar />

      {/* ===== Split-panel hero — mirrors landing page Hero ===== */}
      <section
        aria-label="Chaldal shop — fresh groceries"
        className="relative w-full overflow-hidden bg-[hsl(8_72%_42%)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr]">
          {/* LEFT — Tomato red sidebar */}
          <div className="relative z-10 flex flex-col gap-8 bg-[hsl(8_72%_42%)] px-6 pb-12 pt-28 text-[hsl(38_45%_96%)] sm:px-10 lg:gap-10 lg:px-14 lg:pb-16 lg:pt-32">
            <div className="hero-fade-up flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-[hsl(38_45%_96%)]/75">
              <span>Open · Daily 7 am – 11 pm</span>
              <span className="hidden sm:inline">No. 02 — The Shop</span>
            </div>

            <div>
              <span
                className="hero-fade-up font-chalk mb-3 inline-block text-[clamp(1.4rem,2.6vw,1.85rem)] leading-none text-[hsl(38_90%_72%)]"
                style={{ animationDelay: "0.05s" }}
              >
                today at the market —
              </span>
              <h1 className="lcp-fade font-body text-[clamp(2.25rem,5vw,3.75rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em] text-[hsl(38_45%_96%)]">
                <span className="block">Fresh</span>
                <span className="block text-[hsl(38_90%_72%)]">groceries,</span>
                <span className="block">chalked daily</span>
              </h1>

              <p
                className="hero-fade-up mt-8 max-w-md text-base leading-relaxed text-[hsl(38_45%_96%)]/85 sm:text-lg"
                style={{ animationDelay: "0.15s" }}
              >
                <span className="font-chalk text-xl text-[hsl(38_90%_72%)]">
                  {filtered.length}
                </span>{" "}
                of {products.length} items in stock right now. Picked at dawn from Karwan Bazar — on your counter within the hour.
              </p>
            </div>

            {/* Search bar */}
            <div
              className="hero-fade-up mt-2"
              style={{ animationDelay: "0.25s" }}
            >
              <label className="mb-3 block text-[11px] uppercase tracking-[0.28em] text-[hsl(38_45%_96%)]/65">
                What are you looking for?
              </label>
              <div className="flex items-stretch gap-2 border-b-2 border-[hsl(38_45%_96%)]/35 pb-2 transition-colors focus-within:border-[hsl(38_45%_96%)]">
                <span className="grid place-items-center pr-1 text-[hsl(38_45%_96%)]/70">
                  <Search className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for ilish, mango, doi, paratha…"
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent py-2 font-body text-lg text-[hsl(38_45%_96%)] outline-none placeholder:text-[hsl(38_45%_96%)]/45"
                />
              </div>

              <div
                className="hero-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[hsl(38_45%_96%)]/70"
                style={{ animationDelay: "0.35s" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_72%)]" />
                  Free delivery over ৳999
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_72%)]" />
                  Cash · bKash · card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_72%)]" />
                  Swap anything you don't love
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Full-bleed produce image. object-contain so the entire
              composition stays visible at every viewport; tomato red fills any
              letterbox so it blends with the left panel. */}
          <div className="relative min-h-[50svh] overflow-hidden bg-[hsl(8_72%_42%)] lg:min-h-0 lg:self-stretch">
            <img
              src="/images/shop-hero-480.webp"
              srcSet="/images/shop-hero-480.webp 480w, /images/shop-hero-960.webp 960w, /images/shop-hero.webp 1920w"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 60vw"
              alt="A market basket of golden mangoes surrounded by limes, coriander, chilies, turmeric, rice and farm eggs"
              width={1920}
              height={1280}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(8_72%_42%)]/85 to-transparent"
            />

            {/* Fresh-today chalk stamp — top-right */}
            <div
              aria-hidden
              className="hero-fade-up pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6 lg:right-10 lg:top-10"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="fresh-badge">
                <span>
                  Fresh<br />Today<br />
                  <span className="text-[0.7rem] opacity-70">— 4:30 am</span>
                </span>
              </div>
            </div>

            {/* Hand-written price tags floating over produce */}
            <div
              aria-hidden
              className="hero-fade-up pointer-events-none absolute bottom-24 right-6 hidden sm:block lg:bottom-32 lg:right-12"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="price-tag">৳ 90 / kg · Himsagar</span>
            </div>
            <div
              aria-hidden
              className="hero-fade-up pointer-events-none absolute bottom-8 left-8 hidden sm:block lg:bottom-12 lg:left-16"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="price-tag" style={{ transform: "rotate(4deg)" }}>
                ৳ 30 / bunch · Dhonepata
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Aisle filter strip — cream ribbon, scrolls with the page ===== */}
      <section className="border-y border-[hsl(8_72%_42%)]/15 bg-[hsl(38_45%_94%)]">
        <div className="container flex flex-wrap items-center gap-2 py-4" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
          {aisleChips.map((a) => {
            const active = aisle === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setAisle(a.key)}
                className={[
                  "group/chip relative inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium tracking-tight transition-all",
                  active
                    ? "border-[hsl(8_72%_42%)] bg-[hsl(8_72%_42%)] text-[hsl(38_45%_96%)] shadow-[0_4px_12px_-4px_hsl(8_72%_30%/0.45)]"
                    : "border-[hsl(155_18%_14%)]/20 text-[hsl(155_18%_14%)]/85 hover:border-[hsl(8_72%_42%)] hover:text-[hsl(8_72%_42%)]",
                ].join(" ")}
              >
                {a.label}
              </button>
            );
          })}

          {/* Right-aligned controls */}
          <div className="ml-auto flex flex-wrap items-center gap-4 text-sm text-[hsl(155_18%_14%)]/80">
            <label className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-[hsl(155_18%_14%)]/60">Max</span>
              <span className="text-sm font-semibold text-[hsl(8_72%_42%)]">
                {formatBDT(maxPrice)}
              </span>
              <input
                type="range"
                min={50}
                max={2500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-[hsl(8_72%_42%)]"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={pickOnly}
                onChange={(e) => setPickOnly(e.target.checked)}
                className="h-4 w-4 accent-[hsl(8_72%_42%)]"
              />
              <span className="text-sm">Today's picks only</span>
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-md border border-[hsl(155_18%_14%)]/20 bg-transparent px-3 py-1.5 text-sm text-[hsl(155_18%_14%)] outline-none transition-colors hover:border-[hsl(8_72%_42%)] focus:border-[hsl(8_72%_42%)]"
            >
              <option value="fresh">Freshest first</option>
              <option value="popular">Most popular</option>
              <option value="price-asc">Price · low → high</option>
              <option value="price-desc">Price · high → low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>
      </section>

      <AisleDivider
        number={aisle === "All" ? "Aisle 01" : "Aisle 02"}
        label={aisle === "All" ? "All aisles" : aisle}
      />

      {/* ===== Product shelves ===== */}
      <section className="container pb-28 pt-4 md:pb-36">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-foreground/20 bg-background/60 py-20 text-center">
            <p className="font-chalk text-4xl text-leaf">
              Stall's empty — try another aisle.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Clear your search, widen the price, or pick a different aisle above.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} index={i} priority={i < 5} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ===== Sticky basket bar (only when items in cart) ===== */}
      {cartCount > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
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
