import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

export function Location({
  data,
  mapEmbed,
}: {
  data: SiteContent["location"];
  mapEmbed: string;
}) {
  return (
    <Section id="location" eyebrow={data.eyebrow} title={<>{data.title}</>} intro={data.body}>
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 bg-card/70 luxe-border p-7 md:p-9"
        >
          <h3 className="font-display text-xl text-ivory mb-5">In the neighbourhood</h3>
          <ul className="divide-y divide-border/60">
            {data.nearby.map((n) => (
              <li key={n.name} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <span className="flex items-center gap-3 text-[14px] text-ivory/85">
                  <MapPin size={14} className="text-gold" />
                  {n.name}
                </span>
                <span className="text-[12px] uppercase tracking-[0.18em] text-gold">{n.time}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 luxe-border bg-charcoal-soft min-h-[360px] lg:min-h-0 overflow-hidden"
        >
          <iframe
            title="Venus Universe location"
            src={mapEmbed}
            loading="lazy"
            className="w-full h-full min-h-[360px] grayscale-[0.4] contrast-110 brightness-75"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </Section>
  );
}
