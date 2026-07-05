# States & Microinteractions Spec

## Delivery

Extend `/brand` with a new **States & Motion** section rendered below the existing spec tables. Each component gets:

- A live demo strip (default / hover / focus / active / disabled shown side-by-side, plus loading / success / error where applicable)
- A spec table (state → visual delta → duration → easing → a11y notes)
- One implementation hint (Tailwind class recipe or a 2–4 line JS/CSS snippet)
- AthleteX variant flagged inline where motion differs

No changes to existing app components — this pass is documentation-only on `/brand`. Any future implementation of the AthleteX motion variants happens in a separate pass.

## Motion tokens (added to `src/styles.css`, referenced by the spec)

```
--motion-fast:    120ms   /* micro state flips: hover, focus ring */
--motion-base:    200ms   /* default component transitions */
--motion-slow:    320ms   /* modal enter, page transitions */
--ease-standard:  cubic-bezier(0.2, 0, 0, 1)     /* CORE default */
--ease-emphasized:cubic-bezier(0.3, 0, 0, 1)     /* AthleteX bolder */
--ease-exit:      cubic-bezier(0.4, 0, 1, 1)
```

CORE uses `--motion-base` + `--ease-standard`. AthleteX uses `--motion-base` (same duration — never slower) + `--ease-emphasized` and adds a subtle 1–2 px translate on hover for tactile weight.

## Components covered (6)

1. **Navigation** — primary header links, PathwayPill, mobile sheet trigger
2. **Buttons** — primary / secondary / ghost / destructive + AthleteX variant + icon-only
3. **Cards** — content card + AthleteX card (jet + signal border)
4. **Enquiry form fields** — text input, textarea, select, checkbox, file input
5. **Dropdowns** — Radix Select / DropdownMenu (as used by shadcn)
6. **Modals** — Radix Dialog

## Per-component spec shape (example row)

| State | Visual | Duration | Easing | Keyboard / ARIA |
|---|---|---|---|---|
| Default | `bg-primary text-primary-foreground` | — | — | — |
| Hover | `bg-primary/90` | 120ms | standard | pointer-only |
| Focus-visible | `ring-2 ring-ring ring-offset-2` | 120ms | standard | `:focus-visible` — never `:focus` |
| Active | `translate-y-[1px]` | 80ms | exit | — |
| Disabled | `opacity-50 cursor-not-allowed` | — | — | `aria-disabled="true"`; keep in tab order for screen readers |
| Loading | spinner + `aria-busy="true"` | — | — | text stays; do not change width |
| Success | check icon 240ms fade+scale | 240ms | emphasized | `role="status"` `aria-live="polite"` |
| Error | shake 1× (6px, 160ms) + red ring | 160ms | exit | `role="alert"` + focus first invalid field |

## Global rules (applied across all components)

- Never animate `width`, `height`, `top`, `left` — animate `transform` + `opacity` only.
- All hover/motion is wrapped in `@media (prefers-reduced-motion: no-preference)` — reduced-motion users get instant state changes but keep focus rings.
- Focus rings use `focus-visible` (keyboard only). Ring token: 2px `--ring` + 2px offset on `--background`.
- Success/error copy is announced via `role="status"` / `role="alert"`; never rely on color alone (icon + text).
- Tap targets ≥ 44×44 on mobile.
- Loading state must preserve layout (fixed min-width on buttons that swap label for spinner).

## Component detail summary (what the /brand section will show)

**Navigation** — Underline slide-in on hover (`transform: scaleX`), 200ms; active link gets solid underline + `data-status="active"`. Mobile sheet: slide-in-right 320ms standard; focus trap + `Esc` closes; scroll lock. AthleteX: underline colour is signal red, hover adds a 1px letter-spacing bump.

**Buttons** — 5 base states + loading/success/error. Loading shows inline spinner and disables click; success flashes an icon for 1.2s then reverts. AthleteX variant: `bg-signal text-bone`, hover adds `translate-y(-1px)` + `shadow-[0_6px_0_-2px_var(--brand-jet)]` (chunky physical press).

**Cards** — Default: 1px border. Hover: shadow rises to `lg`, border stays; 200ms. Focus-within surfaces the whole card as focus target when it wraps a link. AthleteX: signal-red 1px border on hover, plus a `-2px` translateY for physical lift.

**Enquiry form fields** — Default / hover (border darkens 15%) / focus-visible (ring + border becomes `--ring`) / disabled (muted bg) / read-only. Error: border + helper text switch to destructive, `aria-invalid="true"`, `aria-describedby` points at helper. Success: subtle check icon in trailing slot, no border colour change (avoid green-noise on long forms). Textareas resize vertical-only.

**Dropdowns** (Radix Select / DropdownMenu) — Trigger: same states as button-secondary. Menu enter: `fade-in + scale-in` from origin 96 → 100, 160ms emphasized. Highlighted item: `bg-accent`, arrow keys move highlight, `Enter` selects, `Esc` closes, typeahead search enabled by Radix. `aria-expanded`, `aria-controls` auto-wired by Radix.

**Modals** (Radix Dialog) — Overlay: fade-in 200ms; content: fade + scale 0.96 → 1, 240ms standard (CORE) / emphasized (AthleteX). Focus trapped; initial focus on first interactive; `Esc` closes; scroll lock on body. `role="dialog"` `aria-modal="true"` + `aria-labelledby` on title. Close X has `aria-label="Close"`.

## Implementation hints (one per component, in the doc)

- **Nav underline**: `after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200`
- **Button loading**: `<Button disabled aria-busy>` with a fixed `min-w-[<measured>px]` and inline `<Loader2 className="animate-spin" />`
- **Card lift**: `transition-shadow duration-200 hover:shadow-lg` + `focus-within:ring-2`
- **Field error shake**: keyframe `translateX(-6px→6px→0)` once, 160ms, on `aria-invalid` toggle
- **Dropdown enter**: Radix `data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95`
- **Modal**: use shadcn `Dialog` as-is (Radix handles focus trap, scroll lock, ARIA); only override the content class for AthleteX easing

## Files to add / change

- `src/routes/brand.tsx` — append a new `<StatesAndMotion />` section
- `src/brand/StatesAndMotion.tsx` (new) — the section component with 6 demo strips + tables
- `src/brand/demos/` (new) — six small demo components (`NavDemo`, `ButtonDemo`, `CardDemo`, `FieldDemo`, `DropdownDemo`, `ModalDemo`), each rendering the state matrix
- `src/styles.css` — add the motion tokens block above `@layer base`

## Out of scope

- Modifying real Button/Card/Input variants (`athletex` variants already exist from earlier pass; this spec only documents them)
- New shadcn primitives
- Real animation library (no Motion/GSAP install — CSS transitions + Tailwind's `tw-animate-css` already in the project)
