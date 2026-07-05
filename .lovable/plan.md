
## Goal
Fade the current route out and the next route in over 300ms when the URL changes, using Framer Motion's `AnimatePresence` keyed by pathname.

## 1. Dependency
- Install `framer-motion` (`bun add framer-motion`). No other packages required.

## 2. Route transition wrapper
Create `src/components/RouteTransition.tsx`:
- Client component that reads the current pathname via `useRouterState({ select: s => s.location.pathname })`.
- Renders `<AnimatePresence mode="wait" initial={false}>` around a `motion.div` keyed by pathname.
- Variants: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.3, ease: "easeInOut" }}`.
- Respect reduced motion: when `useReducedMotion()` returns true, render children directly with no `motion.div`/AnimatePresence wrapper so users get instant swaps.
- The wrapper renders `{children}` (which will be `<Outlet />`) inside the keyed motion div.

Why `mode="wait"`: guarantees the old page finishes fading out before the new one fades in — no cross-fade overlap that would double the vertical height mid-transition.

## 3. Mount in `__root.tsx`
- Import `RouteTransition` in `src/routes/__root.tsx`.
- Wrap `<Outlet />` inside `RouteTransition`:
  ```tsx
  <RouteTransition>
    <Outlet />
  </RouteTransition>
  ```
- Keep `SiteHeader`, `SiteFooter`, and `GlobalReveal` outside the wrapper so they stay mounted and don't fade with each navigation.

## 4. Interaction with existing motion
- The existing site-wide `GlobalReveal` (section fade-up on scroll) continues to run on the new route because a re-mount triggers its `useEffect` scan, so incoming pages still get their in-view reveals after the 300ms fade.
- The 300ms page fade is separate from — and additive to — the 200–300ms hover transitions on buttons/cards/links.

## Files to touch
- `package.json` (via `bun add framer-motion`)
- `src/components/RouteTransition.tsx` — new
- `src/routes/__root.tsx` — wrap `<Outlet />`

## Out of scope
- No slide/scale variants — plain fade only, per the request.
- No scroll-restoration changes; TanStack Router's default behavior is kept.
