import brandPran from "@/assets/brand-pran.webp";
import brandReckitt from "@/assets/brand-reckitt.webp";
import brandNestle from "@/assets/brand-nestle.webp";
import brandUnilever from "@/assets/brand-unilever.webp";
import brandMarico from "@/assets/brand-marico.webp";
import brandGodrej from "@/assets/brand-godrej.webp";
import brandCocaCola from "@/assets/brand-cocacola.png";
import brandFresh from "@/assets/brand-fresh.webp";

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

/**
 * PopularBrands — quiet logo strip, hairline-divided cells.
 * Mirrors the Untill values block aesthetic.
 */
const PopularBrands = () => {
  return (
    <section
      id="popular-brands"
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-20"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
            ( Popular on Chaldal )
          </p>
          <h2 className="font-untill-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-[hsl(155_18%_14%)]">
            The brands our customers reach for, every single week.
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 sm:grid-cols-4">
          {brands.map((b) => (
            <li
              key={b.name}
              className="grid h-28 place-items-center bg-[hsl(38_45%_96%)] px-6 py-4 transition-colors hover:bg-[hsl(38_45%_94%)] md:h-32"
            >
              <img
                src={b.img}
                alt={`${b.name} logo`}
                width={b.w}
                height={b.h}
                loading="lazy"
                decoding="async"
                className="h-full max-h-20 w-full max-w-[80%] object-contain opacity-75 transition-opacity hover:opacity-100 md:max-h-24"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PopularBrands;
