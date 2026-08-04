import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { LegalContent, LegalSection } from "@/components/site/LegalContent";

export const Route = createFileRoute("/legal/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Morgan Oxford" },
      { name: "description", content: "Terms of use for Morgan Oxford Education." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Terms"
      crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]}
    >
      <LegalContent>
        <LegalSection title="Our service">
          <p>
            Morgan Oxford Education provides advisory and placement support for international school
            admissions. We do not guarantee admission to any specific school. Final decisions rest
            with the school in question.
          </p>
        </LegalSection>
        <LegalSection title="Engagement & fees">
          <p>
            Specific tuition fees and scope of work are agreed directly with your family before work
            begins, and are set out in a separate engagement letter rather than on this page.
          </p>
        </LegalSection>
        <LegalSection title="Intellectual property">
          <p>
            All content on this site belongs to Morgan Oxford Education unless otherwise credited.
          </p>
        </LegalSection>
        <LegalSection title="Liability">
          <p>
            We advise in good faith based on the information you provide and our knowledge of partner
            schools, but we aren't liable for decisions made independently by schools, universities,
            visa authorities, or other third parties.
          </p>
        </LegalSection>
        <LegalSection title="Governing law">
          <p>
            These terms are governed by the laws of England &amp; Wales and, where applicable to our
            Nigeria operations, the Federal Republic of Nigeria.
          </p>
        </LegalSection>
      </LegalContent>
    </PageShell>
  ),
});
