import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/programmes/summer")({
  head: () => ({
    meta: [
      { title: "Summer programme — Morgan Oxford" },
      { name: "description", content: "Morgan Oxford's Summer placement service across UK independent schools." },
      { property: "og:title", content: "Summer — Morgan Oxford" },
      { property: "og:description", content: "Summer placement, advised end-to-end." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Summer"
      lede="Programme detail coming soon."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Programmes", to: "/programmes" },
        { label: "Summer" },
      ]}
    />
  ),
});
