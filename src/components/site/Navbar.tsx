import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import chaldalLogo from "@/assets/chaldal-logo.png";
import chaldalLogoWhite from "@/assets/chaldal-logo-white.png";
import { useCart, selectCartCount } from "@/stores/cart";

const links = [
  { label: "Shop", to: "/rooms" },
  { label: "Categories", to: "/#categories" },
  { label: "Deals", to: "/#deals" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const cartCount = useCart(selectCartCount);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(cartCount);

  // Bump the badge any time the count goes up.
  useEffect(() => {
    if (cartCount > prevCount.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 450);
      return () => window.clearTimeout(t);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.requestAnimationFrame(() => setScrolled(window.scrollY > 16));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = pathname === "/" && !scrolled;

  return (
    <header
      className={`fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ease-[var(--ease-out-expo)] ${
        scrolled ? "top-3 w-[calc(100%-32px)] max-w-5xl" : "top-4 w-[calc(100%-24px)] max-w-[1600px]"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 ease-[var(--ease-out-expo)] sm:px-6 ${
          scrolled
            ? "h-[56px] border-border/60 bg-background/75 shadow-elegant backdrop-blur-xl"
            : onHero
              ? "h-[64px] border-white/15 bg-foreground/25 backdrop-blur-md"
              : "h-[64px] border-border/40 bg-background/60 backdrop-blur-md"
        }`}
      >
        <Link
          to="/"
          className="relative flex items-center"
          aria-label="Chaldal — home"
        >
          {/* Both variants render on mount; we just toggle which one is visible.
              No transition / opacity animation — the swap is instant so the
              logo color matches the navbar background change in the same paint. */}
          <img
            src={chaldalLogo}
            alt="Chaldal"
            width={1000}
            height={300}
            className={`h-9 w-auto md:h-10 ${onHero ? "invisible" : "visible"}`}
          />
          <img
            src={chaldalLogoWhite}
            alt=""
            aria-hidden="true"
            width={1000}
            height={300}
            className={`absolute inset-0 h-9 w-auto md:h-10 ${onHero ? "visible" : "invisible"}`}
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              style={onHero ? { textShadow: "0 1px 8px hsl(150 30% 8% / 0.45)" } : undefined}
              className={`group relative text-sm font-semibold transition-colors ${
                onHero
                  ? "text-[hsl(38_45%_98%)] hover:text-[hsl(38_90%_78%)]"
                  : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${
                  onHero ? "bg-[hsl(38_90%_72%)]" : "bg-accent"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`hidden items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors md:inline-flex ${
              onHero
                ? "border-[hsl(38_45%_98%)]/70 bg-[hsl(38_45%_98%)]/15 text-[hsl(38_45%_98%)] hover:bg-[hsl(38_45%_98%)]/25"
                : "border-border text-foreground/75 hover:bg-secondary"
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            Dhanmondi 32
          </button>
          <Link
            to="/checkout"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              onHero
                ? "bg-[hsl(38_45%_96%)] text-[hsl(8_72%_42%)] hover:bg-[hsl(38_90%_72%)] hover:text-[hsl(150_35%_18%)]"
                : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] ${
                onHero ? "bg-[hsl(8_72%_42%)] text-[hsl(38_45%_96%)]" : "bg-accent text-accent-foreground"
              }`}
            >
              3
            </span>
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
              onHero ? "text-[hsl(38_45%_96%)] hover:bg-[hsl(38_45%_96%)]/15" : "text-foreground hover:bg-secondary"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu — pure CSS transitions, no framer-motion to keep TBT low */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          style={{ animation: "lcp-fade 0.2s ease-out both" }}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-screen w-[85%] max-w-sm flex-col border-l border-border bg-background p-6 shadow-elegant"
            style={{ animation: "hero-fade-up 0.3s var(--ease-out-expo) both" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl tracking-[-0.02em]">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to + l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-4 font-display text-2xl text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground"
            >
              <ShoppingBag className="h-4 w-4" /> View cart (3)
            </Link>
          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;
