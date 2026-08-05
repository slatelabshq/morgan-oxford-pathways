import { createFileRoute } from "@tanstack/react-router";
import { ParentEnquiryForm } from "@/components/forms/ParentEnquiryForm";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/enquire/contact")({
  head: () => ({
    meta: [
      { title: "Talk to Us — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Tell us about your child and we'll be in touch within 48 hours. Offices in Oxford, Lagos, Abuja and Port Harcourt.",
      },
      { property: "og:title", content: "Talk to Us — Morgan Oxford Education" },
      {
        property: "og:description",
        content: "We'll be in touch within 48 hours.",
      },
    ],
  }),
  component: () => (
    <PageShell
      hero={{ ...HERO.contact, titleAccent: undefined }}
      eyebrow="Enquire"
      title="Talk to Us"
      lede="Share a few details and we'll be in touch within 48 hours."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Enquire", to: "/enquire" },
        { label: "Contact" },
      ]}
    >
      <div className="mx-auto max-w-2xl contact-form-glow [&_button[type=submit]]:btn-glow">
        <ParentEnquiryForm />
      </div>
    </PageShell>
  ),
});
