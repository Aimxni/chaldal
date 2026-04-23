import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Apple, Smartphone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 font-display text-3xl tracking-[-0.02em]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-display italic text-accent-foreground">
                c
              </span>
              chaldal<span className="text-accent">.</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Hand-picked groceries delivered across Dhaka in under an hour.
              Real prices, real freshness — loved by Dhaka since day one.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-2.5 text-xs text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                <Apple className="h-4 w-4" /> App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-2.5 text-xs text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                <Smartphone className="h-4 w-4" /> Play Store
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <FooterCol
              title="Shop"
              links={[
                { label: "Fruits", to: "/rooms?cat=fruits" },
                { label: "Vegetables", to: "/rooms?cat=veg" },
                { label: "Dairy & eggs", to: "/rooms?cat=dairy" },
                { label: "Pantry", to: "/rooms?cat=pantry" },
              ]}
            />
            <FooterCol
              title="Chaldal"
              links={[
                { label: "About us", to: "/#story" },
                { label: "Careers", to: "/careers" },
                { label: "Press", to: "/press" },
                { label: "Sustainability", to: "/sustainability" },
              ]}
            />
            <FooterCol
              title="Reach us"
              links={[
                { label: "+880 1700 000 000", to: "tel:+8801700000000" },
                { label: "hello@chaldal.com", to: "mailto:hello@chaldal.com" },
                { label: "Dhanmondi 32, Dhaka", to: "/contact" },
                { label: "Help centre", to: "/help" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-primary-foreground/15 pt-8 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Chaldal. Made fresh in Dhaka.</span>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-primary-foreground">Privacy</Link>
            <Link to="#" className="hover:text-primary-foreground">Terms</Link>
            <Link to="#" className="hover:text-primary-foreground">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) => (
  <div>
    <h4 className="mb-5 text-[10px] uppercase tracking-[0.28em] text-primary-foreground/60">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            to={l.to}
            className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
