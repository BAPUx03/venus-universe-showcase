import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

type GalleryItem = SiteContent["gallery"][number] & { type?: string; poster?: string };

export function Gallery({ items }: { items: SiteContent["gallery"] }) {
  const list = items as readonly GalleryItem[];
  const [active, setActive] = useState<number | null>(null);

  const close = () => setActive(null);
  const next = () => setActive((i) => (i === null ? null : (i + 1) % list.length));
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + list.length) % list.length));

  return (
    <Section
      id="gallery"
      eyebrow="The Gallery"
      title={<>Frames from a <span className="text-gradient-gold italic">finer life.</span></>}
      className="bg-charcoal"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[240px]">
        {list.map((g, i) => {
          const isVideo = g.type === "video";
          const thumb = isVideo ? g.poster || g.src : g.src;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden luxe-border bg-charcoal-soft ${
                i % 5 === 0 ? "md:row-span-2 md:col-span-2" : ""
              }`}
            >
              <img
                src={thumb}
                alt={g.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition" />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-gold/90 text-charcoal-deep flex items-center justify-center shadow-gold group-hover:scale-110 transition">
                    <Play size={22} fill="currentColor" />
                  </span>
                </div>
              )}
              <div className="absolute bottom-3 left-4 right-4 text-left">
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-gold">
                  {isVideo ? "Watch Film" : "View"}
                </div>
                <div className="text-sm text-ivory mt-0.5">{g.caption}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[90] bg-charcoal-deep/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button aria-label="Close" className="absolute top-5 right-5 text-ivory hover:text-gold p-2" onClick={close}>
            <X size={26} />
          </button>
          <button
            aria-label="Previous"
            className="absolute left-3 md:left-8 text-ivory/80 hover:text-gold p-3"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={32} />
          </button>
          <button
            aria-label="Next"
            className="absolute right-3 md:right-8 text-ivory/80 hover:text-gold p-3"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={32} />
          </button>
          {list[active].type === "video" ? (
            <video
              src={list[active].src}
              poster={list[active].poster}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[80vh] object-contain shadow-luxe"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={list[active].src}
              alt={list[active].caption}
              className="max-w-full max-h-[80vh] object-contain shadow-luxe"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </Section>
  );
}
