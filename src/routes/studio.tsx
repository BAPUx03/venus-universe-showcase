import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SiteContent } from "@/content/defaultContent";
import { saveSiteContentKey, useSiteContent } from "@/hooks/useSiteContent";
import { Upload, Save, ArrowLeft, Loader2, Plus, Trash2, LogOut, Image as ImageIcon } from "lucide-react";

const ADMIN_EMAIL = "pruthviraj.admin@example.com";
const ADMIN_PASSWORD = "Pruthvi!01";
const AUTH_KEY = "venus_admin_auth_v1";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Admin · Venus Universe" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Studio,
});

function Studio() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <form
          method="post"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const emailVal = String(fd.get("email") ?? "").trim().toLowerCase();
            const passVal = String(fd.get("password") ?? "");
            if (emailVal === ADMIN_EMAIL && passVal === ADMIN_PASSWORD) {
              sessionStorage.setItem(AUTH_KEY, "1");
              setErr("");
              setAuthed(true);
            } else {
              setErr("Invalid email or password.");
            }
          }}
          className="w-full max-w-sm bg-card luxe-border p-8"
        >
          <span className="eyebrow">Admin Login</span>
          <h1 className="font-display text-2xl mt-2 text-ivory">Venus Universe</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage the site.</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="username"
            required
            className="mt-5 w-full bg-input/60 border border-border px-3.5 py-3 text-sm text-ivory focus:outline-none focus:border-gold"
          />
          <input
            type="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="mt-3 w-full bg-input/60 border border-border px-3.5 py-3 text-sm text-ivory focus:outline-none focus:border-gold"
          />
          {err && <div className="mt-2 text-[12px] text-destructive">{err}</div>}
          <button type="submit" className="mt-4 w-full py-3 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[12px] shadow-gold cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return <AdminPanel onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

const SECTIONS = [
  { key: "seo", label: "SEO & Robots" },
  { key: "brand", label: "Brand & RERA" },
  { key: "contact", label: "Contact & Map" },
  { key: "hero", label: "Hero" },
  { key: "about", label: "About + Stats" },
  { key: "highlights", label: "Highlights" },
  { key: "eoi", label: "EOI / Book Slot" },
  { key: "masterPlan", label: "Master Plan" },
  { key: "residences", label: "Residences" },
  { key: "amenities", label: "Amenities" },
  { key: "location", label: "Location & Nearby" },
  { key: "gallery", label: "Gallery" },
  { key: "brochure", label: "Brochure" },
  { key: "trust", label: "Testimonials & Awards" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

/** Recursively guarantee that `value` has the same shape as `defaults`.
 *  - Missing keys are filled from defaults.
 *  - Wrong types (e.g. saved string where default is array/object) are replaced with defaults.
 *  - Arrays of objects: each item is shape-merged against the first default item. */
function ensureShape<T>(_section: SectionKey, value: unknown, defaults?: unknown): T {
  // First call: look up defaults from defaultContent for this section.
  const def = defaults === undefined ? (defaultContent as Record<string, unknown>)[_section] : defaults;
  if (Array.isArray(def)) {
    if (!Array.isArray(value)) return structuredClone(def) as T;
    const template = def[0];
    if (template && typeof template === "object" && !Array.isArray(template)) {
      return value.map((item) => ensureShape(_section, item, template)) as T;
    }
    return value as T;
  }
  if (def && typeof def === "object") {
    const out: Record<string, unknown> = {};
    const v = (value && typeof value === "object" && !Array.isArray(value)) ? (value as Record<string, unknown>) : {};
    for (const k of Object.keys(def as Record<string, unknown>)) {
      const dv = (def as Record<string, unknown>)[k];
      out[k] = k in v ? ensureShape(_section, v[k], dv) : structuredClone(dv);
    }
    // Preserve any extra keys the user may have saved
    for (const k of Object.keys(v)) if (!(k in out)) out[k] = v[k];
    return out as T;
  }
  return (value === undefined || value === null ? def : value) as T;
}

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const { content, loading } = useSiteContent();
  const [active, setActive] = useState<SectionKey>("hero");
  const [tab, setTab] = useState<"content" | "leads">("content");
  const [draft, setDraft] = useState<unknown>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [leads, setLeads] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (loading) return;
    // Ensure draft always has the full default structure merged with current content.
    // Prevents editors from crashing if the saved DB row is missing arrays/keys.
    setDraft(structuredClone(ensureShape(active, content[active])));
    setSavedAt(null);
  }, [active, loading, content]);

  useEffect(() => {
    if (tab !== "leads") return;
    (async () => {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      setLeads(data ?? []);
    })();
  }, [tab]);

  const save = async () => {
    if (draft === null) return;
    setSaving(true);
    try {
      await saveSiteContentKey(active, draft);
      setSavedAt(new Date().toLocaleTimeString());
    } catch (e) {
      alert("Save failed: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    if (!confirm("Reset this section to defaults? Your edits will be lost.")) return;
    setDraft(structuredClone(defaultContent[active]));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-charcoal-deep/95 backdrop-blur-xl border-b border-border">
        <div className="container-luxe py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-ivory/80 hover:text-gold transition" aria-label="Back to site">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display text-lg text-ivory">
              Venus <span className="text-gradient-gold italic">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <SiteModeToggle />
            <button
              onClick={() => setTab("content")}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] border transition ${
                tab === "content" ? "border-gold text-gold" : "border-border text-ivory/70 hover:text-gold"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setTab("leads")}
              className={`px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] border transition ${
                tab === "leads" ? "border-gold text-gold" : "border-border text-ivory/70 hover:text-gold"
              }`}
            >
              Leads
            </button>
            <button
              onClick={onLogout}
              className="ml-2 inline-flex items-center gap-1.5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] border border-border text-ivory/70 hover:text-destructive hover:border-destructive transition"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </header>

      {tab === "content" ? (
        <div className="container-luxe py-8 grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`w-full text-left px-4 py-2.5 text-sm border-l-2 transition ${
                  active === s.key
                    ? "border-gold bg-card text-ivory"
                    : "border-transparent text-ivory/70 hover:text-gold hover:bg-card/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </aside>

          <main className="bg-card luxe-border p-5 md:p-7">
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div>
                <span className="eyebrow">Editing</span>
                <h2 className="font-display text-2xl text-ivory mt-1">
                  {SECTIONS.find((s) => s.key === active)?.label}
                </h2>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Edit fields below. Click Save to publish — changes appear live on the site.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={reset}
                  className="px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] border border-border hover:border-gold hover:text-gold transition"
                >
                  Reset
                </button>
                <button
                  onClick={save}
                  disabled={saving || draft === null}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.22em] bg-gradient-gold text-charcoal-deep font-semibold disabled:opacity-50"
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  Save
                </button>
              </div>
            </div>
            {savedAt && (
              <div className="text-[11px] text-gold mb-4 px-3 py-2 border border-gold/30 bg-gold/5">
                ✓ Saved at {savedAt}. <Link to="/" className="underline">View site</Link> (refresh to see changes).
              </div>
            )}

            {loading || draft === null ? (
              <div className="py-20 text-center text-muted-foreground"><Loader2 className="inline animate-spin" /> Loading…</div>
            ) : (
              <SectionEditor section={active} value={draft} onChange={setDraft} />
            )}
          </main>
        </div>
      ) : (
        <LeadsTab leads={leads} />
      )}
    </div>
  );
}

/* -------------------- Section Editor Router -------------------- */

function SectionEditor({ section, value, onChange }: { section: SectionKey; value: unknown; onChange: (v: unknown) => void }) {
  switch (section) {
    case "seo": return <SeoEditor value={value as SiteContent["seo"]} onChange={onChange} />;
    case "brand": return <BrandEditor value={value as SiteContent["brand"]} onChange={onChange} />;
    case "contact": return <ContactEditor value={value as SiteContent["contact"]} onChange={onChange} />;
    case "hero": return <HeroEditor value={value as SiteContent["hero"]} onChange={onChange} />;
    case "about": return <AboutEditor value={value as SiteContent["about"]} onChange={onChange} />;
    case "highlights": return <HighlightsEditor value={value as SiteContent["highlights"]} onChange={onChange} />;
    case "eoi": return <EoiEditor value={value as SiteContent["eoi"]} onChange={onChange} />;
    case "masterPlan": return <MasterPlanEditor value={value as SiteContent["masterPlan"]} onChange={onChange} />;
    case "residences": return <ResidencesEditor value={value as SiteContent["residences"]} onChange={onChange} />;
    case "amenities": return <AmenitiesEditor value={value as SiteContent["amenities"]} onChange={onChange} />;
    case "location": return <LocationEditor value={value as SiteContent["location"]} onChange={onChange} />;
    case "gallery": return <GalleryEditor value={value as SiteContent["gallery"]} onChange={onChange} />;
    case "brochure": return <BrochureEditor value={value as SiteContent["brochure"]} onChange={onChange} />;
    case "trust": return <TrustEditor value={value as SiteContent["trust"]} onChange={onChange} />;
  }
}

/* -------------------- Reusable Inputs -------------------- */

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70 mb-1.5">{label}</div>
      {children}
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-charcoal-deep border border-border px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold"
    />
  );
}

function TextArea({ value, onChange, rows = 4, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-charcoal-deep border border-border px-3.5 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold resize-y"
    />
  );
}

function ImageField({ label, value, onChange, accept = "image/*", folder, hint }: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  folder: string;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("venus-media").upload(path, file, { upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from("venus-media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      alert("Upload failed: " + (e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const isVideo = accept.includes("video") || /\.(mp4|webm|mov)(\?|$)/i.test(value || "");

  return (
    <Field label={label} hint={hint}>
      <div className="flex gap-3 items-start">
        <div className="w-28 h-20 shrink-0 border border-border bg-charcoal-deep flex items-center justify-center overflow-hidden">
          {value ? (
            isVideo ? (
              <video src={value} className="w-full h-full object-cover" muted />
            ) : (
              <img src={value} alt="" className="w-full h-full object-cover" />
            )
          ) : (
            <ImageIcon size={22} className="text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <TextInput value={value} onChange={onChange} placeholder="https://… or upload below" />
          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] border border-border hover:border-gold hover:text-gold transition">
            {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
            {uploading ? "Uploading…" : "Upload File"}
            <input
              type="file"
              accept={accept}
              className="hidden"
              disabled={uploading}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
            />
          </label>
        </div>
      </div>
    </Field>
  );
}

function ListControls({ onAdd, onRemove, canRemove = true, addLabel = "Add Item" }: { onAdd: () => void; onRemove?: () => void; canRemove?: boolean; addLabel?: string }) {
  return (
    <div className="flex items-center gap-2">
      {onRemove && (
        <button type="button" onClick={onRemove} disabled={!canRemove}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.2em] border border-border text-destructive hover:border-destructive disabled:opacity-40 transition">
          <Trash2 size={11} /> Remove
        </button>
      )}
      <button type="button" onClick={onAdd}
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10.5px] uppercase tracking-[0.2em] border border-border text-ivory/80 hover:border-gold hover:text-gold transition">
        <Plus size={11} /> {addLabel}
      </button>
    </div>
  );
}

/* -------------------- Section Editors -------------------- */

function SeoEditor({ value, onChange }: { value: SiteContent["seo"]; onChange: (v: SiteContent["seo"]) => void }) {
  const set = <K extends keyof SiteContent["seo"]>(k: K, v: SiteContent["seo"][K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <div className="p-3 border border-gold/30 bg-gold/5 text-[12px] text-ivory/85">
        These settings control SEO for the homepage, social previews, <code className="text-gold">/robots.txt</code> and <code className="text-gold">/sitemap.xml</code>.
        Keep "Allow Indexing" ON to let Google and all bots/crawlers index the site.
      </div>
      <Field label="Site URL" hint="Your final live domain, e.g. https://venusuniverse.com">
        <TextInput value={value.siteUrl} onChange={(v) => set("siteUrl", v)} placeholder="https://yourdomain.com" />
      </Field>
      <Field label="Page Title" hint="Shown in browser tab and Google results (50-60 chars ideal)">
        <TextInput value={value.title} onChange={(v) => set("title", v)} />
      </Field>
      <Field label="Meta Description" hint="Shown under title in Google (150-160 chars ideal)">
        <TextArea value={value.description} onChange={(v) => set("description", v)} rows={3} />
      </Field>
      <Field label="Keywords" hint="Comma separated">
        <TextArea value={value.keywords} onChange={(v) => set("keywords", v)} rows={2} />
      </Field>
      <Field label="Author / Brand Name">
        <TextInput value={value.author} onChange={(v) => set("author", v)} />
      </Field>
      <Field label="Canonical URL" hint="Usually same as Site URL">
        <TextInput value={value.canonical} onChange={(v) => set("canonical", v)} />
      </Field>
      <Field label="Twitter Handle" hint="With @, e.g. @venusuniverse">
        <TextInput value={value.twitterHandle} onChange={(v) => set("twitterHandle", v)} />
      </Field>
      <ImageField label="Social Share Image (OG Image)" value={value.ogImage} onChange={(v) => set("ogImage", v)} folder="seo" hint="1200×630 recommended. Used for Facebook, LinkedIn, Twitter previews." />

      <div className="pt-4 border-t border-border">
        <span className="eyebrow">Analytics & Verification</span>
        <p className="text-[12px] text-muted-foreground mt-1 mb-4">
          Paste your IDs below — tags are auto-injected into every page. Leave blank to disable.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Google Analytics ID" hint="Format: G-XXXXXXXXXX (GA4)">
          <TextInput value={value.gaId ?? ""} onChange={(v) => set("gaId", v)} placeholder="G-XXXXXXXXXX" />
        </Field>
        <Field label="Google Tag Manager ID" hint="Format: GTM-XXXXXXX (optional)">
          <TextInput value={value.gtmId ?? ""} onChange={(v) => set("gtmId", v)} placeholder="GTM-XXXXXXX" />
        </Field>
      </div>
      <Field label="Google Search Console Verification" hint="Paste only the content value from the meta tag (not the full HTML)">
        <TextInput value={value.gscVerification ?? ""} onChange={(v) => set("gscVerification", v)} placeholder="abc123xyz..." />
      </Field>
      <Field label="Bing Webmaster Verification" hint="Paste only the content value from the meta tag">
        <TextInput value={value.bingVerification ?? ""} onChange={(v) => set("bingVerification", v)} placeholder="abc123..." />
      </Field>
      <Field label="Facebook Pixel ID" hint="Optional — for Meta Ads conversion tracking">
        <TextInput value={value.facebookPixelId ?? ""} onChange={(v) => set("facebookPixelId", v)} placeholder="1234567890" />
      </Field>

      <Field label="Allow Indexing">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value.allowIndexing !== false}
            onChange={(e) => set("allowIndexing", e.target.checked)}
            className="w-4 h-4 accent-gold"
          />
          <span className="text-sm text-ivory/85">
            Allow all search engines and bots to crawl & index (recommended)
          </span>
        </label>
        <div className="text-[11px] text-muted-foreground mt-1">
          When ON: <code className="text-gold">/robots.txt</code> serves <code>Allow: /</code> for all bots and includes the sitemap.
          When OFF: bots are told to stay out (use only during construction).
        </div>
      </Field>
    </div>
  );
}

function BrandEditor({ value, onChange }: { value: SiteContent["brand"]; onChange: (v: SiteContent["brand"]) => void }) {
  const set = (k: keyof SiteContent["brand"], v: string) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <Field label="Brand Name"><TextInput value={value.name} onChange={(v) => set("name", v)} /></Field>
      <Field label="Tagline"><TextInput value={value.tagline} onChange={(v) => set("tagline", v)} /></Field>
      <Field label="RERA Text"><TextInput value={value.rera} onChange={(v) => set("rera", v)} /></Field>
    </div>
  );
}

function ContactEditor({ value, onChange }: { value: SiteContent["contact"]; onChange: (v: SiteContent["contact"]) => void }) {
  const set = (k: keyof SiteContent["contact"], v: string) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Phone"><TextInput value={value.phone} onChange={(v) => set("phone", v)} placeholder="+91 98000 00000" /></Field>
        <Field label="WhatsApp Number" hint="Digits only, with country code (e.g. 919800000000)">
          <TextInput value={value.whatsapp} onChange={(v) => set("whatsapp", v)} placeholder="919800000000" />
        </Field>
      </div>
      <Field label="Email"><TextInput value={value.email} onChange={(v) => set("email", v)} type="email" /></Field>
      <Field label="Address"><TextArea value={value.address} onChange={(v) => set("address", v)} rows={2} /></Field>
      <Field label="Google Map Embed URL" hint="Get from Google Maps → Share → Embed a map → copy the src URL">
        <TextArea value={value.mapEmbed} onChange={(v) => set("mapEmbed", v)} rows={3} />
      </Field>
    </div>
  );
}

function HeroEditor({ value, onChange }: { value: SiteContent["hero"]; onChange: (v: SiteContent["hero"]) => void }) {
  const set = <K extends keyof SiteContent["hero"]>(k: K, v: SiteContent["hero"][K]) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <Field label="Title"><TextInput value={value.title} onChange={(v) => set("title", v)} /></Field>
      <Field label="Subtitle"><TextArea value={value.subtitle} onChange={(v) => set("subtitle", v)} rows={3} /></Field>
      <ImageField label="Hero Background Image" value={value.image as string} onChange={(v) => set("image", v as never)} folder="hero" />
      <ImageField label="Hero Video URL (optional, takes priority over image)" value={value.videoUrl ?? ""} onChange={(v) => set("videoUrl", v as never)} folder="hero" accept="video/*" hint="Upload an MP4 or paste a URL. Leave empty to use the image." />
    </div>
  );
}

function AboutEditor({ value, onChange }: { value: SiteContent["about"]; onChange: (v: SiteContent["about"]) => void }) {
  const set = <K extends keyof SiteContent["about"]>(k: K, v: SiteContent["about"][K]) => onChange({ ...value, [k]: v });
  const stats: Array<{ label: string; value: string }> = Array.isArray(value?.stats) ? (value.stats as Array<{ label: string; value: string }>) : [];
  const setStat = (i: number, k: "label" | "value", v: string) => {
    const next = stats.map((s, idx) => idx === i ? { ...s, [k]: v } : s);
    set("stats", next as never);
  };
  return (
    <div className="space-y-5">
      <Field label="Eyebrow"><TextInput value={value?.eyebrow ?? ""} onChange={(v) => set("eyebrow", v)} /></Field>
      <Field label="Title"><TextInput value={value?.title ?? ""} onChange={(v) => set("title", v)} /></Field>
      <Field label="Body"><TextArea value={value?.body ?? ""} onChange={(v) => set("body", v)} rows={5} /></Field>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">Stats</div>
          <ListControls addLabel="Add Stat" onAdd={() => set("stats", [...stats, { label: "", value: "" }] as never)} />
        </div>
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end p-3 border border-border/50">
              <Field label="Label"><TextInput value={s.label} onChange={(v) => setStat(i, "label", v)} /></Field>
              <Field label="Value"><TextInput value={s.value} onChange={(v) => setStat(i, "value", v)} /></Field>
              <button type="button" onClick={() => set("stats", stats.filter((_, idx) => idx !== i) as never)}
                className="px-2.5 py-2 border border-border text-destructive hover:border-destructive">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HighlightsEditor({ value, onChange }: { value: SiteContent["highlights"]; onChange: (v: SiteContent["highlights"]) => void }) {
  const items: Array<{ title: string; desc: string }> = Array.isArray(value) ? (value as Array<{ title: string; desc: string }>) : [];
  const set = (i: number, k: "title" | "desc", v: string) => onChange(items.map((it, idx) => idx === i ? { ...it, [k]: v } : it) as never);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">{items.length} highlights</p>
        <ListControls addLabel="Add Highlight" onAdd={() => onChange([...items, { title: "", desc: "" }] as never)} />
      </div>
      {items.map((it, i) => (
        <div key={i} className="p-4 border border-border/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold">#{i + 1}</span>
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i) as never)} className="text-destructive hover:text-destructive/70"><Trash2 size={13} /></button>
          </div>
          <Field label="Title"><TextInput value={it.title} onChange={(v) => set(i, "title", v)} /></Field>
          <Field label="Description"><TextArea value={it.desc} onChange={(v) => set(i, "desc", v)} rows={2} /></Field>
        </div>
      ))}
    </div>
  );
}

function EoiEditor({ value, onChange }: { value: SiteContent["eoi"]; onChange: (v: SiteContent["eoi"]) => void }) {
  const set = <K extends keyof SiteContent["eoi"],>(k: K, v: SiteContent["eoi"][K]) => onChange({ ...value, [k]: v });
  const benefits: Array<{ title: string; desc: string }> = Array.isArray(value?.benefits) ? value.benefits : [];
  const steps: Array<{ step: string; title: string; desc: string }> = Array.isArray(value?.steps) ? value.steps : [];
  return (
    <div className="space-y-5">
      <div className="p-3 border border-gold/30 bg-gold/5 text-[12px] text-ivory/85">
        Controls the EOI / "Secure Your Spot" section, the auto-popup, and the /eoi booking page.
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Eyebrow"><TextInput value={value.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
        <Field label="Amount Label" hint="Display string e.g. ₹ 5,00,000"><TextInput value={value.amountLabel} onChange={(v) => set("amountLabel", v)} /></Field>
      </div>
      <Field label="Section Title"><TextInput value={value.title} onChange={(v) => set("title", v)} /></Field>
      <Field label="Subtitle"><TextArea value={value.subtitle} onChange={(v) => set("subtitle", v)} rows={3} /></Field>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Amount (in rupees)" hint="Used for payment"><TextInput type="number" value={String(value.amount)} onChange={(v) => set("amount", Number(v) || 0)} /></Field>
        <Field label="Refund Note"><TextInput value={value.refundNote} onChange={(v) => set("refundNote", v)} /></Field>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Primary CTA"><TextInput value={value.ctaPrimary} onChange={(v) => set("ctaPrimary", v)} /></Field>
        <Field label="Secondary CTA (video)"><TextInput value={value.ctaSecondary} onChange={(v) => set("ctaSecondary", v)} /></Field>
      </div>
      <div className="pt-4 border-t border-border">
        <div className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">"What is EOI?" Video Card</div>
        <Field label="Enable Video Card on /eoi page">
          <label className="flex items-center gap-2 mt-1.5"><input type="checkbox" checked={value.videoEnabled ?? true} onChange={(e) => set("videoEnabled", e.target.checked)} className="w-4 h-4 accent-gold" /><span className="text-sm text-ivory/85">Show the video card & play button</span></label>
        </Field>
        <Field label="YouTube Video URL" hint="Paste full YouTube URL (e.g. https://youtube.com/watch?v=XXXX). Leave empty to hide.">
          <TextInput value={value.videoUrl} onChange={(v) => set("videoUrl", v)} placeholder="https://www.youtube.com/watch?v=..." />
        </Field>
        <div className="grid md:grid-cols-2 gap-5 mt-3">
          <Field label="Eyebrow Tag"><TextInput value={value.videoEyebrow ?? ""} onChange={(v) => set("videoEyebrow", v)} placeholder="Watch & Understand" /></Field>
          <Field label="Heading"><TextInput value={value.videoHeading ?? ""} onChange={(v) => set("videoHeading", v)} placeholder="What is EOI?" /></Field>
        </div>
        <Field label="Description"><TextArea value={value.videoDescription ?? ""} onChange={(v) => set("videoDescription", v)} rows={3} placeholder="Short description shown above the video..." /></Field>
        <div className="grid md:grid-cols-2 gap-5 mt-3">
          <Field label="Play Button CTA Text"><TextInput value={value.videoCtaText ?? ""} onChange={(v) => set("videoCtaText", v)} placeholder="▶ Play Video — What is EOI?" /></Field>
          <Field label="Modal / Tooltip Title"><TextInput value={value.videoTitle} onChange={(v) => set("videoTitle", v)} /></Field>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <Field label="Spots Total"><TextInput type="number" value={String(value.spotsTotal)} onChange={(v) => set("spotsTotal", Number(v) || 0)} /></Field>
        <Field label="Spots Left"><TextInput type="number" value={String(value.spotsLeft)} onChange={(v) => set("spotsLeft", Number(v) || 0)} /></Field>
        <Field label="Refundable">
          <label className="flex items-center gap-2 mt-1.5"><input type="checkbox" checked={value.refundable} onChange={(e) => set("refundable", e.target.checked)} className="w-4 h-4 accent-gold" /><span className="text-sm text-ivory/85">Show refundable badge</span></label>
        </Field>
      </div>
      <Field label="Urgency Text"><TextInput value={value.urgencyText} onChange={(v) => set("urgencyText", v)} /></Field>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">Benefits</div>
          <ListControls addLabel="Add Benefit" onAdd={() => set("benefits", [...benefits, { title: "", desc: "" }])} />
        </div>
        <div className="space-y-2">
          {benefits.map((b, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-end p-3 border border-border/50">
              <Field label="Title"><TextInput value={b.title} onChange={(v) => set("benefits", benefits.map((x, idx) => idx === i ? { ...x, title: v } : x))} /></Field>
              <Field label="Description"><TextInput value={b.desc} onChange={(v) => set("benefits", benefits.map((x, idx) => idx === i ? { ...x, desc: v } : x))} /></Field>
              <button type="button" onClick={() => set("benefits", benefits.filter((_, idx) => idx !== i))} className="px-2.5 py-2 border border-border text-destructive hover:border-destructive"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">3 Steps</div>
          <ListControls addLabel="Add Step" onAdd={() => set("steps", [...steps, { step: "", title: "", desc: "" }])} />
        </div>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr_2fr_auto] gap-2 items-end p-3 border border-border/50">
              <Field label="Step #"><TextInput value={s.step} onChange={(v) => set("steps", steps.map((x, idx) => idx === i ? { ...x, step: v } : x))} /></Field>
              <Field label="Title"><TextInput value={s.title} onChange={(v) => set("steps", steps.map((x, idx) => idx === i ? { ...x, title: v } : x))} /></Field>
              <Field label="Description"><TextInput value={s.desc} onChange={(v) => set("steps", steps.map((x, idx) => idx === i ? { ...x, desc: v } : x))} /></Field>
              <button type="button" onClick={() => set("steps", steps.filter((_, idx) => idx !== i))} className="px-2.5 py-2 border border-border text-destructive hover:border-destructive"><Trash2 size={13} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70 mb-3">Auto Popup (60% scroll + 30s)</div>
        <Field label="Enable Popup">
          <label className="flex items-center gap-2 mt-1.5"><input type="checkbox" checked={value.popupEnabled} onChange={(e) => set("popupEnabled", e.target.checked)} className="w-4 h-4 accent-gold" /><span className="text-sm text-ivory/85">Show EOI popup automatically</span></label>
        </Field>
        <Field label="Popup Title"><TextInput value={value.popupTitle} onChange={(v) => set("popupTitle", v)} /></Field>
        <Field label="Popup Subtitle"><TextArea value={value.popupSubtitle} onChange={(v) => set("popupSubtitle", v)} rows={2} /></Field>
      </div>
    </div>
  );
}

function MasterPlanEditor({ value, onChange }: { value: SiteContent["masterPlan"]; onChange: (v: SiteContent["masterPlan"]) => void }) {
  return (
    <div className="space-y-5">
      <ImageField label="Master Plan Image" value={value.image as string} onChange={(v) => onChange({ ...value, image: v as never })} folder="masterplan" />
      <Field label="Description"><TextArea value={value.description} onChange={(v) => onChange({ ...value, description: v })} rows={5} /></Field>
    </div>
  );
}

function ResidencesEditor({ value, onChange }: { value: SiteContent["residences"]; onChange: (v: SiteContent["residences"]) => void }) {
  type Item = { type: string; title: string; carpet: string; saleable: string; price: string; features: string[] };
  const items: Item[] = Array.isArray(value) ? (value as Item[]).map((it) => ({ ...it, features: Array.isArray(it?.features) ? it.features : [] })) : [];
  const setItem = (i: number, patch: Partial<Item>) => onChange(items.map((it, idx) => idx === i ? { ...it, ...patch } : it) as never);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">{items.length} unit types</p>
        <ListControls addLabel="Add Unit Type" onAdd={() => onChange([...items, { type: "", title: "", carpet: "", saleable: "", price: "", features: [] }] as never)} />
      </div>
      {items.map((it, i) => (
        <div key={i} className="p-4 border border-border/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Unit #{i + 1}</span>
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i) as never)} className="text-destructive"><Trash2 size={13} /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="Type"><TextInput value={it.type} onChange={(v) => setItem(i, { type: v })} /></Field>
            <Field label="Title"><TextInput value={it.title} onChange={(v) => setItem(i, { title: v })} /></Field>
            <Field label="Carpet Area"><TextInput value={it.carpet} onChange={(v) => setItem(i, { carpet: v })} /></Field>
            <Field label="Saleable / Note"><TextInput value={it.saleable} onChange={(v) => setItem(i, { saleable: v })} /></Field>
            <Field label="Price"><TextInput value={it.price} onChange={(v) => setItem(i, { price: v })} /></Field>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">Features</div>
              <button type="button" onClick={() => setItem(i, { features: [...it.features, ""] })}
                className="text-[10.5px] uppercase tracking-[0.2em] text-gold hover:text-gold/80"><Plus size={11} className="inline" /> Add</button>
            </div>
            <div className="space-y-2">
              {it.features.map((f, fi) => (
                <div key={fi} className="flex gap-2">
                  <TextInput value={f} onChange={(v) => setItem(i, { features: it.features.map((x, xi) => xi === fi ? v : x) })} />
                  <button type="button" onClick={() => setItem(i, { features: it.features.filter((_, xi) => xi !== fi) })}
                    className="px-2 border border-border text-destructive hover:border-destructive"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AmenitiesEditor({ value, onChange }: { value: SiteContent["amenities"]; onChange: (v: SiteContent["amenities"]) => void }) {
  const items: string[] = Array.isArray(value) ? (value as string[]) : [];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">{items.length} amenities</p>
        <ListControls addLabel="Add Amenity" onAdd={() => onChange([...items, ""] as never)} />
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <TextInput value={it} onChange={(v) => onChange(items.map((x, idx) => idx === i ? v : x) as never)} />
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i) as never)} className="px-2 border border-border text-destructive hover:border-destructive"><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationEditor({ value, onChange }: { value: SiteContent["location"]; onChange: (v: SiteContent["location"]) => void }) {
  const set = <K extends keyof SiteContent["location"]>(k: K, v: SiteContent["location"][K]) => onChange({ ...value, [k]: v });
  const nearby: Array<{ name: string; time: string }> = Array.isArray(value?.nearby) ? (value.nearby as Array<{ name: string; time: string }>) : [];
  return (
    <div className="space-y-5">
      <Field label="Eyebrow"><TextInput value={value.eyebrow} onChange={(v) => set("eyebrow", v)} /></Field>
      <Field label="Title"><TextInput value={value.title} onChange={(v) => set("title", v)} /></Field>
      <Field label="Body"><TextArea value={value.body} onChange={(v) => set("body", v)} rows={4} /></Field>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">Nearby Places</div>
          <ListControls addLabel="Add Place" onAdd={() => set("nearby", [...nearby, { name: "", time: "" }] as never)} />
        </div>
        <div className="space-y-2">
          {nearby.map((n, i) => (
            <div key={i} className="grid grid-cols-[2fr_1fr_auto] gap-2">
              <TextInput value={n.name} onChange={(v) => set("nearby", nearby.map((x, idx) => idx === i ? { ...x, name: v } : x) as never)} placeholder="Place name" />
              <TextInput value={n.time} onChange={(v) => set("nearby", nearby.map((x, idx) => idx === i ? { ...x, time: v } : x) as never)} placeholder="e.g. 5 min" />
              <button type="button" onClick={() => set("nearby", nearby.filter((_, idx) => idx !== i) as never)} className="px-2 border border-border text-destructive hover:border-destructive"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryEditor({ value, onChange }: { value: SiteContent["gallery"]; onChange: (v: SiteContent["gallery"]) => void }) {
  type Item = { src: string; caption?: string; type?: string; poster?: string };
  const items: Item[] = Array.isArray(value) ? (value as Item[]) : [];
  const setItem = (i: number, patch: Partial<Item>) => onChange(items.map((it, idx) => idx === i ? { ...it, ...patch } : it) as never);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">{items.length} items</p>
        <ListControls addLabel="Add Image/Video" onAdd={() => onChange([...items, { src: "", caption: "" }] as never)} />
      </div>
      {items.map((it, i) => (
        <div key={i} className="p-4 border border-border/50 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold">#{i + 1} {it.type === "video" && "(video)"}</span>
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i) as never)} className="text-destructive"><Trash2 size={13} /></button>
          </div>
          <ImageField label="Media (image or video)" value={it.src} onChange={(v) => setItem(i, { src: v, type: /\.(mp4|webm|mov)(\?|$)/i.test(v) ? "video" : undefined })} folder="gallery" accept="image/*,video/*" />
          <Field label="Caption"><TextInput value={it.caption ?? ""} onChange={(v) => setItem(i, { caption: v })} /></Field>
          {(it.type === "video" || /\.(mp4|webm|mov)(\?|$)/i.test(it.src)) && (
            <ImageField label="Video Poster Image" value={it.poster ?? ""} onChange={(v) => setItem(i, { poster: v })} folder="gallery" />
          )}
        </div>
      ))}
    </div>
  );
}

function BrochureEditor({ value, onChange }: { value: SiteContent["brochure"]; onChange: (v: SiteContent["brochure"]) => void }) {
  const set = (k: keyof SiteContent["brochure"], v: string) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <Field label="Title"><TextInput value={value.title} onChange={(v) => set("title", v)} /></Field>
      <Field label="Subtitle"><TextArea value={value.subtitle} onChange={(v) => set("subtitle", v)} rows={2} /></Field>
      <ImageField label="Brochure PDF" value={value.url} onChange={(v) => set("url", v)} folder="brochure" accept="application/pdf" hint="Upload a PDF or paste an external URL" />
    </div>
  );
}

function TrustEditor({ value, onChange }: { value: SiteContent["trust"]; onChange: (v: SiteContent["trust"]) => void }) {
  const quotes: Array<{ quote: string; author: string }> = Array.isArray(value?.quotes) ? (value.quotes as Array<{ quote: string; author: string }>) : [];
  const awards: string[] = Array.isArray(value?.awards) ? (value.awards as string[]) : [];
  return (
    <div className="space-y-7">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">Testimonials / Quotes</div>
          <ListControls addLabel="Add Quote" onAdd={() => onChange({ ...value, quotes: [...quotes, { quote: "", author: "" }] })} />
        </div>
        <div className="space-y-3">
          {quotes.map((q, i) => (
            <div key={i} className="p-3 border border-border/50 space-y-2">
              <div className="flex justify-between"><span className="text-[10.5px] uppercase tracking-[0.2em] text-gold">#{i + 1}</span>
                <button type="button" onClick={() => onChange({ ...value, quotes: quotes.filter((_, idx) => idx !== i) })} className="text-destructive"><Trash2 size={12} /></button>
              </div>
              <Field label="Quote"><TextArea value={q.quote} onChange={(v) => onChange({ ...value, quotes: quotes.map((x, idx) => idx === i ? { ...x, quote: v } : x) })} rows={3} /></Field>
              <Field label="Author"><TextInput value={q.author} onChange={(v) => onChange({ ...value, quotes: quotes.map((x, idx) => idx === i ? { ...x, author: v } : x) })} /></Field>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] uppercase tracking-[0.2em] text-ivory/70">Awards / Badges</div>
          <ListControls addLabel="Add Award" onAdd={() => onChange({ ...value, awards: [...awards, ""] })} />
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {awards.map((a, i) => (
            <div key={i} className="flex gap-2">
              <TextInput value={a} onChange={(v) => onChange({ ...value, awards: awards.map((x, idx) => idx === i ? v : x) })} />
              <button type="button" onClick={() => onChange({ ...value, awards: awards.filter((_, idx) => idx !== i) })} className="px-2 border border-border text-destructive hover:border-destructive"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Leads Tab -------------------- */

function LeadsTab({ leads }: { leads: Record<string, unknown>[] }) {
  const csv = useMemo(() => {
    if (!leads.length) return "";
    const headers = ["created_at", "first_name", "last_name", "email", "phone", "requirement", "budget", "source"];
    const rows = leads.map((l) => headers.map((h) => `"${String(l[h] ?? "").replace(/"/g, '""')}"`).join(","));
    return [headers.join(","), ...rows].join("\n");
  }, [leads]);

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-luxe py-8">
      <div className="bg-card luxe-border p-5 md:p-7">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="font-display text-2xl text-ivory">Captured Leads</h2>
            <p className="text-[12px] text-muted-foreground mt-1">Most recent first · max 200 shown</p>
          </div>
          {leads.length > 0 && (
            <button onClick={downloadCsv}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.22em] border border-gold text-gold hover:bg-gold hover:text-charcoal-deep transition">
              Export CSV
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground border-b border-border">
                <th className="py-3 pr-3">When</th>
                <th className="py-3 pr-3">Name</th>
                <th className="py-3 pr-3">Contact</th>
                <th className="py-3 pr-3">Requirement</th>
                <th className="py-3 pr-3">Budget</th>
                <th className="py-3 pr-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No leads yet.</td></tr>
              )}
              {leads.map((l) => (
                <tr key={String(l.id)} className="border-b border-border/50 text-ivory/85">
                  <td className="py-3 pr-3 whitespace-nowrap">{new Date(String(l.created_at)).toLocaleString()}</td>
                  <td className="py-3 pr-3">{String(l.first_name)} {String(l.last_name)}</td>
                  <td className="py-3 pr-3">
                    <div>{String(l.email)}</div>
                    <div className="text-muted-foreground text-[12px]">{String(l.phone)}</div>
                  </td>
                  <td className="py-3 pr-3">{String(l.requirement)}</td>
                  <td className="py-3 pr-3">{String(l.budget)}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{String(l.source ?? "")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
