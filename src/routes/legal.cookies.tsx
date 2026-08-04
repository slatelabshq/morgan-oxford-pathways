import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { LegalContent, LegalSection } from "@/components/site/LegalContent";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — Morgan Oxford" },
      { name: "description", content: "Cookie policy for Morgan Oxford Education." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Legal"
      title="Cookies"
      crumbs={[{ label: "Home", to: "/" }, { label: "Cookies" }]}
    >
      <LegalContent>
        <LegalSection title="How we use cookies">
          <p>
            We use a small number of essential cookies to make this site work, and analytics cookies
            to understand how it's used, so we can improve it. You can manage or disable
            non-essential cookies through your browser settings at any time. See our{" "}
            <Link to="/legal/privacy" className="text-foreground underline">
              Privacy policy
            </Link>{" "}
            for more on how we handle any data collected this way.
          </p>
        </LegalSection>
      </LegalContent>
    </PageShell>
  ),
});
