import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShoppingBasket, Search } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
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

/**
 * Shop (/rooms) — visual language ported from untillabs.com/our-team:
 *  • Centered atmospheric hero (red "sky" gradient instead of blue)
 *  • Monospace tagline in ( parentheses ) above an oversized display title
 *  • Quiet text-link filter strip (no pills)
 *  • Minimal team-card style product grid
 *  • "What we care about" values strip before the footer
 *
 * Functionality (search, filters, cart, pagination) is unchanged.
 */
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

  // Progressive disclosure — render the first PAGE_SIZE products immediately
  // and load more as the user nears the bottom.
  const PAGE_SIZE = 12;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

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
        list = [...list].sort(
          (a, b) =>
            Number(b.badges.includes("Today's Pick")) -
              Number(a.badges.includes("Today's Pick")) ||
            b.rating - a.rating,
        );
    }
    return list;
  }, [aisle, sort, pickOnly, deferredMaxPrice, deferredQuery]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [aisle, sort, pickOnly, deferredMaxPrice, deferredQuery]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisibleCount((n) => Math.min(n + PAGE_SIZE, filtered.length));
          }
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [filtered.length]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Aisle list — "All" first, then real categories
  const aisleChips: { key: AisleKey; label: string }[] = [
    { key: "All", label: "All" },
    ...CATEGORIES.map((c) => ({ key: c.key, label: c.key })),
  ];

  // Values strip — mirrors Untill's "What We Care About" 3×2 grid.
  const values: { label: string; copy: string }[] = [
    { label: "Picked at dawn", copy: "Every minute on the shelf matters." },
    { label: "Real prices", copy: "No surge, no fake discounts." },
    { label: "Honest weights", copy: "What the tag says is what you get." },
    { label: "Swap freely", copy: "Don't love it? Swap or refund." },
    { label: "Family of farms", copy: "We know every supplier by name." },
    { label: "One-hour promise", copy: "Counter to door, every order." },
  ];

  return (
    <main className="bg-[hsl(38_45%_96%)]">
      <Navbar />

      {/* ===== Split-panel hero — original layout, with gradient on the red side ===== */}
      <section
        aria-label="Chaldal shop — fresh groceries"
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(8 72% 38%) 0%, hsl(8 72% 46%) 55%, hsl(15 78% 54%) 100%)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr]">
          {/* LEFT — Tomato red sidebar with subtle gradient */}
          <div
            className="relative z-10 flex flex-col gap-8 px-6 pb-12 pt-28 text-[hsl(38_45%_96%)] sm:px-10 lg:gap-10 lg:px-14 lg:pb-16 lg:pt-32"
            style={{
              backgroundImage:
                "linear-gradient(160deg, hsl(8 72% 36%) 0%, hsl(8 72% 44%) 60%, hsl(15 78% 52%) 100%)",
            }}
          >
            <div className="hero-fade-up flex items-center justify-between font-untill-mono text-[11px] tracking-[0.05em] text-[hsl(38_45%_96%)]/75">
              <span>( open · daily 7 am – 11 pm )</span>
              <span className="hidden sm:inline">No. 02 — The Shop</span>
            </div>

            <div>
              <h1 className="lcp-fade font-untill-display text-[clamp(2.75rem,6vw,4.5rem)] text-[hsl(38_45%_96%)]">
                <span className="block">Fresh</span>
                <span className="block text-[hsl(38_90%_78%)]">groceries,</span>
                <span className="block">delivered hourly.</span>
              </h1>

              <p
                className="hero-fade-up mt-6 max-w-md text-base leading-relaxed text-[hsl(38_45%_96%)]/85 sm:text-lg"
                style={{ animationDelay: "0.15s" }}
              >
                <span className="font-untill-mono text-[hsl(38_90%_78%)]">
                  {filtered.length}
                </span>{" "}
                of {products.length} items in stock right now. Picked at dawn from
                Karwan Bazar — on your counter within the hour.
              </p>
            </div>

            {/* Search bar — frosted glass, premium look */}
            <div
              className="hero-fade-up mt-2"
              style={{ animationDelay: "0.25s" }}
            >
              <label className="font-untill-mono mb-3 block text-[11px] uppercase tracking-[0.18em] text-[hsl(38_45%_96%)]/65">
                What are you looking for?
              </label>
              <div className="search-glass flex items-stretch gap-2 rounded-full px-5 py-3">
                <Search className="h-4 w-4 self-center text-[hsl(38_45%_96%)]/80" strokeWidth={1.75} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for ilish, mango, doi…"
                  aria-label="Search products"
                  className="font-untill-mono min-w-0 flex-1 bg-transparent text-sm text-[hsl(38_45%_96%)] outline-none placeholder:text-[hsl(38_45%_96%)]/50"
                />
              </div>

              <div
                className="hero-fade-up font-untill-mono mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-[hsl(38_45%_96%)]/75"
                style={{ animationDelay: "0.35s" }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_78%)]" />
                  Free delivery over ৳999
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_78%)]" />
                  Cash · bKash · card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_78%)]" />
                  Swap anything you don't love
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Full-bleed produce image. object-contain so the entire
              composition stays visible at every viewport. */}
          <div className="relative min-h-[65svh] overflow-hidden lg:min-h-[80svh] lg:self-stretch">
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
          </div>
        </div>
      </section>

      {/* ========== INTRO — "We stock what we'd cook tonight." ========== */}
      <section className="bg-[hsl(38_45%_96%)] px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center text-[hsl(155_18%_14%)]">
          <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
            ( Our shelves )
          </p>
          <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-[hsl(155_18%_14%)]">
            We stock what we'd cook tonight.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[hsl(155_18%_14%)]/70 sm:text-base">
            Some of our supply comes from farms we've worked with for fifteen years.
            Others arrived last month after one good melon. What unites them is
            proof of work: produce that earns its place on your counter.
          </p>
        </div>
      </section>

      {/* ========== FILTER STRIP — quiet text-buttons, no pills ========== */}
      <section className="border-y border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)]">
        <div className="container flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
          <nav className="font-untill-mono flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.16em]">
            {aisleChips.map((a) => {
              const active = aisle === a.key;
              return (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setAisle(a.key)}
                  className={[
                    "relative pb-1 transition-colors",
                    active
                      ? "text-[hsl(8_72%_42%)]"
                      : "text-[hsl(155_18%_14%)]/55 hover:text-[hsl(155_18%_14%)]",
                    active
                      ? "after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[hsl(8_72%_42%)]"
                      : "",
                  ].join(" ")}
                >
                  {a.label}
                </button>
              );
            })}
          </nav>

          {/* Right-side controls */}
          <div className="font-untill-mono ml-auto flex flex-wrap items-center gap-5 text-[12px] uppercase tracking-[0.14em] text-[hsl(155_18%_14%)]/65">
            <label className="flex items-center gap-2">
              <span>Max</span>
              <span className="text-[hsl(8_72%_42%)]">{formatBDT(maxPrice)}</span>
              <input
                type="range"
                min={50}
                max={2500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[hsl(8_72%_42%)]"
                aria-label="Maximum price"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={pickOnly}
                onChange={(e) => setPickOnly(e.target.checked)}
                className="h-3.5 w-3.5 accent-[hsl(8_72%_42%)]"
              />
              <span>Picks</span>
            </label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="font-untill-mono cursor-pointer border-0 border-b border-transparent bg-transparent pb-0.5 text-[12px] uppercase tracking-[0.14em] text-[hsl(155_18%_14%)] outline-none transition-colors hover:border-[hsl(8_72%_42%)] focus:border-[hsl(8_72%_42%)]"
              aria-label="Sort"
            >
              <option value="fresh">Freshest</option>
              <option value="popular">Popular</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* ========== PRODUCT GRID — minimal team-card style ========== */}
      <section className="container py-8 md:py-10">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-untill-display text-3xl text-[hsl(155_18%_14%)]">
              Nothing on the shelf.
            </p>
            <p className="font-untill-mono mt-3 text-xs uppercase tracking-[0.2em] text-[hsl(155_18%_14%)]/55">
              Clear your search or widen the price.
            </p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
              {visibleProducts.map((p, i) => (
                <li key={p.id}>
                  <ProductCard product={p} index={i} priority={false} />
                </li>
              ))}
            </ul>
            {hasMore && (
              <div ref={sentinelRef} className="mt-16 flex justify-center">
                <span className="font-untill-mono text-[11px] uppercase tracking-[0.3em] text-[hsl(155_18%_14%)]/40">
                  Loading more…
                </span>
              </div>
            )}
          </>
        )}
      </section>

      {/* ========== VALUES — "What we care about" 3×2 grid ========== */}
      <section className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
              ( Our principles )
            </p>
            <h2 className="font-untill-display mt-5 text-[clamp(2rem,4.5vw,3rem)] text-[hsl(155_18%_14%)]">
              What we care about.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[hsl(155_18%_14%)]/70">
              We're building a grocer that earns the trust of one neighbourhood at
              a time. To this end, we hold ourselves to the standards we'd want of
              the people feeding our families.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <li
                key={v.label}
                className="bg-[hsl(38_45%_96%)] px-7 py-8 transition-colors hover:bg-[hsl(38_45%_94%)]"
              >
                <h3 className="font-untill-display text-lg text-[hsl(155_18%_14%)]">
                  {v.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[hsl(155_18%_14%)]/65">
                  {v.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========== Sticky basket bar ========== */}
      {cartCount > 0 && (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-[hsl(38_45%_94%)]/15 bg-[hsl(155_18%_14%)] px-4 py-2.5 shadow-elegant">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(8_72%_42%)] text-[hsl(38_45%_96%)]">
              <ShoppingBasket className="h-4 w-4" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-untill-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(38_45%_94%)]/75">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
              <span className="font-untill-display text-sm text-[hsl(38_45%_94%)]">
                {formatBDT(cartTotal)} · free over ৳999
              </span>
            </div>
            <BtnLink to="/checkout" variant="ivory" size="sm" className="ml-2">
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
