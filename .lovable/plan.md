## Goal
Success Stories lives on the home page only. Remove it as a standalone destination.

## Changes

1. **Home** — `src/routes/index.tsx`
   Add a "Success Stories" section between the "Why families choose us" block and the closing padding. Reuse the exact 3 story cards from the current `/insights` page (quote + 2 body cards, icon chips, card-glow), plus the two footer CTAs simplified to a single "Start your own story" primary CTA to `/enquire/contact`.

2. **Nav** — `src/components/site/SiteHeader.tsx`
   Remove the `{ to: "/insights", label: "Success Stories" }` entry from `CORE_NAV`. Mobile nav inherits.

3. **/insights route** — `src/routes/insights.index.tsx`
   Restore to the original generic Insights landing page (short intro, no Success Stories content). Route stays live so any existing insight slugs under `insights.$slug.tsx` still work, but it's no longer linked from the primary nav.

## Out of scope
- No changes to Services, Destinations, AthleteX, Process, Contact, About
- No changes to `insights.$slug.tsx` or `insights.tsx` layout
- No copy edits to the story text itself — just relocated

## Files touched
- `src/routes/index.tsx`
- `src/routes/insights.index.tsx`
- `src/components/site/SiteHeader.tsx`