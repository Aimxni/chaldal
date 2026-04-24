import brandPran from "@/assets/brand-pran.png";
import brandReckitt from "@/assets/brand-reckitt.png";
import brandNestle from "@/assets/brand-nestle.png";
import brandUnilever from "@/assets/brand-unilever.png";
import brandMarico from "@/assets/brand-marico.png";
import brandGodrej from "@/assets/brand-godrej.png";
import brandCocaCola from "@/assets/brand-cocacola.png";
import brandFresh from "@/assets/brand-fresh.png";

// "Popular on Chaldal" partner-brand strip with real logo artwork.
const brands = [
  { name: "Pran", img: brandPran },
  { name: "Reckitt", img: brandReckitt },
  { name: "Nestlé", img: brandNestle },
  { name: "Unilever", img: brandUnilever },
  { name: "Marico", img: brandMarico },
  { name: "Godrej", img: brandGodrej },
  { name: "Coca-Cola", img: brandCocaCola },
  { name: "Fresh", img: brandFresh },
];

const PopularBrands = () => {
  return (
    <section
      id="popular-brands"
      className="relative border-t border-border bg-accent/15 py-16 md:py-20"
    >
      {/* Soft sun-yellow wash to anchor the new brand palette. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
      />

      <div className="container">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
            <span className="h-px w-10 bg-accent" />
            Popular on Chaldal
          </p>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
            The brands our customers reach for, every single week.
          </h2>
        </div>

        <ul ref={(el) => {
          if (!el) return;
          const io = new IntersectionObserver((entries, obs) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                (e.target as HTMLElement).setAttribute("data-revealed", "true");
                obs.unobserve(e.target);
              }
            });
          }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
          io.observe(el);
        }} className="reveal-stagger grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((b) => (
            <li
              key={b.name}
              className="group grid h-28 place-items-center px-4 py-3 transition-transform duration-300 hover:-translate-y-1 md:h-32"
            >
              <img
                src={b.img}
                alt={`${b.name} logo`}
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="h-full max-h-24 w-full max-w-[88%] object-contain drop-shadow-[0_8px_18px_rgba(21,36,27,0.12)] transition-transform duration-300 group-hover:scale-105 md:max-h-28"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PopularBrands;
