import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
};

export function PageShell({ eyebrow, title, lede, crumbs, children }: Props) {
  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {crumbs && crumbs.length > 0 && (
        <div className="mb-6">
          <Breadcrumbs items={crumbs} />
        </div>
      )}
      <header className="max-w-3xl">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-4 text-lg text-muted-foreground">{lede}</p>
        )}
      </header>
      {children && <div className="mt-12">{children}</div>}
    </main>
  );
}
