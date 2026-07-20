import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "@/content/defaultContent";
import { LANDING_SLUGS } from "@/lib/seo/landingPages";
import { INSIGHT_SLUGS } from "@/content/insights";
import { INSIGHTS } from "@/content/insights";

// Update this only after a meaningful change to the homepage or landing-page
// content. Sitemap lastmod must describe the content, not the request date.
const SITE_CONTENT_LAST_MODIFIED = "2026-07-20";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let seo = defaultContent.seo;
        try {
          const { data } = await supabase.from("site_content").select("value").eq("key", "seo").maybeSingle();
          if (data?.value) seo = { ...seo, ...(data.value as object) };
        } catch {}
        const base = (seo.siteUrl || "").replace(/\/$/, "");
        const urls = [
          { loc: `${base}/`, lastmod: SITE_CONTENT_LAST_MODIFIED },
          ...LANDING_SLUGS.map((s) => ({ loc: `${base}/${s}`, lastmod: SITE_CONTENT_LAST_MODIFIED })),
          {
            loc: `${base}/insights`,
            lastmod: INSIGHT_SLUGS.reduce((latest, slug) => {
              const post = INSIGHTS[slug];
              const date = post.updated ?? post.date;
              return date > latest ? date : latest;
            }, "1970-01-01"),
          },
          ...INSIGHT_SLUGS.map((s) => ({
            loc: `${base}/insights/${s}`,
            lastmod: INSIGHTS[s].updated ?? INSIGHTS[s].date,
          })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
