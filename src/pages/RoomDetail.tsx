import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBasket,
  Star,
  Truck,
} from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SmartImage from "@/components/ui/smart-image";
import ProductCard from "@/components/site/ProductCard";
import { Btn, BtnLink } from "@/components/ui/btn";
import { formatBDT, getProductBySlug, products } from "@/data/products";
import { useCart, selectCartCount } from "@/stores/cart";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [popped, setPopped] = useState(false);

  const add = useCart((s) => s.add);
  const cartCount = useCart(selectCartCount);

  // Title for SEO + scroll to top whenever the slug changes
  useEffect(() => {
    if (product) {
      document.title = `${product.name} · Chaldal`;
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setQty(1);
      setActiveImg(0);
    }
  }, [product]);

  // Build a small gallery — primary image plus three other items in the
  // same category (gives the gallery rail visual variety until we have
  // multi-image catalog data).
  const gallery = useMemo(() => {
    if (!product) return [] as string[];
    const others = products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4)
      .map((p) => p.image);
    return [product.image, ...others].slice(0, 5);
  }, [product]);

  const related = useMemo(
    () =>
      product
        ? products
            .filter((p) => p.id !== product.id && p.category === product.category)
            .slice(0, 5)
        : [],
    [product],
  );

  if (!product) {
    return (
      <main className="bg-kraft">
        <Navbar />
        <section className="container flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            404 · Product
          </p>
          <h1 className="font-display text-5xl">We couldn't find that item.</h1>
          <BtnLink to="/rooms" variant="primary" size="md">
            <ArrowLeft className="h-4 w-4" /> Back to all aisles
          </BtnLink>
        </section>
        <Footer />
      </main>
    );
  }

  const oos = product.stock <= 0;
  const onSale =
    product.badges.includes("On Sale") &&
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;
  const savings = onSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  const subtotal = product.price * qty;

  const handleAdd = () => {
    if (oos) return;
    add(
      {
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        img: product.image,
      },
      qty,
    );
    setPopped(true);
    window.setTimeout(() => setPopped(false), 600);
  };

  return (
    <main className="bg-kraft">
      <Navbar />

      <div className="container pt-28 md:pt-36">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
        >
          <Link to="/rooms" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <span>·</span>
          <Link
            to={`/rooms?cat=${encodeURIComponent(product.category)}`}
            className="transition-colors hover:text-foreground"
          >
            {product.category}
          </Link>
          <span>·</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* ===== Two-column main area ===== */}
      <section className="container mt-8 grid grid-cols-1 gap-10 pb-20 md:mt-12 md:grid-cols-12 md:gap-12 md:pb-24">
        {/* ----- Gallery (left) ----- */}
        <div className="md:col-span-7">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-crate p-2 shadow-card">
            <span aria-hidden className="absolute left-3 top-3 z-10 h-2 w-2 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />
            <span aria-hidden className="absolute right-3 top-3 z-10 h-2 w-2 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] bg-secondary">
              <SmartImage
                src={gallery[activeImg]}
                alt={`${product.name} — view ${activeImg + 1}`}
                width={1200}
                height={1200}
                loading="eager"
                fetchPriority="high"
              />

              {/* Floating ৳ price tag — top-left of image */}
              <span className="price-tag absolute left-5 top-5 text-base">
                {formatBDT(product.price)}
                {onSale && (
                  <span className="ml-1.5 text-xs font-normal text-destructive line-through opacity-70">
                    {formatBDT(product.originalPrice!)}
                  </span>
                )}
              </span>

              {onSale && (
                <span className="font-marker absolute right-5 top-5 rounded-full bg-destructive px-3 py-1 text-xs uppercase tracking-[0.18em] text-destructive-foreground shadow-md">
                  Save {savings}%
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail rail */}
          <ul className="mt-3 grid grid-cols-5 gap-2">
            {gallery.map((src, i) => (
              <li key={src + i}>
                <button
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={activeImg === i}
                  className={[
                    "relative aspect-square w-full overflow-hidden rounded-lg bg-secondary transition-all",
                    activeImg === i
                      ? "outline outline-2 outline-offset-2 outline-accent"
                      : "opacity-70 hover:opacity-100",
                  ].join(" ")}
                >
                  <SmartImage
                    src={src}
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ----- Buy box (right, sticky on desktop) ----- */}
        <aside className="md:col-span-5">
          <div className="md:sticky md:top-28">
            {/* Aisle + name */}
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
              <span className="h-px w-10 bg-accent" />
              {product.category} · {product.origin}
            </p>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
              {product.name}
            </h1>

            {/* Rating + reviews */}
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Star className="h-4 w-4 fill-accent text-accent" />
                {product.rating.toFixed(1)}
              </span>
              <span>·</span>
              <span>{product.reviewCount.toLocaleString("en-IN")} reviews</span>
              <span>·</span>
              <span
                className={
                  oos
                    ? "text-destructive"
                    : product.stock < 30
                    ? "text-foreground"
                    : "text-leaf"
                }
              >
                {oos
                  ? "Out of stock"
                  : product.stock < 30
                  ? `Only ${product.stock} left`
                  : "In stock"}
              </span>
            </div>

            {/* Price block */}
            <div className="mt-6 flex items-baseline gap-3 border-y border-border py-5">
              <span className="font-display text-4xl text-foreground">
                {formatBDT(product.price)}
              </span>
              {onSale && (
                <>
                  <span className="font-display text-xl text-muted-foreground line-through">
                    {formatBDT(product.originalPrice!)}
                  </span>
                  <span className="font-marker rounded-md bg-destructive/10 px-2 py-0.5 text-xs uppercase tracking-[0.18em] text-destructive">
                    Save {savings}%
                  </span>
                </>
              )}
              <span className="ml-auto text-sm text-muted-foreground">
                {product.unit}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Badges */}
            {product.badges.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.badges.map((b) => (
                  <li
                    key={b}
                    className="font-marker rounded-full bg-secondary px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-secondary-foreground"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {/* Qty stepper + Add to basket */}
            <div className="mt-7 flex flex-wrap items-stretch gap-3">
              <div className="inline-flex items-stretch overflow-hidden rounded-full border border-foreground/15 bg-card">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1 || oos}
                  aria-label="Decrease quantity"
                  className="grid h-12 w-12 place-items-center text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="font-display grid min-w-[3rem] place-items-center px-2 text-lg tabular-nums text-foreground"
                  aria-live="polite"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQty((q) => Math.min(product.stock || 99, q + 1))
                  }
                  disabled={oos || qty >= product.stock}
                  aria-label="Increase quantity"
                  className="grid h-12 w-12 place-items-center text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Btn
                variant="accent"
                size="lg"
                onClick={handleAdd}
                disabled={oos}
                className="flex-1 min-w-[12rem]"
              >
                <ShoppingBasket className="h-4 w-4" />
                {oos
                  ? "Out of stock"
                  : popped
                  ? `Added × ${qty}`
                  : `Add to basket · ${formatBDT(subtotal)}`}
              </Btn>
            </div>

            {cartCount > 0 && (
              <BtnLink
                to="/checkout"
                variant="secondary"
                size="md"
                className="mt-3 w-full"
              >
                View basket ({cartCount})
              </BtnLink>
            )}

            {/* Trust strip */}
            <ul className="mt-7 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4 text-leaf" />
                Delivery within 1 hour
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-leaf" />
                Free returns, no questions
              </li>
            </ul>
          </div>
        </aside>
      </section>

      {/* ===== Details + storage notes ===== */}
      <section className="bg-chalkboard">
        <div className="container grid grid-cols-1 gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-chalk text-2xl text-[hsl(45_96%_60%)]">
              what's in the crate —
            </p>
            <h2 className="font-display mt-2 text-3xl text-[hsl(38_45%_94%)] md:text-4xl">
              Product details
            </h2>
            <ul className="mt-6 space-y-3">
              {product.details.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 border-b border-[hsl(38_45%_94%)]/15 pb-3 text-[hsl(38_45%_94%)]/85"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-[hsl(45_96%_60%)]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-chalk text-2xl text-[hsl(45_96%_60%)]">
              from our growers —
            </p>
            <h2 className="font-display mt-2 text-3xl text-[hsl(38_45%_94%)] md:text-4xl">
              Sourced from {product.origin}
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-[hsl(38_45%_94%)]/80">
              Every {product.name.toLowerCase()} you order is hand-selected by our
              buyers at the source, transported in temperature-controlled trucks,
              and quality-checked again at our Dhanmondi fulfilment centre before
              it reaches your door. If anything isn't right, we'll refund you on
              the spot — that's our promise.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-[hsl(38_45%_94%)]/75">
              <li>· Cold chain maintained</li>
              <li>· Verified suppliers only</li>
              <li>· Quality-checked twice</li>
              <li>· 100% return guarantee</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Related ===== */}
      {related.length > 0 && (
        <section className="container py-20 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
                <span className="h-px w-10 bg-accent" />
                More from {product.category}
              </p>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">
                You might also like
              </h2>
            </div>
            <Link
              to="/rooms"
              className="hidden items-center gap-3 border-b border-foreground/40 pb-1 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              All aisles
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((p, i) => (
              <li key={p.id}>
                <ProductCard product={p} index={i} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default ProductDetail;
