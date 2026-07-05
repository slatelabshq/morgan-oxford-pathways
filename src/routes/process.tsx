import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our placement process — Morgan Oxford" },
      { name: "description", content: "Five steps from first call to first term: discovery, shortlist, visits, offers, arrival." },
      { property: "og:title", content: "The Morgan Oxford placement process" },
      { property: "og:description", content: "How we place families in UK independent schools, end-to-end." },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.process}
      eyebrow="Process"
      title="Five steps from first call to first term."
      lede="Discovery, shortlist, visits, offers, arrival — sequenced, timed and owned by a named consultant."
      crumbs={[{ label: "Home", to: "/" }, { label: "Process" }]}
    />
  ),
});
