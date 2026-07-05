import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Morgan Oxford" },
      { name: "description", content: "Terms policy for Morgan Oxford Education." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Terms"
      crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]}
    />
  ),
});
