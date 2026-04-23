import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 font-display text-3xl">
              <span className="grid h-10 w-10 place-items-center bg-accent text-accent-foreground font-display text-lg italic">
                t
              </span>
              travela<span className="text-accent">.</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Curated short-stay rooms across Dhaka. Verified hosts, transparent pricing,
              an arrival that feels like coming home.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center border border-border text-foreground/70 transition-colors hover:bg-foreground hover:text-background"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Stay"
              links={[
                { label: "All rooms", to: "/rooms" },
                { label: "Dhanmondi", to: "/rooms?neighbourhood=Dhanmondi" },
                { label: "Lalmatia", to: "/rooms?neighbourhood=Lalmatia" },
                { label: "Highly recommended", to: "/rooms?recommended=true" },
              ]}
            />
            <FooterCol
              title="Travela"
              links={[
                { label: "Story", to: "/#story" },
                { label: "Earn by hosting", to: "/host" },
                { label: "Contact", to: "/contact" },
              ]}
            />
            <FooterCol
              title="Reach us"
              links={[
                { label: "+880 1700 000 000", to: "tel:+8801700000000" },
                { label: "hello@travela.xyz", to: "mailto:hello@travela.xyz" },
                { label: "Dhanmondi, Dhaka", to: "/contact" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Travela. Made in Dhaka.</span>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-foreground">Privacy</Link>
            <Link to="#" className="hover:text-foreground">Terms</Link>
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
    <h4 className="mb-5 text-[10px] uppercase tracking-[0.28em] text-foreground">{title}</h4>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.label}>
          <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
