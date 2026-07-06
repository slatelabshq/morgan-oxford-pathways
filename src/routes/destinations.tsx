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
    body: "A world-class destination for school education, home to boarding schools with centuries of academic tradition and some of the most respected qualifications in the world. The UK system can look complicated from the outside — GCSEs, A-Levels, IB, sixth form — but it's also one of the most flexible in the world once you understand how the pieces fit together. Strong investment in facilities, highly regarded teaching staff, and a genuinely international, multicultural student population make it a consistent first choice for the families we work with.",
  },
  {
    label: "North America",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1600&q=80",
    alt: "New York skyline representing North American school and university corridors",
    blurb: "Day schools, boarding and Ivy-track pathways across the US and Canada.",
    body: "From day schools across the US and Canada to boarding options with strong pathway records into North American universities, we advise on placement that fits the family's long-term destination as well as the child's academic profile. Full destination details coming soon — talk to us for a shortlist matched to your child.",
  },
  {
    label: "Europe",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
    alt: "Historic European city rooftops at sunset",
    blurb: "Partner schools across Germany, Hungary, Ireland and beyond.",
    body: "Placement options across mainland Europe for families looking beyond the UK — with existing partner relationships across countries including Germany, Hungary, and the Republic of Ireland. We'll help you weigh curriculum, language of instruction, and long-term progression before shortlisting.",
  },
  {
    label: "Beyond",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    alt: "Wider-world horizon evoking Australia, New Zealand, Malaysia and Africa",
    blurb: "Australia, New Zealand, Malaysia and destinations across Africa.",
    body: "For families exploring further afield — Australia, New Zealand, Malaysia, and destinations across Africa — we can advise on school placement options as part of a wider conversation about what's right for your child.",
  },
];

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Where in the world is right for your child? UK, North America, Europe and beyond — advised by country, curriculum, culture and long-term goals.",
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
      hero={HERO.schools}
      eyebrow="Destinations"
      title="Where in the world is right for your"
      lede="The best destination depends on your child, not a league table. We help families weigh up academic systems, culture, cost, and long-term goals across our core destinations."
      crumbs={[{ label: "Home", to: "/" }, { label: "Destinations" }]}
    >
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          Core regions
        </p>
      </div>

      <StaggerGrid className="grid gap-6 md:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <StaggerItem key={d.label}>
      <StaggerGrid className="grid gap-8 md:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <StaggerItem key={d.label}>
            <Link
              to="/enquire/contact"
              className="group card-glow flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_-12px_color-mix(in_oklab,var(--brand-navy)_35%,transparent)]"
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
