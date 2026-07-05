import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Fieldset({
  legend,
  children,
  className,
}: {
  legend: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset
      className={cn(
        "rounded-lg border border-border/70 bg-card/40 p-4 md:p-6",
        className,
      )}
    >
      <legend className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {legend}
      </legend>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}
