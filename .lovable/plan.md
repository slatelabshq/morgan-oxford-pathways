# Responsive Adaptation Spec

Add a new documentation section to `/brand` covering how the site adapts across three breakpoint tiers, mirroring the format of the existing States and Animations specs.

## Breakpoint tiers

Aligned to P1 tokens (Tailwind defaults + custom):

- **Mobile**: 320–767px (base, no prefix)
- **Tablet**: 768–1023px (`md:`)
- **Desktop**: 1024px+ (`lg:` and up)

## Per-tier spec (documented in a table per topic)

For each of the six topics below, a spec block shows a live demo plus a 3-column table (Mobile / Tablet / Desktop). AthleteX variants are called out inline where they diverge from CORE.

1. **Layout & stacking**
   - Mobile: single column, 16px gutters, full-bleed hero
   - Tablet: 2-col where meaningful (feature grids, school cards), 24px gutters
   - Desktop: 3–4 col grids, 32px gutters, max-width 1200px content, 1440px hero
   - AthleteX: keeps large edge-to-edge blocks and full-bleed imagery even on mobile — no premature card-ification

2. **Type sizing** (fluid via `clamp()`, documented values)
   - Display: `clamp(2rem, 6vw, 4.5rem)` — mobile ~32px, desktop ~72px
   - H1: `clamp(1.75rem, 4vw, 3rem)`
   - H2/H3: step-down scale
   - Body: 16px mobile, 17px tablet, 18px desktop (line-height 1.55→1.6)
   - AthleteX display: heavier weight (800), tighter tracking (-0.02em) preserved at all sizes

3. **Nav pattern**
   - Mobile (<768): hamburger → full-screen sheet, single vertical list, pathway toggle pinned top; 56px header
   - Tablet (768–1023): condensed horizontal nav, primary links only, secondary in overflow menu; 64px header
   - Desktop (1024+): full horizontal nav with mega-menu for Programmes/Schools, pathway pill inline; 72px header

4. **Image strategy**
   - Mobile: 1x/2x, `sizes="100vw"`, prefer portrait/square crops, lazy below fold, LCP hero eager
   - Tablet: `sizes="(min-width: 768px) 50vw, 100vw"`, mixed aspect
   - Desktop: `sizes="(min-width: 1024px) 33vw, 50vw"`, landscape hero, art-directed `<picture>` for hero only
   - AthleteX: full-bleed action shots on all tiers, minimum 240px tall on mobile (no thumbnailing)

5. **Touch targets**
   - Mobile: min 44×44px (WCAG 2.5.5), 8px spacing between adjacent targets, primary CTAs 48px height
   - Tablet: 44px min, hover states begin to apply (hybrid devices)
   - Desktop: 40px min acceptable for dense UI (table rows, filter chips), full hover/focus
   - AthleteX buttons: 52px mobile, 48px tablet+, larger tap area preserved

6. **Density & spacing scale**
   - Mobile: spacing scale ×0.75 (section padding 48px)
   - Tablet: ×1.0 (section padding 72px)
   - Desktop: ×1.25 (section padding 96–120px)

## Implementation

**New file:**
- `src/brand/ResponsiveSpec.tsx` — one section component with 6 spec blocks; each block = heading + short rationale + demo strip + 3-col table. Same visual pattern as `StatesAndMotion.tsx` / `AnimationSpec.tsx`.

**Edited files:**
- `src/routes/brand.tsx` — import and render `<ResponsiveSpec />` above footer, below `<AnimationSpec />`
- `src/styles.css` — add fluid type utilities if not already present: `--text-display`, `--text-h1`, `--text-body-fluid` as `clamp()` tokens; add `@utility text-display` etc. (only if missing — verify first)

**No changes to:**
- Existing routes, nav components, or global layout — this is documentation, not a refactor of live components. The spec describes intended behavior; existing components already implement most of it via Tailwind responsive prefixes.

## Notes

- Reduced-motion, dark-mode, and RTL are out of scope for this pass (already covered elsewhere).
- Demos use `resize:horizontal` on a container so reviewers can drag to see tier transitions without devtools.
- AthleteX callouts use the existing `PathwayPill` accent styling for visual consistency.
