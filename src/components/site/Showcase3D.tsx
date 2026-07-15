import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Section } from "./Section";

import hero from "@/assets/impact3d/venus-universe-exterior-twilight-nehrunagar-ahmedabad.webp.asset.json";
import facade from "@/assets/impact3d/venus-universe-tower-facade-luxury-4bhk-nehrunagar.webp.asset.json";
import podium from "@/assets/impact3d/venus-universe-podium-entrance-luxury-apartments-ahmedabad.webp.asset.json";
import skyDeck from "@/assets/impact3d/venus-universe-sky-deck-amenities-nehrunagar.webp.asset.json";
import clubhouse from "@/assets/impact3d/venus-universe-clubhouse-lobby-4-5bhk-ahmedabad.webp.asset.json";
import pool from "@/assets/impact3d/venus-universe-swimming-pool-luxury-residences-nehrunagar.webp.asset.json";
import gardens from "@/assets/impact3d/venus-universe-landscaped-gardens-ultra-luxury-ahmedabad.webp.asset.json";
import night from "@/assets/impact3d/venus-universe-night-view-penthouse-ahmedabad.webp.asset.json";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  eyebrow: string;
  span?: "wide" | "tall" | "big";
};

const SHOTS: Shot[] = [
  { src: hero.url, alt: "Venus Universe twin-tower luxury 4 & 5 BHK exterior at twilight in Nehrunagar, Ahmedabad", caption: "The Twin Towers · Twilight", eyebrow: "Facade", span: "big" },
  { src: facade.url, alt: "Venus Universe tower facade — ultra luxury 4 BHK apartments in Nehrunagar, Ahmedabad", caption: "Architectural Facade", eyebrow: "Elevation" },
  { src: night.url, alt: "Venus Universe night view — luxury penthouse apartments in Ahmedabad", caption: "After Dark", eyebrow: "Night View", span: "tall" },
  { src: podium.url, alt: "Venus Universe grand podium entrance — luxury apartments Nehrunagar Ahmedabad", caption: "Arrival Podium", eyebrow: "Entrance" },
  { src: skyDeck.url, alt: "Venus Universe sky deck amenities — 4 and 5 BHK luxury residences Nehrunagar", caption: "The Sky Deck", eyebrow: "Amenities", span: "wide" },
  { src: clubhouse.url, alt: "Venus Universe clubhouse lobby — 4 & 5 BHK premium residences Ahmedabad", caption: "The Clubhouse Lobby", eyebrow: "Interiors" },
  { src: pool.url, alt: "Venus Universe swimming pool — luxury residences Nehrunagar Ahmedabad", caption: "The Signature Pool", eyebrow: "Leisure" },
  { src: gardens.url, alt: "Venus Universe landscaped gardens — ultra luxury apartments Ahmedabad", caption: "Landscaped Gardens", eyebrow: "Open Spaces" },
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
    name: "Venus Universe Nehrunagar — 3D Renders & Architectural Visualisation",
    description:
      "Impact 3D visualisations of Venus Universe Nehrunagar — luxury 4 and 5 BHK apartments and penthouses in Ahmedabad. Exterior, sky deck, clubhouse, pool and landscape renders.",
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
            A twin-tower <span className="text-gradient-gold italic">landmark</span> —
            frame by frame.
          </>
        }
        intro="Architectural 3D visualisations of Venus Universe Nehrunagar — the ultra-luxury 4 & 5 BHK residences rising in central Ahmedabad. Facades, sky decks, clubhouse, pool and landscape — as they will be lived."
        className="bg-charcoal-deep noise-overlay"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[220px]">
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
