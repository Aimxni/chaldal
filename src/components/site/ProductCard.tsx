import { useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "@/components/ui/smart-image";
import { useCart } from "@/stores/cart";
import { Product, formatBDT, uSet } from "@/data/products";

type Props = {
  product: Product;
  index?: number;
  /** Eager-load the first few cards above the fold for better LCP. */
  priority?: boolean;
};

/**
 * ProductCard — minimal "team-card" style (inspired by untillabs.com/our-team).
 *
 * Clean rounded image on top, name + meta line below, and a quiet text-link
 * "BASKET" CTA at the bottom-right that mirrors their CONNECT link.
 *
 * Click the card → product detail. Click "BASKET" → adds to cart (no nav).
 */
const ProductCard = ({ product, priority = false }: Props) => {
  const add = useCart((s) => s.add);
  const [popped, setPopped] = useState(false);

  const oos = product.stock <= 0;
  const isPick = product.badges.includes("Today's Pick");

  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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
    window.setTimeout(() => setPopped(false), 600);
  };

  return (
    <Link
      to={`/shop/${product.slug}`}
      aria-label={`${product.name} — view details`}
      className="group flex h-full flex-col focus-visible:outline-none"
    >
      {/* Image — clean rounded frame, no chrome */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[hsl(38_45%_94%)]">
        <SmartImage
          src={product.image}
          srcSet={uSet(product.image)}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          alt={product.name}
          width={480}
          height={600}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
        />
        {/* Tiny "today's pick" dot — bottom-right of image, restrained */}
        {isPick && !oos && (
          <span
            aria-label="Today's pick"
            className="absolute bottom-3 right-3 grid h-2 w-2 place-items-center rounded-full bg-[hsl(8_72%_42%)] ring-2 ring-[hsl(38_45%_94%)]"
          />
        )}
        {oos && (
          <span className="absolute inset-0 grid place-items-center bg-[hsl(155_18%_14%)]/55 backdrop-blur-[1px]">
            <span className="font-untill-mono rounded-sm bg-[hsl(38_45%_96%)]/95 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[hsl(155_18%_14%)]">
              Out of stock
            </span>
          </span>
        )}
      </div>

      {/* Body — name, meta, basket CTA. Untill-style: outside the image frame. */}
      <div className="flex flex-1 flex-col gap-1 px-1 pt-4">
        <h3 className="font-untill-display text-[1.05rem] leading-tight text-[hsl(155_18%_14%)] transition-colors group-hover:text-[hsl(8_72%_42%)] group-focus-visible:text-[hsl(8_72%_42%)]">
          {product.name}
        </h3>
        <p className="font-untill-mono text-[11px] uppercase text-[hsl(155_18%_14%)]/55">
          {product.category} · {formatBDT(product.price)}
          <span className="text-[hsl(155_18%_14%)]/35"> / {product.unit}</span>
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-[hsl(155_18%_14%)]/12 pt-3">
          <span className="font-untill-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(155_18%_14%)]/50">
            ★ {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString("en-IN")}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={oos}
            aria-label={oos ? "Out of stock" : `Add ${product.name} to basket`}
            className={[
              "font-untill-mono text-[10px] uppercase tracking-[0.28em] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              popped
                ? "text-[hsl(8_72%_42%)]"
                : "text-[hsl(155_18%_14%)]/75 hover:text-[hsl(8_72%_42%)]",
            ].join(" ")}
          >
            {oos ? "—" : popped ? "Added →" : "Basket →"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
