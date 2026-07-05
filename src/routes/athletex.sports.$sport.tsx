import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/athletex/sports/$sport")({
  head: ({ params }) => ({
    meta: [
      { title: `${cap(params.sport)} — AthleteX` },
      { name: "description", content: `${cap(params.sport)} scholarship and scouting pathways with AthleteX.` },
      { property: "og:title", content: `${cap(params.sport)} — AthleteX` },
      { property: "og:description", content: `${cap(params.sport)} pathway by Morgan Oxford AthleteX.` },
    ],
  }),
  component: SportPage,
});

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SportPage() {
  const { sport } = Route.useParams();
  return (
    <PageShell
      eyebrow="Sport"
      title={cap(sport)}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "AthleteX", to: "/athletex" },
        { label: "Sports", to: "/athletex/sports" },
        { label: cap(sport) },
      ]}
    />
  );
}
