## Preload hero image sets for flicker-free rotation

The `PageHero` stack already mounts every `<img>` in the DOM with the non-active ones at `opacity: 0`, but they use `loading="lazy"` and `fetchPriority="low"`, so browsers can defer the fetch until the fade-in has already started — that's the flicker.

### Change

`src/components/site/PageHero.tsx` only.

1. Drop `loading="lazy"` / `fetchPriority="low"` on the non-first layers. Load every layer eagerly (`loading="eager"`, `decoding="async"`), keeping `fetchPriority="high"` only on `i === 0` so LCP is unaffected.
2. Add a `useEffect` that, on mount / when `image.images` changes, warms the browser cache for the full set via `new Image(); img.src = url;` for every non-first source. This runs after first paint, so LCP still comes from the eager first image, and by the time the 5s rotation hits index 1+ the bytes are already in cache.
3. Track a per-source "loaded" state (`Set<string>`) via each layer's `onLoad`. Gate the `opacity: 1` animation on `isActive && loaded.has(src)` so a not-yet-decoded frame stays hidden instead of flashing a half-painted image.
4. Preserve existing behavior: reduced-motion still short-circuits the interval and shows only the first image; Ken Burns still runs on the active layer; gradient wash, content panel, scroll cue unchanged.

### Out of scope

`src/lib/hero-images.ts`, route files, other components — untouched. No new dependencies.

### Verification

Open `/`, watch three full 5s cycles: no white/blank flash between swaps, no layout shift. In DevTools Network, confirm all set URLs for the current page finish loading within the first couple of seconds. Toggle OS reduce-motion — only the first image renders and stays static.
