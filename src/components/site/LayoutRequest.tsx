import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, MessageCircle, X, FileText, ShieldCheck } from "lucide-react";
import { Section } from "./Section";
import planA from "@/assets/layouts/plan-a.webp.asset.json";
import planB from "@/assets/layouts/plan-b.webp.asset.json";
import planC from "@/assets/layouts/plan-c.webp.asset.json";

const PLANS = [
  { src: planA.url, label: "4 BHK · Block A · Type 1", area: "1,547 sq ft carpet" },
  { src: planB.url, label: "Block B · Master Plan", area: "8 residences / floor" },
  { src: planC.url, label: "4 BHK · Block B · Type 2", area: "1,546 sq ft carpet" },
] as const;

const WHATSAPP = "919800000000";
const WA_MSG = encodeURIComponent(
  "Hello Venus Universe — I'd like the full 4 BHK & 5 BHK unit plans, master plan and price sheet for Venus Universe Nehrunagar. Please share on WhatsApp."
);

export function LayoutRequest({ whatsapp = WHATSAPP }: { whatsapp?: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return;
    const t = setInterval(() => setActive((i) => (i + 1) % PLANS.length), 3800);
    return () => clearInterval(t);
  }, [open]);

  const plan = PLANS[active];
  const waLink = `https://wa.me/${whatsapp}?text=${WA_MSG}`;

  return (
    <Section
      id="unit-plans"
      eyebrow="Unit Plans · On Request"
      title={<>Request the full <span className="text-gradient-gold italic">floor plans.</span></>}
      className="bg-charcoal-deep"
    >
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-center">
        {/* Blurred stack */}
        <div className="lg:col-span-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative block w-full aspect-[4/3] overflow-hidden luxe-border bg-charcoal-soft"
            aria-label="Request unit plans on WhatsApp"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={plan.src}
                alt={`${plan.label} — Venus Universe Nehrunagar Ahmedabad (blurred preview)`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "blur(22px) saturate(0.85) brightness(0.85)", transform: "scale(1.15)" }}
                draggable={false}
              />
            </AnimatePresence>

            {/* Grain / vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/85 via-charcoal-deep/20 to-transparent" />

            {/* Centre CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 border border-gold/50 backdrop-blur-md text-gold shadow-gold"
              >
                <Lock size={22} />
              </motion.div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-gold">Confidential · Shared on Request</p>
              <h3 className="mt-3 text-ivory text-2xl md:text-3xl font-serif">
                Tap to unlock the full plan
              </h3>
              <p className="mt-2 max-w-md text-ivory/70 text-sm leading-relaxed">
                Our sales team will reach out on WhatsApp with the complete unit plans, master layout and a guided walkthrough.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[11.5px] shadow-gold group-hover:brightness-110 transition">
                <MessageCircle size={14} /> View Layout
              </span>
            </div>

            {/* Bottom label + dots */}
            <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex items-center justify-between">
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold/90">Preview {active + 1} / {PLANS.length}</div>
                <div className="text-ivory/85 text-xs mt-0.5">{plan.label} · {plan.area}</div>
              </div>
              <div className="flex gap-1.5">
                {PLANS.map((_, i) => (
                  <span
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActive(i); }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${i === active ? "w-6 bg-gold" : "w-1.5 bg-ivory/30"}`}
                  />
                ))}
              </div>
            </div>
          </button>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          <p className="text-ivory/80 leading-relaxed">
            Unit plans, carpet-area sheets and pricing at Venus Universe Nehrunagar are shared privately with serious enquiries. Request access and our sales team will send the complete package on WhatsApp within minutes.
          </p>
          <ul className="space-y-3">
            {[
              { icon: <FileText size={14} />, t: "All 4 BHK & 5 BHK unit plans (Block A & B)" },
              { icon: <FileText size={14} />, t: "Master plan, floor plate & tower elevation" },
              { icon: <ShieldCheck size={14} />, t: "Latest price sheet & payment schedule" },
              { icon: <MessageCircle size={14} />, t: "Personal walkthrough by senior sales lead" },
            ].map((row, i) => (
              <li key={i} className="flex items-start gap-3 text-ivory/85 text-sm">
                <span className="mt-0.5 inline-flex w-7 h-7 items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold shrink-0">{row.icon}</span>
                <span>{row.t}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[12px] shadow-gold hover:brightness-110 transition"
          >
            <MessageCircle size={14} /> Request Unit Plans
          </button>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-charcoal-deep/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-charcoal luxe-border p-8 md:p-10 text-center"
            >
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-ivory/60 hover:text-gold p-2"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", damping: 12 }}
                className="mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 border border-gold/50 text-gold shadow-gold"
              >
                <MessageCircle size={26} />
              </motion.div>

              <p className="mt-5 text-[10.5px] uppercase tracking-[0.3em] text-gold">Sales Concierge</p>
              <h4 className="mt-2 text-ivory text-2xl font-serif">
                Our sales team will reach out on <span className="text-gradient-gold italic">WhatsApp</span>
              </h4>
              <p className="mt-3 text-ivory/70 text-sm leading-relaxed">
                Tap below to open WhatsApp — we'll send all unit plans, the master layout, carpet-area sheet and pricing, and personally guide you through every option.
              </p>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[12px] shadow-gold hover:brightness-110 transition"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <p className="mt-3 text-[11px] text-ivory/50">
                Response within minutes · 10 AM – 8 PM · All 7 days
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
