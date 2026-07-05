## Goal

Match the look-and-feel of the referenced Morgan Oxford site — a warm, ambient "Liquid Glass" aesthetic — while keeping every existing color token, route, section, and copy block on our site untouched.

## What "liquid glass" means (from the reference)

- Warm cream/ivory page background with soft radial color orbs behind everything (gold + royal), fixed-attached, so scroll feels like light moving through glass.
- Content lives inside frosted glass cards: blurred translucent fill, 1px chromatic gradient border, glossy diagonal sheen highlight, rounded ~2rem corners, deep soft shadow.
- Serif display headings (we already have Fraunces) with one italic gold "accent word" per headline.
- Thin gold divider with a continuous left-to-right shimmer.
- Hover-lift on cards, soft image zoom inside `overflow-hidden` frames, slow floating orbs behind hero sections.
- Hero pattern: full-viewport image + navy gradient overlay + a big dark glass panel sitting bottom-left holding eyebrow / headline / lede / two pill CTAs, plus a small "Scroll" cue.

## What we keep (do not touch)

- All brand tokens in `src/styles.css`: `--brand-royal`, `--brand-paper`, `--brand-gold`, `--brand-ink`, `--brand-slate`, plus the entire `.zone-athletex` palette. Colors do not change.
- Route tree, section order on every page, copy, forms, hero image registry from the previous turn.
- Fraunces + Inter typography, existing motion tokens, existing `reveal` / `reveal-section` utilities.
- AthleteX pages stay dark/red/metallic — glass utilities auto-restyle via the same tokens (glass tint pulled from `--accent`, shadow from `--primary`).

## What we change

### 1. `src/styles.css` — add liquid-glass token layer + utilities

Add (does not remove any existing rule):

- New tokens under `:root` (and mirrored under `.zone-athletex` so glass adapts):
  - `--glass-bg`, `--glass-highlight`, `--glass-shadow`, `--glass-tint` derived from existing brand tokens (paper/royal/gold on CORE; jet/metallic/signal on AthleteX).
- Warm ambient body background: layered radial gradients using `--brand-gold` + `--brand-royal` at low alpha, `background-attachment: fixed`. On `.zone-athletex` subtrees the same rule uses jet + signal instead so AthleteX still reads dark.
- `@layer components` utilities: `.glass`, `.glass-strong`, `.glass-subtle`, `.glass-dark` — each with `::before` chromatic-gradient 1px border (mask trick) and `::after` glossy diagonal sheen.
- `.gold-divider` — 1px high, gold gradient, 4.5s linear shimmer keyframe.
- `.hover-lift` — translateY(-2px) + soft primary-tinted shadow on hover.
- `.img-zoom` — 800ms scale(1.05) on parent hover, respects `prefers-reduced-motion`.
- `.animate-float-slow` — 12s ease-in-out translateY loop for ambient orbs.
- `.eyebrow` — uppercase 0.18em tracking, accent color, matches reference.
- All new animations gated behind `@media (prefers-reduced-motion: no-preference)`.

### 2. `src/components/site/PageHero.tsx` — restyle to the reference hero

- Keep the current Unsplash image + Ken Burns + fade-in from the previous turn.
- Replace the plain overlay with a navy gradient (`from-primary/75 via-primary/40 to-primary/90`) and add one floating gold orb behind the content (`animate-float-slow`, `blur-3xl`).
- Wrap the eyebrow/title/lede/crumbs in a `glass-dark` panel (`rounded-[2rem] p-6 sm:p-10 md:p-14`) anchored bottom-left inside `container-wide`.
- Rework the H1 to support an italic gold "accent word" (new optional `titleAccent` prop; falls back to current single-line title when omitted).
- CTAs: pill-shaped (`rounded-full h-12 px-8`), primary = gold on ink, secondary = `glass-dark` outline — only added if the page's `hero` config declares CTAs (no forced CTAs on pages that didn't have them).
- Small "Scroll" cue at the bottom-center.
- Remove the Unsplash attribution line (previous turn added it; user asked to drop credits).

### 3. `src/components/site/PageShell.tsx`

- No structural change. Just make the non-hero header variant (pages without a hero image) wrap its eyebrow/title/lede in a `.glass-subtle rounded-3xl` panel so the aesthetic is consistent across every page.

### 4. `src/lib/hero-images.ts` — refresh + add accent words

- Swap the current Unsplash URLs for higher-quality curated shots from a different free CDN (Pexels large-format URLs, e.g. `https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1920`). No credit/attribution stored or rendered.
- Keep one image per section landing (Home, About, Schools, Programmes, AthleteX, Insights, Process, Contact).
- Add an optional `titleAccent` per entry (e.g. Home → "Oxford", About → "story", Schools → "future") that `PageHero` renders italic-gold.

### 5. Cards / sections — light polish only

- Apply `.glass` (or `.glass-subtle` on very dense grids) + `.hover-lift` + `.img-zoom` to the existing card wrappers used on: home landing sections, schools grid tiles, programmes tiles, insights list cards, testimonial cards. Structural markup and props stay the same — this is a className swap, not a rewrite.
- Add one `.gold-divider` under each section's eyebrow on the home page for the shimmer accent.

### Out of scope

- No color changes.
- No route/section/copy changes.
- No animations on AthleteX beyond what its zone already defines — glass utilities pick up its tokens automatically.
- No new pages, no changes to forms, no changes to `SiteHeader` / `SiteMobileNav` / `Footer`.
- No attribution UI anywhere.

## Files touched

- `src/styles.css` — additive
- `src/components/site/PageHero.tsx` — rewrite body, keep prop surface (add `titleAccent`, drop credit)
- `src/components/site/PageShell.tsx` — minor: wrap non-hero header in `glass-subtle`
- `src/lib/hero-images.ts` — swap URLs to Pexels, remove `credit`, add `titleAccent`
- ~5 landing-page card components — className additions only (`.glass`, `.hover-lift`, `.img-zoom`, `.gold-divider`)
