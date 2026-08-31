import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs } from "@/components/site/ProgrammeDetail";
import { SixthFormPathways } from "@/components/site/SixthFormPathways";
import { SIXTH_FORM_BULLETS, SIXTH_FORM_INTRO } from "@/lib/sixth-form-pathways";

export const Route = createFileRoute("/programmes/sixth-form")({
  head: () => ({
    meta: [
      { title: "Sixth Form & Pathway Placement — Morgan Oxford" },
      {
        name: "description",
        content:
          "Sixth form and pathway placement — A-Levels, IB Diploma, Canadian Secondary Diploma, AP and Foundation programmes.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Sixth Form & Pathway Placement"
      crumbs={ProgrammeCrumbs("Sixth Form")}
    >
      <section className="mx-auto max-w-5xl">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {SIXTH_FORM_INTRO}
        </p>
        <ul className="mt-8 max-w-3xl space-y-3">
          {SIXTH_FORM_BULLETS.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--brand-gold)]"
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-border pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Pathways we place into
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Every post-16 route, named clearly.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Families often arrive unsure whether A-Levels, IB, AP or a foundation year is the right
            fit. We shortlist schools and providers for the pathway that matches your child's
            destination — not a generic sixth-form label.
          </p>
          <SixthFormPathways className="mt-8" />
        </div>

        <div className="mt-10">
          <Link
            to="/enquire/contact"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Talk to us about sixth form &amp; pathway placement →
          </Link>
        </div>
      </section>
    </PageShell>
  ),
});
