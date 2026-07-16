import heroTower from "@/assets/hero-tower.jpg";
import masterPlan from "@/assets/master-plan.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import g9 from "@/assets/gallery-9.jpg";
import g10 from "@/assets/gallery-10.jpg";
import g11 from "@/assets/gallery-11.jpg";
import g12 from "@/assets/gallery-12.jpg";
import showreel from "@/assets/showreel.mp4.asset.json";

/**
 * Default site content. The admin panel (/studio) overrides any of these
 * keys by writing JSON into the `site_content` table. The useSiteContent()
 * hook merges DB values over these defaults.
 */
export const defaultContent = {
  seo: {
    siteUrl: "https://venusuniverse.in",
    title: "Venus Nehrunagar — Luxury 4 & 5 BHK by Venus Universe",
    description:
      "Venus Nehrunagar by Venus Universe — luxury 4 & 5 BHK apartments in Nehrunagar, Ahmedabad. 70% open landscape, world-class design. Pre-booking open.",
    keywords:
      "4 BHK Luxury Apartments in Nehrunagar, 5 BHK Premium Flats in Nehrunagar Ahmedabad, Ultra Luxury Apartments Near Nehrunagar, luxury apartments Nehrunagar, luxury apartments nahrunagar, 4 BHK apartments Nehrunagar Ahmedabad, 5 BHK apartments Nehrunagar Ahmedabad, premium 4 BHK flats Nehrunagar, premium 5 BHK flats Nehrunagar, ultra luxury flats Nehrunagar, ultra luxury 4 BHK Ahmedabad, ultra luxury 5 BHK Ahmedabad, luxury 4 and 5 BHK in Nehrunagar Ahmedabad, luxury 4 BHK in Nehrunagar Ahmedabad, luxury 5 BHK in Nehrunagar Ahmedabad, 4 BHK in Nehrunagar Ahmedabad, 5 BHK in Nehrunagar Ahmedabad, Venus Universe, Venus Nehrunagar, Venus Universe Nehrunagar, Venus Universe Ahmedabad, Venus Universe Nehrunagar Ahmedabad, Venus Nehrunagar Ahmedabad, Venus Universe by Venus Group, 4 BHK flats Nehrunagar, 5 BHK flats Nehrunagar, luxury apartments near Nehrunagar, premium flats Nehrunagar Ahmedabad, Venus Grounds Nehrunagar, new project Nehrunagar Ahmedabad, under construction Nehrunagar, pre booking Venus Universe Nehrunagar, Hafeez Contractor Ahmedabad, flats near CG Road, flats near Ashram Road, flats near IIM Ahmedabad",
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
    name: "Venus Universe Nehrunagar",
    tagline: "4 BHK Luxury Apartments in Nehrunagar & 5 BHK Premium Flats Ahmedabad — Ultra Luxury Apartments Near Nehrunagar",
    rera: "RERA Registered — Details on Request",
  },
  contact: {
    phone: "+91 99049 69298",
    whatsapp: "919904969298",
    email: "sales@venusuniverse.in",
    address: "Venus Universe Nehrunagar Sales Gallery, Nehrunagar, Ahmedabad",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d72.5497!3d23.0307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNehrunagar+Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  hero: {
    title: "4 BHK Luxury Apartments in Nehrunagar & 5 BHK Premium Flats in Nehrunagar Ahmedabad — Venus Universe",
    subtitle:
      "Venus Universe Nehrunagar — Ultra Luxury Apartments Near Nehrunagar offering 4 BHK Luxury Apartments in Nehrunagar and 5 BHK Premium Flats in Nehrunagar Ahmedabad. Under-construction luxury apartments Nehrunagar minutes from CG Road, Ashram Road, Paldi & IIM-A. Pre-booking now open · Site office welcoming visitors.",
    image: heroTower,
    videoUrl: "",
  },
  about: {
    eyebrow: "The Project",
    title: "Where everything aligns perfectly.",
    body:
      "Venus Universe Nehrunagar is a landmark 4 & 5 BHK development in Nehrunagar — Ahmedabad's most established premium micro-market. Sprawling across 7 acres with 70% open area and a 2.2 acre serene podium, the project is designed by Hafeez Contractor with landscaping by SWA (California), interiors by HBA Singapore and lighting by LET Dubai.",
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
    { title: "F&B by Stratum @ Venus Grounds", desc: "Activatrium, Active8, Rungg & Café Ray on the doorstep." },
    
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
    "Wellness Club",
    "Gymnasium",
    "Swimming Pool",
    "Jacuzzi",
    "Steam & Sauna",
    "Box Cricket",
    "Pickle Ball Court",
    "Badminton Court",
    "Basketball Court",
    "Multipurpose Lawn",
    "Table Tennis",
    "Snooker / Pool Table",
    "Cafe & Banquet",
    "Garden Theatre",
    "Crystal Garden",
    "Teenage Arena",
    "Podcast Pod",
    "Tuition Room",
    "Guest Suite",
    "Indoor Games",
    "Children's Play Area",
    "Jogging Track (<1 km)",
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
    title: "The Venus Grounds 2 Brochure",
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
    eyebrow: "Expression of Interest",
    title: "Secure Your Spot at Venus Grounds 2",
    subtitle:
      "Pay a fully refundable EOI of ₹5,00,000 and lock-in priority allotment, pre-launch pricing and your preferred unit before public launch.",
    amount: 500000,
    amountLabel: "₹ 5,00,000",
    refundable: true,
    refundNote: "100% Refundable · No questions asked",
    ctaPrimary: "Secure Your Spot Now",
    ctaSecondary: "What is EOI?",
    videoUrl: "", // YouTube URL — admin paste karega
    videoTitle: "What is EOI? — Watch 2 min explainer",
    videoEnabled: true,
    videoEyebrow: "Watch & Understand",
    videoHeading: "What is EOI?",
    videoDescription: "A short 2-minute explainer covering how the Expression of Interest works, why it's 100% refundable, and the priority benefits you unlock by reserving your spot today.",
    videoCtaText: "▶ Play Video — What is EOI?",
    benefits: [
      { title: "Priority Allotment", desc: "First right to choose your unit, floor and view before public launch." },
      { title: "Pre-Launch Pricing", desc: "Lock-in special EOI pricing — protected against future price hikes." },
      { title: "100% Refundable", desc: "Full refund anytime if you choose not to proceed. Zero risk." },
      { title: "Exclusive Site Visit", desc: "Private sales gallery walkthrough with our senior advisor." },
      { title: "Dedicated Relationship Manager", desc: "Personal point of contact through the entire journey." },
      { title: "Adjustable in Booking", desc: "EOI amount fully adjustable in your final booking value." },
    ],
    steps: [
      { step: "01", title: "Pay ₹5,00,000 EOI", desc: "Secure payment with our advisor — instant confirmation." },
      { step: "02", title: "Get Priority Access", desc: "Receive your priority number and exclusive pricing details." },
      { step: "03", title: "Choose Your Residence", desc: "Pick your preferred unit before public launch opens." },
    ],
    spotsLeft: 47,
    spotsTotal: 100,
    urgencyText: "Limited slots — only a few EOI spots remain",
    popupEnabled: true,
    popupTitle: "Don't Miss Out — Secure Your Spot",
    popupSubtitle: "Pay ₹5,00,000 fully refundable EOI to unlock priority allotment & pre-launch pricing.",
  },
};

type DeepMutable<T> = T extends readonly (infer U)[]
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;

export type SiteContent = DeepMutable<typeof defaultContent>;
