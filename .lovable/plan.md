## Typography swap

Install self-hosted fonts and wire them into the design system:

1. `bun add @fontsource/cormorant-garamond @fontsource/karla`
2. In `src/styles.css` (top `@import` block, before `@theme`): add `@import "@fontsource/cormorant-garamond/400.css"`, `/500.css`, `/600.css`, `/700.css` and `@import "@fontsource/karla/400.css"`, `/500.css`, `/600.css`, `/700.css`.
3. In the `@theme` block, set:
   - `--font-serif: "Cormorant Garamond", ui-serif, Georgia, serif;`
   - `--font-sans: "Karla", ui-sans-serif, system-ui, sans-serif;`
   - `--font-display: "Cormorant Garamond", ui-serif, Georgia, serif;`
4. Ensure body defaults to Karla and headings (h1–h4, eyebrows, display classes) use Cormorant Garamond. Update any existing font-family utilities in `src/styles.css` (hero title, section titles, nav) accordingly.

## Icon removal (content icons only)

Keep small UI chrome icons (mobile menu toggle, close button, header chevrons, form field affordances). Remove decorative lucide icons from card content, section headers, CTAs, feature lists, story cards, and footer badges.

Files to sweep and strip lucide imports + `<Icon />` usages + `icon-chip` wrappers from:

- `src/routes/index.tsx` (Sparkles, Award, and any other decorative icons in Why-choose-us, Success Stories, CTAs)
- `src/routes/athletex.index.tsx`
- `src/routes/enquire.contact.tsx`
- `src/routes/insights.index.tsx`
- `src/routes/process.tsx`
- `src/routes/programmes.index.tsx`
- `src/routes/schools.index.tsx` (keep search input icon only if it's a functional affordance — otherwise remove)
- `src/routes/destinations.tsx`
- `src/components/site/SiteFooter.tsx` (remove decorative social/badge icons if purely decorative; keep functional social links as text)
- Any shared card components under `src/components/site/` that render decorative icons

Keep in `src/components/site/SiteHeader.tsx`: `Menu` / `X` toggle icons only.

Also remove now-unused `icon-chip` CSS utility from `src/styles.css` if no consumers remain (verify with search first).

## Out of scope

Layout, colors, spacing, copy, routing, and business logic stay untouched. No new pages, no component restructure.

## Verification

- Build succeeds with no unused-import errors from removed lucide references.
- Preview shows Cormorant on headings, Karla on body, and cards/sections render without decorative icons while nav toggle still works on mobile.
