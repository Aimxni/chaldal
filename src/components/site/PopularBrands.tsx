import brandPran from "@/assets/brand-pran.webp";
import brandReckitt from "@/assets/brand-reckitt.webp";
import brandNestle from "@/assets/brand-nestle.webp";
import brandUnilever from "@/assets/brand-unilever.webp";
import brandMarico from "@/assets/brand-marico.webp";
import brandGodrej from "@/assets/brand-godrej.webp";
import brandCocaCola from "@/assets/brand-cocacola.png";
import brandFresh from "@/assets/brand-fresh.webp";

// "Popular on Chaldal" partner-brand strip with real logo artwork.
const brands = [
  { name: "Pran", img: brandPran, w: 240, h: 158 },
  { name: "Reckitt", img: brandReckitt, w: 240, h: 124 },
  { name: "Nestlé", img: brandNestle, w: 232, h: 240 },
  { name: "Unilever", img: brandUnilever, w: 216, h: 240 },
  { name: "Marico", img: brandMarico, w: 240, h: 208 },
  { name: "Godrej", img: brandGodrej, w: 240, h: 116 },
  { name: "Coca-Cola", img: brandCocaCola, w: 240, h: 145 },
  { name: "Fresh", img: brandFresh, w: 240, h: 128 },
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

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((b) => (
            <li
              key={b.name}
              className="group grid h-28 place-items-center px-4 py-3 transition-transform duration-300 hover:-translate-y-1 md:h-32"
            >
              <img
                src={b.img}
                alt={`${b.name} logo`}
                width={b.w}
                height={b.h}
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
