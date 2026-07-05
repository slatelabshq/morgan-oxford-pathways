import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/athletex/schools")({
  head: () => ({
    meta: [
      { title: "Sports-specialist schools — AthleteX" },
      { name: "description", content: "UK independent schools with genuine sports programmes and scholarship pathways." },
      { property: "og:title", content: "Sports-specialist schools" },
      { property: "og:description", content: "The AthleteX subset of UK independent schools." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AthleteX"
      title="Sports-specialist schools."
      lede="The subset of UK independent schools with credible programmes and scholarship pathways."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX", to: "/athletex" }, { label: "Schools" }]}
    />
  ),
});
