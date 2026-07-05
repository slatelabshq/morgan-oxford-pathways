import { createFileRoute } from "@tanstack/react-router";
import { SchoolPlacementForm } from "@/components/forms/SchoolPlacementForm";

export const Route = createFileRoute("/enquire/school-placement")({
  head: () => ({
    meta: [
      { title: "School placement enquiry — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Start a UK school placement enquiry with Morgan Oxford Education — day, boarding, sixth form. A consultant replies within one working day.",
      },
      {
        property: "og:title",
        content: "School placement enquiry — Morgan Oxford Education",
      },
      {
        property: "og:description",
        content:
          "Structured placement enquiry: parent, student, academic snapshot, budget and preferences.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-8 text-sm text-destructive">
      Couldn't load the placement form: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl p-8">Not found.</div>
  ),
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Placement
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display,serif)] text-4xl font-semibold text-foreground md:text-5xl">
          School placement enquiry
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Tell us about the student and what you're aiming for. A consultant will
          reply within one working day.
        </p>
      </header>
      <SchoolPlacementForm />
    </main>
  );
}
