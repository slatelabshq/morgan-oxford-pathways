import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/programmes/day-school")({
  head: () => ({
    meta: [
      { title: "Day School programme — Morgan Oxford" },
      { name: "description", content: "Morgan Oxford's Day School placement service across UK independent schools." },
      { property: "og:title", content: "Day School — Morgan Oxford" },
      { property: "og:description", content: "Day School placement, advised end-to-end." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Day School"
      lede="Programme detail coming soon."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Programmes", to: "/programmes" },
        { label: "Day School" },
      ]}
    />
  ),
});
