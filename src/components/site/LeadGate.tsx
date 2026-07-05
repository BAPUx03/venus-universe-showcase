import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { notifyLead } from "@/lib/notifyLead";
import { ChevronDown } from "lucide-react";
import { OtpModal } from "./OtpModal";

const STORAGE_KEY = "venus_lead_submitted_v1";

const REQUIREMENTS = [
  "4 BHK",
  "5 BHK",
  "Penthouse",
  "Duplex",
  "Jodi Apartments",
  "Investment",
  "Site Visit",
];
const BUDGETS = [
  "₹2 Cr – ₹3 Cr",
  "₹4 Cr – ₹5 Cr",
  "₹6 Cr – ₹7 Cr",
  "₹8 Cr – ₹10 Cr",
  "₹10 Cr+",
];

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 IN +91" },
  { code: "+1", label: "🇺🇸 US +1" },
  { code: "+44", label: "🇬🇧 UK +44" },
  { code: "+61", label: "🇦🇺 AU +61" },
  { code: "+971", label: "🇦🇪 AE +971" },
  { code: "+966", label: "🇸🇦 SA +966" },
  { code: "+65", label: "🇸🇬 SG +65" },
  { code: "+60", label: "🇲🇾 MY +60" },
  { code: "+1", label: "🇨🇦 CA +1" },
  { code: "+49", label: "🇩🇪 DE +49" },
  { code: "+33", label: "🇫🇷 FR +33" },
  { code: "+39", label: "🇮🇹 IT +39" },
  { code: "+34", label: "🇪🇸 ES +34" },
  { code: "+31", label: "🇳🇱 NL +31" },
  { code: "+41", label: "🇨🇭 CH +41" },
  { code: "+46", label: "🇸🇪 SE +46" },
  { code: "+47", label: "🇳🇴 NO +47" },
  { code: "+81", label: "🇯🇵 JP +81" },
  { code: "+82", label: "🇰🇷 KR +82" },
  { code: "+86", label: "🇨🇳 CN +86" },
  { code: "+852", label: "🇭🇰 HK +852" },
  { code: "+64", label: "🇳🇿 NZ +64" },
  { code: "+27", label: "🇿🇦 ZA +27" },
  { code: "+254", label: "🇰🇪 KE +254" },
  { code: "+234", label: "🇳🇬 NG +234" },
  { code: "+880", label: "🇧🇩 BD +880" },
  { code: "+94", label: "🇱🇰 LK +94" },
  { code: "+977", label: "🇳🇵 NP +977" },
  { code: "+92", label: "🇵🇰 PK +92" },
  { code: "+974", label: "🇶🇦 QA +974" },
  { code: "+973", label: "🇧🇭 BH +973" },
  { code: "+965", label: "🇰🇼 KW +965" },
  { code: "+968", label: "🇴🇲 OM +968" },
];

const schema = z.object({
  requirement: z.string().min(1, "Required"),
  budget: z.string().min(1, "Required"),
  first_name: z.string().trim().min(1, "Required").max(60),
  last_name: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Invalid email").max(120),
  country_code: z.string().min(1, "Required"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{6,15}$/, "Enter a valid number"),
});

type FormState = z.infer<typeof schema>;

export function LeadGate({ mode = "site" }: { mode?: "site" | "coming_soon" }) {
  const isComingSoon = mode === "coming_soon";
  // Open immediately on first render in coming-soon mode so there is no flash.
  const [open, setOpen] = useState(isComingSoon);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [otpOpen, setOtpOpen] = useState(false);
  type Lead = { first_name: string; last_name: string; email: string; phone: string; requirement: string; budget: string; source: string };
  const [pendingLead, setPendingLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<FormState>({
    requirement: "",
    budget: "",
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+91",
    phone: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isComingSoon) {
      // Always force open in coming-soon mode (unless already submitted this session)
      if (window.sessionStorage.getItem(STORAGE_KEY)) {
        setSubmitted(true);
      } else {
        setOpen(true);
      }
      return;
    }
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    setOpen(true);
  }, [isComingSoon]);

  useEffect(() => {
    if (!open && !submitted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, submitted]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
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
    const { country_code, phone, ...rest } = parsed.data;
    const lead: Lead = {
      ...rest,
      phone: `${country_code}${phone}`,
      source: isComingSoon ? "coming_soon" : "lead_gate",
    };
    setPendingLead(lead);
    setOtpOpen(true);
  };

  const onVerified = async () => {
    if (!pendingLead) return;
    setOtpOpen(false);
    setSubmitting(true);
    try {
      await supabase.from("leads").insert(pendingLead);
      void notifyLead(pendingLead);
    } catch {
      /* ignore */
    } finally {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      setSubmitting(false);
      setOpen(false);
      setSubmitted(false);
      setPendingLead(null);
    }
  };

  return (
    <>
      {open && (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get exclusive access"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 ${isComingSoon ? "" : "animate-fade-up"}`}
    >
      {/* Backdrop — plain opaque white, hides the site behind */}
      <div className="absolute inset-0 bg-white" />

      <div className="relative w-full max-w-[480px] sm:max-w-[520px] max-h-[95vh] overflow-y-auto bg-white border border-border rounded-xl shadow-luxe">
        <div className="px-5 py-5 sm:px-7 sm:py-6">
          <div className="text-center">
            <p className="text-[12px] sm:text-[12.5px] text-muted-foreground">
              Share your requirements &amp; get exclusive listings.
            </p>
            <div className="mt-3 relative inline-flex items-center justify-center px-2 py-1.5">
              <span
                aria-hidden
                className="absolute inset-0 rounded-full animate-pulse-ring pointer-events-none"
                style={{ background: "oklch(0.65 0.21 25 / 0.18)" }}
              />
              <span
                className="relative inline-flex items-center gap-1.5 text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] border px-2.5 py-1 rounded-full bg-white animate-appointment-loop"
                style={{ color: "var(--accent-red)", borderColor: "oklch(0.65 0.21 25 / 0.5)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-ping-dot" style={{ background: "var(--accent-red)" }} />
                Site Visits — By Appointment Only
              </span>
            </div>
          </div>

          <form onSubmit={submit} className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
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
              countryCode={form.country_code}
              onCountryChange={(v) => set("country_code", v)}
              value={form.phone}
              onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 15))}
              error={errors.phone}
            />

            <ul className="col-span-2 mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
              <li className="flex items-center gap-1"><span style={{ color: "var(--accent-red)" }}>✦</span> Instant Call Back</li>
              <li className="flex items-center gap-1"><span style={{ color: "var(--accent-red)" }}>✦</span> Floor Plans</li>
              <li className="flex items-center gap-1"><span style={{ color: "var(--accent-red)" }}>✦</span> Priority Visit</li>
            </ul>

            <button
              type="submit"
              disabled={submitting}
              className="col-span-2 mt-1 py-3 rounded-md text-white font-semibold tracking-[0.1em] uppercase text-[12.5px] shadow-gold hover:brightness-110 disabled:opacity-60 transition"
              style={{ background: "var(--accent-red)" }}
            >
              {submitting ? "Submitting…" : "Get Exclusive Access"}
            </button>

            <p className="col-span-2 text-[10px] text-muted-foreground/80 text-center leading-snug">
              By submitting, you agree to receive property updates via call, SMS &amp; email.
            </p>
          </form>
        </div>
      </div>
    </div>
      )}
      {submitted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Successfully enrolled"
          className="fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center px-6 text-center"
        >
          <h1
            className="font-display font-black tracking-[-0.04em] text-foreground leading-none animate-cs-reveal"
            style={{ fontSize: "clamp(2.75rem, 11vw, 9rem)" }}
          >
            COMING SOON
          </h1>
          <p
            className="mt-8 text-[clamp(1rem,2.4vw,1.5rem)] font-semibold tracking-[0.2em] uppercase animate-cs-rise"
            style={{ color: "var(--accent-red)", animationDelay: "0.5s" }}
          >
            You're Successfully Enrolled
          </p>
          <p
            className="mt-4 max-w-xl text-[clamp(0.85rem,1.6vw,1.05rem)] text-muted-foreground leading-relaxed animate-cs-rise"
            style={{ animationDelay: "0.75s" }}
          >
            Thank you for joining us. We'll notify you as soon as the project goes live.
          </p>
        </div>
      )}
      <OtpModal
        open={otpOpen}
        phone={pendingLead?.phone ?? ""}
        onClose={() => setOtpOpen(false)}
        onVerified={onVerified}
      />
    </>
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
        } px-2.5 py-2 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-[color:var(--accent-red)] focus:ring-1 focus:ring-[color:var(--accent-red)] transition`}
      />
      {error && <span className="block mt-0.5 text-[10px] text-destructive">{error}</span>}
    </label>
  );
}

function PhoneField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  countryCode: string;
  onCountryChange: (v: string) => void;
  error?: string;
}) {
  return (
    <label className="block col-span-2 sm:col-span-1">
      <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1">{props.label}</span>
      <div
        className={`flex items-stretch w-full bg-input border rounded-md overflow-hidden ${
          props.error ? "border-destructive" : "border-border"
        } focus-within:border-[color:var(--accent-red)] focus-within:ring-1 focus-within:ring-[color:var(--accent-red)] transition`}
      >
        <select
          value={props.countryCode}
          onChange={(e) => props.onCountryChange(e.target.value)}
          className="px-1.5 text-[11.5px] text-foreground/80 border-r border-border bg-muted focus:outline-none max-w-[78px]"
        >
          {COUNTRY_CODES.map((c, i) => (
            <option key={`${c.label}-${i}`} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          inputMode="numeric"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="9876543210"
          className="flex-1 min-w-0 bg-transparent px-2.5 py-2 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
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
        } px-2.5 py-2 text-[12px] text-left transition ${value ? "text-foreground" : "text-muted-foreground/70"}`}
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
