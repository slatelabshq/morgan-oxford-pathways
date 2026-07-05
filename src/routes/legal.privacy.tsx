import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Morgan Oxford" },
      { name: "description", content: "Privacy policy for Morgan Oxford Education." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Privacy"
      crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
    />
  ),
});
