import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { LegalContent, LegalSection } from "@/components/site/LegalContent";

export const Route = createFileRoute("/legal/safeguarding")({
  head: () => ({
    meta: [
      { title: "Safeguarding — Morgan Oxford" },
      { name: "description", content: "Safeguarding policy for Morgan Oxford Education." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Safeguarding"
      crumbs={[{ label: "Home", to: "/" }, { label: "Safeguarding" }]}
    >
      <LegalContent>
        <LegalSection title="Our commitment">
          <p>
            Morgan Oxford Education works with families placing children in schools overseas, and —
            through AthleteX — collects information directly about minors, including date of birth
            and video footage. We take the safeguarding of every young person we work with
            seriously.
          </p>
        </LegalSection>
        <LegalSection title="What this means in practice">
          <p>
            We only collect the minimum information needed to make a good placement recommendation.
            We never publish identifying information about a minor without explicit parental
            consent. Any footage or photos submitted through AthleteX are used solely for placement
            and scouting purposes, never public marketing, without separate written consent.
          </p>
        </LegalSection>
        <LegalSection title="Raising a concern">
          <p>
            If you have a safeguarding concern about our conduct or a partner school/guardian's
            conduct, contact our safeguarding lead at{" "}
            <a href="mailto:enquiries@morganoxfordeducation.co.uk" className="text-foreground underline">
              enquiries@morganoxfordeducation.co.uk
            </a>{" "}
            (named lead and dedicated contact to be confirmed).
          </p>
        </LegalSection>
      </LegalContent>
    </PageShell>
  ),
});
