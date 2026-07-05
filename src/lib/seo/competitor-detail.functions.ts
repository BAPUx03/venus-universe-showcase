import { createServerFn } from "@tanstack/react-start";

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";
const OUR_DOMAIN = "venusuniverse.in";
const DATABASE = "in";

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

export interface SharedKeyword {
  phrase: string;
  ourPosition: number | null;
  theirPosition: number;
  volume: number;
  difficulty: number | null;
  cpc: number | null;
  url: string | null;
  gap: number | null; // theirPos - ourPos (positive => they rank better)
  opportunity: "quick-win" | "close-gap" | "defend" | "watch";
}

export interface CompetitorDetail {
  domain: string;
  fetchedAt: string;
  shared: SharedKeyword[];
  trend: Array<{ date: string; keywords: number; traffic: number }>;
  totals: { sharedCount: number; theirTotal: number };
  error?: string;
}

function classify(ourPos: number | null, theirPos: number): SharedKeyword["opportunity"] {
  if (ourPos == null) return "watch";
  if (ourPos <= 10 && theirPos > 10) return "defend";
  if (ourPos > 10 && theirPos <= 10) return "close-gap";
  if (ourPos > theirPos && ourPos <= 20) return "quick-win";
  return "watch";
}

export const getCompetitorDetail = createServerFn({ method: "POST" })
  .inputValidator((input: { domain: string }) => {
    if (!input?.domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(input.domain)) {
      throw new Error("Invalid domain");
    }
    return input;
  })
  .handler(async ({ data }): Promise<CompetitorDetail> => {
    const out: CompetitorDetail = {
      domain: data.domain,
      fetchedAt: new Date().toISOString(),
      shared: [],
      trend: [],
      totals: { sharedCount: 0, theirTotal: 0 },
    };
    try {
      const [ours, theirs, history] = await Promise.all([
        semrush("/domains/domain_organic", {
          domain: OUR_DOMAIN,
          database: DATABASE,
          export_columns: "Ph,Po,Nq,Ur",
          display_limit: "100",
        }),
        semrush("/domains/domain_organic", {
          domain: data.domain,
          database: DATABASE,
          export_columns: "Ph,Po,Nq,Kd,Cp,Ur",
          display_limit: "100",
        }),
        semrush("/domains/domain_rank_history", {
          domain: data.domain,
          database: DATABASE,
          export_columns: "Rk,Or,Ot,Dt",
          display_limit: "12",
        }).catch(() => [] as Row[]),
      ]);

      const ourMap = new Map(ours.map((r) => [r.Ph?.toLowerCase(), r]));
      out.totals.theirTotal = theirs.length;

      const shared: SharedKeyword[] = [];
      for (const t of theirs) {
        const key = t.Ph?.toLowerCase();
        if (!key) continue;
        const us = ourMap.get(key);
        if (!us) continue; // only shared
        const theirPos = Number(t.Po);
        const ourPos = us.Po ? Number(us.Po) : null;
        shared.push({
          phrase: t.Ph,
          ourPosition: ourPos,
          theirPosition: theirPos,
          volume: t.Nq ? Number(t.Nq) : 0,
          difficulty: t.Kd ? Number(t.Kd) : null,
          cpc: t.Cp ? Number(t.Cp) : null,
          url: t.Ur ?? null,
          gap: ourPos != null ? theirPos - ourPos : null,
          opportunity: classify(ourPos, theirPos),
        });
      }
      // Sort by volume desc
      shared.sort((a, b) => b.volume - a.volume);
      out.shared = shared;
      out.totals.sharedCount = shared.length;

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
