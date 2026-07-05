import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { PageHero, type HeroImage } from "./PageHero";

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  hero?: HeroImage;
  zone?: "core" | "athletex";
  children?: ReactNode;
};

export function PageShell({ eyebrow, title, lede, crumbs, hero, zone, children }: Props) {
  if (hero) {
    return (
      <main id="main">
        <PageHero
          image={hero}
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          crumbs={crumbs}
          zone={zone}
        />
        {children && (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            {children}
          </div>
        )}
      </main>
    );
  }

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {crumbs && crumbs.length > 0 && (
        <div className="mb-6">
          <Breadcrumbs items={crumbs} />
        </div>
      )}
      <header className="glass-subtle max-w-3xl rounded-3xl p-6 sm:p-8 md:p-10">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-gold)]">
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
