import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "@/content/defaultContent";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        let seo = defaultContent.seo;
        try {
          const { data } = await supabase.from("site_content").select("value").eq("key", "seo").maybeSingle();
          if (data?.value) seo = { ...seo, ...(data.value as object) };
        } catch {}
        const allow = seo.allowIndexing !== false;
        const body = allow
          ? `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteUrl}/sitemap.xml\n`
          : `User-agent: *\nDisallow: /\n`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
