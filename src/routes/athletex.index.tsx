import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";

type Pathway = { sport: string; body: string };

const PATHWAYS: Pathway[] = [
  {
    sport: "Football",
    body: "Placement into schools and academies with structured football pathways, from grassroots development through to academy-affiliated programmes.",
  },
  {
    sport: "Basketball",
    body: "Schools with competitive basketball programmes and coaching pedigree, for students serious about the game at school and beyond.",
  },
  {
    sport: "Tennis",
    body: "Access to schools with strong tennis coaching infrastructure, suited to players balancing tournament schedules with academic study.",
  },
  {
    sport: "Swimming",
    body: "Placement into schools with performance swimming programmes, pool access, and coaching support for competitive swimmers.",
  },
  {
    sport: "Volleyball",
    body: "Placement into schools with competitive volleyball programmes and coaching pathways, for players balancing club and school commitments.",
  },
  {
    sport: "Athletics/Track",
    body: "Access to schools with strong athletics and track programmes, for sprinters, distance runners and field athletes serious about competing at school and beyond.",
  },
];

export const Route = createFileRoute("/athletex/")({
  head: () => ({
    meta: [
      { title: "AthleteX Pathways — Where talent meets the right school" },
      {
        name: "description",
        content:
          "Morgan Oxford's dedicated route for student-athletes — placing footballers, basketballers, tennis players and swimmers into schools that take both academics and sport seriously.",
      },
      { property: "og:title", content: "AthleteX Pathways" },
      {
        property: "og:description",
        content:
          "Schools built to develop the whole athlete — sport and academics, without compromise.",
      },
    ],
  }),
  component: () => (
    <PageShell
      hero={{ ...HERO.athletex, titleAccent: "Preparations." }}
      zone="athletex"
      eyebrow="AthleteX Pathways"
      title="Where talent meets"
      lede="AthleteX Pathways is Morgan Oxford Education's dedicated route for student-athletes — placing young footballers, basketballers, tennis players, and swimmers into schools that take both their academics and their sport seriously."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX" }]}
    >
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-signal)]">
          Why AthleteX exists
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          A talented young athlete doesn't need a compromise — they need a school built to develop both.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          AthleteX Pathways exists to find that school: institutions with serious sporting programmes and academic environments strong enough to keep every door open.
        </p>
      </section>

      <section className="mt-12">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">Pathways</h3>
        <StaggerGrid className="mt-6 grid gap-4 sm:grid-cols-2">
          {PATHWAYS.map((p) => (
            <StaggerItem key={p.sport}>
              <article className="card-glow is-athletex h-full rounded-2xl border border-border bg-card p-6">
                <h4 className="font-display text-lg font-semibold">{p.sport}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 sm:p-10">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">Scholarships & Scouting</h3>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
          We work to connect promising student-athletes with schools offering sports scholarships, and with scouting relationships where they exist. Every family's situation is different — some students are looking for their first serious sporting environment, others are already competing at a representative level and need a school that won't get in the way of that trajectory.
        </p>
        <div className="mt-6">
          <Link
            to="/athletex/enquiry"
            className="btn-glow is-athletex inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Enquire about AthleteX Pathways →
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
