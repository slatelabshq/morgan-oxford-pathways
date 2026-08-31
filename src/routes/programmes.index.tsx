import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";
import { SIXTH_FORM_INTRO } from "@/lib/sixth-form-pathways";

type Programme = {
  label: string;
  body: string;
  to:
    | "/programmes/day-school"
    | "/programmes/boarding"
    | "/programmes/sixth-form"
    | "/programmes/summer"
    | "/programmes/guardianship";
};

const PROGRAMMES: Programme[] = [
  {
    label: "Day School",
    to: "/programmes/day-school",
    body: "Whether your child is moving from a Nigerian primary or prep school into an international day school, or transferring mid-way through secondary education, we start with your child.",
  },
  {
    label: "Boarding",
    to: "/programmes/boarding",
    body: "Boarding is a bigger decision than day placement, and we treat it as one — weighing pastoral care, house culture and academic rigour alongside each other.",
  },
  {
    label: "Sixth Form",
    to: "/programmes/sixth-form",
    body: SIXTH_FORM_INTRO,
  },
  {
    label: "Summer",
    to: "/programmes/summer",
    body: "Short-term, high-impact summer and winter programmes abroad — a low-commitment way to test a destination before a full placement decision.",
  },
  {
    label: "Guardianship",
    to: "/programmes/guardianship",
    body: "When a student is studying abroad without family nearby, we arrange guardianship with vetted guardians — across the UK, Canada, the USA, and our other placement destinations.",
  },
];

const HOW_WE_WORK = [
  { n: 1, t: "Consultation", b: "we get to know your child through a detailed questionnaire and conversation" },
  { n: 2, t: "Recommendation", b: "a shortlist of schools matched to their strengths and your family's priorities" },
  { n: 3, t: "Application", b: "we make direct contact with your chosen schools and manage the application on your behalf" },
  { n: 4, t: "Preparation", b: "entrance exam and interview support through our partner tutors" },
  { n: 5, t: "Visa Support", b: "we manage the visa process end-to-end once your child has an offer" },
];

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: [
      { title: "Programmes — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "School placement, done properly — day school, boarding, sixth form, summer programmes, and guardianship.",
      },
      { property: "og:title", content: "Programmes — Morgan Oxford" },
      {
        property: "og:description",
        content:
          "Over a decade of relationships and know-how across international school admissions.",
      },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.programmes}
      eyebrow="Programmes"
      title="School placement, done"
      lede="International school admissions can feel like a maze of curricula, entry requirements, and unfamiliar systems. We've spent over a decade building the relationships and know-how to cut through that — so you make a confident decision, not a rushed one."
      crumbs={[{ label: "Home", to: "/" }, { label: "Programmes" }]}
    >
      <StaggerGrid className="grid gap-6 md:grid-cols-2">
        {PROGRAMMES.map((p) => (
          <StaggerItem key={p.to}>
            <Link
              to={p.to}
              className="card-glow group flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8 transition-colors hover:border-[color:var(--brand-gold)]/50"
            >
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{p.label}</h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">{p.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                Learn more <span aria-hidden>→</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          How we work
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          Five steps, one named consultant.
        </h2>

        <div className="relative mt-8">
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 right-6 top-5 hidden h-px bg-gradient-to-r from-[color:var(--brand-gold)]/50 via-[color:var(--brand-gold)]/25 to-[color:var(--brand-gold)]/50 lg:block"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_WE_WORK.map((s) => (
              <li key={s.n} className="relative">
                <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--brand-gold)] bg-background font-display text-sm font-semibold text-[color:var(--brand-gold)]">
                  {s.n}
                </span>
                <p className="mt-3 font-display text-lg font-semibold">{s.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8">
          <Link
            to="/process"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-foreground hover:bg-muted"
          >
            See the full process →
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
