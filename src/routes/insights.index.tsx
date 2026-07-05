import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — Morgan Oxford" },
      { name: "description", content: "Guides, case studies and analysis on UK independent education." },
      { property: "og:title", content: "Morgan Oxford insights" },
      { property: "og:description", content: "Guides, case studies and analysis on UK independent education." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Insights"
      title="Guides, case studies, analysis."
      lede="Long-form thinking from the placement desk."
      crumbs={[{ label: "Home", to: "/" }, { label: "Insights" }]}
    />
  ),
});
