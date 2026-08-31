import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs, ProgrammeDetail } from "@/components/site/ProgrammeDetail";

export const Route = createFileRoute("/programmes/guardianship")({
  head: () => ({
    meta: [
      { title: "Guardianship — Morgan Oxford" },
      {
        name: "description",
        content:
          "International school guardianship — vetted guardians, school breaks, holidays, and emergency contact across our placement destinations.",
      },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Programme" title="Guardianship" crumbs={ProgrammeCrumbs("Guardianship")}>
      <ProgrammeDetail
        slug="guardianship"
        title="Guardianship"
        intro="When a student is boarding or studying abroad without family close by, we sign and coordinate guardianship contracts with vetted, experienced guardians — covering school breaks and holidays, emergency contact, and the practical support schools and families expect, wherever we have placed your child."
        bullets={[
          "Vetted, experienced guardians across the UK, Canada, the USA, and beyond",
          "Coordination with each school's guardianship requirements in that destination",
          "Support during school breaks, holidays, and weekends when families can't be there",
          "A named point of contact for the family back home",
        ]}
      />
    </PageShell>
  ),
});
