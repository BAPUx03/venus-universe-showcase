import { motion } from "framer-motion";
import {
  Waves,
  Wine,
  Film,
  Flower2,
  Dumbbell,
  HeartPulse,
  Cigarette,
  Briefcase,
  Trophy,
  Baby,
  PawPrint,
  Zap,
} from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "Infinity Sky Pool": Waves,
  "Sky Lounge & Bar": Wine,
  "Private Cinema": Film,
  "Spa & Hammam": Flower2,
  "Olympic Gym": Dumbbell,
  "Yoga & Pilates Studio": HeartPulse,
  "Cigar Lounge": Cigarette,
  "Business Salon": Briefcase,
  "Tennis & Squash Courts": Trophy,
  "Children's Discovery Zone": Baby,
  "Pet Spa & Park": PawPrint,
  "EV Concierge": Zap,
};

export function Amenities({ items }: { items: SiteContent["amenities"] }) {
  return (
    <Section
      id="amenities"
      eyebrow="The Amenities"
      title={<>A 60,000 sqft <span className="text-gradient-gold italic">private resort.</span></>}
      intro="Curated experiences across three sky-clubs, designed to feel less like amenities and more like a way of life."
      className="bg-charcoal noise-overlay"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {items.map((a, i) => {
          const Icon = ICONS[a] ?? Waves;
          return (
            <motion.div
              key={a}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.05 }}
              className="group flex flex-col items-center text-center px-4 py-7 md:py-9 bg-card/60 luxe-border hover:bg-card transition"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold border border-gold/30 mb-4 group-hover:scale-110 group-hover:bg-gold/20 transition">
                <Icon size={20} />
              </span>
              <span className="text-[12.5px] md:text-sm text-ivory/90 leading-snug">{a}</span>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
