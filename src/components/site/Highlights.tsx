import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

export function Highlights({ items }: { items: SiteContent["highlights"] }) {
  return (
    <Section
      id="highlights"
      eyebrow="The Highlights"
      title={<>Conceived once. <span className="text-gradient-gold italic">Crafted forever.</span></>}
      className="bg-charcoal noise-overlay"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {items.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
            className="group relative bg-card/70 luxe-border p-6 md:p-7 hover:bg-card transition"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 text-gold border border-gold/30 group-hover:bg-gold/20 transition">
                <Sparkles size={16} />
              </span>
              <div>
                <h3 className="font-display text-lg md:text-xl text-ivory leading-snug">{h.title}</h3>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
