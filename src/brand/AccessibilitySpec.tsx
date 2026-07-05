import { type ReactNode } from "react";

/**
 * Accessibility Spec — WCAG 2.1 AA dev checklist with verified contrast
 * ratios for the CORE and AthleteX palettes. Documentation-only.
 */

type Row = { label: string; value: ReactNode };

export function AccessibilitySpec() {
  return (
    <div className="space-y-16">
      <Intro />
      <ContrastPairs />
      <Perceivable />
      <Operable />
      <ScreenReader />
      <FocusStates />
      <FormA11y />
      <AltText />
      <MobileA11y />
      <TestingGates />
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
  tone?: "core" | "planned" | "good" | "warn" | "fail";
  children: ReactNode;
}) {
  const cls =
    tone === "planned"
      ? "border-primary/40 bg-primary/10 text-primary"
      : tone === "good"
        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        : tone === "warn"
          ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          : tone === "fail"
            ? "border-brand-signal/50 bg-brand-signal/10 text-brand-signal"
            : "border-border bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] ${cls}`}
    >
      {children}
    </span>
  );
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
      {children}
    </code>
  );
}

function DefList({ rows }: { rows: Row[] }) {
  return (
    <dl className="divide-y divide-border rounded-md border border-border">
      {rows.map((r, i) => (
        <div key={`${r.label}-${i}`} className="grid gap-2 px-4 py-3 md:grid-cols-[200px_1fr] md:items-baseline">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{r.label}</dt>
          <dd className="text-sm text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Checklist({ items }: { items: { code?: string; text: ReactNode }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm">
          <span aria-hidden className="mt-0.5 font-mono text-muted-foreground">☐</span>
          <span>
            {it.code && (
              <span className="mr-2 font-mono text-[11px] text-muted-foreground">{it.code}</span>
            )}
            {it.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Contrast pair swatch row ---------- */

type PairVerdict = "AAA" | "AA" | "AA-large" | "FAIL";

function PairSwatch({
  fg,
  bg,
  fgHex,
  bgHex,
  ratio,
  verdict,
  note,
}: {
  fg: string;
  bg: string;
  fgHex: string;
  bgHex: string;
  ratio: string;
  verdict: PairVerdict;
  note: string;
}) {
  const tone =
    verdict === "AAA" ? "good" : verdict === "AA" ? "good" : verdict === "AA-large" ? "warn" : "fail";
  return (
    <div className="grid gap-0 overflow-hidden rounded-md border border-border md:grid-cols-[220px_1fr]">
      <div
        className="flex flex-col items-start justify-center gap-2 p-5"
        style={{ background: bgHex, color: fgHex }}
      >
        <span className="font-serif text-xl font-medium leading-tight">Guiding minds</span>
        <span className="font-sans text-xs uppercase tracking-[0.2em] opacity-90">Aa · 14pt · 24pt bold</span>
      </div>
      <div className="flex flex-col gap-2 bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={tone}>{verdict}</Chip>
          <span className="font-mono text-sm text-foreground">{ratio}:1</span>
        </div>
        <p className="font-sans text-sm">
          <span className="font-mono text-[11px] text-muted-foreground">FG</span>{" "}
          <span className="font-serif">{fg}</span>{" "}
          <span className="font-mono text-[11px] text-muted-foreground">{fgHex}</span>{" "}
          <span className="text-muted-foreground">on</span>{" "}
          <span className="font-mono text-[11px] text-muted-foreground">BG</span>{" "}
          <span className="font-serif">{bg}</span>{" "}
          <span className="font-mono text-[11px] text-muted-foreground">{bgHex}</span>
        </p>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

/* ---------- Sections ---------- */

function Intro() {
  return (
    <section>
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">Accessibility</p>
      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight md:text-4xl">
        WCAG 2.1 AA — dev checklist
      </h2>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        The site targets WCAG 2.1 Level AA across every public route, with several AAA behaviours
        adopted where they cost nothing (contrast on primary pairs, 44px tap targets). This document
        is the source of truth for PR review — if a token pair, focus style, or form pattern isn't
        listed here, it isn't approved.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip tone="core">Radix / shadcn primitives</Chip>
        <Chip tone="core">Tailwind semantic tokens</Chip>
        <Chip tone="planned">axe-core in CI</Chip>
      </div>
    </section>
  );
}

function ContrastPairs() {
  return (
    <section>
      <SubTitle>1 · Verified contrast pairs</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Ratios computed from the live token hex values. Normal text needs ≥ 4.5:1, large text
        (≥ 18pt or ≥ 14pt bold) needs ≥ 3:1, non-text UI (borders, focus rings, icon-only
        controls) needs ≥ 3:1.
      </p>

      <Sub>Core — Morgan Oxford</Sub>
      <div className="space-y-3">
        <PairSwatch fg="Ink" fgHex="#0A1733" bg="Paper" bgHex="#FBFAF6" ratio="16.99"
          verdict="AAA" note="Primary body text on paper. Default pairing." />
        <PairSwatch fg="Royal" fgHex="#0B2A5B" bg="Paper" bgHex="#FBFAF6" ratio="13.44"
          verdict="AAA" note="Headlines, links, primary CTAs on paper." />
        <PairSwatch fg="Paper" fgHex="#FBFAF6" bg="Royal" bgHex="#0B2A5B" ratio="13.44"
          verdict="AAA" note="Inverted CTA and hero on royal." />
        <PairSwatch fg="Gold" fgHex="#C9A24A" bg="Ink" bgHex="#0A1733" ratio="7.40"
          verdict="AAA" note="Gold accent text on ink — safe for body." />
        <PairSwatch fg="Gold" fgHex="#C9A24A" bg="Royal" bgHex="#0B2A5B" ratio="5.85"
          verdict="AA" note="Gold on royal — safe for headlines and body." />
        <PairSwatch fg="Gold" fgHex="#C9A24A" bg="Paper" bgHex="#FBFAF6" ratio="2.30"
          verdict="FAIL" note="Never for text. Gold-on-paper is reserved for shapes, rules, monograms, and decorative crests only." />
        <PairSwatch fg="Slate" fgHex="#5B6B85" bg="Paper" bgHex="#FBFAF6" ratio="5.17"
          verdict="AA" note="Muted body text and metadata on paper." />
        <PairSwatch fg="Slate" fgHex="#5B6B85" bg="Royal" bgHex="#0B2A5B" ratio="2.60"
          verdict="FAIL" note="Never. Slate is a muted-on-paper token, not an inverted token." />
      </div>

      <Sub>AthleteX</Sub>
      <div className="space-y-3">
        <PairSwatch fg="Bone" fgHex="#F4F4F2" bg="Jet" bgHex="#0A0A0A" ratio="17.98"
          verdict="AAA" note="Primary body on jet — the AthleteX default." />
        <PairSwatch fg="Jet" fgHex="#0A0A0A" bg="Bone" bgHex="#F4F4F2" ratio="17.98"
          verdict="AAA" note="Inverse of the above — bone-mode body." />
        <PairSwatch fg="Signal Red" fgHex="#D7263D" bg="Jet" bgHex="#0A0A0A" ratio="3.99"
          verdict="AA-large" note="Large text only (≥ 18pt or ≥ 14pt bold). Fails for body. Approved for headlines, CTAs, chips, kickers." />
        <PairSwatch fg="Bone" fgHex="#F4F4F2" bg="Signal Red" bgHex="#D7263D" ratio="4.50"
          verdict="AA" note="Right at the 4.5 threshold. Safe for body, but prefer for headlines and primary CTAs." />
        <PairSwatch fg="Metallic" fgHex="#C0C5CC" bg="Jet" bgHex="#0A0A0A" ratio="11.41"
          verdict="AAA" note="Muted body text on jet." />
        <PairSwatch fg="Metallic" fgHex="#C0C5CC" bg="Bone" bgHex="#F4F4F2" ratio="1.58"
          verdict="FAIL" note="Never. Metallic is a dark-mode muted token only." />
      </div>

      <div className="mt-6 rounded-md border border-brand-signal/40 bg-brand-signal/5 p-4">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-signal">
          Enforcement
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-foreground">
          <li>Any new colour pair introduced without a row in this table is a PR blocker.</li>
          <li>Gold-on-paper text is banned in components; the token is available for decorative fills only.</li>
          <li>Signal-red-on-jet body text is banned; the pair is approved for large text only.</li>
          <li>Focus rings and error borders must hit ≥ 3:1 against every surface they sit on (WCAG 1.4.11).</li>
        </ul>
      </div>
    </section>
  );
}

function Perceivable() {
  return (
    <section>
      <SubTitle>2 · Perceivable (WCAG 1.x)</SubTitle>
      <div className="mt-4">
        <Checklist
          items={[
            { code: "1.1.1", text: <>Every <Code>&lt;img&gt;</Code> has an <Code>alt</Code>; decorative crests and patterns use <Code>alt=""</Code>.</> },
            { code: "1.3.1", text: <>Semantic <Code>&lt;header&gt;&lt;main&gt;&lt;nav&gt;&lt;footer&gt;</Code>, single <Code>&lt;h1&gt;</Code> per route, no heading level skips.</> },
            { code: "1.3.4", text: <>Content works in portrait and landscape; no orientation lock.</> },
            { code: "1.3.5", text: <><Code>autocomplete</Code> tokens on name, email, tel, postal-code, country-name, bday fields.</> },
            { code: "1.4.3", text: <>Text contrast ≥ 4.5:1 (normal) / 3:1 (large) — enforced by the pairs table above.</> },
            { code: "1.4.4", text: <>Layout survives 200% browser zoom with no clipped content or horizontal scroll.</> },
            { code: "1.4.10", text: <>Reflow: no horizontal scroll at 320px CSS width (baseline from Responsive spec).</> },
            { code: "1.4.11", text: <>Non-text contrast ≥ 3:1 for form borders, focus rings, icon-only controls.</> },
            { code: "1.4.12", text: <>Text spacing: <Code>line-height ≥ 1.5×</Code> body, paragraph gap ≥ 2× font size.</> },
            { code: "1.4.13", text: <>Hover / focus tooltips are dismissible with Esc and persist while hovered.</> },
          ]}
        />
      </div>
    </section>
  );
}

function Operable() {
  return (
    <section>
      <SubTitle>3 · Operable — keyboard flow (WCAG 2.x)</SubTitle>
      <div className="mt-4">
        <Checklist
          items={[
            { code: "2.1.1", text: <>Every interactive element reachable and operable with Tab / Shift+Tab / Enter / Space / Arrow keys.</> },
            { code: "2.1.2", text: <>No keyboard traps. Modals return focus to the trigger on close — use Radix Dialog, don't reimplement.</> },
            { code: "2.1.4", text: <>No single-character shortcuts without a modifier or an off-switch.</> },
            { code: "2.4.1", text: <>Skip link (<Code>{`<a href="#main-content" class="sr-only focus:not-sr-only">`}</Code>) as first <Code>&lt;body&gt;</Code> child; <Code>{`<main id="main-content">`}</Code>.</> },
            { code: "2.4.3", text: <>DOM order matches visual order. Never use <Code>tabindex &gt; 0</Code>.</> },
            { code: "2.4.7", text: <><Code>:focus-visible</Code> ring on every interactive element. Never <Code>outline: none</Code> without a replacement.</> },
            { code: "2.5.5", text: <>Primary tap targets 44 × 44 px (CORE) / 52 × 52 px (AthleteX mobile). Hard floor 24 × 24 px.</> },
            { text: <>Mobile hamburger uses <Code>{`<button aria-expanded aria-controls>`}</Code>; the sheet itself is a Radix Dialog with focus trap + Esc.</> },
            { text: <>Filter groups (school type, boarding, sport) wrapped in <Code>{`<fieldset><legend>`}</Code>.</> },
          ]}
        />
      </div>
    </section>
  );
}

function ScreenReader() {
  return (
    <section>
      <SubTitle>4 · Screen reader</SubTitle>
      <div className="mt-4">
        <DefList
          rows={[
            { label: "Landmarks", value: <>One <Code>&lt;main&gt;</Code> per route in the root layout, plus <Code>{`<nav aria-label="Primary">`}</Code> and <Code>{`<nav aria-label="Footer">`}</Code>.</> },
            { label: "Live regions", value: <>Enquiry status <Code>aria-live="polite"</Code>; error summary <Code>role="alert"</Code>.</> },
            { label: "Icon-only buttons", value: <><Code>aria-label</Code> mandatory. Never rely on the icon alone.</> },
            { label: "Decorative icons", value: <><Code>aria-hidden="true"</Code> on inline SVGs adjacent to text.</> },
            { label: "Loading states", value: <>Skeletons <Code>aria-hidden</Code>; a polite live region announces "Loading…" then "Loaded".</> },
            { label: "Route change", value: <>After client navigation, focus moves to the new route's <Code>&lt;h1&gt;</Code>; page title updates via TanStack <Code>head()</Code>.</> },
            { label: "Language", value: <><Code>{`<html lang="en-GB">`}</Code>. Inline non-English quotations get their own <Code>lang</Code>.</> },
          ]}
        />
      </div>
    </section>
  );
}

function FocusStates() {
  return (
    <section>
      <SubTitle>5 · Focus states</SubTitle>
      <div className="mt-4">
        <DefList
          rows={[
            { label: "Token", value: <><Code>--ring</Code> is Royal in CORE, Signal Red in AthleteX. Both hit ≥ 3:1 against <Code>--background</Code> and <Code>--card</Code>.</> },
            { label: "Style", value: <><Code>focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring</Code></> },
            { label: "Coverage", value: <>Never remove focus rings — including custom cards used as links and image-only tiles.</> },
            { label: "Motion", value: <>Focus ring appears without animation for <Code>prefers-reduced-motion</Code> users (per Animation spec).</> },
          ]}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-md border border-border bg-card p-4">
        <button
          type="button"
          className="rounded-sm bg-primary px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Tab to see focus (CORE)
        </button>
        <div className="zone-athletex inline-block">
          <button
            type="button"
            className="rounded-sm bg-brand-signal px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brand-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Tab to see focus (AthleteX)
          </button>
        </div>
      </div>
    </section>
  );
}

function FormA11y() {
  return (
    <section>
      <SubTitle>6 · Form accessibility</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Applies to enquiry, contact, scholarship, and resource-download forms.
      </p>
      <div className="mt-4">
        <Checklist
          items={[
            { text: <>Every input has a visible <Code>{`<label htmlFor>`}</Code>. Placeholders are never labels.</> },
            { text: <>Required fields: <Code>aria-required="true"</Code> plus a visible <Code>*</Code> explained in the form intro.</> },
            { text: <>Errors: <Code>aria-invalid="true"</Code> on the field, error text in <Code>{`<p id="field-err">`}</Code> linked via <Code>aria-describedby</Code>.</> },
            { text: <>Error summary above the form is <Code>role="alert"</Code> with anchor links to each invalid field.</> },
            { text: <><Code>autocomplete</Code> tokens: <Code>name</Code>, <Code>email</Code>, <Code>tel</Code>, <Code>postal-code</Code>, <Code>country-name</Code>, <Code>bday</Code> (scholarship age gate).</> },
            { text: <>Radio / checkbox groups wrapped in <Code>{`<fieldset><legend>`}</Code>.</> },
            { text: <>Honeypot and timing-gate fields are <Code>aria-hidden="true"</Code>, off-screen, and never focusable.</> },
            { text: <>Submit button stays enabled while the user is filling the form; validation surfaces on submit.</> },
            { text: <>Success state announced via <Code>aria-live="polite"</Code>; focus moves to the success heading.</> },
          ]}
        />
      </div>
    </section>
  );
}

function AltText() {
  return (
    <section>
      <SubTitle>7 · Alt text — uniform, boarding, athletic imagery</SubTitle>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Content-first. No "image of", no filenames, no marketing copy in <Code>alt</Code>.
        Longer descriptions belong in surrounding caption text, not the attribute.
      </p>

      <div className="mt-4">
        <DefList
          rows={[
            { label: "School exteriors", value: <>"Christ Church College quadrangle at dusk, Oxford"</> },
            { label: "Uniforms / portraits", value: <>Role + context, not appearance: "Year 10 pupil in Winchester College uniform outside School House". Never describe race, body, or presumed gender. Use pupil's real name only with signed consent — otherwise year and role.</> },
            { label: "Boarding interiors", value: <>"Boarding-house common room with study desks and evening lamps"</> },
            { label: "Classroom", value: <>"Sixth-form biology lab session with two students at a microscope"</> },
            { label: "Athletic action", value: <>"Under-16 rugby fly-half breaking through a tackle at Rugby School"</> },
            { label: "Athletic portrait", value: <>"Athlete portrait — Ella, U18 heptathlete, AthleteX pathway"</> },
            { label: "Trophies / kit", value: <>Name the achievement: "Regional U18 champion medal, 2025"</> },
            { label: "Decorative", value: <>Crests, patterns, rules, dividers → <Code>alt=""</Code>.</> },
            { label: "Logos", value: <>Use the organisation name, not the word "logo": <Code>alt="Morgan Oxford Education"</Code>.</> },
            { label: "Length", value: <>≤ 125 characters. Longer context belongs in <Code>&lt;figcaption&gt;</Code>.</> },
            { label: "Responsive crops", value: <>Art-directed <Code>&lt;source&gt;</Code> variants share one <Code>alt</Code> on the fallback <Code>&lt;img&gt;</Code>. Write it for the mobile crop.</> },
          ]}
        />
      </div>
    </section>
  );
}

function MobileA11y() {
  return (
    <section>
      <SubTitle>8 · Mobile accessibility</SubTitle>
      <div className="mt-4">
        <Checklist
          items={[
            { text: <>Viewport: <Code>{`<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`}</Code>. Never disable pinch-zoom.</> },
            { text: <>Use <Code>h-dvh</Code>, not <Code>h-screen</Code>, for full-height mobile layouts (iOS URL-bar safe).</> },
            { text: <>Tap targets: 44 × 44 px CORE, 52 × 52 px AthleteX primary. ≥ 8 px between adjacent targets.</> },
            { text: <>Content available in portrait and landscape (WCAG 1.3.4).</> },
            { text: <>Sticky headers and bottom CTAs respect <Code>env(safe-area-inset-*)</Code>.</> },
            { text: <><Code>prefers-reduced-motion</Code> respected — hero and scroll-in animations already gated.</> },
            { text: <>Native input types: <Code>type="tel"</Code>, <Code>type="email"</Code>, <Code>inputMode="numeric"</Code> for correct mobile keyboards.</> },
            { text: <>iOS Voice Control: every interactive element's visible label matches its accessible name (so "Tap Book consultation" works).</> },
          ]}
        />
      </div>
    </section>
  );
}

function TestingGates() {
  return (
    <section>
      <SubTitle>9 · Testing gates (per PR)</SubTitle>
      <div className="mt-4">
        <DefList
          rows={[
            { label: "axe-core", value: <>Zero serious or critical findings on <Code>/</Code>, <Code>/schools/*</Code>, <Code>/programmes/*</Code>, <Code>/enquire/*</Code>, <Code>/athletex/*</Code>.</> },
            { label: "Keyboard walk", value: <>End-to-end enquiry funnel completed with keyboard only.</> },
            { label: "VoiceOver", value: <>iOS spot check on mobile nav sheet and the primary form.</> },
            { label: "Lighthouse", value: <>Accessibility score ≥ 95 (from Technical spec).</> },
            { label: "Contrast", value: <>New colour pair without a row in the pairs table = PR blocker.</> },
          ]}
        />
      </div>
    </section>
  );
}
