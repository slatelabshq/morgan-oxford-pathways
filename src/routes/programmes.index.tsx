import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  BookOpen,
  GraduationCap,
  Plane,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";
import { HERO } from "@/lib/hero-images";

type Service = { label: string; body: string; icon: LucideIcon };

const SERVICES: Service[] = [
  {
    icon: GraduationCap,
    label: "K-12 Placement",
    body: "From primary transitions through to secondary school, we help families find schools that match their child academically, culturally, and personally. We take the time to understand long-term aspirations — not just this year's report card — so the school we recommend is one your child can genuinely grow into.",
  },
  {
    icon: Building2,
    label: "Boarding School Placement",
    body: "Boarding is a significant step, and we treat it as one. We guide families through the UK's boarding system in particular — a landscape with schools whose academic traditions stretch back centuries — helping you weigh pastoral care, house culture, and academic rigour alongside each other, not in isolation.",
  },
  {
    icon: BookOpen,
    label: "Pathway College Placement",
    body: "For students preparing for IGCSE, A-Levels, the IB Diploma, or an International Foundation Year, we connect families with pathway providers and sixth-form colleges that build the right academic foundation for what comes next — with genuine advantages that are social, academic, and supportive in equal measure.",
  },
  {
    icon: Sun,
    label: "Summer & Winter Schools",
    body: "Short-term, high-impact. For families who want their child to experience an international academic environment — or simply build confidence and independence — before committing to a full placement, we arrange summer and winter school programmes with trusted partner institutions abroad.",
  },
  {
    icon: Plane,
    label: "Student Exchange Programmes",
    body: "For students ready to spend a term or a year immersed in another country's education system, we arrange exchange placements that combine academic continuity with the kind of cultural fluency no classroom alone can teach.",
  },
];

const HOW_WE_WORK = [
  { n: 1, t: "Consultation", b: "we get to know your child through a detailed questionnaire and conversation" },
  { n: 2, t: "Recommendation", b: "a shortlist of schools matched to their strengths and your family's priorities" },
  { n: 3, t: "Introduction", b: "we make direct contact with your chosen schools on your behalf" },
  { n: 4, t: "Preparation", b: "entrance exam and interview support through our partner tutors" },
  { n: 5, t: "Ongoing support", b: "visas, guardianship, and school visits, from offer through to settling in" },
];

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: [
      { title: "Services — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "School placement, done properly — K-12, boarding, pathway college, summer/winter schools, and student exchange programmes.",
      },
      { property: "og:title", content: "Services — Morgan Oxford" },
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
      eyebrow="Services"
      title="School placement, done"
      lede="International school admissions can feel like a maze of curricula, entry requirements, and unfamiliar systems. We've spent over a decade building the relationships and know-how to cut through that — so you make a confident decision, not a rushed one."
      crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
    >
      <StaggerGrid className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.label}>
              <article className="card-glow h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="icon-chip"><Icon className="h-5 w-5" aria-hidden /></span>
                  <h2 className="font-display text-xl font-semibold sm:text-2xl">{s.label}</h2>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGrid>

      <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          How we work
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          Five steps, one named consultant.
        </h2>

        <div className="relative mt-8">
          {/* connector line (desktop) */}
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
