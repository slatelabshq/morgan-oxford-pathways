import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

export const Route = createFileRoute("/enquire/contact")({
  head: () => ({
    meta: [
      { title: "Contact Morgan Oxford Education" },
      { name: "description", content: "Contact the Morgan Oxford team — expect a reply within 2 working days." },
      { property: "og:title", content: "Contact Morgan Oxford" },
      { property: "og:description", content: "Reach the Morgan Oxford team." },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.contact}
      eyebrow="Contact"
      title="Get in touch."
      lede="Send a message and a consultant will reply within 2 working days."
      crumbs={[{ label: "Home", to: "/" }, { label: "Enquire", to: "/enquire" }, { label: "Contact" }]}
    >
      <ContactForm />
    </PageShell>
  ),
});
