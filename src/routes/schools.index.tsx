import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";
import {
  filterPartnerSchools,
  partnerSchoolCount,
  sportLabel,
} from "@/lib/athletex-schools";

const schoolsSearch = z.object({
  q: fallback(z.string(), "").default(""),
  type: fallback(z.enum(["any", "day", "boarding", "day-boarding", "sixth-form"]), "any").default("any"),
  gender: fallback(z.enum(["any", "co-ed", "boys", "girls"]), "any").default("any"),
  region: fallback(z.string(), "").default(""),
  athletex: fallback(z.boolean(), false).default(false),
  sort: fallback(z.enum(["relevance", "fees-asc", "fees-desc", "az"]), "relevance").default("relevance"),
});

export const Route = createFileRoute("/schools/")({
  validateSearch: zodValidator(schoolsSearch),
  head: () => ({
    meta: [
      { title: "Partner schools directory — Morgan Oxford" },
      {
        name: "description",
        content:
          "Search our partner UK independent schools by type, gender, region, fees and AthleteX partnership.",
      },
      { property: "og:title", content: "Partner schools directory" },
      { property: "og:description", content: "Vetted partner schools, filterable and shareable." },
    ],
  }),
  component: SchoolsIndex,
});

function SchoolsIndex() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  let results = filterPartnerSchools({
    q: search.q,
    athletexOnly: search.athletex,
    sort: search.sort === "az" ? "az" : "relevance",
  });

  const regionQ = search.region.trim().toLowerCase();
  if (regionQ) {
    results = results.filter(
      (s) =>
        s.location.toLowerCase().includes(regionQ) ||
        s.regionLabel.toLowerCase().includes(regionQ) ||
        s.country.toLowerCase().includes(regionQ),
    );
  }

  return (
    <PageShell
      hero={HERO.schools}
      eyebrow="Directory"
      title="Find the right school for"
      lede="Our partner schools across the UK, Canada, USA and Europe. Filter, compare, then enquire."
      crumbs={[{ label: "Home", to: "/" }, { label: "Schools" }]}
    >
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside aria-label="Filters" className="space-y-6">
          <div>
            <label
              htmlFor="q"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Search
            </label>
            <input
              id="q"
              type="search"
              value={search.q}
              onChange={(e) =>
                navigate({ search: (p: typeof search) => ({ ...p, q: e.target.value }) })
              }
              placeholder="Name, town, country…"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="region"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Region
            </label>
            <input
              id="region"
              value={search.region}
              onChange={(e) =>
                navigate({ search: (p: typeof search) => ({ ...p, region: e.target.value }) })
              }
              placeholder="e.g. United Kingdom"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={search.athletex}
              onChange={(e) =>
                navigate({ search: (p: typeof search) => ({ ...p, athletex: e.target.checked }) })
              }
              className="h-4 w-4 rounded border-input"
            />
            AthleteX partner schools only
          </label>
        </aside>

        <section aria-label="Results">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Showing {results.length} of {partnerSchoolCount} partner schools
            </p>
            <label className="flex items-center gap-2">
              Sort
              <select
                value={search.sort}
                onChange={(e) =>
                  navigate({
                    search: (p: typeof search) => ({
                      ...p,
                      sort: e.target.value as typeof search.sort,
                    }),
                  })
                }
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="az">A–Z</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No schools match your filters.{" "}
              <Link to="/enquire/contact" className="font-semibold text-foreground underline">
                Talk to a consultant
              </Link>{" "}
              for a bespoke shortlist.
            </div>
          ) : (
            <StaggerGrid className="grid gap-4 sm:grid-cols-2">
              {results.map((school) => (
                <StaggerItem key={`${school.regionId}-${school.name}`}>
                  <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-5">
                    <h2 className="font-display text-lg font-semibold">{school.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {school.location} · {school.regionLabel}
                    </p>
                    {school.athletex_partner && (
                      <span className="mt-2 inline-flex w-fit rounded-full border border-[color:var(--brand-signal)]/40 bg-[color:var(--brand-signal)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--brand-signal)]">
                        AthleteX partner
                      </span>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {school.sports.map((s) => (
                        <span
                          key={s}
                          className="inline-flex rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          {sportLabel[s]}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{school.note}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </section>
      </div>
    </PageShell>
  );
}
