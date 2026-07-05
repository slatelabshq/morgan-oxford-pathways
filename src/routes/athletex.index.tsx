import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/athletex/")({
  head: () => ({
    meta: [
      { title: "AthleteX — sports scholarship pathway" },
      { name: "description", content: "Scholarship placement, scouting and school-to-pro pathways for athletes 13–24." },
      { property: "og:title", content: "AthleteX by Morgan Oxford" },
      { property: "og:description", content: "The athlete pathway into UK boarding, NCAA and pro sport." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AthleteX"
      title="Sport-first placement, without compromise on schooling."
      lede="Scholarship-track placement, scouting and school-to-pro pathways for athletes 13–24."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX" }]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <CardLink to="/athletex/sports" title="Sports we cover" note="Football, rugby, tennis, athletics and more." />
        <CardLink to="/athletex/schools" title="Sports-specialist schools" note="The subset of UK schools with real programmes." />
        <CardLink to="/athletex/scholarship" title="Scholarship & scout enquiry" note="Athlete profile, key stats, highlight reel." />
        <CardLink to="/athletex/success" title="Success stories" note="Case studies from placed athletes." />
      </div>
    </PageShell>
  ),
});

function CardLink({ to, title, note }: { to: string; title: string; note: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
    </Link>
  );
}
