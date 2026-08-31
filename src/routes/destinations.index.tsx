import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";
import { DESTINATIONS } from "@/lib/destinations-content";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Where in the world is right for your child? UK, USA, Canada, Europe and beyond — advised by country, curriculum, culture and long-term goals.",
      },
      { property: "og:title", content: "Destinations — Morgan Oxford" },
      {
        property: "og:description",
        content: "The best destination depends on your child, not a league table.",
      },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  return (
    <PageShell
      hero={HERO.destinations}
      eyebrow="Destinations"
      title="Where in the world is right for"
      lede="We help families weigh up academic systems, culture, cost, and long-term goals across our core destinations."
      crumbs={[{ label: "Home", to: "/" }, { label: "Destinations" }]}
    >
      <StaggerGrid className="grid gap-8 md:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <StaggerItem key={d.slug}>
            <Link
              to="/destinations/$slug"
              params={{ slug: d.slug }}
              className="group card-glow flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                <img
                  src={d.image}
                  alt={d.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
                  <MapPin className="h-3 w-3" /> Destination
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold">{d.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d.blurb}</p>
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted-foreground">
                  {d.narrative}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  Explore {d.label} <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="mt-12">
        <Link
          to="/enquire/contact"
          className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Not sure which destination fits? Talk to us →
        </Link>
      </div>
    </PageShell>
  );
}
