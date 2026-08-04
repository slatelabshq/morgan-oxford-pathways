import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

const SPORTS = [
  "football",
  "basketball",
  "tennis",
  "swimming",
  "volleyball",
  "athletics",
] as const;

export const Route = createFileRoute("/athletex/sports/")({
  head: () => ({
    meta: [
      { title: "AthleteX sports" },
      {
        name: "description",
        content:
          "Sports covered by the AthleteX pathway: football, basketball, tennis, swimming, volleyball, athletics/track.",
      },
      { property: "og:title", content: "AthleteX sports" },
      { property: "og:description", content: "Sports covered by the AthleteX pathway." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AthleteX"
      title="Sports we cover."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX", to: "/athletex" }, { label: "Sports" }]}
    >
      <ul className="flex flex-wrap gap-2">
        {SPORTS.map((s) => (
          <li key={s}>
            <Link
              to="/athletex/sports/$sport"
              params={{ sport: s }}
              className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium capitalize transition-colors hover:border-primary hover:text-primary"
            >
              {s === "athletics" ? "Athletics/Track" : s}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  ),
});
