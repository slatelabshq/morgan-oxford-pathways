import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs, ProgrammeDetail } from "@/components/site/ProgrammeDetail";

export const Route = createFileRoute("/programmes/day-school")({
  head: () => ({
    meta: [
      { title: "Day School Placement — Morgan Oxford" },
      {
        name: "description",
        content: "Day school placement for families moving from Nigerian primary or prep schools into international day schools.",
      },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Programme" title="Day School Placement" crumbs={ProgrammeCrumbs("Day School")}>
      <ProgrammeDetail
        slug="day-school"
        title="Day School Placement"
        intro="Whether your child is moving from a Nigerian primary or prep school into an international day school, or transferring mid-way through secondary education, we start with your child. We take the time to understand their strengths, interests and the kind of environment they'll thrive in, then match that against schools we know well."
        bullets={[
          "A shortlist matched to your child's academic and personal profile, not just exam results",
          "Direct introductions to admissions teams on your behalf",
          "Entrance exam and interview preparation through partner tutors",
          "Support through to enrolment and settling in",
        ]}
      />
    </PageShell>
  ),
});
