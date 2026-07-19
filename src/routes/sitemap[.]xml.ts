import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "@/content/defaultContent";
import { LANDING_SLUGS } from "@/lib/seo/landingPages";
import { INSIGHT_SLUGS } from "@/content/insights";

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
        const today = new Date().toISOString().slice(0, 10);
        const urls = [
          { loc: `${base}/`, priority: "1.0", changefreq: "weekly" },
          { loc: `${base}/eoi`, priority: "0.9", changefreq: "weekly" },
          ...LANDING_SLUGS.map((s) => ({ loc: `${base}/${s}`, priority: "0.8", changefreq: "weekly" as const })),
          { loc: `${base}/insights`, priority: "0.7", changefreq: "weekly" as const },
          ...INSIGHT_SLUGS.map((s) => ({ loc: `${base}/insights/${s}`, priority: "0.6", changefreq: "monthly" as const })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
