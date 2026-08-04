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
          "For 13 years, Morgan Oxford Education has guided Nigerian and international families through school placement in the UK, USA, Canada and beyond — matching every child to the right school, for the right reasons.",
      },
      { property: "og:title", content: "Morgan Oxford Education" },
      {
        property: "og:description",
        content:
          "Independent international school placement, run from Oxford and across Nigeria. ICEF-accredited. 13 years of guiding families.",
      },
    ],
  }),
  component: Home,
});

const TRUST = [
  { value: "13", label: "Years guiding families" },
  { value: "ICEF", label: "Accredited agency" },
  { value: "4", label: "Offices · Oxford, Lagos, Abuja & Port Harcourt" },
  { value: "48h", label: "We reply within 48 hours" },
];

function Home() {
  return (
    <main id="main">
      <PageHero
        image={HERO.home}
        eyebrow="Oxford · Lagos · Abuja · Port Harcourt · Est. 2013"
        title="Your child's dream school is now"
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

      {/* Trust strip — dark navy stat panel */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[color:var(--brand-ink)] via-[color:var(--brand-ink)] to-[color:var(--brand-royal)]/70 p-6 shadow-[0_30px_80px_-30px_rgb(var(--glass-shadow)/0.6)] sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[color:var(--brand-gold)]/10 blur-3xl"
          />
          <StaggerGrid className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {TRUST.map((t) => (
              <StaggerItem key={t.label}>
                <div className="card-glow flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:p-10">
                  <p className="font-display text-4xl font-semibold leading-none tracking-tight text-[color:var(--brand-gold)] sm:text-5xl">
                    {t.value}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--brand-paper)]/75 sm:text-sm">
                    {t.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
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
            Talk to us about your child →
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
