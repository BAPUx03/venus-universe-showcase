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
        const siteUrl = (seo.siteUrl || "https://venusuniverse.in").replace(/\/$/, "");

        const body = allow
          ? `# Venus Universe Nehrunagar - robots.txt
# Allow all search engines and AI crawlers

User-agent: *
Allow: /

# Google
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Google-Extended
Allow: /

# Bing
User-agent: Bingbot
Allow: /

# OpenAI / ChatGPT
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Meta AI
User-agent: Meta-ExternalAgent
Allow: /

User-agent: FacebookBot
Allow: /

# Apple
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Other AI / Search
User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
          : `User-agent: *\nDisallow: /\n`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
