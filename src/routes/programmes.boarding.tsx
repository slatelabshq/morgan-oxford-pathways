import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/programmes/boarding")({
  head: () => ({
    meta: [
      { title: "Boarding programme — Morgan Oxford" },
      { name: "description", content: "Morgan Oxford's Boarding placement service across UK independent schools." },
      { property: "og:title", content: "Boarding — Morgan Oxford" },
      { property: "og:description", content: "Boarding placement, advised end-to-end." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Boarding"
      lede="Programme detail coming soon."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Programmes", to: "/programmes" },
        { label: "Boarding" },
      ]}
    />
  ),
});
