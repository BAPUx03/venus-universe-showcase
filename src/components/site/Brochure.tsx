import { Download, FileText, Video, Image as ImageIcon, Trees } from "lucide-react";
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
          <span className="eyebrow">Official Downloads</span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-ivory leading-[1.05]">
            {data.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{data.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.2em] text-[12px] shadow-gold hover:brightness-110 transition"
            >
              <Download size={16} /> Official Brochure
            </a>

            {data.planBookUrl && (
              <a
                href={data.planBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-charcoal border border-gold/40 text-ivory font-semibold uppercase tracking-[0.2em] text-[12px] hover:border-gold hover:text-gold transition"
              >
                <FileText size={16} className="text-gold" /> Plan Book
              </a>
            )}

            {data.locationVideoUrl && (
              <a
                href={data.locationVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-charcoal border border-border text-ivory/90 font-semibold uppercase tracking-[0.2em] text-[12px] hover:border-gold hover:text-gold transition"
              >
                <Video size={16} className="text-gold" /> Location Video
              </a>
            )}

            {data.rendersFolderUrl && (
              <a
                href={data.rendersFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-charcoal border border-border text-ivory/90 font-semibold uppercase tracking-[0.2em] text-[12px] hover:border-gold hover:text-gold transition"
              >
                <ImageIcon size={16} className="text-gold" /> HD Renders
              </a>
            )}

            {data.amenitiesFolderUrl && (
              <a
                href={data.amenitiesFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-charcoal border border-border text-ivory/90 font-semibold uppercase tracking-[0.2em] text-[12px] hover:border-gold hover:text-gold transition"
              >
                <Trees size={16} className="text-gold" /> Amenities
              </a>
            )}
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            64 pages · Brochure & Plan Book · Official Google Drive Assets
          </p>
        </div>
      </div>
    </Section>
  );
}
