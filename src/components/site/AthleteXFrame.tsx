import type { ReactNode } from "react";

/**
 * Applies the AthleteX theme (jet/signal/metallic) to any subtree.
 * Use on athletex.* routes so header/footer + content adopt the pathway theme.
 */
export function AthleteXFrame({ children }: { children: ReactNode }) {
  return (
    <div className="zone-athletex min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
