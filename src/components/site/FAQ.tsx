import type { ReactNode } from "react";
import { Section } from "./Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What configurations are available at The Universe by Venus?",
    a: "The approved brochure presents premium 4 BHK residences across Blocks A–J, with RERA carpet areas from approximately 1,546 to 2,459 sq ft. Larger-format, jodi, duplex or penthouse configurations are subject to official availability.",
  },
  {
    q: "Where is The Universe by Venus located?",
    a: "The Universe by Venus is located in Nehrunagar, Ahmedabad, with access to CG Road, Ashram Road, Paldi, IIM Ahmedabad and leading schools, hospitals and retail destinations.",
  },
  {
    q: "Is booking open?",
    a: "Yes. Pre-booking at Venus Universe is officially open and our site office in Nehrunagar welcomes visitors every day. Call or WhatsApp us to schedule a private site visit.",
  },
  {
    q: "Who designed The Universe by Venus?",
    a: "Architecture is by Hafeez Contractor, principal landscape design by SWA Group, interiors by Hirsch Bedner Associates and lighting by LET Design, Dubai.",
  },
  {
    q: "What amenities are available?",
    a: "Residents enjoy a 2.2 acre landscaped podium, grand clubhouse, swimming pool, fully-equipped gymnasium, kids' play area, gardens, multiple sports courts, wellness lounge, guest suite and much more across the 7-acre development.",
  },
  {
    q: "What is the RERA number?",
    a: "Venus Universe is RERA-registered under registration number MAA17082/080726/311232. Full RERA details are shared with prospective buyers on request.",
  },
  {
    q: "What is the starting price?",
    a: "Pricing is shared on request. Submit the fully refundable ₹5,00,000 Expression of Interest, or connect with our sales team for the current price list and pre-launch offers.",
  },
];

export function FAQ({ items, title, intro }: { items?: { q: string; a: string }[]; title?: ReactNode; intro?: string } = {}) {
  const list = items && items.length ? items : faqs;
  return (
    <Section
      id="faq"
      eyebrow="Frequently Asked"
      title={title ?? <>The Universe by Venus — Frequently Asked Questions</>}
      intro={intro ?? "Verified project information about the premium 4 BHK residences at The Universe by Venus in Nehrunagar, Ahmedabad."}
    >
      <div className="mt-8 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {list.map((f, i) => (
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
