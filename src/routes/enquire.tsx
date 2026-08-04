import { createFileRoute } from "@tanstack/react-router";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";

export const Route = createFileRoute("/enquire")({
  head: () => ({
    meta: [
      { title: "Enquire — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Send a general enquiry or contact Morgan Oxford Education about tutoring, school placement, AthleteX or careers guidance.",
      },
      { property: "og:title", content: "Enquire — Morgan Oxford Education" },
      {
        property: "og:description",
        content:
          "Get in touch with Morgan Oxford Education about tutoring, placements or AthleteX.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnquirePage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-8 text-sm text-destructive">
      Couldn't load the enquiry page: {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl p-8">Not found.</div>
  ),
});

function EnquirePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Enquire
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display,serif)] text-4xl font-semibold text-foreground md:text-5xl">
          How can we help?
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Send a general enquiry below, or use{" "}
          <a
            className="underline underline-offset-2"
            href="/enquire/school-placement"
          >
            school placement
          </a>{" "}
          /{" "}
          <a className="underline underline-offset-2" href="/athletex/scholarship">
            AthleteX
          </a>{" "}
          for a fuller brief.
        </p>
      </header>

      <section aria-labelledby="general-heading">
        <h2
          id="general-heading"
          className="mb-4 text-lg font-semibold text-foreground"
        >
          General enquiry
        </h2>
        <GeneralEnquiryForm />
      </section>
    </main>
  );
}
