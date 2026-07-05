import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

const searchSchema = z.object({
  kind: z
    .enum(["general", "school_placement", "athletex", "contact"])
    .optional(),
  ref: z.string().optional(),
  error: z.string().optional(),
});

export const Route = createFileRoute("/enquiry/thanks")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Enquiry received — Morgan Oxford Education" },
      {
        name: "description",
        content: "We've received your enquiry and will be in touch shortly.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-8 text-sm text-destructive">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl p-8">Not found.</div>
  ),
});

const copy: Record<
  string,
  { title: string; body: string; cta?: { to: string; label: string } }
> = {
  general: {
    title: "Thanks — we'll be in touch within 2 working days.",
    body: "Your enquiry is with the Morgan Oxford team. Keep an eye on your inbox (and spam folder just in case).",
    cta: { to: "/", label: "Back to home" },
  },
  school_placement: {
    title: "Placement enquiry received.",
    body: "A consultant will call you within 1 working day to talk through options.",
    cta: { to: "/", label: "Back to home" },
  },
  athletex: {
    title: "Application logged.",
    body: "The AthleteX scouting desk will review within 3 working days and be in touch.",
    cta: { to: "/enquire", label: "Explore CORE placements" },
  },
  contact: {
    title: "Message received.",
    body: "Expect a reply within 2 working days.",
    cta: { to: "/", label: "Back to home" },
  },
};

function Page() {
  const { kind, ref, error } = Route.useSearch();
  const c = copy[kind ?? "general"] ?? copy.general;
  const isAthleteX = kind === "athletex";

  return (
    <main
      className={
        isAthleteX
          ? "zone-athletex min-h-dvh bg-background text-foreground"
          : "min-h-dvh bg-background text-foreground"
      }
    >
      <div className="mx-auto max-w-xl px-6 py-20">
        {error ? (
          <div
            role="alert"
            className="mb-6 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            Your submission may not have saved — please try again or email
            hello@morganoxfordeducation.co.uk.
          </div>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {kind ? kind.replace("_", " ") : "Enquiry"}
        </p>
        <h1
          className={
            isAthleteX
              ? "mt-2 text-4xl font-bold uppercase tracking-tight text-foreground md:text-5xl"
              : "mt-2 font-[family-name:var(--font-display,serif)] text-4xl font-semibold text-foreground md:text-5xl"
          }
        >
          {c.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{c.body}</p>
        {ref ? (
          <p className="mt-6 text-sm text-foreground">
            Reference:{" "}
            <span className="rounded bg-muted px-2 py-1 font-mono text-xs uppercase tracking-wider">
              {ref}
            </span>
          </p>
        ) : null}
        {c.cta ? (
          <div className="mt-8">
            <Link
              to={c.cta.to}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {c.cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
