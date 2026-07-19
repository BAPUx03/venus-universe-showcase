import { motion } from "framer-motion";
import {
  Waves,
  Dumbbell,
  HeartPulse,
  Flower2,
  Trophy,
  CircleDot,
  Coffee,
  Film,
  Sparkles,
  Users,
  Mic,
  BedDouble,
  Gamepad2,
  Baby,
  Footprints,
  Droplets,
  Accessibility,
  Sprout,
  Trees,
  Sofa,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "The Wellness Club (Gym, Strength, Yoga & Crossfit)": HeartPulse,
  "Cardio & Circuit Training Studio": Dumbbell,
  "Swimming Pool": Waves,
  "Jacuzzi": Droplets,
  "Steam & Sauna": Flower2,
  "Box Cricket": Trophy,
  "Pickleball Court": CircleDot,
  "Badminton Court": Trophy,
  "Basketball Court": CircleDot,
  "Multipurpose Lawn": Sprout,
  "Outdoor Fitness Zone": Dumbbell,
  "Jogging Track (<1 km)": Footprints,
  "Walking Track": Footprints,
  "Table Tennis": CircleDot,
  "Snooker / Pool Table": CircleDot,
  "Indoor Games": Gamepad2,
  "Garden Theatre": Film,
  "Café Universe": Coffee,
  "Banquet & Banquet Garden": Users,
  "The Lounge": Sofa,
  "Crystal Garden": Sparkles,
  "Petal Garden": Flower2,
  "Seating & Mound Gardens": Trees,
  "The Grand Stairway": Sparkles,
  "Podcast Pod": Mic,
  "The Studio": Film,
  "Meeting & Learning Rooms": GraduationCap,
  "Gen-Z Lounge": Users,
  "Toddler's Den": Baby,
  "Children's Playground": Baby,
  "Guest Rooms": BedDouble,
  "Society Management Office": Building2,
  "Water Features": Droplets,
  "Wheelchair-Friendly Infrastructure": Accessibility,
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
