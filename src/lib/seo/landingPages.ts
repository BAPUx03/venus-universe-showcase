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
  "venus-universe-nehrunagar": {
    slug: "venus-universe-nehrunagar",
    title: "Venus Universe Nehrunagar | Luxury 4 & 5 BHK Ahmedabad",
    description:
      "Venus Universe Nehrunagar — ultra-luxury 4 BHK, 5 BHK & penthouse residences in central Ahmedabad by Venus Group. Hafeez Contractor design. Pre-booking open.",
    h1: "Venus Universe Nehrunagar — Ultra Luxury Residences in Ahmedabad",
    eyebrow: "Venus Universe · Nehrunagar",
    intro:
      "Venus Universe Nehrunagar is the landmark ultra-luxury address by Venus Group — 4 BHK, 5 BHK, jodi apartments and duplex penthouses on 7 acres in central Ahmedabad. Architecture by Hafeez Contractor, landscape by SWA California, interiors by HBA Singapore. Minutes from CG Road, Ashram Road, Paldi and IIM-A.",
    keywords:
      "Venus Universe Nehrunagar, Venus Nehrunagar, Venus Universe by Venus Group, Venus luxury apartments Nehrunagar, Venus 4 BHK Nehrunagar, Venus 5 BHK Nehrunagar, Venus penthouse Ahmedabad",
    breadcrumbLabel: "Venus Universe Nehrunagar",
    faq: [
      { q: "What is Venus Universe Nehrunagar?", a: "Venus Universe Nehrunagar is a 7-acre ultra-luxury residential landmark by Venus Group in central Ahmedabad with 4 BHK, 5 BHK and penthouse residences." },
      { q: "Who is the architect of Venus Universe Nehrunagar?", a: "Architecture is by Hafeez Contractor, with landscape by SWA California and interiors by HBA Singapore." },
      { q: "How to book at Venus Universe Nehrunagar?", a: "Submit the refundable ₹5,00,000 token to lock priority allotment and pre-launch pricing." },
    ],
  },
  "luxury-apartments-cg-road-ahmedabad": {
    slug: "luxury-apartments-cg-road-ahmedabad",
    title: "Luxury Apartments near CG Road Ahmedabad | Venus Universe",
    description:
      "Luxury 4 & 5 BHK apartments near CG Road, Ahmedabad at Venus Universe Nehrunagar. Central address, Hafeez Contractor design, pre-booking open.",
    h1: "Luxury Apartments near CG Road, Ahmedabad — Venus Universe",
    eyebrow: "CG Road · Ahmedabad",
    intro:
      "Own a luxury apartment near CG Road at Venus Universe Nehrunagar. Just minutes from CG Road, Ashram Road, Law Garden and IIM-A — 4 BHK, 5 BHK and duplex penthouse residences designed by Hafeez Contractor. One of the last premium central-Ahmedabad addresses of this scale.",
    keywords:
      "luxury apartments CG Road Ahmedabad, flats near CG Road, 4 BHK near CG Road Ahmedabad, 5 BHK near CG Road, premium apartments CG Road, Venus Universe CG Road",
    breadcrumbLabel: "Apartments near CG Road",
    faq: [
      { q: "How close is Venus Universe to CG Road?", a: "Venus Universe Nehrunagar is a short drive from CG Road — one of central Ahmedabad's most premium commercial and lifestyle stretches." },
      { q: "Are there ready flats near CG Road for sale?", a: "Venus Universe is under construction with pre-booking open — 4 BHK, 5 BHK and penthouse configurations near CG Road." },
      { q: "Why buy an apartment near CG Road?", a: "CG Road is central Ahmedabad's premier corridor with best-in-city retail, F&B, hospitals and offices — new luxury inventory here is rare." },
    ],
  },
  "luxury-apartments-ashram-road-ahmedabad": {
    slug: "luxury-apartments-ashram-road-ahmedabad",
    title: "Luxury Apartments near Ashram Road Ahmedabad | Venus Universe",
    description:
      "Premium 4 & 5 BHK residences near Ashram Road, Ahmedabad at Venus Universe Nehrunagar. Central location, world-class amenities. Pre-booking open.",
    h1: "Luxury Apartments near Ashram Road, Ahmedabad — Venus Universe",
    eyebrow: "Ashram Road · Ahmedabad",
    intro:
      "Venus Universe Nehrunagar offers luxury 4 BHK, 5 BHK and penthouse residences within minutes of Ashram Road, Ellisbridge and the Sabarmati Riverfront. A rare 7-acre landmark in Ahmedabad's most premium central corridor.",
    keywords:
      "luxury apartments Ashram Road Ahmedabad, flats near Ashram Road, 4 BHK Ashram Road, premium homes Ellisbridge, Venus Universe Ashram Road",
    breadcrumbLabel: "Apartments near Ashram Road",
    faq: [
      { q: "How far is Ashram Road from Venus Universe?", a: "Ashram Road is minutes away — Venus Universe Nehrunagar sits in the same central corridor." },
      { q: "Are there luxury flats for sale near Ashram Road?", a: "Yes. Venus Universe offers pre-booking on 4 BHK, 5 BHK and penthouses near Ashram Road." },
      { q: "Is Ellisbridge / Ashram Road good to invest?", a: "It is one of Ahmedabad's most established premium corridors with strong appreciation and rare new-build supply." },
    ],
  },
  "flats-near-iim-ahmedabad": {
    slug: "flats-near-iim-ahmedabad",
    title: "Luxury Flats near IIM Ahmedabad | Venus Universe Nehrunagar",
    description:
      "Luxury 4 & 5 BHK flats near IIM Ahmedabad at Venus Universe Nehrunagar. Ultra-premium central address, Hafeez Contractor design. Pre-booking open.",
    h1: "Luxury Flats near IIM Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Near IIM-A · Ahmedabad",
    intro:
      "Venus Universe Nehrunagar offers luxury 4 BHK, 5 BHK and duplex penthouse flats near IIM Ahmedabad, CEPT University, Ahmedabad University and top hospitals. A 7-acre ultra-luxury landmark by Venus Group with 70% open landscape.",
    keywords:
      "flats near IIM Ahmedabad, apartments near IIM-A, luxury homes near CEPT Ahmedabad, homes near Ahmedabad University, 4 BHK near IIM Ahmedabad, 5 BHK near IIM Ahmedabad",
    breadcrumbLabel: "Flats near IIM Ahmedabad",
    faq: [
      { q: "Are there luxury flats for sale near IIM Ahmedabad?", a: "Yes. Venus Universe Nehrunagar offers 4 BHK, 5 BHK and penthouse residences a short drive from IIM-A." },
      { q: "What educational institutions are near Venus Universe?", a: "IIM Ahmedabad, CEPT University and Ahmedabad University are all in the neighbourhood." },
      { q: "Are hospitals close by?", a: "Shalby, Sterling and other leading hospitals are within a short drive of Venus Universe Nehrunagar." },
    ],
  },
  "hafeez-contractor-project-ahmedabad": {
    slug: "hafeez-contractor-project-ahmedabad",
    title: "Hafeez Contractor Project in Ahmedabad | Venus Universe",
    description:
      "Venus Universe Nehrunagar — a Hafeez Contractor designed luxury project in Ahmedabad. 4 & 5 BHK, penthouse, SWA landscape, HBA interiors. Pre-booking open.",
    h1: "Hafeez Contractor Designed Luxury Project in Ahmedabad — Venus Universe",
    eyebrow: "Hafeez Contractor · Ahmedabad",
    intro:
      "Venus Universe Nehrunagar is a Hafeez Contractor designed ultra-luxury residential project in central Ahmedabad. Landscape by SWA California, interiors by HBA Singapore, lighting by LET Dubai — a globally benchmarked spec on 7 acres.",
    keywords:
      "Hafeez Contractor project Ahmedabad, Hafeez Contractor Nehrunagar, designer apartments Ahmedabad, architect luxury apartments Ahmedabad, SWA landscape Ahmedabad, HBA interiors Ahmedabad",
    breadcrumbLabel: "Hafeez Contractor Project",
    faq: [
      { q: "Which Hafeez Contractor project is in Ahmedabad?", a: "Venus Universe Nehrunagar is designed by Hafeez Contractor — a 7-acre ultra-luxury landmark in central Ahmedabad." },
      { q: "Who designed the landscape and interiors?", a: "Landscape by SWA California, interiors by HBA Singapore and lighting design by LET Dubai." },
      { q: "How can I book a Hafeez Contractor apartment in Ahmedabad?", a: "Submit the refundable ₹5,00,000 token at Venus Universe to lock priority allotment." },
    ],
  },
  "gated-community-ahmedabad": {
    slug: "gated-community-ahmedabad",
    title: "Luxury Gated Community in Ahmedabad | Venus Universe",
    description:
      "Venus Universe Nehrunagar — a 7-acre luxury gated community in central Ahmedabad with clubhouse, pool, 70% open landscape. 4 & 5 BHK and penthouses.",
    h1: "Luxury Gated Community in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Gated Community · Ahmedabad",
    intro:
      "Venus Universe Nehrunagar is a premium gated community in central Ahmedabad — 7 acres with 70% open landscape, a resort-scale clubhouse, swimming pool, sky lounge, kids play area, senior-friendly zones and 24×7 security. Ultra-luxury 4 BHK, 5 BHK and penthouse residences.",
    keywords:
      "gated community Ahmedabad, luxury gated society Ahmedabad, apartments with clubhouse Ahmedabad, family gated community Nehrunagar, homes with amenities Ahmedabad",
    breadcrumbLabel: "Gated Community Ahmedabad",
    faq: [
      { q: "Is Venus Universe a gated community?", a: "Yes. Venus Universe Nehrunagar is a fully gated 7-acre community with 24×7 security, controlled access and dedicated amenity zones." },
      { q: "What amenities are included?", a: "Clubhouse, swimming pool, gym, sky lounge, landscaped gardens, kids play area, multi-level parking and concierge services." },
      { q: "Is it a good gated community for families?", a: "Yes — 70% open landscape, kids and senior zones and premium safety make it ideal for families." },
    ],
  },
  "ultra-luxury-apartments-ahmedabad": {
    slug: "ultra-luxury-apartments-ahmedabad",
    title: "Ultra Luxury Apartments in Ahmedabad | Venus Universe",
    description:
      "Ultra luxury apartments in Ahmedabad at Venus Universe Nehrunagar. 4 & 5 BHK, duplex penthouses, Hafeez Contractor design. Limited units. Pre-booking open.",
    h1: "Ultra Luxury Apartments in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Ultra Luxury · Ahmedabad",
    intro:
      "Venus Universe Nehrunagar is Ahmedabad's new benchmark for ultra-luxury living. Spacious 4 BHK, 5 BHK, jodi and duplex penthouse residences on a 7-acre plot in the city's most premium central address — designed by Hafeez Contractor with global-standard interiors, landscape and lighting.",
    keywords:
      "ultra luxury apartments Ahmedabad, elite homes Ahmedabad, high class apartments Ahmedabad, HNI homes Ahmedabad, exclusive residences Ahmedabad, limited units luxury Ahmedabad",
    breadcrumbLabel: "Ultra Luxury Apartments Ahmedabad",
    faq: [
      { q: "What defines an ultra-luxury apartment in Ahmedabad?", a: "Large carpet areas, low density, top-tier global design consultants, private amenities and a premium central address — all offered at Venus Universe Nehrunagar." },
      { q: "Are limited units available?", a: "Yes — Venus Universe is a limited-inventory landmark; pre-booking is open with a refundable ₹5L token." },
      { q: "Who is Venus Universe suited for?", a: "HNI families, NRIs, business owners, doctors and CXOs seeking an ultra-luxury central Ahmedabad home." },
    ],
  },
  "best-luxury-project-ahmedabad": {
    slug: "best-luxury-project-ahmedabad",
    title: "Best Luxury Project in Ahmedabad | Venus Universe Nehrunagar",
    description:
      "Looking for the best luxury project in Ahmedabad? Venus Universe Nehrunagar — 7-acre landmark, Hafeez Contractor, 4 & 5 BHK, penthouses. Pre-booking open.",
    h1: "Best Luxury Project in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Best Luxury Project · Ahmedabad",
    intro:
      "If you're comparing the best luxury projects in Ahmedabad, Venus Universe Nehrunagar leads on the metrics that matter — a rare 7-acre plot in central Ahmedabad, Hafeez Contractor architecture, SWA California landscape, HBA Singapore interiors, 70% open space and truly ultra-luxury 4 BHK, 5 BHK and penthouse residences.",
    keywords:
      "best luxury project Ahmedabad, best luxury apartments Ahmedabad, top luxury project Ahmedabad, best real estate project Ahmedabad, best area to buy luxury home Ahmedabad, is Nehrunagar good for living",
    breadcrumbLabel: "Best Luxury Project Ahmedabad",
    faq: [
      { q: "Which is the best luxury project in Ahmedabad right now?", a: "Venus Universe Nehrunagar is among the top ultra-luxury launches — central location, global design team and a 7-acre landmark plot with 70% open landscape." },
      { q: "Is Nehrunagar a good area to live in Ahmedabad?", a: "Nehrunagar is one of central Ahmedabad's most premium, low-density residential neighbourhoods — close to CG Road, Ashram Road, IIM-A and top hospitals." },
      { q: "How does Venus Universe compare to other projects?", a: "Very few Ahmedabad projects offer this combination of location, plot scale, architect pedigree and open space." },
    ],
  },
  "4bhk-nehrunagar-ahmedabad": {
    slug: "4bhk-nehrunagar-ahmedabad",
    title: "4 BHK in Nehrunagar Ahmedabad | Venus Universe",
    description:
      "Buy a luxury 4 BHK in Nehrunagar, Ahmedabad at Venus Universe. 1,550+ sq ft carpet, Hafeez Contractor design, world-class amenities. Pre-booking open.",
    h1: "Luxury 4 BHK in Nehrunagar, Ahmedabad — Venus Universe",
    eyebrow: "4 BHK · Nehrunagar",
    intro:
      "Own a premium 4 BHK in Nehrunagar, Ahmedabad at Venus Universe. From 1,550 sq ft carpet with triple-height lobbies, private decks and HBA Singapore interiors — set in a 7-acre gated landmark in Ahmedabad's most central premium address.",
    keywords:
      "4 BHK Nehrunagar Ahmedabad, 4 BHK in Nehrunagar, buy 4 BHK Nehrunagar, luxury 4 BHK Nehrunagar, Venus 4 BHK Nehrunagar",
    breadcrumbLabel: "4 BHK Nehrunagar",
    faq: [
      { q: "What is the price of 4 BHK in Nehrunagar Ahmedabad?", a: "Venus Universe is at pre-launch pricing — talk to sales for the current 4 BHK price band." },
      { q: "How big are the 4 BHK apartments?", a: "From 1,550 sq ft carpet, with jodi-house configurations available for larger requirements." },
      { q: "Is Nehrunagar central Ahmedabad?", a: "Yes — Nehrunagar is one of the most central premium addresses in Ahmedabad, minutes from CG Road, Ashram Road and IIM-A." },
    ],
  },
  "5bhk-nehrunagar-ahmedabad": {
    slug: "5bhk-nehrunagar-ahmedabad",
    title: "5 BHK in Nehrunagar Ahmedabad | Venus Universe",
    description:
      "Luxury 5 BHK apartments in Nehrunagar, Ahmedabad at Venus Universe. 2,100–2,475 sq ft with duplex penthouse options. Pre-booking open.",
    h1: "Luxury 5 BHK in Nehrunagar, Ahmedabad — Venus Universe",
    eyebrow: "5 BHK · Nehrunagar",
    intro:
      "Discover premium 5 BHK apartments in Nehrunagar, Ahmedabad at Venus Universe. Spanning 2,100 to 2,475 sq ft with duplex penthouse and jodi options — designed by Hafeez Contractor with SWA California landscape and HBA Singapore interiors in a central Ahmedabad landmark.",
    keywords:
      "5 BHK Nehrunagar Ahmedabad, 5 BHK in Nehrunagar, buy 5 BHK Nehrunagar, luxury 5 BHK Nehrunagar, Venus 5 BHK Nehrunagar",
    breadcrumbLabel: "5 BHK Nehrunagar",
    faq: [
      { q: "What sizes are 5 BHK homes at Venus Universe Nehrunagar?", a: "5 BHK residences span 2,100 to 2,475 sq ft, with duplex penthouses and jodi configurations." },
      { q: "Are duplex penthouses available?", a: "Yes — duplex penthouses with private terraces and sky-lounges are part of the 5 BHK collection." },
      { q: "How do I get the 5 BHK price?", a: "Submit the ₹5,00,000 refundable token or request the price sheet through the enquiry form." },
    ],
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);

export function landingUrl(slug: string): string {
  return `${BASE}/${slug}`;
}

const OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/Nlau0aIfcNZ994VHhH1ZCQI5FFn1/social-images/social-1776592390810-vectorstock_45301125.webp";

export function buildLandingHead(slug: string) {
  const c = LANDING_PAGES[slug];
  if (!c) return { meta: [], links: [], scripts: [] };
  const url = landingUrl(slug);

  const meta: Array<Record<string, string>> = [
    { title: c.title },
    { name: "description", content: c.description },
    { name: "keywords", content: c.keywords },
    { name: "author", content: "Venus Universe" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    // Geo signals
    { name: "geo.region", content: "IN-GJ" },
    { name: "geo.placename", content: "Nehrunagar, Ahmedabad" },
    { name: "geo.position", content: "23.0307;72.5497" },
    { name: "ICBM", content: "23.0307, 72.5497" },
    // Open Graph
    { property: "og:title", content: c.title },
    { property: "og:description", content: c.description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Venus Universe Nehrunagar" },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:locale", content: "en_IN" },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: c.title },
    { name: "twitter:description", content: c.description },
    { name: "twitter:image", content: OG_IMAGE },
  ];

  const residenceSchema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: c.h1,
    url,
    image: OG_IMAGE,
    description: c.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nehrunagar",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380015",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 23.0307, longitude: 72.5497 },
    numberOfRooms: "4 BHK, 5 BHK, Penthouse",
    amenityFeature: [
      "Clubhouse", "Gym", "Swimming Pool", "Landscaped Gardens",
      "24x7 Security", "Multi-level Parking", "Sky Lounge", "Concierge",
    ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://venusuniverse.in/#organization",
    name: "Venus Universe Nehrunagar",
    url: "https://venusuniverse.in",
    logo: OG_IMAGE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nehrunagar",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380015",
      addressCountry: "IN",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://venusuniverse.in" },
      { "@type": "ListItem", position: 2, name: c.breadcrumbLabel, item: url },
    ],
  };

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(residenceSchema) },
      { type: "application/ld+json", children: JSON.stringify(orgSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ],
  };
}
