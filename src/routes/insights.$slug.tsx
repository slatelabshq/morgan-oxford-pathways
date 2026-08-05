import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Morgan Oxford blogs` },
      { name: "description", content: "Morgan Oxford blog article." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => {
    const { slug } = Route.useParams();
    const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    return (
      <PageShell
        eyebrow="Blog"
        title={title}
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Blogs", to: "/insights" },
          { label: title },
        ]}
      />
    );
  },
});
