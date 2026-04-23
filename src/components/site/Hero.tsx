import { useState } from "react";
import { ArrowRight, MapPin, CalendarDays, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/stores/booking";

// Served from public/ and preloaded via <link rel="preload"> in index.html.
// This lets the browser start fetching during HTML parse — before JS executes.
const HERO_SRC = "/images/hero-room.webp";

/**
 * Hero section — the LCP element.
 *
 * ALL above-the-fold text uses CSS @keyframes instead of framer-motion so
 * the content is visible immediately when CSS loads — no JS execution delay.
 * This eliminates ~2.8s of "Element Render Delay" that Lighthouse penalises.
 *
 * framer-motion is NOT imported here to keep this critical-path component
 * light and to avoid TBT overhead from motion's initial JS setup.
 */
const Hero = () => {
  const navigate = useNavigate();
  const setDates = useBooking((s) => s.setDates);
  const setGuests = useBooking((s) => s.setGuests);

  const today = new Date().toISOString().slice(0, 10);
  const tmrw = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tmrw);
  const [guests, setGuestCount] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDates(checkIn, checkOut);
    setGuests(guests);
    navigate("/rooms");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Background — fixed dimensions reserve space, no parallax to keep main thread free */}
      <div className="absolute inset-0">
        <img
          src={HERO_SRC}
          alt="A warmly lit private bedroom in Dhaka at golden hour"
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/30 to-primary/85" />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-end pb-12 pt-32 text-primary-foreground md:pb-20 md:pt-28">
        {/* Subtitle — CSS animation: fade-up, 0ms delay */}
        <p className="hero-fade-up mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-primary-foreground/75">
          <span className="h-px w-10 bg-accent" /> Stays in Dhaka · Curated since 2019
        </p>

        {/* h1 — THE LCP element. Must be visible from first CSS paint. */}
        <h1 className="max-w-5xl font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight">
          <span className="block">
            An address
          </span>
          <span className="block italic text-accent">
            in Dhaka.
          </span>
        </h1>

        {/* Subtext — Often the LCP element on mobile due to text wrapping */}
        <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/80">
          Hand-picked rooms and apartments across Dhanmondi, Lalmatia and the city's quieter corners.
          Verified hosts, transparent pricing, an arrival that feels like coming home.
        </p>

        {/* Search panel — CSS animation */}
        <form
          onSubmit={handleSearch}
          className="hero-fade-up mt-10 grid w-full max-w-4xl grid-cols-1 gap-px overflow-hidden bg-background/95 text-foreground shadow-elegant backdrop-blur md:grid-cols-[1.4fr_1fr_1fr_auto]"
          style={{ animationDelay: "450ms" }}
        >
          <label className="flex flex-col gap-1 px-5 py-4 transition-colors focus-within:bg-background">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <MapPin className="h-3 w-3" /> Where
            </span>
            <select
              defaultValue="dhaka"
              className="w-full bg-transparent font-display text-lg outline-none"
            >
              <option value="dhaka">Dhaka</option>
              <option value="dhanmondi">Dhanmondi</option>
              <option value="lalmatia">Lalmatia</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 border-t border-border px-5 py-4 transition-colors focus-within:bg-background md:border-l md:border-t-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <CalendarDays className="h-3 w-3" /> Check-in
            </span>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent font-display text-lg outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 border-t border-border px-5 py-4 transition-colors focus-within:bg-background md:border-l md:border-t-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <Users className="h-3 w-3" /> Guests
            </span>
            <input
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
              className="w-full bg-transparent font-display text-lg outline-none"
            />
          </label>
          <button
            type="submit"
            className="group flex items-center justify-center gap-3 bg-accent px-7 py-5 text-[11px] uppercase tracking-[0.25em] text-accent-foreground transition-[background-color,transform] duration-150 hover:bg-foreground hover:text-background active:scale-[0.97]"
          >
            Find rooms
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Stats row — CSS animation */}
        <div
          className="hero-fade-up mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-primary-foreground/15 pt-6 text-primary-foreground/70"
          style={{ animationDelay: "650ms" }}
        >
          {[
            { v: "2,746", l: "Homes in Dhaka" },
            { v: "4.91★", l: "Average rating" },
            { v: "24/7", l: "Self check-in" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-3">
              <div className="font-display text-2xl text-primary-foreground">{s.v}</div>
              <div className="text-[10px] uppercase tracking-[0.22em]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
