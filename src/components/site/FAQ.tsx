import { Section } from "./Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Where is Venus Universe Nehrunagar located?",
    a: "Venus Universe is located in Nehrunagar — the heart of central Ahmedabad — minutes from CG Road, Ashram Road, Paldi, IIM-A and the city's top schools and hospitals.",
  },
  {
    q: "What configurations are available — 4 BHK or 5 BHK apartments?",
    a: "Venus Universe offers luxury 4 BHK and 5 BHK apartments in Nehrunagar Ahmedabad with carpet sizes ranging from 1,550 sq ft to 2,475 sq ft, including duplex penthouses and jodi options.",
  },
  {
    q: "Is the project under construction and is pre-booking open?",
    a: "Yes, Venus Universe is currently under construction and pre-booking has officially started. Limited units are available at exclusive pre-launch pricing.",
  },
  {
    q: "Is the site office open for visits?",
    a: "Yes — our site office in Nehrunagar Ahmedabad is open and welcoming visitors. Call or WhatsApp us to schedule a private site visit with our senior advisor.",
  },
  {
    q: "What is the EOI amount and is it refundable?",
    a: "The Expression of Interest amount is ₹5,00,000 and is 100% refundable, no questions asked. It locks in priority allotment and pre-launch pricing on your preferred 4 or 5 BHK unit.",
  },
  {
    q: "Who is the architect of Venus Universe?",
    a: "Venus Universe is designed by Hafeez Contractor — India's most awarded residential architect — with landscaping by SWA California, interiors by HBA Singapore and lighting by LET Dubai.",
  },
  {
    q: "Why invest in luxury apartments in Nehrunagar?",
    a: "Nehrunagar is central Ahmedabad's most premium micro-market, with 2x demand growth in luxury homes, 6% YoY commercial rental yield growth, and walking distance to CG Road, Ashram Road, IIM-A and top hospitals.",
  },
  {
    q: "What luxury amenities does Venus Universe offer?",
    a: "Wellness club, swimming pool, jacuzzi, steam & sauna, gymnasium, jogging track, multiple sports courts, garden theatre, guest suite, podcast pod and 70% open landscape across the 7-acre development.",
  },
];

export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="Frequently Asked"
      title={<>Venus Universe Nehrunagar — FAQ</>}
      intro="Everything you need to know about luxury 4 & 5 BHK apartments in Nehrunagar Ahmedabad, pre-booking, the site office, and your investment."
    >
      <div className="mt-8 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 rounded-md text-white font-semibold text-sm shadow-gold hover:brightness-110 transition"
            style={{ background: "var(--accent-red)" }}
          >
            Book Your Site Visit · Limited Pre-Booking Slots
          </a>
        </div>
      </div>
    </Section>
  );
}
