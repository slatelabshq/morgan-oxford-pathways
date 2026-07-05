# Technical Spec: Performance, SEO & Standards

Add a new documentation block to `/brand` covering performance targets, image strategy, bundling, caching, SEO, and browser support. Spec-only — no infra changes this pass.

## Location
New file: `src/brand/TechSpec.tsx`, rendered under `<FunctionalSpec />` in `src/routes/brand.tsx`.

## Sections

### 1. Performance Targets
- **Lighthouse (mobile, throttled)**: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95.
- **Core Web Vitals (p75, field)**:
  - LCP ≤ 2.5s (target 2.0s)
  - INP ≤ 200ms (target 150ms)
  - CLS ≤ 0.1 (target 0.05)
  - TTFB ≤ 800ms (SSR from edge)
  - FCP ≤ 1.8s
- **Bundle budgets**: initial JS ≤ 170KB gzip; per-route chunk ≤ 60KB; CSS ≤ 40KB gzip.

### 2. Image Strategy (athletic/campus-heavy)
- **Formats**: AVIF primary, WebP fallback, JPEG legacy — `<picture>` with `type` sources.
- **Responsive**: `srcset` with 400/800/1200/1600/2400w; `sizes` per layout (hero `100vw`, card `(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw`).
- **Loading**: LCP hero `fetchpriority="high"` + `<link rel="preload" as="image" imagesrcset>` in route `head()`; all below-fold `loading="lazy" decoding="async"`.
- **Dimensions**: explicit `width`/`height` on every `<img>` (CLS = 0).
- **Delivery**: Cloudflare Image Resizing or `vite-imagetools` build-time variants; SSRF allow-list for dynamic transformer.
- **Art direction**: portrait crop mobile, landscape desktop via `<source media>`.
- **Placeholders**: LQIP (blurhash or 20px WebP) inline as `background-image`.

### 3. Code Splitting & Bundling
- TanStack auto code-splitting on (default); route components lazy, loaders critical.
- Manual `.lazy.tsx` for heavy interactive routes (`/brand`, filter grids).
- Vendor split: React, TanStack Router, Query in separate chunk.
- Tree-shake: `sideEffects: false` audit; icon lib per-import (`lucide-react/icons/x`).
- Dynamic `import()` for: video player, map, PDF viewer, form validation on submit.
- Preload next-likely route via `<Link preload="intent">`.

### 4. Caching
- **Static assets** (`/_build/*`, hashed): `Cache-Control: public, max-age=31536000, immutable`.
- **Images (CDN)**: `public, max-age=31536000, immutable` (hashed URLs).
- **HTML (SSR)**: `public, max-age=0, s-maxage=60, stale-while-revalidate=600`.
- **API GET (public lists)**: `s-maxage=300, stale-while-revalidate=3600`.
- **API mutations**: `no-store`.
- **Query cache**: `staleTime: 60_000` for lists; `Infinity` for static content; `defaultPreloadStaleTime: 0` per Router setup.
- Server fn responses that read DB → wrap in `ensureQueryData` on client.

### 5. SEO
- **Per-route head()**: unique title (<60ch), description (<160ch), canonical (self-ref, relative), `og:title`, `og:description`, `og:type`, `og:url`; `og:image` only on leaf routes with meaningful hero.
- **UK focus**: `<html lang="en-GB">`, `og:locale="en_GB"`, prices `GBP`, dates `DD/MM/YYYY`, addresses with UK postcode format; `hreflang="en-GB"` self-ref (add `x-default` when international added).
- **JSON-LD** (via `head().scripts`):
  - Sitewide `Organization` + `WebSite` (with `SearchAction`) on `__root.tsx`.
  - Each school page: `EducationalOrganization` (`@type: "School"`, `address` with `addressCountry: "GB"`, `areaServed`, `alumni`, `foundingDate`).
  - Each programme page: `Course` (`provider`, `hasCourseInstance` with `courseMode`, `location`, `startDate`, `endDate`, `courseWorkload`).
  - AthleteX pages: `SportsOrganization` + `Course` where relevant.
  - Breadcrumb pages: `BreadcrumbList`.
- **Sitemap**: dynamic `src/routes/sitemap[.]xml.ts` reading routes + DB rows (schools, programmes, resources); `BASE_URL=""` placeholder until domain set.
- **robots.txt**: `Allow: /`; add `Sitemap:` once domain live.
- **Semantic HTML**: single H1/route, landmarks, alt text mandatory, skip-link.

### 6. Browser Support Matrix
| Browser | Min version | Notes |
|---|---|---|
| Chrome / Edge | 111+ (Mar 2023) | full support |
| Safari (macOS/iOS) | 16.4+ | AVIF, container queries, `:has()` |
| Firefox | 115 ESR+ | full support |
| Samsung Internet | 22+ | Android primary |
| Opera | 97+ | Chromium parity |

- **Excluded**: IE11, legacy Edge, Safari <16 (graceful degradation only — no JS crashes, WebP fallback for images).
- **Progressive enhancement**: core content readable without JS (SSR); enhanced interactivity requires ES2022.
- **Polyfills**: none by default; per-feature only if analytics show need.
- Tested on: BrowserStack matrix pre-release + Lighthouse CI on PRs.

### 7. Monitoring (spec)
- Real User Monitoring: `web-vitals` → analytics endpoint.
- Lighthouse CI in build pipeline, budgets enforced.
- Error tracking: Sentry (planned).

## Deliverable
Single documentation component; no route, DB, or infra changes. Follows the existing `Row`/section pattern from `FunctionalSpec.tsx` and `ResponsiveSpec.tsx`.
