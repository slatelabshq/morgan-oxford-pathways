import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

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
      { title: "UK independent schools directory — Morgan Oxford" },
      { name: "description", content: "Search 200+ UK independent schools by type, gender, region, fees and AthleteX partnership." },
      { property: "og:title", content: "UK independent schools directory" },
      { property: "og:description", content: "Vetted UK independent schools, filterable and shareable." },
    ],
  }),
  component: SchoolsIndex,
});

function SchoolsIndex() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <PageShell
      hero={HERO.schools}
      eyebrow="Directory"
      title="Schools"
      lede="Vetted UK independent schools. Filter, compare, then enquire."
      crumbs={[{ label: "Home", to: "/" }, { label: "Schools" }]}
    >
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside aria-label="Filters" className="space-y-6">
          <div>
            <label htmlFor="q" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Search
            </label>
            <input
              id="q"
              type="search"
              value={search.q}
              onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, q: e.target.value }) })}
              placeholder="Name, town, county…"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <FilterGroup label="Type">
            {(["any", "day", "boarding", "day-boarding", "sixth-form"] as const).map((v) => (
              <FilterOption key={v} name="type" value={v} current={search.type} onSelect={(val) => navigate({ search: (p: typeof search) => ({ ...p, type: val as typeof search.type }) })} />
            ))}
          </FilterGroup>

          <FilterGroup label="Gender">
            {(["any", "co-ed", "boys", "girls"] as const).map((v) => (
              <FilterOption key={v} name="gender" value={v} current={search.gender} onSelect={(val) => navigate({ search: (p: typeof search) => ({ ...p, gender: val as typeof search.gender }) })} />
            ))}
          </FilterGroup>

          <div>
            <label htmlFor="region" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Region
            </label>
            <input
              id="region"
              value={search.region}
              onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, region: e.target.value }) })}
              placeholder="e.g. South East"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={search.athletex}
              onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, athletex: e.target.checked }) })}
              className="h-4 w-4 rounded border-input"
            />
            AthleteX partner schools only
          </label>
        </aside>

        <section aria-label="Results">
          <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Directory data coming soon — filters are wired to the URL for shareable results.</p>
            <label className="flex items-center gap-2">
              Sort
              <select
                value={search.sort}
                onChange={(e) => navigate({ search: (p: typeof search) => ({ ...p, sort: e.target.value as typeof search.sort }) })}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="fees-asc">Fees ↑</option>
                <option value="fees-desc">Fees ↓</option>
                <option value="az">A–Z</option>
              </select>
            </label>
          </div>
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No schools indexed yet. <Link to="/enquire/school-placement" className="font-semibold text-foreground underline">Talk to a consultant</Link> for a bespoke shortlist.
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </fieldset>
  );
}

function FilterOption({ name, value, current, onSelect }: { name: string; value: string; current: string; onSelect: (v: string) => void }) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground/80 hover:border-foreground"}`}
      aria-pressed={active}
      name={name}
    >
      {value.replace(/-/g, " ")}
    </button>
  );
}
