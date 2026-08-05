import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import {
  partnerRegions,
  partnerSchoolCount,
  sportLabel,
  sportFilters,
  type Sport,
} from "@/lib/athletex-schools";

const searchSchema = z.object({
  sport: fallback(
    z.enum(["all", "football", "basketball", "tennis", "swimming", "volleyball", "athletics"]),
    "all",
  ).default("all"),
});

export const Route = createFileRoute("/athletex/schools")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Partner sports-specialist schools — AthleteX" },
      {
        name: "description",
        content: `${partnerSchoolCount} partner schools across the UK, Canada, USA and the rest of Europe and beyond with football, basketball, tennis, swimming, volleyball and athletics pathways.`,
      },
      { property: "og:title", content: "AthleteX partner schools" },
      {
        property: "og:description",
        content: "The AthleteX network of independent schools with credible sport programmes.",
      },
    ],
  }),
  component: SchoolsPage,
});

function SchoolsPage() {
  const { sport } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = partnerRegions.map((r) => ({
    ...r,
    schools:
      sport === "all" ? r.schools : r.schools.filter((s) => s.sports.includes(sport as Sport)),
  }));
  const totalShown = filtered.reduce((n, r) => n + r.schools.length, 0);

  return (
    <PageShell
      hero={HERO.athletex}
      zone="athletex"
      eyebrow="AthleteX"
      title="The right school for"
      lede={`${partnerSchoolCount} independent schools across the UK, Canada, USA and the rest of Europe and beyond with credible football, basketball, tennis, swimming, volleyball and athletics pathways.`}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "AthleteX", to: "/athletex" },
        { label: "Schools" },
      ]}
    >
      <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
        A number of our partner schools hold their own direct arrangements with professional club
        academies — including Paris Saint-Germain, Manchester United, and Manchester City — for
        specialist training programmes.
      </p>

      <section aria-label="Network at a glance" className="mb-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatChip label="Partner schools" value={String(partnerSchoolCount)} />
          <StatChip label="Regions" value="4" />
          <StatChip label="Sports" value="6" />
        </div>
      </section>

      <section aria-label="Filter by sport" className="mb-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Filter
          </span>
          {sportFilters.map((f) => {
            const active = sport === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() =>
                  navigate({
                    search: { sport: f.value },
                    replace: true,
                    resetScroll: false,
                  })
                }
                aria-pressed={active}
                className={`btn-micro rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  active
                    ? "border-[color:var(--brand-signal)] bg-[color:var(--brand-signal)] text-[color:var(--brand-bone)]"
                    : "border-border bg-background text-foreground/80 hover:border-foreground"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-muted-foreground">
            Showing {totalShown} of {partnerSchoolCount}
          </span>
        </div>
      </section>

      <div className="space-y-16">
        {filtered.map((region) =>
          region.schools.length === 0 ? null : (
            <section key={region.id} aria-labelledby={`region-${region.id}`}>
              <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-signal)]">
                    Region
                  </p>
                  <h2
                    id={`region-${region.id}`}
                    className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {region.label}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{region.blurb}</p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {region.schools.length} school{region.schools.length === 1 ? "" : "s"}
                </span>
              </header>

              <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {region.schools.map((school) => (
                  <StaggerItem key={`${region.id}-${school.name}`}>
                    <article className="hover-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg">
                      <h3 className="font-display text-lg font-semibold leading-tight">
                        {school.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {school.location}
                        {school.country !== region.label ? ` · ${school.country}` : ""}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {school.sports.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center rounded-full border border-[color:var(--brand-signal)]/40 bg-[color:var(--brand-signal)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--brand-signal)]"
                          >
                            {sportLabel[s]}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                        {school.note}
                      </p>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </section>
          ),
        )}
      </div>

      <section
        aria-label="Next steps"
        className="mt-20 rounded-3xl border border-[color:var(--brand-signal)]/40 bg-[color:var(--brand-jet)] p-8 text-[color:var(--brand-bone)] sm:p-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-signal)]">
          Ready to move
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Find the right school for your athlete.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-[color:var(--brand-bone)]/80">
          Send us the sport, level and target start term — we'll shortlist partner schools with the
          right pathway and open the scholarship conversation on your behalf.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/athletex/scholarship"
            className="btn-micro inline-flex min-h-11 items-center rounded-md bg-[color:var(--brand-signal)] px-6 text-sm font-semibold text-[color:var(--brand-bone)] shadow-sm hover:bg-[color:var(--brand-signal)]/90"
          >
            Start a scholarship enquiry
          </Link>
          <Link
            to="/enquire/contact"
            className="btn-micro inline-flex min-h-11 items-center rounded-md border border-[color:var(--brand-bone)]/40 px-6 text-sm font-semibold text-[color:var(--brand-bone)] hover:bg-[color:var(--brand-bone)]/10"
          >
            General placement enquiry
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-[color:var(--brand-signal)] sm:text-3xl">
        {value}
      </p>
    </div>
  );
}
