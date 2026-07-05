import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/utils";

export type HeroCredit = { name: string; url: string };

export type HeroImage = {
  src: string;
  alt: string;
  credit?: HeroCredit;
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

  return (
    <section
      className="relative w-full overflow-hidden min-h-[280px] sm:min-h-[360px] lg:h-[460px]"
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

      {/* Dark gradient overlay for legibility */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-gradient-to-t",
          zone === "athletex"
            ? "from-[color:var(--brand-jet)]/90 via-black/55 to-black/20"
            : "from-black/75 via-black/45 to-black/15",
        )}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pb-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0, 0, 1], delay: 0.1 }}
            className="max-w-3xl text-white"
          >
            {crumbs && crumbs.length > 0 && (
              <div className="mb-4 [&_*]:text-white/80 [&_a:hover]:text-white">
                <Breadcrumbs items={crumbs} />
              </div>
            )}
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {lede && (
              <p className="mt-4 max-w-2xl text-lg text-white/85">{lede}</p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </motion.div>
        </div>
      </div>

      {/* Attribution */}
      {image.credit && (
        <a
          href={image.credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-1.5 right-3 z-10 text-[10px] uppercase tracking-wider text-white/60 hover:text-white/90"
        >
          Photo · {image.credit.name} / Unsplash
        </a>
      )}
    </section>
  );
}
