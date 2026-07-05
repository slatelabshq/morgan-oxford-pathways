import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Morgan Oxford insights` },
      { name: "description", content: "Morgan Oxford insight article." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const { slug } = Route.useParams();
    const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <PageShell
        eyebrow="Insight"
        title={title}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Insights", to: "/insights" },
          { label: title },
        ]}
      />
    );
  },
});
