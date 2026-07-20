import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/venus-logo.png";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Highlights", href: "#highlights" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
  { label: "NRI", href: "#nri" },
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
          ? "bg-white border-b border-border shadow-sm py-2"
          : "bg-white py-3"
      }`}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center group">
          <img
            src={logo}
            alt={brand}
            className={`transition-all duration-300 ${
              scrolled ? "h-5 md:h-6" : "h-6 md:h-7"
            } w-auto object-contain`}
          />
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
          <Link
            to="/insights"
            className="text-[13px] font-medium text-foreground/70 hover:text-[color:var(--accent-red)] transition-colors"
          >
            Insights
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center px-3 sm:px-4 md:px-5 py-2 md:py-2.5 text-[11px] sm:text-[12px] md:text-[13px] font-medium rounded-md text-white hover:brightness-110 transition"
            style={{ background: "var(--accent-red)" }}
          >
            Inquire Now
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center text-foreground"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-400 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-border`}
      >
        <div className="container-luxe max-h-[calc(100svh-4.5rem)] overflow-y-auto py-3 grid gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-[color:var(--accent-red)]"
            >
              {n.label}
            </a>
          ))}
          <Link
            to="/insights"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-[color:var(--accent-red)]"
          >
            Insights
          </Link>
        </div>
      </div>
    </header>
  );
}
