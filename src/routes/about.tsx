import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Morgan Oxford Education" },
      {
        name: "description",
        content:
          "13 years placing families into the UK's leading independent schools — run from Oxford, with offices across Lagos, Abuja and Port Harcourt, Nigeria.",
      },
      { property: "og:title", content: "About Morgan Oxford Education" },
      {
        property: "og:description",
        content: "Independent, Oxford-based school placement consultancy.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      hero={HERO.about}
      eyebrow="About"
      title="Founded in Oxford. Built for the families"
      lede="For 13 years, Morgan Oxford Education has placed students into the UK's leading independent schools, with offices across Nigeria and a growing athlete practice under AthleteX Pathways."
      crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
    >
      <div className="mx-auto max-w-3xl space-y-12">
        <section>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Where we started</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Morgan Oxford Education was founded in Oxford in 2013 by Richard Morgan, built around a
            simple observation: more families than ever wanted an international education for their
            children, and almost none of them had a straightforward way to navigate it. What
            started as a small placement practice has grown into an agency with real, working
            relationships across the UK's top independent schools.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Where we are now</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Today, Morgan Oxford Education is run from Oxford, UK, with offices in Lagos, Abuja and
            Port Harcourt, Nigeria — reflecting where most of the families we work with are based.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">AthleteX</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            In recent years we've built a dedicated practice for student-athletes — AthleteX
            Pathways — placing footballers, basketballers, table tennis and volleyball players, swimmers
            and track athletes into schools built to take both their sport and their academics
            seriously.{" "}
            <Link to="/athletex" className="font-semibold text-foreground underline">
              Learn more about AthleteX Pathways →
            </Link>
          </p>
        </section>

        <div>
          <Link
            to="/enquire/contact"
            className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Talk to us about your child →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
