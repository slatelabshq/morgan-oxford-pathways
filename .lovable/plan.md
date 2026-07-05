## Full responsive audit + fixes

Drive a real audit against the live preview at three viewports, then fix every overflow, clipping, tap-target, and stacking issue found. No blind restyling — every fix backed by a screenshot.

### 1. Capture

Run Playwright headless against `http://localhost:8080` at:
- **375 × 812** (iPhone SE / small phone)
- **768 × 1024** (iPad portrait)
- **1280 × 900** (laptop)

Routes covered: `/`, `/programmes`, `/destinations`, `/process`, `/about`, `/insights`, `/enquire/contact`, `/athletex`, `/athletex/scholarship`. Screenshot each viewport per route → `/tmp/browser/responsive/{route}_{w}.png`. Also open the mobile nav on 375px and screenshot.

### 2. Diagnose (against known suspect areas)

Verify each and fix as needed:
- **PageHero** — 640px min-height on mobile is heavy; check if content clips under the fold; ensure title/lede/CTA stack cleanly at 375px, buttons wrap without overflow.
- **Home audience cards** (parent / student-athlete) — 2-col at `md`, stack on mobile; check gap + padding at 375px.
- **Home trust panel** — new 2×2 gold-stat grid; verify equal card height and centered content at every width; on tablet (768px) it stays 2×2, on very wide it could feel sparse.
- **Home Success Stories** — 3-col at `md`, verify graceful stack at 375–768px, quote card doesn't overflow.
- **Header** — brand + Enquire button + burger fit at 375px without wrap. Check tap targets are ≥ 40px.
- **SiteMobileNav** — off-canvas panel, verify link tap targets, close button, scrollability.
- **Footer** — column stack on mobile, no horizontal scroll.
- **Contact page** — form + offices sidebar should stack vertically on mobile (current `lg:grid-cols-[1.15fr_1fr]` — good), verify inputs don't overflow.
- **Programmes / Destinations / Process cards** — grid columns collapse; process numbered circles stay aligned when the row wraps to 2-col.
- **Any horizontal scroll** — hunt for `overflow-x`/wide elements; body should never scroll horizontally at 375px.
- **Long text** — email addresses, phone numbers, breadcrumbs; check `break-all` / `truncate` where needed.
- **Hydration mismatch** in console (SSR/client `className` diff on `reveal-auto`) — the `GlobalReveal` client effect adds a class after hydration causing a warning. Not a responsive issue but I'll patch it in the same pass since it's a real console error: initialize the class in a `useLayoutEffect` guarded by a mounted flag, or move to a CSS-only IntersectionObserver observer with a `data-reveal` attribute that's present at SSR.

### 3. Fix

Iterate: for every issue found, edit the offending component/route, re-run the screenshot for that viewport, confirm fixed. Only touch what's actually broken — no blanket rewrites.

Likely edits (subject to what the screenshots show):
- Reduce `PageHero` `min-h` on mobile if content overflows.
- Force `flex-wrap` + `w-full sm:w-auto` on hero CTA buttons if they clip.
- Add `break-words` / `min-w-0` to any header row that gets tight.
- Tighten section vertical padding (`py-16`) to `py-12 sm:py-16` where it wastes mobile space.
- Fix any element with a hard pixel width found in the audit.

### 4. Verify

Final pass: rescreenshot every route × viewport, confirm no horizontal scroll, no clipped text, no unreachable content, no console errors. Report which files changed.

### Out of scope

Copy, colors, fonts, new features, information architecture. Purely layout/responsive fixes + the one hydration warning.
