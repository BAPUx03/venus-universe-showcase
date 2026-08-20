/**
 * Insights (blog) hub — top-of-funnel, topical-authority content.
 * Each post targets informational / commercial-investigation intent that the
 * marketing + landing pages don't, and lifts the whole domain. Rendered by
 * src/routes/insights/index.tsx (hub) and src/routes/insights/$slug.tsx (post).
 */

import heroTower from "@/assets/hero-tower.webp";

export interface InsightBlock {
  type: "h2" | "p" | "ul";
  text?: string;
  items?: string[];
}

export interface InsightPost {
  slug: string;
  title: string; // <= 60 chars, SEO title
  h1: string;
  description: string; // <= 160 chars, meta description
  keywords: string;
  category: string;
  date: string; // ISO published date
  updated?: string; // ISO
  readMins: number;
  excerpt: string;
  body: InsightBlock[];
  faq?: Array<{ q: string; a: string }>;
}

const BASE = "https://venusuniverse.in";
const OG_IMAGE = new URL(heroTower, BASE).href;

export const INSIGHTS: Record<string, InsightPost> = {
  "is-nehrunagar-good-investment-ahmedabad": {
    slug: "is-nehrunagar-good-investment-ahmedabad",
    title: "Is Nehrunagar a Good Area to Invest in Ahmedabad?",
    h1: "Is Nehrunagar a Good Area to Invest in Ahmedabad?",
    description:
      "A clear look at why Nehrunagar is one of central Ahmedabad's most sought-after addresses for luxury home buyers and investors in 2026.",
    keywords:
      "Nehrunagar investment, is Nehrunagar good to invest, property investment Ahmedabad, best area to buy home Ahmedabad, Nehrunagar real estate",
    category: "Location Guide",
    date: "2026-07-01",
    readMins: 6,
    excerpt:
      "Central location, mature social infrastructure and scarce new-build supply make Nehrunagar one of the most resilient addresses in Ahmedabad. Here's what buyers should weigh.",
    body: [
      { type: "p", text: "Nehrunagar sits at the heart of west-central Ahmedabad — a mature, high-demand micro-market that has held its value through every cycle. For buyers comparing neighbourhoods, the question is rarely whether Nehrunagar is desirable, but whether new luxury inventory is even available here. It rarely is, which is a large part of the investment case." },
      { type: "h2", text: "Why location still decides value" },
      { type: "p", text: "In a spread-out city, minutes matter. Nehrunagar is within a short drive of the CG Road and Ashram Road commercial corridors, Paldi, Ellisbridge and the Sabarmati Riverfront, and it is genuinely close to the institutions that anchor demand — IIM Ahmedabad, CEPT University, Ahmedabad University and the National Institute of Design. That proximity supports both end-user demand and rental depth." },
      { type: "h2", text: "Mature social infrastructure" },
      { type: "p", text: "Unlike newer peripheral corridors, Nehrunagar is already surrounded by the amenities families actually use day to day:" },
      { type: "ul", items: ["Leading hospitals such as Shalby, Sterling and CIMS within minutes", "Established schools and universities in the immediate catchment", "The city's most recognised retail, dining and hospitality on CG Road and S.G. Highway", "Fast connections to the airport, railway station and the wider ring-road network"] },
      { type: "h2", text: "The scarcity that drives premiums" },
      { type: "p", text: "Central Ahmedabad is largely built out. Large, contiguous land parcels suitable for a landmark gated community almost never come to market here, so genuinely new ultra-luxury supply is thin. When it does arrive, it tends to set the benchmark for the micro-market rather than compete on price — which is what supports long-term appreciation for early buyers." },
      { type: "h2", text: "Who Nehrunagar suits" },
      { type: "p", text: "End-users upgrading within west Ahmedabad, business owners and professionals who value a central base, and NRIs seeking a low-maintenance, appreciating asset in a proven location all gravitate here. For each, the appeal is the same: a central address that is unlikely to be replicated." },
      { type: "h2", text: "Where Venus Universe fits" },
      { type: "p", text: "The Universe by Venus is a 10-block development in Nehrunagar with brochure-confirmed 4 BHK plans, architecture by Hafeez Contractor, principal landscape design by SWA Group and interiors by HBA. Larger formats must be confirmed against current official availability." },
    ],
    faq: [
      { q: "Is Nehrunagar a good area to invest in Ahmedabad?", a: "Yes — Nehrunagar is one of central Ahmedabad's most established premium micro-markets, close to CG Road, Ashram Road and IIM-A, with very limited new luxury supply, which supports long-term value." },
      { q: "What new luxury projects are launching in Nehrunagar?", a: "The Universe by Venus is a 10-block gated community with brochure-confirmed premium 4 BHK plans and pre-booking open." },
    ],
  },

  "4-bhk-jodi-duplex-penthouse-ahmedabad": {
    slug: "4-bhk-jodi-duplex-penthouse-ahmedabad",
    title: "4 BHK, Jodi, Duplex or Penthouse: Which to Choose?",
    h1: "4 BHK, Jodi, Duplex or Penthouse: Choosing Your Home",
    description:
      "Understand the difference between 4 BHK, jodi, duplex and penthouse residences in Ahmedabad — carpet areas, layouts and who each suits.",
    keywords:
      "4 BHK vs 5 BHK Ahmedabad, jodi apartment meaning, duplex vs penthouse, large apartments Ahmedabad, luxury home configuration",
    category: "Buyer Guide",
    date: "2026-07-05",
    readMins: 7,
    excerpt:
      "Large-format luxury homes come in several forms. Here's how 4 BHK, jodi, duplex and penthouse layouts differ — and how to match one to how you actually live.",
    body: [
      { type: "p", text: "Once you move into the large-format luxury segment, \"4 BHK\" is only the starting point. Jodi, duplex and penthouse configurations open up more space and more distinctive living — but they suit different households. Here is a plain-language guide, with the carpet ranges you can expect at a project like Venus Universe." },
      { type: "h2", text: "The 4 BHK" },
      { type: "p", text: "The core of most premium projects. At Venus Universe, 4 BHK residences span roughly 1,546 to 2,083 sq ft of RERA carpet area across the towers, with the larger layouts adding a servant room, utility, powder room and wide balconies. A 4 BHK suits families who want four genuine bedrooms plus space to work and host, without stepping into duplex territory." },
      { type: "h2", text: "The jodi apartment" },
      { type: "p", text: "A \"jodi\" is two adjacent apartments combined into one larger home on a single level. It is the answer for multi-generational families or buyers who want the footprint of a bungalow with the security and convenience of an apartment. Because it is planned as a single residence, circulation and privacy are far better than simply owning two flats side by side." },
      { type: "h2", text: "The duplex" },
      { type: "p", text: "A duplex spans two connected floors, typically with living, dining and kitchen below and private bedrooms above. The vertical separation gives clear zoning between social and private life, and the internal staircase becomes an architectural feature. Duplexes suit buyers who love the feel of a villa but want it in the sky." },
      { type: "h2", text: "The penthouse" },
      { type: "p", text: "Penthouses are generally top-floor residences and may include additional privacy or outdoor space. At The Universe by Venus, any penthouse or duplex availability must be confirmed against the current approved inventory; the supplied brochure primarily documents 4 BHK plans." },
      { type: "h2", text: "How to choose" },
      { type: "ul", items: ["Count real bedrooms you'll use, then add one for a study or guest room", "Decide if you want everything on one level (4 BHK / jodi) or zoned across floors (duplex / penthouse)", "Factor in staff and utility needs — larger units add servant rooms and multiple washes", "Always read the RERA carpet area, not the marketing \"super built-up\" figure"] },
      { type: "h2", text: "See the layouts in person" },
      { type: "p", text: "Floor plans only tell part of the story. Venus Universe's sales gallery in Nehrunagar lets you walk the layouts and compare configurations side by side. Pre-booking is open with a fully refundable Expression of Interest." },
    ],
    faq: [
      { q: "What is a jodi apartment?", a: "A jodi apartment is two adjacent flats combined into a single larger home on one level, giving a bungalow-sized footprint with apartment security and convenience." },
      { q: "What is the difference between a duplex and a penthouse?", a: "A duplex is a home spread across two connected floors; a penthouse is a top-floor luxury residence, usually the largest and most private, often with large private decks." },
      { q: "What carpet sizes does The Universe by Venus offer?", a: "The supplied brochure lists 4 BHK RERA carpet areas from approximately 1,546 to 2,459 sq ft, depending on block and plan." },
    ],
  },

  "nri-guide-buying-luxury-property-ahmedabad": {
    slug: "nri-guide-buying-luxury-property-ahmedabad",
    title: "NRI Guide to Buying Luxury Property in Ahmedabad",
    h1: "An NRI's Guide to Buying Luxury Property in Ahmedabad",
    description:
      "A practical guide for NRIs buying luxury property in Ahmedabad — eligibility, documents, payments, RERA protection and remote booking.",
    keywords:
      "NRI buying property Ahmedabad, NRI property investment India, NRI home loan Ahmedabad, FEMA property rules NRI, buy luxury apartment Ahmedabad NRI",
    category: "NRI Guide",
    date: "2026-07-10",
    readMins: 8,
    excerpt:
      "Buying from abroad is more straightforward than most NRIs expect. Here's a practical walk-through of eligibility, paperwork, payments and the protections RERA gives you.",
    body: [
      { type: "p", text: "For non-resident Indians, a home in Ahmedabad is both an emotional anchor and a hard asset in a fast-growing city. The process of buying from abroad is well-established — here is what to know before you begin. (This is general guidance, not legal or tax advice; confirm specifics with your advisor.)" },
      { type: "h2", text: "Can NRIs buy property in India?" },
      { type: "p", text: "Yes. Under FEMA rules, NRIs and OCIs can freely purchase residential and commercial property in India. The main restriction is on agricultural land, plantations and farmhouses, which generally cannot be bought. A luxury apartment or penthouse is entirely within the rules." },
      { type: "h2", text: "The documents you'll need" },
      { type: "ul", items: ["Valid passport and, for OCIs, the OCI card", "PAN card (required for the transaction and for tax)", "Overseas and Indian address proof", "A Power of Attorney if you cannot be present for registration"] },
      { type: "h2", text: "How payments work" },
      { type: "p", text: "Purchases must be routed through banking channels using an NRE, NRO or FCNR account — never foreign currency in cash. Many NRIs fund the purchase from an NRE account for easier repatriation later. Indian banks also offer home loans to NRIs, typically with repayment from NRE/NRO income." },
      { type: "h2", text: "Why RERA matters for you" },
      { type: "p", text: "The Real Estate (Regulation and Development) Act is a significant protection for remote buyers. A RERA-registered project must disclose approvals, timelines and carpet areas, and hold buyer funds accountable. Always confirm the project's RERA registration before booking — Venus Universe is registered under RERA No. MAA17082/080726/311232." },
      { type: "h2", text: "Buying remotely" },
      { type: "p", text: "You do not need to fly in to begin. A serious developer will support the full journey from abroad — video walkthroughs of the sales gallery and show homes, digital documentation, a relationship manager in your time zone, and registration via Power of Attorney. A fully refundable Expression of Interest lets you lock priority and pricing while you complete your diligence." },
      { type: "h2", text: "Repatriation, briefly" },
      { type: "p", text: "Sale proceeds are generally repatriable within FEMA limits, subject to the funds having come through proper channels and applicable taxes being paid. Because the details depend on your residency and how you funded the purchase, plan this with a chartered accountant early." },
      { type: "h2", text: "A central Ahmedabad option" },
      { type: "p", text: "Venus Universe in Nehrunagar is a natural fit for NRI buyers: a central, appreciating address, a globally benchmarked design team, RERA registration, and a sales team that supports remote bookings. Pre-booking is open with a refundable Expression of Interest." },
    ],
    faq: [
      { q: "Can NRIs buy an apartment in Ahmedabad?", a: "Yes. NRIs and OCIs can freely buy residential property such as apartments and penthouses in India under FEMA; only agricultural land, plantations and farmhouses are restricted." },
      { q: "How do NRIs pay for property in India?", a: "Payments must go through banking channels using an NRE, NRO or FCNR account. NRE funding makes later repatriation of sale proceeds simpler." },
      { q: "Can an NRI book Venus Universe from abroad?", a: "Yes. Venus Universe supports remote bookings with video walkthroughs, digital documentation and a fully refundable Expression of Interest; registration can be completed via Power of Attorney." },
    ],
  },

  "stamp-duty-tds-nri-tax-guide-ahmedabad-property": {
    slug: "stamp-duty-tds-nri-tax-guide-ahmedabad-property",
    title: "Stamp Duty, TDS & Tax Guide for Ahmedabad Property (2026)",
    h1: "Stamp Duty, TDS & Tax Guide for Property Buyers in Ahmedabad",
    description: "Essential tax guide for luxury property buyers and NRIs in Ahmedabad — Stamp Duty (4.9%), Section 195 TDS (20%), capital gains, and FEMA rules.",
    keywords: "stamp duty Ahmedabad 2026, TDS rate property purchase NRI India, Section 195 TDS NRI property, property tax Ahmedabad, NRI property tax Gujarat",
    category: "Tax & Legal",
    date: "2026-07-22",
    readMins: 7,
    excerpt: "Navigating stamp duty, registration charges, Section 195 TDS for NRIs, and GST on under-construction property in Gujarat. Here is your complete 2026 tax handbook.",
    body: [
      { type: "p", text: "Purchasing a high-value residence in central Ahmedabad involves specific statutory taxes and compliance requirements. Whether you are a resident buying in Nehrunagar or an NRI investing from abroad, here is a breakdown of stamp duty, TDS, and registration charges in 2026." },
      { type: "h2", text: "1. Stamp Duty & Registration Charges in Gujarat" },
      { type: "p", text: "In Gujarat, stamp duty for residential property transactions is 4.9% of the agreement value (or Jantara rate, whichever is higher). A 1% concession applies for female buyers, bringing stamp duty down to 3.9%. In addition, a 1% registration fee is payable to the Sub-Registrar of Assurances." },
      { type: "h2", text: "2. Section 195 TDS for NRI Sellers & Buyers" },
      { type: "p", text: "When buying property from an NRI, the resident buyer is required to deduct Tax Deducted at Source (TDS) under Section 195 of the Income Tax Act. For long-term capital gains, the base TDS rate is 20% plus applicable surcharge and health/education cess. Buyers must obtain a TAN (Tax Deduction Account Number) and deposit the withheld tax within statutory timelines." },
      { type: "h2", text: "3. GST on Under-Construction Luxury Property" },
      { type: "p", text: "For under-construction residential properties outside the affordable category, GST is levied at an effective rate of 5% without Input Tax Credit (ITC). Completed properties with an issued Occupancy Certificate (OC) are exempt from GST." },
      { type: "h2", text: "4. FEMA Compliance & Repatriation for NRIs" },
      { type: "p", text: "NRIs and OCI cardholders buying residential apartments in Ahmedabad can freely fund transactions via NRE or NRO banking channels. Repatriation of sale proceeds is permitted up to USD 1 million per financial year under RBI guidelines, subject to tax compliance." },
    ],
    faq: [
      { q: "What is the stamp duty on a ₹10 Crore property in Ahmedabad?", a: "Stamp duty in Gujarat is 4.9% (₹49 Lakhs) plus 1% registration fee (₹10 Lakhs). For female sole buyers, a 1% stamp duty concession applies." },
      { q: "What is the TDS rate when buying property from an NRI in India?", a: "TDS under Section 195 is 20% plus applicable surcharge and 4% cess on long-term capital gains, unless a lower deduction certificate is obtained from the Income Tax department." },
      { q: "Is GST applicable on Venus Universe apartments?", a: "As an under-construction luxury residential development, applicable GST is 5% effective rate on unit agreement value." },
    ],
  },

  "4bhk-price-carpet-area-nehrunagar-ahmedabad": {
    slug: "4bhk-price-carpet-area-nehrunagar-ahmedabad",
    title: "4 BHK Price & Carpet Area in Nehrunagar, Ahmedabad",
    h1: "4 BHK Price and Carpet Area in Nehrunagar, Ahmedabad (2026)",
    description:
      "What a luxury 4 BHK in Nehrunagar actually costs in 2026 — carpet area vs super built-up, price bands, and the charges buyers forget to budget for.",
    keywords:
      "4 BHK price Nehrunagar, luxury 4 BHK Nehrunagar Ahmedabad, 4 BHK carpet area Ahmedabad, 4 BHK flat price Ahmedabad, RERA carpet area Nehrunagar",
    category: "Buyer Guide",
    date: "2026-08-18",
    readMins: 7,
    excerpt:
      "Carpet area, price bands and the hidden line items — a practical breakdown of what a luxury 4 BHK in Nehrunagar costs and how to compare two projects fairly.",
    body: [
      { type: "p", text: "Nehrunagar is one of the few central Ahmedabad addresses where a brand-new 4 BHK is even possible, and that scarcity shapes pricing. Before comparing two projects, it helps to separate what you are actually buying — RERA carpet area — from the marketing number most brochures still lead with." },
      { type: "h2", text: "Carpet area is the only number worth comparing" },
      { type: "p", text: "RERA carpet area is the usable floor area within the walls of your apartment, excluding the shaft, balcony and open terrace. Super built-up area adds a share of lobbies, staircases and amenities, and two developers can load it very differently. A 3,400 sq ft super built-up 4 BHK in one project can be smaller in real terms than a 3,100 sq ft one in another." },
      { type: "p", text: "At The Universe by Venus, the approved brochure documents block-specific 4 BHK RERA carpet areas from approximately 1,546 to 2,459 sq ft, with utility, wash and balcony areas stated separately. That separation is what lets you compare plans honestly." },
      { type: "h2", text: "What a luxury 4 BHK in Nehrunagar costs" },
      { type: "p", text: "Pricing in this micro-market is driven by carpet area, block position, floor level and view rather than a single rate card. Broad bands buyers should expect for genuinely premium 4 BHK stock in central Ahmedabad in 2026:" },
      { type: "ul", items: ["Entry premium 4 BHK: around ₹5 Crore to ₹7 Crore", "Larger carpet or better-positioned blocks: about ₹7 Crore to ₹10 Crore", "Top-floor and combined-unit formats: ₹10 Crore and above, subject to availability", "Rate premiums of 3–8% are common for higher floors and unobstructed podium or skyline views"] },
      { type: "p", text: "These are indicative bands for planning, not a quotation. Current pricing at any project must be confirmed on the official price sheet." },
      { type: "h2", text: "Costs buyers forget to budget" },
      { type: "p", text: "The agreement value is not the landed cost. Add stamp duty of 4.9% in Gujarat (3.9% for a female sole buyer), 1% registration, 5% GST on under-construction property, plus car parking, club membership, corpus and maintenance deposits. On a ₹7 Crore home these can add well over ₹75 Lakhs." },
      { type: "h2", text: "A five-point checklist before you pay a token" },
      { type: "ul", items: ["Ask for the RERA carpet-area statement for the exact unit, not the block average", "Compare price per sq ft on carpet area across shortlisted projects", "Read the payment schedule and check what is construction-linked", "Confirm the RERA registration number and approved plan for that block", "Get the full charge sheet — parking, club, corpus, maintenance, GST — in writing"] },
      { type: "h2", text: "Where Venus Universe sits" },
      { type: "p", text: "The Universe by Venus is a ten-block RERA-registered development in Nehrunagar with architecture by Hafeez Contractor, principal landscape design by SWA Group and interiors by HBA. Pre-launch allotment is open against a fully refundable ₹5,00,000 token, and larger formats are subject to official availability." },
    ],
    faq: [
      { q: "What is the price of a 4 BHK in Nehrunagar, Ahmedabad?", a: "Premium new-build 4 BHK homes in Nehrunagar generally fall in the ₹5 Crore to ₹10 Crore band in 2026, depending on carpet area, block, floor and view. Confirm current pricing on the official price sheet." },
      { q: "How much carpet area does a luxury 4 BHK offer?", a: "At The Universe by Venus, brochure-listed 4 BHK RERA carpet areas range from approximately 1,546 to 2,459 sq ft, with utility, wash and balcony areas stated separately." },
      { q: "What is the difference between carpet area and super built-up area?", a: "Carpet area is usable area within your apartment walls as defined by RERA. Super built-up adds a loaded share of common areas, and that loading varies by developer — so always compare carpet area." },
      { q: "What extra charges apply beyond the agreement value?", a: "Budget 4.9% stamp duty, 1% registration, 5% GST on under-construction property, plus parking, club membership, corpus and maintenance deposits." },
    ],
  },

  "4bhk-vs-5bhk-nehrunagar-ahmedabad": {
    slug: "4bhk-vs-5bhk-nehrunagar-ahmedabad",
    title: "4 BHK vs 5 BHK in Nehrunagar: Which Should You Buy?",
    h1: "4 BHK vs 5 BHK in Nehrunagar, Ahmedabad — How to Choose",
    description:
      "Compare a premium 4 BHK against a combined-unit 5 BHK in Nehrunagar — space, cost, resale depth and who each configuration actually suits.",
    keywords:
      "4 BHK vs 5 BHK Ahmedabad, 5 BHK Nehrunagar, jodi flat Ahmedabad, combined unit 5 BHK Nehrunagar, luxury apartment configuration Ahmedabad",
    category: "Buyer Guide",
    date: "2026-08-19",
    readMins: 6,
    excerpt:
      "In central Ahmedabad a 5 BHK is usually two 4 BHK homes merged. Here is how the two options compare on cost, layout, resale and family fit.",
    body: [
      { type: "p", text: "Central Ahmedabad has almost no standing five-bedroom new-build inventory. So the real choice in Nehrunagar is not between two listings — it is between a well-planned premium 4 BHK and a combined-unit or jodi 5 BHK created from two adjacent homes on approved plans." },
      { type: "h2", text: "Space and layout" },
      { type: "p", text: "A premium 4 BHK in this market runs roughly 1,546 to 2,459 sq ft of RERA carpet area — enough for a family of four to five with a study or guest room. A combined 5 BHK starts from about 3,100 sq ft aggregate carpet area and unlocks something a single unit cannot: genuinely separate zones. A private parents' wing, a formal living and dining spine, a family lounge, and utility or staff space that stays out of the main house." },
      { type: "h2", text: "Cost, honestly" },
      { type: "p", text: "A combined unit is not one-and-a-quarter of a 4 BHK — it is close to two. Expect the ₹7 Crore to ₹15 Crore band versus ₹5 Crore to ₹10 Crore for a premium 4 BHK, plus higher stamp duty, GST, parking, club and maintenance on the larger aggregate. Merging work is also planned at design stage, so it must be reflected in the approved plan and agreement rather than done later." },
      { type: "h2", text: "Resale and liquidity" },
      { type: "p", text: "The 4 BHK is the deepest end-user segment in central Ahmedabad, which means a wider buyer pool at resale. Combined 5 BHK homes are rarer and can command a strong premium, but the buyer pool is narrower and sale timelines are typically longer. If liquidity matters more than absolute space, that trade-off should decide it." },
      { type: "h2", text: "Who each one suits" },
      { type: "ul", items: ["Premium 4 BHK: nuclear families, first-time luxury upgraders, NRIs wanting a low-maintenance central base with easy exit", "Combined 5 BHK: multi-generational households, families with live-in help, buyers who entertain formally and want a long-hold trophy home", "Either: buyers who prioritise the Nehrunagar address itself over raw square footage on the periphery"] },
      { type: "h2", text: "Practical steps before you commit" },
      { type: "p", text: "Walk both options on plan. Ask for the specific pairing available in your preferred block, the aggregate RERA carpet-area statement, the structural clearance for merging, and the full charge sheet for both configurations. Availability of jodi and duplex layouts changes with inventory, so confirm it in writing before paying a token." },
      { type: "h2", text: "At The Universe by Venus" },
      { type: "p", text: "Brochure-documented 4 BHK plans run across Blocks A–J in Nehrunagar. Five-bedroom outcomes are offered as jodi, duplex or combined-unit configurations on those approved plans, subject to current official availability. The refundable ₹5,00,000 token locks priority while you finalise the configuration." },
    ],
    faq: [
      { q: "Is a 5 BHK available in Nehrunagar, Ahmedabad?", a: "Standalone five-bedroom new-build stock is effectively unavailable in Nehrunagar. At The Universe by Venus, 5 BHK outcomes are created as jodi, duplex or combined-unit configurations on approved 4 BHK plans, subject to current inventory." },
      { q: "How much more does a 5 BHK cost than a 4 BHK?", a: "Because a 5 BHK here is usually two units merged, expect close to double — roughly the ₹7 Crore to ₹15 Crore band versus ₹5 Crore to ₹10 Crore for a premium 4 BHK, plus proportionally higher duties and charges." },
      { q: "Which resells more easily in Ahmedabad, a 4 BHK or a 5 BHK?", a: "The 4 BHK has the deeper end-user market in central Ahmedabad and typically resells faster. Combined 5 BHK homes can fetch a premium but appeal to a narrower buyer pool." },
      { q: "Can two apartments be merged after possession?", a: "Merging should be planned at design stage where officially permitted, so that the approved plan, structural clearance and agreement all reflect the combined unit before booking." },
    ],
  },
};

export const INSIGHT_SLUGS = Object.keys(INSIGHTS);

export function insightUrl(slug: string): string {
  return `${BASE}/insights/${slug}`;
}

export function buildInsightHead(slug: string) {
  const p = INSIGHTS[slug];
  if (!p) return { meta: [{ title: "Insights — Venus Universe" }], links: [], scripts: [] };
  const url = insightUrl(slug);

  const meta: Array<Record<string, string>> = [
    { title: `${p.title} | Venus Universe Insights` },
    { name: "description", content: p.description },
    { name: "keywords", content: p.keywords },
    { name: "author", content: "Venus Universe" },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    { property: "og:title", content: p.title },
    { property: "og:description", content: p.description },
    { property: "og:url", content: url },
    { property: "og:type", content: "article" },
    { property: "og:site_name", content: "Venus Universe Nehrunagar" },
    { property: "og:image", content: OG_IMAGE },
    { property: "article:published_time", content: p.date },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: p.title },
    { name: "twitter:description", content: p.description },
    { name: "twitter:image", content: OG_IMAGE },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.h1,
    description: p.description,
    image: OG_IMAGE,
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: "Venus Universe", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Venus Universe",
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${BASE}/insights` },
      { "@type": "ListItem", position: 3, name: p.title, item: url },
    ],
  };

  const scripts: Array<Record<string, string>> = [
    { type: "application/ld+json", children: JSON.stringify(articleSchema) },
    { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
  ];

  if (p.faq && p.faq.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }

  return { meta, links: [{ rel: "canonical", href: url }], scripts };
}
