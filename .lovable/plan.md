
## Goal
The sticky header responds to scroll (glass blur + stronger border/shadow once you've scrolled past the hero) and gains a proper mobile menu that slides in from the right using Framer Motion.

Current state: `SiteHeader` is already sticky with `bg-background/90 backdrop-blur`, but the effect is constant regardless of scroll, and there's no mobile navigation — the nav is `hidden md:block`, so on phones the header shows only the logo + CTA.

## 1. Scroll-driven header state
- Add local `scrolled` state in `SiteHeader`.
- On mount, attach a passive `scroll` listener that flips `scrolled` when `window.scrollY > 8`. Debounced via `requestAnimationFrame`.
- Apply conditional classes with a 300ms `transition-all ease-in-out`:
  - Unscrolled (top of page): `bg-background/60 backdrop-blur-sm border-transparent`
  - Scrolled: `bg-background/85 backdrop-blur-xl border-border shadow-sm`
- Use Tailwind's `backdrop-blur-*` utilities only — do NOT hand-write `-webkit-backdrop-filter` (Lightning CSS would drop the standard property and break Chrome).
- Reduced-motion users still get the class swap; transitions are already guarded by the site-wide `motion-safe` base rule.

## 2. Mobile menu (slide-in from right)
- Add a hamburger `<button>` visible only `md:hidden`, positioned in the header's right cluster before the CTA. Uses `lucide-react`'s `Menu` / `X` icons (already available via shadcn). `aria-expanded`, `aria-controls="mobile-nav"`, `aria-label="Open menu"`.
- Local `open` state controls the drawer.

### Drawer component (inline in SiteHeader or new `SiteMobileNav.tsx` — new file for clarity)
- Uses Framer Motion `AnimatePresence` + `motion.div`.
- **Backdrop**: full-screen `fixed inset-0 z-40 bg-black/40`, fades 200ms.
- **Panel**: `fixed right-0 top-0 z-50 h-dvh w-[min(320px,85vw)] bg-background border-l border-border shadow-2xl`, slides from `x: "100%"` → `x: 0`, `transition={{ type: "tween", duration: 0.3, ease: [0.2, 0, 0, 1] }}`. Exit reverses.
- Panel contents:
  - Header row: brand mark + close button (`X` icon).
  - `<nav>` with the same `nav` items list (CORE or AthleteX, driven by `isAthleteX`).
  - Each link uses `<Link>` and closes the drawer via `onClick={() => setOpen(false)}`.
  - CTA at bottom: same `Apply`/`Enquire` link as desktop.
- Reduced motion: when `useReducedMotion()` returns true, skip motion.div variants and render the panel opened/closed with no animation.

### A11y and interaction details
- When `open`, add `document.body.style.overflow = "hidden"` (scroll lock) and restore on close/unmount.
- Close on `Escape` key.
- Close on backdrop click.
- Close on route change: watch `pathname` in an effect and reset `open` when it changes.
- Focus management: on open, move focus to the close button; on close, return focus to the hamburger.

## 3. AthleteX zone parity
The header already switches CORE ↔ AthleteX. The mobile drawer inherits the current zone via context (it's rendered inside the same `.zone-athletex` wrapper in `__root.tsx`), so background/foreground/primary tokens Just Work — no per-zone branching in the drawer code.

## Files to touch
- `src/components/site/SiteHeader.tsx` — scroll listener, conditional glass classes, hamburger button, mount drawer
- `src/components/site/SiteMobileNav.tsx` — new; drawer, backdrop, focus/scroll-lock logic

## Out of scope
- No changes to nav item lists, CTA copy, PathwayPill, or desktop layout.
- No changes to `__root.tsx` — header remains mounted where it is.
- No new dependencies (Framer Motion + lucide-react already installed).
