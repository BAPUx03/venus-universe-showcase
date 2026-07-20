import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SiteContent } from "@/content/defaultContent";

const SOCIALS = [
  { label: "Instagram", icon: Instagram },
  { label: "Facebook", icon: Facebook },
  { label: "LinkedIn", icon: Linkedin },
  { label: "YouTube", icon: Youtube },
] as const;

export function Footer({ brand, contact, rera }: { brand: string; contact: SiteContent["contact"]; rera: string }) {
  return (
    <footer className="bg-charcoal-deep border-t border-border/60 pt-16 pb-8">
      <div className="container-luxe">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-gold" />
              <span className="font-display text-xl text-ivory">
                {brand.split(" ")[0]} <span className="text-gradient-gold italic">{brand.split(" ").slice(1).join(" ")}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              Premium 4 BHK residences, with larger-format, jodi, duplex or penthouse configurations
              where officially applicable.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`${label} coming soon`}
                  title={`${label} coming soon`}
                  className="w-9 h-9 inline-flex items-center justify-center border border-border text-ivory/60 transition cursor-default"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Explore</p>
            <ul className="space-y-2.5 text-sm text-ivory/80">
              {["About", "Highlights", "Residences", "Amenities", "Gallery", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-gold transition">{l}</a>
                </li>
              ))}
              <li>
                <Link to="/insights" className="hover:text-gold transition">Insights</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-4">Sales Gallery</p>
            <p className="text-sm text-ivory/80 leading-relaxed">{contact.address}</p>
            <p className="mt-3 text-sm text-ivory/80">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-gold transition">
                {contact.phone}
              </a>
            </p>
          </div>
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-muted-foreground">
          <p>
            <Link
              to="/studio"
              aria-label="Admin"
              title="Admin"
              className="hover:text-gold transition cursor-pointer"
            >
              ©
            </Link>{" "}
            {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.22em]">{rera}</p>
        </div>

        <p className="mt-6 text-[10.5px] text-muted-foreground/70 leading-relaxed">
          Disclaimer: All images, plans, dimensions, specifications and amenities depicted are
          artistic conceptualisations and may not represent actuals. Prices and offers are
          indicative and subject to change without notice.
        </p>
      </div>
    </footer>
  );
}
