import { Link } from "react-router-dom";
import { Facebook, Globe2, Instagram, MessageCircleQuestion, Phone, Twitter } from "lucide-react";
import badgeAppStore from "@/assets/badge-appstore.png";
import badgeGooglePlay from "@/assets/badge-googleplay.png";
import chaldalLogoWhite from "@/assets/chaldal-logo-white.png";
import paymentAmex from "@/assets/payment-amex.png";
import paymentBkash from "@/assets/payment-bkash.png";
import paymentMastercard from "@/assets/payment-mastercard.png";
import paymentVisa from "@/assets/payment-visa.png";

const paymentMethods = [
  { name: "American Express", img: paymentAmex },
  { name: "Mastercard", img: paymentMastercard },
  { name: "Visa", img: paymentVisa },
  { name: "bKash", img: paymentBkash },
];

const Footer = () => {
  return (
    <footer className="border-t border-primary-foreground/15 bg-primary text-primary-foreground">
      <div className="border-b border-primary-foreground/15 bg-primary-foreground/[0.04]">
        <div className="container flex flex-wrap items-center gap-x-8 gap-y-3 py-4 text-sm text-primary-foreground/70">
          <span className="font-semibold text-primary-foreground">Cities:</span>
          {["Dhaka", "Chattogram", "Jashore"].map((city) => (
            <Link
              key={city}
              to="#"
              className="font-medium underline underline-offset-4 transition-colors hover:text-accent"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>

      <div className="container py-10 md:py-12">
        <Link to="/" className="mb-10 inline-flex items-center" aria-label="Chaldal — home">
          <img
            src={chaldalLogoWhite}
            alt="Chaldal"
            width={1000}
            height={326}
            className="h-11 w-auto md:h-12"
          />
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FooterCol
              title="About Chaldal"
              links={[
                { label: "Our Story", to: "/#story" },
                { label: "Team", to: "/team" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms of Use", to: "/terms" },
              ]}
            >
              <div className="mt-6">
                <h4 className="mb-3 text-base font-semibold text-primary-foreground">
                  Payment Methods
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {paymentMethods.map((method) => (
                    <span
                      key={method.name}
                      className="grid h-10 min-w-12 place-items-center"
                    >
                      <img
                        src={method.img}
                        alt={`${method.name} logo`}
                        width={90}
                        height={90}
                        loading="lazy"
                        decoding="async"
                        className="max-h-9 w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.18)]"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </FooterCol>
            <FooterCol
              title="Customer Service"
              links={[
                { label: "Contact Us", to: "/contact" },
                { label: "FAQ", to: "/faq" },
              ]}
            />
            <FooterCol
              title="For Business"
              links={[{ label: "Corporate", to: "/corporate" }]}
            />
          </div>

          <div className="w-full max-w-md lg:w-[390px]">
            <form className="flex overflow-hidden rounded-xl border border-primary-foreground/20 bg-primary-foreground shadow-elegant">
              <label htmlFor="footer-phone" className="sr-only">
                Phone number
              </label>
              <input
                id="footer-phone"
                value="+88"
                readOnly
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base font-semibold text-primary outline-none"
              />
              <button
                type="button"
                className="m-1 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
              >
                Get app
              </button>
            </form>

            <div className="mt-8 flex flex-wrap justify-start gap-3 lg:justify-end">
              <img
                src={badgeGooglePlay}
                alt="Get it on Google Play"
                width={1584}
                height={672}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto"
              />
              <img
                src={badgeAppStore}
                alt="Download on the App Store"
                width={1584}
                height={672}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto"
              />
            </div>

            <div className="mt-5 text-left text-primary-foreground/70 lg:text-right">
              <a
                href="tel:16710"
                className="inline-flex items-center gap-2 text-2xl font-bold text-primary-foreground transition-colors hover:text-accent"
              >
                <Phone className="h-5 w-5" />
                16710
              </a>
              <p className="mt-1 text-base">
                or{" "}
                <a
                  href="mailto:support@chaldal.com"
                  className="font-medium text-primary-foreground transition-colors hover:text-accent"
                >
                  support@chaldal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 bg-primary-foreground/[0.04]">
        <div className="container flex flex-col gap-5 py-6 text-sm text-primary-foreground/65 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Chaldal Limited</span>
          <div className="flex flex-wrap items-center gap-3">
            <SocialLink label="Facebook" icon={Facebook} />
            <SocialLink label="Twitter" icon={Twitter} />
            <SocialLink label="Instagram" icon={Instagram} />
            <button className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 font-medium text-primary-foreground/80 shadow-soft transition-colors hover:bg-primary-foreground hover:text-primary">
              <Globe2 className="h-4 w-4" />
              English
            </button>
            <a
              href="/contact"
              aria-label="Help"
              className="grid h-12 w-12 place-items-center rounded-full bg-gold text-gold-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <MessageCircleQuestion className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({
  title,
  links,
  children,
}: {
  title: string;
  links: { label: string; to: string }[];
  children?: React.ReactNode;
}) => (
  <div>
    <h4 className="mb-3 text-base font-semibold text-primary-foreground">
      {title}
    </h4>
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            to={l.to}
            className="text-sm font-medium text-primary-foreground/70 transition-colors hover:text-accent"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
    {children}
  </div>
);

const SocialLink = ({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <a
    href="#"
    aria-label={label}
    className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground/80 shadow-soft transition-colors hover:bg-accent hover:text-accent-foreground"
  >
    <Icon className="h-4 w-4" />
  </a>
);

export default Footer;
