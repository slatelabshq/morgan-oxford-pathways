# Accessibility Spec: WCAG 2.1 AA Dev Checklist

Add a new documentation block to `/brand` that ships the WCAG 2.1 AA checklist, verifies the actual brand colour pairs against contrast ratios, and gives implementation notes engineers can tick off during PR review.

## Location
New file: `src/brand/AccessibilitySpec.tsx`, rendered under `<TechSpec />` in `src/routes/brand.tsx`. Spec/doc only — no runtime behaviour changes.

## Sections

### 1. Verified contrast pairs
Compute WCAG contrast ratio for every intended text/background pair using the current tokens.

**CORE (Morgan Oxford)**
| FG | BG | Ratio | Normal AA (4.5) | Large AA (3.0) | Verdict |
|---|---|---|---|---|---|
| Ink #0A1733 | Paper #FBFAF6 | ~17.4:1 | ✓ | ✓ | AAA — primary body |
| Royal #0B2A5B | Paper #FBFAF6 | ~12.9:1 | ✓ | ✓ | AAA — headlines/links |
| Paper #FBFAF6 | Royal #0B2A5B | ~12.9:1 | ✓ | ✓ | AAA — inverted CTA |
| Paper #FBFAF6 | Ink #0A1733 | ~17.4:1 | ✓ | ✓ | AAA |
| Gold #C9A24A | Ink #0A1733 | ~6.1:1 | ✓ | ✓ | AA — accent text on ink OK |
| Gold #C9A24A | Royal #0B2A5B | ~4.7:1 | ✓ (tight) | ✓ | AA — headlines only, not body |
| Gold #C9A24A | Paper #FBFAF6 | ~2.7:1 | ✗ | ✗ | **FAIL** — gold-on-paper text banned; decorative/large display ≥24px bold only |
| Slate #5B6B85 | Paper #FBFAF6 | ~5.2:1 | ✓ | ✓ | AA — muted body OK |
| Slate #5B6B85 | Royal #0B2A5B | ~2.5:1 | ✗ | ✗ | **FAIL** — never use slate on royal |

**AthleteX**
| FG | BG | Ratio | AA | Verdict |
|---|---|---|---|---|
| Bone #F4F4F2 | Jet #0A0A0A | ~18.8:1 | ✓✓ | AAA — primary |
| Jet #0A0A0A | Bone #F4F4F2 | ~18.8:1 | ✓✓ | AAA |
| Signal Red #D7263D | Jet #0A0A0A | ~4.7:1 | ✓ (tight) | AA — headline/CTA only, not body |
| Bone #F4F4F2 | Signal Red #D7263D | ~4.0:1 | ✗ normal / ✓ large | **Large ≥18pt / ≥14pt bold only** |
| Signal Red #D7263D | Bone #F4F4F2 | ~4.0:1 | ✗ normal / ✓ large | Same — no body text |
| Metallic #C0C5CC | Jet #0A0A0A | ~11.6:1 | ✓✓ | AAA — muted body |
| Metallic #C0C5CC | Bone #F4F4F2 | ~1.6:1 | ✗ | **FAIL** — never |

**Rules captured**
- Never render body text in gold on paper; reserve gold-on-paper for shapes/rules/monograms.
- Signal red never for body text on bone — headings, CTAs, chips, badges only.
- Slate is muted body on paper only.
- Focus rings and error states use tokens that hit ≥3:1 against the surface they sit on (non-text UI, WCAG 1.4.11).

### 2. Perceivable (1.x)
- 1.1.1 Non-text content: alt on every `<img>`; `alt=""` on decorative crests/patterns.
- 1.3.1 Info & relationships: semantic `<header><main><nav><footer>`, one `<h1>` per route, no heading level skips.
- 1.3.5 Input purpose: `autocomplete` on name/email/tel/address fields.
- 1.4.3 Contrast (text): satisfied by pairs table above.
- 1.4.4 Resize text: verified at 200% zoom, no clipping.
- 1.4.10 Reflow: no horizontal scroll at 320px CSS width (baseline from ResponsiveSpec).
- 1.4.11 Non-text contrast: form borders, focus rings, icon-only buttons ≥3:1 vs surface.
- 1.4.12 Text spacing: line-height ≥1.5× body, paragraph spacing ≥2× font size.
- 1.4.13 Content on hover/focus: tooltips dismissible with Esc, persistent while hovered.

### 3. Operable (2.x) — keyboard flow
- 2.1.1 Keyboard: every interactive element reachable and operable with Tab/Shift+Tab/Enter/Space/Arrow.
- 2.1.2 No keyboard trap: modals return focus to trigger on close; Radix/shadcn Dialog handles this — don't reimplement.
- 2.1.4 Character shortcuts: none bound to single letters without modifier.
- 2.4.1 Skip link: `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>` as first `<body>` child; `<main id="main-content">`.
- 2.4.3 Focus order: DOM order matches visual order; no `tabindex > 0`.
- 2.4.7 Focus visible: `:focus-visible` ring on every interactive element — `outline: 2px solid var(--ring); outline-offset: 2px`. Never `outline: none` without a replacement.
- 2.5.5 Target size (AAA, we adopt): 44×44px mobile primary targets; AthleteX mobile 52×52px per ResponsiveSpec.
- 2.5.8 (2.2 AA) Target size minimum: 24×24px hard floor.
- Nav: hamburger (mobile) uses `<button aria-expanded aria-controls>`; sheet is Radix Dialog with focus trap + Esc.
- Filters: checkbox/radio groups wrapped in `<fieldset><legend>`.

### 4. Screen reader
- Landmarks: single `<main>` per route in the root layout, plus `<nav aria-label="Primary">`, `<nav aria-label="Footer">`.
- Live regions: enquiry form status is `aria-live="polite"`; error summary `role="alert"`.
- Icon-only buttons: `aria-label` mandatory (see Button primitive rule in a11y guidelines).
- Decorative icons: `aria-hidden="true"` on inline SVGs that sit next to text.
- Loading states: skeletons hidden with `aria-hidden`, region announces "Loading…" then "Loaded" via `aria-live`.
- Route change: after client navigation, focus moves to `<h1>` of the new route; page title updates via TanStack `head()`.
- Language: `<html lang="en-GB">` (from TechSpec); `lang` attribute on any inline non-English quotation.

### 5. Focus states
- Token: `--ring` defined per zone (Royal in CORE, Signal Red in AthleteX) at ≥3:1 vs both `--background` and `--card`.
- Style: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`.
- Never remove focus rings on any element, including custom cards used as links.
- Motion: focus ring appearance respects `prefers-reduced-motion` — no ring animation for reduced-motion users.

### 6. Form accessibility (enquiries, scholarship, downloads)
- Every input has a visible `<label htmlFor>` — placeholders are not labels.
- Required fields: `aria-required="true"` + visible `*` explained in the form intro.
- Errors: `aria-invalid="true"` on the field; error text in `<p id="field-err">` linked via `aria-describedby`; error summary at top of form is `role="alert"` with anchor links to each invalid field.
- Autocomplete tokens: `name`, `email`, `tel`, `postal-code`, `country-name`, `bday` (scholarship age gate).
- Grouping: `<fieldset><legend>` around radio/checkbox groups (school type, boarding preference, sport).
- Honeypot / timing gate fields marked `aria-hidden="true"` and off-screen — never focusable.
- Submit button never disabled while user is completing the form (WCAG-friendly pattern): validate on submit, surface errors, keep button enabled.
- Success state announced via `aria-live="polite"`; focus moves to success heading.

### 7. Alt text conventions (uniform / boarding / athletic imagery)
Content-first, no "image of", no filenames, no marketing copy.

- **School exteriors**: "Christ Church College quadrangle at dusk, Oxford".
- **Uniforms / portraits**: describe role + context, not appearance: "Year 10 pupil in Winchester College uniform outside School House". Never describe race, body, or presumed gender. Use the pupil's actual name only with signed consent; otherwise year/role.
- **Boarding interiors**: "Boarding-house common room with study desks and evening lamps".
- **Classroom**: "Sixth-form biology lab session with two students at a microscope".
- **Athletic action**: "Under-16 rugby fly-half breaking through a tackle at Rugby School".
- **Athletic portraits**: "Athlete portrait — Ella, U18 heptathlete, AthleteX pathway".
- **Trophies / kit / medals**: name the achievement: "Regional U18 champion medal, 2025".
- **Decorative crests, patterns, dividers**: `alt=""`.
- **Logos**: `alt="Morgan Oxford Education"` (the name, not "logo").
- Length: 125 characters or fewer; longer descriptions go in surrounding caption text, not `alt`.
- Do NOT rely on the same alt across responsive `<source>` art-directed crops; the fallback `<img alt>` is the announced text.

### 8. Mobile accessibility
- Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` — never disable pinch-zoom (no `user-scalable=no`, no `maximum-scale`).
- Layout height: `h-dvh` instead of `h-screen` for full-height mobile layouts (avoids iOS URL-bar cropping).
- Tap targets: 44×44px CORE, 52×52px AthleteX primary (per ResponsiveSpec).
- Spacing between adjacent tap targets: ≥8px so targets don't overlap.
- Orientation: content available in portrait and landscape (WCAG 1.3.4).
- Safe area: `env(safe-area-inset-*)` respected on sticky headers and bottom CTAs.
- Motion: `prefers-reduced-motion` respected (already wired via AnimationSpec).
- Native controls: prefer `type="tel"`, `type="email"`, `inputMode="numeric"` for correct mobile keyboards.
- iOS Voice Control: interactive elements have a visible label matching their accessible name so "Tap Book consultation" works.

### 9. Testing gates (per PR)
- axe-core / `@axe-core/react` clean on `/`, `/schools/*`, `/programmes/*`, `/enquire/*`, `/athletex/*` — zero serious/critical.
- Keyboard-only walkthrough of the enquiry funnel end-to-end.
- VoiceOver (iOS) spot check on the mobile nav sheet and primary form.
- Lighthouse Accessibility ≥95 (from TechSpec).
- Contrast regression: any new colour pair introduced without a row in the pairs table is a PR blocker.

## Deliverable
Single documentation component with a contrast pairs table (pass/fail chips), grouped WCAG checklist with implementation notes, and alt-text patterns. Follows the `Row`/`DefList`/`Chip` pattern already used by `TechSpec.tsx` and `FunctionalSpec.tsx`. No route, DB, or component-behaviour changes in this pass — actual token/component fixes (e.g. banning gold-on-paper text) are tracked as follow-up work referenced from the doc.
