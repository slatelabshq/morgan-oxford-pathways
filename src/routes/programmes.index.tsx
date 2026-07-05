import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

const PROGRAMMES = [
  { to: "/programmes/day-school", label: "Day school", note: "3–18, term-time attendance from home." },
  { to: "/programmes/boarding", label: "Boarding", note: "Full, weekly and flexi across 7–18." },
  { to: "/programmes/sixth-form", label: "Sixth form", note: "A-Level, IB and BTEC for 16–18." },
  { to: "/programmes/summer", label: "Summer", note: "Immersive July / August programmes." },
  { to: "/programmes/guardianship", label: "Guardianship", note: "UK guardian appointed for international boarders." },
] as const;

export const Route = createFileRoute("/programmes/")({
  head: () => ({
    meta: [
      { title: "Programmes — Morgan Oxford" },
      { name: "description", content: "Day, boarding, sixth form, summer and guardianship programmes advised end-to-end." },
      { property: "og:title", content: "Morgan Oxford programmes" },
      { property: "og:description", content: "Every route into UK independent education." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programmes"
      title="Every route into UK independent education."
      lede="Five programme types, one consultant, one shortlist."
      crumbs={[{ label: "Home", to: "/" }, { label: "Programmes" }]}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMMES.map((p) => (
          <li key={p.to}>
            <Link to={p.to} className="block rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
              <h2 className="font-display text-xl font-semibold">{p.label}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  ),
});
