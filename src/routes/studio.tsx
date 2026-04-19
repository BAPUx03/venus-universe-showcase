import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "@/content/defaultContent";
import { saveSiteContentKey, useSiteContent } from "@/hooks/useSiteContent";
import { Upload, Save, ArrowLeft, Loader2 } from "lucide-react";

const PASSPHRASE = "venus2025"; // mock gate per spec — "no login needed"

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio · Venus Universe" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Studio,
});

function Studio() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("studio_unlocked") === "1") setUnlocked(true);
  }, []);

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === PASSPHRASE) {
              sessionStorage.setItem("studio_unlocked", "1");
              setUnlocked(true);
            } else {
              setErr("Incorrect passphrase.");
            }
          }}
          className="w-full max-w-sm bg-card luxe-border p-8"
        >
          <span className="eyebrow">Studio Access</span>
          <h1 className="font-display text-2xl mt-2 text-ivory">Venus Universe Admin</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter the passphrase to continue.</p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Passphrase"
            className="mt-5 w-full bg-input/60 border border-border px-3.5 py-3 text-sm text-ivory focus:outline-none focus:border-gold"
          />
          {err && <div className="mt-2 text-[12px] text-destructive">{err}</div>}
          <button className="mt-4 w-full py-3 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[12px] shadow-gold">
            Unlock
          </button>
          <p className="mt-4 text-[10.5px] text-muted-foreground">
            Hint for demo: <span className="text-gold">venus2025</span>
          </p>
        </form>
      </div>
    );
  }

  return <StudioPanel />;
}

const SECTIONS = [
  { key: "brand", label: "Brand & RERA" },
  { key: "contact", label: "Contact & WhatsApp & Map" },
  { key: "hero", label: "Hero" },
  { key: "about", label: "About + Stats" },
  { key: "highlights", label: "Highlights" },
  { key: "masterPlan", label: "Master Plan" },
  { key: "residences", label: "Residences (4 & 5 BHK)" },
  { key: "amenities", label: "Amenities" },
  { key: "location", label: "Location" },
  { key: "gallery", label: "Gallery" },
  { key: "brochure", label: "Brochure" },
  { key: "trust", label: "Testimonials & Awards" },
] as const;

function StudioPanel() {
  const { content, loading } = useSiteContent();
  const [active, setActive] = useState<(typeof SECTIONS)[number]["key"]>("hero");
  const [draft, setDraft] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [leads, setLeads] = useState<Record<string, unknown>[]>([]);
  const [tab, setTab] = useState<"content" | "leads">("content");

  // when active section or content loads, refresh draft JSON
  useEffect(() => {
    if (loading) return;
    setDraft(JSON.stringify(content[active as keyof typeof content], null, 2));
    setSavedAt(null);
  }, [active, loading, content]);

  useEffect(() => {
    if (tab !== "leads") return;
    (async () => {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      setLeads(data ?? []);
    })();
  }, [tab]);

  const parsedOk = useMemo(() => {
    try {
      JSON.parse(draft);
      return true;
    } catch {
      return false;
    }
  }, [draft]);

  const save = async () => {
    if (!parsedOk) return;
    setSaving(true);
    try {
      await saveSiteContentKey(active, JSON.parse(draft));
      setSavedAt(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setDraft(JSON.stringify(defaultContent[active as keyof typeof defaultContent], null, 2));
  };

  const onUpload = async (file: File, fieldHint: string) => {
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${active}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("venus-media").upload(path, file, { upsert: false });
    if (error) {
      alert("Upload failed: " + error.message);
      return;
    }
    const { data } = supabase.storage.from("venus-media").getPublicUrl(path);
    // Append URL to draft for quick paste
    navigator.clipboard?.writeText(data.publicUrl).catch(() => {});
    alert(`Uploaded! Public URL copied to clipboard.\nPaste into "${fieldHint}" field of the JSON.\n\n${data.publicUrl}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-charcoal-deep/90 backdrop-blur-xl border-b border-border">
        <div className="container-luxe py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-ivory/80 hover:text-gold transition" aria-label="Back to site">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display text-lg text-ivory">
              Venus <span className="text-gradient-gold italic">Studio</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
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
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <span className="eyebrow">Editing</span>
                <h2 className="font-display text-2xl text-ivory mt-1">
                  {SECTIONS.find((s) => s.key === active)?.label}
                </h2>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Edit the JSON below. Click Save to publish. Use Upload Media to add images, video or brochure.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] border border-border hover:border-gold hover:text-gold transition">
                  <Upload size={13} />
                  Upload Media
                  <input
                    type="file"
                    accept="image/*,video/*,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onUpload(f, active === "hero" ? "image / videoUrl" : active === "brochure" ? "url" : "src / image");
                    }}
                  />
                </label>
                <button
                  onClick={reset}
                  className="px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] border border-border hover:border-gold hover:text-gold transition"
                >
                  Reset
                </button>
                <button
                  onClick={save}
                  disabled={!parsedOk || saving}
                  className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.22em] bg-gradient-gold text-charcoal-deep font-semibold disabled:opacity-50"
                >
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  Save
                </button>
              </div>
            </div>
            {savedAt && <div className="text-[11px] text-gold mb-2">Saved at {savedAt}. Refresh the homepage to view.</div>}
            {!parsedOk && <div className="text-[11px] text-destructive mb-2">Invalid JSON</div>}
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              spellCheck={false}
              className="w-full min-h-[60vh] bg-charcoal-deep border border-border p-4 font-mono text-[12.5px] text-ivory/90 focus:outline-none focus:border-gold"
            />
          </main>
        </div>
      ) : (
        <div className="container-luxe py-8">
          <div className="bg-card luxe-border p-5 md:p-7">
            <h2 className="font-display text-2xl text-ivory">Captured Leads</h2>
            <p className="text-[12px] text-muted-foreground mt-1 mb-4">Most recent first · max 100 shown</p>
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
      )}
    </div>
  );
}
