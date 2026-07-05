import { type ReactNode } from "react";

/**
 * Responsive Adaptation spec — mobile / tablet / desktop.
 * Documentation section rendered inside /brand.
 */

type Row = {
  aspect: string;
  mobile: string;
  tablet: string;
  desktop: string;
  athletex?: string;
};

export function ResponsiveSpec() {
  return (
    <div className="space-y-16">
      <Tiers />
      <LayoutBlock />
      <TypeBlock />
      <NavBlock />
      <ImageBlock />
      <TouchBlock />
      <DensityBlock />
    </div>
  );
}

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

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Aspect</th>
            <th className="px-3 py-2">Mobile · 320–767</th>
            <th className="px-3 py-2">Tablet · 768–1023</th>
            <th className="px-3 py-2">Desktop · 1024+</th>
            <th className="px-3 py-2">AthleteX note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.aspect} className="border-t border-border align-top">
              <td className="px-3 py-2 font-semibold">{r.aspect}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.mobile}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.tablet}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.desktop}</td>
              <td className="px-3 py-2 text-xs">
                <span className="text-primary">{r.athletex ?? "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-muted/30 p-4">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Implementation
      </p>
      <pre className="overflow-x-auto text-xs leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Block({
  title,
  demo,
  rows,
  hint,
}: {
  title: string;
  demo: ReactNode;
  rows: Row[];
  hint: string;
}) {
  return (
    <section className="space-y-4">
      <SubTitle>{title}</SubTitle>
      <div>
        <Sub>Demo</Sub>
        <div className="rounded-md border border-border bg-card p-6">{demo}</div>
      </div>
      <div>
        <Sub>Spec</Sub>
        <Table rows={rows} />
      </div>
      <Hint>{hint}</Hint>
    </section>
  );
}

/** Resizable frame lets reviewers drag to cross tier thresholds without devtools. */
function ResizeFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="resize-x overflow-auto rounded-md border border-dashed border-border bg-background p-4"
      style={{ width: 420, minWidth: 320, maxWidth: 1200 }}
    >
      <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
        Drag right edge to resize ↔
      </p>
      {children}
    </div>
  );
}

/* ---------------- tiers ---------------- */

function Tiers() {
  const tiers = [
    { name: "Mobile", range: "320–767 px", prefix: "base (no prefix)", gutter: "16 px", cols: "1" },
    { name: "Tablet", range: "768–1023 px", prefix: "md:", gutter: "24 px", cols: "2" },
    { name: "Desktop", range: "1024 px +", prefix: "lg: / xl:", gutter: "32 px", cols: "3–4" },
  ];
  return (
    <section className="space-y-3">
      <SubTitle>Breakpoint tiers</SubTitle>
      <p className="text-sm text-muted-foreground">
        Aligned to Tailwind defaults. Mobile is the base layer; every larger tier is additive via
        <code className="mx-1 font-mono text-xs">md:</code> and
        <code className="ml-1 font-mono text-xs">lg:</code> prefixes.
      </p>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Tier</th>
              <th className="px-3 py-2">Range</th>
              <th className="px-3 py-2">Prefix</th>
              <th className="px-3 py-2">Gutter</th>
              <th className="px-3 py-2">Default columns</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((t) => (
              <tr key={t.name} className="border-t border-border">
                <td className="px-3 py-2 font-semibold">{t.name}</td>
                <td className="px-3 py-2 font-mono text-xs">{t.range}</td>
                <td className="px-3 py-2 font-mono text-xs">{t.prefix}</td>
                <td className="px-3 py-2 font-mono text-xs">{t.gutter}</td>
                <td className="px-3 py-2 font-mono text-xs">{t.cols}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------------- 1. layout ---------------- */

function LayoutBlock() {
  return (
    <Block
      title="1 · Layout & stacking"
      demo={
        <ResizeFrame>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-md border border-border bg-muted/40 p-4 text-xs">
                Card {i}
              </div>
            ))}
          </div>
          <div className="zone-athletex mt-4">
            <div className="rounded-md border border-border bg-brand-jet p-6 text-brand-bone">
              <p className="text-[10px] uppercase tracking-widest text-primary">AthleteX block</p>
              <p className="mt-2 font-serif text-lg">Stays edge-to-edge, no card-ification.</p>
            </div>
          </div>
        </ResizeFrame>
      }
      rows={[
        {
          aspect: "Columns",
          mobile: "1 col, stacked",
          tablet: "2 col grids",
          desktop: "3–4 col grids, 1200px content max, 1440px hero",
          athletex: "Full-bleed hero on every tier",
        },
        {
          aspect: "Gutters",
          mobile: "16 px",
          tablet: "24 px",
          desktop: "32 px",
          athletex: "Same",
        },
        {
          aspect: "Container",
          mobile: "100vw, edge-to-edge",
          tablet: "max-w-3xl centered",
          desktop: "max-w-6xl centered",
          athletex: "Bolder blocks break out of container on mobile",
        },
      ]}
      hint={`<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
  {cards.map(...)}
</div>

{/* AthleteX: preserve bold, edge-to-edge feel on mobile */}
<section className="-mx-4 md:mx-0 zone-athletex bg-brand-jet">...</section>`}
    />
  );
}

/* ---------------- 2. type ---------------- */

function TypeBlock() {
  return (
    <Block
      title="2 · Type sizing"
      demo={
        <div className="space-y-4">
          <p
            className="font-serif font-medium tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            Guiding young minds
          </p>
          <p
            className="font-serif"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.15 }}
          >
            A fluid H1 that scales with viewport width
          </p>
          <p className="text-base leading-relaxed text-muted-foreground md:text-[17px] lg:text-lg">
            Body copy steps 16 → 17 → 18 px across tiers, with line-height easing from 1.55 to 1.6
            to keep long-form comfortable at wider measures.
          </p>
          <div className="zone-athletex rounded-md border border-border bg-brand-jet p-6">
            <p
              className="font-serif font-extrabold text-brand-bone"
              style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              WHERE TALENT MEETS OPPORTUNITY
            </p>
          </div>
        </div>
      }
      rows={[
        {
          aspect: "Display",
          mobile: "~32 px",
          tablet: "~48 px",
          desktop: "~72 px",
          athletex: "Weight 800, tracking -0.02em preserved",
        },
        { aspect: "H1", mobile: "28 px", tablet: "36 px", desktop: "48 px", athletex: "Same scale, bolder weight" },
        { aspect: "H2 / H3", mobile: "22 / 18 px", tablet: "26 / 20 px", desktop: "32 / 22 px", athletex: "—" },
        { aspect: "Body", mobile: "16 px / 1.55", tablet: "17 px / 1.58", desktop: "18 px / 1.6", athletex: "—" },
        { aspect: "Caption", mobile: "12 px", tablet: "12 px", desktop: "13 px", athletex: "Uppercase, 0.3em tracking" },
      ]}
      hint={`/* Fluid display via clamp() */
.display { font-size: clamp(2rem, 6vw, 4.5rem); }

/* Tier-stepped body via responsive utilities */
<p className="text-base md:text-[17px] lg:text-lg leading-relaxed">...</p>`}
    />
  );
}

/* ---------------- 3. nav ---------------- */

function NavBlock() {
  return (
    <Block
      title="3 · Nav pattern"
      demo={
        <div className="space-y-4">
          <div className="rounded-md border border-border">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <span className="font-serif text-sm">Morgan Oxford</span>
              <button
                className="grid h-11 w-11 place-items-center rounded-md border border-border text-xs"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
            <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              Mobile · 56 px header · hamburger → full-screen sheet
            </p>
          </div>
          <div className="rounded-md border border-border">
            <div className="flex h-16 items-center gap-5 border-b border-border px-4 text-sm">
              <span className="font-serif">Morgan Oxford</span>
              <span className="text-muted-foreground">Schools</span>
              <span className="text-muted-foreground">Programmes</span>
              <span className="ml-auto text-muted-foreground">More ▾</span>
            </div>
            <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              Tablet · 64 px · condensed row + overflow menu
            </p>
          </div>
          <div className="rounded-md border border-border">
            <div className="flex h-[72px] items-center gap-6 border-b border-border px-6 text-sm">
              <span className="font-serif">Morgan Oxford Education</span>
              <span>Schools</span>
              <span>Programmes</span>
              <span>Process</span>
              <span>Insights</span>
              <span className="ml-auto rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary">
                AthleteX
              </span>
            </div>
            <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              Desktop · 72 px · full horizontal nav + mega-menu + inline pathway pill
            </p>
          </div>
        </div>
      }
      rows={[
        {
          aspect: "Header height",
          mobile: "56 px",
          tablet: "64 px",
          desktop: "72 px",
          athletex: "+4 px on all tiers, darker background",
        },
        {
          aspect: "Primary nav",
          mobile: "Hamburger → full-screen sheet",
          tablet: "Condensed horizontal + overflow",
          desktop: "Full horizontal + mega-menu",
          athletex: "Pathway pill promoted to primary CTA",
        },
        {
          aspect: "Pathway toggle",
          mobile: "Pinned top of sheet",
          tablet: "Inline right",
          desktop: "Inline right",
          athletex: "Signal-red highlight in AthleteX zone",
        },
      ]}
      hint={`<header className="h-14 md:h-16 lg:h-[72px]">
  {/* mobile: hamburger triggers Sheet */}
  <button className="md:hidden h-11 w-11" aria-label="Open menu">☰</button>
  {/* tablet+: inline links */}
  <nav className="hidden md:flex gap-5 lg:gap-6">...</nav>
</header>`}
    />
  );
}

/* ---------------- 4. images ---------------- */

function ImageBlock() {
  return (
    <Block
      title="4 · Image strategy"
      demo={
        <div className="grid gap-4 md:grid-cols-3">
          <div className="aspect-square rounded-md bg-gradient-to-br from-brand-royal to-brand-ink text-brand-paper">
            <div className="flex h-full items-end p-3 text-[10px] uppercase tracking-widest">
              Mobile · portrait/square
            </div>
          </div>
          <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-brand-royal to-brand-slate text-brand-paper">
            <div className="flex h-full items-end p-3 text-[10px] uppercase tracking-widest">
              Tablet · 4:3
            </div>
          </div>
          <div className="aspect-[16/9] rounded-md bg-gradient-to-br from-brand-slate to-brand-ink text-brand-paper">
            <div className="flex h-full items-end p-3 text-[10px] uppercase tracking-widest">
              Desktop · 16:9
            </div>
          </div>
        </div>
      }
      rows={[
        {
          aspect: "Aspect ratio",
          mobile: "1:1 / 4:5",
          tablet: "4:3",
          desktop: "16:9 hero, 3:2 cards",
          athletex: "Full-bleed 21:9 hero on every tier, min 240 px tall on mobile",
        },
        {
          aspect: "sizes attr",
          mobile: '"100vw"',
          tablet: '"(min-width:768px) 50vw, 100vw"',
          desktop: '"(min-width:1024px) 33vw, 50vw"',
          athletex: "Same",
        },
        {
          aspect: "Loading",
          mobile: "LCP eager, rest lazy",
          tablet: "Same",
          desktop: "Same + art-directed <picture> for hero",
          athletex: "Never thumbnail action shots",
        },
        {
          aspect: "Format",
          mobile: "AVIF → WebP → JPG",
          tablet: "Same",
          desktop: "Same",
          athletex: "—",
        },
      ]}
      hint={`<img
  src="/hero.jpg"
  srcSet="/hero-640.jpg 640w, /hero-1024.jpg 1024w, /hero-1920.jpg 1920w"
  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
  loading="lazy" decoding="async"
  className="aspect-square md:aspect-[4/3] lg:aspect-[16/9] w-full object-cover"
/>`}
    />
  );
}

/* ---------------- 5. touch ---------------- */

function TouchBlock() {
  return (
    <Block
      title="5 · Touch targets"
      demo={
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <button className="grid h-11 min-w-11 place-items-center rounded-md border border-border px-3 text-xs">
              44 px min
            </button>
            <button className="h-12 rounded-md bg-primary px-4 text-sm text-primary-foreground">
              Primary · 48 px
            </button>
            <button className="h-10 rounded-md border border-border px-3 text-xs">
              Desktop dense · 40 px
            </button>
          </div>
          <div className="zone-athletex">
            <button className="h-[52px] rounded-md bg-primary px-5 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-[0_6px_0_-2px_var(--brand-jet)]">
              AthleteX · 52 px
            </button>
          </div>
        </div>
      }
      rows={[
        {
          aspect: "Min tap area",
          mobile: "44 × 44 px (WCAG 2.5.5)",
          tablet: "44 × 44 px",
          desktop: "40 × 40 px acceptable in dense UI",
          athletex: "52 mobile / 48 tablet+",
        },
        {
          aspect: "Primary CTA height",
          mobile: "48 px",
          tablet: "48 px",
          desktop: "44 px",
          athletex: "+4 px + tactile shadow",
        },
        {
          aspect: "Spacing between targets",
          mobile: "≥ 8 px",
          tablet: "≥ 8 px",
          desktop: "≥ 4 px",
          athletex: "—",
        },
        {
          aspect: "Hover states",
          mobile: "Suppressed",
          tablet: "Enabled (hybrid)",
          desktop: "Enabled",
          athletex: "translateY(-1px) lift on hover",
        },
      ]}
      hint={`{/* Use size utilities, not px in JSX */}
<button className="h-12 md:h-12 lg:h-11 min-w-11 px-4">Enquire</button>

/* Respect hover only where it means something */
@media (hover: hover) { .btn:hover { ... } }`}
    />
  );
}

/* ---------------- 6. density ---------------- */

function DensityBlock() {
  return (
    <Block
      title="6 · Density & spacing"
      demo={
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-border bg-card p-12">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Mobile ×0.75</p>
            <p className="mt-2 font-serif">48 px section padding</p>
          </div>
          <div className="rounded-md border border-border bg-card p-[72px]">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Tablet ×1.0</p>
            <p className="mt-2 font-serif">72 px</p>
          </div>
          <div className="rounded-md border border-border bg-card p-24">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Desktop ×1.25</p>
            <p className="mt-2 font-serif">96–120 px</p>
          </div>
        </div>
      }
      rows={[
        {
          aspect: "Section padding-y",
          mobile: "48 px",
          tablet: "72 px",
          desktop: "96–120 px",
          athletex: "+16 px on hero sections",
        },
        {
          aspect: "Card padding",
          mobile: "16 px",
          tablet: "20 px",
          desktop: "24 px",
          athletex: "—",
        },
        {
          aspect: "Stack gap",
          mobile: "12–16 px",
          tablet: "16–24 px",
          desktop: "24–32 px",
          athletex: "—",
        },
      ]}
      hint={`<section className="py-12 md:py-18 lg:py-24">
  <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
    ...
  </div>
</section>`}
    />
  );
}
