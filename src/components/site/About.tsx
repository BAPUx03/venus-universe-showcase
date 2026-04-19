import { motion } from "framer-motion";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <Section id="about" eyebrow={about.eyebrow} title={<>{about.title}</>} intro={about.body}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 mt-6">
        {about.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="bg-charcoal-deep px-5 py-8 md:py-10 text-center"
          >
            <div className="font-display text-3xl md:text-5xl text-gradient-gold">{s.value}</div>
            <div className="mt-2 text-[10.5px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
