import { useState, type ReactNode } from "react";
import { HeroReveal } from "@/lib/motion/HeroReveal";
import { Reveal } from "@/lib/motion/Reveal";

/**
 * Animation spec — 6 named animations, rendered inside /brand.
 */

type Row = {
  trigger: string;
  duration: string;
  easing: string;
  from_to: string;
  gpu: string;
  reduced: string;
};

export function AnimationSpec() {
  return (
    <div className="space-y-16">
      <Tokens />
      <HeroBlock />
      <ScrollBlock />
      <NavBlock />
      <ButtonBlock />
      <SectionTransitionBlock />
      <HandoffBlock />
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

function Table({ rows }: { rows: (Row & { variant: string })[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-3 py-2">Variant</th>
            <th className="px-3 py-2">Trigger</th>
            <th className="px-3 py-2">Duration</th>
            <th className="px-3 py-2">Easing</th>
            <th className="px-3 py-2">Start → End</th>
            <th className="px-3 py-2">GPU</th>
            <th className="px-3 py-2">Reduced motion</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.variant} className="border-t border-border align-top">
              <td className="px-3 py-2 font-semibold">{r.variant}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.trigger}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.duration}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.easing}</td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r.from_to}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.gpu}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.reduced}</td>
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
  rows: (Row & { variant: string })[];
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

/* ---------------- tokens ---------------- */

function Tokens() {
  const tokens = [
    { name: "--motion-hero", value: "640ms", use: "hero reveal" },
    { name: "--motion-section", value: "520ms", use: "scroll-in sections" },
    { name: "--motion-handoff", value: "480ms", use: "CORE↔AthleteX crossfade" },
    { name: "--ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)", use: "CORE default" },
    { name: "--ease-athletex-land", value: "cubic-bezier(0.16, 1, 0.3, 1)", use: "AthleteX punchy landing" },
    { name: "--ease-exit", value: "cubic-bezier(0.4, 0, 1, 1)", use: "presses, dismissals" },
  ];
  return (
    <section className="space-y-3">
      <SubTitle>Narrative motion tokens</SubTitle>
      <p className="text-sm text-muted-foreground">
        Adds to the state/motion tokens shipped in the previous pass. CORE animations use{" "}
        <code className="font-mono text-xs">--ease-standard</code>; AthleteX uses{" "}
        <code className="font-mono text-xs">--ease-athletex-land</code> and shaves ~60ms.
      </p>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Token</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Use</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.name} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{t.name}</td>
                <td className="px-3 py-2 font-mono text-xs">{t.value}</td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{t.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------------- 1. hero reveal ---------------- */

function HeroBlock() {
  const [nonce, setNonce] = useState(0);
  return (
    <Block
      title="1 · Hero reveal"
      demo={
        <div className="space-y-4">
          <button
            onClick={() => setNonce((n) => n + 1)}
            className="text-xs font-semibold uppercase tracking-widest text-primary underline"
          >
            Replay ↻
          </button>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-border p-6">
              <p className="mb-4 text-[10px] uppercase tracking-widest text-muted-foreground">CORE</p>
              <HeroReveal key={`c-${nonce}`} variant="core">
                <p className="text-xs uppercase tracking-widest text-primary">Oxford · 2011</p>
                <h5 className="mt-2 font-serif text-2xl">British school placement.</h5>
                <p className="mt-2 text-sm text-muted-foreground">640ms, 80ms stagger, ease-standard.</p>
                <button className="mt-3 h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">Enquire</button>
              </HeroReveal>
            </div>
            <div className="zone-athletex rounded-md border border-border bg-background p-6 text-foreground">
              <p className="mb-4 text-[10px] uppercase tracking-widest text-primary">ATHLETEX</p>
              <HeroReveal key={`a-${nonce}`} variant="athletex">
                <p className="text-xs uppercase tracking-widest text-primary">Scholarship</p>
                <h5 className="mt-2 font-serif text-2xl">Sport-first placement.</h5>
                <p className="mt-2 text-sm text-muted-foreground">580ms, 60ms stagger, athletex-land.</p>
                <button className="mt-3 h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground">Apply</button>
              </HeroReveal>
            </div>
          </div>
        </div>
      }
      rows={[
        { variant: "CORE", trigger: "mount, once", duration: "640ms × N", easing: "standard", from_to: "opacity 0→1, translateY(12→0)", gpu: "will-change: transform,opacity", reduced: "opacity flip, no stagger" },
        { variant: "AthleteX", trigger: "mount, once", duration: "580ms × N", easing: "athletex-land", from_to: "opacity 0→1, translateY(16→0), scale(.98→1)", gpu: "same, stripped on animationend", reduced: "opacity flip, no stagger" },
      ]}
      hint={`import { HeroReveal } from "@/lib/motion/HeroReveal";

<HeroReveal variant="core">
  <p>Eyebrow</p>
  <h1>Headline</h1>
  <p>Lede</p>
  <div>CTAs</div>
</HeroReveal>
// Stagger index is inferred from child order (80ms CORE, 60ms AthleteX).`}
    />
  );
}

/* ---------------- 2. scroll-in ---------------- */

function ScrollBlock() {
  return (
    <Block
      title="2 · Scroll-in sections"
      demo={
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">Scroll this container:</p>
          <div className="h-64 overflow-y-auto rounded-md border border-border p-6">
            <div className="h-40" />
            <Reveal kind="section">
              <div className="rounded-md border border-border bg-card p-6">
                <p className="font-serif text-lg">CORE section</p>
                <p className="text-xs text-muted-foreground">translateY 24 → 0, 520ms standard.</p>
              </div>
            </Reveal>
            <div className="h-24" />
            <div className="zone-athletex">
              <Reveal kind="section" variant="athletex">
                <div className="rounded-md border border-border bg-card p-6">
                  <p className="font-serif text-lg text-foreground">AthleteX section</p>
                  <p className="text-xs text-muted-foreground">translateY 32 + scale .985 → 1, 460ms athletex-land.</p>
                </div>
              </Reveal>
            </div>
            <div className="h-40" />
          </div>
        </div>
      }
      rows={[
        { variant: "CORE", trigger: "IntersectionObserver 0.15, rootMargin -10%", duration: "520ms", easing: "standard", from_to: "opacity 0→1, translateY(24→0)", gpu: "will-change while pending", reduced: "observer off; ships visible" },
        { variant: "AthleteX", trigger: "same observer", duration: "460ms", easing: "athletex-land", from_to: "opacity 0→1, translateY(32→0), scale(.985→1)", gpu: "same", reduced: "observer off; ships visible" },
      ]}
      hint={`import { Reveal } from "@/lib/motion/Reveal";

<Reveal kind="section">          {/* CORE */}
  <YourSection />
</Reveal>

<Reveal kind="section" variant="athletex">
  <YourSection />
</Reveal>
// One-shot: unobserved after first entry.`}
    />
  );
}

/* ---------------- 3. nav ---------------- */

function NavBlock() {
  return (
    <Block
      title="3 · Nav"
      demo={
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Underline slide + mobile sheet already spec'd in <em>States & motion</em>. New: scroll-elevate.
          </p>
          <div className="rounded-md border border-border">
            <div className="flex h-14 items-center gap-6 border-b border-border bg-background/90 px-4 shadow-sm backdrop-blur-sm text-sm">
              <span className="font-serif">Morgan Oxford</span>
              <span className="text-muted-foreground">Schools</span>
              <span className="text-muted-foreground">Programmes</span>
            </div>
            <p className="p-3 text-[11px] text-muted-foreground">Header at scrollY &gt; 8px — shadow-sm + backdrop-blur.</p>
          </div>
        </div>
      }
      rows={[
        { variant: "Underline (CORE)", trigger: "hover on nav link", duration: "200ms", easing: "standard", from_to: "scaleX 0 → 1, origin left", gpu: "transform only", reduced: "underline hidden; no motion" },
        { variant: "Underline (AthleteX)", trigger: "hover", duration: "200ms", easing: "athletex-land", from_to: "scaleX 0 → 1 + 1px letter-spacing", gpu: "transform only", reduced: "underline hidden" },
        { variant: "Scroll-elevate", trigger: "scrollY > 8px", duration: "200ms", easing: "standard", from_to: "shadow-none → shadow-sm + backdrop-blur", gpu: "no transform", reduced: "0ms transition; instant" },
        { variant: "Mobile sheet", trigger: "trigger tap", duration: "320ms", easing: "standard / emphasized", from_to: "translateX 100% → 0", gpu: "transform only", reduced: "opacity flip, no slide" },
      ]}
      hint={`// Scroll-elevate:
const [elev, setElev] = useState(false);
useEffect(() => {
  const on = () => setElev(window.scrollY > 8);
  on(); window.addEventListener("scroll", on, { passive: true });
  return () => window.removeEventListener("scroll", on);
}, []);
<header className={cn("transition-shadow duration-200",
  elev && "shadow-sm backdrop-blur-sm")} />`}
    />
  );
}

/* ---------------- 4. buttons ---------------- */

function ButtonBlock() {
  return (
    <Block
      title="4 · Button interactions"
      demo={
        <div className="flex flex-wrap items-center gap-4">
          <button className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform duration-[80ms] active:translate-y-px">
            CORE press
          </button>
          <div className="zone-athletex">
            <button className="h-10 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_6px_0_-2px_var(--brand-jet)] transition-all duration-[90ms] hover:-translate-y-px active:translate-y-0.5 active:shadow-[0_2px_0_-1px_var(--brand-jet)]">
              AthleteX press
            </button>
          </div>
        </div>
      }
      rows={[
        { variant: "CORE press", trigger: ":active", duration: "80ms", easing: "exit", from_to: "translateY 0 → 1px", gpu: "transform only", reduced: "colour flip only" },
        { variant: "AthleteX press", trigger: ":active", duration: "90ms", easing: "athletex-land", from_to: "translateY -1 → 2px + shadow collapse", gpu: "transform + box-shadow", reduced: "colour flip only" },
      ]}
      hint={`/* CORE */
.btn { transition: transform 80ms var(--ease-exit); }
.btn:active { transform: translateY(1px); }

/* AthleteX */
.btn-x {
  box-shadow: 0 6px 0 -2px var(--brand-jet);
  transition: transform 90ms var(--ease-athletex-land),
              box-shadow 90ms var(--ease-athletex-land);
}
.btn-x:hover  { transform: translateY(-1px); }
.btn-x:active { transform: translateY(2px);
                box-shadow: 0 2px 0 -1px var(--brand-jet); }`}
    />
  );
}

/* ---------------- 5. section transitions ---------------- */

function SectionTransitionBlock() {
  const [nonce, setNonce] = useState(0);
  return (
    <Block
      title="5 · Section transitions"
      demo={
        <div className="space-y-3">
          <button onClick={() => setNonce((n) => n + 1)} className="text-xs font-semibold uppercase tracking-widest text-primary underline">
            Replay ↻
          </button>
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal key={`s-c-${nonce}`} kind="section" className="section-wipe rounded-md border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">CORE</p>
              <p className="mt-2 font-serif text-lg">L→R wipe, 480ms, +120ms delay.</p>
            </Reveal>
            <div className="zone-athletex">
              <Reveal key={`s-a-${nonce}`} kind="section" variant="athletex" className="section-wipe rounded-md border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-primary">ATHLETEX</p>
                <p className="mt-2 font-serif text-lg text-foreground">R→L wipe, 380ms, no delay.</p>
              </Reveal>
            </div>
          </div>
        </div>
      }
      rows={[
        { variant: "CORE wipe", trigger: "section enters viewport", duration: "480ms", easing: "standard", from_to: "scaleX 0 → 1, origin left, +120ms delay", gpu: "transform on ::before", reduced: "full-width, no wipe" },
        { variant: "AthleteX wipe", trigger: "same", duration: "380ms", easing: "athletex-land", from_to: "scaleX 0 → 1, origin right, no delay", gpu: "transform on ::before", reduced: "full-width, no wipe" },
      ]}
      hint={`<Reveal kind="section" className="section-wipe">
  <YourSection />
</Reveal>
/* .section-wipe adds a 4px --primary top-border that scales in when the
   section reveals. AthleteX variant flips origin and drops the delay. */`}
    />
  );
}

/* ---------------- 6. handoff ---------------- */

function HandoffBlock() {
  const [zone, setZone] = useState<"core" | "athletex">("core");
  return (
    <Block
      title="6 · CORE ↔ AthleteX handoff"
      demo={
        <div className="space-y-3">
          <div className="flex gap-2">
            <button onClick={() => setZone("core")} className="h-9 rounded-md border border-border px-3 text-xs">→ CORE</button>
            <button onClick={() => setZone("athletex")} className="h-9 rounded-md border border-border px-3 text-xs">→ AthleteX</button>
          </div>
          <div
            key={zone}
            data-zone={zone}
            className={`${zone === "athletex" ? "zone-athletex" : ""} rounded-md border border-border bg-background p-6 text-foreground`}
          >
            <p className="text-xs uppercase tracking-widest text-primary">
              {zone === "athletex" ? "AthleteX" : "CORE"}
            </p>
            <p className="mt-2 font-serif text-lg">Zone: {zone}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Wrapper animates on data-zone change (theme swap is instant, only the fade is animated).
            </p>
          </div>
        </div>
      }
      rows={[
        { variant: "CORE → AthleteX", trigger: "navigation start", duration: "480ms (200 out + 320 in)", easing: "exit → athletex-land", from_to: "opacity 1→0 → 0→1 + accent bar scaleX", gpu: "opacity + transform", reduced: "instant theme swap" },
        { variant: "AthleteX → CORE", trigger: "navigation start", duration: "520ms crossfade", easing: "standard", from_to: "opacity fade, no accent bar", gpu: "opacity only", reduced: "instant theme swap" },
      ]}
      hint={`// In __root.tsx wrapper:
<div
  data-zone={isAthleteX ? "athletex" : "core"}
  className={isAthleteX ? "zone-athletex ..." : "..."}
>
  <Outlet />
</div>
/* CSS runs the zone-fade-in keyframe whenever data-zone changes.
   Accent-bar variant is a follow-up wire-up. */`}
    />
  );
}
