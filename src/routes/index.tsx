import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "@/content/defaultContent";
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
import { EoiSection } from "@/components/site/EoiSection";
import { EoiPopup } from "@/components/site/EoiPopup";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const { data } = await supabase.from("site_content").select("key, value").in("key", ["seo", "brand"]);
      const map: Record<string, unknown> = {};
      for (const r of data ?? []) map[r.key] = r.value;
      const seo = { ...defaultContent.seo, ...((map.seo as object) ?? {}) };
      const brand = { ...defaultContent.brand, ...((map.brand as object) ?? {}) };
      return { seo, brand };
    } catch {
      return { seo: defaultContent.seo, brand: defaultContent.brand };
    }
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.seo ?? defaultContent.seo;
    const robots = seo.allowIndexing === false ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const meta: Array<Record<string, string>> = [
      { title: seo.title },
      { name: "description", content: seo.description },
      { name: "keywords", content: seo.keywords },
      { name: "author", content: seo.author },
      { name: "robots", content: robots },
      { name: "googlebot", content: robots },
      { name: "bingbot", content: robots },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:image", content: seo.ogImage },
      { property: "og:url", content: (seo as { canonical?: string }).canonical || seo.siteUrl },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: loaderData?.brand?.name ?? defaultContent.brand.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: seo.ogImage },
      { name: "twitter:site", content: seo.twitterHandle },
    ];
    const s = seo as Record<string, string | boolean | undefined>;
    if (s.gscVerification) meta.push({ name: "google-site-verification", content: String(s.gscVerification) });
    if (s.bingVerification) meta.push({ name: "msvalidate.01", content: String(s.bingVerification) });

    const scripts: Array<Record<string, string>> = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: loaderData?.brand?.name ?? defaultContent.brand.name,
          url: seo.siteUrl,
          image: seo.ogImage,
          description: seo.description,
        }),
      },
    ];
    if (s.gaId) {
      scripts.push({ src: `https://www.googletagmanager.com/gtag/js?id=${s.gaId}`, async: "" });
      scripts.push({ children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${s.gaId}');` });
    }
    if (s.gtmId) {
      scripts.push({ children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${s.gtmId}');` });
    }
    if (s.facebookPixelId) {
      scripts.push({ children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${s.facebookPixelId}');fbq('track','PageView');` });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: (seo as { canonical?: string }).canonical || seo.siteUrl }],
      scripts,
    };
  },
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
        <EoiSection eoi={content.eoi} />
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
      <EoiPopup eoi={content.eoi} />
    </div>
  );
}
