import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Highlights } from "@/components/site/Highlights";
import { MasterPlan } from "@/components/site/MasterPlan";
import { Residences } from "@/components/site/Residences";
import { Amenities } from "@/components/site/Amenities";
import { Location } from "@/components/site/Location";
import { Gallery } from "@/components/site/Gallery";
import { Brochure } from "@/components/site/Brochure";
import { Trust } from "@/components/site/Trust";
import { Contact } from "@/components/site/Contact";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Footer } from "@/components/site/Footer";
import { LeadGate } from "@/components/site/LeadGate";
import { StickyProjectBar } from "@/components/site/StickyProjectBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Venus Grounds 2 — Luxury 4 &amp; 5 BHK at Nehrunagar, Ahmedabad" },
      {
        name: "description",
        content:
          "Venus Grounds 2 — 7-acre 4 &amp; 5 BHK luxury development at Nehrunagar, Ahmedabad. 70% open area, 2.2-acre podium, designed by Hafeez Contractor, SWA, HBA & LET. Enquire now.",
      },
      { property: "og:title", content: "Venus Grounds 2 — Luxury 4 &amp; 5 BHK at Nehrunagar, Ahmedabad" },
      { property: "og:description", content: "7-acre landmark 4 &amp; 5 BHK development at the heart of Ahmedabad. By invitation." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const { content } = useSiteContent();
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <LeadGate />
      <Header brand={content.brand.name} />
      <main>
        <Hero hero={content.hero} />
        <About about={content.about} />
        <Highlights items={content.highlights} />
        <MasterPlan data={content.masterPlan} />
        <Residences items={content.residences} />
        <Amenities items={content.amenities} />
        <Location data={content.location} mapEmbed={content.contact.mapEmbed} />
        <Gallery items={content.gallery} />
        <Brochure data={content.brochure} />
        <Trust data={content.trust} />
        <Contact contact={content.contact} />
      </main>
      <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      <WhatsAppButton phone={content.contact.whatsapp} />
      <StickyProjectBar />
    </div>
  );
}
