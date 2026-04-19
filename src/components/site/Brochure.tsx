import { Download } from "lucide-react";
import { Section } from "./Section";
import type { SiteContent } from "@/content/defaultContent";

export function Brochure({ data }: { data: SiteContent["brochure"] }) {
  return (
    <Section id="brochure" className="bg-charcoal-deep">
      <div className="relative max-w-4xl mx-auto bg-card luxe-border px-6 sm:px-12 py-14 md:py-20 text-center overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full opacity-25"
          style={{ background: "radial-gradient(closest-side, oklch(0.74 0.105 70 / 0.5), transparent 70%)" }}
        />
        <div className="relative">
          <span className="eyebrow">The Brochure</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-ivory leading-[1.05]">
            {data.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{data.subtitle}</p>
          <a
            href={data.url}
            download
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.22em] text-[12px] shadow-gold hover:brightness-110 transition"
          >
            <Download size={16} /> Download Brochure
          </a>
          <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            64 pages · PDF · Hardbound preview
          </p>
        </div>
      </div>
    </Section>
  );
}
