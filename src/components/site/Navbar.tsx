import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Shop", to: "/rooms" },
  { label: "Categories", to: "/#categories" },
  { label: "Deals", to: "/#deals" },
  { label: "Why Chaldal", to: "/#why" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 32);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.requestAnimationFrame(() => setScrolled(window.scrollY > 32));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-background/85 shadow-soft backdrop-blur-md"
          : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-2xl tracking-[-0.02em] text-foreground"
          aria-label="Chaldal — home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display italic text-primary-foreground">
            c
          </span>
          <span className="hidden sm:inline">
            chaldal<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to + l.label}
              to={l.to}
              className="group relative text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-foreground/75 transition-colors hover:bg-secondary md:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5" />
            Dhanmondi 32
          </button>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] text-accent-foreground">
              3
            </span>
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
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
