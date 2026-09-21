import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

const VALID_SPORTS = [
  "football",
  "basketball",
  "tennis",
  "swimming",
  "volleyball",
  "athletics",
] as const;

const SPORT_COPY: Record<(typeof VALID_SPORTS)[number], { title: string; body: string }> = {
  football: {
    title: "Football",
    body: "Placement into schools and academies with structured football pathways, from grassroots development through to academy-affiliated programmes.",
  },
  basketball: {
    title: "Basketball",
    body: "Schools with competitive basketball programmes and coaching pedigree, for students serious about the game at school and beyond.",
  },
  tennis: {
    title: "Tennis",
    body: "Access to schools with strong tennis coaching infrastructure, suited to players balancing tournament schedules with academic study.",
  },
  swimming: {
    title: "Swimming",
    body: "Placement into schools with performance swimming programmes, pool access, and coaching support for competitive swimmers.",
  },
  volleyball: {
    title: "Volleyball",
    body: "Placement into schools with competitive volleyball programmes and coaching pathways, for players balancing club and school commitments.",
  },
  athletics: {
    title: "Athletics/Track",
    body: "Access to schools with strong athletics and track programmes, for sprinters, distance runners and field athletes serious about competing at school and beyond.",
  },
};

export const Route = createFileRoute("/athletex/sports/$sport")({
  head: ({ params }) => {
    const copy = SPORT_COPY[params.sport as keyof typeof SPORT_COPY];
    const title = copy?.title ?? params.sport;
    return {
      meta: [
        { title: `${title} — AthleteX` },
        {
          name: "description",
          content: `${title} scholarship and scouting pathways with AthleteX.`,
        },
        { property: "og:title", content: `${title} — AthleteX` },
        { property: "og:description", content: `${title} pathway by Morgan Oxford AthleteX.` },
      ],
    };
  },
  component: SportPage,
});

function SportPage() {
  const { sport } = Route.useParams();
  const copy = SPORT_COPY[sport as keyof typeof SPORT_COPY];

  if (!copy) {
    return (
      <PageShell
        eyebrow="Sport"
        title="Sport not found"
        crumbs={[
          { label: "Home", to: "/" },
          { label: "AthleteX", to: "/athletex" },
          { label: "Sports", to: "/athletex/sports" },
        ]}
      >
        <p className="text-muted-foreground">
          This sport is not part of the AthleteX pathway.{" "}
          <Link to="/athletex/sports" className="font-semibold underline">
            View all sports
          </Link>
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Sport"
      title={copy.title}
      lede={copy.body}
      crumbs={[
        { label: "Home", to: "/" },
        { label: "AthleteX", to: "/athletex" },
        { label: "Sports", to: "/athletex/sports" },
        { label: copy.title },
      ]}
    >
      <Link
        to="/athletex/enquiry"
        className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        Enquire about {copy.title} →
      </Link>
    </PageShell>
  );
}
