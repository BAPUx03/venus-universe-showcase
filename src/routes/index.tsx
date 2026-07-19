import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

import { StickyProjectBar } from "@/components/site/StickyProjectBar";
import { EoiSection } from "@/components/site/EoiSection";
import { EoiPopup } from "@/components/site/EoiPopup";
import { LeadGate } from "@/components/site/LeadGate";
import { FAQ } from "@/components/site/FAQ";
import { Showcase3D } from "@/components/site/Showcase3D";


export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const { data } = await supabase.from("site_content").select("key, value").in("key", ["seo", "brand", "siteMode"]);
      const map: Record<string, unknown> = {};
      for (const r of data ?? []) map[r.key] = r.value;
      const seo = { ...defaultContent.seo, ...((map.seo as object) ?? {}) };
      const brand = { ...defaultContent.brand, ...((map.brand as object) ?? {}) };
      const siteMode = ((map.siteMode as { mode?: string })?.mode === "coming_soon") ? "coming_soon" : "site";
      return { seo, brand, siteMode };
    } catch {
      return { seo: defaultContent.seo, brand: defaultContent.brand, siteMode: "site" as const };
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

    const siteUrl = seo.siteUrl;
    const brandName = loaderData?.brand?.name ?? defaultContent.brand.name;

    const realEstateSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#organization`,
      name: "Venus Universe",
      alternateName: ["Venus Universe Ahmedabad", "Venus Universe Nehrunagar"],
      url: siteUrl,
      image: seo.ogImage,
      logo: seo.ogImage,
      description: "Venus Universe — a landmark 7-acre luxury community in Nehrunagar, Ahmedabad with premium 4 & 5 BHK residences. Pre-booking open.",
      telephone: defaultContent.contact.phone,
      email: defaultContent.contact.email,
      priceRange: "₹₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nehrunagar",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380015",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 23.0307, longitude: 72.5497 },
      areaServed: ["Nehrunagar", "CG Road", "Ashram Road", "Paldi", "Ahmedabad"],
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Venus Universe Sales Gallery",
      image: seo.ogImage,
      url: siteUrl,
      telephone: defaultContent.contact.phone,
      priceRange: "₹₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nehrunagar",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380015",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 23.0307, longitude: 72.5497 },
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "10:00", closes: "19:00" }],
    };

    const residenceSchema = {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: "Venus Universe — Luxury 4 & 5 BHK Apartments in Nehrunagar, Ahmedabad",
      url: siteUrl,
      image: seo.ogImage,
      description: "Venus Universe — a landmark 7-acre luxury community in Nehrunagar, Ahmedabad featuring premium 4 & 5 BHK residences with 70% open landscape.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nehrunagar",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380015",
        addressCountry: "IN",
      },
      amenityFeature: defaultContent.amenities.slice(0, 12).map((a) => ({
        "@type": "LocationFeatureSpecification",
        name: a,
        value: true,
      })),
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What configurations are available at Venus Universe?", acceptedAnswer: { "@type": "Answer", text: "Venus Universe offers 4 BHK and 5 BHK residences with carpet sizes from 1,550 sq ft up to 2,475 sq ft, including duplex penthouses and jodi-house options." } },
        { "@type": "Question", name: "Where is Venus Universe located?", acceptedAnswer: { "@type": "Answer", text: "Venus Universe is located in Nehrunagar, Ahmedabad — minutes from CG Road, Ashram Road, Paldi, IIM Ahmedabad and the city's top schools and hospitals." } },
        { "@type": "Question", name: "Is booking open?", acceptedAnswer: { "@type": "Answer", text: "Yes. Pre-booking at Venus Universe is officially open and the site office in Nehrunagar welcomes visitors every day." } },
        { "@type": "Question", name: "Who designed Venus Universe?", acceptedAnswer: { "@type": "Answer", text: "Venus Universe is designed by Hafeez Contractor, with landscape by SWA California and interiors by HBA Singapore." } },
        { "@type": "Question", name: "What amenities are available?", acceptedAnswer: { "@type": "Answer", text: "A 2.2 acre landscaped podium, grand clubhouse, swimming pool, gymnasium, kids' play area, gardens, sports courts, wellness lounge and guest suite across the 7-acre development." } },
        { "@type": "Question", name: "What is the RERA number?", acceptedAnswer: { "@type": "Answer", text: "[RERA NUMBER] — full RERA details will be shared with prospective buyers on request." } },
        { "@type": "Question", name: "What is the starting price?", acceptedAnswer: { "@type": "Answer", text: "₹X Cr Onwards — connect with our sales team for the current price list and pre-launch offers." } },
      ],
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Venus Universe", item: siteUrl },
      ],
    };

    const scripts: Array<Record<string, string>> = [
      { type: "application/ld+json", children: JSON.stringify(realEstateSchema) },
      { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) },
      { type: "application/ld+json", children: JSON.stringify(residenceSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
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
  pendingMs: 0,
  pendingComponent: () => <div className="fixed inset-0 bg-white" />,
});

function Index() {
  const { content } = useSiteContent();
  const loaderData = Route.useLoaderData();
  const savedMode = (content as unknown as { siteMode?: { mode?: string } }).siteMode?.mode;

  // Read cached mode from localStorage SYNCHRONOUSLY on first render so there
  // is zero flash of the site before the loader / hook resolve.
  const [cachedMode, setCachedMode] = useState<"site" | "coming_soon" | null>(() => {
    if (typeof window === "undefined") return null;
    const v = window.localStorage.getItem("venus_site_mode_v1");
    return v === "coming_soon" ? "coming_soon" : v === "site" ? "site" : null;
  });

  const resolvedMode =
    loaderData?.siteMode === "coming_soon" || savedMode === "coming_soon" || cachedMode === "coming_soon"
      ? "coming_soon"
      : loaderData?.siteMode === "site" || savedMode === "site" || cachedMode === "site"
      ? "site"
      : null;

  // Sync cache whenever loader/hook gives an authoritative value.
  useEffect(() => {
    const authoritative = loaderData?.siteMode ?? savedMode;
    if (authoritative === "coming_soon" || authoritative === "site") {
      window.localStorage.setItem("venus_site_mode_v1", authoritative);
      setCachedMode(authoritative);
    }
  }, [loaderData?.siteMode, savedMode]);

  // Default to coming_soon shell while unknown — better to briefly show white
  // than to flash the full site.
  if (resolvedMode !== "site") {
    return (
      <div className="fixed inset-0 overflow-hidden bg-white">
        <LeadGate mode="coming_soon" />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header brand={content.brand.name} />
      <main>
        <Hero hero={content.hero} />
        <About about={content.about} />
        <Highlights items={content.highlights} />
        <EoiSection eoi={content.eoi} />
        <MasterPlan data={content.masterPlan} whatsapp={content.contact.whatsapp} />
        <Showcase3D />
        <Residences items={content.residences} />
        <Amenities items={content.amenities} />
        <Location data={content.location} mapEmbed={content.contact.mapEmbed} />
        <Gallery items={content.gallery} />
        <Brochure data={content.brochure} />
        <Trust data={content.trust} />
        <FAQ />
        <Contact contact={content.contact} />
      </main>
      <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      <WhatsAppButton phone={content.contact.whatsapp} />
      <StickyProjectBar />
      <EoiPopup eoi={content.eoi} />
      <LeadGate />
    </div>
  );
}
