import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  align = "center",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  children?: ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <section id={id} className={`relative py-14 sm:py-16 md:py-28 ${className}`}>
      <div className="container-luxe">
        {(eyebrow || title || intro) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className={`max-w-3xl mb-8 sm:mb-10 md:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
                <span className="gold-rule" />
                <span className="eyebrow">{eyebrow}</span>
                <span className="gold-rule" />
              </div>
            )}
            {title && (
              <h2 className="font-display text-[clamp(1.75rem,8vw,3rem)] md:text-5xl leading-[1.08] text-ivory">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-[15px] md:text-base text-muted-foreground leading-relaxed">
                {intro}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
