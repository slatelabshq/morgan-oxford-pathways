import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  directPartnerCount,
  filterPlacementRegions,
  placementRegionFilters,
  type PlacementRegionId,
} from "@/lib/schools-placement";

export type SchoolsPlacementSearch = {
  q: string;
  region: PlacementRegionId | "all";
};

type Props = {
  search: SchoolsPlacementSearch;
  onSearchChange: (next: Partial<SchoolsPlacementSearch>) => void;
};

function SchoolCard({
  school,
  variant,
}: {
  school: { name: string; location: string };
  variant: "partner" | "leading";
}) {
  return (
    <article
      className={cn(
        "card-glow flex h-full flex-col rounded-2xl border bg-card p-5",
        variant === "partner"
          ? "border-[color:var(--brand-gold)]/35"
          : "border-border",
      )}
    >
      <h3 className="font-display text-lg font-semibold">{school.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{school.location}</p>
      {variant === "partner" ? (
        <span className="mt-3 inline-flex w-fit rounded-full border border-[color:var(--brand-gold)]/50 bg-[color:var(--brand-gold)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">
          Direct partner
        </span>
      ) : null}
    </article>
  );
}

export function SchoolsPlacementBrowser({ search, onSearchChange }: Props) {
  const regions = filterPlacementRegions({ region: search.region, q: search.q });
  const hasResults = regions.length > 0;
  const totalPartners = regions.reduce((n, r) => n + r.directPartners.length, 0);
  const totalLeading = regions.reduce((n, r) => n + r.leadingSchools.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]" data-reveal-skip="true">
      <aside aria-label="Filters" className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Explore by region
          </p>
          <label
            htmlFor="schools-q"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Search
          </label>
          <input
            id="schools-q"
            type="search"
            value={search.q}
            onChange={(e) => onSearchChange({ q: e.target.value })}
            placeholder="School, town, or region (e.g. UK, US, London)…"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Region
          </p>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
            {placementRegionFilters.map((f) => {
              const active = search.region === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSearchChange({ region: f.id })}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-colors lg:rounded-md lg:px-3 lg:py-2",
                    active
                      ? "border-[color:var(--brand-gold)] bg-[color:var(--brand-gold)]/10 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          We work directly with {directPartnerCount} partner schools across four regions. For
          athlete pathways, see{" "}
          <Link to="/athletex/schools" className="font-semibold text-foreground underline">
            AthleteX schools
          </Link>
          .
        </p>
      </aside>

      <div className="space-y-12" data-reveal-skip="true">
        <p className="text-sm text-muted-foreground">
          {hasResults
            ? `Showing ${totalPartners} direct partner${totalPartners === 1 ? "" : "s"} and ${totalLeading} leading school example${totalLeading === 1 ? "" : "s"}.`
            : "No schools match your search."}
        </p>

        {!hasResults ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Try a different region or search term.{" "}
            <Link to="/enquire/contact" className="font-semibold text-foreground underline">
              Talk to a consultant
            </Link>{" "}
            for a bespoke shortlist.
          </div>
        ) : (
          regions.map((region) => (
            <section key={region.id} aria-labelledby={`region-${region.id}`}>
              <header className="mb-6 border-b border-border pb-4">
                <h2
                  id={`region-${region.id}`}
                  className="font-display text-2xl font-semibold sm:text-3xl"
                >
                  {region.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {region.blurb}
                </p>
              </header>

              {region.directPartners.length > 0 ? (
                <div className="mb-10">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
                    Direct partner schools
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {region.directPartners.map((school) => (
                      <SchoolCard key={school.name} school={school} variant="partner" />
                    ))}
                  </div>
                </div>
              ) : null}

              {region.leadingSchools.length > 0 ? (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Leading schools families often consider
                  </h3>
                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    Illustrative examples of the calibre of schools we advise on — not a complete
                    partner list. Morgan Oxford can shortlist schools beyond those named here.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {region.leadingSchools.map((school) => (
                      <SchoolCard key={school.name} school={school} variant="leading" />
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))
        )}

        <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Need a shortlist?
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The right school depends on your child — not a league table. Tell us what you're
            looking for and we'll recommend schools matched to their profile and your family's
            priorities.
          </p>
          <Link
            to="/enquire/contact"
            className="btn-glow mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Talk to us about placement →
          </Link>
        </div>
      </div>
    </div>
  );
}
