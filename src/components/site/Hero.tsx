import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import showreel from "@/assets/showreel.mp4.asset.json";
import type { SiteContent } from "@/content/defaultContent";

export function Hero({ hero, headingLevel = "h1" }: { hero: SiteContent["hero"]; headingLevel?: "h1" | "h2" }) {
  const videoSrc = hero.videoUrl || showreel.url;
  const Heading = headingLevel;
  return (
    <section
      id="home"
      className="relative min-h-[640px] md:min-h-[92svh] md:h-auto flex items-center overflow-hidden"
      style={{ background: "oklch(0.18 0.02 25)" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <video
          src={videoSrc}
          poster={(hero.image as string) || undefined}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays — softer for clean editorial look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-luxe pb-16 md:pb-24 pt-28 md:pt-36 z-10">
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
          <Heading className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.1] text-white tracking-tight">
            Luxury <span style={{ color: "oklch(0.78 0.18 25)" }}>4 &amp; 5 BHK Apartments</span> in Nehrunagar, Ahmedabad
          </Heading>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/75">
            Venus Universe · Nehrunagar, Ahmedabad · Pre-Booking Open
          </p>
          <p className="mt-5 max-w-xl text-base md:text-lg text-white/85 leading-relaxed font-light">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-md text-white font-semibold text-[13px] shadow-gold hover:brightness-110 hover:-translate-y-0.5 transition-all"
              style={{ background: "var(--accent-red)" }}
            >
              Book Site Visit · Site Office Open
            </a>
            <Link
              to="/eoi"
              className="px-7 py-3.5 rounded-md bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-[13px] hover:bg-white/20 transition"
            >
              Book Your Unit · ₹5L Token Price
            </Link>
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
