import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Quote, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";

const STORIES = [
  {
    icon: Quote,
    tag: "A-Level Placement · UK Boarding School",
    quote:
      "He went the extra mile in assisting me in my application to do A-Level at a UK boarding school — hands-on at every stage, always there to deal with issues and answer queries as they arose.",
    attribution: "Alumna, Day Waterman College",
  },
  {
    icon: Award,
    tag: "Scholarship Placement · Mount St. Mary",
    body: "An alumna of Day Waterman College was awarded a full scholarship to study her A-Levels at Mount St. Mary in the UK — a placement built on matching her academic profile precisely to a school's scholarship criteria.",
  },
  {
    icon: Sparkles,
    tag: "Sixth Form & Pathway Options",
    body: "For students weighing up A-Levels, an International Foundation Year, the IB Diploma, or vocational routes, we've placed students into sixth-form colleges chosen for their social, academic, and pastoral strengths — not just their exam results.",
  },
];

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Success Stories — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Real students, real placements, real outcomes. We measure success one student at a time — by whether the school we recommended turned out to be the right one.",
      },
      { property: "og:title", content: "Success Stories — Morgan Oxford" },
      {
        property: "og:description",
        content: "Featured placements from families we've guided.",
      },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.insights}
      eyebrow="Success Stories"
      title="Real students. Real placements."
      lede="We measure success one student at a time — not by volume, but by whether the school we recommended turned out to be the right one."
      crumbs={[{ label: "Home", to: "/" }, { label: "Success Stories" }]}
    >
      <StaggerGrid className="grid gap-6 md:grid-cols-3">
        {STORIES.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.tag}>
              <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="icon-chip"><Icon className="h-5 w-5" aria-hidden /></span>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {s.tag}
                  </p>
                </div>
                {s.quote ? (
                  <>
                    <blockquote className="mt-2 font-display text-lg italic leading-snug text-foreground">
                      “{s.quote}”
                    </blockquote>
                    <p className="mt-4 text-sm text-muted-foreground">— {s.attribution}</p>
                  </>
                ) : (
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</p>
                )}
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGrid>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/insights"
          className="btn-glow inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Read more stories →
        </Link>
        <Link
          to="/enquire/contact"
          className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Start your own story →
        </Link>
      </div>
    </PageShell>
  ),
});
