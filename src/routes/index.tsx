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
      { title: "Venus Universe — Luxury 4 & 5 BHK Sky Residences" },
      {
        name: "description",
        content:
          "A limited collection of 4 & 5 BHK sky residences. Twin towers, 60,000 sqft sky clubhouse, concierge living. Enquire for private pricing.",
      },
      { property: "og:title", content: "Venus Universe — A Universe of Luxury Living" },
      { property: "og:description", content: "Luxury 4 & 5 BHK sky residences in India. By invitation only." },
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
