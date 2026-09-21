import { type ReactNode } from "react";

/**
 * Functional Spec — filtering, enquiries + CRM, AthleteX, downloads.
 * Documentation block rendered inside /brand.
 */

type Row = { label: string; value: ReactNode };

export function FunctionalSpec() {
  return (
    <div className="space-y-16">
      <Intro />
      <FeatureFiltering />
      <FeatureEnquiries />
      <FeatureAthleteX />
      <FeatureDownloads />
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

function Chip({ tone = "core", children }: { tone?: "core" | "planned" | "athletex"; children: ReactNode }) {
  const cls =
    tone === "planned"
      ? "border-primary/40 bg-primary/10 text-primary"
      : tone === "athletex"
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

function DefList({ rows }: { rows: Row[] }) {
  return (
    <dl className="divide-y divide-border rounded-md border border-border">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-2 px-4 py-3 md:grid-cols-[180px_1fr] md:items-baseline">
          <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{r.label}</dt>
          <dd className="text-sm text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm text-foreground marker:text-muted-foreground">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

function Feature({
  status,
  title,
  story,
  criteria,
  data,
  api,
  edge,
  security,
}: {
  status: { tone: "core" | "planned" | "athletex"; label: string }[];
  title: string;
  story: string;
  criteria: ReactNode[];
  data: Row[];
  api: ReactNode[];
  edge: ReactNode[];
  security: ReactNode[];
}) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {status.map((s) => (
          <Chip key={s.label} tone={s.tone}>
            {s.label}
          </Chip>
        ))}
      </div>
      <SubTitle>{title}</SubTitle>
      <p className="text-sm italic text-muted-foreground">{story}</p>

      <div>
        <Sub>Acceptance criteria</Sub>
        <Bullets items={criteria} />
      </div>

      <div>
        <Sub>Data stored</Sub>
        <DefList rows={data} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Sub>Endpoints / API</Sub>
          <Bullets items={api} />
        </div>
        <div>
          <Sub>Edge & error cases</Sub>
          <Bullets items={edge} />
        </div>
      </div>

      <div>
        <Sub>Security & performance</Sub>
        <Bullets items={security} />
      </div>
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">{children}</code>;
}

/* ---------------- intro ---------------- */

function Intro() {
  return (
    <section className="space-y-3">
      <SubTitle>Functional spec</SubTitle>
      <p className="text-sm text-muted-foreground">
        Four features that carry the site's core value: helping families find schools, capturing
        enquiries into the Morgan Oxford CRM, running the AthleteX scholarship pipeline, and
        gating downloadable resources. Items marked <Chip tone="core">Live</Chip> are already
        shipped; <Chip tone="planned">Planned</Chip> items are specified here and implemented
        in a later pass.
      </p>
    </section>
  );
}

/* ---------------- 1. filtering ---------------- */

function FeatureFiltering() {
  return (
    <Feature
      status={[{ tone: "core", label: "Live · v1" }, { tone: "planned", label: "DB-backed v2" }]}
      title="1 · School & programme filtering"
      story="As a parent, I filter schools and programmes so I only see options that fit my child's age, budget, and interests."
      criteria={[
        <>Filters visible on <Code>/schools</Code> and <Code>/programmes</Code> index pages.</>,
        <>State stored in URL query (<Code>?age=13&type=boarding&region=south</Code>) so links are shareable and back-button safe.</>,
        <>Empty-result state offers <em>"Enquire and we'll shortlist for you"</em> → <Code>/enquire/contact</Code>.</>,
        <>Comparison view (<Code>/schools/compare?a=&b=&c=</Code>) accepts up to 3 school slugs.</>,
        <>Loader-driven filtering so results are SSR'd and indexable.</>,
      ]}
      data={[
        {
          label: "v1 source",
          value: (
            <>
              Static content in <Code>src/content/schools/*.json</Code> and{" "}
              <Code>src/content/programmes/*.json</Code>. No DB writes.
            </>
          ),
        },
        {
          label: "v2 source (planned)",
          value: (
            <>
              <Code>public.schools</Code> and <Code>public.programmes</Code> tables with narrow
              <Code>TO anon</Code> SELECT policies for public reads.
            </>
          ),
        },
        {
          label: "Schools filters",
          value: "type · gender · age_min/max · region · annual_fee_band · sport_specialism (AthleteX toggle)",
        },
        {
          label: "Programmes filters",
          value: "category (boarding · day · sixth-form · summer · guardianship) · duration · start_term",
        },
      ]}
      api={[
        <>v1: TanStack loader + <Code>createServerFn(&#123;method:"GET"&#125;)</Code> reads static content, applies filter predicate server-side.</>,
        <>v2: <Code>getSchools(&#123; filters &#125;)</Code> server fn using a publishable-key Supabase client with safe-column projection.</>,
        <>Search params validated with <Code>zodValidator</Code> + <Code>fallback()</Code> so bad URLs coerce to defaults.</>,
        <><Code>loaderDeps</Code> declares only cache-relevant fields to prevent thrash on unrelated params.</>,
      ]}
      edge={[
        "Invalid query param → coerce to default, do not 400.",
        <>Zero results → CTA to placement enquiry + "clear filters" link.</>,
        <>Route defines both <Code>errorComponent</Code> and <Code>notFoundComponent</Code>.</>,
        <>Comparison with &gt;3 slugs → keep first 3, drop rest silently.</>,
      ]}
      security={[
        "No PII involved on either surface.",
        "Debounce URL updates on multi-select controls (150 ms) to avoid loader thrash.",
        "SSR the filtered list for SEO; hydrate for subsequent client-side filter changes.",
        <>v2: only <Code>TO anon</Code> SELECT policies on public columns; never expose internal notes or private school contacts.</>,
      ]}
    />
  );
}

/* ---------------- 2. enquiries + CRM ---------------- */

function FeatureEnquiries() {
  return (
    <Feature
      status={[
        { tone: "core", label: "Live · Supabase capture" },
        { tone: "planned", label: "CRM push" },
        { tone: "planned", label: "Booking" },
      ]}
      title="2 · General enquiry & booking → Morgan Oxford CRM"
      story="As a visitor, I submit an enquiry and optionally book a consultation; the team gets it in their CRM within seconds."
      criteria={[
        <>Forms: General (<Code>/enquire</Code>), School placement (<Code>/enquire/school-placement</Code>), Contact (<Code>/enquire/contact</Code>).</>,
        <>Client + server validation via shared Zod schemas in <Code>src/lib/enquiries/schemas.ts</Code>.</>,
        <>On success: 303 redirect to <Code>/enquiry/thanks?ref=XXXXXXXX</Code> with human-readable reference.</>,
        <>Reply-SLA copy shown on confirmation ("within 2 working days").</>,
        <>Booking (planned): Calendly / Cal.com link from confirmation page, not embedded in v1.</>,
      ]}
      data={[
        {
          label: "Table",
          value: <Code>public.enquiries</Code>,
        },
        {
          label: "Columns",
          value: "id · kind · ref · email · payload (jsonb) · ip_hash · user_agent · status · created_at",
        },
        {
          label: "RLS",
          value: <>INSERT allowed for <Code>anon</Code>/<Code>authenticated</Code> with length checks; UPDATE, DELETE, SELECT denied. Reads happen server-side via <Code>supabaseAdmin</Code>.</>,
        },
        {
          label: "Retention",
          value: "12 months for new leads; archived to cold storage after conversion or close.",
        },
      ]}
      api={[
        <>Current: <Code>POST /api/enquiries</Code> (TanStack server route). Accepts JSON or <Code>multipart/form-data</Code>.</>,
        <>Handles honeypot (<Code>company_website</Code>), timing gate (&lt;1500 ms rejected silently), Zod validation, insert via <Code>supabaseAdmin</Code>.</>,
        <>Planned CRM push: <Code>pushToCRM(input, ref)</Code> after insert. Connector-agnostic — HubSpot / Pipedrive / Zoho CRM / Salesforce all available via Lovable gateway.</>,
        <>Gateway call pattern: <Code>Authorization: Bearer LOVABLE_API_KEY</Code> + <Code>X-Connection-Api-Key: &lt;CONNECTOR&gt;_API_KEY</Code>. Never call provider APIs directly.</>,
        <>Planned notification: Resend connector → transactional email to <Code>ops@morganoxford</Code> with payload + CRM record link.</>,
      ]}
      edge={[
        <>CRM push failure must NOT fail the user request — insert to Supabase first, then attempt CRM with retry (backoff, up to 3×) and mark <Code>status='crm_failed'</Code> on final failure.</>,
        <>Rate limit per IP hash: 5 submissions / 10 min, enforced by count query on <Code>enquiries</Code> keyed by <Code>ip_hash</Code>.</>,
        <>Field errors: JSON returns <Code>&#123;ok:false, errors&#125;</Code> (422); form redirects back to referer with <Code>?errors=field1,field2</Code>.</>,
        <>Duplicate submissions: dedupe by (<Code>email</Code> + <Code>kind</Code> + payload hash) within 60 s → return existing <Code>ref</Code>.</>,
        <>Storage insert failure → 500 JSON or redirect to thanks with <Code>?error=1</Code> flag.</>,
      ]}
      security={[
        "Honeypot + timing gate already live.",
        "Zod max lengths on every field; regex on names, phones, emails.",
        <><Code>ip_hash</Code> = <Code>sha256(ip + SUPABASE_PROJECT_ID)</Code> truncated to 32 chars — no raw IP retained.</>,
        <><Code>user_agent</Code> truncated to 500 chars.</>,
        <>CRM secrets read from <Code>process.env</Code> inside the handler, never at module scope.</>,
        <>Logs contain only <Code>ref</Code> and <Code>status</Code> — never payload or email.</>,
        <><Code>supabaseAdmin</Code> loaded via dynamic <Code>await import()</Code> inside the handler to avoid client leak.</>,
      ]}
    />
  );
}

/* ---------------- 3. AthleteX ---------------- */

function FeatureAthleteX() {
  return (
    <div className="rounded-lg border border-brand-signal/30 bg-brand-signal/5 p-6">
      <Feature
        status={[
          { tone: "athletex", label: "AthleteX zone" },
          { tone: "core", label: "Live capture" },
          { tone: "planned", label: "Scholarship pipeline" },
        ]}
        title="3 · AthleteX scout & Enquiry"
        story="As an athlete, parent, or scout, I submit performance detail and a highlight link to trigger scholarship / scout review."
        criteria={[
          <>Route: <Code>/athletex/scholarship</Code> uses <Code>AthleteXScholarshipForm</Code>.</>,
          <>Age gate 13–24 enforced by Zod <Code>date_of_birth</Code> refinement.</>,
          <>Highlight URL restricted to YouTube, Vimeo, Hudl, Instagram (regex in schema).</>,
          <>Scout applicants (<Code>applicant_type='Scout / Agency'</Code>) must include <Code>scout_context ≥ 20 chars</Code>.</>,
          <>Confirmation: shared <Code>/enquiry/thanks</Code> with <Code>kind=athletex</Code> messaging.</>,
        ]}
        data={[
          {
            label: "Table",
            value: <>Same <Code>public.enquiries</Code>, discriminated by <Code>kind='athletex'</Code>.</>,
          },
          {
            label: "Payload fields",
            value: "applicant_type · phone · country · date_of_birth · sport · position_or_discipline · current_level · current_club_or_school · key_stats · highlight_url · target_destination · available_from · scout_context",
          },
          {
            label: "Planned",
            value: <><Code>public.athletex_reviews</Code> — <Code>enquiry_id</Code> FK, <Code>reviewer_id</Code>, <Code>verdict</Code>, <Code>notes</Code>. Internal only, no anon policy.</>,
          },
        ]}
        api={[
          <>Same <Code>POST /api/enquiries</Code> route — Zod discriminated union routes to the AthleteX branch.</>,
          <>Planned CRM: separate pipeline / board ("AthleteX Scholarship"). E.g. HubSpot pipeline ID via <Code>HUBSPOT_ATHLETEX_PIPELINE_ID</Code> secret (added via <Code>add_secret</Code> when connector picked).</>,
          <>Planned scout notification: on <Code>applicant_type='Scout / Agency'</Code>, priority email to <Code>scouts@athletex</Code>.</>,
        ]}
        edge={[
          "Under-13 / over-24 DOB → field-level error, form stays open.",
          "Non-whitelisted highlight domain → field-level error suggesting supported hosts.",
          "Missing scout_context for scouts → superRefine field error.",
          "Broken highlight URL later → CRM record still valid; ops flags manually.",
          "Unreachable video host at review time → do not block submission; reviewer handles offline.",
        ]}
        security={[
          "DOB stored in payload jsonb (not indexed) — not a special-category health data field.",
          "Highlight URL is user-supplied; never render as an embed in admin views without a sandboxed iframe.",
          "Same honeypot / timing / rate-limit protections as general enquiries.",
          <>Form ships lazy; hero above the fold uses <Code>HeroReveal variant="athletex"</Code> with reduced-motion fallback.</>,
          "Scout submissions carry higher trust weight — flag in CRM for manual verification before contact release.",
        ]}
      />
    </div>
  );
}

/* ---------------- 4. downloads ---------------- */

function FeatureDownloads() {
  return (
    <Feature
      status={[{ tone: "planned", label: "Planned · not built" }]}
      title="4 · Resource downloads"
      story="As a parent or athlete, I download a prospectus, brochure, or checklist; Morgan Oxford captures a soft lead."
      criteria={[
        <>Resource cards on <Code>/insights/*</Code> and programme pages expose a "Download PDF" CTA.</>,
        <>Ungated mode: direct signed URL for low-value assets (checklists, one-pagers).</>,
        <>Gated mode: modal collects name + email + consent, then redirects to signed URL and creates a <Code>resource_download</Code> record.</>,
        <>Confirmation email with the same signed link (valid 7 days) via Resend connector.</>,
      ]}
      data={[
        {
          label: "public.resources",
          value: "id · slug · title · kind (prospectus|guide|checklist) · zone (core|athletex) · storage_path · gated · size_bytes · updated_at. SELECT granted to anon.",
        },
        {
          label: "public.resource_downloads",
          value: "id · resource_id (FK) · email · name · consent · ref · ip_hash · user_agent · created_at. INSERT to anon; no SELECT to anon.",
        },
        {
          label: "Storage bucket",
          value: <>Private <Code>resources/</Code> — files never publicly listed; access strictly via signed URL.</>,
        },
      ]}
      api={[
        <><Code>POST /api/resources/request</Code> (server route). Validates Zod (name, email, resource_slug, consent, honeypot, started_at).</>,
        <>Inserts <Code>resource_downloads</Code> row, mints signed URL via <Code>supabaseAdmin.storage.from('resources').createSignedUrl(path, 60*60*24*7)</Code>.</>,
        <>Returns <Code>&#123;url, ref&#125;</Code> (JSON) or 303 to <Code>/downloads/ready?ref=…</Code>.</>,
        <>Ungated: same route, <Code>gated=false</Code> short-circuits (no lead capture, still rate-limited).</>,
        <>CRM: low-priority "content download" lead into same CRM connector.</>,
      ]}
      edge={[
        <>Resource not found → 404 JSON / redirect to <Code>/insights</Code>.</>,
        "Storage sign failure → 503 with generic message; queue for retry.",
        "Duplicate downloads by same email within 60 s → return existing signed URL, do not create new record.",
        "Signed URL expired → user re-requests via same form (email pre-fill from query if present).",
      ]}
      security={[
        "Never expose bucket path — only signed URLs.",
        "Signed URL TTL = 7 days.",
        "Consent stored per download (GDPR audit trail).",
        "Same honeypot + timing gate as enquiries.",
        "Rate limit: 3 requests per IP hash per 5 min.",
        <>No <Code>SELECT</Code> on <Code>resource_downloads</Code> from client — admin-only reads.</>,
        "Files served from Supabase Storage CDN; CTA prefetches metadata on hover.",
      ]}
    />
  );
}
