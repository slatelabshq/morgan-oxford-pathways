import { type ReactNode } from "react";

/**
 * Technical Spec — performance, image pipeline, bundling, caching,
 * SEO (UK-focused, EducationalOrganization + Course), and browser support.
 * Documentation-only; rendered inside /brand.
 */

type Row = { label: string; value: ReactNode };

export function TechSpec() {
  return (
    <div className="space-y-16">
      <Intro />
      <PerfTargets />
      <ImageStrategy />
      <BundlingSplit />
      <CachingSpec />
      <SeoSpec />
      <BrowserMatrix />
      <Monitoring />
    </div>
  );
}

/* ---------- Shared building blocks ---------- */

function SubTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-serif text-2xl font-medium tracking-tight">{children}</h3>;
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
      {children}
    </h4>
  );
}

function Chip({
  tone = "core",
  children,
}: {
  tone?: "core" | "planned" | "athletex" | "good" | "warn";
  children: ReactNode;
}) {
  const cls =
    tone === "planned"
      ? "border-primary/40 bg-primary/10 text-primary"
      : tone === "athletex"
        ? "border-brand-signal/50 bg-brand-signal/10 text-brand-signal"
        : tone === "good"
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : tone === "warn"
            ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            : "border-border bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] ${cls}`}
    >
      {children}
    </span>
  );
}

function DefList({ rows }: { rows: Row[] }) {
  return (
    <dl className="divide-y divide-border rounded-md border border-border">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-2 px-4 py-3 md:grid-cols-[200px_1fr] md:items-baseline">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{r.label}</dt>
          <dd className="text-sm text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
      {children}
    </code>
  );
}

function Block({ children }: { children: ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-border bg-muted/40 p-4 font-mono text-[11px] leading-relaxed text-foreground">
      {children}
    </pre>
  );
}

function Metric({
  label,
  value,
  target,
  budget,
}: {
  label: string;
  value: string;
  target?: string;
  budget?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-serif text-2xl font-medium tracking-tight">{value}</p>
      {target && (
        <p className="mt-1 text-xs text-muted-foreground">
          Target <span className="font-mono text-foreground">{target}</span>
        </p>
      )}
      {budget && (
        <p className="text-xs text-muted-foreground">
          Budget <span className="font-mono text-foreground">{budget}</span>
        </p>
      )}
    </div>
  );
}

/* ---------- Sections ---------- */

function Intro() {
  return (
    <section>
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">Technical</p>
      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight md:text-4xl">
        Performance, SEO & standards
      </h2>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        The site is content-heavy with athletic and campus imagery. Every performance decision
        prioritises perceived speed on mobile — parents browse on the train, athletes on the pitch.
        This spec is the source of truth for engineering budgets, image pipeline, caching, and
        UK-focused SEO.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip tone="core">Lovable Cloud (edge SSR)</Chip>
        <Chip tone="core">TanStack Start v1</Chip>
        <Chip tone="planned">Cloudflare Image Resizing</Chip>
        <Chip tone="planned">Lighthouse CI</Chip>
      </div>
    </section>
  );
}

function PerfTargets() {
  return (
    <section>
      <SubTitle>1 · Performance targets</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Lighthouse thresholds are the release gate; Core Web Vitals p75 field data is the health
        check. Mobile scores measured on Moto&nbsp;G4 profile with 4× CPU throttle and Slow&nbsp;4G.
      </p>

      <Sub>Lighthouse (mobile, throttled)</Sub>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Performance" value="≥ 90" target="95" />
        <Metric label="Accessibility" value="≥ 95" target="100" />
        <Metric label="Best Practices" value="≥ 95" target="100" />
        <Metric label="SEO" value="≥ 95" target="100" />
      </div>

      <Sub>Core Web Vitals (p75, field)</Sub>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="LCP" value="≤ 2.5 s" target="2.0 s" />
        <Metric label="INP" value="≤ 200 ms" target="150 ms" />
        <Metric label="CLS" value="≤ 0.1" target="0.05" />
        <Metric label="TTFB" value="≤ 800 ms" target="edge SSR" />
        <Metric label="FCP" value="≤ 1.8 s" target="1.2 s" />
      </div>

      <Sub>Bundle budgets (gzip)</Sub>
      <DefList
        rows={[
          { label: "Initial JS", value: <><Code>≤ 170 KB</Code> across all critical chunks combined</> },
          { label: "Per-route chunk", value: <Code>≤ 60 KB</Code> },
          { label: "CSS", value: <Code>≤ 40 KB</Code> },
          { label: "Fonts", value: <>Fraunces + Inter subset · <Code>≤ 90 KB</Code> · <Code>font-display: swap</Code></> },
          { label: "Third-party", value: <>Zero on first paint. Analytics and chat loaded on <Code>requestIdleCallback</Code>.</> },
        ]}
      />
    </section>
  );
}

function ImageStrategy() {
  return (
    <section>
      <SubTitle>2 · Image strategy</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Hero photography of campuses, dorms, playing fields and portraits is the highest single
        payload on every page. Format negotiation, responsive sizing and lazy loading are non-optional.
      </p>

      <Sub>Format ladder</Sub>
      <DefList
        rows={[
          { label: "Primary", value: <><Code>AVIF</Code> (~50% smaller than JPEG at equal quality)</> },
          { label: "Fallback", value: <><Code>WebP</Code> for Safari &lt; 16 and edge cases</> },
          { label: "Legacy", value: <><Code>JPEG</Code> mozjpeg q=78 for last-resort browsers</> },
          { label: "Markup", value: <><Code>&lt;picture&gt;</Code> with <Code>&lt;source type&gt;</Code> per format, <Code>&lt;img&gt;</Code> as JPEG fallback</> },
        ]}
      />

      <Sub>Responsive sizing</Sub>
      <Block>{`<picture>
  <source type="image/avif"
          srcset="/img/hero-400.avif 400w,
                  /img/hero-800.avif 800w,
                  /img/hero-1200.avif 1200w,
                  /img/hero-1600.avif 1600w,
                  /img/hero-2400.avif 2400w"
          sizes="100vw" />
  <source type="image/webp" srcset="..." sizes="100vw" />
  <img src="/img/hero-1200.jpg"
       alt="Sixth-form students on the Christ Church quad"
       width="1600" height="900"
       fetchpriority="high" decoding="async" />
</picture>`}</Block>

      <Sub>sizes conventions</Sub>
      <DefList
        rows={[
          { label: "Full-bleed hero", value: <Code>sizes="100vw"</Code> },
          { label: "3-up card grid", value: <Code>{`(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw`}</Code> },
          { label: "2-up split", value: <Code>{`(min-width:768px) 50vw, 100vw`}</Code> },
          { label: "Inline / portrait", value: <Code>{`(min-width:768px) 33vw, 66vw`}</Code> },
        ]}
      />

      <Sub>Loading & priority</Sub>
      <DefList
        rows={[
          {
            label: "LCP image",
            value: (
              <>
                <Code>fetchpriority="high"</Code> + <Code>{`<link rel="preload" as="image" imagesrcset imagesizes>`}</Code>{" "}
                in the route's <Code>head()</Code>. One per page only.
              </>
            ),
          },
          { label: "Below fold", value: <><Code>loading="lazy" decoding="async"</Code> on every non-LCP image</> },
          { label: "Dimensions", value: <>Explicit <Code>width</Code>/<Code>height</Code> on every <Code>&lt;img&gt;</Code> — required for CLS = 0</> },
          {
            label: "Placeholder",
            value: (
              <>LQIP: 20px WebP inlined as CSS <Code>background-image</Code> under the <Code>&lt;img&gt;</Code>, revealed on load</>
            ),
          },
        ]}
      />

      <Sub>Delivery pipeline</Sub>
      <DefList
        rows={[
          {
            label: "Bundled images",
            value: (
              <>
                <Code>vite-imagetools</Code> build-time variants:{" "}
                <Code>import hero from "./hero.jpg?w=800;1200;1600&format=avif;webp;jpg&as=picture"</Code>
              </>
            ),
          },
          {
            label: "Dynamic / CMS",
            value: (
              <>
                Cloudflare Image Resizing — signed URL variants on-demand. SSRF allow-list of
                trusted upstream hosts enforced in the transformer.
              </>
            ),
          },
          {
            label: "Art direction",
            value: (
              <>
                Portrait crop mobile, landscape desktop via <Code>{`<source media="(orientation: portrait)">`}</Code>. Athletic
                action shots keep the athlete in-frame at every crop.
              </>
            ),
          },
          { label: "Alt text", value: <>Mandatory. Empty <Code>alt=""</Code> only for decorative images.</> },
        ]}
      />
    </section>
  );
}

function BundlingSplit() {
  return (
    <section>
      <SubTitle>3 · Code splitting & bundling</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        TanStack Start's Vite plugin ships automatic route-level code splitting. Component code is
        lazy per route; loaders stay critical so data starts fetching in parallel with the JS chunk.
      </p>

      <Sub>Split strategy</Sub>
      <DefList
        rows={[
          { label: "Route components", value: <>Auto-split (<Code>autoCodeSplitting: true</Code>)</> },
          { label: "Route loaders", value: <>Stay in main bundle — parallel with chunk fetch</> },
          {
            label: "Heavy interactive",
            value: (
              <>
                Manual <Code>*.lazy.tsx</Code> for <Code>/brand</Code>, filter grids, and any route with
                &gt; 30 KB of interaction JS
              </>
            ),
          },
          {
            label: "Vendor split",
            value: (
              <>
                <Code>react</Code>, <Code>@tanstack/react-router</Code>, <Code>@tanstack/react-query</Code> in a
                shared long-cache chunk
              </>
            ),
          },
          {
            label: "Dynamic imports",
            value: (
              <>
                <Code>import()</Code> on interaction for: video player, embedded map, PDF viewer, rich
                form validation. Never at module scope.
              </>
            ),
          },
          {
            label: "Icons",
            value: (
              <>
                Per-icon imports (<Code>lucide-react/icons/&#123;name&#125;</Code>) — avoid barrel imports
                that pull the full library
              </>
            ),
          },
          {
            label: "Preloading",
            value: (
              <>
                <Code>{`<Link preload="intent">`}</Code> on nav — chunk + data fetched on hover / focus,
                not on click
              </>
            ),
          },
          {
            label: "Tree-shake audit",
            value: <><Code>sideEffects: false</Code> in <Code>package.json</Code> for internal packages</>,
          },
        ]}
      />
    </section>
  );
}

function CachingSpec() {
  return (
    <section>
      <SubTitle>4 · Caching</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Hashed static assets are immutable forever. HTML is short-cached with SWR so the CDN
        absorbs bursts. Public GET APIs are shared-cached at the edge; mutations bypass cache.
      </p>

      <Sub>HTTP cache headers</Sub>
      <DefList
        rows={[
          {
            label: "Static /_build/*",
            value: <><Code>Cache-Control: public, max-age=31536000, immutable</Code></>,
          },
          {
            label: "Images (CDN)",
            value: <><Code>public, max-age=31536000, immutable</Code> · hashed URL per variant</>,
          },
          {
            label: "HTML (SSR)",
            value: <><Code>public, max-age=0, s-maxage=60, stale-while-revalidate=600</Code></>,
          },
          {
            label: "API GET (public lists)",
            value: <><Code>public, s-maxage=300, stale-while-revalidate=3600</Code></>,
          },
          {
            label: "API mutations",
            value: <><Code>Cache-Control: no-store</Code></>,
          },
          {
            label: "sitemap.xml",
            value: <><Code>public, max-age=3600</Code></>,
          },
        ]}
      />

      <Sub>Client cache (TanStack Query)</Sub>
      <DefList
        rows={[
          { label: "Lists (schools, programmes)", value: <><Code>staleTime: 60_000</Code></> },
          { label: "Static content", value: <><Code>staleTime: Infinity</Code></> },
          { label: "User-specific", value: <><Code>staleTime: 0</Code>, refetch on focus</> },
          {
            label: "Router preload",
            value: <><Code>defaultPreloadStaleTime: 0</Code> — always re-check loader freshness on nav</>,
          },
          {
            label: "Invalidation",
            value: <>Mutation success ⇒ <Code>queryClient.invalidateQueries()</Code> for touched keys only</>,
          },
        ]}
      />
    </section>
  );
}

function SeoSpec() {
  return (
    <section>
      <SubTitle>5 · SEO — UK focused</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Every shareable route defines its own <Code>head()</Code>. UK is the primary market, so
        locale, currency, dates and school schema all target <Code>en-GB</Code>.
      </p>

      <Sub>Per-route metadata contract</Sub>
      <DefList
        rows={[
          { label: "title", value: <>Unique · &lt; 60 chars · pattern <Code>Page — Morgan Oxford</Code></> },
          { label: "description", value: <>Unique · &lt; 160 chars · benefit + region + call-to-action</> },
          { label: "canonical", value: <>Self-ref, relative (<Code>href="/schools/eton"</Code>) — leaf routes only</> },
          {
            label: "og:*",
            value: (
              <>
                <Code>og:title</Code>, <Code>og:description</Code>, <Code>og:type</Code>, <Code>og:url</Code>{" "}
                per route. <Code>og:image</Code> only where a real hero exists.
              </>
            ),
          },
          {
            label: "twitter:card",
            value: <><Code>summary_large_image</Code> when og:image present, else <Code>summary</Code></>,
          },
          { label: "robots", value: <>Default indexable; <Code>noindex</Code> on internal routes like <Code>/brand</Code></> },
        ]}
      />

      <Sub>UK localisation</Sub>
      <DefList
        rows={[
          { label: "html lang", value: <Code>en-GB</Code> },
          { label: "og:locale", value: <Code>en_GB</Code> },
          { label: "Currency", value: <><Code>GBP</Code> · <Code>£</Code> symbol</> },
          { label: "Dates", value: <><Code>DD/MM/YYYY</Code> in body, ISO in <Code>datetime</Code></> },
          { label: "Addresses", value: <>Full UK postcode format; <Code>addressCountry: "GB"</Code> in schema</> },
          {
            label: "hreflang",
            value: (
              <>
                Self-ref <Code>en-GB</Code> today. Add <Code>x-default</Code> and other locales when
                international expansion ships.
              </>
            ),
          },
        ]}
      />

      <Sub>JSON-LD schema per route type</Sub>
      <DefList
        rows={[
          {
            label: "Sitewide (__root)",
            value: (
              <>
                <Code>Organization</Code> (Morgan Oxford) + <Code>WebSite</Code> with{" "}
                <Code>SearchAction</Code>
              </>
            ),
          },
          {
            label: "School page",
            value: (
              <>
                <Code>EducationalOrganization</Code> (<Code>@type: "School"</Code>) with{" "}
                <Code>address</Code>, <Code>areaServed</Code>, <Code>foundingDate</Code>,{" "}
                <Code>alumni</Code>, <Code>sameAs</Code>
              </>
            ),
          },
          {
            label: "Programme page",
            value: (
              <>
                <Code>Course</Code> with <Code>provider</Code>, <Code>hasCourseInstance</Code>{" "}
                (<Code>courseMode</Code>, <Code>location</Code>, <Code>startDate</Code>,{" "}
                <Code>endDate</Code>, <Code>courseWorkload</Code>)
              </>
            ),
          },
          {
            label: "AthleteX",
            value: (
              <>
                <Code>SportsOrganization</Code> + <Code>Course</Code> where a pathway maps to a
                formal programme
              </>
            ),
          },
          { label: "Deep pages", value: <><Code>BreadcrumbList</Code> stacked with the page's primary schema</> },
          { label: "FAQ blocks", value: <><Code>FAQPage</Code> where a route contains an FAQ section</> },
        ]}
      />

      <Sub>Example — School page (EducationalOrganization)</Sub>
      <Block>{`{
  "@context": "https://schema.org",
  "@type": "School",
  "name": "Eton College",
  "url": "https://morganoxford.com/schools/eton",
  "logo": "https://morganoxford.com/img/eton-crest.png",
  "image": "https://morganoxford.com/img/eton-hero.jpg",
  "foundingDate": "1440",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eton College",
    "addressLocality": "Windsor",
    "postalCode": "SL4 6DW",
    "addressCountry": "GB"
  },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "alumni": [ { "@type": "Person", "name": "..." } ],
  "sameAs": ["https://www.etoncollege.com/"]
}`}</Block>

      <Sub>Example — Programme page (Course)</Sub>
      <Block>{`{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "UK Boarding Placement — Ages 13–16",
  "description": "End-to-end guidance from shortlist to offer.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Morgan Oxford Education",
    "sameAs": "https://morganoxford.com"
  },
  "inLanguage": "en-GB",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "blended",
    "location": {
      "@type": "Place",
      "address": { "@type": "PostalAddress", "addressCountry": "GB" }
    },
    "startDate": "2026-09-01",
    "endDate": "2027-07-15",
    "courseWorkload": "PT2H"
  }
}`}</Block>

      <Sub>Sitemap & robots</Sub>
      <DefList
        rows={[
          {
            label: "sitemap.xml",
            value: (
              <>
                Dynamic server route at <Code>src/routes/sitemap[.]xml.ts</Code>. Entries built from
                static routes + DB rows (schools, programmes, resources). <Code>BASE_URL=""</Code>{" "}
                placeholder until custom domain is set.
              </>
            ),
          },
          {
            label: "robots.txt",
            value: (
              <>
                <Code>User-agent: *</Code> / <Code>Allow: /</Code>. <Code>Sitemap:</Code> directive
                added once domain is live.
              </>
            ),
          },
          {
            label: "Semantic HTML",
            value: (
              <>
                One <Code>&lt;h1&gt;</Code> per route · landmarks (<Code>header/main/nav/footer</Code>)
                · skip-link at top of body
              </>
            ),
          },
        ]}
      />
    </section>
  );
}

function BrowserMatrix() {
  const rows: {
    browser: string;
    min: string;
    share: string;
    tier: "full" | "graceful";
    notes: string;
  }[] = [
    { browser: "Chrome / Edge", min: "111+ (Mar 2023)", share: "~65% UK", tier: "full", notes: "Full support" },
    { browser: "Safari (macOS/iOS)", min: "16.4+", share: "~28% UK", tier: "full", notes: "AVIF, container queries, :has()" },
    { browser: "Firefox", min: "115 ESR+", share: "~3% UK", tier: "full", notes: "Full support" },
    { browser: "Samsung Internet", min: "22+", share: "~2% UK", tier: "full", notes: "Android primary" },
    { browser: "Opera", min: "97+", share: "<1%", tier: "full", notes: "Chromium parity" },
    { browser: "Safari 15", min: "—", share: "<1%", tier: "graceful", notes: "WebP fallback, no :has()" },
    { browser: "IE11 / legacy Edge", min: "—", share: "~0%", tier: "graceful", notes: "SSR HTML only, no JS" },
  ];

  return (
    <section>
      <SubTitle>6 · Browser support matrix</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Baseline is evergreen browsers from March&nbsp;2023 onward. Older engines get static SSR
        HTML and the WebP/JPEG image fallback — no JS crashes, no broken layout.
      </p>

      <div className="mt-6 overflow-hidden rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Browser</th>
              <th className="px-4 py-3">Min version</th>
              <th className="px-4 py-3">UK share</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.browser} className="align-top">
                <td className="px-4 py-3 font-serif">{r.browser}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{r.min}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{r.share}</td>
                <td className="px-4 py-3">
                  {r.tier === "full" ? (
                    <Chip tone="good">Full</Chip>
                  ) : (
                    <Chip tone="warn">Graceful</Chip>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Sub>Rules</Sub>
        <DefList
          rows={[
            {
              label: "Progressive enhancement",
              value: <>Core content readable without JS via SSR. Enhanced interactivity requires ES2022.</>,
            },
            {
              label: "Polyfills",
              value: <>None by default. Added per-feature only when field analytics show measurable need.</>,
            },
            {
              label: "Test matrix",
              value: <>BrowserStack pre-release across the full-tier list + Lighthouse&nbsp;CI on every PR.</>,
            },
          ]}
        />
      </div>
    </section>
  );
}

function Monitoring() {
  return (
    <section>
      <SubTitle>7 · Monitoring (planned)</SubTitle>
      <DefList
        rows={[
          {
            label: "RUM",
            value: (
              <>
                <Code>web-vitals</Code> library → analytics endpoint. p75 LCP/INP/CLS dashboarded
                by route and by device class.
              </>
            ),
          },
          {
            label: "Lighthouse CI",
            value: <>Runs on every PR against the preview URL. Budget failures block merge.</>,
          },
          { label: "Error tracking", value: <><Chip tone="planned">Planned</Chip> Sentry with source maps for SSR + client</> },
          {
            label: "Uptime",
            value: <>External synthetic pings at 1-min interval against homepage + one leaf route</>,
          },
        ]}
      />
    </section>
  );
}
