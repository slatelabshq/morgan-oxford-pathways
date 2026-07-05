import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/athletex/success")({
  head: () => ({
    meta: [
      { title: "Success stories — AthleteX" },
      { name: "description", content: "Case studies from athletes placed via AthleteX." },
      { property: "og:title", content: "AthleteX success stories" },
      { property: "og:description", content: "Case studies from athletes placed via AthleteX." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AthleteX"
      title="Success stories."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX", to: "/athletex" }, { label: "Success" }]}
    />
  ),
});
