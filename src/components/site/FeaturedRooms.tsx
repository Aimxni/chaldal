import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RoomCard from "./RoomCard";
import LazyRoomCard from "./LazyRoomCard";
import { rooms } from "@/data/rooms";

const FeaturedRooms = () => {
  const featured = rooms.filter((r) => r.badges.includes("Highly Recommended")).slice(0, 8);

  return (
    <section id="rooms" className="container py-24 md:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Highly Recommended
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl"
          >
            Rooms our guests <span className="italic text-accent">return</span> to.
          </motion.h2>
        </div>
        <Link
          to="/rooms"
          className="group inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          See all 2,746 stays
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((r, i) =>
          i < 2 ? (
            <RoomCard key={r.id} room={r} index={i} priority />
          ) : (
            <LazyRoomCard key={r.id} room={r} index={i} />
          ),
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;

