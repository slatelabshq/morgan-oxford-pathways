import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

const OFFICES = [
  {
    city: "Lagos",
    address: "Rooftop, 33 Kofo Abayomi Street, Victoria Island, Lagos, 100001",
    phone: "+234 (0)806 527 7726",
    phoneHref: "tel:+2348065277726",
    email: "marketing@morganoxfordeducation.co.uk",
  },
  {
    city: "Oxford",
    address: "54 Davenant Road, Oxford OX2 8BY, UK",
    phone: "+44 (0)7710 763474",
    phoneHref: "tel:+447710763474",
    email: "enquiries@morganoxfordeducation.co.uk",
  },
];

const INTEREST_AREAS = [
  "K-12",
  "Boarding",
  "Pathway College",
  "Summer / Winter School",
  "Student Exchange",
  "AthleteX Pathways",
];

export const Route = createFileRoute("/enquire/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's find the right school together" },
      {
        name: "description",
        content:
          "Tell us about your child and we'll be in touch within 48 hours. Offices in Oxford and Lagos.",
      },
      { property: "og:title", content: "Contact Morgan Oxford Education" },
      {
        property: "og:description",
        content: "48-hour response promise on every enquiry.",
      },
    ],
  }),
  component: () => (
    <PageShell
      hero={HERO.contact}
      eyebrow="Contact"
      title="Let's find the right school"
      lede="Tell us about your child, and we'll be in touch within 48 hours."
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Enquire", to: "/enquire" },
        { label: "Contact" },
      ]}
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Enquiry
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Send us a message
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Areas we can advise on: {INTEREST_AREAS.join(" · ")}. Include your child's
            current year/grade and any country of interest in your message.
          </p>
          <div className="contact-form-glow mt-8 [&_button[type=submit]]:btn-glow">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Our offices
          </p>
          {OFFICES.map((o) => (
            <article
              key={o.city}
              className="card-glow rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-display text-xl font-semibold">{o.city}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{o.address}</p>
              <p className="mt-2 text-sm">
                <a href={o.phoneHref} className="font-medium text-foreground hover:underline">
                  {o.phone}
                </a>
              </p>
              <p className="mt-2 text-sm">
                <a href={`mailto:${o.email}`} className="font-medium text-foreground hover:underline break-all">
                  {o.email}
                </a>
              </p>
            </article>
          ))}
        </aside>
      </div>
    </PageShell>
  ),
});
