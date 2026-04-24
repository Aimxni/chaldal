import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SmartImage from "@/components/ui/smart-image";
import RoomCard from "@/components/site/RoomCard";
import LazyRoomCard from "@/components/site/LazyRoomCard";
import { formatBDT, getRoomBySlug, rooms } from "@/data/rooms";
import { nightsBetween, useBooking } from "@/stores/booking";

const RoomDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const room = slug ? getRoomBySlug(slug) : undefined;
  const navigate = useNavigate();
  const draft = useBooking((s) => s.draft);
  const setDates = useBooking((s) => s.setDates);
  const setGuests = useBooking((s) => s.setGuests);
  const selectRoom = useBooking((s) => s.selectRoom);

  const today = new Date().toISOString().slice(0, 10);
  const tmrw = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState(draft.checkIn ?? today);
  const [checkOut, setCheckOut] = useState(draft.checkOut ?? tmrw);
  const [guests, setGuestCount] = useState(draft.guests || 2);

  // Update title for SEO + scroll to top on slug change.
  useEffect(() => {
    if (room) {
      document.title = `${room.title} · Travela`;
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [room]);

  const nights = nightsBetween(checkIn, checkOut);
  const subtotal = room ? room.price * Math.max(nights, 1) : 0;
  const serviceFee = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee;

  const similar = useMemo(
    () =>
      room
        ? rooms
            .filter((r) => r.id !== room.id && r.neighborhood === room.neighborhood)
            .slice(0, 4)
        : [],
    [room],
  );

  // Build a small gallery — duplicate listing image for variety until we have multi-image data.
  const gallery = useMemo(() => {
    if (!room) return [];
    const others = rooms
      .filter((r) => r.id !== room.id && r.neighborhood === room.neighborhood)
      .slice(0, 4)
      .map((r) => r.image);
    return [room.image, ...others].slice(0, 5);
  }, [room]);

  if (!room) {
    return (
      <main>
        <Navbar />
        <section className="container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">404 · Room</p>
          <h1 className="font-display text-5xl">We couldn't find that room.</h1>
          <Link
            to="/rooms"
            className="inline-flex items-center gap-3 border-b border-foreground/40 pb-1 text-xs uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all rooms
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const handleReserve = () => {
    setDates(checkIn, checkOut);
    setGuests(guests);
    selectRoom({ id: room.id, title: room.title, image: room.image, price: room.price });
    navigate("/checkout");
  };

  return (
    <main>
      <Navbar />

      {/* Top spacing for fixed nav */}
      <div className="container pt-28 md:pt-36">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All rooms
        </Link>

        {/* Title block */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              {room.neighborhood}
              {room.area ? ` · ${room.area}` : ""}
            </p>
            <h1 className="hero-fade-up font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">
              {room.title}
            </h1>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <strong className="font-display text-base">{room.rating.toFixed(2)}</strong>
              <span className="text-muted-foreground">· verified stays</span>
            </span>
            <span className="hidden items-center gap-1.5 text-muted-foreground sm:flex">
              <MapPin className="h-3.5 w-3.5" /> Dhaka
            </span>
          </div>
        </div>

        {/* Gallery — fixed aspect ratios → zero CLS */}
        <div className="mt-8 grid grid-cols-1 gap-2 md:mt-10 md:grid-cols-4 md:grid-rows-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-secondary md:col-span-2 md:row-span-2 md:aspect-auto">
            <SmartImage
              src={gallery[0]}
              alt={`${room.title} — main view`}
              width={1200}
              height={1200}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          {gallery.slice(1, 5).map((src, i) => (
            <div
              key={i}
              className="relative hidden aspect-[4/3] overflow-hidden bg-secondary md:block"
            >
              <SmartImage
                src={src}
                alt={`${room.title} — view ${i + 2}`}
                width={640}
                height={480}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main two-column area */}
      <section className="container mt-12 grid grid-cols-1 gap-12 pb-20 md:mt-16 md:grid-cols-12 md:gap-16 md:pb-32">
        {/* Left: details */}
        <div className="md:col-span-7 lg:col-span-8">
          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-5 text-sm">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              {room.guests} guests
            </span>
            <span className="flex items-center gap-2">
              <span className="font-display text-base">{room.bedrooms}</span>
              {room.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </span>
            {room.badges.includes("Self Check-in") && (
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Self check-in
              </span>
            )}
            {room.badges.includes("Couple Friendly") && (
              <span className="flex items-center gap-2 text-muted-foreground">
                · Couple friendly
              </span>
            )}
          </div>

          {/* Story */}
          <div className="mt-10">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              About this <span className="italic text-accent">stay</span>
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {room.blurb}
            </p>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Hosted by a verified local who has welcomed Travela guests for years. Fresh linen,
              spotless washroom, working AC, and a quiet Dhaka address you'll want to return to.
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-12">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              What's <span className="italic text-accent">inside</span>
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 border-b border-border/70 py-3 text-sm text-foreground"
                >
                  <Check className="h-4 w-4 text-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* House rules */}
          <div className="mt-12 rounded-md bg-secondary/40 p-6 md:p-8">
            <h3 className="font-display text-2xl">House notes</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li>· Check-in: 2:00 PM — flexible</li>
              <li>· Check-out: 12:00 PM</li>
              <li>· Quiet hours after 10 PM</li>
              <li>· No smoking inside the unit</li>
              <li>· Government photo ID required</li>
              <li>· Free cancellation up to 48h before</li>
            </ul>
          </div>
        </div>

        {/* Right: sticky booking widget */}
        <aside className="md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-28">
            <div className="border border-border bg-card p-6 shadow-elegant md:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <span className="font-display text-3xl text-foreground">
                    {formatBDT(room.price)}
                  </span>
                  <span className="ml-1 text-sm text-muted-foreground">/ night</span>
                </div>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  {room.rating.toFixed(2)}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
                <label className="flex flex-col gap-1 bg-card p-3 transition-colors focus-within:bg-background">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <CalendarDays className="h-3 w-3" /> Check-in
                  </span>
                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent font-display text-base outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 bg-card p-3 transition-colors focus-within:bg-background">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <CalendarDays className="h-3 w-3" /> Check-out
                  </span>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent font-display text-base outline-none"
                  />
                </label>
                <label className="col-span-2 flex flex-col gap-1 bg-card p-3 transition-colors focus-within:bg-background">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <Users className="h-3 w-3" /> Guests
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={room.guests}
                    value={guests}
                    onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
                    className="w-full bg-transparent font-display text-base outline-none"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={handleReserve}
                className="btn btn-lg btn-accent group mt-5 w-full !rounded-md"
              >
                Reserve
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                You won't be charged yet
              </p>

              {/* Price breakdown */}
              <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>
                    {formatBDT(room.price)} × {Math.max(nights, 1)}{" "}
                    {Math.max(nights, 1) === 1 ? "night" : "nights"}
                  </span>
                  <span>{formatBDT(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Service fee</span>
                  <span>{formatBDT(serviceFee)}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="font-display text-base">Total</span>
                  <span className="font-display text-xl">{formatBDT(total)}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Verified host · 24/7 support
            </p>
          </div>
        </aside>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="container pb-24 md:pb-32">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                <span className="h-px w-10 bg-accent" /> More in {room.neighborhood}
              </p>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">
                Other stays nearby
              </h2>
            </div>
            <Link
              to="/rooms"
              className="hidden items-center gap-3 border-b border-foreground/40 pb-1 text-xs uppercase tracking-[0.25em] text-foreground hover:border-accent hover:text-accent md:inline-flex"
            >
              All rooms <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((r, i) => (
              <LazyRoomCard key={r.id} room={r} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default RoomDetail;
