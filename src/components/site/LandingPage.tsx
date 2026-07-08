import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Highlights } from "@/components/site/Highlights";
import { Residences } from "@/components/site/Residences";
import { Amenities } from "@/components/site/Amenities";
import { Location } from "@/components/site/Location";
import { Gallery } from "@/components/site/Gallery";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { FAQ } from "@/components/site/FAQ";
import type { LandingConfig } from "@/lib/seo/landingPages";
import { LANDING_PAGES } from "@/lib/seo/landingPages";

/**
 * Shared landing template used by all programmatic SEO routes.
 * Renders the full home experience, but headed with a keyword-rich
 * H1 + intro block unique to each slug for topical ranking.
 */
export function LandingPage({ config }: { config: LandingConfig }) {
  const { content } = useSiteContent();
  const otherSlugs = Object.values(LANDING_PAGES).filter((c) => c.slug !== config.slug);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Header brand={content.brand.name} />
      <main>
        {/* Keyword-focused SEO intro block — visible, not hidden */}
        <section className="relative pt-28 md:pt-32 pb-10 md:pb-14 bg-charcoal noise-overlay">
          <div className="container-luxe">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="gold-rule" />
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/80">
                  {config.eyebrow}
                </span>
              </div>
              <h1 className="font-display font-bold text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1] text-ivory tracking-tight">
                {config.h1}
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {config.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/eoi"
                  className="px-6 py-3 rounded-md text-white font-semibold text-[13px] shadow-gold hover:brightness-110 transition"
                  style={{ background: "var(--accent-red)" }}
                >
                  Pre-Book · ₹5L Refundable EOI
                </Link>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-md bg-white/10 backdrop-blur border border-white/25 text-white font-medium text-[13px] hover:bg-white/20 transition"
                >
                  Book Site Visit
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Hero hero={content.hero} />
        <About about={content.about} />
        <Highlights items={content.highlights} />
        <Residences items={content.residences} />
        <Amenities items={content.amenities} />
        <Location data={content.location} mapEmbed={content.contact.mapEmbed} />
        <Gallery items={content.gallery} />
        <FAQ />
        <Contact contact={content.contact} />

        {/* Internal linking hub for sibling programmatic pages */}
        <section className="py-12 bg-charcoal border-t border-white/5">
          <div className="container-luxe">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60 mb-4">
              Explore more
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="px-4 py-2 rounded-md border border-white/15 text-ivory text-sm hover:bg-white/5 transition"
              >
                Venus Universe Nehrunagar
              </Link>
              {otherSlugs.map((c) => (
                <Link
                  key={c.slug}
                  to={"/" + c.slug as never}
                  className="px-4 py-2 rounded-md border border-white/15 text-ivory text-sm hover:bg-white/5 transition"
                >
                  {c.breadcrumbLabel}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer brand={content.brand.name} contact={content.contact} rera={content.brand.rera} />
      <WhatsAppButton phone={content.contact.whatsapp} />
    </div>
  );
}
