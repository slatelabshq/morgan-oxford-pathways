## Goal
Match the Destinations page — imagery and card style — to the reference Morgan Oxford project.

## Image source change
Replace the 4 AI-generated country images with the same editorial Unsplash photography the reference project uses. Delete the current `destination-*.jpg.asset.json` CDN pointers and reference Unsplash URLs directly (that's how the reference project does it):

- **United Kingdom** → `https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80`
- **North America** (maps to USA in the reference) → `https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1600&q=80`
- **Europe** → `https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80`
- **Beyond** (maps to "Other Destinations" in the reference) → `https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80`

Delete: `src/assets/destination-uk.jpg.asset.json`, `destination-north-america.jpg.asset.json`, `destination-europe.jpg.asset.json`, `destination-beyond.jpg.asset.json` (via `lovable-assets delete`).

## Card style change (to match reference)
Update `src/routes/destinations.tsx` card markup:
- Aspect ratio `aspect-[4/5]` (portrait), not `16/10`.
- Whole card is a `<Link>` to `/enquire/contact` — clickable like the reference.
- Image `object-cover` + hover `scale-105` with `transition-transform duration-700` on group hover; `overflow-hidden` on the image wrapper.
- Card: `rounded-3xl overflow-hidden border border-border bg-card` with hover lift (`hover:-translate-y-1`) + subtle shadow, matching reference glass/rounded feel while staying on this site's tokens.
- Body: small MapPin + `DESTINATION` eyebrow in brand-gold uppercase tracked, then serif `text-2xl` title, then short one-line blurb (keep current long body underneath, unchanged copy).

Keep hero, page copy, CTA, and grid (`md:grid-cols-2`) as-is. No changes to other pages, colours, or fonts.

## Out of scope
Adding new destinations (Canada, Africa split out), routing to detail pages, copy edits, other pages.
