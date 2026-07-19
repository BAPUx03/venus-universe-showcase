import { createFileRoute, Link } from "@tanstack/react-router";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { INSIGHTS, INSIGHT_SLUGS } from "@/content/insights";

const BASE = "https://venusuniverse.in";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Luxury Living in Nehrunagar, Ahmedabad | Venus Universe" },
      {
        name: "description",
        content:
          "Guides on luxury real estate in Nehrunagar & Ahmedabad — investment outlook, home configurations and NRI buying advice from Venus Universe.",
      },
      {
        name: "keywords",
        content:
          "Nehrunagar real estate, Ahmedabad luxury property guide, NRI property Ahmedabad, luxury apartment insights, Nehrunagar investment",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Venus Universe Insights" },
      { property: "og:description", content: "Guides on luxury real estate in Nehrunagar, Ahmedabad." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${BASE}/insights` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/insights` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Venus Universe Insights",
          url: `${BASE}/insights`,
          publisher: { "@type": "Organization", name: "Venus Universe", url: BASE },
          blogPost: INSIGHT_SLUGS.map((s) => ({
            "@type": "BlogPosting",
            headline: INSIGHTS[s].title,
            url: `${BASE}/insights/${s}`,
            datePublished: INSIGHTS[s].date,
            description: INSIGHTS[s].description,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE },
            { "@type": "ListItem", position: 2, name: "Insights", item: `${BASE}/insights` },
          ],
        }),
      },
    ],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  const { content } = useSiteContent();
  const posts = INSIGHT_SLUGS.map((s) => INSIGHTS[s]);

  return (
    <div className="bg-background text-foreground overflow-x-hidden min-h-screen">
      <Header brand={content.brand.name} />
      <main className="pt-28 md:pt-32 pb-20">
        <div className="container-luxe">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="gold-rule" />
              <span className="eyebrow">Insights</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.05] text-ivory">
              Luxury living in <span className="text-gradient-gold italic">Nehrunagar</span>, Ahmedabad
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Guides and perspectives on buying, investing and living well in central Ahmedabad — from the team behind Venus Universe.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/insights/$slug"
                params={{ slug: p.slug }}
                className="group block bg-card luxe-border p-6 hover:bg-card/80 transition"
              >
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-gold">{p.category}</div>
                <h2 className="mt-2 font-display text-xl text-ivory group-hover:text-gold transition leading-snug">
                  {p.title}
                </h2>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{p.excerpt}</p>
                <div className="mt-4 text-[11px] text-muted-foreground/70">
                  {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {p.readMins} min read
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      <WhatsAppButton phone={content.contact.whatsapp} />
    </div>
  );
}
