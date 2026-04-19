import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Highlights", href: "#highlights" },
  { label: "Master Plan", href: "#master-plan" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
  { label: "Brochure", href: "#brochure" },
  { label: "Contact", href: "#contact" },
];

export function Header({ brand }: { brand: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal-deep/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-gold shadow-gold" />
          <span className="font-display text-lg md:text-xl tracking-wide text-ivory">
            {brand.split(" ")[0]} <span className="text-gradient-gold italic">{brand.split(" ").slice(1).join(" ")}</span>
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[12.5px] uppercase tracking-[0.18em] text-ivory/75 hover:text-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#brochure"
            className="text-[12px] uppercase tracking-[0.2em] text-ivory/80 hover:text-gold transition-colors"
          >
            Brochure
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] bg-gradient-gold text-charcoal-deep font-semibold shadow-gold hover:brightness-110 transition"
          >
            Book Site Visit
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden text-ivory p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        } bg-charcoal-deep/95 backdrop-blur-xl border-t border-border/40`}
      >
        <div className="container-luxe py-6 grid gap-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-ivory/80 hover:text-gold"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 text-center text-[12px] uppercase tracking-[0.2em] bg-gradient-gold text-charcoal-deep font-semibold"
          >
            Book Site Visit
          </a>
        </div>
      </div>
    </header>
  );
}
