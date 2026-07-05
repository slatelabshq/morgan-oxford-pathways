import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/legal/safeguarding")({
  head: () => ({
    meta: [
      { title: "Safeguarding — Morgan Oxford" },
      { name: "description", content: "Safeguarding policy for Morgan Oxford Education." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Safeguarding"
      crumbs={[{ label: "Home", to: "/" }, { label: "Safeguarding" }]}
    />
  ),
});
