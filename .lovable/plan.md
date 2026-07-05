
## Goal
Add a topical hero background image to each section landing page (home + 7 landings). Dark gradient overlay for legibility. Ken Burns slow-zoom on load. Responsive: full-width, `object-cover`, ~440px on desktop, auto on mobile.

## 1. New `PageHero` component
Create `src/components/site/PageHero.tsx`:
- Full-bleed banner: `w-full min-h-[280px] sm:min-h-[360px] lg:h-[440px] relative overflow-hidden`.
- `<img>` with `src`, `alt`, `loading="eager"`, `fetchPriority="high"`, `decoding="async"`, `className="absolute inset-0 h-full w-full object-cover"`.
  - Ken Burns: wrap image in a `motion.div` that animates from `scale: 1.08` to `scale: 1` over 20s ease-out linear-ish; `useReducedMotion()` skips the animation.
- Overlay: `absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/20` for CORE. AthleteX variant swaps to `from-[color:var(--brand-jet)]/85 via-black/60 to-black/20` (via `zone` prop or auto-detected inside the component from context).
- Content layer: `absolute inset-0 flex items-end`, inner `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16`. Renders eyebrow / h1 / lede / breadcrumbs in white (`text-white`, `text-white/85`).
- Initial fade-in: content wrapper uses `motion.div` with `initial={{ opacity: 0, y: 12 }}`, `animate={{ opacity: 1, y: 0 }}`, 500ms ease-out. Reduced-motion opts out.

Rationale for using literal `text-white` on the hero content: the overlay is always dark regardless of theme, so semantic `text-foreground` would break in light mode. Hero text-on-image is the documented exception to the token-only rule.

## 2. Extend `PageShell`
Add optional props: `hero?: { src: string; alt: string; credit?: { name: string; url: string } }`.
- When `hero` is provided: render `<PageHero>` at the top (outside the current `max-w-7xl` wrapper), which itself contains the eyebrow/title/lede/crumbs. `PageShell` then only renders `{children}` inside the constrained wrapper.
- When `hero` is absent: current behavior unchanged (existing pages using PageShell without a hero keep working).
- Attribution: when `credit` is set, render a tiny link bottom-right of the hero (`absolute bottom-2 right-3 text-[10px] text-white/70`) — "Photo by {name} on Unsplash".

## 3. Hero image mapping (curated Unsplash photo IDs)
Use direct `https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=1920&q=80` URLs. All are royalty-free under Unsplash license; attribution added per image.

- **Home (`/`)** — Oxford spires/college skyline
  `photo-1548786811-dcc851b53908` (Oxford, UK — by Ben Seymour)
- **About (`/about`)** — Oxford quadrangle / advisory desk feel
  `photo-1519452575417-564c1401ecc0` (Oxford library reading room — by Alex Block)
- **Schools (`/schools`)** — historic English boarding school building
  `photo-1580537659466-0a9bfa916a54` (British independent school exterior — by Ivan Aleksic)
- **Programmes (`/programmes`)** — students in uniform on campus lawn
  `photo-1571260899304-425eee4c7efc` (school uniform group — by Note Thanun)
- **AthleteX (`/athletex`)** — dramatic athletics track / stadium night
  `photo-1461896836934-ffe607ba8211` (running track — by Braden Collum)
- **Insights (`/insights`)** — library / open book desk
  `photo-1507842217343-583bb7270b66` (open library — by Aaron Burden)
- **Process (`/process`)** — Oxford tutorial / one-to-one meeting
  `photo-1497633762265-9d179a990aa6` (studying at desk — by Ben White)
- **Contact (`/enquire/contact`)** — Oxford storefront / architecture
  `photo-1523050854058-8df90110c9f1` (Oxford university buildings — by Sidharth Bhatia)

Each hero gets an accurate `alt` (e.g. "Oxford college spires at golden hour") — not the eyebrow.

## 4. Wire up the 8 routes
- `src/routes/index.tsx` — home is not on PageShell today. Add a new `<PageHero>` above the existing hero copy section (keep the copy section as the intro). This adds ~440px above the fold — acceptable for a homepage hero.
- `src/routes/about.tsx`, `schools.index.tsx`, `programmes.index.tsx`, `athletex.index.tsx`, `insights.index.tsx`, `process.tsx`, `enquire.contact.tsx` — pass the `hero` prop into `PageShell`. Remove the now-duplicate `eyebrow`/`title`/`lede`/`crumbs` from the old header (they're inside `PageHero` now).

## 5. Responsive + performance
- `min-h-[280px]` mobile, `h-[440px]` desktop as spec'd.
- One `<img>` per hero, `loading="eager"` + `fetchpriority="high"` so it's the LCP element.
- `w=1920&q=80` covers desktop; Unsplash auto-serves smaller with `auto=format`. No srcset needed for a background hero at this quality bar.
- CSS `content-visibility: auto` is not applied (hero is above the fold).
- Ken Burns via Framer Motion (`transform: scale`) — GPU-composited, no layout thrash.

## 6. Accessibility
- All hero `<img>` elements have descriptive `alt`. Decorative-only would use `alt=""` but hero context images benefit from real alt.
- Text on image: overlay + font-weight + `drop-shadow` where needed guarantees WCAG AA against the darkened image. I'll spot-check contrast on each after mounting.
- Ken Burns respects `prefers-reduced-motion: reduce` (no zoom).

## Files to touch
- `src/components/site/PageHero.tsx` — new
- `src/components/site/PageShell.tsx` — accept `hero` prop, delegate header to PageHero when present
- `src/routes/index.tsx` — mount PageHero at top
- `src/routes/about.tsx`, `schools.index.tsx`, `programmes.index.tsx`, `athletex.index.tsx`, `insights.index.tsx`, `process.tsx`, `enquire.contact.tsx` — add `hero` prop

## Out of scope
- No hero on legal pages, `$slug` article/school/sport pages, sub-programmes (boarding/day/etc.), athletex sub-pages (scholarship/schools/etc.), thanks, or compare — per user's answer ("Section landings only").
- No changes to typography, palette, or brand tokens.
- No download/rehost of the Unsplash images — hotlink per the license.
