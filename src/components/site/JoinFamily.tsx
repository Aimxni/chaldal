import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mirrors Chaldal's "Be part of the Chaldal Family!" — Corporate + Career.
const tiles = [
  {
    eyebrow: "For businesses",
    title: "Corporate",
    body: "Do you own a business? Become a corporate customer and get dedicated support, invoicing and bulk pricing.",
    cta: "Find out more",
    to: "/rooms",
  },
  {
    eyebrow: "We're hiring",
    title: "Career",
    body: "Work with a team that improves the lives of consumers and the communities around us. Engineers, ops & more.",
    cta: "Find out more",
    to: "/rooms",
  },
];

const JoinFamily = () => {
  return (
    <section
      id="family"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
            <span className="h-px w-10 bg-accent" />
            Be part of the Chaldal Family
          </p>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
            Two ways to grow with us.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {tiles.map((t) => (
            <li key={t.title}>
              <Link
                to={t.to}
                className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-border bg-card p-8 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card md:p-10"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-leaf">
                    {t.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
                    {t.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {t.body}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                  {t.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default JoinFamily;
