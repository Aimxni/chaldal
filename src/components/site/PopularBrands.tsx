// "Popular on Chaldal" section — partner / featured brand strip.
// Uses styled wordmarks instead of remote logo URLs to keep the build self-contained.
const brands = [
  "Pran",
  "Reckitt",
  "Nestlé",
  "Unilever",
  "Marico",
  "Godrej",
  "Coca-Cola",
  "Fresh",
];

const PopularBrands = () => {
  return (
    <section
      id="popular-brands"
      className="border-t border-border bg-background py-16 md:py-20"
    >
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

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {brands.map((b) => (
            <li
              key={b}
              className="grid h-20 place-items-center rounded-2xl border border-border bg-card text-center transition-colors duration-200 hover:bg-secondary md:h-24"
            >
              <span className="font-display text-sm font-semibold tracking-wide text-foreground md:text-base">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PopularBrands;
