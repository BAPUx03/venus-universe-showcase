import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Section } from "./Section";

import hero from "@/assets/hero-tower.webp";
import facade from "@/assets/gallery-1.webp";
import podium from "@/assets/gallery-7.webp";
import skyDeck from "@/assets/gallery-6.webp";
import clubhouse from "@/assets/gallery-3.webp";
import pool from "@/assets/gallery-2.webp";
import gardens from "@/assets/gallery-9.webp";
import night from "@/assets/gallery-8.webp";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  eyebrow: string;
  span?: "wide" | "tall" | "big";
};

const SHOTS: Shot[] = [
  { src: hero, alt: "The Universe by Venus premium residential development at twilight in Nehrunagar, Ahmedabad", caption: "The Landmark · Twilight", eyebrow: "Facade", span: "big" },
  { src: facade, alt: "Premium residence interior at The Universe by Venus in Nehrunagar", caption: "Contemporary Living", eyebrow: "Residence" },
  { src: night, alt: "Evening amenity view at The Universe by Venus", caption: "After Dark", eyebrow: "Night View", span: "tall" },
  { src: podium, alt: "Arrival and common-area experience at The Universe by Venus", caption: "Arrival Experience", eyebrow: "Entrance" },
  { src: skyDeck, alt: "Outdoor amenity deck for premium 4 BHK residences at The Universe by Venus", caption: "The Amenity Deck", eyebrow: "Amenities", span: "wide" },
  { src: clubhouse, alt: "Clubhouse lobby at The Universe by Venus in Ahmedabad", caption: "The Clubhouse Lobby", eyebrow: "Interiors" },
  { src: pool, alt: "Swimming pool amenity at The Universe by Venus in Nehrunagar", caption: "The Signature Pool", eyebrow: "Leisure" },
  { src: gardens, alt: "Outdoor landscaped amenity setting at The Universe by Venus", caption: "Landscaped Open Spaces", eyebrow: "Open Spaces" },
];

function spanClass(s?: Shot["span"]) {
  if (s === "big") return "md:col-span-2 md:row-span-2";
  if (s === "wide") return "md:col-span-2";
  if (s === "tall") return "md:row-span-2";
  return "";
}

export function Showcase3D() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const next = () => setActive((i) => (i === null ? null : (i + 1) % SHOTS.length));
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + SHOTS.length) % SHOTS.length));

  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "The Universe by Venus — 3D Renders & Architectural Visualisation",
    description:
      "Architectural visualisations of The Universe by Venus, a 10-block premium 4 BHK development in Nehrunagar, Ahmedabad.",
    image: SHOTS.map((s) => ({
      "@type": "ImageObject",
      contentUrl: s.src,
      caption: s.caption,
      description: s.alt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <Section
        id="showcase-3d"
        eyebrow="The Landmark · Impact 3D"
        title={
          <>
            A 10-block <span className="text-gradient-gold italic">landmark</span> —
            frame by frame.
          </>
        }
        intro="Architectural visualisations of The Universe by Venus — premium 4 BHK residences across Blocks A–J in central Ahmedabad, with podium landscapes, clubhouse, pool and amenity spaces."
        className="bg-charcoal-deep noise-overlay"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[240px] sm:auto-rows-[200px] md:auto-rows-[220px]">
          {SHOTS.map((s, i) => (
            <motion.button
              key={s.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06 }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden luxe-border bg-charcoal-soft ${spanClass(
                s.span
              )}`}
              aria-label={s.alt}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/10 to-transparent opacity-70 group-hover:opacity-95 transition" />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-charcoal-deep/70 border border-gold/40 text-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Expand size={15} />
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-left">
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-gold">
                  {s.eyebrow}
                </div>
                <div className="text-sm text-ivory mt-0.5 font-medium">{s.caption}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </Section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[95] bg-charcoal-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={SHOTS[active].alt}
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-5 text-ivory hover:text-gold p-2"
            onClick={close}
          >
            <X size={26} />
          </button>
          <button
            aria-label="Previous image"
            className="absolute left-3 md:left-8 text-ivory/80 hover:text-gold p-3"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            aria-label="Next image"
            className="absolute right-3 md:right-8 text-ivory/80 hover:text-gold p-3"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={32} />
          </button>
          <figure className="max-w-full max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={SHOTS[active].src}
              alt={SHOTS[active].alt}
              className="max-w-full max-h-[80vh] object-contain shadow-luxe"
            />
            <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.22em] text-gold">
              {SHOTS[active].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
