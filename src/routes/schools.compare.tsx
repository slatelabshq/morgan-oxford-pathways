import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/schools/compare")({
  head: () => ({
    meta: [
      { title: "Compare schools — Morgan Oxford" },
      { name: "description", content: "Side-by-side comparison of up to three UK independent schools." },
      { property: "og:title", content: "Compare schools" },
      { property: "og:description", content: "Compare fees, results, boarding and sport at UK independent schools." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Compare"
      title="Compare up to three schools."
      lede="Fees, results, boarding, sport and admissions — side-by-side."
      crumbs={[{ label: "Home", to: "/" }, { label: "Schools", to: "/schools" }, { label: "Compare" }]}
    />
  ),
});
