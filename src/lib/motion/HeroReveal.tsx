import { Children, type ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * HeroReveal — staggers direct children on mount using --reveal-index.
 * Use for above-the-fold hero blocks; not for scroll-in sections.
 */
export function HeroReveal({
  children,
  variant,
  className = "",
}: {
  children: ReactNode;
  variant?: "core" | "athletex";
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, i) => (
        <Reveal key={i} kind="hero" index={i} variant={variant}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
