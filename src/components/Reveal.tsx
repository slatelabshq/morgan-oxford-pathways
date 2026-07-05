import { type ElementType, type ReactNode, createElement } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

type RevealProps = {
  as?: ElementType;
  delay?: 0 | 100 | 200 | 300 | 400;
  className?: string;
  children: ReactNode;
  /** Use the punchier section variant (larger travel + slight scale). */
  variant?: "default" | "section";
};

/**
 * Reveal — wraps children in a container that fades up when it enters the viewport.
 * Motion is disabled automatically under `prefers-reduced-motion: reduce`.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
  variant = "default",
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  const base =
    variant === "section"
      ? "motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out"
      : "motion-safe:opacity-0 motion-safe:translate-y-4 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out";

  const shown = "motion-safe:opacity-100 motion-safe:translate-y-0";

  const delayClass =
    delay === 100
      ? "motion-safe:[transition-delay:100ms]"
      : delay === 200
        ? "motion-safe:[transition-delay:200ms]"
        : delay === 300
          ? "motion-safe:[transition-delay:300ms]"
          : delay === 400
            ? "motion-safe:[transition-delay:400ms]"
            : "";

  return createElement(
    as,
    {
      ref,
      className: cn(base, isVisible && shown, delayClass, className),
    },
    children,
  );
}
