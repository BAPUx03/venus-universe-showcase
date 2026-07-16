import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";
import { LayoutRequest } from "./LayoutRequest";

export function MasterPlan({ data, whatsapp }: { data: SiteContent["masterPlan"]; whatsapp?: string }) {
  const [zoom, setZoom] = useState(false);
  return (
    <Section
      id="master-plan"
      eyebrow="The Master Plan"
      title={<>A composition of <span className="text-gradient-gold italic">space &amp; silence.</span></>}
      intro={data.description}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative group cursor-zoom-in luxe-border bg-charcoal-soft"
        onClick={() => setZoom(true)}
      >
        <img
          src={data.image}
          alt="Venus Universe master plan"
          loading="lazy"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="absolute bottom-4 right-4 bg-charcoal-deep/80 border border-gold/40 px-3 py-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold">
          <ZoomIn size={14} /> Click to Zoom
        </div>
      </motion.div>

      {zoom && (
        <div
          className="fixed inset-0 z-[90] bg-charcoal-deep/95 backdrop-blur-md p-4 md:p-10 flex items-center justify-center"
          onClick={() => setZoom(false)}
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-5 text-ivory/80 hover:text-gold p-2"
            onClick={() => setZoom(false)}
          >
            <X size={26} />
          </button>
          <img
            src={data.image}
            alt="Master plan zoomed"
            className="max-w-full max-h-[85vh] object-contain shadow-luxe"
          />
        </div>
      )}
    </Section>
  );
}
