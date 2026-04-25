import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-20 md:py-24"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
            ( Be part of the Chaldal family )
          </p>
          <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-[hsl(155_18%_14%)]">
            Two ways to grow with us.
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[hsl(155_18%_14%)]/12 md:grid-cols-2">
          {tiles.map((t) => (
            <li key={t.title} className="bg-[hsl(38_45%_96%)] transition-colors hover:bg-[hsl(38_45%_94%)]">
              <Link
                to={t.to}
                className="group flex h-full flex-col justify-between gap-10 p-8 md:p-10"
              >
                <div>
                  <p className="font-untill-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(155_18%_14%)]/55">
                    ( {t.eyebrow.toLowerCase()} )
                  </p>
                  <h3 className="font-untill-display mt-3 text-3xl text-[hsl(155_18%_14%)] md:text-4xl">
                    {t.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[hsl(155_18%_14%)]/65 md:text-base">
                    {t.body}
                  </p>
                </div>
                <span className="font-untill-mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[hsl(155_18%_14%)]/75 transition-colors group-hover:text-[hsl(8_72%_42%)]">
                  {t.cta}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
