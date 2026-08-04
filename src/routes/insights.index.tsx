import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Morgan Oxford" },
      { name: "description", content: "Guides, case studies and analysis on international school placement." },
      { property: "og:title", content: "Morgan Oxford insights" },
      { property: "og:description", content: "Long-form thinking from the placement desk." },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.insights}
      eyebrow="Insights"
      title="Guides and real outcomes,"
      lede="Long-form thinking from the placement desk."
      crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
    />
  ),
});
