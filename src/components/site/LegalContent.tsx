import type { ReactNode } from "react";

export function LegalContent({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
      <div className="space-y-8 text-base leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
