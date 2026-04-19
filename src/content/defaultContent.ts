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

/**
 * Default site content. The admin panel (/studio) overrides any of these
 * keys by writing JSON into the `site_content` table. The useSiteContent()
 * hook merges DB values over these defaults.
 */
export const defaultContent = {
  brand: {
    name: "Venus Universe",
    tagline: "A Universe of Luxury Living",
    rera: "RERA No. P00000000000000",
  },
  contact: {
    phone: "+91 98000 00000",
    whatsapp: "919800000000",
    email: "sales@venusuniverse.in",
    address: "Venus Universe Sales Gallery, Sector 00, Gurugram, Haryana 122000, India",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.123!2d77.0266!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDEnMzUuOSJF!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  hero: {
    title: "A Universe of Luxury Living",
    subtitle:
      "Limited collection of 4 & 5 BHK sky residences, sculpted for those who measure life in moments, not square feet.",
    image: heroTower,
    videoUrl: "",
  },
  about: {
    eyebrow: "The Project",
    title: "Where the rare becomes the everyday.",
    body:
      "Venus Universe is an invitation to live above the ordinary — a private constellation of two architectural towers wrapped around a 1.2 acre central garden. Every residence is a corner home, every view is a horizon, every detail is a quiet conversation between craft and calm.",
    stats: [
      { label: "Iconic Towers", value: "02" },
      { label: "Sky Residences", value: "98" },
      { label: "Acres of Land", value: "5.4" },
      { label: "Clubhouse", value: "60,000 sqft" },
    ],
  },
  highlights: [
    { title: "Twin Architectural Towers", desc: "G+38 silhouettes by an internationally awarded studio." },
    { title: "Only 2 Residences / Floor", desc: "Absolute privacy with private elevator lobbies." },
    { title: "12 ft Floor-to-Ceiling Glass", desc: "Edge-to-edge city and skyline panoramas." },
    { title: "1.2 Acre Central Garden", desc: "A landscaped sanctuary inspired by Kyoto courtyards." },
    { title: "60,000 sqft Sky Clubhouse", desc: "Curated by hospitality designers from Aman & Six Senses." },
    { title: "Concierge by Quintessentially", desc: "24×7 lifestyle, travel and wellness concierge." },
    { title: "Italian Marble Throughout", desc: "Calacatta, Statuario and Bottocino — hand-selected." },
    { title: "Smart-Home Native", desc: "Crestron-powered automation, voice and app control." },
    { title: "EV Charging in Every Bay", desc: "Triple-basement with valet, wash bays and detailing." },
  ],
  masterPlan: {
    image: masterPlan,
    description:
      "Two towers, one universe. The master plan dedicates 78% of the land to landscape, water and amenity — leaving the homes to do what they do best: float above it all.",
  },
  residences: [
    {
      type: "4 BHK",
      title: "The Solstice Residence",
      carpet: "3,420 sq ft",
      saleable: "5,180 sq ft",
      price: "₹ On Request",
      features: ["Private elevator lobby", "9.5 ft deep wrap balcony", "Servant + utility suite", "Two parking bays"],
    },
    {
      type: "5 BHK",
      title: "The Equinox Penthouse",
      carpet: "4,860 sq ft",
      saleable: "7,420 sq ft",
      price: "₹ On Request",
      features: ["Private terrace garden", "Double-height living", "Family lounge + study", "Three parking bays"],
    },
  ],
  amenities: [
    "Infinity Sky Pool",
    "Sky Lounge & Bar",
    "Private Cinema",
    "Spa & Hammam",
    "Olympic Gym",
    "Yoga & Pilates Studio",
    "Cigar Lounge",
    "Business Salon",
    "Tennis & Squash Courts",
    "Children's Discovery Zone",
    "Pet Spa & Park",
    "EV Concierge",
  ],
  location: {
    eyebrow: "The Address",
    title: "An address measured in minutes.",
    body:
      "Set on a coveted address, Venus Universe places the city's most sought-after destinations within an effortless drive.",
    nearby: [
      { name: "International Airport", time: "18 min" },
      { name: "Central Business District", time: "12 min" },
      { name: "Premier International School", time: "06 min" },
      { name: "Five-Star Hospital", time: "08 min" },
      { name: "Luxury Retail Boulevard", time: "05 min" },
      { name: "Championship Golf Course", time: "10 min" },
    ],
  },
  gallery: [
    { src: g1, caption: "Penthouse living room" },
    { src: g2, caption: "Infinity sky pool" },
    { src: g3, caption: "Grand clubhouse lobby" },
    { src: g4, caption: "Master suite" },
    { src: g5, caption: "Spa & hammam" },
    { src: g6, caption: "Penthouse terrace" },
    { src: g7, caption: "Arrival lobby" },
    { src: g8, caption: "Private cinema" },
    { src: heroTower, caption: "Twin towers at dusk" },
    { src: masterPlan, caption: "Master plan" },
  ],
  brochure: {
    url: "#",
    title: "The Venus Universe Catalogue",
    subtitle: "A 64-page hardbound preview of residences, finishes and floor plans.",
  },
  trust: {
    quotes: [
      {
        quote:
          "Venus Universe redefines the vocabulary of luxury living in India. Restraint and richness in equal measure.",
        author: "Architectural Digest India",
      },
      {
        quote: "An asset class of its own. Tightly held, deeply considered.",
        author: "Forbes Real Estate Review",
      },
    ],
    awards: ["Best Luxury Project 2025", "Design Excellence Award", "Green Building Platinum"],
  },
} as const;

export type SiteContent = typeof defaultContent;
