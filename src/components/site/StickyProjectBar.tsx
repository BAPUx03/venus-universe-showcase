import { useEffect, useState } from "react";

export function StickyProjectBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-30 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container-luxe py-2 md:py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:gap-6 min-w-0 flex-1">
          <div className="min-w-0">
            <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-foreground/50 font-medium leading-tight">
              Location
            </div>
            <div className="text-[10.5px] md:text-sm font-semibold text-foreground leading-tight mt-0.5 truncate">
              Nehru Nagar, Ahmedabad
            </div>
          </div>
          <div className="w-px h-7 md:h-8 bg-border shrink-0" />
          <div className="min-w-0">
            <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-foreground/50 font-medium leading-tight">
              Property
            </div>
            <div className="text-[10.5px] md:text-sm font-semibold text-foreground leading-tight mt-0.5 truncate">
              Luxury 4 BHK
            </div>
          </div>
        </div>
        <a
          href="#contact"
          className="shrink-0 px-3 md:px-6 py-1.5 md:py-2.5 text-[10.5px] md:text-[13px] font-semibold rounded-md text-white shadow-gold hover:brightness-110 transition whitespace-nowrap"
          style={{ background: "var(--accent-red)" }}
        >
          Register Interest
        </a>
      </div>
    </div>
  );
}
