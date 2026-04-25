import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How much do deliveries cost?",
    a: "Delivery is ৳59 in Dhaka & Chattogram (৳49 over ৳400) and ৳29 in Jashore (৳19 over ৳400).",
  },
  {
    q: "What are your delivery hours?",
    a: "We deliver every day from 7:30 AM to 11 PM. Pick the slot that works for you at checkout.",
  },
  {
    q: "What is your refund policy?",
    a: "Most unopened, unspoilt packaged items can be returned within 7 days. Perishables (milk, fruit, fresh vegetables) have a 1-day return window. Diapers must be returned with under 10% used.",
  },
  {
    q: "How do you set your prices?",
    a: "Our prices match or beat the local market — and we're working hard to push them lower. Spot something off? Let us know.",
  },
  {
    q: "Do you serve my area?",
    a: "We currently serve three cities: Dhaka, Chattogram and Jashore.",
  },
];

const CommonQuestions = () => {
  return (
    <section
      id="faq"
      className="border-t border-[hsl(155_18%_14%)]/10 bg-[hsl(38_45%_96%)] px-6 py-20 md:py-24"
    >
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="font-untill-mono text-[12px] uppercase tracking-[0.05em] text-[hsl(155_18%_14%)]/55">
            ( Common questions )
          </p>
          <h2 className="font-untill-display mt-3 text-[clamp(1.75rem,4vw,2.5rem)] text-[hsl(155_18%_14%)]">
            Everything you need to know before your first basket.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[hsl(155_18%_14%)]/65">
            Have further questions? Our support team replies in minutes — every
            day, 7 AM to 11 PM.
          </p>
        </div>

        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-[hsl(155_18%_14%)]/10"
              >
                <AccordionTrigger className="font-untill-display text-left text-base text-[hsl(155_18%_14%)] hover:text-[hsl(8_72%_42%)] hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[hsl(155_18%_14%)]/65 md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default CommonQuestions;
