import { createFileRoute } from "@tanstack/react-router";
import { AthleteXScholarshipForm } from "@/components/forms/AthleteXScholarshipForm";

export const Route = createFileRoute("/athletex/scholarship")({
  head: () => ({
    meta: [
      {
        title: "AthleteX scholarship enquiry — Morgan Oxford Education",
      },
      {
        name: "description",
        content:
          "Apply to the AthleteX pathway. Football, basketball, tennis, swimming, volleyball, athletics — boarding school and university pathways.",
      },
      {
        property: "og:title",
        content: "AthleteX scholarship enquiry",
      },
      {
        property: "og:description",
        content:
          "Athlete profile, key stats and video link — reviewed by the AthleteX scouting desk within 48 hours.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="zone-athletex min-h-dvh bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            AthleteX
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Scholarship enquiry
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Athletes, parents and coaches — submit a profile. The scouting desk reviews within 48
            hours.
          </p>
        </header>
        <AthleteXScholarshipForm />
      </div>
    </main>
  );
}
