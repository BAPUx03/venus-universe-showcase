import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Loader2, PlayCircle, X } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { OtpModal } from "@/components/site/OtpModal";

export const Route = createFileRoute("/eoi")({
  head: () => ({
    meta: [
      { title: "EOI — Pre-Book Luxury 4 & 5 BHK Venus Universe Nehrunagar" },
      { name: "description", content: "Pay a fully refundable ₹5,00,000 EOI to lock priority allotment & pre-launch pricing at Venus Universe Nehrunagar Ahmedabad. Limited slots." },
      { name: "keywords", content: "venus universe eoi, pre booking nehrunagar, 4 bhk pre launch ahmedabad, 5 bhk pre booking, refundable eoi ahmedabad" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Pre-Book Venus Universe Nehrunagar — ₹5L Refundable EOI" },
      { property: "og:description", content: "Lock priority allotment & pre-launch pricing on luxury 4 & 5 BHK apartments in Nehrunagar, Ahmedabad." },
      { property: "og:url", content: "https://venusuniverse.in/eoi" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pre-Book Venus Universe Nehrunagar — ₹5L Refundable EOI" },
      { name: "twitter:description", content: "Lock priority allotment & pre-launch pricing on luxury 4 & 5 BHK apartments in Nehrunagar, Ahmedabad." },
    ],
    links: [{ rel: "canonical", href: "https://venusuniverse.in/eoi" }],
  }),
  component: EoiPage,
});

function ytEmbed(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=1&rel=0`;
  return url;
}

function EoiPage() {
  const { content } = useSiteContent();
  const eoi = content.eoi;
  const brand = content.brand;
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", requirement: "4 BHK", budget: "EOI Booking" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [videoOpen, setVideoOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const embed = ytEmbed(eoi.videoUrl);

  const normalizedPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (raw.trim().startsWith("+")) return `+${digits}`;
    if (digits.length === 10) return `+91${digits}`;
    return `+${digits}`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!form.first_name.trim() || !form.email.trim() || !form.phone.trim()) {
      setErr("Please fill all required fields.");
      return;
    }
    setOtpOpen(true);
  };

  const onVerified = async () => {
    setOtpOpen(false);
    setSubmitting(true);
    try {
      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || "—",
        email: form.email.trim(),
        phone: normalizedPhone(form.phone),
        requirement: form.requirement,
        budget: `EOI ${eoi.amountLabel}`,
        source: "eoi_form",
      };
      const { error } = await supabase.from("leads").insert(payload);
      if (error) throw error;
      void notifyLead(payload);
      setDone(true);
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[oklch(0.985_0.005_25)] to-white">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container-luxe py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition">
            <ArrowLeft size={16} /> Back to {brand.name}
          </Link>
          <div className="inline-flex items-center gap-1.5 text-[11px] text-foreground/60">
            <Lock size={12} /> Secure Checkout
          </div>
        </div>
      </header>

      <main className="container-luxe py-10 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase text-white" style={{ background: "var(--accent-red)" }}>
            {eoi.eyebrow}
          </span>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] mt-4 text-foreground">
            {eoi.title}
          </h1>
          <p className="mt-4 text-base text-foreground/65">{eoi.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-[0_15px_50px_-15px_rgba(180,40,30,0.18)] border border-[oklch(0.92_0.02_25)] p-7 md:p-9"
          >
            {done ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h2 className="font-display text-2xl font-bold mt-5 text-foreground">Thank you!</h2>
                <p className="mt-2 text-foreground/65 text-sm">
                  Our advisor will call you shortly to complete the EOI payment of <strong>{eoi.amountLabel}</strong> and confirm your priority allotment.
                </p>
                <div className="mt-6 p-4 rounded-lg bg-[oklch(0.97_0.02_25)] border border-[oklch(0.9_0.04_25)] text-[12.5px] text-foreground/70">
                  Online payment gateway will be enabled shortly. For now, our team will guide you through the secure payment process over a call.
                </div>
                <Link to="/" className="mt-6 inline-block text-[13px] font-semibold underline text-foreground/70 hover:text-foreground">
                  ← Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="font-display text-xl font-bold text-foreground">Reserve Your Spot</h2>
                <p className="text-[13px] text-foreground/60 -mt-2">Fill your details — we'll guide you through the secure EOI payment.</p>

                <div className="grid grid-cols-2 gap-3">
                  <Input label="First Name *" value={form.first_name} onChange={(v) => setForm({ ...form, first_name: v })} />
                  <Input label="Last Name" value={form.last_name} onChange={(v) => setForm({ ...form, last_name: v })} />
                </div>
                <Input label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Input label="Phone *" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <div>
                  <label htmlFor="eoi-configuration" className="block text-[11px] uppercase tracking-[0.18em] text-foreground/60 font-semibold mb-1.5">Configuration</label>
                  <select
                    id="eoi-configuration"
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-md border border-[oklch(0.9_0.02_25)] text-sm text-foreground bg-white focus:outline-none focus:border-[var(--accent-red)] transition"
                  >
                    <option>4 BHK</option>
                    <option>5 BHK</option>
                    <option>4 & 5 BHK — Either</option>
                    <option>Penthouse</option>
                  </select>
                </div>

                {err && <div className="text-[12.5px] text-destructive bg-destructive/10 border border-destructive/30 px-3 py-2 rounded">{err}</div>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md text-white font-semibold text-[13px] uppercase tracking-[0.14em] shadow-[0_12px_28px_-10px_rgba(200,40,30,0.55)] hover:shadow-[0_18px_38px_-10px_rgba(200,40,30,0.7)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, var(--accent-red), var(--accent-red-deep))" }}
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Lock size={14} />}
                  {submitting ? "Securing your spot…" : `Pay ${eoi.amountLabel} EOI`}
                </button>
                <p className="text-[11px] text-center text-foreground/50">
                  By proceeding you agree to our terms. Payment is 100% refundable.
                </p>
              </form>
            )}
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-[oklch(0.99_0.01_25)] to-white rounded-2xl border border-[oklch(0.92_0.02_25)] p-7">
              <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/55 font-semibold">EOI Amount</div>
              <div className="font-display text-4xl font-bold mt-1" style={{ color: "var(--accent-red-deep)" }}>{eoi.amountLabel}</div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                <ShieldCheck size={12} /> {eoi.refundNote}
              </div>

              <div className="mt-6 space-y-3">
                {eoi.benefits.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex gap-2.5">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />
                    <div>
                      <div className="text-[13px] font-semibold text-foreground">{b.title}</div>
                      <div className="text-[11.5px] text-foreground/55 leading-snug">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {embed && eoi.videoEnabled && (
                <button
                  onClick={() => setVideoOpen(true)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md text-[12.5px] font-semibold border-2 border-[oklch(0.85_0.04_25)] text-foreground hover:bg-[oklch(0.97_0.02_25)] hover:border-[var(--accent-red)] transition"
                >
                  <PlayCircle size={15} style={{ color: "var(--accent-red)" }} /> {eoi.videoTitle}
                </button>
              )}
            </div>

            {/* Watch: What is EOI? — admin-controlled video card */}
            {embed && eoi.videoEnabled && (
              <div className="bg-gradient-to-br from-[oklch(0.99_0.01_25)] to-white rounded-2xl border border-[oklch(0.92_0.02_25)] p-6 overflow-hidden">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase text-white" style={{ background: "var(--accent-red)" }}>
                  {eoi.videoEyebrow}
                </span>
                <h3 className="font-display text-xl font-bold mt-3 text-foreground">{eoi.videoHeading}</h3>
                <p className="mt-2 text-[13px] text-foreground/65 leading-relaxed">{eoi.videoDescription}</p>

                {/* Thumbnail / play preview */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="mt-4 group relative block w-full aspect-video rounded-xl overflow-hidden border border-[oklch(0.9_0.03_25)] bg-black/90"
                  aria-label={eoi.videoCtaText}
                >
                  <iframe
                    src={embed.replace("autoplay=1", "autoplay=0")}
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-90 group-hover:opacity-100 transition"
                    title={eoi.videoTitle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end justify-center pb-4 group-hover:from-black/40 transition">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 text-foreground font-semibold text-[12px] shadow-lg group-hover:scale-105 transition">
                      <PlayCircle size={16} style={{ color: "var(--accent-red)" }} /> {eoi.videoCtaText}
                    </div>
                  </div>
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-[oklch(0.92_0.02_25)] p-5 flex items-start gap-3">
              <Lock size={16} className="shrink-0 mt-0.5 text-foreground/60" />
              <div className="text-[12px] text-foreground/65 leading-relaxed">
                Your information is encrypted and secure. Payment will be processed via certified payment gateway. EOI is fully refundable as per terms.
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {videoOpen && embed && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideoOpen(false)} className="absolute -top-12 right-0 text-white/80 hover:text-white inline-flex items-center gap-1.5 text-sm">
              Close <X size={16} />
            </button>
            <iframe src={embed} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen title={eoi.videoTitle} />
          </div>
        </div>
      )}

      <OtpModal
        open={otpOpen}
        phone={normalizedPhone(form.phone)}
        onClose={() => setOtpOpen(false)}
        onVerified={onVerified}
      />
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  const id = `eoi-${label.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] uppercase tracking-[0.18em] text-foreground/60 font-semibold mb-1.5">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-3 rounded-md border border-[oklch(0.9_0.02_25)] text-sm text-foreground bg-white focus:outline-none focus:border-[var(--accent-red)] transition"
      />
    </div>
  );
}
