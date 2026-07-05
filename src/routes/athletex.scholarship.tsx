import { createFileRoute } from "@tanstack/react-router";
import { AthleteXScholarshipForm } from "@/components/forms/AthleteXScholarshipForm";

export const Route = createFileRoute("/athletex/scholarship")({
  head: () => ({
    meta: [
      {
        title:
          "AthleteX scholarship & scout enquiry — Morgan Oxford Education",
      },
      {
        name: "description",
        content:
          "Apply to the AthleteX pathway or submit a scout enquiry. Football, basketball, tennis, swimming — UK boarding, NCAA and pro pathways.",
      },
      {
        property: "og:title",
        content: "AthleteX scholarship & scout enquiry",
      },
      {
        property: "og:description",
        content:
          "Athlete profile, key stats and highlight reel — reviewed by the AthleteX scouting desk within 3 working days.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-8 text-sm text-destructive">
      Couldn't load the AthleteX form: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl p-8">Not found.</div>
  ),
});

function Page() {
  return (
    <main className="zone-athletex min-h-dvh bg-background text-foreground">
      <div
        role="note"
        className="border-b border-border/60 bg-destructive/10 px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-destructive"
      >
        ⚑ Proposal — pending Seph sign-off
      </div>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            AthleteX
          </p>
          <h1 className="mt-2 text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
            Scholarship &amp; scout enquiry
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Athletes, parents, coaches and scouts — submit a profile. The
            scouting desk reviews within 3 working days.
          </p>
        </header>
        <AthleteXScholarshipForm />
      </div>
    </main>
  );
}
