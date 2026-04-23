import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mirrors Chaldal's "Common Questions" FAQ.
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
    a: "Most unopened, unspoilt packaged items can be returned within 7 days. Perishables (milk, fruit, fresh vegetables) have a 1-day return window. Diapers must be returned with under 10% used. Face masks, vinyl gloves, alcohol pads and Covid testing kits cannot be returned.",
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
      className="border-t border-border bg-gradient-cream py-20 md:py-28"
    >
      <div className="container grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-leaf">
            <span className="h-px w-10 bg-accent" />
            Common Questions
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
            Everything you need to know before your first basket.
          </h2>
          <p className="mt-6 text-sm text-muted-foreground">
            Have further questions? Our support team replies in minutes — every
            day, 7 AM to 11 PM.
          </p>
        </div>

        <div className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-display text-lg font-medium md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
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
