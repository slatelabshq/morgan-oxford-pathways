# Contact Page

Create a new `/contact` route that combines the Morgan Oxford reference project's contact details with our existing `ContactForm` component and glass styling.

## New file: `src/routes/contact.tsx`

Route: `createFileRoute("/contact")` with SEO `head()` (title, description, og:title, og:description).

Uses `PageShell` for hero + breadcrumbs (matching `enquire.contact.tsx` pattern) so the page slots into the site's existing look.

Layout: 2-col grid on `lg` (form left, offices aside right).

**Left column** — heading + short lede + `<ContactForm />` wrapped in the same `contact-form-glow` treatment used on `enquire.contact.tsx`.

**Right column (aside)** — office cards using data from the reference `SITE.offices` (hard-coded inline; we don't need a shared `site.ts`):
- **United Kingdom** — 54 Davenant Road, Oxford OX2 8BY, UK · +44 (0)7710 763474 · enquiries@morganoxfordeducation.co.uk
- **Nigeria** — Rooftop, 33 Kofo Abayomi Street, Victoria Island, Lagos 100001 · +234 (0)806 527 7726 · enquiries@morganoxfordeducation.co.uk

Each card: `glass rounded-3xl p-6 card-glow` with country eyebrow in `text-brand-gold`, `MapPin`/`Phone`/`Mail` icons, `tel:` and `mailto:` links, and a WhatsApp CTA link (`https://wa.me/2348065277726`) styled as a subtle inline row.

Below the cards: a lazy-loaded Google Maps iframe (`https://www.google.com/maps?q=Oxford,UK&output=embed`) inside a `glass rounded-3xl aspect-[4/3]` frame, matching the reference.

## Nav

Add a `Contact` entry to the Core nav in `src/components/site/SiteHeader.tsx` (`CORE_NAV`, pointing to `/contact`) and to `SiteFooter` if it has a matching quick-links list. Keep the "Enquire" CTA button unchanged.

## Out of scope
- No changes to `ContactForm`, its schema, or the submit endpoint — reused as-is (posts to `/api/enquiries`, redirects to `/enquiry/thanks`).
- No changes to `enquire.contact.tsx` (it stays as the enquire-flow variant).
- No new shared `site.ts` — office data lives inline in the route file.
- No design token changes; reuses existing `glass`, `card-glow`, `brand-gold`, `PageShell`, `HERO`.
