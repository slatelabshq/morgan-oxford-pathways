import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { EventsList } from "@/components/site/EventsList";
import { EVENTS, eventsPageCopy } from "@/lib/events";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Education fairs, open days and in-person dates with Morgan Oxford Education — separate from our blogs.",
      },
      { property: "og:title", content: "Events — Morgan Oxford Education" },
      {
        property: "og:description",
        content: "Fair dates and opportunities to meet the Morgan Oxford team.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <PageShell
      hero={HERO.events}
      eyebrow={eventsPageCopy.eyebrow}
      title={eventsPageCopy.title}
      lede={eventsPageCopy.lede}
      crumbs={[{ label: "Home", to: "/" }, { label: "Events" }]}
    >
      <div className="mx-auto max-w-3xl">
        <EventsList events={EVENTS} />
      </div>
    </PageShell>
  );
}
