import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, PlayCircle, Sparkles, Zap, X } from "lucide-react";
import type { SiteContent } from "@/content/defaultContent";

function ytEmbed(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
  if (url.includes("vimeo.com")) {
    const id = url.split("/").pop();
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return url;
}

export function EoiSection({ eoi }: { eoi: SiteContent["eoi"] }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const pct = eoi.spotsTotal ? Math.min(100, ((eoi.spotsTotal - eoi.spotsLeft) / eoi.spotsTotal) * 100) : 0;
  const embed = ytEmbed(eoi.videoUrl);

  return (
    <section id="eoi" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[oklch(0.985_0.005_25)] to-white">
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "var(--accent-red)" }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-red-soft)" }} />
      </div>

      <div className="relative container-luxe">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase text-white" style={{ background: "var(--accent-red)" }}>
            <Sparkles size={12} /> {eoi.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.1] mt-5 text-foreground">
            {eoi.title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-foreground/70 leading-relaxed">{eoi.subtitle}</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55 }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-[0_20px_70px_-15px_rgba(180,40,30,0.25)] border border-[oklch(0.92_0.02_25)] bg-white"
        >
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            {/* Left — Pitch */}
            <div className="p-8 md:p-10">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60 font-semibold">EOI Amount</span>
              </div>
              <div className="mt-2 flex items-end gap-3 flex-wrap">
                <span className="font-display font-bold text-[clamp(2.4rem,5vw,3.6rem)] leading-none" style={{ color: "var(--accent-red-deep)" }}>
                  {eoi.amountLabel}
                </span>
                {eoi.refundable && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                    <ShieldCheck size={12} /> Refundable
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-foreground/60">{eoi.refundNote}</p>

              {/* Urgency */}
              <div className="mt-7 p-4 rounded-xl bg-[oklch(0.97_0.02_25)] border border-[oklch(0.9_0.04_25)]">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
                    <Zap size={13} style={{ color: "var(--accent-red)" }} /> {eoi.urgencyText}
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: "var(--accent-red-deep)" }}>
                    {eoi.spotsLeft}/{eoi.spotsTotal} left
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-white overflow-hidden border border-[oklch(0.9_0.04_25)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--accent-red), var(--accent-red-deep))" }}
                  />
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/eoi"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-white font-semibold text-[13px] uppercase tracking-[0.12em] shadow-[0_10px_25px_-8px_rgba(200,40,30,0.5)] hover:shadow-[0_15px_35px_-8px_rgba(200,40,30,0.7)] hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg, var(--accent-red), var(--accent-red-deep))" }}
                >
                  {eoi.ctaPrimary}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                {eoi.videoUrl && (
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-medium text-[13px] border-2 border-[oklch(0.85_0.04_25)] text-foreground hover:bg-[oklch(0.97_0.02_25)] hover:border-[var(--accent-red)] transition"
                  >
                    <PlayCircle size={16} style={{ color: "var(--accent-red)" }} /> {eoi.ctaSecondary}
                  </button>
                )}
              </div>

              {/* Steps */}
              <div className="mt-8 grid sm:grid-cols-3 gap-3">
                {eoi.steps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="p-3.5 rounded-lg border border-[oklch(0.92_0.02_25)] bg-white"
                  >
                    <div className="font-display text-lg font-bold" style={{ color: "var(--accent-red)" }}>{s.step}</div>
                    <div className="text-[13px] font-semibold text-foreground mt-0.5">{s.title}</div>
                    <div className="text-[11.5px] text-foreground/60 mt-1 leading-snug">{s.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Benefits */}
            <div className="p-8 md:p-10 bg-[oklch(0.98_0.005_25)] border-t md:border-t-0 md:border-l border-[oklch(0.92_0.02_25)]">
              <div className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground/60 mb-4">
                What you get
              </div>
              <ul className="space-y-3.5">
                {eoi.benefits.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * i }}
                    className="flex gap-3"
                  >
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: "var(--accent-red)" }}>
                      <ShieldCheck size={13} />
                    </div>
                    <div>
                      <div className="text-[13.5px] font-semibold text-foreground">{b.title}</div>
                      <div className="text-[12px] text-foreground/65 leading-snug mt-0.5">{b.desc}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {videoOpen && embed && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white inline-flex items-center gap-1.5 text-sm"
            >
              Close <X size={16} />
            </button>
            <iframe src={embed} className="w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen title={eoi.videoTitle} />
          </div>
        </div>
      )}
    </section>
  );
}
