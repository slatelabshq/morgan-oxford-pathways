import { createFileRoute, Link } from "@tanstack/react-router";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { PageHero } from "@/components/site/PageHero";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morgan Oxford Education — International school placement" },
      {
        name: "description",
        content:
          "For 13 years, Morgan Oxford Education has guided families through international school placement — matching students to the right school, in the right country, for the right reasons.",
      },
      { property: "og:title", content: "Morgan Oxford Education" },
      {
        property: "og:description",
        content:
          "Independent international school placement — Oxford, Lagos, Cairo. ICEF-accredited, 13 years of guiding families.",
      },
    ],
  }),
  component: Home,
});

const TRUST = [
  { k: "13 years", v: "guiding families through international school placement" },
  { k: "ICEF-accredited", v: "renewed annually as a mark of quality and professional standards" },
  { k: "3 global offices", v: "Oxford · Lagos · Cairo" },
  { k: "48-hour response", v: "on every enquiry" },
  { k: "Partner schools", v: "across the UK, North America, Europe, and beyond" },
];

function Home() {
  return (
    <main id="main">
      <PageHero
        image={HERO.home}
        eyebrow="Oxford · Lagos · Cairo · Est. 2011"
        title="Every child's next school should feel"
        lede="For 13 years, Morgan Oxford Education has guided families through the world of international school placement — matching students to the right school, in the right country, for the right reasons."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/enquire/contact"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start your enquiry
          </Link>
          <Link
            to="/athletex"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md border border-[color:var(--brand-paper)]/60 bg-transparent px-6 text-sm font-semibold text-[color:var(--brand-paper)] hover:bg-[color:var(--brand-paper)]/10"
          >
            Explore AthleteX Pathways
          </Link>
        </div>
      </PageHero>

      {/* Audience routing */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <StaggerGrid className="grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <Link
              to="/enquire/contact"
              className="card-glow group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                I'm a parent
              </p>
              <p className="mt-4 font-display text-2xl font-medium leading-snug">
                "I want the clearest, most trustworthy path to the right school for my child — without wading through it alone."
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                See how placement works <span aria-hidden>→</span>
              </span>
            </Link>
          </StaggerItem>

          <StaggerItem>
            <Link
              to="/athletex"
              className="card-glow is-athletex group relative block h-full overflow-hidden rounded-2xl border border-[color:var(--brand-signal)] bg-[color:var(--brand-jet)] p-8 text-[color:var(--brand-bone)]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-signal)]">
                I'm a student-athlete
              </p>
              <p className="mt-4 font-display text-2xl font-medium leading-snug">
                "I want a school that develops my game as seriously as my grades."
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Explore AthleteX Pathways <span aria-hidden>→</span>
              </span>
            </Link>
          </StaggerItem>
        </StaggerGrid>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST.map((t) => (
            <li key={t.k} className="flex flex-col items-start">
              <span className="gold-divider mb-3" aria-hidden />
              <p className="font-display text-lg font-semibold text-foreground">{t.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.v}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why families choose us */}
      <section className="mx-auto max-w-4xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          Why families choose us
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Real relationships with real schools, built over more than a decade.
        </h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Choosing a school overseas is one of the biggest decisions a family will make — and one of the hardest to get right from a distance. We built Morgan Oxford Education to close that gap: real relationships with real schools, built over more than a decade, so that the advice you get isn't generic. It's specific to your child.
          </p>
          <p>
            We start by listening. Every placement begins with understanding who your child actually is — their strengths, their ambitions, the kind of environment they'll thrive in — before we ever suggest a single school.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/enquire/contact"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Begin the conversation →
          </Link>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          Success stories
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Real students. Real placements. Real outcomes.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          We measure success one student at a time — not by volume, but by whether the school we recommended turned out to be the right one.
        </p>

        <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                A-Level Placement · UK Boarding School
              </p>
              <blockquote className="mt-4 font-display text-lg italic leading-snug text-foreground">
                “He went the extra mile in assisting me in my application to do A-Level at a UK boarding school — hands-on at every stage, always there to deal with issues and answer queries as they arose.”
              </blockquote>
              <p className="mt-4 text-sm text-muted-foreground">— Alumna, Day Waterman College</p>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Scholarship Placement · Mount St. Mary
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                An alumna of Day Waterman College was awarded a full scholarship to study her A-Levels at Mount St. Mary in the UK — a placement built on matching her academic profile precisely to a school's scholarship criteria.
              </p>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Sixth Form & Pathway Options
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                For students weighing up A-Levels, an International Foundation Year, the IB Diploma, or vocational routes, we've placed students into sixth-form colleges chosen for their social, academic, and pastoral strengths — not just their exam results.
              </p>
            </article>
          </StaggerItem>
        </StaggerGrid>

        <div className="mt-10">
          <Link
            to="/enquire/contact"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Start your own story →
          </Link>
        </div>
      </section>
    </main>
  );
}
