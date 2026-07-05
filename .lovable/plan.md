## Swap site typography to Inter (single family)

Replace Cormorant Garamond + Karla with **Inter** as the single family for headings and body. Clean, neutral, quietly premium — no serif, no second face.

### `src/styles.css`

1. Top `@import` block — remove the eight Cormorant + Karla `@fontsource` imports and replace with:
   - `@import "@fontsource/inter/400.css";`
   - `@import "@fontsource/inter/500.css";`
   - `@import "@fontsource/inter/600.css";`
   - `@import "@fontsource/inter/700.css";`
2. `@theme` font tokens — collapse all three to Inter:
   - `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;`
   - `--font-serif: "Inter", ui-sans-serif, system-ui, sans-serif;`
   - `--font-display: "Inter", ui-sans-serif, system-ui, sans-serif;`
3. Base heading rule — keep the `font-family: var(--font-display)` on `h1–h6`, but drop the decorative `font-feature-settings: "ss01", "ss02"` line (Inter doesn't use those stylistic sets; leaving it in is harmless but pointless). Tighten headings with `letter-spacing: -0.01em` for the minimalist look.

### Install

`bun add @fontsource/inter` (Cormorant + Karla packages stay in package.json but unused — no removal needed for this change).

### Scope

Font swap only. Colors, layout, spacing, components, copy — untouched. Every `font-display` / `font-sans` / `font-serif` utility already in the codebase automatically picks up Inter through the theme tokens; no route/component edits required.

### Verification

Load `/`, `/programmes`, `/athletex`, `/destinations`, `/process`, `/enquire/contact`. Confirm every heading, eyebrow, body paragraph, button, and nav item renders in Inter — no italic serif anywhere.
