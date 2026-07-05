import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/programmes/sixth-form")({
  head: () => ({
    meta: [
      { title: "Sixth Form programme — Morgan Oxford" },
      { name: "description", content: "Morgan Oxford's Sixth Form placement service across UK independent schools." },
      { property: "og:title", content: "Sixth Form — Morgan Oxford" },
      { property: "og:description", content: "Sixth Form placement, advised end-to-end." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Sixth Form"
      lede="Programme detail coming soon."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Programmes", to: "/programmes" },
        { label: "Sixth Form" },
      ]}
    />
  ),
});
