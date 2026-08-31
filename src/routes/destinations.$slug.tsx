import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DestinationDetail } from "@/components/site/DestinationDetail";
import { getDestination } from "@/lib/destinations-content";

export const Route = createFileRoute("/destinations/$slug")({
  head: ({ params }) => {
    const destination = getDestination(params.slug);
    const title = destination
      ? `${destination.label} — Destinations`
      : "Destination not found";
    return {
      meta: [
        { title: `${title} — Morgan Oxford Education` },
        {
          name: "description",
          content:
            destination?.narrative.slice(0, 155) ??
            "Destination guide from Morgan Oxford Education.",
        },
        { property: "og:title", content: title },
      ],
    };
  },
  component: DestinationPage,
  notFoundComponent: () => (
    <PageShell
      title="Destination not found"
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Destinations", to: "/destinations" },
        { label: "Not found" },
      ]}
    >
      <Link to="/destinations" className="text-sm font-semibold underline">
        ← Back to destinations
      </Link>
    </PageShell>
  ),
});

function DestinationPage() {
  const { slug } = Route.useParams();
  const destination = getDestination(slug);

  if (!destination) {
    return (
      <PageShell
        title="Destination not found"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Destinations", to: "/destinations" },
          { label: "Not found" },
        ]}
      >
        <Link to="/destinations" className="text-sm font-semibold underline">
          ← Back to destinations
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Destination"
      title={destination.label}
      lede={destination.blurb}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Destinations", to: "/destinations" },
        { label: destination.label },
      ]}
    >
      <DestinationDetail destination={destination} />
    </PageShell>
  );
}
