// Mirrors Chaldal's stats strip + "Currently Delivering in" cities.
const stats = [
  { value: "26", label: "warehouses all over Bangladesh" },
  { value: "5M+", label: "orders have been delivered" },
  { value: "100K", label: "families are being served" },
  { value: "৳340M", label: "in customer savings" },
];

const cities = ["Dhaka", "Chattogram", "Jashore"];

const Stats = () => {
  return (
    <section
      id="stats"
      className="border-t border-border bg-background py-20 md:py-24"
    >
      <div className="container">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="bg-card p-7 md:p-8">
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-tight text-foreground">
                {s.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
              <span className="h-px w-10 bg-accent" />
              Currently Delivering in
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground">
              Three cities. One promise: groceries at your door in an hour.
            </h2>
          </div>
          <ul className="md:col-span-7 grid grid-cols-3 gap-3 md:gap-5">
            {cities.map((city) => (
              <li
                key={city}
                className="rounded-2xl border border-border bg-card p-5 text-center md:p-7"
              >
                <span className="font-display text-lg font-medium text-foreground md:text-2xl">
                  {city}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Stats;
