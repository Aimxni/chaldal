import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Stays", to: "/rooms" },
  { label: "Neighbourhoods", to: "/#neighbourhoods" },
  { label: "Story", to: "/#story" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onLight = pathname !== "/";

  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Defer the initial check so it doesn't block the first paint (fixes Layout Thrashing)
    window.requestAnimationFrame(() => setScrolled(window.scrollY > 50));
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inverted = !scrolled && !onLight; // hero has dark image — show light text

  return (
    <header
      className={`hero-fade-up fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link
          to="/"
          className={`flex items-center gap-2.5 font-display text-2xl tracking-tight transition-colors ${
            inverted ? "text-background" : "text-foreground"
          }`}
        >
          <span className="grid h-9 w-9 place-items-center bg-accent text-accent-foreground font-display text-lg italic">t</span>
          <span className="hidden sm:inline">travela<span className="text-accent">.</span></span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`group relative text-xs uppercase tracking-[0.22em] transition-colors ${
                inverted ? "text-background/85 hover:text-background" : "text-foreground/75 hover:text-foreground"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/host"
            className={`hidden rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors md:inline-flex ${
              inverted
                ? "border border-background/30 text-background hover:bg-background hover:text-foreground"
                : "border border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
            }`}
          >
            Earn by hosting
          </Link>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
              inverted ? "text-background hover:bg-background/15" : "text-foreground hover:bg-secondary"
            }`}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 h-screen w-screen bg-foreground/60 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-screen w-[85%] max-w-sm flex-col border-l border-border bg-background p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {[...links, { label: "Earn by hosting", to: "/host" }].map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.1 }}
                  >
                    <Link
                      to={l.to}
                      className="block border-b border-border py-4 font-display text-2xl text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
  );
};

export default Navbar;
