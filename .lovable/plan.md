# Liquid Glass Navigation

The design system already defines `.glass`, `.glass-subtle`, and `.glass-dark` utilities in `src/styles.css` (frosted background, inner highlight, tinted border, ambient blur). Right now the header only uses a plain `bg-background/85 backdrop-blur-xl` — it doesn't tap into that system. This plan wires the existing Liquid Glass utilities into the top-level chrome so navigation feels consistent with the brand.

## Changes

### 1. `src/components/site/SiteHeader.tsx`
- Replace the header's `bg-background/*` + `backdrop-blur-*` classes with the shared glass utility:
  - Scrolled state → `glass` (fuller frosted panel, stronger inner highlight, tinted border).
  - Top-of-page state → `glass-subtle` (lighter frost so the hero still reads through).
- Keep the sticky/z-index/border transition wrapper; drop the manual `bg-background/85` and `border-border` since `.glass` supplies its own edge treatment. Add a hairline `border-b border-white/10` fallback only in the scrolled state for definition.
- Zone-aware: AthleteX pages automatically re-tint because `.zone-athletex` overrides `--glass-*` tokens — no per-zone branching needed.
- Leave the CTA button, nav links, PathwayPill, and mobile trigger untouched.

### 2. `src/components/site/SiteMobileNav.tsx`
- Apply `glass` (Core) / inherits AthleteX tint via zone class to the sliding nav panel surface so the mobile menu matches the header's material.
- Keep the backdrop scrim as-is (plain dim overlay).

## Out of scope
- No changes to footer, cards, hero, forms, or page sections. "Where necessary" here = the primary nav surfaces only; broader glass rollout can be a follow-up if you want it on cards / CTAs.
- No new tokens or utilities — reuse what's already in `styles.css`.
- No color, typography, spacing, or link-behavior changes.
