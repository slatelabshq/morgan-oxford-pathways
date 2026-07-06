## Goal
Replace the plain text-only cards on `/destinations` with cards that lead with a photographic image representing each region.

## Changes

**1. Generate 4 region images** (premium quality, landscape 1280×720, saved to `src/assets/` then externalised via `lovable-assets`):

- `destination-uk.jpg` — iconic UK boarding school / Oxford spires / countryside quad
- `destination-north-america.jpg` — Ivy-style New England campus or Canadian prep school in autumn
- `destination-europe.jpg` — classical European cityscape (e.g. Alpine / Central European school town)
- `destination-beyond.jpg` — evocative wider-world scene (Sydney harbour / Southern hemisphere landscape)

All photographic, editorial, warm natural light — no text overlays, no logos, no people's faces up close.

**2. Update `src/routes/destinations.tsx`**
- Add `image` field to each entry in the `DESTINATIONS` array pointing to the asset.
- Restructure each `<article>` card so the image sits at the top (full-width, `aspect-[16/10]`, `object-cover`, rounded corners) followed by the title and body underneath.
- Keep existing card styling (`card-glow`, border, background), grid layout (`md:grid-cols-2`), CTA button, hero, and copy exactly as-is.
- Ensure `<img>` uses `loading="lazy"`, descriptive `alt` text per region, and doesn't break the responsive layout.

## Out of scope
Copy changes, hero, CTA, other pages, colour tokens.
