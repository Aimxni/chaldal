import { Plus, Star } from "lucide-react";
import { useState } from "react";
import SmartImage from "@/components/ui/smart-image";
import { Btn } from "@/components/ui/btn";
import { useCart } from "@/stores/cart";
import { Room, formatBDT } from "@/data/rooms";

type Props = {
  room: Room;
  index?: number;
  priority?: boolean;
};

/**
 * ProductCard — a wood-crate grocery shelf item.
 *
 * Re-uses the existing `Room` data (title, image, price, badges) and
 * presents it as a market product with a hand-written ৳ price tag,
 * unit chip, and an "Add to basket" CTA wired into the cart store.
 */
const ProductCard = ({ room, index = 0, priority = false }: Props) => {
  const recommended = room.badges.includes("Highly Recommended");
  const add = useCart((s) => s.add);
  const [popped, setPopped] = useState(false);

  // Derive a believable grocery unit from the data (no business logic change).
  const unit =
    room.bedrooms >= 3 ? "per crate" : room.bedrooms === 2 ? "per pack" : "per kg";

  const handleAdd = () => {
    add(
      {
        id: room.id,
        name: room.title,
        unit,
        price: room.price,
        img: room.image,
      },
      1,
    );
    setPopped(true);
    window.setTimeout(() => setPopped(false), 450);
  };

  // Subtle alternating crate tilt for visual rhythm
  const tilt = index % 3 === 0 ? "-1.5deg" : index % 3 === 1 ? "0.8deg" : "-0.6deg";

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[1.25rem] bg-crate p-1.5 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      {/* Two "nail heads" on the wood crate */}
      <span aria-hidden className="absolute left-2 top-2 z-10 h-1.5 w-1.5 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />
      <span aria-hidden className="absolute right-2 top-2 z-10 h-1.5 w-1.5 rounded-full bg-foreground/30 shadow-[inset_0_-1px_0_hsl(0_0%_0%/0.2)]" />

      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem] bg-secondary">
        <SmartImage
          src={room.image}
          alt={room.title}
          width={640}
          height={800}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />

        {/* Floating ৳ price-tag — top-left, hand-tied */}
        <span
          className="price-tag absolute left-3 top-3"
          style={{ transform: `rotate(${tilt})` }}
        >
          {formatBDT(room.price)}
          <span className="ml-1 text-xs font-normal opacity-70">/ {unit.replace("per ", "")}</span>
        </span>

        {/* Rating chip — top-right */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[11px] font-medium text-foreground shadow-sm backdrop-blur">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {room.rating.toFixed(1)}
        </div>

        {recommended && (
          <span className="font-chalk absolute bottom-3 left-3 rounded-md bg-accent px-2 py-0.5 text-base leading-none text-accent-foreground shadow-sm">
            ✦ today's pick
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-3">
        <div className="font-chalk text-base leading-none text-background/90">
          {room.area ?? room.neighborhood} stall
        </div>
        <h3 className="font-marker text-base leading-tight text-background drop-shadow-[0_1px_2px_hsl(0_0%_0%/0.4)]">
          {room.title}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex flex-col leading-tight">
            <span className="font-display text-xl font-medium text-background">
              {formatBDT(room.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-background/70">
              {unit}
            </span>
          </div>
          <Btn
            variant="accent"
            size="sm"
            onClick={handleAdd}
            aria-label={`Add ${room.title} to basket`}
            className={popped ? "scale-95" : ""}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            {popped ? "Added" : "Basket"}
          </Btn>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
