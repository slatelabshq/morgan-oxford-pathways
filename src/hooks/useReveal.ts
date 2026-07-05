import { useEffect, useRef, useState } from "react";

/**
 * useReveal — IntersectionObserver-backed reveal trigger.
 * Attach `ref` to any element; `isVisible` flips true the first time it enters the viewport.
 * Respects `prefers-reduced-motion` by returning `true` immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (options?.once !== false) observer.unobserve(entry.target);
          } else if (options?.once === false) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, isVisible };
}
