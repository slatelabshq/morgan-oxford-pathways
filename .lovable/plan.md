## Goal
Apply the new website copy across the existing site while keeping current colours, layout components, and route structure intact.

## Content-to-route mapping
The copy has 7 sections; the site has more routes. I'll map the new copy onto existing routes so nothing is orphaned and no new top-level routes are introduced:

| Copy section | Target route | Notes |
|---|---|---|
| 01 Home | `src/routes/index.tsx` | Hero + audience routing + trust strip + "Why Families Choose Us" |
| 02 Services | `src/routes/programmes/index.tsx` (`programmes.index.tsx`) | Intro + 5 service blocks + "How We Work" summary linking to Process |
| 03 AthleteX Pathways | `src/routes/athletex.index.tsx` | Hero, Why AthleteX, 4 sport pathways, Scholarships & Scouting |
| 04 Destinations | `src/routes/schools/index.tsx` (`schools.index.tsx`) | Intro + UK / North America / Europe / Beyond blocks (with the "confirm" notes left as visible placeholder text where source copy is missing) |
| 05 Success Stories | `src/routes/insights/index.tsx` (`insights.index.tsx`) | Intro + 3 featured stories + CTAs |
| 06 Process | `src/routes/process.tsx` | Intro + 5-step process |
| 07 Contact / Enquiry | `src/routes/enquire.contact.tsx` | Intro + form fields (labels only, not rewiring backend) + Lagos & Oxford office blocks |
| About | `src/routes/about.tsx` | Left as-is unless you want the "Why Families Choose Us" block moved here instead of Home |

## Nav label question
Current nav reads: Schools · Programmes · Process · Insights · About. The new copy names them: Destinations · Services · Process · Success Stories · About. I'll **update the visible labels** in `SiteHeader.tsx` and `SiteMobileNav.tsx` to match the copy, keeping the URLs unchanged (`/schools`, `/programmes`, `/insights`) so nothing breaks. If you'd rather keep the current labels, say so before implementation.

## What I will change per page
For every target route:
- Update `head()` title + meta description to reflect the new section headline
- Replace hero headline / subhead / CTAs with the new copy
- Replace body sections with the new copy blocks, using existing `PageHero`, `PageShell`, and section components — no new visual system
- Keep `hero-images.ts` entries; only adjust the `titleAccent` word if the new headline needs a different emphasis (e.g. Home accent → "inevitable", AthleteX → "right")

## Explicitly out of scope
- No new routes, no new components, no design/colour changes
- No changes to the enquiry form's backend wiring (labels/options only)
- Notes in the source copy marked "confirm with team" / "pull from live page" will be rendered as normal copy where a paragraph exists, and omitted where the source says the content isn't ready (North America block will use a short "Details coming soon" line rather than invented copy)
- Cairo office omitted from Contact (source says confirm)

## Deliverable
One batch of edits to the 7 route files above plus the two nav files, matching the copy verbatim.