import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ProgrammeCrumbs, ProgrammeDetail } from "@/components/site/ProgrammeDetail";

export const Route = createFileRoute("/programmes/summer")({
  head: () => ({
    meta: [
      { title: "Summer & Winter Programs — Morgan Oxford" },
      {
        name: "description",
        content: "Short-term summer and winter programmes abroad — a low-commitment way to test a destination.",
      },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Programme"
      title="Summer & Winter Programs"
      crumbs={ProgrammeCrumbs("Summer & Winter")}
    >
      <ProgrammeDetail
        slug="summer"
        title="Summer & Winter Programs"
        intro="Short-term, high-impact. For families who want their child to experience an international academic environment — or simply build confidence and independence — before committing to a full placement, we arrange summer and winter programmes with trusted partner institutions abroad."
        bullets={[
          "Programmes from two weeks to a full term",
          "A low-commitment way to test a destination before a full placement decision",
          "Guardianship and travel logistics arranged alongside the programme",
        ]}
      />
    </PageShell>
  ),
});
