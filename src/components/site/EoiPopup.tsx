import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import type { SiteContent } from "@/content/defaultContent";

const DISMISS_KEY = "venus_eoi_popup_dismissed_v1";
const SCROLL_THRESHOLD = 0.6;
const TIME_THRESHOLD = 30_000;

export function EoiPopup({ eoi }: { eoi: SiteContent["eoi"] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!eoi?.popupEnabled) return;
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    let timeReached = false;
    let scrollReached = false;

    const tryShow = () => {
      if (timeReached && scrollReached && !sessionStorage.getItem(DISMISS_KEY)) {
        setOpen(true);
      }
    };

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? window.scrollY / docH : 0;
      if (pct >= SCROLL_THRESHOLD) {
        scrollReached = true;
        window.removeEventListener("scroll", onScroll);
        tryShow();
      }
    };

    const timer = setTimeout(() => {
      timeReached = true;
      tryShow();
    }, TIME_THRESHOLD);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [eoi?.popupEnabled]);

  const close = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  };

  if (!eoi) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-foreground/60 hover:text-foreground transition"
            >
              <X size={16} />
            </button>

            <div
              className="h-1.5 w-full"
              style={{ background: "linear-gradient(90deg, var(--accent-red), var(--accent-red-deep), var(--accent-red))" }}
            />

            <div className="p-7 md:p-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold tracking-[0.18em] uppercase text-white" style={{ background: "var(--accent-red)" }}>
                <Sparkles size={11} /> Limited Spots
              </span>
              <h3 className="font-display text-2xl md:text-[26px] font-bold leading-tight mt-3 text-foreground">
                {eoi.popupTitle}
              </h3>
              <p className="mt-2.5 text-[13.5px] text-foreground/65 leading-relaxed">{eoi.popupSubtitle}</p>

              <div className="mt-5 p-4 rounded-xl bg-[oklch(0.97_0.02_25)] border border-[oklch(0.9_0.04_25)] flex items-center justify-between">
                <div>
                  <div className="text-[10.5px] uppercase tracking-[0.18em] text-foreground/55 font-semibold">EOI Amount</div>
                  <div className="font-display text-2xl font-bold mt-0.5" style={{ color: "var(--accent-red-deep)" }}>
                    {eoi.amountLabel}
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                  <ShieldCheck size={12} /> 100% Refundable
                </div>
              </div>

              <Link
                to="/eoi"
                onClick={close}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-white font-semibold text-[13px] uppercase tracking-[0.12em] shadow-[0_10px_25px_-8px_rgba(200,40,30,0.5)] hover:shadow-[0_15px_35px_-8px_rgba(200,40,30,0.7)] transition-all"
                style={{ background: "linear-gradient(135deg, var(--accent-red), var(--accent-red-deep))" }}
              >
                {eoi.ctaPrimary} <ArrowRight size={15} />
              </Link>
              <button onClick={close} className="mt-2.5 w-full text-center text-[11.5px] text-foreground/50 hover:text-foreground/80 transition">
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
