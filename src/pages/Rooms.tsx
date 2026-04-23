import { useDeferredValue, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import RoomCard from "@/components/site/RoomCard";
import LazyRoomCard from "@/components/site/LazyRoomCard";
import { rooms, NEIGHBORHOODS } from "@/data/rooms";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

const Rooms = () => {
  const [neighbourhood, setNeighbourhood] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [recommendedOnly, setRecommendedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(7000);
  // Deferring keeps slider drag at 60fps even on slower devices.
  const deferredMaxPrice = useDeferredValue(maxPrice);

  const filtered = useMemo(() => {
    let list = rooms.filter((r) => r.price <= deferredMaxPrice);
    if (neighbourhood !== "All") {
      list = list.filter((r) => r.neighborhood === neighbourhood);
    }
    if (recommendedOnly) {
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
  }, [neighbourhood, sort, recommendedOnly, deferredMaxPrice]);

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="bg-background pb-10 pt-32 md:pb-16 md:pt-40">
        <div className="container">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" /> Stays · Dhaka
          </p>
          <h1 className="hero-fade-up max-w-3xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
            All <span className="italic text-accent">rooms</span> in Dhaka.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            {filtered.length} of {rooms.length} curated stays. Filter by neighbourhood, price, or
            our highly-recommended list.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-20 z-30 border-y border-border bg-background/95 backdrop-blur">
        <div className="container flex flex-wrap items-center gap-4 py-4 text-sm">
          <FilterSelect
            label="Neighbourhood"
            value={neighbourhood}
            onChange={setNeighbourhood}
            options={["All", ...NEIGHBORHOODS]}
          />
          <FilterSelect
            label="Sort"
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={[
              { value: "recommended", label: "Recommended" },
              { value: "price-asc", label: "Price · low to high" },
              { value: "price-desc", label: "Price · high to low" },
              { value: "rating", label: "Top rated" },
            ]}
          />
          <label className="flex items-center gap-3 px-1">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Max ৳{maxPrice.toLocaleString("en-IN")}
            </span>
            <input
              type="range"
              min={1500}
              max={7000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-40 accent-accent"
            />
          </label>
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.22em] text-foreground/80">
            <input
              type="checkbox"
              checked={recommendedOnly}
              onChange={(e) => setRecommendedOnly(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Highly recommended only
          </label>
        </div>
      </section>

      {/* Grid */}
      <section className="container py-12 md:py-20">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-display text-3xl">No rooms match your filters.</p>
            <p className="mt-3 text-sm text-muted-foreground">Try widening the price or neighbourhood.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((r, i) =>
              i < 4 ? (
                <RoomCard key={r.id} room={r} index={i} priority />
              ) : (
                <LazyRoomCard key={r.id} room={r} index={i} />
              ),
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

type Option = string | { value: string; label: string };

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) => (
  <label className="flex items-center gap-2">
    <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer border border-border bg-background px-3 py-2 font-body text-sm outline-none transition-colors hover:border-foreground focus:border-accent"
    >
      {options.map((o) => {
        const v = typeof o === "string" ? o : o.value;
        const l = typeof o === "string" ? o : o.label;
        return (
          <option key={v} value={v}>
            {l}
          </option>
        );
      })}
    </select>
  </label>
);

export default Rooms;
