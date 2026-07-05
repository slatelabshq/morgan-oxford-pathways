## Goal
Give Destinations its own real route at `/destinations` and point the nav there. The Destinations copy currently lives on `/schools` — I'll move it, not duplicate it.

## Changes

1. **New route** `src/routes/destinations.tsx`
   - `createFileRoute("/destinations")`
   - Same `PageShell` + `HERO.schools` hero, same "Where in the world is right for your child?" copy, same 4 country cards (UK, North America, Europe, Beyond), same "Talk to us" CTA, same card-glow + icon treatment already used on the current Destinations page — so the banner / hero / glow styling matches exactly.
   - Own `head()` with title `Destinations — Morgan Oxford Education` and matching og tags.

2. **Nav update** — `src/components/site/SiteHeader.tsx`
   - Change the "Destinations" entry from `{ to: "/schools" }` to `{ to: "/destinations" }`. Mobile nav inherits from this array, so no separate edit.

3. **Revert `/schools`** — `src/routes/schools.index.tsx`
   - Restore it to the original schools directory page (search + filters UI) that it was before Destinations copy was placed on it. This keeps `/schools` working as a directory route and avoids two pages with the same copy.

4. **Home hero image key stays the same** (`HERO.schools`) — still used by both `/destinations` and the schools directory hero. Keeps one image asset, no new files needed.

## Out of scope
- No copy edits (Destinations text is unchanged from what's already approved)
- No redesign, no new components
- No changes to AthleteX, Services, Process, Contact, or Home nav entries
- No redirect from `/schools` — it becomes the schools directory again, not a Destinations alias

## Files touched
- `src/routes/destinations.tsx` — new
- `src/components/site/SiteHeader.tsx` — one nav entry `to` swap
- `src/routes/schools.index.tsx` — reverted to directory/filter UI