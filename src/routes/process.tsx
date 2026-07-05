import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

const STEPS = [
  {
    n: 1,
    title: "Consultation",
    body: "We start with a detailed questionnaire covering your child's academic history, interests, and long-term aspirations — plus your priorities as a family. The more we know, the better our advice.",
  },
  {
    n: 2,
    title: "Recommendation",
    body: "Using everything we've learned, we put together a shortlist of schools genuinely matched to your child — with clear reasoning for every recommendation, including destination country where relevant.",
  },
  {
    n: 3,
    title: "Introduction",
    body: "Once you've chosen a direction, we make contact with your shortlisted schools directly, opening the door on your behalf.",
  },
  {
    n: 4,
    title: "Preparation",
    body: "If a school requires entrance exams or interviews, we connect you with partner tutors who prepare students specifically for that school's process.",
  },
  {
    n: 5,
    title: "Ongoing Support",
    body: "From visas and guardianship arrangements through to organising school visits wherever possible, we stay involved until your child is settled — not just until the offer letter arrives.",
  },
];

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — From first conversation to first day" },
      {
        name: "description",
        content:
          "Every placement follows the same careful process — consultation, recommendation, introduction, preparation, and ongoing support.",
      },
      { property: "og:title", content: "The Morgan Oxford placement process" },
      {
        property: "og:description",
        content:
          "How we place families in international schools, end-to-end — because the details are where families get let down elsewhere.",
      },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.process}
      eyebrow="Process"
      title="From first conversation to"
      lede="Every placement follows the same careful process — because the details are where families get let down elsewhere."
      crumbs={[{ label: "Home", to: "/" }, { label: "Process" }]}
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-[color:var(--brand-gold)]/60 via-[color:var(--brand-gold)]/25 to-[color:var(--brand-gold)]/60 sm:block"
        />
        <ol className="space-y-6">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="card-glow group relative grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8"
            >
              <div className="flex items-start">
                <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--brand-gold)] bg-background font-display text-lg font-semibold text-[color:var(--brand-gold)]">
                  {s.n}
                </span>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold sm:text-2xl">
                  Step {s.n} — {s.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12">
        <Link
          to="/enquire/contact"
          className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Ready to start? Begin your consultation →
        </Link>
      </div>
    </PageShell>
  ),
});
