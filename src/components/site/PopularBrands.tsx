import brandPran from "@/assets/brand-pran.webp";
import brandPranHalf from "@/assets/brand-pran-half.webp";
import brandReckitt from "@/assets/brand-reckitt.webp";
import brandReckittHalf from "@/assets/brand-reckitt-half.webp";
import brandNestle from "@/assets/brand-nestle.webp";
import brandNestleHalf from "@/assets/brand-nestle-half.webp";
import brandUnilever from "@/assets/brand-unilever.webp";
import brandUnileverHalf from "@/assets/brand-unilever-half.webp";
import brandMarico from "@/assets/brand-marico.webp";
import brandMaricoHalf from "@/assets/brand-marico-half.webp";
import brandGodrej from "@/assets/brand-godrej.webp";
import brandGodrejHalf from "@/assets/brand-godrej-half.webp";
import brandCocaCola from "@/assets/brand-cocacola.png";
import brandCocaColaHalf from "@/assets/brand-cocacola-half.png";
import brandFresh from "@/assets/brand-fresh.webp";
import brandFreshHalf from "@/assets/brand-fresh-half.webp";

// "Popular on Chaldal" partner-brand strip with real logo artwork. Each entry
// ships a half-resolution variant so 1× displays save bytes while 2× displays
// still render the full-res file.
const brands = [
  { name: "Pran", img: brandPran, imgHalf: brandPranHalf, w: 240, h: 158 },
  { name: "Reckitt", img: brandReckitt, imgHalf: brandReckittHalf, w: 240, h: 124 },
  { name: "Nestlé", img: brandNestle, imgHalf: brandNestleHalf, w: 232, h: 240 },
  { name: "Unilever", img: brandUnilever, imgHalf: brandUnileverHalf, w: 216, h: 240 },
  { name: "Marico", img: brandMarico, imgHalf: brandMaricoHalf, w: 240, h: 208 },
  { name: "Godrej", img: brandGodrej, imgHalf: brandGodrejHalf, w: 240, h: 116 },
  { name: "Coca-Cola", img: brandCocaCola, imgHalf: brandCocaColaHalf, w: 240, h: 145 },
  { name: "Fresh", img: brandFresh, imgHalf: brandFreshHalf, w: 240, h: 128 },
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
                srcSet={`${b.imgHalf} 1x, ${b.img} 2x`}
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
