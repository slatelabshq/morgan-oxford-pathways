import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, MapPin } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";

const DESTINATIONS = [
  {
    label: "United Kingdom",
    body: "A world-class destination for school education, home to boarding schools with centuries of academic tradition and some of the most respected qualifications in the world. The UK system can look complicated from the outside — GCSEs, A-Levels, IB, sixth form — but it's also one of the most flexible in the world once you understand how the pieces fit together. Strong investment in facilities, highly regarded teaching staff, and a genuinely international, multicultural student population make it a consistent first choice for the families we work with.",
  },
  {
    label: "North America",
    body: "From day schools across the US and Canada to boarding options with strong pathway records into North American universities, we advise on placement that fits the family's long-term destination as well as the child's academic profile. Full destination details coming soon — talk to us for a shortlist matched to your child.",
  },
  {
    label: "Europe",
    body: "Placement options across mainland Europe for families looking beyond the UK — with existing partner relationships across countries including Germany, Hungary, and the Republic of Ireland. We'll help you weigh curriculum, language of instruction, and long-term progression before shortlisting.",
  },
  {
    label: "Beyond",
    body: "For families exploring further afield — Australia, New Zealand, Malaysia, and destinations across Africa — we can advise on school placement options as part of a wider conversation about what's right for your child.",
  },
];

export const Route = createFileRoute("/schools/")({
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
        content:
          "The best destination depends on your child, not a league table.",
      },
    ],
  }),
  component: DestinationsIndex,
});

function DestinationsIndex() {
  return (
    <PageShell
      hero={HERO.schools}
      eyebrow="Destinations"
      title="Where in the world is right for your"
      lede="The best destination depends on your child, not a league table. We help families weigh up academic systems, culture, cost, and long-term goals across our core destinations."
      crumbs={[{ label: "Home", to: "/" }, { label: "Destinations" }]}
    >
      <div className="mb-8 flex items-center gap-3">
        <span className="icon-chip"><Compass className="h-5 w-5" aria-hidden /></span>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          Core regions
        </p>
      </div>

      <StaggerGrid className="grid gap-6 md:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <StaggerItem key={d.label}>
            <article className="card-glow h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="icon-chip"><MapPin className="h-5 w-5" aria-hidden /></span>
                <h2 className="font-display text-2xl font-semibold">{d.label}</h2>
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{d.body}</p>
            </article>
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
