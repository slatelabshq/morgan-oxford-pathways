import { useState, type ReactNode } from "react";

/**
 * States & Microinteractions spec, rendered inside /brand.
 * Six components × (demo strip + state table + implementation hint).
 * AthleteX motion variants flagged inline.
 */

type Row = {
  state: string;
  visual: string;
  duration: string;
  easing: string;
  a11y: string;
  athletex?: string;
};

export function StatesAndMotion() {
  return (
    <div className="space-y-16">
      <GlobalRules />
      <MotionTokens />
      <NavSpec />
      <ButtonSpec />
      <CardSpec />
      <FieldSpec />
      <DropdownSpec />
      <ModalSpec />
    </div>
  );
}

/* ---------------- shared building blocks ---------------- */

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-2xl font-medium tracking-tight">{children}</h3>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
      {children}
    </h4>
  );
}

function StateTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-3 py-2">State</th>
            <th className="px-3 py-2">Visual</th>
            <th className="px-3 py-2">Duration</th>
            <th className="px-3 py-2">Easing</th>
            <th className="px-3 py-2">Keyboard / ARIA</th>
            <th className="px-3 py-2">AthleteX delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.state} className="border-t border-border align-top">
              <td className="px-3 py-2 font-semibold">{r.state}</td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r.visual}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.duration}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.easing}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.a11y}</td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{r.athletex ?? "—"}</td>
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
        Implementation hint
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
        <Sub>States</Sub>
        <StateTable rows={rows} />
      </div>
      <Hint>{hint}</Hint>
    </section>
  );
}

/* ---------------- global rules + tokens ---------------- */

function GlobalRules() {
  const rules = [
    "Animate transform + opacity only — never width / height / top / left.",
    "All motion inside @media (prefers-reduced-motion: no-preference).",
    "Focus rings use :focus-visible (keyboard only), 2px --ring + 2px offset.",
    "Success + error announced via role='status' / role='alert' — never colour alone.",
    "Tap targets ≥ 44 × 44 on mobile.",
    "Loading state preserves layout — fixed min-width on buttons that swap label for spinner.",
  ];
  return (
    <section className="space-y-3">
      <SubTitle>Global rules</SubTitle>
      <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        {rules.map((r) => (
          <li key={r} className="flex gap-2">
            <span aria-hidden className="mt-1 text-primary">•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MotionTokens() {
  const tokens = [
    { name: "--motion-fast", value: "120ms", use: "hover, focus ring" },
    { name: "--motion-base", value: "200ms", use: "default component transitions" },
    { name: "--motion-slow", value: "320ms", use: "modal enter, page transitions" },
    { name: "--ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)", use: "CORE default" },
    { name: "--ease-emphasized", value: "cubic-bezier(0.3, 0, 0, 1)", use: "AthleteX bolder" },
    { name: "--ease-exit", value: "cubic-bezier(0.4, 0, 1, 1)", use: "exit / press-out" },
  ];
  return (
    <section className="space-y-3">
      <SubTitle>Motion tokens</SubTitle>
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
      <p className="text-xs text-muted-foreground">
        AthleteX uses the same durations as CORE (never slower) but swaps ease-standard → ease-emphasized, and adds a 1–2 px translate on hover for tactile weight.
      </p>
    </section>
  );
}

/* ---------------- 1. NAVIGATION ---------------- */

function NavSpec() {
  return (
    <Block
      title="1 · Navigation"
      demo={<NavDemo />}
      rows={[
        { state: "Default", visual: "text-foreground/80", duration: "—", easing: "—", a11y: "role='link'" },
        { state: "Hover", visual: "underline scaleX 0 → 1, origin left", duration: "200ms", easing: "standard", a11y: "pointer only", athletex: "signal-red underline + 1px letter-spacing" },
        { state: "Focus-visible", visual: "ring-2 ring-ring ring-offset-2 rounded-sm", duration: "120ms", easing: "standard", a11y: "keyboard only" },
        { state: "Active (current)", visual: "font-semibold + persistent underline", duration: "—", easing: "—", a11y: "data-status='active' aria-current='page'" },
        { state: "Mobile sheet open", visual: "slide-in-right", duration: "320ms", easing: "standard", a11y: "focus trap; Esc closes; scroll lock", athletex: "same duration, emphasized easing" },
      ]}
      hint={`after:content-[''] after:absolute after:left-0 after:bottom-0
after:h-0.5 after:w-full after:origin-left after:scale-x-0
after:bg-primary after:transition-transform after:duration-200
hover:after:scale-x-100`}
    />
  );
}

function NavDemo() {
  return (
    <nav aria-label="Nav demo" className="flex flex-wrap items-center gap-6 text-sm">
      {(
        [
          { label: "Default", cls: "text-foreground/80" },
          { label: "Hover", cls: "text-foreground [&_span]:scale-x-100" },
          { label: "Focus", cls: "text-foreground ring-2 ring-ring ring-offset-2 rounded-sm px-1" },
          { label: "Active", cls: "text-foreground font-semibold [&_span]:scale-x-100 [&_span]:bg-foreground" },
        ] as const
      ).map((s) => (
        <a key={s.label} href="#" className={`relative pb-1 transition-colors ${s.cls}`}>
          {s.label}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-200"
          />
        </a>
      ))}
    </nav>
  );
}

/* ---------------- 2. BUTTONS ---------------- */

function ButtonSpec() {
  return (
    <Block
      title="2 · Buttons"
      demo={<ButtonDemo />}
      rows={[
        { state: "Default", visual: "bg-primary text-primary-foreground", duration: "—", easing: "—", a11y: "—" },
        { state: "Hover", visual: "bg-primary/90", duration: "120ms", easing: "standard", a11y: "pointer only", athletex: "+ translateY(-1px), chunky shadow" },
        { state: "Focus-visible", visual: "ring-2 ring-ring ring-offset-2", duration: "120ms", easing: "standard", a11y: ":focus-visible only" },
        { state: "Active", visual: "translateY(1px)", duration: "80ms", easing: "exit", a11y: "—", athletex: "translateY(2px), shadow collapses" },
        { state: "Disabled", visual: "opacity-50 cursor-not-allowed", duration: "—", easing: "—", a11y: "aria-disabled='true'; kept in tab order" },
        { state: "Loading", visual: "spinner inline; label held", duration: "—", easing: "—", a11y: "aria-busy='true'; min-width preserved" },
        { state: "Success", visual: "check icon fade+scale 1.2s then revert", duration: "240ms", easing: "emphasized", a11y: "role='status' aria-live='polite'" },
        { state: "Error", visual: "shake 1× ±6px + destructive ring", duration: "160ms", easing: "exit", a11y: "role='alert'; focus first invalid field" },
      ]}
      hint={`<button
  aria-busy={loading || undefined}
  disabled={loading}
  className="inline-flex min-w-[9ch] items-center justify-center gap-2
             rounded-md bg-primary px-4 py-2 text-sm font-semibold
             text-primary-foreground transition-colors duration-[120ms]
             hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring
             focus-visible:ring-offset-2 active:translate-y-px
             disabled:opacity-50 disabled:cursor-not-allowed">
  {loading ? <Loader2 className="animate-spin size-4" /> : label}
</button>`}
    />
  );
}

function ButtonDemo() {
  const base =
    "inline-flex min-w-[9ch] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-[120ms]";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button className={base}>Default</button>
      <button className={`${base} bg-primary/90`}>Hover</button>
      <button className={`${base} ring-2 ring-ring ring-offset-2`}>Focus</button>
      <button className={`${base} translate-y-px`}>Active</button>
      <button disabled className={`${base} opacity-50`}>Disabled</button>
      <button aria-busy className={base}>
        <span className="mr-2 inline-block size-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
        Loading
      </button>
      <ErrorButton />
      <div className="zone-athletex">
        <button
          className="inline-flex min-w-[9ch] items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_4px_0_-1px_var(--brand-jet)] transition-all duration-[120ms] hover:-translate-y-px hover:shadow-[0_6px_0_-2px_var(--brand-jet)] active:translate-y-0.5 active:shadow-[0_2px_0_-1px_var(--brand-jet)]"
        >
          AthleteX
        </button>
      </div>
    </div>
  );
}

function ErrorButton() {
  const [shake, setShake] = useState(false);
  return (
    <button
      onClick={() => {
        setShake(true);
        setTimeout(() => setShake(false), 200);
      }}
      className="inline-flex min-w-[9ch] items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground ring-2 ring-destructive ring-offset-2"
      style={shake ? { animation: "brand-shake 160ms cubic-bezier(0.4,0,1,1)" } : undefined}
    >
      Error (tap)
    </button>
  );
}

/* ---------------- 3. CARDS ---------------- */

function CardSpec() {
  return (
    <Block
      title="3 · Cards"
      demo={<CardDemo />}
      rows={[
        { state: "Default", visual: "border border-border shadow-none", duration: "—", easing: "—", a11y: "wrap in <a> or <Link> for whole-card click" },
        { state: "Hover", visual: "shadow-lg", duration: "200ms", easing: "standard", a11y: "pointer only", athletex: "border-signal + translateY(-2px)" },
        { state: "Focus-within", visual: "ring-2 ring-ring ring-offset-2", duration: "120ms", easing: "standard", a11y: "surfaces the wrapping link's focus" },
        { state: "Active", visual: "shadow-md (pressed)", duration: "80ms", easing: "exit", a11y: "—" },
        { state: "Disabled", visual: "opacity-60, pointer-events-none", duration: "—", easing: "—", a11y: "aria-disabled on trigger" },
      ]}
      hint={`<Link className="block rounded-2xl border border-border bg-card p-6
  transition-shadow duration-[200ms] ease-[cubic-bezier(0.2,0,0,1)]
  hover:shadow-lg focus-within:ring-2 focus-within:ring-ring
  focus-within:ring-offset-2">…</Link>`}
    />
  );
}

function CardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <a href="#" className="block rounded-2xl border border-border bg-background p-5 transition-shadow duration-[200ms] hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">CORE</p>
        <p className="mt-2 font-serif text-lg">Content card</p>
        <p className="mt-1 text-xs text-muted-foreground">Hover for shadow lift.</p>
      </a>
      <a href="#" className="block rounded-2xl border border-border bg-background p-5 shadow-lg">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Hover</p>
        <p className="mt-2 font-serif text-lg">Shadow-lg</p>
        <p className="mt-1 text-xs text-muted-foreground">200ms standard.</p>
      </a>
      <div className="zone-athletex">
        <a href="#" className="block rounded-2xl border border-border bg-card p-5 transition-all duration-[200ms] ease-[cubic-bezier(0.3,0,0,1)] hover:-translate-y-0.5 hover:border-primary hover:shadow-xl">
          <p className="text-xs uppercase tracking-widest text-primary">ATHLETEX</p>
          <p className="mt-2 font-serif text-lg">Physical lift</p>
          <p className="mt-1 text-xs text-muted-foreground">−2px translate + signal border.</p>
        </a>
      </div>
    </div>
  );
}

/* ---------------- 4. ENQUIRY FIELDS ---------------- */

function FieldSpec() {
  return (
    <Block
      title="4 · Enquiry form fields"
      demo={<FieldDemo />}
      rows={[
        { state: "Default", visual: "border border-input", duration: "—", easing: "—", a11y: "<label htmlFor> required" },
        { state: "Hover", visual: "border darkens 15%", duration: "120ms", easing: "standard", a11y: "pointer only" },
        { state: "Focus-visible", visual: "border-ring + ring-2 ring-ring/40", duration: "120ms", easing: "standard", a11y: ":focus-visible" },
        { state: "Filled", visual: "border-input; label may float", duration: "—", easing: "—", a11y: "—" },
        { state: "Disabled", visual: "bg-muted, opacity-60", duration: "—", easing: "—", a11y: "aria-disabled" },
        { state: "Error", visual: "border-destructive + helper text", duration: "160ms", easing: "exit", a11y: "aria-invalid='true' + aria-describedby → helper id" },
        { state: "Success", visual: "check icon in trailing slot", duration: "240ms", easing: "emphasized", a11y: "no colour flip on long forms" },
      ]}
      hint={`<label htmlFor="email">Email</label>
<input id="email" aria-invalid={!!error || undefined}
  aria-describedby={error ? "email-err" : undefined}
  className="h-10 rounded-md border border-input bg-background px-3
             transition-colors duration-[120ms]
             hover:border-foreground/60
             focus-visible:border-ring focus-visible:ring-2
             focus-visible:ring-ring/40
             aria-[invalid=true]:border-destructive" />
{error && <p id="email-err" role="alert" className="mt-1 text-xs
  text-destructive">{error}</p>}`}
    />
  );
}

function FieldDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-xs">
        <span className="mb-1 block text-muted-foreground">Default</span>
        <input placeholder="you@example.com" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm transition-colors duration-[120ms] hover:border-foreground/60 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40" />
      </label>
      <label className="block text-xs">
        <span className="mb-1 block text-muted-foreground">Focus</span>
        <input defaultValue="hello" className="h-10 w-full rounded-md border border-ring bg-background px-3 text-sm ring-2 ring-ring/40" />
      </label>
      <label className="block text-xs">
        <span className="mb-1 block text-muted-foreground">Disabled</span>
        <input disabled defaultValue="—" className="h-10 w-full rounded-md border border-input bg-muted px-3 text-sm opacity-60" />
      </label>
      <label className="block text-xs">
        <span className="mb-1 block text-destructive">Error</span>
        <input aria-invalid defaultValue="not-an-email" className="h-10 w-full rounded-md border border-destructive bg-background px-3 text-sm" />
        <span role="alert" className="mt-1 block text-[11px] text-destructive">
          Enter a valid email address (e.g. name@school.edu).
        </span>
      </label>
    </div>
  );
}

/* ---------------- 5. DROPDOWNS ---------------- */

function DropdownSpec() {
  return (
    <Block
      title="5 · Dropdowns"
      demo={<DropdownDemo />}
      rows={[
        { state: "Trigger default", visual: "same as button-secondary", duration: "—", easing: "—", a11y: "aria-expanded, aria-controls (Radix)" },
        { state: "Trigger hover / focus", visual: "border-foreground/60 + ring", duration: "120ms", easing: "standard", a11y: "—" },
        { state: "Menu enter", visual: "opacity 0→1 + scale 0.96→1, origin from trigger", duration: "160ms", easing: "emphasized", a11y: "focus moves to first item" },
        { state: "Menu exit", visual: "opacity 1→0 + scale 1→0.96", duration: "120ms", easing: "exit", a11y: "Esc closes, focus returns to trigger" },
        { state: "Item highlighted", visual: "bg-accent text-accent-foreground", duration: "—", easing: "—", a11y: "arrow keys move, typeahead, Enter selects" },
        { state: "Item disabled", visual: "opacity-50", duration: "—", easing: "—", a11y: "aria-disabled='true', skipped by arrows" },
      ]}
      hint={`// Radix animation classes shadcn ships with:
data-[state=open]:animate-in data-[state=open]:fade-in-0
data-[state=open]:zoom-in-95
data-[state=closed]:animate-out data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95`}
    />
  );
}

function DropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-56">
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm transition-colors hover:border-foreground/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span>Region</span>
        <span aria-hidden>▾</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 mt-1 origin-top overflow-hidden rounded-md border border-border bg-popover p-1 text-sm shadow-lg"
          style={{ animation: "brand-menu-in 160ms cubic-bezier(0.3,0,0,1)" }}
        >
          {["South East", "Midlands", "North", "Scotland"].map((r, i) => (
            <li
              key={r}
              role="option"
              aria-selected={i === 0}
              className={`cursor-pointer rounded px-2 py-1.5 ${i === 0 ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"}`}
            >
              {r}
            </li>
          ))}
        </ul>
      )}
      <style>{`@keyframes brand-menu-in { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

/* ---------------- 6. MODALS ---------------- */

function ModalSpec() {
  return (
    <Block
      title="6 · Modals"
      demo={<ModalDemo />}
      rows={[
        { state: "Overlay enter", visual: "opacity 0 → 1", duration: "200ms", easing: "standard", a11y: "click outside closes (if dismissible)" },
        { state: "Content enter", visual: "opacity 0 → 1 + scale 0.96 → 1", duration: "240ms", easing: "standard", a11y: "focus trap; first interactive gets focus", athletex: "same duration, emphasized easing" },
        { state: "Idle", visual: "shadow-2xl, backdrop", duration: "—", easing: "—", a11y: "role='dialog' aria-modal='true' aria-labelledby" },
        { state: "Close request", visual: "reverse fade + scale", duration: "160ms", easing: "exit", a11y: "Esc closes; focus returns to trigger" },
        { state: "Destructive confirm", visual: "primary → destructive button swap", duration: "—", easing: "—", a11y: "aria-describedby on confirm; require explicit action" },
      ]}
      hint={`// shadcn <Dialog> already handles focus trap, scroll lock,
// Esc, aria-modal, aria-labelledby.
// Only override content class for AthleteX easing:
<DialogContent className="data-[state=open]:animate-in
  data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
  data-[state=open]:duration-[240ms]
  data-[state=open]:ease-[cubic-bezier(0.3,0,0,1)]">`}
    />
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Open dialog
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <div
            className="absolute inset-0 bg-black/50"
            style={{ animation: "brand-fade-in 200ms cubic-bezier(0.2,0,0,1)" }}
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-[min(90vw,26rem)] rounded-lg border border-border bg-popover p-6 shadow-2xl"
            style={{ animation: "brand-modal-in 240ms cubic-bezier(0.2,0,0,1)" }}
          >
            <h5 id="demo-dialog-title" className="font-serif text-lg">
              Confirm enquiry
            </h5>
            <p className="mt-2 text-sm text-muted-foreground">
              This will send your details to the placement desk.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="h-9 rounded-md border border-input px-3 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="h-9 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground"
              >
                Send
              </button>
            </div>
          </div>
          <style>{`
            @keyframes brand-fade-in { from { opacity: 0 } to { opacity: 1 } }
            @keyframes brand-modal-in { from { opacity: 0; transform: scale(.96) } to { opacity: 1; transform: scale(1) } }
          `}</style>
        </div>
      )}
    </div>
  );
}
