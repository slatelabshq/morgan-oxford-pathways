import { createFileRoute } from "@tanstack/react-router";
import { MorganOxfordLogo } from "@/brand/MorganOxfordLogo";
import { AthleteXLogo } from "@/brand/AthleteXLogo";
import { StatesAndMotion } from "@/brand/StatesAndMotion";
import { AnimationSpec } from "@/brand/AnimationSpec";
import { ResponsiveSpec } from "@/brand/ResponsiveSpec";
import { FunctionalSpec } from "@/brand/FunctionalSpec";
import { TechSpec } from "@/brand/TechSpec";
import { AccessibilitySpec } from "@/brand/AccessibilitySpec";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: "Brand System — Morgan Oxford Education" },
      {
        name: "description",
        content:
          "Internal brand reference for Morgan Oxford Education and AthleteX Pathways: logos, palette, typography and zone system.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Brand System — Morgan Oxford Education" },
      {
        property: "og:description",
        content: "Logos, palette and typography for Morgan Oxford Education and AthleteX Pathways.",
      },
    ],
  }),
  component: BrandPage,
});

const coreSwatches = [
  { name: "Royal Blue", token: "--brand-royal", hex: "#0B2A5B", cls: "bg-brand-royal", ink: "light" },
  { name: "Ink",        token: "--brand-ink",   hex: "#0A1733", cls: "bg-brand-ink",   ink: "light" },
  { name: "Paper",      token: "--brand-paper", hex: "#FBFAF6", cls: "bg-brand-paper", ink: "dark", border: true },
  { name: "Gold",       token: "--brand-gold",  hex: "#C9A24A", cls: "bg-brand-gold",  ink: "dark" },
  { name: "Slate",      token: "--brand-slate", hex: "#5B6B85", cls: "bg-brand-slate", ink: "light" },
] as const;

const athleteSwatches = [
  { name: "Jet",       token: "--brand-jet",      hex: "#0A0A0A", cls: "bg-brand-jet",      ink: "light" },
  { name: "Bone",      token: "--brand-bone",     hex: "#F4F4F2", cls: "bg-brand-bone",     ink: "dark", border: true },
  { name: "Signal Red",token: "--brand-signal",   hex: "#D7263D", cls: "bg-brand-signal",   ink: "light" },
  { name: "Metallic",  token: "--brand-metallic", hex: "#C0C5CC", cls: "bg-brand-metallic", ink: "dark" },
] as const;

function BrandPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Internal reference
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight md:text-5xl">
            Brand System
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            One design system, two zones. <strong className="text-foreground">Morgan Oxford Education</strong>{" "}
            is the reassuring, parent-facing core. <strong className="text-foreground">AthleteX Pathways</strong>{" "}
            is the bolder athlete-facing extension that inherits the same tokens.
          </p>
        </div>
      </header>

      {/* CORE LOGOS */}
      <Section eyebrow="Core" title="Morgan Oxford Education — Logo Suite">
        <div className="grid gap-6 md:grid-cols-2">
          <LogoCard label="Horizontal · on paper" bg="bg-brand-paper" fg="text-brand-ink">
            <MorganOxfordLogo variant="horizontal" className="h-16 w-auto" showTagline />
          </LogoCard>
          <LogoCard label="Horizontal · on ink" bg="bg-brand-ink" fg="text-brand-paper">
            <MorganOxfordLogo variant="horizontal" className="h-16 w-auto" showTagline />
          </LogoCard>
          <LogoCard label="Stacked · on paper" bg="bg-brand-paper" fg="text-brand-royal">
            <MorganOxfordLogo variant="stacked" className="h-40 w-auto" showTagline />
          </LogoCard>
          <LogoCard label="Stacked · on royal" bg="bg-brand-royal" fg="text-brand-paper">
            <MorganOxfordLogo variant="stacked" className="h-40 w-auto" showTagline />
          </LogoCard>
          <LogoCard label="Monogram · gold on ink" bg="bg-brand-ink" fg="text-brand-gold">
            <MorganOxfordLogo variant="mark" className="h-28 w-28" />
          </LogoCard>
          <LogoCard label="Crest · ink on paper" bg="bg-brand-paper" fg="text-brand-ink">
            <MorganOxfordLogo variant="crest" className="h-40 w-auto" />
          </LogoCard>
        </div>
      </Section>

      {/* ATHLETEX */}
      <div className="zone-athletex bg-background text-foreground">
        <Section
          eyebrow="Extension"
          title="AthleteX Pathways"
          ribbon="PROPOSAL — pending Seph sign-off"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <LogoCard label="Horizontal · signal on jet" bg="bg-brand-jet" fg="text-brand-bone">
              <AthleteXLogo variant="horizontal" className="h-16 w-auto" showEndorsement />
            </LogoCard>
            <LogoCard label="Horizontal · jet on bone" bg="bg-brand-bone" fg="text-brand-jet">
              <AthleteXLogo variant="horizontal" className="h-16 w-auto" showEndorsement accentColor="var(--brand-signal)" />
            </LogoCard>
            <LogoCard label="Stacked · on jet" bg="bg-brand-jet" fg="text-brand-bone">
              <AthleteXLogo variant="stacked" className="h-40 w-auto" showEndorsement />
            </LogoCard>
            <LogoCard label="Mark · signal + bone" bg="bg-brand-jet" fg="text-brand-bone">
              <AthleteXLogo variant="mark" className="h-28 w-28" />
            </LogoCard>
          </div>
        </Section>
      </div>

      {/* PALETTE */}
      <Section eyebrow="Palette" title="Colour tokens">
        <SubHeading>Core</SubHeading>
        <SwatchGrid swatches={coreSwatches} />
        <SubHeading className="mt-10">AthleteX</SubHeading>
        <SwatchGrid swatches={athleteSwatches} />
      </Section>

      {/* TYPOGRAPHY */}
      <Section eyebrow="Typography" title="Fraunces × Inter">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Display · Fraunces
            </p>
            <p className="mt-3 font-serif text-6xl font-medium tracking-tight leading-none">
              Aa
            </p>
            <p className="mt-4 font-serif text-2xl leading-tight">
              Guiding young minds to world-class schools.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Text · Inter
            </p>
            <p className="mt-3 font-sans text-6xl font-semibold tracking-tight leading-none">
              Aa
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
              A steady, humanist sans for interface, forms and long-form content —
              paired with Fraunces for editorial moments and headlines.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4 border-t border-border pt-8">
          <TypeRow label="Display / 6xl">Where scholarship meets ambition</TypeRow>
          <TypeRow label="H1 / 4xl">Preparing students for the world's leading schools</TypeRow>
          <TypeRow label="H2 / 2xl">Guidance built around the family</TypeRow>
          <TypeRow label="Body / base" mono={false}>
            Morgan Oxford Education partners with families to place students aged 8–18 into
            the UK's most respected boarding and day schools.
          </TypeRow>
          <TypeRow label="Caption / xs">EST · OXFORD · UNITED KINGDOM</TypeRow>
        </div>
      </Section>

      {/* ZONE PREVIEW */}
      <Section eyebrow="Zones" title="Same system, two registers">
        <div className="grid gap-6 md:grid-cols-2">
          <ZoneHero
            eyebrow="Morgan Oxford Education"
            title="Guiding Young Minds to World-Class Schools"
            body="Structured, reassuring guidance for parents and students navigating admissions to the UK's leading schools."
            cta="Book a consultation"
          />
          <div className="zone-athletex">
            <ZoneHero
              eyebrow="AthleteX Pathways"
              title="Where Talent Meets Opportunity"
              body="Scholarship pathways and scouting introductions for student-athletes 12–22 targeting elite programmes."
              cta="Start your pathway"
            />
          </div>
        </div>
      </Section>


      <Section eyebrow="Interaction" title="States & motion">
        <StatesAndMotion />
      </Section>

      <Section eyebrow="Motion" title="Animations">
        <AnimationSpec />
      </Section>

      <Section eyebrow="Adaptation" title="Responsive breakpoints">
        <ResponsiveSpec />
      </Section>

      <Section eyebrow="Functional" title="Features">
        <FunctionalSpec />
      </Section>

      <Section eyebrow="Technical" title="Performance, SEO & standards">
        <TechSpec />
      </Section>


      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Morgan Oxford Education · Brand v0.1
        </div>
      </footer>
    </main>
  );
}

/* ---------- Building blocks ---------- */

function Section({
  eyebrow,
  title,
  ribbon,
  children,
}: {
  eyebrow: string;
  title: string;
  ribbon?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight md:text-4xl">
              {title}
            </h2>
          </div>
          {ribbon && (
            <span className="inline-flex items-center rounded-sm border border-primary/60 bg-primary/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              {ribbon}
            </span>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground ${className}`}>
      {children}
    </h3>
  );
}

function LogoCard({
  label,
  bg,
  fg,
  children,
}: {
  label: string;
  bg: string;
  fg: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className={`flex h-56 items-center justify-center ${bg} ${fg} p-8`}>{children}</div>
      <div className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function SwatchGrid({
  swatches,
}: {
  swatches: ReadonlyArray<{ name: string; token: string; hex: string; cls: string; ink: string; border?: boolean }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {swatches.map((s) => (
        <div key={s.token} className="overflow-hidden rounded-md border border-border">
          <div
            className={`${s.cls} h-28 ${s.border ? "border-b border-border" : ""}`}
            aria-hidden
          />
          <div className="bg-card px-3 py-3">
            <p className="font-serif text-sm">{s.name}</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">{s.hex}</p>
            <p className="font-mono text-[11px] text-muted-foreground">{s.token}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypeRow({
  label,
  children,
  mono = false,
}: {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[160px_1fr] md:items-baseline">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className={mono ? "font-mono" : "font-serif text-xl leading-snug"}>{children}</p>
    </div>
  );
}

function ZoneHero({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-md border border-border bg-background p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        <h3 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight">
          {title}
        </h3>
        <p className="mt-4 text-sm text-muted-foreground">{body}</p>
      </div>
      <button
        type="button"
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:opacity-90"
      >
        {cta}
      </button>
    </div>
  );
}
