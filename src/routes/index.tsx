import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, Globe2, GraduationCap, School, Trophy, Users, Zap } from "lucide-react";
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
  { icon: Clock, k: "13 years", v: "guiding families through international school placement" },
  { icon: BadgeCheck, k: "ICEF-accredited", v: "renewed annually as a mark of quality and professional standards" },
  { icon: Globe2, k: "3 global offices", v: "Oxford · Lagos · Cairo" },
  { icon: Zap, k: "48-hour response", v: "on every enquiry" },
  { icon: School, k: "Partner schools", v: "across the UK, North America, Europe, and beyond" },
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
              <div className="mb-4 flex items-center gap-3">
                <span className="icon-chip"><Users className="h-5 w-5" aria-hidden /></span>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  I'm a parent
                </p>
              </div>
              <p className="mt-2 font-display text-2xl font-medium leading-snug">
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
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--brand-signal)]/60 bg-[color:var(--brand-signal)]/15 text-[color:var(--brand-signal)]">
                  <Trophy className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-signal)]">
                  I'm a student-athlete
                </p>
              </div>
              <p className="mt-2 font-display text-2xl font-medium leading-snug">
                "I want a school that develops my game as seriously as my grades."
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                Explore AthleteX Pathways <span aria-hidden>→</span>
              </span>
            </Link>
          </StaggerItem>
        </StaggerGrid>
      </section>

      {/* Trust strip — infographic */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.k} className="flex flex-col items-start">
                <span className="icon-chip mb-4"><Icon className="h-5 w-5" aria-hidden /></span>
                <span className="gold-divider mb-3" aria-hidden />
                <p className="font-display text-lg font-semibold text-foreground">{t.k}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.v}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Why families choose us */}
      <section className="mx-auto max-w-4xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="icon-chip"><GraduationCap className="h-5 w-5" aria-hidden /></span>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Why families choose us
          </p>
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
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
    </main>
  );
}
