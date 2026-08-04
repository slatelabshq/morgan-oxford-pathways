import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs, ProgrammeDetail } from "@/components/site/ProgrammeDetail";

export const Route = createFileRoute("/programmes/guardianship")({
  head: () => ({
    meta: [
      { title: "Guardianship — Morgan Oxford" },
      {
        name: "description",
        content: "UK guardianship for boarding students — vetted guardians, exeats, half-terms and emergency contact.",
      },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Programme" title="Guardianship" crumbs={ProgrammeCrumbs("Guardianship")}>
      <ProgrammeDetail
        slug="guardianship"
        title="Guardianship"
        intro="For students boarding or studying in the UK without family close by, we arrange guardianship with vetted, experienced guardians — covering half-term and exeat weekends, emergency contact, and the day-to-day support a school expects a guardian to provide."
        bullets={[
          "Vetted, experienced UK guardians",
          "Coordination with the school's own guardianship requirements",
          "Support during half-terms, exeats, and school holidays",
          "A single point of contact for the family back home",
        ]}
      />
    </PageShell>
  ),
});
