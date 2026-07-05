import { createFileRoute, Link } from "@tanstack/react-router";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main id="main">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Oxford · Est. 2011
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          British school placement, considered.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Independent advisory for families seeking day, boarding, sixth form and
          summer places — and a dedicated athlete pathway for scholarship-track sport.
        </p>

        <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <Link
              to="/schools"
              className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 ease-in-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                CORE
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold">
                Find a school
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Browse 200+ vetted UK independent schools by age, region, fees and
                specialism. Placement advised end-to-end.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                Browse schools <span aria-hidden>→</span>
              </span>
            </Link>
          </StaggerItem>

          <StaggerItem>
            <Link
              to="/athletex"
              className="group relative block h-full overflow-hidden rounded-2xl border border-[color:var(--brand-signal)] bg-[color:var(--brand-jet)] p-8 text-[color:var(--brand-bone)] transition-all duration-300 ease-in-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-signal)]">
                AthleteX
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold">
                Athlete pathway
              </h2>
              <p className="mt-3 text-sm text-[color:var(--brand-metallic)]">
                Scholarship placement, scouting and school-to-pro pathways for
                football, rugby, tennis, athletics and more.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Enter AthleteX <span aria-hidden>→</span>
              </span>
            </Link>
          </StaggerItem>
        </StaggerGrid>
      </section>
    </main>
  );
}
