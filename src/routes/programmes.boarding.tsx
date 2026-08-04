import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs, ProgrammeDetail } from "@/components/site/ProgrammeDetail";

export const Route = createFileRoute("/programmes/boarding")({
  head: () => ({
    meta: [
      { title: "Boarding School Placement — Morgan Oxford" },
      {
        name: "description",
        content: "Boarding school placement with guidance on pastoral care, house culture and academic rigour.",
      },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Programme" title="Boarding School Placement" crumbs={ProgrammeCrumbs("Boarding")}>
      <ProgrammeDetail
        slug="boarding"
        title="Boarding School Placement"
        intro="Boarding is a bigger decision than day placement, and we treat it as one. We guide families through the UK's boarding system in particular — weighing pastoral care, house culture and academic rigour alongside each other, since the right boarding school is as much about how your child will be looked after as what they'll study."
        bullets={[
          "Guidance on full boarding vs. weekly/flexi boarding",
          "Introductions to housemasters/housemistresses, not just admissions offices",
          "Guardianship arrangements coordinated alongside placement",
          "Entrance exam and interview preparation through partner tutors",
        ]}
      />
    </PageShell>
  ),
});
