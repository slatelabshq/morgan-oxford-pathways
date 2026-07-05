# Animation System

## Delivery

Two things ship together:

1. **Reusable motion primitives** — a `<Reveal>` component + a small set of CSS `@utility` classes and keyframes in `src/styles.css`. Consumable by any page.
2. **Spec section on `/brand`** — a new "Animations" block below "States & motion" with a live demo + spec table per animation.

No changes to existing routes or copy. Wiring the primitives into real pages (home hero, section reveals, pathway handoff) is a separate follow-up pass.

## Motion tokens (extend `src/styles.css`)

Reuses the state/motion tokens shipped last pass; adds one dedicated pair for narrative motion.

```
--motion-hero:     640ms   /* hero reveal, once, above-the-fold */
--motion-section:  520ms   /* scroll-in sections */
--motion-handoff:  480ms   /* CORE ↔ AthleteX zone crossfade */

/* Already defined: --ease-standard (CORE), --ease-emphasized (AthleteX),
   --ease-exit. Add one for punchier landings: */
--ease-athletex-land: cubic-bezier(0.16, 1, 0.3, 1);   /* punchy overshoot-free */
```

CORE animations use `--ease-standard`. AthleteX animations use `--ease-athletex-land` and shave 60ms off equivalent CORE timings (feels faster without being jumpy).

## The six animations

### 1 · Hero reveal
- **Trigger:** on mount, once, no scroll.
- **CORE:** stagger of 4 targets (eyebrow → h1 lines → lede → CTAs). Each step: `opacity 0 → 1`, `translateY(12px → 0)`. Duration `--motion-hero` (640ms) per element, 80ms stagger. Easing `--ease-standard`.
- **AthleteX:** same primitive, tighter: 580ms, 60ms stagger, `translateY(16px → 0)` + `scale(0.98 → 1)`, easing `--ease-athletex-land`.
- **GPU:** `will-change: transform, opacity` on each animated element; strip after animation-end via a `.reveal-done` class the component adds.
- **Reduced motion:** skip transform; opacity flips instantly to 1. Stagger becomes 0.

### 2 · Scroll-in sections
- **Trigger:** `IntersectionObserver`, threshold 0.15, root margin `-10% 0px`.
- **CORE:** `opacity 0 → 1`, `translateY(24px → 0)`. Duration `--motion-section` (520ms). Easing `--ease-standard`. Fires once (`unobserve` after entry).
- **AthleteX:** 460ms, `translateY(32px)` + `scale(0.985 → 1)`, easing `--ease-athletex-land`.
- **GPU:** `will-change: transform, opacity` while pending; removed after enter.
- **Reduced motion:** observer disabled; elements ship visible with `opacity: 1` and no transform.

### 3 · Nav
Documents the underline scaleX and the mobile sheet slide already spec'd in "States & motion". Cross-linked, not re-defined. New additions:
- **Scroll-elevate:** on `scrollY > 8px`, header gains `shadow-sm` + slight `backdrop-blur` bump. Transition `background`/`box-shadow`, 200ms `--ease-standard`. No transform.
- **Reduced motion:** shadow/blur still applied (they aren't animation-continuous), but the `transition` is set to 0ms.

### 4 · Button interactions
Documents hover / active / loading / success / error already spec'd in "States & motion". New addition:
- **CORE press:** `translateY(0 → 1px)` on `:active`, 80ms `--ease-exit`. Springs back on release.
- **AthleteX press:** `translateY(-1px → 2px)` on `:active` + shadow collapse `[0_6px_0_-2px] → [0_2px_0_-1px]`, 90ms `--ease-athletex-land`. Physical thud, no bounce.
- **GPU:** transform-only.
- **Reduced motion:** press = colour flip only (no translate).

### 5 · Section transitions (in-page)
Between sequential full-width bands on marketing pages.
- **Trigger:** section entering viewport (scroll-in above), plus a 4px top-border wipe on the incoming section for continuity.
- **CORE:** border wipe uses `transform: scaleX(0 → 1)`, origin left, 480ms `--ease-standard`, delayed 120ms after section reveals.
- **AthleteX:** wipe is right-to-left, origin right, 380ms `--ease-athletex-land`, no delay.
- **GPU:** transform on the pseudo-element, `will-change: transform` only during wipe.
- **Reduced motion:** border shows immediately at full width, no wipe.

### 6 · CORE ↔ AthleteX handoff
The pathway pill click / dual-gateway click.
- **Trigger:** navigation start from CORE→AthleteX (or reverse).
- **CORE→AthleteX:** 480ms crossfade. Outgoing zone: `opacity 1 → 0` in 200ms `--ease-exit`. Incoming zone: `opacity 0 → 1` in 320ms `--ease-athletex-land`, plus a full-bleed 4px signal-red top bar wipes L→R in 480ms and disappears at end.
- **AthleteX→CORE:** softer — 520ms crossfade, no accent bar, easing `--ease-standard`.
- **Implementation shape:** wrap the app's outer div (in `__root.tsx`) with a `data-zone={isAthleteX ? "athletex" : "core"}` attribute and a `[data-zone]` CSS block that runs a `@keyframes zone-in` on change. Non-blocking; navigation itself is instant.
- **GPU:** `opacity` + `transform: scaleX` only.
- **Reduced motion:** no accent bar, no crossfade; zone theme swaps instantly (existing behaviour).

## Files to add / change

- `src/styles.css` — motion tokens + `@keyframes reveal-up`, `zone-in-core`, `zone-in-athletex`, `border-wipe`; `@utility reveal`, `@utility reveal-visible`, `@utility zone-transition`.
- `src/lib/motion/Reveal.tsx` **(new)** — client component. Uses `IntersectionObserver`, sets `.reveal-visible` on entry, removes `will-change` after `animationend`. Props: `as`, `delay`, `variant` (`"core" | "athletex"`), `once` (default true).
- `src/lib/motion/useReducedMotion.ts` **(new)** — hook wrapping `matchMedia("(prefers-reduced-motion: reduce)")`.
- `src/lib/motion/HeroReveal.tsx` **(new)** — small wrapper: stagger children by index using CSS variable `--reveal-index`.
- `src/brand/AnimationSpec.tsx` **(new)** — the doc section with the six blocks (demo + table + hint) — same shape as `StatesAndMotion`.
- `src/routes/brand.tsx` — add a `<Section eyebrow="Motion" title="Animations">` above the existing footer, rendering `<AnimationSpec />`.

Nothing modifies existing route files, existing components, or the current `SiteHeader`/dual gateway wiring.

## Spec table shape (repeated per animation)

| Trigger | Duration | Easing | Start → End | GPU / will-change | Reduced motion |
|---|---|---|---|---|---|

## Global rules (restated in the doc)

- Transform + opacity only. No width / height / top / left animations.
- `will-change` set only during animation; stripped on `animationend`.
- Every animation guarded by `@media (prefers-reduced-motion: no-preference)` in CSS, or a `useReducedMotion()` gate in JS.
- One-shot reveals `unobserve()` after firing.
- Never animate on route mount + on scroll simultaneously for the same element.

## Out of scope

- Wiring `Reveal` / `HeroReveal` / zone handoff into existing pages (home, schools, athletex).
- Route-transition libraries (view-transitions API, Framer Motion). Pure CSS + IntersectionObserver.
- Adding new dependencies.
