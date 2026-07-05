import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/athletex/scouts")({
  head: () => ({
    meta: [
      { title: "For scouts & clubs — AthleteX" },
      { name: "description", content: "Partner with the AthleteX scouting desk to identify UK-based athletes." },
      { property: "og:title", content: "AthleteX for scouts & clubs" },
      { property: "og:description", content: "Partner with the AthleteX scouting desk." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AthleteX"
      title="For scouts & clubs."
      lede="Partner with the AthleteX scouting desk for verified athlete introductions."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX", to: "/athletex" }, { label: "For Scouts" }]}
    />
  ),
});
