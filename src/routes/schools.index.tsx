import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import { BrowseSchoolsDirectory } from "@/components/site/BrowseSchoolsDirectory";
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
      { title: "Schools — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Browse our partner schools across the UK, Canada, USA and Europe. Filter by region and AthleteX partnership.",
      },
      { property: "og:title", content: "Schools — Morgan Oxford" },
      { property: "og:description", content: "Find the right school for your child." },
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
      eyebrow="Schools"
      title="Find the right school for"
      lede="Our partner schools across the UK, Canada, USA and Europe. Filter, compare, then enquire."
      crumbs={[{ label: "Home", to: "/" }, { label: "Schools" }]}
    >
      <BrowseSchoolsDirectory
        search={{
          q: search.q,
          region: search.region,
          athletex: search.athletex,
          sort: search.sort,
        }}
        onSearchChange={(next) =>
          navigate({
            search: (prev: typeof search) => ({ ...prev, ...next }),
            replace: true,
            resetScroll: false,
          })
        }
      />
    </PageShell>
  );
}
