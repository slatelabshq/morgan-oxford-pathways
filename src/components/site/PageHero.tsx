import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/utils";

export type HeroImage = {
  src: string;
  alt: string;
  /** Optional word/phrase rendered italic-gold as the accent line of the H1. */
  titleAccent?: string;
};

type PageHeroProps = {
  image: HeroImage;
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  /** Force athletex-style darker overlay. Otherwise CORE gradient. */
  zone?: "core" | "athletex";
  children?: ReactNode;
};

export function PageHero({
  image,
  eyebrow,
  title,
  lede,
  crumbs,
  zone = "core",
  children,
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const accent = image.titleAccent;

  return (
    <section
      className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[520px] lg:min-h-[640px]"
      aria-label={eyebrow ? `${eyebrow} — ${title}` : title}
    >
      {/* Image + Ken Burns wrapper */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
        aria-hidden={image.alt ? undefined : true}
      >
        <img
          src={image.src}
          alt={image.alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Navy / jet gradient wash */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          zone === "athletex"
            ? "from-[color:var(--brand-jet)]/80 via-[color:var(--brand-jet)]/45 to-[color:var(--brand-jet)]/90"
            : "from-[color:var(--brand-ink)]/75 via-[color:var(--brand-ink)]/40 to-[color:var(--brand-ink)]/90",
        )}
      />


      {/* Content — bottom-left glass-dark panel */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1], delay: 0.15 }}
            className="max-w-3xl p-6 sm:p-10 md:p-14 text-[color:var(--brand-paper)]"
          >
            {crumbs && crumbs.length > 0 && (
              <div className="mb-5 [&_*]:text-[color:var(--brand-paper)]/75 [&_a:hover]:text-[color:var(--brand-paper)]">
                <Breadcrumbs items={crumbs} />
              </div>
            )}
            {eyebrow && (
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {accent ? (
                <>
                  {title}
                  <br />
                  <span className="italic font-normal text-[color:var(--brand-gold)]">
                    {accent}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>
            {lede && (
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[color:var(--brand-paper)]/85 sm:text-lg">
                {lede}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-[color:var(--brand-paper)]/60 sm:flex"
      >
        <span>Scroll</span>
        <div className="h-10 w-px animate-pulse bg-[color:var(--brand-paper)]/30" />
      </div>
    </section>
  );
}
