import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * GlobalReveal — mounts a single IntersectionObserver that fades top-level
 * `<section>` elements (and any `[data-reveal]` element) into view as the user
 * scrolls. Re-scans on every route change. Respects prefers-reduced-motion.
 */
export function GlobalReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scan = () => {
      const candidates = document.querySelectorAll<HTMLElement>(
        "section, main > article, main > div > article, [data-reveal]",
      );
      candidates.forEach((el) => {
        if (el.dataset.revealSkip === "true") return;
        if (el.classList.contains("reveal-auto")) return;
        el.classList.add("reveal-auto");
        if (reduced) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    scan();
    // Rescan shortly after route change for lazy/async content
    const t = window.setTimeout(scan, 250);

    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
