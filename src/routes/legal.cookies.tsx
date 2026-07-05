import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — Morgan Oxford" },
      { name: "description", content: "Cookies policy for Morgan Oxford Education." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Cookies"
      crumbs={[{ label: "Home", to: "/" }, { label: "Cookies" }]}
    />
  ),
});
