import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Room, formatBDT } from "@/data/rooms";
import SmartImage from "@/components/ui/smart-image";

type Props = {
  room: Room;
  index?: number;
  /** Eager-load the first few cards for better LCP. */
  priority?: boolean;
};

const RoomCard = ({ room, index = 0, priority = false }: Props) => {
  const recommended = room.badges.includes("Highly Recommended");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
    >
      <Link
        to={`/rooms/${room.slug}`}
        className="block transition-transform duration-200 active:scale-[0.99]"
      >
        {/* Aspect ratio reserved → zero CLS */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <SmartImage
            src={room.image}
            alt={room.title}
            width={640}
            height={800}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {recommended && (
            <span className="absolute left-3 top-3 bg-background/95 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-foreground backdrop-blur">
              Highly Recommended
            </span>
          )}

          <div className="absolute right-3 top-3 flex items-center gap-1 bg-foreground/85 px-2.5 py-1 text-[11px] text-background backdrop-blur">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {room.rating.toFixed(2)}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {room.area ?? room.neighborhood}
          </div>
          <h3 className="font-display text-xl leading-tight text-foreground transition-colors group-hover:text-accent">
            {room.title}
          </h3>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-display text-lg text-foreground">{formatBDT(room.price)}</span>
            <span className="text-xs text-muted-foreground">per night</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default RoomCard;
