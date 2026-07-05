# Morgan Oxford Education — Brand Identity System

Scope this pass: **brand identity only** (no marketing pages, no CRM). One cohesive design system with two zones — CORE (Morgan Oxford) and AthleteX (sub-brand) — plus a single showcase route that documents the system for Seph.

## Deliverables

1. **Design tokens** in `src/styles.css` — one palette, two zone layers.
2. **Type system** — serif + sans pairing via `@fontsource`.
3. **CORE logo suite** (SVG, in-repo).
4. **AthleteX wordmark + mark** (SVG, flagged as proposal).
5. **Brand showcase route** at `/brand` — logo lockups, palette, type scale, zone previews. Not linked from home; internal reference.

Home page stays as the current placeholder for now — marketing site is out of scope this pass.

## Zone system

One root token layer, then two zone classes that re-map semantic tokens:

- `:root` — CORE defaults (royal blue / white / gold).
- `.zone-athletex` — overrides `--primary`, `--accent`, `--background`, `--foreground` to black / red / metallic.

Any component under `<div className="zone-athletex">` inherits the bolder palette with zero code changes. Both zones share radius, spacing, type scale, shadows.

## Palette (proposed hex)

**CORE**
- Royal Blue `#0B2A5B` — primary
- Ink `#0A1733` — foreground
- Paper `#FBFAF6` — background
- Gold `#C9A24A` — accent (subtle, editorial use only)
- Slate `#5B6B85` — muted

**AthleteX**
- Jet `#0A0A0A` — background
- Bone `#F4F4F2` — foreground
- Signal Red `#D7263D` — primary
- Metallic `#C0C5CC` — accent (cool chrome)

Locked to design-question defaults; adjustable after Seph review.

## Type

- **Serif (display):** Fraunces — headlines, logo wordmark, editorial moments.
- **Sans (UI/body):** Inter — body, UI, labels.
- AthleteX zone shifts display weight heavier + tighter tracking; same families, different register.

Installed via `@fontsource/fraunces` and `@fontsource/inter`, imported in `src/start.ts` (or root client entry).

## Logos

All SVG, hand-authored, in `src/brand/`:

**CORE — Morgan Oxford Education**
- Primary lockup: monogram "MO" (interlocking serif) + full wordmark "Morgan Oxford Education" + tagline "Guiding Young Minds to World-Class Schools".
- Stacked lockup, horizontal lockup, mark-only, monochrome variants (ink, paper, gold).
- Optional crest treatment (thin gold rule + serif monogram) — subtle, not heraldic-kitsch.

**AthleteX (proposal, flagged)**
- Wordmark "AthleteX" — condensed sans, italic X as forward-motion accent.
- Mark: stylised "X" formed from two diagonal strokes, red on jet.
- Endorsement line: "by Morgan Oxford Education" in small caps sans.
- Variants: red/jet, bone/jet, mono.

## Showcase route `/brand`

Sections:
1. Intro — brand system overview.
2. CORE logo suite — all lockups on paper + ink backgrounds.
3. AthleteX suite — all lockups on jet + bone, with a visible "PROPOSAL — pending Seph sign-off" ribbon.
4. Palette — swatches with hex + token names, both zones.
5. Typography — display + body scale, sample headlines per zone.
6. Zone preview — two side-by-side cards showing a mini hero in each zone using shared components.

## Technical notes

- Tokens in `src/styles.css` under `@theme inline` + `:root` + `.zone-athletex`.
- Fonts via `@fontsource/*` (bun add), imported once in client entry.
- Logos as React components wrapping inline SVG so `currentColor` handles theming.
- New route file `src/routes/brand.tsx` with real `head()` metadata.
- No changes to `src/routes/index.tsx` this pass.

## Out of scope (next passes)

- Marketing pages (Home, About, Programmes, Schools, Process, Contact).
- AthleteX sub-section pages.
- Enquiry forms + Lovable Cloud persistence.
- CRM integration.
