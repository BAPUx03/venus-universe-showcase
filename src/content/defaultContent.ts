import heroTower from "@/assets/hero-tower.webp";
import masterPlan from "@/assets/master-plan.webp";
import g1 from "@/assets/gallery-1.webp";
import g2 from "@/assets/gallery-2.webp";
import g3 from "@/assets/gallery-3.webp";
import g4 from "@/assets/gallery-4.webp";
import g5 from "@/assets/gallery-5.webp";
import g6 from "@/assets/gallery-6.webp";
import g7 from "@/assets/gallery-7.webp";
import g8 from "@/assets/gallery-8.webp";
import g9 from "@/assets/gallery-9.webp";
import g10 from "@/assets/gallery-10.webp";
import g11 from "@/assets/gallery-11.webp";
import g12 from "@/assets/gallery-12.webp";
import showreel from "@/assets/showreel.mp4.asset.json";

/**
 * Default site content. The admin panel (/studio) overrides any of these
 * keys by writing JSON into the `site_content` table. The useSiteContent()
 * hook merges DB values over these defaults.
 */
export const defaultContent = {
  seo: {
    siteUrl: "https://venusuniverse.in",
    title: "Venus Universe | Luxury 4 & 5 BHK in Nehrunagar, Ahmedabad",
    description:
      "Discover Venus Universe, a landmark 7-acre luxury community in Nehrunagar, Ahmedabad with premium 4 & 5 BHK residences, 70% open landscape and world-class design.",
    keywords:
      "Venus Universe, luxury apartments Nehrunagar, 4 BHK Nehrunagar Ahmedabad, 5 BHK Nehrunagar Ahmedabad, luxury apartments Ahmedabad, premium flats Nehrunagar, Hafeez Contractor Ahmedabad, flats near CG Road, flats near IIM Ahmedabad",
    ogImage: "https://storage.googleapis.com/gpt-engineer-file-uploads/Nlau0aIfcNZ994VHhH1ZCQI5FFn1/social-images/social-1776592390810-vectorstock_45301125.webp",
    twitterHandle: "@venusuniverse",
    author: "Venus Universe",
    canonical: "https://venusuniverse.in",
    allowIndexing: true,
    gaId: "",
    gtmId: "",
    gscVerification: "",
    bingVerification: "16E055BCF808A3E7BC6D89CC583B680D",
    facebookPixelId: "1277476574551380",
  },
  brand: {
    name: "Venus Universe",
    tagline: "Luxury 4 & 5 BHK Apartments in Nehrunagar, Ahmedabad",
    rera: "RERA No. MAA17082/080726/311232",
  },
  contact: {
    phone: "+91 99049 69298",
    whatsapp: "919904969298",
    email: "sales@venusuniverse.in",
    address: "Venus Universe Sales Gallery, Nehrunagar, Ahmedabad",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d72.5497!3d23.0307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNehrunagar+Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  hero: {
    title: "Luxury 4 & 5 BHK Apartments in Nehrunagar, Ahmedabad",
    subtitle:
      "Welcome to Venus Universe, a landmark 7-acre luxury community in the heart of Nehrunagar, Ahmedabad. Just minutes from CG Road, Ashram Road, IIM Ahmedabad and the city's premier destinations, the project offers thoughtfully designed 4 & 5 BHK residences surrounded by 70% open landscape. Crafted by Hafeez Contractor, SWA California and HBA Singapore, Venus Universe combines timeless architecture with world-class living. Pre-booking is now open, and our site office welcomes visitors every day.",
    image: heroTower,
    videoUrl: "",
  },
  about: {
    eyebrow: "The Project",
    title: "Where everything aligns perfectly.",
    body:
      "Venus Universe is a landmark 4 & 5 BHK development in Nehrunagar, Ahmedabad — the city's most established premium micro-market. Sprawling across 7 acres with 70% open area and a 2.2 acre serene podium, the project is designed by Hafeez Contractor with landscaping by SWA (California), interiors by HBA Singapore and lighting by LET Dubai.",
    stats: [
      { label: "Acres", value: "7" },
      { label: "Open Area", value: "70%" },
      { label: "Podium", value: "2.2 Acres" },
      { label: "Configuration", value: "4 & 5 BHK" },
    ],
  },
  highlights: [
    { title: "7 Acre Landmark Development", desc: "One of Nehru Nagar's largest premium gated communities." },
    { title: "70% Open Landscape", desc: "Vast green zones, water features and tree-lined sit-outs." },
    { title: "2.2 Acre Serene Podium", desc: "Elevated landscape deck designed for calm and community." },
    { title: "Architecture by Hafeez Contractor", desc: "India's most awarded residential architecture practice." },
    { title: "Landscape by SWA, California", desc: "World-renowned landscape architects shaping every garden." },
    { title: "Interiors by HBA Singapore", desc: "Singapore's largest hospitality interior design firm." },
    { title: "Lighting by LET, Dubai", desc: "Signature façade and landscape lighting design." },
    { title: "F&B by Stratum @ Venus Universe", desc: "Activatrium, Active8, Rungg & Café Ray on the doorstep." },
    
  ],
  masterPlan: {
    image: masterPlan,
    description:
      "Spread over 7 acres with 70% open area, the master plan centres on a 2.2 acre serene podium. Towers are positioned to maximise light, cross-ventilation and uninterrupted views over landscaped gardens, water features and a sub-1km jogging track.",
  },
  residences: [
    {
      type: "4 & 5 BHK",
      title: "Compact 4 & 5 BHK",
      carpet: "1,550 sq ft",
      saleable: "RERA Carpet (indicative)",
      price: "₹ On Request",
      features: ["Smart-sized 4 & 5 BHK layout", "Premium specifications", "Podium-facing options", "Reserved parking"],
    },
    {
      type: "4 & 5 BHK",
      title: "Classic 4 & 5 BHK",
      carpet: "1,775 sq ft",
      saleable: "RERA Carpet (indicative)",
      price: "₹ On Request",
      features: ["Spacious living + dining", "Master suite with walk-in", "Utility + servant room", "Reserved parking"],
    },
    {
      type: "4 & 5 BHK",
      title: "Grand 4 & 5 BHK",
      carpet: "2,100 sq ft",
      saleable: "RERA Carpet (indicative)",
      price: "₹ On Request",
      features: ["Wide-frontage living", "Two master suites", "Family lounge", "Two reserved parkings"],
    },
    {
      type: "4 & 5 BHK",
      title: "Signature 4 & 5 BHK",
      carpet: "2,475 sq ft",
      saleable: "RERA Carpet (indicative)",
      price: "₹ On Request",
      features: ["Terrace Apartment / Duplex Penthouse / Jodi-House options", "Private deck", "Double-height volumes (select)", "Two reserved parkings"],
    },
  ],
  amenities: [
    "The Wellness Club (Gym, Strength, Yoga & Crossfit)",
    "Cardio & Circuit Training Studio",
    "Swimming Pool",
    "Jacuzzi",
    "Steam & Sauna",
    "Box Cricket",
    "Pickleball Court",
    "Badminton Court",
    "Basketball Court",
    "Multipurpose Lawn",
    "Outdoor Fitness Zone",
    "Jogging Track (<1 km)",
    "Walking Track",
    "Table Tennis",
    "Snooker / Pool Table",
    "Indoor Games",
    "Garden Theatre",
    "Café Universe",
    "Banquet & Banquet Garden",
    "The Lounge",
    "Crystal Garden",
    "Petal Garden",
    "Seating & Mound Gardens",
    "The Grand Stairway",
    "Podcast Pod",
    "The Studio",
    "Meeting & Learning Rooms",
    "Gen-Z Lounge",
    "Toddler's Den",
    "Children's Playground",
    "Guest Rooms",
    "Society Management Office",
    "Water Features",
    "Wheelchair-Friendly Infrastructure",
  ],
  location: {
    eyebrow: "The Address",
    title: "Nehrunagar — where everything aligns perfectly.",
    body:
      "Nehrunagar is the heart of Ahmedabad — a premium micro-market seeing 2x demand growth in premium home sales and 6% YoY commercial rental yield growth. Top schools, hospitals, retail and IIM-A are all within minutes.",
    nearby: [
      { name: "Nehrunagar BRTS Bus Stand", time: "2 min" },
      { name: "IIM Ahmedabad", time: "5 min" },
      { name: "Shalby Hospital", time: "10 min" },
      { name: "Sterling Hospital", time: "10 min" },
      { name: "Ahmedabad University", time: "10 min" },
      { name: "CEPT University", time: "10 min" },
      { name: "National Institute of Design", time: "10 min" },
      { name: "ITC Narmada", time: "10 min" },
      { name: "Ahmedabad One Mall", time: "10 min" },
      { name: "CG Road Market", time: "10 min" },
      { name: "S.G. Highway", time: "10 min" },
      { name: "CIMS Hospital", time: "20 min" },
      { name: "Hyatt Regency", time: "20 min" },
      { name: "Railway Station", time: "20 min" },
      { name: "Airport", time: "25 min" },
    ],
  },
  gallery: [
    { src: showreel.url, caption: "Twin towers — cinematic showreel", type: "video", poster: heroTower },
    { src: g1, caption: "Penthouse living room" },
    { src: g9, caption: "Rooftop infinity pool" },
    { src: g2, caption: "Infinity sky pool" },
    { src: g10, caption: "Walk-in marble wardrobe" },
    { src: g3, caption: "Grand clubhouse lobby" },
    { src: g4, caption: "Master suite" },
    { src: g11, caption: "Private dining room" },
    { src: g5, caption: "Spa & hammam" },
    { src: g12, caption: "Marble bathroom with skyline view" },
    { src: g6, caption: "Penthouse terrace" },
    { src: g7, caption: "Arrival lobby" },
    { src: g8, caption: "Private cinema" },
    { src: heroTower, caption: "Twin towers at dusk" },
    { src: masterPlan, caption: "Master plan" },
  ],
  brochure: {
    url: "#",
    title: "The Venus Universe Brochure",
    subtitle: "A detailed preview of the 7-acre development, residences, amenities and design partners.",
  },
  trust: {
    quotes: [
      {
        quote:
          "Architecture by Hafeez Contractor — India's most decorated residential architect.",
        author: "Principal Architect",
      },
      {
        quote: "Landscape by SWA, California — designers of some of the world's most celebrated communities.",
        author: "Landscape Designer",
      },
      {
        quote: "Interiors by HBA Singapore — Asia's largest hospitality interior design firm.",
        author: "Interior Designer",
      },
      {
        quote: "Lighting by LET, Dubai — signature façade and landscape lighting.",
        author: "Lighting Designer",
      },
    ],
    awards: ["7 Acre Development", "70% Open Area", "2.2 Acre Podium", "World-Class Design Partners"],
  },
  eoi: {
    eyebrow: "Book Your Unit",
    title: "Book Your Unit at Venus Universe",
    subtitle:
      "Pay a fully refundable Token Price of ₹5,00,000 and lock-in priority allotment, pre-launch pricing and your preferred 4 or 5 BHK residence before public launch.",
    amount: 500000,
    amountLabel: "₹ 5,00,000",
    refundable: true,
    refundNote: "100% Refundable · No questions asked",
    ctaPrimary: "Book Your Unit Now",
    ctaSecondary: "What is Token Booking?",
    videoUrl: "",
    videoTitle: "What is Token Booking? — Watch 2 min explainer",
    videoEnabled: true,
    videoEyebrow: "Watch & Understand",
    videoHeading: "What is Token Booking?",
    videoDescription: "A short 2-minute explainer covering how the refundable Token Price works, why it's 100% refundable, and the priority benefits you unlock by booking your unit today.",
    videoCtaText: "▶ Play Video — What is Token Booking?",
    benefits: [
      { title: "Priority Allotment", desc: "First right to choose your unit, floor and view before public launch." },
      { title: "Pre-Launch Pricing", desc: "Lock-in special token pricing — protected against future price hikes." },
      { title: "100% Refundable", desc: "Full refund anytime if you choose not to proceed. Zero risk." },
      { title: "Exclusive Site Visit", desc: "Private sales gallery walkthrough with our senior advisor." },
      { title: "Dedicated Relationship Manager", desc: "Personal point of contact through the entire journey." },
      { title: "Adjustable in Booking", desc: "Token amount fully adjustable in your final booking value." },
    ],
    steps: [
      { step: "01", title: "Pay ₹5,00,000 Token", desc: "Secure payment with our advisor — instant confirmation." },
      { step: "02", title: "Get Priority Access", desc: "Receive your priority number and exclusive pricing details." },
      { step: "03", title: "Choose Your Residence", desc: "Pick your preferred unit before public launch opens." },
    ],
    spotsLeft: 47,
    spotsTotal: 100,
    urgencyText: "Limited slots — only a few token spots remain",
    popupEnabled: true,
    popupTitle: "Don't Miss Out — Book Your Unit",
    popupSubtitle: "Pay ₹5,00,000 fully refundable Token Price to unlock priority allotment & pre-launch pricing.",
  },
};

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;

export type SiteContent = DeepMutable<typeof defaultContent>;
