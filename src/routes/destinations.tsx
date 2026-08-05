import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";

const DESTINATIONS = [
  {
    label: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80",
    alt: "Oxford's honey-stone college spires at dusk",
    blurb: "Oxford, Cambridge and centuries of boarding tradition.",
    body: "A world-class destination for school education, home to boarding schools with centuries of academic tradition and some of the most respected qualifications in the world. The UK system can look complicated from the outside — GCSEs, A-Levels, IB, sixth form — but it's also one of the most flexible in the world once you understand how the pieces fit together.",
  },
  {
    label: "USA",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1600&q=80",
    alt: "US school campus representing American day and boarding options",
    blurb: "Day schools and boarding with strong university pathways.",
    body: "From day schools across the US to boarding options with strong pathway records into US universities.",
  },
  {
    label: "Canada",
    image: "/destinations/canada.jpg",
    alt: "Toronto skyline and harbour representing Canadian school destinations",
    blurb: "Academic rigour at a lower cost of living than the US or UK.",
    body: "Canada's boarding and day schools are a strong option for families weighing academic rigour against a lower cost of living than the US or UK.",
  },
  {
    label: "Rest of Europe & Beyond",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
    alt: "Historic European city rooftops at sunset",
    blurb: "Switzerland, Australia, Kenya and other destinations.",
    body: "Placement options across Switzerland, Australia, Kenya and other destinations.",
  },
];

export const Route = createFileRoute("/destinations")({
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
          <StaggerItem key={d.label}>
            <Link
              to="/enquire/contact"
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
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{d.body}</p>
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
          Talk to us about the right destination →
        </Link>
      </div>
    </PageShell>
  );
}
