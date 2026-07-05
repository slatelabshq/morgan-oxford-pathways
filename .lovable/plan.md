## Plan: Remove Liquid Glass Board from Hero

### What we will change
In `src/components/site/PageHero.tsx`, remove the `.glass-dark` frosted-glass panel that currently wraps the eyebrow, title, lede, breadcrumbs and children.

### How text stays readable
- The existing navy/ink gradient overlay (`from-…/75 via-…/40 to-…/90`) remains behind the content, providing sufficient contrast.
- The floating ambient orb can also be removed since it was added to complement the glass refraction effect.
- Content padding and positioning stay the same so layout does not shift.

### Files touched
- `src/components/site/PageHero.tsx` — remove `glass-dark` class and the ambient orb div; keep all other hero behaviour (Ken Burns image, gradient overlay, scroll cue, motion entrance).

No other pages or components are affected.