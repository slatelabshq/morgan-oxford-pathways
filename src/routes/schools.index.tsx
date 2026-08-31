import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageShell } from "@/components/site/PageShell";
import {
  SchoolsPlacementBrowser,
  type SchoolsPlacementSearch,
} from "@/components/site/SchoolsPlacementBrowser";
import { HERO } from "@/lib/hero-images";

const schoolsSearch = z.object({
  q: fallback(z.string(), "").default(""),
  region: fallback(
    z.enum(["all", "uk", "usa", "canada", "row"]),
    "all",
  ).default("all"),
});

export const Route = createFileRoute("/schools/")({
  validateSearch: zodValidator(schoolsSearch),
  head: () => ({
    meta: [
      { title: "Schools — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Explore school placement by region — UK, USA, Canada and rest of world. Direct partner schools and leading examples families consider.",
      },
      { property: "og:title", content: "Schools — Morgan Oxford" },
      {
        property: "og:description",
        content: "Find the right school for your child by region.",
      },
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
      lede="Browse by region, search by name, and see where we work directly — plus examples of leading schools families often consider."
      crumbs={[{ label: "Home", to: "/" }, { label: "Schools" }]}
    >
      <SchoolsPlacementBrowser
        search={search as SchoolsPlacementSearch}
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
