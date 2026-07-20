import { motion } from "framer-motion";
import { Section } from "./Section";

/**
 * The full design & consulting roster behind Venus Universe (The Universe by
 * Venus). A high-authority, keyword-rich block ("Hafeez Contractor project",
 * "HBA interiors", "SWA landscape") that also emits JSON-LD so the credited
 * firms are machine-readable.
 */
const TEAM: Array<{ role: string; name: string; place?: string }> = [
  { role: "Architecture", name: "Hafeez Contractor", place: "Mumbai" },
  { role: "Principal Landscape", name: "SWA Group", place: "California, USA" },
  { role: "Interior Design", name: "Hirsch Bedner Associates (HBA)", place: "Singapore" },
  { role: "Lighting Design", name: "LET Design", place: "Dubai" },
  { role: "Interior Design Advisor", name: "Studio Nilesh Kava" },
  { role: "Landscape", name: "MPLA", place: "Mumbai" },
  { role: "Structural Design", name: "DUCON Consultants" },
  { role: "MEPF Engineering", name: "MEP Consulting Engineers", place: "Mumbai" },
  { role: "Wayfinding", name: "Bentel Associates", place: "Mumbai" },
  { role: "Legal", name: "Cyril Amarchand Mangaldas" },
  { role: "Vertical Transportation", name: "Lerch Bates", place: "Mumbai" },
  { role: "Sustainability", name: "Savvy Greens" },
];

export function DesignTeam() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "The Universe by Venus",
    url: "https://venusuniverse.in",
    contributor: TEAM.map((t) => ({
      "@type": "Organization",
      name: t.name,
      jobTitle: t.role,
      ...(t.place ? { address: t.place } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Section
        id="design-team"
        eyebrow="The Makers"
        title={
          <>
            Designed by a <span className="text-gradient-gold italic">world-class</span> team.
          </>
        }
        intro="The Universe by Venus brings together the brochure-credited architecture, landscape, interiors, lighting, engineering, wayfinding, legal, vertical-transportation and sustainability teams behind the development."
        className="bg-charcoal noise-overlay"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {TEAM.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="px-4 py-6 bg-card/60 luxe-border hover:bg-card transition"
            >
              <div className="text-[10.5px] uppercase tracking-[0.22em] text-gold">{t.role}</div>
              <div className="mt-1.5 text-sm md:text-[15px] text-ivory font-medium leading-snug">{t.name}</div>
              {t.place && <div className="mt-0.5 text-[12px] text-muted-foreground">{t.place}</div>}
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
