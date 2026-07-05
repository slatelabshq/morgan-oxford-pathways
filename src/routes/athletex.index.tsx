import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { StaggerGrid } from "@/components/StaggerGrid";
import { StaggerItem } from "@/components/StaggerItem";

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
      <StaggerGrid className="grid gap-4 sm:grid-cols-2">
        <StaggerItem><CardLink to="/athletex/sports" title="Sports we cover" note="Football, rugby, tennis, athletics and more." /></StaggerItem>
        <StaggerItem><CardLink to="/athletex/schools" title="Sports-specialist schools" note="The subset of UK schools with real programmes." /></StaggerItem>
        <StaggerItem><CardLink to="/athletex/scholarship" title="Scholarship & scout enquiry" note="Athlete profile, key stats, highlight reel." /></StaggerItem>
        <StaggerItem><CardLink to="/athletex/success" title="Success stories" note="Case studies from placed athletes." /></StaggerItem>
      </StaggerGrid>
    </PageShell>
  ),
});

function CardLink({ to, title, note }: { to: string; title: string; note: string }) {
  return (
    <Link to={to} className="block h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-in-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:shadow-xl">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
    </Link>
  );
}
