import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SiteContent } from "@/content/defaultContent";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, url: "https://instagram.com/venusinfraofficial" },
  { label: "YouTube", icon: Youtube, url: "https://www.youtube.com/@VenusGroup" },
  { label: "Facebook", icon: Facebook, url: "" },
  { label: "LinkedIn", icon: Linkedin, url: "" },
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
              {SOCIALS.map(({ label, icon: Icon, url }) => (
                url ? (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} Official`}
                    title={`${label} Official`}
                    className="w-9 h-9 inline-flex items-center justify-center border border-border/80 text-ivory/80 hover:border-gold hover:text-gold transition"
                  >
                    <Icon size={15} />
                  </a>
                ) : (
                  <button
                    key={label}
                    type="button"
                    aria-label={`${label} coming soon`}
                    title={`${label} coming soon`}
                    className="w-9 h-9 inline-flex items-center justify-center border border-border text-ivory/40 transition cursor-default"
                  >
                    <Icon size={15} />
                  </button>
                )
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

        {/* SEO Directory & Programmatic Internal Link Mesh */}
        <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-[12px]">
          <div>
            <p className="font-semibold text-ivory/90 mb-2.5 text-[11px] uppercase tracking-wider text-gold/90">Residences</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/luxury-4bhk-ahmedabad" className="hover:text-gold transition">Luxury 4 BHK Ahmedabad</Link></li>
              <li><Link to="/4bhk-nehrunagar-ahmedabad" className="hover:text-gold transition">4 BHK Nehrunagar</Link></li>
              <li><Link to="/penthouse-ahmedabad" className="hover:text-gold transition">Penthouse & Duplex</Link></li>
              <li><Link to="/large-carpet-area-flats-ahmedabad" className="hover:text-gold transition">Large Carpet Area Flats</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-ivory/90 mb-2.5 text-[11px] uppercase tracking-wider text-gold/90">Budget Bands</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/property-in-ahmedabad-5-to-7-crore" className="hover:text-gold transition">Property ₹5Cr to ₹7Cr</Link></li>
              <li><Link to="/property-in-ahmedabad-7-to-10-crore" className="hover:text-gold transition">Property ₹7Cr to ₹10Cr</Link></li>
              <li><Link to="/property-in-ahmedabad-10-to-15-crore" className="hover:text-gold transition">Property ₹10Cr to ₹15Cr</Link></li>
              <li><Link to="/luxury-real-estate-ahmedabad" className="hover:text-gold transition">Luxury Real Estate Hub</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-ivory/90 mb-2.5 text-[11px] uppercase tracking-wider text-gold/90">Micro-Markets</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/property-in-nehrunagar-ahmedabad" className="hover:text-gold transition">Property in Nehrunagar</Link></li>
              <li><Link to="/luxury-apartments-cg-road-ahmedabad" className="hover:text-gold transition">Flats near CG Road</Link></li>
              <li><Link to="/luxury-apartments-ashram-road-ahmedabad" className="hover:text-gold transition">Flats near Ashram Road</Link></li>
              <li><Link to="/flats-near-iim-ahmedabad" className="hover:text-gold transition">Flats near IIM Ahmedabad</Link></li>
              <li><Link to="/luxury-apartments-shivranjani-ahmedabad" className="hover:text-gold transition">Shivranjani Corridor</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-ivory/90 mb-2.5 text-[11px] uppercase tracking-wider text-gold/90">NRI & Diligence</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/nri-investment-ahmedabad" className="hover:text-gold transition">NRI Investment Guide</Link></li>
              <li><Link to="/nri-buy-property-ahmedabad" className="hover:text-gold transition">NRI Remote Purchasing</Link></li>
              <li><Link to="/hafeez-contractor-project-ahmedabad" className="hover:text-gold transition">Hafeez Contractor Project</Link></li>
              <li><Link to="/rera-registered-project-ahmedabad" className="hover:text-gold transition">RERA Details & Carpet</Link></li>
              <li><Link to="/insights/stamp-duty-tds-nri-tax-guide-ahmedabad-property" className="hover:text-gold transition">Stamp Duty & TDS Guide</Link></li>
            </ul>
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
