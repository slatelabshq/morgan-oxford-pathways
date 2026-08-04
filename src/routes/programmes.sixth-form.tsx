import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs, ProgrammeDetail } from "@/components/site/ProgrammeDetail";

export const Route = createFileRoute("/programmes/sixth-form")({
  head: () => ({
    meta: [
      { title: "Sixth Form & Pathway Placement — Morgan Oxford" },
      {
        name: "description",
        content: "Sixth form and pathway placement — A-Levels, IB, Foundation Year and vocational routes.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Sixth Form & Pathway Placement"
      crumbs={ProgrammeCrumbs("Sixth Form")}
    >
      <ProgrammeDetail
        slug="sixth-form"
        title="Sixth Form & Pathway Placement"
        intro="For students weighing up A-Levels, the IB Diploma, an International Foundation Year, or a vocational route, we place students into sixth-form colleges and pathway providers chosen for their social, academic and pastoral strengths, not just their exam scores."
        bullets={[
          "Clear guidance on A-Levels vs. IB vs. Foundation Year vs. vocational routes",
          "Shortlisting based on progression record into your child's target destination",
          "Entrance exam and interview preparation through partner tutors",
          "Support from application through to enrolment",
        ]}
      />
    </PageShell>
  ),
});
