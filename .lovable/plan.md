
## Goal
Every button in the app picks up a consistent micro-interaction: 1.02 scale + subtle lift on hover, 0.98 scale on press, and smooth color/background transitions with no snap.

## Current state
`src/components/ui/button.tsx` already has `transition-all duration-200 ease-in-out` and `motion-safe:hover:-translate-y-0.5` on the base variants. Missing: a hover scale, an active-state scale-down, and the same treatment on the "raw" `<button>`/`<a>` CTAs in the site chrome (SiteHeader Enquire/Apply, hamburger, mobile-nav close, footer, form submits that don't use `<Button>`).

## 1. Update shadcn `<Button>` base classes
In `buttonVariants` (`src/components/ui/button.tsx`), extend the base class list:
- Keep existing `transition-all duration-200 ease-in-out focus-visible:*`.
- Replace `motion-safe:hover:-translate-y-0.5` with `motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]`.
- Add `will-change-transform` so the browser promotes on hover (cheap, no layout thrash).
- Leave `ghost` and `link` variants opted out of scale (they're inline text-ish — scaling looks off). They already override `motion-safe:hover:translate-y-0`; extend that to `motion-safe:hover:scale-100 motion-safe:active:scale-100`.

## 2. Global fallback for non-`<Button>` buttons/anchors
The site-wide transition rule in `src/styles.css` already covers `a, button, [role="button"], summary` for color/bg/border/shadow/transform — no snaps. Add a scoped active-scale for any element carrying `data-btn` OR `role="button"` OR `.btn` — but instead of inventing a new attribute, add a small global rule under `motion-safe` that scales `button:not(:disabled):active` and `a:active` by 0.98 when they carry `data-scale` (opt-in) — otherwise leave alone (scaling every anchor is wrong for nav links, cards, etc.).

Concretely, the cleanest lever is not a global CSS scale — it's a shared utility class `btn-micro` in `src/styles.css`:

```css
@utility btn-micro {
  transition:
    color 200ms ease-in-out,
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    box-shadow 250ms ease-in-out,
    transform 200ms ease-in-out;
}
@media (prefers-reduced-motion: no-preference) {
  .btn-micro:hover { transform: scale(1.02); }
  .btn-micro:active { transform: scale(0.98); }
}
```

Apply `btn-micro` to the non-`<Button>` CTAs identified below.

## 3. Retrofit call sites
- `src/components/site/SiteHeader.tsx` — Enquire/Apply desktop CTA (`<Link>` styled as button) + hamburger `<button>`.
- `src/components/site/SiteMobileNav.tsx` — close button + bottom CTA.
- `src/routes/__root.tsx` — NotFound "Go home" link, error boundary "Try again" and "Go home" buttons.
- Any form submit that uses a bare `<button type="submit">` instead of the shadcn `<Button>`. Verified: `src/components/forms/*` — check each; use `<Button>` where available so they inherit micro-interactions for free, otherwise add `btn-micro`.

I'll grep the three forms and update the actual submit elements only.

## 4. Reduced motion
Both the shadcn class list (`motion-safe:` variants) and the `btn-micro` utility (media query guard) already respect `prefers-reduced-motion: reduce` — those users get color transitions only, no scaling.

## Files to touch
- `src/components/ui/button.tsx` — add hover/active scale, adjust ghost/link opt-outs
- `src/styles.css` — add `btn-micro` utility
- `src/components/site/SiteHeader.tsx` — add `btn-micro` to CTAs/hamburger
- `src/components/site/SiteMobileNav.tsx` — add `btn-micro` to close + CTA
- `src/routes/__root.tsx` — add `btn-micro` to 404/error buttons
- Form submit buttons in `src/components/forms/*` — swap to `<Button>` or add `btn-micro` where a bare `<button>` is used

## Out of scope
- No color, size, radius, or copy changes.
- Card hover treatment (already 1.02 scale + shadow lift) stays as-is.
- Nav `<Link>` text items are not buttons — they keep only the existing color transition.
