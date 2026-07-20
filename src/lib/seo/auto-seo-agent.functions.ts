import { createServerFn } from "@tanstack/react-start";

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";
const AI_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const DOMAIN = "venusuniverse.in";
const DATABASE = "in";

const TARGET_KEYWORDS = [
  "venus nehrunagar",
  "venus universe nehrunagar",
  "the universe by venus",
  "luxury apartments nehrunagar",
  "4 bhk nehrunagar ahmedabad",
];

const INTERNAL_PATHS = [
  { path: "/", label: "Home" },
  { path: "/eoi", label: "Expression of Interest" },
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
  if (!res.ok || json.error) return [];
  const cols = json.data?.columnNames ?? [];
  const rows = json.data?.rows ?? [];
  return rows.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i]])) as Row);
}

export interface AutoSeoSuggestion {
  generatedAt: string;
  rationale: string;
  seo: { title: string; description: string };
  hero: { title: string; subtitle: string };
  highlights: Array<{ title: string; desc: string }>;
  internalLinks: Array<{ anchor: string; targetPath: string; placementHint: string }>;
  insights: {
    positions: Array<{ phrase: string; position: number | null; volume: number | null }>;
    related: string[];
    questions: string[];
  };
  error?: string;
}

interface AgentInput {
  currentSeo: { title: string; description: string };
  currentHero: { title: string; subtitle: string };
  currentHighlights: Array<{ title: string; desc: string }>;
}

export const runAutoSeoAgent = createServerFn({ method: "POST" })
  .inputValidator((input: AgentInput) => input)
  .handler(async ({ data }): Promise<AutoSeoSuggestion> => {
    const out: AutoSeoSuggestion = {
      generatedAt: new Date().toISOString(),
      rationale: "",
      seo: data.currentSeo,
      hero: data.currentHero,
      highlights: data.currentHighlights,
      internalLinks: [],
      insights: { positions: [], related: [], questions: [] },
    };

    try {
      // Semrush: positions + related terms + questions for headline keyword
      const [domainOrganic, related, questions] = await Promise.all([
        semrush("/domains/domain_organic", {
          domain: DOMAIN,
          database: DATABASE,
          export_columns: "Ph,Po,Nq",
          display_limit: "50",
        }),
        semrush("/keywords/phrase_related", {
          phrase: "luxury apartments nehrunagar",
          database: DATABASE,
          export_columns: "Ph,Nq,Kd",
          display_limit: "15",
        }),
        semrush("/keywords/phrase_questions", {
          phrase: "venus nehrunagar",
          database: DATABASE,
          export_columns: "Ph,Nq",
          display_limit: "10",
        }),
      ]);

      const byPhrase = new Map(domainOrganic.map((r) => [r.Ph?.toLowerCase(), r]));
      out.insights.positions = TARGET_KEYWORDS.map((phrase) => {
        const r = byPhrase.get(phrase.toLowerCase());
        return {
          phrase,
          position: r?.Po ? Number(r.Po) : null,
          volume: r?.Nq ? Number(r.Nq) : null,
        };
      });
      out.insights.related = related.map((r) => r.Ph).filter(Boolean).slice(0, 12);
      out.insights.questions = questions.map((r) => r.Ph).filter(Boolean).slice(0, 8);

      // Ask Lovable AI to synthesize on-page updates
      const lovableKey = process.env.LOVABLE_API_KEY;
      if (!lovableKey) throw new Error("LOVABLE_API_KEY not configured");

      const prompt = `You are an on-page SEO agent for The Universe by Venus, a premium 4 BHK residential development across Blocks A-J in Nehrunagar, Ahmedabad, India.

Use these Semrush insights to rewrite on-page copy so it ranks better for the target keywords while staying premium and human.

TARGET KEYWORD POSITIONS (lower = better; null = not ranking):
${JSON.stringify(out.insights.positions, null, 2)}

RELATED KEYWORDS (from Semrush, ordered by relevance):
${out.insights.related.join(", ") || "(none)"}

QUESTION KEYWORDS people search:
${out.insights.questions.join(", ") || "(none)"}

CURRENT SEO title: ${data.currentSeo.title}
CURRENT SEO description: ${data.currentSeo.description}
CURRENT hero title: ${data.currentHero.title}
CURRENT hero subtitle: ${data.currentHero.subtitle}
CURRENT highlights (title | desc):
${data.currentHighlights.map((h) => `- ${h.title} | ${h.desc}`).join("\n")}

AVAILABLE INTERNAL LINK TARGETS:
${INTERNAL_PATHS.map((p) => `- ${p.path} (${p.label})`).join("\n")}

RULES:
- SEO title ≤ 60 chars, must contain "Venus Nehrunagar" or "Nehrunagar".
- SEO description ≤ 155 chars, action-oriented, mention premium 4 BHK.
- Never claim 5 BHK inventory. Describe jodi, duplex or penthouse configurations only as subject to official availability.
- Use brochure-listed RERA carpet areas of approximately 1,546 to 2,459 sq ft; do not invent or round areas.
- Hero title ≤ 90 chars, keep brand voice (ultra-luxury, calm, confident).
- Hero subtitle 140-220 chars, natural, embed 2-3 top target/related keywords.
- Rewrite the ${data.currentHighlights.length} highlights preserving order and meaning; only tighten copy and weave in relevant keywords naturally. Do not invent facts.
- Suggest 3-5 internal link opportunities: anchor text (keyword-rich, 3-6 words), targetPath from list above, placementHint (which section to put it in).
- Return STRICT JSON only, no markdown, matching this schema:
{
  "rationale": string,
  "seo": { "title": string, "description": string },
  "hero": { "title": string, "subtitle": string },
  "highlights": [{ "title": string, "desc": string }],
  "internalLinks": [{ "anchor": string, "targetPath": string, "placementHint": string }]
}`;

      const aiRes = await fetch(AI_GATEWAY, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: "You are a precise on-page SEO writer. Return ONLY valid JSON, no prose, no code fences." },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!aiRes.ok) {
        const t = await aiRes.text().catch(() => "");
        throw new Error(`AI gateway ${aiRes.status}: ${t.slice(0, 200)}`);
      }
      const aiJson = (await aiRes.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const raw = aiJson.choices?.[0]?.message?.content ?? "{}";
      const cleaned = raw.replace(/^```json\s*|\s*```$/g, "").trim();
      const parsed = JSON.parse(cleaned) as Partial<AutoSeoSuggestion>;

      if (parsed.seo) out.seo = { ...out.seo, ...parsed.seo };
      if (parsed.hero) out.hero = { ...out.hero, ...parsed.hero };
      if (Array.isArray(parsed.highlights) && parsed.highlights.length > 0) {
        // Keep original length; fill from suggestions
        out.highlights = data.currentHighlights.map((h, i) => parsed.highlights![i] ?? h);
      }
      if (Array.isArray(parsed.internalLinks)) {
        out.internalLinks = parsed.internalLinks
          .filter((l) => l && l.anchor && l.targetPath)
          .slice(0, 6);
      }
      out.rationale = parsed.rationale ?? "";
    } catch (e) {
      out.error = (e as Error).message;
    }
    return out;
  });
