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
  brand: {
    name: "Venus Grounds 2",
    tagline: "Luxury 4 & 5 BHK Residences at Nehrunagar, Ahmedabad",
    rera: "RERA Registered — Details on Request",
  },
  contact: {
    phone: "+91 98000 00000",
    whatsapp: "919800000000",
    email: "sales@venusgrounds.in",
    address: "Venus Grounds 2 Sales Gallery, Nehrunagar, Ahmedabad",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0!2d72.5497!3d23.0307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNehrunagar+Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  hero: {
    title: "Nehrunagar — The Heart of Ahmedabad",
    subtitle:
      "Venus Grounds 2 — an exclusive collection of 4 & 5 BHK residences spread across 7 acres with 70% open landscape, in Ahmedabad's most coveted address.",
    image: heroTower,
    videoUrl: "",
  },
  about: {
    eyebrow: "The Project",
    title: "Where everything aligns perfectly.",
    body:
      "Venus Grounds 2 is a landmark 4 & 5 BHK development in Nehrunagar — Ahmedabad's most established premium micro-market. Sprawling across 7 acres with 70% open area and a 2.2 acre serene podium, the project is designed by Hafeez Contractor with landscaping by SWA (California), interiors by HBA Singapore and lighting by LET Dubai.",
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
    { title: "Walk to IIM-A & BRTS", desc: "5 min to IIM-Ahmedabad, 2 min to Nehrunagar BRTS stand." },
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
} as const;

export type SiteContent = typeof defaultContent;
