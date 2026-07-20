import { Link } from "@tanstack/react-router";
import { Globe2, Video, FileCheck2, PhoneCall, ArrowRight } from "lucide-react";
import { Section } from "./Section";

const BENEFITS = [
  {
    icon: Video,
    title: "Remote walkthrough",
    description: "Schedule a live video tour of the sales gallery, project model and available plans from your time zone.",
  },
  {
    icon: FileCheck2,
    title: "Document assistance",
    description: "Get coordinated support for project documents, booking steps and Power of Attorney requirements.",
  },
  {
    icon: PhoneCall,
    title: "International callback",
    description: "Share your country code and preferred time so the sales team can reach you without time-zone guesswork.",
  },
];

export function NriSection() {
  return (
    <Section
      id="nri"
      eyebrow="For NRI Buyers"
      title={
        <>
          Explore from abroad. <span className="text-gradient-gold italic">Decide with clarity.</span>
        </>
      }
      intro="A guided remote-buying journey for NRIs and OCIs considering a premium 4 BHK home in Ahmedabad. Legal, tax and FEMA decisions should be confirmed with your independent advisor."
      className="bg-charcoal"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {BENEFITS.map(({ icon: Icon, title, description }) => (
          <article key={title} className="luxe-border bg-white p-5 sm:p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-lg text-ivory">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-start gap-3">
          <Globe2 className="mt-0.5 shrink-0 text-gold" size={22} />
          <div>
            <h3 className="text-base text-ivory">Buying from outside India?</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Read the practical NRI guide, then request a callback using your international number.
            </p>
          </div>
        </div>
        <Link
          to="/insights/$slug"
          params={{ slug: "nri-guide-buying-luxury-property-ahmedabad" }}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-gold px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-white"
        >
          Read the NRI guide <ArrowRight size={15} />
        </Link>
      </div>
    </Section>
  );
}
