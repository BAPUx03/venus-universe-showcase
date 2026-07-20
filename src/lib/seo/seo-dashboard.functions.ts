import { createServerFn } from "@tanstack/react-start";

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";
const DOMAIN = "venusuniverse.in";
const DATABASE = "in";
const TARGET_KEYWORDS = [
  "venus nehrunagar",
  "venus universe nehrunagar",
  "venus universe",
  "the universe by venus",
  "luxury apartments nehrunagar",
  "4 bhk nehrunagar ahmedabad",
];

type Row = Record<string, string>;

async function semrush(path: string, params: Record<string, string>): Promise<Row[]> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const semrushKey = process.env.SEMRUSH_API_KEY;
  if (!lovableKey || !semrushKey) throw new Error("Semrush connection not configured");
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${GATEWAY}${path}?${qs}`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": semrushKey,
    },
  });
  const json = (await res.json().catch(() => ({}))) as {
    data?: { columnNames?: string[]; rows?: string[][] };
    error?: string;
  };
  if (!res.ok || json.error) throw new Error(json.error ?? `Semrush ${res.status}`);
  const cols = json.data?.columnNames ?? [];
  const rows = json.data?.rows ?? [];
  return rows.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i]])) as Row);
}

export interface SeoDashboardData {
  fetchedAt: string;
  keywords: Array<{ phrase: string; position: number | null; volume: number | null; url: string | null }>;
  competitors: Array<{ domain: string; commonKeywords: number; totalKeywords: number; competitionLevel: number }>;
  trend: Array<{ date: string; keywords: number; traffic: number }>;
  error?: string;
}

export const getSeoDashboard = createServerFn({ method: "GET" }).handler(async (): Promise<SeoDashboardData> => {
  const out: SeoDashboardData = { fetchedAt: new Date().toISOString(), keywords: [], competitors: [], trend: [] };
  try {
    // 1) Positions for all keywords the domain ranks on, then filter to targets.
    const domainOrganic = await semrush("/domains/domain_organic", {
      domain: DOMAIN,
      database: DATABASE,
      export_columns: "Ph,Po,Nq,Ur",
      display_limit: "100",
    });
    const byPhrase = new Map(domainOrganic.map((r) => [r.Ph?.toLowerCase(), r]));
    out.keywords = TARGET_KEYWORDS.map((phrase) => {
      const r = byPhrase.get(phrase.toLowerCase());
      return {
        phrase,
        position: r?.Po ? Number(r.Po) : null,
        volume: r?.Nq ? Number(r.Nq) : null,
        url: r?.Ur ?? null,
      };
    });

    // 2) Competitors in organic search.
    const comps = await semrush("/domains/domain_organic_organic", {
      domain: DOMAIN,
      database: DATABASE,
      export_columns: "Dn,Cr,Np,Or",
      display_limit: "10",
    });
    out.competitors = comps.map((r) => ({
      domain: r.Dn ?? "",
      competitionLevel: r.Cr ? Number(r.Cr) : 0,
      commonKeywords: r.Np ? Number(r.Np) : 0,
      totalKeywords: r.Or ? Number(r.Or) : 0,
    }));

    // 3) Monthly trend of keywords and traffic.
    const history = await semrush("/domains/domain_rank_history", {
      domain: DOMAIN,
      database: DATABASE,
      export_columns: "Rk,Or,Ot,Dt",
      display_limit: "12",
    });
    out.trend = history
      .map((r) => ({
        date: r.Dt ?? "",
        keywords: r.Or ? Number(r.Or) : 0,
        traffic: r.Ot ? Number(r.Ot) : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (e) {
    out.error = (e as Error).message;
  }
  return out;
});
