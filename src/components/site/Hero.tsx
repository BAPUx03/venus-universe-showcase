import { motion } from "framer-motion";
import type { SiteContent } from "@/content/defaultContent";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-end overflow-hidden">
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
            className="w-full h-full object-cover animate-ken-burns"
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/60 to-charcoal-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-luxe pb-20 md:pb-28 pt-36 md:pt-40 z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="gold-rule" />
            <span className="eyebrow">Now Previewing · 4 &amp; 5 BHK Sky Residences</span>
          </div>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5.25rem)] leading-[0.98] text-ivory">
            A Universe of <br />
            <span className="text-gradient-gold italic">Luxury Living.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-ivory/80 leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="px-6 py-3.5 bg-gradient-gold text-charcoal-deep font-semibold uppercase tracking-[0.2em] text-[12px] shadow-gold hover:brightness-110 transition"
            >
              Enquire Now
            </a>
            <a
              href="#brochure"
              className="px-6 py-3.5 border border-gold/60 text-ivory uppercase tracking-[0.2em] text-[12px] hover:bg-gold/10 hover:border-gold transition"
            >
              Download Brochure
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 bg-glass text-ivory uppercase tracking-[0.2em] text-[12px] hover:bg-white/10 transition"
            >
              Schedule Visit
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] text-ivory/60">Scroll</span>
        <span className="w-px h-12 bg-gradient-to-b from-gold/80 to-transparent animate-float-slow" />
      </div>
    </section>
  );
}
