import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/programmes/guardianship")({
  head: () => ({
    meta: [
      { title: "Guardianship programme — Morgan Oxford" },
      { name: "description", content: "Morgan Oxford's Guardianship placement service across UK independent schools." },
      { property: "og:title", content: "Guardianship — Morgan Oxford" },
      { property: "og:description", content: "Guardianship placement, advised end-to-end." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Guardianship"
      lede="Programme detail coming soon."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Programmes", to: "/programmes" },
        { label: "Guardianship" },
      ]}
    />
  ),
});
