import { motion } from "framer-motion";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

export function Residences({ items }: { items: SiteContent["residences"] }) {
  return (
    <Section
      id="residences"
      eyebrow="The Residences"
      title={<>Two homes. <span className="text-gradient-gold italic">One philosophy.</span></>}
      intro="Every Venus Universe residence is a corner home, with private elevator lobbies and views that turn the city into wallpaper."
    >
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {items.map((r, i) => (
          <motion.div
            key={r.type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative bg-card luxe-border p-7 md:p-10 flex flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">{r.type}</span>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-ivory leading-tight">{r.title}</h3>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">Starting</div>
                <div className="font-display text-xl md:text-2xl text-gradient-gold mt-1">{r.price}</div>
              </div>
            </div>

            <div className="gold-divider my-6" />

            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">Carpet Area</div>
                <div className="mt-1 text-ivory text-lg">{r.carpet}</div>
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">Saleable</div>
                <div className="mt-1 text-ivory text-lg">{r.saleable}</div>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {r.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[13.5px] text-muted-foreground">
                  <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-5 py-3 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.2em] text-[11.5px] shadow-gold hover:brightness-110 transition"
              >
                Request Floor Plan
              </a>
              <a
                href="#contact"
                className="px-5 py-3 border border-gold/50 text-ivory uppercase tracking-[0.2em] text-[11.5px] hover:bg-gold/10 transition"
              >
                Book a Visit
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
