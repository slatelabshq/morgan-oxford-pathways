import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Morgan Oxford Education" },
      { name: "description", content: "The team, ethos and results behind Morgan Oxford's UK school placement practice." },
      { property: "og:title", content: "About Morgan Oxford Education" },
      { property: "og:description", content: "Independent, Oxford-based school placement consultancy." },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.about}
      eyebrow="About"
      title="An independent advisory, based in Oxford."
      lede="Fifteen years placing families across the UK's leading independent schools — with a growing athlete practice under the AthleteX pathway."
      crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
    />
  ),
});
