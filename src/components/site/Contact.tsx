import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { Section } from "./Section";
import { OtpModal } from "./OtpModal";
import type { SiteContent } from "@/content/defaultContent";

const schema = z.object({
  first_name: z.string().trim().min(1).max(60),
  last_name: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "10-digit number"),
  message: z.string().trim().max(800).optional(),
});

export function Contact({ contact }: { contact: SiteContent["contact"] }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  type Lead = { first_name: string; last_name: string; email: string; phone: string; requirement: string; budget: string; source: string };
  const [pendingLead, setPendingLead] = useState<Lead | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setErr("");
    const lead = {
      requirement: "Contact Form",
      budget: "—",
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      email: parsed.data.email,
      phone: `+91${parsed.data.phone}`,
      source: "contact_form",
    };
    setPendingLead(lead);
    setOtpOpen(true);
  };

  const onVerified = async () => {
    if (!pendingLead) return;
    setOtpOpen(false);
    setStatus("sending");
    const { error } = await supabase.from("leads").insert(pendingLead);
    if (error) {
      setStatus("error");
      setErr("Something went wrong. Please call us directly.");
      return;
    }
    void notifyLead(pendingLead);
    setStatus("sent");
    setForm({ first_name: "", last_name: "", email: "", phone: "", message: "" });
    setPendingLead(null);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Begin the <span className="text-gradient-gold italic">conversation.</span></>}
      className="bg-charcoal"
    >
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-5">
          <ContactRow icon={<Phone size={16} />} label="Phone" value={contact.phone} href={`tel:${contact.phone.replace(/\s/g, "")}`} />
          <ContactRow icon={<Mail size={16} />} label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactRow icon={<MapPin size={16} />} label="Sales Gallery" value={contact.address} />
          <div className="luxe-border bg-card/60 p-5">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">Visit Hours</p>
            <p className="text-ivory/85 text-sm leading-relaxed">
              Open all 7 days · 10:00 AM – 8:00 PM
            </p>
            <div className="mt-3 inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10.5px] uppercase tracking-[0.22em] text-gold">
                Site Visits — By Appointment Only
              </span>
            </div>
            <p className="mt-2 text-[12px] text-ivory/60 leading-relaxed">
              Kindly schedule a private viewing in advance — our concierge will confirm your slot within 2 hours.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="lg:col-span-3 bg-card/70 luxe-border p-6 md:p-9 grid sm:grid-cols-2 gap-3">
          <Input label="First Name" value={form.first_name} onChange={(v) => setForm({ ...form, first_name: v })} />
          <Input label="Last Name" value={form.last_name} onChange={(v) => setForm({ ...form, last_name: v })} />
          <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Input label="Phone (10-digit)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v.replace(/\D/g, "").slice(0, 10) })} />
          <label className="sm:col-span-2 block">
            <span className="block text-[10.5px] uppercase tracking-[0.22em] text-ivory/60 mb-1.5">Message</span>
            <textarea
              rows={4}
              value={form.message}
              maxLength={800}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-input/60 border border-border px-3.5 py-3 text-sm text-ivory focus:outline-none focus:border-gold transition resize-none"
            />
          </label>
          {err && <div className="sm:col-span-2 text-[12px] text-destructive">{err}</div>}
          {status === "sent" ? (
            <div className="sm:col-span-2 py-3.5 text-center bg-gold/15 border border-gold/40 text-gold text-[12.5px] uppercase tracking-[0.22em]">
              Thank you — our team will be in touch shortly.
            </div>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 py-3.5 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[12px] shadow-gold hover:brightness-110 disabled:opacity-60 transition"
            >
              <Send size={14} /> {status === "sending" ? "Sending…" : "Send Enquiry"}
            </button>
          )}
        </form>
      </div>
      <OtpModal
        open={otpOpen}
        phone={pendingLead?.phone ?? ""}
        onClose={() => setOtpOpen(false)}
        onVerified={onVerified}
      />
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 p-5 luxe-border bg-card/60 hover:bg-card transition">
      <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 text-gold border border-gold/30">
        {icon}
      </span>
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-ivory/90 text-sm leading-relaxed">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10.5px] uppercase tracking-[0.22em] text-ivory/60 mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-input/60 border border-border px-3.5 py-3 text-sm text-ivory focus:outline-none focus:border-gold transition"
      />
    </label>
  );
}
