/**
 * Programmatic SEO landing pages.
 * Each slug renders the shared LandingPage UI with unique title, meta,
 * H1, keyword-rich intro copy, and JSON-LD. Google indexes them as
 * separate ranking pages targeting different intents.
 */

import heroTower from "@/assets/hero-tower.webp";

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
    title: "The Universe by Venus | Premium 4 BHK Ahmedabad",
    description:
      "The Universe by Venus is a 10-block premium 4 BHK development in Nehrunagar, with brochure-backed RERA carpet areas and global design expertise.",
    h1: "The Universe by Venus — Premium 4 BHK Residences in Ahmedabad",
    eyebrow: "The Universe by Venus · Ahmedabad",
    intro:
      "The Universe by Venus is a landmark 10-block development in Nehrunagar offering premium 4 BHK residences with RERA carpet areas from approximately 1,546 to 2,459 sq ft. Architecture is by Hafeez Contractor, principal landscape design by SWA Group and interiors by Hirsch Bedner Associates.",
    keywords:
      "The Universe by Venus, Venus Universe Ahmedabad, luxury apartments Ahmedabad, 4 BHK Ahmedabad, premium 4 BHK Nehrunagar",
    breadcrumbLabel: "The Universe by Venus",
    faq: [
      { q: "Where is The Universe by Venus located?", a: "The Universe by Venus is in Nehrunagar, central Ahmedabad, with access to CG Road, Ashram Road, Paldi and IIM-A." },
      { q: "Which residence types are brochure-confirmed?", a: "The approved brochure presents premium 4 BHK residences across Blocks A–J. Larger formats are subject to official availability." },
      { q: "Is Venus Universe Ahmedabad open for pre-booking?", a: "Yes. Pre-booking is open with a fully refundable ₹5,00,000 Expression of Interest that locks pre-launch pricing." },
    ],
  },
  "luxury-4bhk-ahmedabad": {
    slug: "luxury-4bhk-ahmedabad",
    title: "Luxury 4 BHK Flats Ahmedabad | The Universe by Venus",
    description:
      "Premium 4 BHK flats at The Universe by Venus, Nehrunagar. Brochure-listed RERA carpet areas from 1,546 to 2,459 sq ft across Blocks A–J.",
    h1: "Luxury 4 BHK Flats in Ahmedabad — The Universe by Venus",
    eyebrow: "4 BHK · Ahmedabad",
    intro:
      "Discover premium 4 BHK flats at The Universe by Venus in Nehrunagar. The approved brochure documents block-specific RERA carpet areas from approximately 1,546 to 2,459 sq ft across Blocks A–J, with interiors by Hirsch Bedner Associates.",
    keywords:
      "luxury 4 BHK Ahmedabad, 4 BHK flats Ahmedabad, 4 BHK apartments Nehrunagar Ahmedabad, premium 4 BHK Ahmedabad, Venus Universe 4 BHK",
    breadcrumbLabel: "Luxury 4 BHK Ahmedabad",
    faq: [
      { q: "What is the size of a 4 BHK at The Universe by Venus?", a: "Brochure-listed 4 BHK RERA carpet areas range from approximately 1,546 to 2,459 sq ft, depending on block and unit plan." },
      { q: "Where in Ahmedabad are these 4 BHK flats?", a: "The 4 BHK apartments are in Nehrunagar, central Ahmedabad, minutes from CG Road, Ashram Road and IIM-A." },
      { q: "Are these 4 BHK Ahmedabad flats ready to move?", a: "The project is under construction. Pre-booking is open with a refundable ₹5L EOI locking pre-launch pricing." },
    ],
  },
  "penthouse-ahmedabad": {
    slug: "penthouse-ahmedabad",
    title: "Jodi, Duplex & Penthouse Ahmedabad | Availability",
    description:
      "Ask about officially available penthouse, duplex or larger-format options at The Universe by Venus in Nehrunagar, Ahmedabad.",
    h1: "Jodi, Duplex and Penthouse Options in Ahmedabad",
    eyebrow: "Larger Formats · Subject to Availability",
    intro:
      "Explore whether jodi, duplex, penthouse or other larger-format configurations are officially available at The Universe by Venus. Availability, approved plans and pricing must be confirmed with the sales team before booking.",
    keywords:
      "penthouse Ahmedabad, duplex Ahmedabad, jodi apartment Ahmedabad, larger format residences Ahmedabad, luxury penthouse Nehrunagar",
    breadcrumbLabel: "Penthouse Ahmedabad",
    faq: [
      { q: "Are penthouses available at The Universe by Venus?", a: "Penthouse, duplex and larger-format availability must be confirmed against the current official inventory and approved plans." },
      { q: "Are jodi apartments or duplexes available?", a: "Jodi, duplex and other larger-format options are not presented as standard inventory and must be confirmed against current official availability and approved plans." },
      { q: "What should buyers verify before booking a larger-format home?", a: "Request the exact approved plan, RERA carpet-area statement, inventory confirmation, price sheet and agreement documents for the specific unit." },
    ],
  },
  "property-in-nehrunagar-ahmedabad": {
    slug: "property-in-nehrunagar-ahmedabad",
    title: "Property in Nehrunagar Ahmedabad | Venus Universe",
    description:
      "New property in Nehrunagar Ahmedabad — The Universe by Venus offers premium 4 BHK residences across a 10-block development near CG Road and IIM-A.",
    h1: "New Property in Nehrunagar, Ahmedabad — Venus Universe",
    eyebrow: "Nehrunagar · Ahmedabad",
    intro:
      "Looking for property in Nehrunagar, Ahmedabad? The Universe by Venus is a 10-block luxury development offering premium 4 BHK residences in a central address near CG Road, Ashram Road, Paldi and IIM-A.",
    keywords:
      "property in Nehrunagar Ahmedabad, new property Nehrunagar, flats in Nehrunagar Ahmedabad, real estate Nehrunagar, Venus Universe Nehrunagar",
    breadcrumbLabel: "Property in Nehrunagar",
    faq: [
      { q: "What new property is launching in Nehrunagar Ahmedabad?", a: "The Universe by Venus is a premium residential development with brochure-confirmed 4 BHK plans across Blocks A–J." },
      { q: "Is Nehrunagar a good area to buy property in Ahmedabad?", a: "Nehrunagar is one of central Ahmedabad's most premium addresses, close to CG Road, Ashram Road, Paldi and IIM-A." },
      { q: "How to enquire about property in Nehrunagar?", a: "Submit the refundable ₹5,00,000 EOI or book a site visit — the site office in Nehrunagar is open." },
    ],
  },
  "nri-investment-ahmedabad": {
    slug: "nri-investment-ahmedabad",
    title: "NRI Property Investment in Ahmedabad | Venus Universe",
    description:
      "NRI-friendly premium 4 BHK property in Ahmedabad at The Universe by Venus, with a globally credited design and consulting team.",
    h1: "NRI Property Investment in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "NRI · Ahmedabad",
    intro:
      "The Universe by Venus offers NRI buyers brochure-documented 4 BHK plans in Nehrunagar, with architecture by Hafeez Contractor, principal landscape design by SWA Group, interiors by Hirsch Bedner Associates and lighting by LET Design, Dubai.",
    keywords:
      "NRI investment Ahmedabad, NRI property Ahmedabad, NRI real estate Ahmedabad, buy property Ahmedabad NRI, luxury apartments for NRI Ahmedabad",
    breadcrumbLabel: "NRI Investment",
    faq: [
      { q: "Why should NRIs invest in Ahmedabad property?", a: "Ahmedabad offers strong capital appreciation, a booming corporate corridor and premium central addresses like Nehrunagar rarely available for new construction." },
      { q: "Does Venus Universe support NRI buyers?", a: "Yes. The sales team supports remote bookings, EOI, documentation and site walkthroughs for NRI investors globally." },
      { q: "What is the ticket size for NRI investment at The Universe by Venus?", a: "Premium 4 BHK residences span multiple brochure-listed RERA carpet ranges. Ask sales for current inventory and pricing." },
    ],
  },
  "venus-universe-nehrunagar": {
    slug: "venus-universe-nehrunagar",
    title: "Venus Universe Nehrunagar | Project Guide & 4 BHK",
    description:
      "The Universe by Venus — premium 4 BHK residences across Blocks A–J in Nehrunagar, Ahmedabad, with architecture by Hafeez Contractor.",
    h1: "Venus Universe Nehrunagar — Ultra Luxury Residences in Ahmedabad",
    eyebrow: "Venus Universe · Nehrunagar",
    intro:
      "The Universe by Venus is a landmark 10-block address with premium 4 BHK residences on 7 acres in central Ahmedabad. Architecture is by Hafeez Contractor, principal landscape design by SWA Group and interiors by Hirsch Bedner Associates.",
    keywords:
      "The Universe by Venus, Venus Universe Nehrunagar, Venus Nehrunagar, Venus luxury apartments Nehrunagar, Venus 4 BHK Nehrunagar",
    breadcrumbLabel: "Venus Universe Nehrunagar",
    faq: [
      { q: "What is The Universe by Venus?", a: "The Universe by Venus is a 7-acre, 10-block residential development with premium 4 BHK residences in Nehrunagar, Ahmedabad." },
      { q: "Who is the architect of The Universe by Venus?", a: "Architecture is by Hafeez Contractor, with principal landscape design by SWA Group and interiors by Hirsch Bedner Associates." },
      { q: "How to book at Venus Universe Nehrunagar?", a: "Submit the refundable ₹5,00,000 token to lock priority allotment and pre-launch pricing." },
    ],
  },
  "luxury-apartments-cg-road-ahmedabad": {
    slug: "luxury-apartments-cg-road-ahmedabad",
    title: "Luxury Apartments near CG Road Ahmedabad | Venus Universe",
    description:
      "Premium 4 BHK residences near CG Road, Ahmedabad at The Universe by Venus, with block-specific brochure plans and Hafeez Contractor architecture.",
    h1: "Luxury Apartments near CG Road, Ahmedabad — Venus Universe",
    eyebrow: "CG Road · Ahmedabad",
    intro:
      "Explore premium 4 BHK residences near CG Road at The Universe by Venus in Nehrunagar. The 10-block development combines a central Ahmedabad address with architecture by Hafeez Contractor and brochure-backed unit plans.",
    keywords:
      "luxury apartments CG Road Ahmedabad, flats near CG Road, 4 BHK near CG Road Ahmedabad, premium apartments CG Road, The Universe by Venus CG Road",
    breadcrumbLabel: "Apartments near CG Road",
    faq: [
      { q: "How close is Venus Universe to CG Road?", a: "Venus Universe Nehrunagar is a short drive from CG Road — one of central Ahmedabad's most premium commercial and lifestyle stretches." },
      { q: "Are there new premium flats near CG Road?", a: "The Universe by Venus is under construction with pre-booking open for premium 4 BHK residences near CG Road." },
      { q: "Why buy an apartment near CG Road?", a: "CG Road is central Ahmedabad's premier corridor with best-in-city retail, F&B, hospitals and offices — new luxury inventory here is rare." },
    ],
  },
  "luxury-apartments-ashram-road-ahmedabad": {
    slug: "luxury-apartments-ashram-road-ahmedabad",
    title: "Luxury Apartments near Ashram Road Ahmedabad | Venus Universe",
    description:
      "Premium 4 BHK residences near Ashram Road, Ahmedabad at The Universe by Venus. Central location and brochure-listed multi-level amenities.",
    h1: "Luxury Apartments near Ashram Road, Ahmedabad — Venus Universe",
    eyebrow: "Ashram Road · Ahmedabad",
    intro:
      "The Universe by Venus offers premium 4 BHK residences in Nehrunagar, with access to Ashram Road, Ellisbridge and the Sabarmati Riverfront. It is a 7-acre, 10-block landmark in central Ahmedabad.",
    keywords:
      "luxury apartments Ashram Road Ahmedabad, flats near Ashram Road, 4 BHK Ashram Road, premium homes Ellisbridge, Venus Universe Ashram Road",
    breadcrumbLabel: "Apartments near Ashram Road",
    faq: [
      { q: "How far is Ashram Road from Venus Universe?", a: "Ashram Road is minutes away — Venus Universe Nehrunagar sits in the same central corridor." },
      { q: "Are there luxury flats for sale near Ashram Road?", a: "The Universe by Venus offers pre-booking on premium 4 BHK residences near Ashram Road." },
      { q: "Is Ellisbridge / Ashram Road good to invest?", a: "It is one of Ahmedabad's most established premium corridors with strong appreciation and rare new-build supply." },
    ],
  },
  "flats-near-iim-ahmedabad": {
    slug: "flats-near-iim-ahmedabad",
    title: "Luxury Flats near IIM Ahmedabad | Venus Universe Nehrunagar",
    description:
      "Premium 4 BHK flats near IIM Ahmedabad at The Universe by Venus, with a central Nehrunagar address and Hafeez Contractor architecture.",
    h1: "Luxury Flats near IIM Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Near IIM-A · Ahmedabad",
    intro:
      "The Universe by Venus offers premium 4 BHK residences near IIM Ahmedabad, CEPT University, Ahmedabad University and leading hospitals, across a 7-acre development in Nehrunagar.",
    keywords:
      "flats near IIM Ahmedabad, apartments near IIM-A, luxury homes near CEPT Ahmedabad, homes near Ahmedabad University, 4 BHK near IIM Ahmedabad",
    breadcrumbLabel: "Flats near IIM Ahmedabad",
    faq: [
      { q: "Are there luxury flats for sale near IIM Ahmedabad?", a: "The Universe by Venus offers premium 4 BHK residences in Nehrunagar, within convenient reach of IIM-A." },
      { q: "What educational institutions are near Venus Universe?", a: "IIM Ahmedabad, CEPT University and Ahmedabad University are all in the neighbourhood." },
      { q: "Are hospitals close by?", a: "Shalby, Sterling and other leading hospitals are within a short drive of Venus Universe Nehrunagar." },
    ],
  },
  "hafeez-contractor-project-ahmedabad": {
    slug: "hafeez-contractor-project-ahmedabad",
    title: "Hafeez Contractor Project in Ahmedabad | Venus Universe",
    description:
      "The Universe by Venus is a Hafeez Contractor-designed premium 4 BHK project in Ahmedabad, with SWA landscape and HBA interiors.",
    h1: "Hafeez Contractor Designed Luxury Project in Ahmedabad — Venus Universe",
    eyebrow: "Hafeez Contractor · Ahmedabad",
    intro:
      "The Universe by Venus is a Hafeez Contractor-designed residential project in central Ahmedabad. Principal landscape design is by SWA Group, interiors by HBA and lighting by LET Design, Dubai.",
    keywords:
      "Hafeez Contractor project Ahmedabad, Hafeez Contractor Nehrunagar, designer apartments Ahmedabad, architect luxury apartments Ahmedabad, SWA landscape Ahmedabad, HBA interiors Ahmedabad",
    breadcrumbLabel: "Hafeez Contractor Project",
    faq: [
      { q: "Which Hafeez Contractor project is in Ahmedabad?", a: "Venus Universe Nehrunagar is designed by Hafeez Contractor — a 7-acre ultra-luxury landmark in central Ahmedabad." },
      { q: "Who designed the landscape and interiors?", a: "Principal landscape design is by SWA Group, interiors by Hirsch Bedner Associates and lighting by LET Design, Dubai." },
      { q: "How can I book a Hafeez Contractor apartment in Ahmedabad?", a: "Submit the refundable ₹5,00,000 token at Venus Universe to lock priority allotment." },
    ],
  },
  "gated-community-ahmedabad": {
    slug: "gated-community-ahmedabad",
    title: "Luxury Gated Community in Ahmedabad | Venus Universe",
    description:
      "The Universe by Venus is a 7-acre, 10-block gated community in central Ahmedabad with premium 4 BHK residences and multi-level amenities.",
    h1: "Luxury Gated Community in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Gated Community · Ahmedabad",
    intro:
      "The Universe by Venus is a premium gated community in central Ahmedabad with 10 residential blocks, premium 4 BHK residences and brochure-listed podium, covered and outdoor amenities.",
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
      "Premium 4 BHK residences at The Universe by Venus in Nehrunagar, with Hafeez Contractor architecture and brochure-backed block plans.",
    h1: "Ultra Luxury Apartments in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Ultra Luxury · Ahmedabad",
    intro:
      "The Universe by Venus offers premium 4 BHK residences on a 7-acre plot in Nehrunagar, designed by Hafeez Contractor with internationally credited interiors, landscape and lighting teams. Larger formats are subject to official availability.",
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
      "Compare The Universe by Venus: a 7-acre, 10-block premium 4 BHK project in Nehrunagar with Hafeez Contractor architecture and multi-level amenities.",
    h1: "Best Luxury Project in Ahmedabad — Venus Universe Nehrunagar",
    eyebrow: "Best Luxury Project · Ahmedabad",
    intro:
      "When comparing luxury projects in Ahmedabad, assess location, approved plans, RERA carpet area, design team and amenities. The Universe by Venus combines a 7-acre Nehrunagar address, 10 blocks, premium 4 BHK plans and a brochure-credited consultant roster.",
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
      "Buy a premium 4 BHK in Nehrunagar at The Universe by Venus. Brochure-listed RERA carpet areas range from approximately 1,546 to 2,459 sq ft.",
    h1: "Luxury 4 BHK in Nehrunagar, Ahmedabad — Venus Universe",
    eyebrow: "4 BHK · Nehrunagar",
    intro:
      "Explore premium 4 BHK residences at The Universe by Venus in Nehrunagar. The approved brochure documents block-specific RERA carpet areas from approximately 1,546 to 2,459 sq ft across Blocks A–J.",
    keywords:
      "4 BHK Nehrunagar Ahmedabad, 4 BHK Nehru Nagar Ahmedabad, 4 BHK in Nehrunagar, buy 4 BHK Nehru Nagar, luxury 4 BHK Nehrunagar",
    breadcrumbLabel: "4 BHK Nehrunagar",
    faq: [
      { q: "What is the price of 4 BHK in Nehrunagar Ahmedabad?", a: "Venus Universe is at pre-launch pricing — talk to sales for the current 4 BHK price band." },
      { q: "How big are the 4 BHK apartments?", a: "Brochure-listed RERA carpet areas range from approximately 1,546 to 2,459 sq ft depending on block and plan." },
      { q: "Is Nehrunagar central Ahmedabad?", a: "Yes — Nehrunagar is one of the most central premium addresses in Ahmedabad, minutes from CG Road, Ashram Road and IIM-A." },
    ],
  },
  "luxury-apartments-central-ahmedabad": {
    slug: "luxury-apartments-central-ahmedabad",
    title: "Luxury Apartments in Central Ahmedabad | Venus",
    description: "Explore premium 4 BHK apartments in central Ahmedabad at The Universe by Venus, a 7-acre, 10-block community in Nehrunagar.",
    h1: "Luxury Apartments in Central Ahmedabad",
    eyebrow: "Central Ahmedabad · Premium 4 BHK",
    intro: "The Universe by Venus brings premium 4 BHK living to Nehrunagar in central Ahmedabad. The 7-acre community comprises 10 residential blocks, with brochure-listed RERA carpet areas from approximately 1,546 to 2,459 sq ft and access to established city corridors.",
    keywords: "luxury apartments central Ahmedabad, premium flats central Ahmedabad, luxury flats Nehrunagar, 4 BHK central Ahmedabad, apartments near CG Road Ahmedabad",
    breadcrumbLabel: "Luxury Apartments Central Ahmedabad",
    faq: [
      { q: "Where are these luxury apartments in central Ahmedabad?", a: "The Universe by Venus is located in Nehrunagar, with access to CG Road, Ashram Road, Paldi and IIM Ahmedabad." },
      { q: "Which homes are confirmed at the project?", a: "The approved brochure presents premium 4 BHK residences across Blocks A–J. Current inventory and larger-format availability should be confirmed with the sales team." },
      { q: "What are the brochure-listed carpet areas?", a: "The brochure lists block-specific RERA carpet areas from approximately 1,546 to 2,459 sq ft." },
    ],
  },
  "large-carpet-area-flats-ahmedabad": {
    slug: "large-carpet-area-flats-ahmedabad",
    title: "Large Carpet Area 4 BHK Flats Ahmedabad | Venus",
    description: "Compare large-carpet-area 4 BHK flats at The Universe by Venus, with brochure-listed RERA carpet areas from about 1,546 to 2,459 sq ft.",
    h1: "Large Carpet Area 4 BHK Flats in Ahmedabad",
    eyebrow: "Verified Space · RERA Carpet Area",
    intro: "Buyers comparing large 4 BHK flats can use the approved brochure to assess actual RERA carpet area by block. At The Universe by Venus, the documented range is approximately 1,546 to 2,459 sq ft, with balcony, wash and other areas shown separately in the relevant plans.",
    keywords: "large carpet area flats Ahmedabad, spacious 4 BHK Ahmedabad, big 4 BHK flats Ahmedabad, 2000 sq ft carpet apartment Ahmedabad, premium large apartments Ahmedabad",
    breadcrumbLabel: "Large Carpet Area Flats Ahmedabad",
    faq: [
      { q: "What does RERA carpet area mean when comparing flats?", a: "RERA carpet area is the net usable floor area defined under applicable real-estate regulation. Buyers should compare the area stated in the registered plan and agreement rather than relying only on a saleable-area headline." },
      { q: "How large are the 4 BHK homes at The Universe by Venus?", a: "The brochure lists RERA carpet areas from approximately 1,546 to 2,459 sq ft, depending on the block and plan." },
      { q: "Are balcony and wash areas included in the stated carpet range?", a: "The brochure presents relevant balcony, wash and other plan areas separately. Request the plan for the specific unit under consideration." },
    ],
  },
  "new-luxury-project-ahmedabad": {
    slug: "new-luxury-project-ahmedabad",
    title: "New Luxury Project in Ahmedabad | Universe by Venus",
    description: "Discover The Universe by Venus, a new 7-acre premium 4 BHK residential project across 10 blocks in Nehrunagar, Ahmedabad.",
    h1: "A New Luxury Residential Project in Ahmedabad",
    eyebrow: "New Project · Nehrunagar",
    intro: "The Universe by Venus is a new premium residential development in Nehrunagar, Ahmedabad. Ten blocks are planned around landscaped amenity areas, with brochure-confirmed 4 BHK residences and a consultant team led by Hafeez Contractor, SWA Group and Hirsch Bedner Associates.",
    keywords: "new luxury project Ahmedabad, new residential project Ahmedabad, upcoming luxury apartments Ahmedabad, new 4 BHK project Ahmedabad, luxury launch Nehrunagar",
    breadcrumbLabel: "New Luxury Project Ahmedabad",
    faq: [
      { q: "What is the new luxury project in Nehrunagar?", a: "The Universe by Venus is a 7-acre, 10-block premium residential project in Nehrunagar with brochure-confirmed 4 BHK plans." },
      { q: "Who are the principal designers?", a: "The brochure credits Hafeez Contractor for architecture, SWA Group for principal landscape design and Hirsch Bedner Associates for interiors." },
      { q: "How can buyers review current availability?", a: "Request the latest official inventory, approved unit plan, price sheet and RERA documentation from the project sales team." },
    ],
  },
  "nri-buy-property-ahmedabad": {
    slug: "nri-buy-property-ahmedabad",
    title: "Buy Property in Ahmedabad as an NRI | Venus Guide",
    description: "Explore The Universe by Venus remotely with video walkthroughs and international callbacks. NRI buyers should independently verify FEMA, tax and legal advice.",
    h1: "Buying Premium Property in Ahmedabad as an NRI",
    eyebrow: "NRI & OCI Buyers · Remote Assistance",
    intro: "NRI and OCI buyers can explore The Universe by Venus from abroad through a remote walkthrough, an international callback and coordinated access to project documents. Legal, tax, FEMA, funding, Power of Attorney and repatriation decisions should be reviewed with independent qualified advisers.",
    keywords: "NRI buy property Ahmedabad, buy Ahmedabad flat from abroad, NRI 4 BHK Ahmedabad, OCI property Ahmedabad, remote property buying Ahmedabad",
    breadcrumbLabel: "NRI Buying Property Ahmedabad",
    faq: [
      { q: "Can an NRI explore The Universe by Venus without travelling first?", a: "Yes. Prospective buyers can request a video walkthrough, an international callback and digital access to available project information before planning a visit." },
      { q: "Does the project provide legal or FEMA advice?", a: "Project representatives can coordinate documents, but buyers should obtain independent legal, tax, FEMA and banking advice for their circumstances." },
      { q: "What should an overseas buyer request before deciding?", a: "Request the applicable RERA details, approved unit plan, carpet-area statement, current inventory, price sheet, payment schedule and agreement documents for independent review." },
    ],
  },
  "luxury-apartments-shivranjani-ahmedabad": {
    slug: "luxury-apartments-shivranjani-ahmedabad",
    title: "Luxury Apartments near Shivranjani Ahmedabad | Venus",
    description: "Explore premium 4 BHK apartments near the Shivranjani corridor at The Universe by Venus in Nehrunagar, central Ahmedabad.",
    h1: "Luxury 4 BHK Apartments near Shivranjani, Ahmedabad",
    eyebrow: "Shivranjani · Central Ahmedabad",
    intro: "The Universe by Venus offers premium 4 BHK residences in Nehrunagar, within the wider central Ahmedabad corridor that includes Shivranjani. Buyers can compare brochure-listed RERA carpet areas from approximately 1,546 to 2,459 sq ft across Blocks A–J.",
    keywords: "luxury apartments Shivranjani Ahmedabad, 4 BHK near Shivranjani, premium flats Shivranjani, apartments Nehru Nagar Ahmedabad, Venus Universe Shivranjani",
    breadcrumbLabel: "Apartments near Shivranjani",
    faq: [
      { q: "Where is The Universe by Venus relative to Shivranjani?", a: "The project is located in Nehrunagar within central Ahmedabad and is accessible from the Shivranjani corridor. Buyers should verify their preferred route and travel time during a site visit." },
      { q: "What configuration is confirmed near Shivranjani?", a: "The approved project brochure confirms premium 4 BHK residences across Blocks A–J." },
      { q: "What carpet areas are available?", a: "The brochure lists block-specific RERA carpet areas from approximately 1,546 to 2,459 sq ft. Current unit availability should be confirmed with sales." },
    ],
  },
  "rera-registered-project-ahmedabad": {
    slug: "rera-registered-project-ahmedabad",
    title: "RERA Registered 4 BHK Project Ahmedabad | Venus",
    description: "Review brochure-listed RERA details and carpet areas for The Universe by Venus, a premium 4 BHK project in Nehrunagar, Ahmedabad.",
    h1: "RERA Information for The Universe by Venus, Ahmedabad",
    eyebrow: "Buyer Diligence · Project Documents",
    intro: "Buyers researching a RERA-registered project in Ahmedabad should verify the registration record, promoter details, approved plans, carpet area, completion timeline and unit documents through official sources. The supplied project brochure lists registration number MAA17082/080726/311232 for The Universe by Venus.",
    keywords: "RERA registered project Ahmedabad, RERA approved 4 BHK Ahmedabad, Venus Universe RERA, RERA carpet area Ahmedabad, Nehrunagar RERA project",
    breadcrumbLabel: "RERA Project Ahmedabad",
    faq: [
      { q: "What RERA number is listed for The Universe by Venus?", a: "The supplied project brochure lists RERA registration number MAA17082/080726/311232. Buyers should independently confirm the current record on the official Gujarat RERA portal." },
      { q: "What should a buyer verify in the RERA record?", a: "Review the promoter, registered project details, approved plans, declared timeline, encumbrance information and updates relevant to the selected unit." },
      { q: "Does RERA carpet area differ from saleable area?", a: "Yes. Buyers should use the applicable RERA carpet-area definition and compare it with separately stated balcony, wash, utility and other areas in the unit documents." },
    ],
  },
};

const RETIRED_LANDING_SLUGS = new Set(["luxury-5bhk-ahmedabad", "5bhk-nehrunagar-ahmedabad"]);
export const LANDING_SLUGS = Object.keys(LANDING_PAGES).filter((slug) => !RETIRED_LANDING_SLUGS.has(slug));

/** Unique long-form body copy per landing page — reduces duplicate content and
 *  gives each programmatic page its own indexable, intent-specific prose. */
export const LANDING_BODIES: Record<string, string[]> = {
  "venus-universe-ahmedabad": [
    "The Universe by Venus brings a globally benchmarked design team to central Ahmedabad. Planned as a 10-block community in Nehrunagar, it combines architecture by Hafeez Contractor, principal landscape design by SWA Group and interiors by HBA.",
    "Homes are arranged around a green amenity podium, with grade-level retail and a resort-scale club at the heart of the scheme. For buyers upgrading within the city or returning from abroad, it is a rare opportunity to own brand-new construction of this calibre in an address that is otherwise entirely built out.",
  ],
  "luxury-4bhk-ahmedabad": [
    "A luxury 4 BHK in Ahmedabad should offer more than four bedrooms. At The Universe by Venus, the brochure lists block-specific RERA carpet areas from approximately 1,546 to 2,459 sq ft, with utility, balcony and wash areas documented separately.",
    "Set in central Nehrunagar and delivered by a world-class design team, these homes are minutes from CG Road, Ashram Road and IIM-A. For families seeking a genuinely large, well-planned 4 BHK in the heart of the city, the mix of location, layout and pedigree is hard to match.",
  ],
  "penthouse-ahmedabad": [
    "Penthouse and duplex formats can provide additional privacy, zoning or outdoor space, but their availability at The Universe by Venus must be confirmed against current approved inventory.",
    "The supplied brochure primarily documents premium 4 BHK plans across Blocks A–J. Request the latest approved plan and price sheet before relying on any larger-format configuration.",
  ],
  "property-in-nehrunagar-ahmedabad": [
    "New property in Nehrunagar is scarce by nature — the neighbourhood is one of central Ahmedabad's most established addresses, and large parcels for a landmark community almost never come free. Venus Universe is the exception: a ten-tower gated development on a prime plot with a green podium and grade-level retail.",
    "For buyers who want to stay central — close to CG Road, Ashram Road, Paldi and IIM-A — rather than move to the periphery, it is a rare chance to buy new. Pre-booking is open with a fully refundable Expression of Interest.",
  ],
  "nri-investment-ahmedabad": [
    "For NRIs, Ahmedabad combines a fast-growing economy with the reassurance of a home city, and Venus Universe is built for exactly this buyer. A central, appreciating Nehrunagar address, a globally recognised design team and RERA registration (No. MAA17082/080726/311232) make diligence from abroad straightforward.",
    "The sales team supports the full journey remotely — video walkthroughs, digital documentation and registration by Power of Attorney — while a fully refundable Expression of Interest lets you secure priority and pricing before you travel.",
  ],
  "venus-universe-nehrunagar": [
    "The Universe by Venus is a new address in one of Ahmedabad's established micro-markets. Ten blocks are arranged around landscaped amenity areas, with brochure-listed 4 BHK RERA carpet areas from approximately 1,546 to 2,459 sq ft.",
    "Architecture is by Hafeez Contractor, principal landscape design by SWA Group, interiors by Hirsch Bedner Associates and lighting by LET Design, Dubai.",
  ],
  "luxury-apartments-cg-road-ahmedabad": [
    "Very little new luxury inventory comes up this close to CG Road — the corridor is central Ahmedabad's most established commercial and lifestyle stretch, and it is largely built out. Venus Universe, in adjacent Nehrunagar, is one of the few new gated communities within an easy drive.",
    "Residents are minutes from CG Road's retail, dining and offices, as well as Ashram Road and Law Garden, while returning home to a green podium, a resort-scale club and residences designed by Hafeez Contractor.",
  ],
  "luxury-apartments-ashram-road-ahmedabad": [
    "The Ashram Road and Ellisbridge belt is one of Ahmedabad's most enduring premium corridors, anchored by the Sabarmati Riverfront and decades of civic and commercial life. New luxury supply here is rare — Venus Universe in nearby Nehrunagar is among the few landmark launches within minutes.",
    "The development pairs that central connectivity with a landscaped podium, multi-level wellness amenities and premium 4 BHK residences by a globally credited design team.",
  ],
  "flats-near-iim-ahmedabad": [
    "The IIM-A neighbourhood is one of Ahmedabad's most desirable and academically anchored pockets, close to CEPT, Ahmedabad University and NID. Homes of real scale near here are hard to find — Venus Universe in Nehrunagar sits a short drive away.",
    "For faculty, professionals and families who value proximity to institutions and hospitals, it offers premium 4 BHK residences, landscaped amenity areas and pre-booking through a refundable EOI.",
  ],
  "hafeez-contractor-project-ahmedabad": [
    "The Universe by Venus credits Hafeez Contractor for architecture across its 10 blocks. The brochure also credits SWA Group for principal landscape design, Hirsch Bedner Associates for interiors and LET Design, Dubai for lighting.",
    "That level of global collaboration is unusual for a single Ahmedabad address, and it shows in the details — from the podium gardens to the double-height arrival lobbies. For buyers who value architecture, it is a rare chance to own a home by this calibre of team in central Nehrunagar.",
  ],
  "gated-community-ahmedabad": [
    "As a gated community, Venus Universe is planned for security, calm and everyday convenience across its ten towers. A single controlled address brings together a landscaped podium, a two-level wellness club, a swimming pool, sports courts, children's zones and grade-level retail.",
    "Circulation separates vehicles from the green podium, and amenities run from box cricket and pickleball to a garden theatre, café and co-working spaces — a self-contained way of life in the middle of Ahmedabad rather than on its edge.",
  ],
  "ultra-luxury-apartments-ahmedabad": [
    "Luxury is defined by verified space, planning and design quality. The Universe by Venus offers brochure-backed premium 4 BHK plans across a 10-block landmark with landscaped amenity areas in central Nehrunagar.",
    "With architecture by Hafeez Contractor, interiors by HBA and lighting by LET Dubai, the specification is globally benchmarked. For HNI families, business owners and NRIs, it is one of the few genuinely ultra-luxury addresses in the heart of Ahmedabad.",
  ],
  "best-luxury-project-ahmedabad": [
    "Comparing the best luxury projects in Ahmedabad usually comes down to a few things: location, plot scale, the design team and open space. Venus Universe leads on each — a rare landmark plot in central Nehrunagar, ten towers around a green podium, and a design roster led by Hafeez Contractor.",
    "Add SWA landscape, HBA interiors, LET lighting and brochure-backed 4 BHK plans, and buyers have a clear set of facts to compare against other Ahmedabad projects.",
  ],
  "4bhk-nehrunagar-ahmedabad": [
    "A 4 BHK in Nehrunagar puts you at the centre of Ahmedabad without stepping down in space. At Venus Universe, 4 BHK homes start around 1,546 sq ft of RERA carpet area and scale up with servant rooms, utilities and wide podium-facing balconies.",
    "The location is the point: minutes from CG Road, Ashram Road, Paldi and IIM-A, in a gated community with a resort-scale amenity deck. For families who refuse to trade centrality for size, it is a rare fit — and pre-booking is open on a refundable EOI.",
  ],
  "luxury-apartments-central-ahmedabad": [
    "Central Ahmedabad buyers often have to choose between an established location and a newly planned community. The Universe by Venus addresses that search from Nehrunagar with ten residential blocks arranged around landscaped amenity areas on a 7-acre site.",
    "Its approved brochure documents premium 4 BHK plans across Blocks A–J. The design team combines architecture by Hafeez Contractor, principal landscape design by SWA Group and interiors by Hirsch Bedner Associates.",
  ],
  "large-carpet-area-flats-ahmedabad": [
    "A meaningful size comparison starts with RERA carpet area, not a broad saleable-area number. The Universe by Venus brochure provides block-specific carpet figures, allowing buyers to compare approximately 1,546 to 2,459 sq ft across the documented 4 BHK plans.",
    "Buyers should request the exact plan linked to the unit being offered and review carpet, balcony, wash, utility and other stated areas separately before making a booking decision.",
  ],
  "new-luxury-project-ahmedabad": [
    "For buyers researching new luxury projects in Ahmedabad, verified project fundamentals matter: location, approved configuration, actual carpet area, design team and supporting documents. The Universe by Venus presents these through a brochure-backed 10-block plan in Nehrunagar.",
    "Its confirmed residential offering is premium 4 BHK, while any jodi, duplex, penthouse or other larger format must be checked against current official availability and approved plans.",
  ],
  "nri-buy-property-ahmedabad": [
    "A remote property decision should follow the same diligence as an in-person purchase. Overseas buyers can begin with the project brochure and a video walkthrough, then request the exact unit plan, RERA carpet statement, payment schedule and draft documents for professional review.",
    "The project team can arrange an international callback and document coordination. Buyers remain responsible for obtaining independent advice on FEMA eligibility, taxation, funding routes, Power of Attorney, registration and any future repatriation of funds.",
  ],
  "luxury-apartments-shivranjani-ahmedabad": [
    "Shivranjani and Nehrunagar form part of an established central Ahmedabad residential and commercial belt. The Universe by Venus gives buyers searching this corridor a brochure-documented 4 BHK option in a 7-acre, 10-block community.",
    "Rather than relying on a generic proximity claim, buyers should review the project location, preferred commuting route and actual travel time during their site visit.",
  ],
  "rera-registered-project-ahmedabad": [
    "RERA-led research is a diligence step, not just a keyword. Prospective buyers should match the project name and registration number with the official authority record, then examine plans, carpet-area disclosures, promoter information and filed updates.",
    "The Universe by Venus brochure lists block-specific 4 BHK RERA carpet areas from approximately 1,546 to 2,459 sq ft. The exact unit documents and current official record should govern every purchase decision.",
  ],
};

export function landingUrl(slug: string): string {
  return `${BASE}/${slug}`;
}

const OG_IMAGE = new URL(heroTower, BASE).href;

export function buildLandingHead(slug: string) {
  const c = LANDING_PAGES[slug];
  if (!c) return { meta: [], links: [], scripts: [] };
  const url = landingUrl(slug);

  const meta: Array<Record<string, string>> = [
    { title: c.title },
    { name: "description", content: c.description },
    { name: "keywords", content: c.keywords },
    { name: "author", content: "Venus" },
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
    { property: "og:site_name", content: "The Universe by Venus" },
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
    numberOfRooms: "4 BHK",
    amenityFeature: [
      "Clubhouse", "Gym", "Swimming Pool", "Landscaped Gardens",
      "24x7 Security", "Multi-level Parking", "Sky Lounge", "Concierge",
    ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://venusuniverse.in/#organization",
    name: "Venus",
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
