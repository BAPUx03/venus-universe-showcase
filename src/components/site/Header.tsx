import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Highlights", href: "#highlights" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
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
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <a href="#home" className="flex items-baseline gap-1.5 group">
          <span
            className="font-display font-extrabold text-xl md:text-2xl tracking-tight"
            style={{ color: "var(--accent-red)" }}
          >
            VENUS
          </span>
          <span className="font-display font-medium text-sm md:text-base tracking-wide text-foreground/80">
            Universe
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[13px] font-medium text-foreground/70 hover:text-[color:var(--accent-red)] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-5 py-2.5 text-[13px] font-semibold rounded-md text-white shadow-gold hover:brightness-110 transition"
            style={{ background: "var(--accent-red)" }}
          >
            Inquire Now
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden text-foreground p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-400 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-border`}
      >
        <div className="container-luxe py-6 grid gap-3">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-foreground/80 hover:text-[color:var(--accent-red)]"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 text-center text-[13px] font-semibold rounded-md text-white"
            style={{ background: "var(--accent-red)" }}
          >
            Inquire Now
          </a>
        </div>
      </div>
    </header>
  );
}
