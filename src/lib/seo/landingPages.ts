/**
 * Programmatic SEO landing pages.
 * Each slug renders the shared LandingPage UI with unique title, meta,
 * H1, keyword-rich intro copy, and JSON-LD. Google indexes them as
 * separate ranking pages targeting different intents.
 */

export interface LandingConfig {
  slug: string;
  title: string; // <= 60 chars
  description: string; // <= 160 chars
  h1: string;
  eyebrow: string;
  intro: string; // Visible SEO copy above the fold on the landing page
  keywords: string;
  faq: Array<{ q: string; a: string }>;
  breadcrumbLabel: string;
}

const BASE = "https://venusuniverse.in";

export const LANDING_PAGES: Record<string, LandingConfig> = {
  "venus-universe-ahmedabad": {
    slug: "venus-universe-ahmedabad",
    title: "Venus Universe Ahmedabad | Luxury 4 & 5 BHK, Penthouse",
    description:
      "Venus Universe Ahmedabad — ultra-luxury 4 BHK, 5 BHK and penthouse residences in Nehrunagar. Hafeez Contractor design. Pre-booking open.",
    h1: "Venus Universe Ahmedabad — Ultra Luxury 4 & 5 BHK Residences",
    eyebrow: "Venus Universe · Ahmedabad",
    intro:
      "Venus Universe Ahmedabad is a landmark ultra-luxury development in Nehrunagar offering 4 BHK, 5 BHK, duplex and penthouse residences. Designed by Hafeez Contractor with 70% open landscape and world-class interiors, the project sits minutes from CG Road, Ashram Road, Paldi and IIM-A. Pre-booking is open with a refundable ₹5L EOI.",
    keywords:
      "Venus Universe Ahmedabad, Venus Universe, luxury apartments Ahmedabad, 4 BHK Ahmedabad, 5 BHK Ahmedabad, penthouse Ahmedabad, Nehrunagar",
    breadcrumbLabel: "Venus Universe Ahmedabad",
    faq: [
      { q: "Where is Venus Universe Ahmedabad located?", a: "Venus Universe is in Nehrunagar, central Ahmedabad — minutes from CG Road, Ashram Road, Paldi and IIM-A." },
      { q: "Which residence types are available at Venus Universe Ahmedabad?", a: "Venus Universe offers 4 BHK apartments, 5 BHK apartments, jodi apartments, duplexes and penthouses." },
      { q: "Is Venus Universe Ahmedabad open for pre-booking?", a: "Yes. Pre-booking is open with a fully refundable ₹5,00,000 Expression of Interest that locks pre-launch pricing." },
    ],
  },
  "luxury-4bhk-ahmedabad": {
    slug: "luxury-4bhk-ahmedabad",
    title: "Luxury 4 BHK Flats in Ahmedabad | Venus Universe Nehrunagar",
    description:
      "Luxury 4 BHK flats in Ahmedabad by Venus Universe Nehrunagar. 1,550+ sq ft carpet, Hafeez Contractor design, prime central address. Pre-booking open.",
    h1: "Luxury 4 BHK Flats in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "4 BHK · Ahmedabad",
    intro:
      "Discover luxury 4 BHK flats in Ahmedabad at Venus Universe Nehrunagar. Starting from 1,550 sq ft carpet, these premium 4 BHK apartments feature triple-height lobbies, private decks and interiors by HBA Singapore. Set in a 7-acre landmark with 70% open landscape in the heart of Ahmedabad's most premium address.",
    keywords:
      "luxury 4 BHK Ahmedabad, 4 BHK flats Ahmedabad, 4 BHK apartments Nehrunagar Ahmedabad, premium 4 BHK Ahmedabad, Venus Universe 4 BHK",
    breadcrumbLabel: "Luxury 4 BHK Ahmedabad",
    faq: [
      { q: "What is the size of a 4 BHK at Venus Universe?", a: "4 BHK residences at Venus Universe Nehrunagar start from 1,550 sq ft carpet area with configurations up to jodi-house options." },
      { q: "Where in Ahmedabad are these 4 BHK flats?", a: "The 4 BHK apartments are in Nehrunagar, central Ahmedabad, minutes from CG Road, Ashram Road and IIM-A." },
      { q: "Are these 4 BHK Ahmedabad flats ready to move?", a: "The project is under construction. Pre-booking is open with a refundable ₹5L EOI locking pre-launch pricing." },
    ],
  },
  "luxury-5bhk-ahmedabad": {
    slug: "luxury-5bhk-ahmedabad",
    title: "Luxury 5 BHK Apartments in Ahmedabad | Venus Universe",
    description:
      "Luxury 5 BHK apartments in Ahmedabad at Venus Universe Nehrunagar. 2,100–2,475 sq ft, duplex options, world-class amenities. Pre-booking open.",
    h1: "Luxury 5 BHK Apartments in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "5 BHK · Ahmedabad",
    intro:
      "Explore luxury 5 BHK apartments in Ahmedabad at Venus Universe Nehrunagar. Spanning 2,100 to 2,475 sq ft, including duplex penthouses and jodi-house configurations, these premium 5 BHK homes are designed by Hafeez Contractor with landscape by SWA California and lighting by LET Dubai.",
    keywords:
      "luxury 5 BHK Ahmedabad, 5 BHK flats Ahmedabad, 5 BHK apartments Nehrunagar Ahmedabad, premium 5 BHK Ahmedabad, Venus Universe 5 BHK",
    breadcrumbLabel: "Luxury 5 BHK Ahmedabad",
    faq: [
      { q: "What sizes are 5 BHK apartments at Venus Universe?", a: "5 BHK residences range from 2,100 sq ft up to 2,475 sq ft, with duplex penthouses and jodi options available." },
      { q: "Do the 5 BHK homes include penthouses?", a: "Yes. Duplex penthouses form part of the 5 BHK collection at Venus Universe Nehrunagar." },
      { q: "How premium is the 5 BHK spec?", a: "Interiors by HBA Singapore, lighting by LET Dubai, landscape by SWA California and architecture by Hafeez Contractor." },
    ],
  },
  "penthouse-ahmedabad": {
    slug: "penthouse-ahmedabad",
    title: "Penthouse in Ahmedabad | Venus Universe Nehrunagar",
    description:
      "Duplex penthouse in Ahmedabad at Venus Universe Nehrunagar. Sky-lounges, private terraces and 5 BHK layouts in central Ahmedabad. Pre-booking open.",
    h1: "Duplex Penthouse in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Penthouse · Ahmedabad",
    intro:
      "Own a duplex penthouse in Ahmedabad at Venus Universe Nehrunagar. Sky-lounges, private terraces and 5 BHK layouts crown a 7-acre landmark designed by Hafeez Contractor, in central Ahmedabad minutes from CG Road, Ashram Road and IIM-A.",
    keywords:
      "penthouse Ahmedabad, luxury penthouse Ahmedabad, duplex penthouse Nehrunagar, Venus Universe penthouse, sky lounge apartments Ahmedabad",
    breadcrumbLabel: "Penthouse Ahmedabad",
    faq: [
      { q: "Are penthouses available at Venus Universe?", a: "Yes. Duplex penthouses with private terraces and sky-lounges are part of the 5 BHK collection." },
      { q: "Where is the penthouse located in Ahmedabad?", a: "The penthouse is in Nehrunagar, central Ahmedabad, minutes from CG Road, Ashram Road and IIM-A." },
      { q: "How to book a penthouse at Venus Universe?", a: "Submit the refundable ₹5,00,000 EOI to lock priority allotment and pre-launch pricing on penthouse inventory." },
    ],
  },
  "property-in-nehrunagar-ahmedabad": {
    slug: "property-in-nehrunagar-ahmedabad",
    title: "Property in Nehrunagar Ahmedabad | Venus Universe",
    description:
      "New property in Nehrunagar Ahmedabad — Venus Universe offers 4 BHK, 5 BHK and penthouse residences near CG Road & IIM-A. Pre-booking open.",
    h1: "New Property in Nehrunagar, Ahmedabad — Venus Universe",
    eyebrow: "Nehrunagar · Ahmedabad",
    intro:
      "Looking for property in Nehrunagar, Ahmedabad? Venus Universe Nehrunagar is a new luxury development offering 4 BHK, 5 BHK and duplex penthouse residences in Ahmedabad's most premium central address. Adjacent to CG Road, Ashram Road, Paldi and IIM-A, with a 7-acre landmark plot and 70% open landscape.",
    keywords:
      "property in Nehrunagar Ahmedabad, new property Nehrunagar, flats in Nehrunagar Ahmedabad, real estate Nehrunagar, Venus Universe Nehrunagar",
    breadcrumbLabel: "Property in Nehrunagar",
    faq: [
      { q: "What new property is launching in Nehrunagar Ahmedabad?", a: "Venus Universe Nehrunagar — an under-construction ultra-luxury project with 4 BHK, 5 BHK and penthouse residences." },
      { q: "Is Nehrunagar a good area to buy property in Ahmedabad?", a: "Nehrunagar is one of central Ahmedabad's most premium addresses, close to CG Road, Ashram Road, Paldi and IIM-A." },
      { q: "How to enquire about property in Nehrunagar?", a: "Submit the refundable ₹5,00,000 EOI or book a site visit — the site office in Nehrunagar is open." },
    ],
  },
  "nri-investment-ahmedabad": {
    slug: "nri-investment-ahmedabad",
    title: "NRI Property Investment in Ahmedabad | Venus Universe",
    description:
      "NRI-friendly luxury property investment in Ahmedabad. Venus Universe Nehrunagar offers 4 & 5 BHK residences with global-standard design. Pre-booking open.",
    h1: "NRI Property Investment in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "NRI · Ahmedabad",
    intro:
      "Venus Universe Nehrunagar is a preferred choice for NRI property investment in Ahmedabad. Ultra-luxury 4 BHK, 5 BHK and penthouse residences by Hafeez Contractor with interiors by HBA Singapore, landscape by SWA California and lighting by LET Dubai — global-standard specification at Ahmedabad's most central premium address.",
    keywords:
      "NRI investment Ahmedabad, NRI property Ahmedabad, NRI real estate Ahmedabad, buy property Ahmedabad NRI, luxury apartments for NRI Ahmedabad",
    breadcrumbLabel: "NRI Investment",
    faq: [
      { q: "Why should NRIs invest in Ahmedabad property?", a: "Ahmedabad offers strong capital appreciation, a booming corporate corridor and premium central addresses like Nehrunagar rarely available for new construction." },
      { q: "Does Venus Universe support NRI buyers?", a: "Yes. The sales team supports remote bookings, EOI, documentation and site walkthroughs for NRI investors globally." },
      { q: "What is the ticket size for NRI investment at Venus Universe?", a: "4 BHK, 5 BHK and penthouse configurations are available across price bands — talk to sales for current pricing." },
    ],
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);

export function landingUrl(slug: string): string {
  return `${BASE}/${slug}`;
}
