## Redesign home trust strip as dark navy card grid

Rework the "Trust strip" section on the home page to match reference image 2: a dark navy panel with a 2×2 grid of rounded cards, each showing a large gold accent value and a small uppercase caption underneath. Keep the current voice by using 4 of the 5 existing items.

### `src/routes/index.tsx`

Replace the current trust `<section>` (the `ul` with 5 `li` items, gold divider and `icon-chip` markup was already removed) with:

- A full-bleed `section` wrapper containing an inner `max-w-7xl` container. Inside, an outer rounded panel (`rounded-3xl border border-white/10 bg-[color:var(--brand-ink)] p-6 sm:p-10`) with a subtle radial vignette (via existing `--glass-shadow` tokens or a soft `bg-gradient-to-br from-[color:var(--brand-ink)] to-[color:var(--brand-royal)]/70`).
- Inside the panel, a `grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6` of 4 cards. Each card: `rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 sm:p-10 text-center` with `card-glow` for the hover shimmer. On desktop keep 2×2 (not 1×4) to match the reference.
- Card content: centered layout — big serif-weight display value in gold (`font-display text-4xl sm:text-5xl font-semibold text-[color:var(--brand-gold)]`), then a hair space, then a small caption (`mt-3 text-xs sm:text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--brand-paper)]/75`).
- Content mapping (4 items, dropping "Partner schools" to fit the 2×2 grid):
  1. `13` (accent) / `YEARS GUIDING FAMILIES`
  2. `ICEF` (accent) / `ACCREDITED AGENCY`
  3. `3` (accent) / `GLOBAL OFFICES · OXFORD · LAGOS · CAIRO`
  4. `48h` (accent) / `RESPONSE ON EVERY ENQUIRY`

  Store as a `TRUST` array of `{ value, label }` and map to cards.
- Preserve the `StaggerGrid` / `StaggerItem` wrapping so items reveal in order.
- Keep the section vertical rhythm the same (`py-16 sm:py-20`).

### Scope

Only the trust section on `src/routes/index.tsx`. No changes to hero, audience routing cards, "Why families choose us", Success Stories, header, footer, or other routes. No new dependencies. No token changes — all colors from existing `--brand-ink`, `--brand-royal`, `--brand-gold`, `--brand-paper` tokens, so it stays consistent with the rest of the site.

### Verification

At 393px mobile: cards stack 1-col, panel fits within padding, gold values legible on navy. At sm+: strict 2×2 grid, equal card heights, `card-glow` fires on hover. Rest of the home page unchanged.
