import { motion } from "framer-motion";
import type { SiteContent } from "@/content/defaultContent";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section id="home" className="relative min-h-[92svh] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {hero.videoUrl ? (
          <video
            src={hero.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={hero.image}
            alt="Venus Universe — twin towers at dusk"
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient overlays — softer for clean editorial look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-luxe pb-16 md:pb-24 pt-28 md:pt-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="gold-rule" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/90">
              Nehrunagar · Ahmedabad
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(2.2rem,5.5vw,4.75rem)] leading-[1.05] text-white tracking-tight">
            A Universe of{" "}
            <span style={{ color: "oklch(0.78 0.18 25)" }}>Luxury Living.</span>
          </h1>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/75">
            Now Previewing · 4 &amp; 5 BHK Sky Residences
          </p>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed font-light">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-md text-white font-semibold text-[13px] shadow-gold hover:brightness-110 transition"
              style={{ background: "var(--accent-red)" }}
            >
              Inquire Now
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-md bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-[13px] hover:bg-white/20 transition"
            >
              Schedule Visit
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/70">Scroll</span>
        <span className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent animate-float-slow" />
      </div>
    </section>
  );
}
