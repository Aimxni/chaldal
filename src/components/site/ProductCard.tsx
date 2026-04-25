import { Plus, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/ui/smart-image";
import { Btn } from "@/components/ui/btn";
import { useCart } from "@/stores/cart";
import { Product, formatBDT } from "@/data/products";

type Props = {
  product: Product;
  index?: number;
  /** Eager-load the first few cards above the fold for better LCP. */
  priority?: boolean;
};

/**
 * ProductCard — wood-crate market shelf item.
 *
 * Photo + hand-tied price tag, quick-add to basket, and a clickable
 * surface that routes to the product detail page.
 */
const ProductCard = ({ product, index = 0, priority = false }: Props) => {
  const add = useCart((s) => s.add);
  const [popped, setPopped] = useState(false);

  const isPick = product.badges.includes("Today's Pick");
  const onSale =
    product.badges.includes("On Sale") &&
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;
  const oos = product.stock <= 0;

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // The card itself is wrapped in a <Link>; stop the click from navigating.
    e.preventDefault();
    e.stopPropagation();
    if (oos) return;
    add(
      {
        id: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        img: product.image,
      },
      1,
    );
    setPopped(true);
    window.setTimeout(() => setPopped(false), 450);
  };

  // Subtle alternating crate tilt for visual rhythm
  const tilt =
    index % 3 === 0 ? "-1.5deg" : index % 3 === 1 ? "0.8deg" : "-0.6deg";

  return (
    <Link
      to={`/shop/${product.slug}`}
      aria-label={`${product.name} — view details`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-crate p-1.5 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:-translate-y-1 focus-visible:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* Two "nail heads" on the wood crate */}
      <span aria-hidden className="absolute left-2 top-2 z-10 h-1.5 w-1.5 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />
      <span aria-hidden className="absolute right-2 top-2 z-10 h-1.5 w-1.5 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />

      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem] bg-secondary">
        <SmartImage
          src={product.image}
          alt={product.name}
          width={640}
          height={800}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />

        {/* Floating hand-tied ৳ price tag — top-left */}
        <span
          className="price-tag absolute left-3 top-3"
          style={{ transform: `rotate(${tilt})` }}
        >
          {formatBDT(product.price)}
          {onSale && (
            <span className="ml-1 text-[10px] font-normal text-destructive line-through opacity-70">
              {formatBDT(product.originalPrice!)}
            </span>
          )}
        </span>

        {/* Rating chip — top-right */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[11px] font-medium text-foreground shadow-sm backdrop-blur">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {product.rating.toFixed(1)}
        </div>

        {/* Bottom-left chalk badge */}
        {isPick && !oos && (
          <span className="font-chalk absolute bottom-3 left-3 rounded-md bg-accent px-2 py-0.5 text-base leading-none text-accent-foreground shadow-sm">
            ✦ today's pick
          </span>
        )}
        {oos && (
          <span className="absolute inset-0 grid place-items-center bg-foreground/55 backdrop-blur-[1px]">
            <span className="font-marker rounded-md bg-background/95 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground">
              Out of stock
            </span>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-3">
        <div className="font-chalk text-base leading-none text-background/90">
          {product.origin}
        </div>
        <h3 className="font-marker text-base leading-tight text-background drop-shadow-[0_1px_2px_hsl(0_0%_0%/0.4)]">
          {product.name}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.2em] text-background/70">
          {product.reviewCount.toLocaleString("en-IN")} reviews
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl font-medium text-background">
              {formatBDT(product.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-background/70">
              {product.unit}
            </span>
          </div>
          <Btn
            variant="accent"
            size="sm"
            onClick={handleAdd}
            disabled={oos}
            aria-label={oos ? "Out of stock" : `Add ${product.name} to basket`}
            className={popped ? "scale-95" : ""}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            {popped ? "Added" : "Basket"}
          </Btn>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
