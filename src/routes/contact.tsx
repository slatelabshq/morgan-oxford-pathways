import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { HERO } from "@/lib/hero-images";

const OFFICES = [
  {
    city: "Oxford",
    address: "54 Davenant Road, Oxford OX2 8BY, United Kingdom",
    phone: "+44 (0)7710 763474",
    phoneHref: "tel:+447710763474",
    email: "enquiries@morganoxfordeducation.co.uk",
  },
  {
    city: "Lagos",
    address: "10, Ologun Agbaje, Victoria Island, Lagos",
    phone: "+234 (0)806 527 7726",
    phoneHref: "tel:+2348065277726",
    email: "enquiries@morganoxfordeducation.co.uk",
  },
];

const WHATSAPP_HREF = "https://wa.me/2348065277726";
const WHATSAPP_DISPLAY = "+234 806 527 7726";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Speak to Morgan Oxford Education. Offices in Oxford and Lagos. We respond within 48 hours.",
      },
      { property: "og:title", content: "Contact — Morgan Oxford Education" },
      {
        property: "og:description",
        content: "Offices across Oxford and Nigeria. We respond within 48 hours.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      hero={HERO.contact}
      eyebrow="Contact"
      title="Let's begin"
      lede="A consultant will respond within 48 hours."
      crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Enquire
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Parents — start here
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell us about your child and what you're exploring. We'll come back to you within 48
            hours.
          </p>
          <div className="mt-6">
            <Link
              to="/enquire/contact"
              className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Tell us about your child →
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Schools, agents, or something else?{" "}
            <Link to="/enquire" className="font-semibold text-foreground underline">
              Use our general enquiry form →
            </Link>
          </p>
        </div>

        <aside className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Our offices
          </p>

          {OFFICES.map((o) => (
            <article key={o.city} className="glass card-glow rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold">{o.city}</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--brand-gold)]" />
                  <span>{o.address}</span>
                </p>
                {o.phone && o.phoneHref ? (
                  <a
                    href={o.phoneHref}
                    className="flex items-center gap-3 text-foreground hover:text-[color:var(--brand-gold)]"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0 text-[color:var(--brand-gold)]" />
                    {o.phone}
                  </a>
                ) : null}
                <a
                  href={`mailto:${o.email}`}
                  className="flex items-center gap-3 break-all text-foreground hover:text-[color:var(--brand-gold)]"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-[color:var(--brand-gold)]" />
                  {o.email}
                </a>
              </div>
            </article>
          ))}

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="glass card-glow flex items-center gap-3 rounded-3xl p-6 text-sm"
          >
            <MessageCircle className="h-5 w-5 flex-shrink-0 text-[color:var(--brand-gold)]" />
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
                WhatsApp
              </span>
              <span className="mt-1 block font-medium text-foreground">{WHATSAPP_DISPLAY}</span>
            </span>
          </a>

          <div className="glass aspect-[4/3] overflow-hidden rounded-3xl p-1.5">
            <iframe
              title="Oxford office map"
              src="https://www.google.com/maps?q=54+Davenant+Road+Oxford+OX2+8BY&output=embed"
              className="h-full w-full rounded-2xl grayscale"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
