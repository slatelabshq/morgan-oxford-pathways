
## Goal
Every card grid site-wide staggers its cards into view as the grid enters the viewport, and each card lifts slightly with a stronger shadow on hover. Uses Framer Motion (already installed) and respects `prefers-reduced-motion`.

## 1. New primitives

### `src/components/StaggerGrid.tsx`
Wrapper for a grid of animated children.
- Renders a `motion.div` with:
  - `initial="hidden"`, `whileInView="show"`, `viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}`
  - `variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}`
- Props: `as?`, `className`, `children`. Default `as="div"` — grid classes come from the caller so we don't touch existing layouts.
- Reduced-motion: when `useReducedMotion()` returns true, render a plain `<div>` with the same className and no variants.
- Adds `data-reveal-skip="true"` so the existing `GlobalReveal` observer leaves it alone (avoids double-animating).

### `src/components/StaggerItem.tsx`
Single animated card slot.
- `motion.div` with `variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } } }}`.
- Reduced-motion: renders a plain `<div>` passing through className/children.
- Props: `className`, `children`, `as?`.

Together the pattern is:
```tsx
<StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {items.map(i => <StaggerItem key={i.id}><Card>…</Card></StaggerItem>)}
</StaggerGrid>
```

## 2. Hover: scale-up + shadow lift on `<Card>`
Update `src/components/ui/card.tsx` base classes:
- Replace the current `motion-safe:hover:-translate-y-0.5 hover:shadow-lg` with a slightly stronger, unified treatment:
  `transition-all duration-300 ease-in-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] hover:shadow-xl`
- Keeps the existing 200–300ms envelope from the earlier request; scale is subtle (1.02) so it doesn't shift adjacent layout.

## 3. Retrofit all card grids
Wrap each existing card grid in `<StaggerGrid>` and each direct child card in `<StaggerItem>`. No copy or layout changes — the wrapper carries the existing grid className so spacing is identical.

Files to update (verified via `rg "grid.*cols|<Card"`):
- `src/routes/index.tsx` — home highlights / service cards
- `src/routes/schools.index.tsx` — schools listing grid
- `src/routes/programmes.index.tsx` — programmes grid
- `src/routes/athletex.index.tsx` — AthleteX highlights
- `src/routes/insights.index.tsx` — article cards
- `src/routes/athletex.sports.index.tsx` — sports grid
- `src/routes/athletex.schools.tsx`, `athletex.scouts.tsx`, `athletex.scholarship.tsx` — any card grid present
- `src/routes/schools.$slug.tsx`, `schools.compare.tsx` — comparison / detail card grids
- `src/routes/programmes.boarding|day-school|guardianship|sixth-form|summer.tsx` — feature card grids on each

I'll read each file first and only wrap actual `<Card>` grids — skip single cards, forms, and non-grid card usage.

## 4. Interaction with existing motion
- `GlobalReveal` (from the earlier scroll-fade work) targets `<section>` and `[data-reveal]`. `StaggerGrid` adds `data-reveal-skip="true"` on itself, so a grid inside a section fades in as part of the section reveal AND its children stagger independently — sequenced, not conflicting.
- Route transition (300ms fade) runs before any of this; when the new page settles, the stagger kicks off for whatever grid is in view.

## Files to touch
- `src/components/StaggerGrid.tsx` — new
- `src/components/StaggerItem.tsx` — new
- `src/components/ui/card.tsx` — hover: scale + stronger shadow
- ~10 route files listed above — wrap existing card grids

## Out of scope
- No visual/layout redesign of cards, no new grid columns, no palette changes.
- Non-`<Card>` grids (forms, footer link columns, image galleries) are left alone.
