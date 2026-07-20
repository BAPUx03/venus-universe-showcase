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
import { LeadGate } from "@/components/site/LeadGate";
import { FAQ } from "@/components/site/FAQ";
import { Showcase3D } from "@/components/site/Showcase3D";
import { DesignTeam } from "@/components/site/DesignTeam";
import { NriSection } from "@/components/site/NriSection";
import showreel from "@/assets/showreel.mp4.asset.json";
import heroTower from "@/assets/hero-tower.webp";


export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const { data } = await supabase.from("site_content").select("key, value").in("key", ["seo", "brand", "siteMode"]);
      const map: Record<string, unknown> = {};
      for (const r of data ?? []) map[r.key] = r.value;
      const savedSeo = { ...defaultContent.seo, ...((map.seo as object) ?? {}) };
      const seo = {
        ...savedSeo,
        title: defaultContent.seo.title,
        description: defaultContent.seo.description,
        keywords: defaultContent.seo.keywords,
        author: defaultContent.seo.author,
      };
      const brand = {
        ...defaultContent.brand,
        ...((map.brand as object) ?? {}),
        name: defaultContent.brand.name,
        tagline: defaultContent.brand.tagline,
      };
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
      name: "Venus",
      alternateName: ["Venus Group", "Venus Infrastructure"],
      url: siteUrl,
      image: seo.ogImage,
      logo: seo.ogImage,
      description: "Developer of The Universe by Venus, a landmark 10-block premium 4 BHK community in Nehrunagar, Ahmedabad.",
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
      areaServed: ["Nehrunagar", "CG Road", "Ashram Road", "Paldi", "Ahmedabad"],
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "The Universe by Venus Sales Gallery",
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
      name: "The Universe by Venus — Premium 4 BHK Residences in Nehrunagar, Ahmedabad",
      url: siteUrl,
      image: seo.ogImage,
      description: "The Universe by Venus is a 7-acre, 10-block residential development in Nehrunagar with premium 4 BHK residences across brochure-listed RERA carpet ranges.",
      audience: [
        { "@type": "Audience", audienceType: "Resident Indian home buyers" },
        { "@type": "Audience", audienceType: "NRI and OCI home buyers" },
      ],
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
        { "@type": "Question", name: "What configurations are available at The Universe by Venus?", acceptedAnswer: { "@type": "Answer", text: "The approved brochure presents premium 4 BHK residences across Blocks A–J, with RERA carpet areas from approximately 1,546 to 2,459 sq ft. Larger formats are subject to official availability." } },
        { "@type": "Question", name: "Where is The Universe by Venus located?", acceptedAnswer: { "@type": "Answer", text: "The Universe by Venus is located in Nehrunagar, Ahmedabad, with access to CG Road, Ashram Road, Paldi and IIM Ahmedabad." } },
        { "@type": "Question", name: "Is booking open?", acceptedAnswer: { "@type": "Answer", text: "Yes. Pre-booking at Venus Universe is officially open and the site office in Nehrunagar welcomes visitors every day." } },
        { "@type": "Question", name: "Who designed The Universe by Venus?", acceptedAnswer: { "@type": "Answer", text: "Architecture is by Hafeez Contractor, principal landscape design by SWA Group, interiors by Hirsch Bedner Associates and lighting by LET Design, Dubai." } },
        { "@type": "Question", name: "Can NRI buyers explore The Universe by Venus remotely?", acceptedAnswer: { "@type": "Answer", text: "NRI and OCI buyers can request a video walkthrough and an international callback. Legal, tax, FEMA and Power of Attorney decisions should be confirmed with independent advisors." } },
        { "@type": "Question", name: "What amenities are available?", acceptedAnswer: { "@type": "Answer", text: "A 2.2 acre landscaped podium, grand clubhouse, swimming pool, gymnasium, kids' play area, gardens, sports courts, wellness lounge and guest suite across the 7-acre development." } },
        { "@type": "Question", name: "What is the RERA number?", acceptedAnswer: { "@type": "Answer", text: "Venus Universe is RERA-registered under registration number MAA17082/080726/311232. Full RERA details are shared with prospective buyers on request." } },
        { "@type": "Question", name: "What is the starting price?", acceptedAnswer: { "@type": "Answer", text: "Pricing is shared on request. Submit the fully refundable ₹5,00,000 Expression of Interest, or connect with our sales team for the current price list and pre-launch offers." } },
      ],
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "The Universe by Venus", item: siteUrl },
      ],
    };

    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "The Universe by Venus — Cinematic Showreel",
      description:
        "A cinematic tour of The Universe by Venus, a premium 4 BHK residential development across Blocks A–J in Nehrunagar, Ahmedabad.",
      thumbnailUrl: [seo.ogImage],
      uploadDate: "2026-01-15",
      contentUrl: showreel.url,
      embedUrl: siteUrl,
      publisher: { "@type": "Organization", name: "Venus", logo: { "@type": "ImageObject", url: seo.ogImage } },
    };

    const scripts: Array<Record<string, string>> = [
      { type: "application/ld+json", children: JSON.stringify(realEstateSchema) },
      { type: "application/ld+json", children: JSON.stringify(localBusinessSchema) },
      { type: "application/ld+json", children: JSON.stringify(residenceSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
      { type: "application/ld+json", children: JSON.stringify(videoSchema) },
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
      links: [
        { rel: "canonical", href: (seo as { canonical?: string }).canonical || seo.siteUrl },
        { rel: "preload", as: "image", href: heroTower },
      ],
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
        <DesignTeam />
        <NriSection />
        <FAQ />
        <Contact contact={content.contact} />
      </main>
      <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      <WhatsAppButton phone={content.contact.whatsapp} />
      <StickyProjectBar />
      <LeadGate />
    </div>
  );
}
