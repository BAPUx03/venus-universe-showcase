import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown } from "lucide-react";

const STORAGE_KEY = "venus_lead_submitted_v1";

const REQUIREMENTS = [
  "4 BHK",
  "5 BHK",
  "Penthouse",
  "Duplex",
  "Villa / Bungalow",
  "Investment",
  "Site Visit",
];
const BUDGETS = [
  "₹3 Cr – ₹5 Cr",
  "₹5 Cr – ₹7 Cr",
  "₹7 Cr – ₹10 Cr",
  "₹10 Cr – ₹15 Cr",
  "₹15 Cr+",
  "Need Assistance",
];

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 animate-fade-up"
    >
      {/* Strong frosted backdrop — no close handler */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xl" />

      <div className="relative w-full max-w-[400px] bg-white border border-border rounded-lg shadow-luxe">
        <div className="px-3.5 py-3 sm:px-5 sm:py-4">
          <div className="text-center">
            <span className="eyebrow text-[8.5px]">Exclusive Access</span>
            <h2 className="mt-1 font-display font-semibold text-[16px] sm:text-[19px] text-foreground leading-[1.15]">
              Find Your <span style={{ color: "var(--accent-red)" }}>Dream Property</span>
            </h2>
            <p className="mt-0.5 text-[10.5px] text-muted-foreground">
              Share your requirements &amp; get exclusive listings.
            </p>
            <p
              className="mt-1 inline-block text-[8.5px] uppercase tracking-[0.2em] border px-1.5 py-0.5 rounded"
              style={{ color: "var(--accent-red)", borderColor: "oklch(0.65 0.21 25 / 0.4)" }}
            >
              Site Visits — By Appointment Only
            </p>
          </div>

          <form onSubmit={submit} className="mt-2.5 grid grid-cols-2 gap-x-2 gap-y-1.5">
            <Select
              label="Requirement"
              placeholder="Select Requirement"
              value={form.requirement}
              onChange={(v) => set("requirement", v)}
              options={REQUIREMENTS}
              error={errors.requirement}
            />
            <Select
              label="Budget (INR)"
              placeholder="Select Budget"
              value={form.budget}
              onChange={(v) => set("budget", v)}
              options={BUDGETS}
              error={errors.budget}
            />
            <Field
              label="First Name"
              placeholder="First Name"
              value={form.first_name}
              onChange={(v) => set("first_name", v)}
              error={errors.first_name}
            />
            <Field
              label="Last Name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(v) => set("last_name", v)}
              error={errors.last_name}
            />
            <Field
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(v) => set("email", v)}
              error={errors.email}
            />
            <PhoneField
              label="Phone Number"
              value={form.phone}
              onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))}
              error={errors.phone}
            />

            <ul className="col-span-2 mt-0.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground">
              <li className="flex items-center gap-1"><span style={{ color: "var(--accent-red)" }}>✦</span> Instant Call Back</li>
              <li className="flex items-center gap-1"><span style={{ color: "var(--accent-red)" }}>✦</span> Floor Plans</li>
              <li className="flex items-center gap-1"><span style={{ color: "var(--accent-red)" }}>✦</span> Priority Visit</li>
            </ul>

            <button
              type="submit"
              disabled={submitting}
              className="col-span-2 mt-0.5 py-2.5 rounded-md text-white font-semibold tracking-[0.1em] uppercase text-[11.5px] shadow-gold hover:brightness-110 disabled:opacity-60 transition"
              style={{ background: "var(--accent-red)" }}
            >
              {submitting ? "Submitting…" : "Get Exclusive Access"}
            </button>

            <p className="col-span-2 text-[9px] text-muted-foreground/80 text-center leading-snug">
              By submitting, you agree to receive property updates via call, SMS &amp; email.
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-input border rounded-md ${
          error ? "border-destructive" : "border-border"
        } px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[color:var(--accent-red)] focus:ring-1 focus:ring-[color:var(--accent-red)] transition`}
      />
      {error && <span className="block mt-0.5 text-[10px] text-destructive">{error}</span>}
    </label>
  );
}

function PhoneField(props: { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <label className="block">
      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1">{props.label}</span>
      <div
        className={`flex items-stretch w-full bg-input border rounded-md overflow-hidden ${
          props.error ? "border-destructive" : "border-border"
        } focus-within:border-[color:var(--accent-red)] focus-within:ring-1 focus-within:ring-[color:var(--accent-red)] transition`}
      >
        <span className="px-2.5 flex items-center text-[12.5px] text-foreground/70 border-r border-border bg-muted">
          +91
        </span>
        <input
          inputMode="numeric"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="9876543210"
          className="flex-1 bg-transparent px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="block relative">
      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1">{label}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={`w-full flex items-center justify-between bg-input border rounded-md ${
          error ? "border-destructive" : open ? "border-[color:var(--accent-red)] ring-1 ring-[color:var(--accent-red)]" : "border-border"
        } px-3 py-2.5 text-[13px] text-left transition ${value ? "text-foreground" : "text-muted-foreground/70"}`}
      >
        <span className="truncate">{value || placeholder || "Select"}</span>
        <ChevronDown
          size={14}
          style={{ color: "var(--accent-red)" }}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute left-0 right-0 top-full mt-1 z-50 origin-top transition-all ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-border rounded-md shadow-luxe max-h-48 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(o);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-[13px] hover:bg-muted hover:text-[color:var(--accent-red)] transition ${
                value === o ? "text-[color:var(--accent-red)] font-medium" : "text-foreground/85"
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
