import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/schools/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${humanise(params.slug)} — school profile` },
      { name: "description", content: `Profile, results, sport and admissions notes for ${humanise(params.slug)}.` },
      { property: "og:title", content: `${humanise(params.slug)} — Morgan Oxford` },
      { property: "og:description", content: `Independent advisory notes on ${humanise(params.slug)}.` },
    ],
  }),
  component: SchoolProfile,
  notFoundComponent: () => <PageShell title="School not found" crumbs={[{ label: "Home", to: "/" }, { label: "Schools", to: "/schools" }, { label: "Not found" }]} />,
});

function humanise(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
}

function SchoolProfile() {
  const { slug } = Route.useParams();
  const name = humanise(slug);
  return (
    <PageShell
      eyebrow="School profile"
      title={name}
      lede="Profile content will be populated from the schools dataset."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Schools", to: "/schools" },
        { label: name },
      ]}
    />
  );
}
