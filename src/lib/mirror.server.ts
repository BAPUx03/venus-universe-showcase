/**
 * Mirror leads into the external microsite_leads database.
 * Uses direct REST calls (avoids @supabase/supabase-js quirks with sb_secret_ keys).
 * All functions return { ok, error? } and NEVER throw — mirror failures must
 * not break the primary lead flow.
 */

export interface MirrorLead {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  requirement?: string;
  budget?: string;
  message?: string;
  source?: string;
  verified_at?: string; // ISO
}

const JOB_ID = "venus";

function base() {
  const url = process.env.MIRROR_SUPABASE_URL;
  const key = process.env.MIRROR_SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

function normalizePhone10(phone: string): string | null {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (!digits) return null;
  // External DB constraint requires exactly 10 digits — strip country code.
  return digits.slice(-10);
}

function toRow(lead: MirrorLead) {
  const first = (lead.first_name ?? "").trim();
  const last = (lead.last_name ?? "").trim();
  const phone10 = normalizePhone10(lead.phone);
  if (!phone10 || phone10.length !== 10) return null;
  return {
    job_id: JOB_ID,
    name: `${first} ${last}`.trim() || first,
    first_name: first || null,
    last_name: last || null,
    company: null,
    email: lead.email?.trim() || null,
    phone: phone10,
    requirement: lead.requirement?.trim() || null,
    budget: lead.budget?.trim() || null,
    message: lead.message?.trim() || null,
    source: lead.source?.trim() || "website",
    verified_at: lead.verified_at ?? new Date().toISOString(),
    crm_synced: false,
  };
}

export async function mirrorLead(
  lead: MirrorLead,
): Promise<{ ok: boolean; error?: string }> {
  const cfg = base();
  if (!cfg) return { ok: false, error: "mirror_env_missing" };
  const row = toRow(lead);
  if (!row) return { ok: false, error: "invalid_phone" };
  try {
    const res = await fetch(`${cfg.url}/rest/v1/microsite_leads`, {
      method: "POST",
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error(`[mirror] insert failed [${res.status}]: ${t.slice(0, 300)}`);
      return { ok: false, error: `mirror_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("[mirror] exception:", e);
    return { ok: false, error: "mirror_exception" };
  }
}

/**
 * Reconcile primary → mirror. For each primary lead not yet in mirror
 * (matched by email + phone-last-10), insert it. Idempotent.
 */
export async function reconcileLeads(sinceMinutes = 90): Promise<{
  ok: boolean;
  scanned: number;
  inserted: number;
  skipped: number;
  failed: number;
  error?: string;
}> {
  const cfg = base();
  if (!cfg) return { ok: false, scanned: 0, inserted: 0, skipped: 0, failed: 0, error: "mirror_env_missing" };

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since =
    sinceMinutes > 0
      ? new Date(Date.now() - sinceMinutes * 60_000).toISOString()
      : null;

  let query = supabaseAdmin
    .from("leads")
    .select("first_name,last_name,email,phone,requirement,budget,source,created_at")
    .order("created_at", { ascending: false });
  if (since) query = query.gte("created_at", since);

  const { data: primaryRows, error } = await query.limit(5000);
  if (error) return { ok: false, scanned: 0, inserted: 0, skipped: 0, failed: 0, error: error.message };
  const rows = primaryRows ?? [];
  if (rows.length === 0) return { ok: true, scanned: 0, inserted: 0, skipped: 0, failed: 0 };

  // Fetch existing mirror rows (email + phone) in the same window.
  const params = new URLSearchParams({
    select: "email,phone",
    job_id: `eq.${JOB_ID}`,
    limit: "10000",
  });
  if (since) params.set("created_at", `gte.${since}`);
  const listRes = await fetch(`${cfg.url}/rest/v1/microsite_leads?${params}`, {
    headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
  });
  const existing: Array<{ email: string | null; phone: string | null }> = listRes.ok
    ? await listRes.json()
    : [];
  const seen = new Set(
    existing.map((r) => `${(r.email ?? "").toLowerCase()}|${(r.phone ?? "")}`),
  );

  let inserted = 0;
  let skipped = 0;
  let failed = 0;
  for (const r of rows) {
    const phone10 = normalizePhone10(r.phone ?? "");
    const key = `${(r.email ?? "").toLowerCase()}|${phone10 ?? ""}`;
    if (seen.has(key)) {
      skipped++;
      continue;
    }
    const result = await mirrorLead({
      first_name: r.first_name ?? "",
      last_name: r.last_name ?? "",
      email: r.email ?? "",
      phone: r.phone ?? "",
      requirement: r.requirement ?? undefined,
      budget: r.budget ?? undefined,
      source: r.source ?? undefined,
      verified_at: r.created_at ?? undefined,
    });
    if (result.ok) {
      inserted++;
      seen.add(key);
    } else {
      failed++;
    }
  }
  return { ok: true, scanned: rows.length, inserted, skipped, failed };
}
