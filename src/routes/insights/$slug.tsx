import { createFileRoute, Link } from "@tanstack/react-router";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { INSIGHTS, INSIGHT_SLUGS, buildInsightHead } from "@/content/insights";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => buildInsightHead(params.slug),
  component: InsightPostPage,
});

function InsightPostPage() {
  const { slug } = Route.useParams();
  const { content } = useSiteContent();
  const post = INSIGHTS[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header brand={content.brand.name} />
        <div className="container-luxe pt-40 pb-24 text-center">
          <h1 className="font-display text-3xl text-ivory">Article not found</h1>
          <Link to="/insights" className="mt-4 inline-block text-gold underline">
            Back to Insights
          </Link>
        </div>
        <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      </div>
    );
  }

  const related = INSIGHT_SLUGS.filter((s) => s !== slug).map((s) => INSIGHTS[s]).slice(0, 2);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header brand={content.brand.name} />
      <main className="pt-28 md:pt-32 pb-20">
        <article className="container-luxe">
          <nav className="text-[11px] text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/insights" className="hover:text-gold">Insights</Link>
            <span className="mx-1.5">/</span>
            <span className="text-ivory/70">{post.category}</span>
          </nav>

          <header className="max-w-3xl">
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-gold">{post.category}</div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl leading-[1.12] text-ivory">{post.h1}</h1>
            <div className="mt-4 text-[12px] text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {post.readMins} min read
            </div>
          </header>

          <div className="mt-10 max-w-3xl space-y-5">
            {post.body.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2 key={i} className="font-display text-2xl text-ivory pt-4">
                    {b.text}
                  </h2>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="list-disc pl-5 space-y-2 text-[15px] text-muted-foreground leading-relaxed">
                    {b.items?.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="text-[15px] text-muted-foreground leading-relaxed">
                  {b.text}
                </p>
              );
            })}
          </div>

          {post.faq && post.faq.length > 0 && (
            <div className="mt-14 max-w-3xl">
              <h2 className="font-display text-2xl text-ivory">Frequently asked</h2>
              <div className="mt-5 space-y-4">
                {post.faq.map((f, i) => (
                  <div key={i} className="border-l-2 border-gold/40 pl-4">
                    <div className="text-ivory font-medium">{f.q}</div>
                    <div className="mt-1 text-[14px] text-muted-foreground leading-relaxed">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14 max-w-3xl bg-card luxe-border p-6 md:p-8 text-center">
            <h2 className="font-display text-2xl text-ivory">Discover Venus Universe</h2>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Luxury 4 &amp; 5 BHK residences, jodi apartments, duplexes and penthouses in Nehrunagar, Ahmedabad. Pre-booking open.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <Link
                to="/eoi"
                className="px-6 py-3 rounded-md text-white font-semibold text-[13px] shadow-gold hover:brightness-110 transition"
                style={{ background: "var(--accent-red)" }}
              >
                Pre-Book · ₹5L Refundable EOI
              </Link>
              <Link
                to="/"
                className="px-6 py-3 rounded-md border border-border text-ivory text-[13px] hover:border-gold hover:text-gold transition"
              >
                Explore the project
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 max-w-3xl">
              <p className="eyebrow mb-4">More insights</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to="/insights/$slug"
                    params={{ slug: p.slug }}
                    className="group block bg-card/60 luxe-border p-5 hover:bg-card transition"
                  >
                    <div className="text-[10px] uppercase tracking-[0.22em] text-gold">{p.category}</div>
                    <div className="mt-1.5 text-ivory group-hover:text-gold transition leading-snug">{p.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      <WhatsAppButton phone={content.contact.whatsapp} />
    </div>
  );
}
