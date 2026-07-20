import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function StickyProjectBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY > 600;
      const footer = document.querySelector("footer");
      let footerVisible = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        footerVisible = rect.top < window.innerHeight - 40;
      }
      setShow(scrolled && !footerVisible);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-30 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container-luxe py-2 md:py-2.5 flex items-center justify-between gap-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3 md:gap-6 min-w-0 flex-1">
          <div className="min-w-0">
            <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-foreground/70 font-medium leading-tight">
              Location
            </div>
            <div className="text-[10.5px] md:text-sm font-semibold text-foreground leading-tight mt-0.5 truncate">
              Nehrunagar, Ahmedabad
            </div>
          </div>
          <div className="w-px h-7 md:h-8 bg-border shrink-0" />
          <div className="min-w-0">
            <div className="text-[8px] md:text-[10px] uppercase tracking-wider text-foreground/70 font-medium leading-tight">
              Property
            </div>
            <div className="text-[10.5px] md:text-sm font-semibold text-foreground leading-tight mt-0.5 truncate">
              Premium 4 BHK
            </div>
          </div>
        </div>
        <Link
          to="/eoi"
          className="shrink-0 px-3 md:px-6 py-1.5 md:py-2.5 text-[10.5px] md:text-[13px] font-semibold rounded-md text-white shadow-gold hover:brightness-110 transition whitespace-nowrap"
          style={{ background: "var(--accent-red)" }}
        >
          Book Your Unit · ₹5L Token
        </Link>
      </div>
    </div>
  );
}
