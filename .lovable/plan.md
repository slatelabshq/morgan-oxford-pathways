## Goal
Add tasteful iconography, small infographic accents, and a soft glow-on-hover to CTAs and cards across the site — without changing content, colors, or layout.

## What I'll add

**1. Glow hover utility (styles.css)**
Add a single reusable class `.card-glow` that:
- adds `transition-shadow` on the base state
- on hover, applies a soft outer glow using brand tokens: `box-shadow: 0 10px 40px -10px color-mix(in oklab, var(--brand-royal) 45%, transparent), 0 0 0 1px color-mix(in oklab, var(--brand-gold) 35%, transparent)`
- in `.zone-athletex` scope, the glow re-tints to `--brand-signal` (red) so AthleteX cards glow red
- also add `.btn-glow` variant tuned for buttons (tighter radius, primary-colored halo)
- respects `prefers-reduced-motion` (no transition, glow still appears on hover)

**2. Apply to existing cards & CTAs**
- Home: audience-routing cards (parent / student-athlete), primary/secondary hero CTAs, "Begin the conversation" button → `card-glow` / `btn-glow`
- Services: 5 service cards + "See the full process" area
- AthleteX: 4 sport pathway cards + Scholarships CTA
- Destinations: 4 country cards + "Talk to us" CTA
- Success Stories: 3 story cards + both footer CTAs
- Process: 5 step cards + "Begin your consultation" CTA
- Contact: 2 office cards + submit button

**3. Icons (lucide-react, already installed)**
Add small, semantic icons — decorative, `aria-hidden`, gold or brand-royal tint:
- Home trust strip (5 stats): `Clock` (13 years), `BadgeCheck` (ICEF), `Globe2` (offices), `Zap` (48-hour), `School` (partners) — icon sits above the stat number
- Services cards: `GraduationCap`, `Building2`, `BookOpen`, `Sun`, `Plane` (one per service, top-left of card)
- AthleteX pathways: `Trophy` (Football), `Dribbble` (Basketball), `Circle` (Tennis — small), `Waves` (Swimming)
- Destinations: `MapPin` on each country card next to the H2
- Process steps: keep numeric badge, add a subtle right-aligned `ArrowRight` on hover of each step card
- Contact offices: `MapPin`, `Phone`, `Mail` inline with each line

**4. Infographic touches**
- Home trust strip: change from plain text list to a 5-column mini-infographic — each stat gets an icon in a circular gold-tinted chip above the number, with a thin gold divider connecting them on desktop only (`.gold-divider` utility already exists)
- Services "How we work" summary: add a horizontal connector line behind the 5 numbered steps (desktop only)
- Process page: add a vertical connector line down the left side of the step list, visually threading the numbered circles together

## Out of scope
- No color/typography changes
- No copy changes
- No new routes or components beyond the icon/infographic additions above
- No new dependencies (lucide-react and framer-motion are already installed)

## Files to change
- `src/styles.css` — add `.card-glow`, `.btn-glow`, athletex zone override
- `src/routes/index.tsx` — trust strip infographic, card + CTA glows, audience-card icons
- `src/routes/programmes.index.tsx` — service card icons, glow, connector on "How we work"
- `src/routes/athletex.index.tsx` — sport icons, glow
- `src/routes/schools.index.tsx` — MapPin on destination cards, glow
- `src/routes/insights.index.tsx` — story card glow, CTA glow
- `src/routes/process.tsx` — vertical connector, step card glow, arrow on hover
- `src/routes/enquire.contact.tsx` — inline icons on office cards, submit button glow (via wrapper class on the ContactForm section only, not editing the form component)