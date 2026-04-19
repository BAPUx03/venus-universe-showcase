import { Award } from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

export function Trust({ data }: { data: SiteContent["trust"] }) {
  return (
    <Section
      id="trust"
      eyebrow="Recognition"
      title={<>In good <span className="text-gradient-gold italic">company.</span></>}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {data.quotes.map((q) => (
          <figure key={q.author} className="bg-card/70 luxe-border p-8 md:p-10">
            <div className="text-gold text-3xl font-display leading-none">“</div>
            <blockquote className="mt-2 text-lg md:text-xl text-ivory/90 font-display italic leading-snug">
              {q.quote}
            </blockquote>
            <figcaption className="mt-5 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              — {q.author}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {data.awards.map((a) => (
          <div
            key={a}
            className="flex items-center gap-3 px-5 py-3 bg-charcoal-soft border border-gold/30"
          >
            <Award size={16} className="text-gold" />
            <span className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-ivory/85">{a}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
