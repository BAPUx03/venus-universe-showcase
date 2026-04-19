import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown } from "lucide-react";

const STORAGE_KEY = "venus_lead_submitted_v1";

const REQUIREMENTS = ["4 BHK Residence", "5 BHK Penthouse", "Investor Enquiry", "Just Exploring"];
const BUDGETS = ["₹ 5 – 8 Cr", "₹ 8 – 12 Cr", "₹ 12 – 18 Cr", "₹ 18 Cr +"];

const schema = z.object({
  requirement: z.string().min(1, "Required"),
  budget: z.string().min(1, "Required"),
  first_name: z.string().trim().min(1, "Required").max(60),
  last_name: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a 10-digit number"),
});

type FormState = z.infer<typeof schema>;

export function LeadGate() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [form, setForm] = useState<FormState>({
    requirement: "",
    budget: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => setOpen(true), 5000);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("leads").insert({
        ...parsed.data,
        phone: `+91${parsed.data.phone}`,
        source: "lead_gate",
      });
      window.localStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
    } catch {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get exclusive access"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fade-up"
    >
      {/* Strong frosted backdrop — no close handler */}
      <div className="absolute inset-0 bg-charcoal-deep/80 backdrop-blur-2xl" />

      <div className="relative w-full max-w-[420px] bg-card border border-border luxe-border shadow-luxe">
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="text-center">
            <span className="eyebrow text-[9px]">By Invitation</span>
            <h2 className="mt-1.5 font-display text-[19px] sm:text-[22px] text-ivory leading-[1.15]">
              Step inside the <span className="text-gradient-gold italic">Venus Universe</span>
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Private pricing, floor plans &amp; sales gallery invite.
            </p>
          </div>

          <form onSubmit={submit} className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Select
              label="Requirement"
              value={form.requirement}
              onChange={(v) => set("requirement", v)}
              options={REQUIREMENTS}
              error={errors.requirement}
            />
            <Select
              label="Budget"
              value={form.budget}
              onChange={(v) => set("budget", v)}
              options={BUDGETS}
              error={errors.budget}
            />
            <Field
              label="First Name"
              value={form.first_name}
              onChange={(v) => set("first_name", v)}
              error={errors.first_name}
            />
            <Field
              label="Last Name"
              value={form.last_name}
              onChange={(v) => set("last_name", v)}
              error={errors.last_name}
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => set("email", v)}
              error={errors.email}
            />
            <PhoneField
              label="Phone"
              value={form.phone}
              onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))}
              error={errors.phone}
            />

            <button
              type="submit"
              disabled={submitting}
              className="sm:col-span-2 mt-1 py-2.5 bg-gradient-gold text-charcoal-deep font-semibold tracking-[0.2em] uppercase text-[11px] shadow-gold hover:brightness-110 disabled:opacity-60 transition"
            >
              {submitting ? "Submitting…" : "Get Exclusive Access"}
            </button>

            <p className="sm:col-span-2 text-[9.5px] text-muted-foreground/80 text-center leading-relaxed">
              By submitting, you consent to be contacted by Venus Universe and our authorised partners.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-input/60 border ${
          error ? "border-destructive" : "border-border"
        } px-3 py-2.5 text-[13px] text-ivory placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold transition`}
      />
      {error && <span className="block mt-0.5 text-[10px] text-destructive">{error}</span>}
    </label>
  );
}

function PhoneField(props: { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 mb-1">{props.label}</span>
      <div
        className={`flex items-stretch w-full bg-input/60 border ${
          props.error ? "border-destructive" : "border-border"
        } focus-within:border-gold transition`}
      >
        <span className="px-2.5 flex items-center text-[12.5px] text-ivory/70 border-r border-border bg-charcoal-soft/50">
          +91
        </span>
        <input
          inputMode="numeric"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="98000 00000"
          className="flex-1 bg-transparent px-3 py-2.5 text-[13px] text-ivory placeholder:text-muted-foreground/60 focus:outline-none"
        />
      </div>
      {props.error && <span className="block mt-0.5 text-[10px] text-destructive">{props.error}</span>}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="block relative">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 mb-1">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={`w-full flex items-center justify-between bg-input/60 border ${
          error ? "border-destructive" : open ? "border-gold" : "border-border"
        } px-3 py-2.5 text-[13px] text-left transition ${value ? "text-ivory" : "text-muted-foreground/70"}`}
      >
        <span className="truncate">{value || "Select"}</span>
        <ChevronDown
          size={14}
          className={`text-gold transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute left-0 right-0 top-full mt-1 z-50 origin-top transition-all ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-popover border border-border shadow-luxe max-h-48 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(o);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[13px] hover:bg-gold/10 hover:text-gold transition ${
                value === o ? "text-gold" : "text-ivory/85"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
      {error && <span className="block mt-0.5 text-[10px] text-destructive">{error}</span>}
    </div>
  );
}
