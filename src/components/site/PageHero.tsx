import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/utils";

export type HeroImage = {
  images: string[];
  alt: string;
  /** Optional word/phrase rendered italic-gold as the accent of the H1. */
  titleAccent?: string;
  /** When true, accent stays on the same line as the title (no forced break). */
  titleAccentInline?: boolean;
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
  const accentInline = image.titleAccentInline === true;
  const sources = image.images.length > 0 ? image.images : [""];
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (reduced || sources.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % sources.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduced, sources.length]);

  // Warm the browser cache for every non-first source after mount, so by
  // the time the 5s rotation reaches them the bytes are already decoded.
  useEffect(() => {
    const warmers: HTMLImageElement[] = [];
    sources.slice(1).forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      warmers.push(img);
    });
    return () => {
      warmers.forEach((img) => {
        img.src = "";
      });
    };
  }, [sources]);

  const markLoaded = (src: string) =>
    setLoaded((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label={eyebrow ? `${eyebrow} — ${title}` : title}
    >
      {/* Rotating image stack with crossfade + Ken Burns on the active layer */}
      <div className="absolute inset-0" aria-hidden={image.alt ? undefined : true}>
        {sources.map((src, i) => {
          const isActive = i === index && loaded.has(src);
          return (
            <motion.div
              key={src + i}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <motion.img
                src={src}
                alt={i === 0 ? image.alt : ""}
                loading="eager"
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                onLoad={() => markLoaded(src)}
                className="h-full w-full object-cover"
                initial={reduced ? false : { scale: 1.08 }}
                animate={reduced ? undefined : { scale: isActive ? 1 : 1.08 }}
                transition={{ duration: 6, ease: "easeOut" }}
              />
            </motion.div>
          );
        })}
      </div>


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


      {/* Content — flows naturally so tall content on narrow screens is never clipped */}
      <div className="relative flex min-h-[520px] items-end sm:min-h-[560px] lg:min-h-[640px]">
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20">

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
                  {accentInline ? " " : <br />}
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
