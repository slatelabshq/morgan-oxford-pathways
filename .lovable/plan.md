## Rotate hero images every 5 seconds across every page

Turn each page's hero image into a rotating set that swaps every 5 seconds with a crossfade. All major pages already share the same `PageHero` component (via `PageShell`) and pull from `src/lib/hero-images.ts`, so the change lands in two files.

### 1. `src/lib/hero-images.ts` — extend to image sets

- Change `HERO[key].src: string` to `HERO[key].images: string[]` (3–4 Pexels URLs per key), keeping `alt` and `titleAccent` unchanged.
- Add a matching set of on-brand Pexels IDs for each hero: `home`, `about`, `schools`, `programmes`, `athletex`, `insights`, `process`, `contact`. Each set stays visually consistent with the current single image (e.g. Oxford/boarding for `home`, `schools`, `contact`; libraries/study for `about`, `insights`, `process`; students collaborating for `programmes`; athletics/track/court/pool for `athletex`).
- Keep the same `p(id)` helper and 1920×1080 params.

### 2. `src/components/site/PageHero.tsx` — rotate with crossfade

- Update `HeroImage` type: `images: string[]` (still one `alt`, still optional `titleAccent`).
- Inside the component: `useState` index, `useEffect` with `setInterval(5000)` that advances `index = (index + 1) % images.length`. Clear the interval on unmount and skip the interval entirely when `useReducedMotion()` returns true (accessibility — keep the first image only).
- Replace the single `<img>` with a stack of absolutely-positioned `<img>` layers (one per source), each wrapped in `motion.div` with `opacity: index === i ? 1 : 0` and a ~1s ease transition, producing a smooth crossfade. Keep the existing Ken Burns scale on the active layer only (or on the wrapper — Ken Burns replays on each change).
- Preload the first image with `loading="eager"` + `fetchPriority="high"`; the rest use `loading="lazy"` so LCP isn't hurt.
- All other markup (gradient wash, breadcrumbs, eyebrow, H1 with accent, lede, children, scroll cue) stays exactly as-is.

### Scope

Applies automatically to every route using `PageHero` / `PageShell`: home, about, schools, destinations, programmes/services, athletex, insights, process, contact, plus any sub-route reusing a `HERO.*` key. No route file needs editing.

### Out of scope

Copy, colors, typography, layout, other components, and card/content imagery — untouched.

### Verification

Load `/`, `/programmes`, `/athletex`, `/destinations`, `/process`, `/enquire/contact`; confirm the hero image swaps at ~5s intervals with a smooth fade and no layout shift. Toggle OS reduce-motion and confirm the image stays static.
