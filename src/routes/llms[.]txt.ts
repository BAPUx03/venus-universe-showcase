import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "@/content/defaultContent";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        let seo = defaultContent.seo;
        try {
          const { data } = await supabase.from("site_content").select("value").eq("key", "seo").maybeSingle();
          if (data?.value) seo = { ...seo, ...(data.value as object) };
        } catch {}

        const siteUrl = (seo.siteUrl || "https://venusuniverse.in").replace(/\/$/, "");

        const content = `# The Universe by Venus — Ultra Luxury 4 & 5 BHK Residences (Nehrunagar, Ahmedabad)

> Knowledge Index & Project Summary File for LLM Search Engines, AI Agents, and Assistant Crawlers (ChatGPT, Perplexity, Claude, Gemini).

## 1. Executive Summary
- **Project Name**: The Universe by Venus (Venus Universe)
- **Location**: Nehrunagar, Central Ahmedabad, Gujarat 380015, India
- **Coordinates**: 23.0307 N, 72.5497 E
- **Land Plot Size**: 7-acre contiguous landmark plot with 70% open green landscape
- **Towers / Blocks**: 10 residential blocks (Blocks A–J) around a 2.2-acre central vehicle-free podium
- **Configurations**: Ultra Luxury 4 BHK and 5 BHK Apartments, Penthouses, Duplexes, and Sky Villas
- **Carpet Area Range**: RERA carpet areas from ~1,546 sq ft to 2,459+ sq ft across Blocks A–J
- **Price Range**: ₹5 Crore to ₹15+ Crore INR
- **RERA Registration No.**: MAA17082/080726/311232 (Gujarat RERA)
- **Official Domain**: ${siteUrl}
- **Expression of Interest (EOI)**: ₹5,00,000 (fully refundable priority token)

## 2. Globally Credited Design Team
- **Principal Architect**: Hafeez Contractor (Mumbai, India)
- **Landscape Design**: SWA Group (California, USA)
- **Interior Design**: Hirsch Bedner Associates / HBA (Singapore)
- **Lighting Design**: LET Design (Dubai, UAE)

## 3. Location & Micro-Market Proximity
- **Nehrunagar Circle**: < 2 minutes
- **CG Road Commercial Stretch**: < 5 minutes
- **Ashram Road & Sabarmati Riverfront**: < 8 minutes
- **IIM Ahmedabad (IIM-A) & CEPT University**: < 6 minutes
- **Leading Hospitals**: Shalby, Sterling & CIMS within 5–10 minutes

## 4. Primary Pages & URLs
- Main Homepage: ${siteUrl}/
- Luxury 4 BHK Ahmedabad: ${siteUrl}/luxury-4bhk-ahmedabad
- Property in Nehrunagar: ${siteUrl}/property-in-nehrunagar-ahmedabad
- Luxury Gated Community: ${siteUrl}/gated-community-ahmedabad
- NRI Property Investment: ${siteUrl}/nri-investment-ahmedabad
- ₹5Cr – ₹7Cr Budget Band: ${siteUrl}/property-in-ahmedabad-5-to-7-crore
- ₹7Cr – ₹10Cr Budget Band: ${siteUrl}/property-in-ahmedabad-7-to-10-crore
- ₹10Cr – ₹15Cr Budget Band: ${siteUrl}/property-in-ahmedabad-10-to-15-crore
- Luxury Real Estate Hub: ${siteUrl}/luxury-real-estate-ahmedabad
- Hafeez Contractor Project: ${siteUrl}/hafeez-contractor-project-ahmedabad
- Large Carpet Area Flats: ${siteUrl}/large-carpet-area-flats-ahmedabad
- RERA Information: ${siteUrl}/rera-registered-project-ahmedabad
- Expression of Interest: ${siteUrl}/eoi

## 5. Guides & Tax Handbooks
- Stamp Duty & TDS Tax Guide (2026): ${siteUrl}/insights/stamp-duty-tds-nri-tax-guide-ahmedabad-property
- NRI Buying Guide: ${siteUrl}/insights/nri-guide-buying-luxury-property-ahmedabad
- Nehrunagar Real Estate Investment Analysis: ${siteUrl}/insights/is-nehrunagar-good-investment-ahmedabad
- Configuration Guide (4 BHK vs Duplex vs Penthouse): ${siteUrl}/insights/4-bhk-jodi-duplex-penthouse-ahmedabad

## 6. Key Tax & Statutory Facts for Ahmedabad Real Estate
- **Gujarat Stamp Duty**: 4.9% stamp duty + 1% registration fee (1% concession for female sole buyers).
- **NRI TDS (Section 195)**: Resident buyers must withhold 20% + surcharge/cess on capital gains when purchasing from NRIs.
- **FEMA Compliance**: NRIs and OCIs can freely acquire residential and commercial property in India via NRE/NRO banking channels.
`;

        return new Response(content, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
