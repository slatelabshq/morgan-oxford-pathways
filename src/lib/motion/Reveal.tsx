import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  as?: ElementType;
  children: ReactNode;
  /** "hero" = immediate reveal on mount. "section" = IntersectionObserver reveal. */
  kind?: "hero" | "section";
  /** Stagger index (0-based). Multiplied by 80ms (CORE) / 60ms (AthleteX). */
  index?: number;
  /** Force AthleteX motion outside a .zone-athletex ancestor. */
  variant?: "core" | "athletex";
  className?: string;
};

/**
 * Reveal — hides its child until it's ready, then plays reveal-up.
 * "hero" plays on mount; "section" uses IntersectionObserver (once).
 * Strips will-change on animationend.
 */
export function Reveal({
  as: Tag = "div",
  children,
  kind = "section",
  index = 0,
  variant,
  className = "",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealClass = kind === "hero" ? "reveal-visible" : "reveal-section-visible";
    const onEnd = () => {
      el.classList.add("reveal-done");
      el.style.willChange = "auto";
    };
    el.addEventListener("animationend", onEnd, { once: true });

    if (reduce) {
      el.classList.remove("reveal", "reveal-section");
      el.style.opacity = "1";
      return () => el.removeEventListener("animationend", onEnd);
    }

    if (kind === "hero") {
      requestAnimationFrame(() => el.classList.add(revealClass));
      return () => el.removeEventListener("animationend", onEnd);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add(revealClass);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "-10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeEventListener("animationend", onEnd);
    };
  }, [kind, reduce]);

  const baseClass = kind === "hero" ? "reveal" : "reveal reveal-section";
  return (
    <Tag
      ref={ref as never}
      data-motion={variant}
      style={{ ["--reveal-index" as string]: index }}
      className={`${baseClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
