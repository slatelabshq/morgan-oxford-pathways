import { createFileRoute } from "@tanstack/react-router";
import { SchoolPlacementForm } from "@/components/forms/SchoolPlacementForm";

export const Route = createFileRoute("/enquire/school-placement")({
  head: () => ({
    meta: [
      { title: "Tell us about your child — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Share a few details and one of our consultants will be in touch within 48 hours.",
      },
      {
        property: "og:title",
        content: "Tell us about your child — Morgan Oxford Education",
      },
      {
        property: "og:description",
        content: "A consultant will be in touch within 48 hours.",
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
    <main className="mx-auto max-w-xl px-6 py-12 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-gold)]">
          Enquire
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
          Tell us about your child.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          Share a few details below and one of our consultants will be in touch within 48 hours.
        </p>
      </header>
      <SchoolPlacementForm />
    </main>
  );
}
