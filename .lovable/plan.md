
## Goal
Add polish across the site: smooth scrolling, subtle fade-in + slide-up reveals as sections enter the viewport, and consistent 200–300ms ease-in-out hover transitions on buttons, cards, and links.

## 1. Smooth scroll (global)
- Add `html { scroll-behavior: smooth; }` in `src/styles.css`.
- Respect `prefers-reduced-motion`: wrap in `@media (prefers-reduced-motion: no-preference)` so users who opted out get instant jumps.
- Keeps hash-anchor nav (e.g. brand-page section links) smooth without JS.

## 2. Section reveal animations (Intersection Observer)
- Create `src/hooks/useReveal.ts` — a tiny hook returning `{ ref, isVisible }` using `IntersectionObserver` (threshold ~0.15, `rootMargin: "0px 0px -10% 0px"`, unobserve after first intersection).
- Create `src/components/Reveal.tsx` — wrapper component:
  - Props: `as` (default `div`), `delay` (0/100/200/300ms), `className`, `children`.
  - Applies `opacity-0 translate-y-4` initially, transitions to `opacity-100 translate-y-0` over 600ms ease-out when visible.
  - Uses `motion-safe:` variants so `prefers-reduced-motion: reduce` shows content immediately with no transform.
- Prefer this lightweight IO approach over Framer Motion to keep the JS budget within the tech-spec bundle target (≤170KB).

### Where to apply
Wrap top-level sections (not every element) on:
- `src/routes/index.tsx` — hero children stagger (delay 0/100/200), then each subsequent section.
- `src/routes/brand.tsx` — each spec block section.
- Any other route-level page section wrappers already present.
Cards inside grids remain static; the parent section reveals as one to avoid janky staggered grids on mobile.

## 3. Hover transitions (buttons, cards, links)
Standardize via Tailwind utility classes and small tweaks to existing components — no visual redesign, only motion.

- **Global base** in `src/styles.css`:
  - `a, button { transition: color 200ms ease-in-out, background-color 200ms ease-in-out, border-color 200ms ease-in-out, box-shadow 250ms ease-in-out, transform 250ms ease-in-out; }`
  - Guard with `motion-safe` media query.
- **Buttons** (`src/components/ui/button.tsx`): ensure `transition-all duration-200 ease-in-out` is on the base variants; add `hover:-translate-y-0.5` on primary/secondary variants only (skip ghost/link).
- **Cards** (`src/components/ui/card.tsx` + brand card wrappers): add `transition-shadow transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5` to the base card class. Skip for cards that are not interactive (pure content blocks) — audit call sites and add an `interactive` prop or apply directly at usage.
- **Links** (in-content anchors): rely on existing `story-link` utility where used; ensure default `<a>` in prose gets `transition-colors duration-200`.

## 4. Accessibility & performance
- All animations gated behind `motion-safe:` / `prefers-reduced-motion: no-preference` — matches the WCAG spec already documented in `AccessibilitySpec`.
- IO observers disconnect after first reveal (no long-lived listeners).
- No new dependencies; keeps Lighthouse and CWV targets intact.

## Files to touch
- `src/styles.css` — smooth scroll + global transition base (reduced-motion guarded).
- `src/hooks/useReveal.ts` — new.
- `src/components/Reveal.tsx` — new.
- `src/components/ui/button.tsx` — confirm/adjust transition classes.
- `src/components/ui/card.tsx` — add hover transition utilities.
- `src/routes/index.tsx`, `src/routes/brand.tsx` — wrap top-level sections in `<Reveal>`.

## Out of scope
- No Framer Motion install (IO + CSS achieves the same subtle effect at lower cost). Say the word if you'd prefer Framer Motion and I'll swap it in.
- No changes to copy, layout, colors, or component structure.
