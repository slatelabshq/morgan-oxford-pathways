import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { LegalContent, LegalSection } from "@/components/site/LegalContent";

export const Route = createFileRoute("/legal/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Morgan Oxford" },
      { name: "description", content: "Privacy policy for Morgan Oxford Education." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Privacy"
      crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
    >
      <LegalContent>
        <LegalSection title="What we collect">
          <p>
            Contact details, information about your child (age, current school, academic history),
            and any documents you choose to share with us as part of a placement enquiry. For
            AthleteX, this may also include date of birth and a link to footage of the athlete.
          </p>
        </LegalSection>
        <LegalSection title="Why we collect it">
          <p>
            To advise on and arrange school placement, and to introduce your family to schools,
            tutors, guardians and — where relevant — AthleteX partner schools and scouts on your
            behalf.
          </p>
        </LegalSection>
        <LegalSection title="How long we keep it">
          <p>
            For as long as we're actively working with your family, and for a reasonable period
            afterwards in case you return to us — full retention periods to be confirmed.
          </p>
        </LegalSection>
        <LegalSection title="Who we share it with">
          <p>
            Only the schools, tutors, and guardians directly relevant to your enquiry, and only with
            your consent. We do not sell or share your data with unrelated third parties.
          </p>
        </LegalSection>
        <LegalSection title="International transfers">
          <p>
            As we operate from both the UK and Nigeria, your data may be processed in either
            country. We take reasonable steps to protect it in both.
          </p>
        </LegalSection>
        <LegalSection title="Your rights">
          <p>
            You can ask to see what we hold on your family, correct it, or ask us to delete it, at
            any time — contact{" "}
            <a href="mailto:enquiries@morganoxfordeducation.co.uk" className="text-foreground underline">
              enquiries@morganoxfordeducation.co.uk
            </a>
            .
          </p>
        </LegalSection>
      </LegalContent>
    </PageShell>
  ),
});
