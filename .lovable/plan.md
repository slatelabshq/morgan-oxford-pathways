# Functional Spec — Filtering, Enquiries, AthleteX, Downloads

Add a documentation section to `/brand` (matching States / Animations / Responsive) that specs four features. This is a spec pass, not an implementation pass — no live CRM wiring or downloads table is created. The existing enquiries pipeline (Supabase `enquiries` table + `/api/enquiries` route) is documented as-is; new capabilities are marked "planned".

## Where it lives

- New file: `src/brand/FunctionalSpec.tsx` — one section with 4 feature blocks (user story, acceptance criteria, data, endpoints/API, edge/error, security/perf).
- Edit: `src/routes/brand.tsx` — render `<FunctionalSpec />` under `<ResponsiveSpec />`.

## Feature 1 — School & Programme filtering

**User story**: As a parent, I filter schools/programmes so I only see options that fit my child.

**Acceptance criteria**
- Filters visible on `/schools` and `/programmes` index; state stored in URL query (`?age=13&type=boarding&region=south`) so it's shareable and back-button safe.
- Empty result state offers "Enquire and we'll shortlist for you" → `/enquire/school-placement`.
- Comparison flow (`/schools/compare`) accepts up to 3 slugs via `?a=&b=&c=`.

**Filters**
- Schools: `type` (boarding/day/mixed), `gender` (co-ed/boys/girls), `age_min`/`age_max`, `region`, `annual_fee_band`, `sport_specialism` (AthleteX toggle).
- Programmes: `category` (boarding/day-school/sixth-form/summer/guardianship), `duration`, `start_term`.

**Data**
- Static content (MDX or `src/content/schools/*.json`) for v1 — no DB. Loader reads content, filters server-side, returns already-filtered list.
- Planned DB: `schools`, `programmes` tables with narrow `TO anon` SELECT policies for public reads.

**Endpoints / API**
- v1: no API — TanStack loader `createServerFn({method:"GET"})` reads static content, applies filter predicate.
- Planned: `getSchools({ filters })` server fn using publishable-key Supabase client (`TO anon` policy, safe-column projection).

**Edge / error**
- Invalid query param → coerce to default, log to console, don't 400.
- Zero results → CTA + "clear filters" link.
- Route defines `errorComponent` + `notFoundComponent`.

**Security / perf**
- No PII involved.
- Debounce URL updates on multi-select (150 ms) to avoid loader thrash.
- SSR the filtered list for SEO; hydrate for subsequent filter changes.

## Feature 2 — General enquiry & booking → Morgan Oxford CRM

**User story**: As a visitor, I submit an enquiry and optionally book a consultation; the team gets it in their CRM within seconds.

**Acceptance criteria**
- Forms: General (`/enquire`), School placement (`/enquire/school-placement`), Contact (`/enquire/contact`).
- All validate client + server (Zod, shared schemas in `src/lib/enquiries/schemas.ts`).
- On success: 303 redirect to `/enquiry/thanks?ref=XXXXXXXX` with human-readable reference.
- Reply-SLA copy shown on confirmation ("within 2 working days").
- Booking: link out to a Calendly/Cal.com URL from confirmation page (planned connector, not embedded in v1).

**Data stored** (existing `public.enquiries` table)
- `id`, `kind` ('general'|'school_placement'|'athletex'|'contact'), `ref`, `email`, `payload` (jsonb), `ip_hash` (sha256, truncated), `user_agent`, `status` ('new'), `created_at`.
- RLS: INSERT allowed for anon/authenticated with length checks; UPDATE/DELETE/SELECT denied. Reads happen server-side via `supabaseAdmin`.

**Endpoints / API**
- Current: `POST /api/enquiries` (TanStack server route). Accepts JSON or `multipart/form-data`. Handles honeypot (`company_website`), timing gate (<1500 ms rejected), Zod validation, insert via `supabaseAdmin`.
- Planned CRM push: on successful insert, `await` a `pushToCRM(input, ref)` helper. Selected connector determines transport:
  - **HubSpot** (contacts + deal) — connector available.
  - **Pipedrive** (person + deal) — connector available.
  - **Zoho CRM** (Leads module, `POST /Leads` via gateway) — connector available.
  - **Salesforce** (Lead object) — connector available.
  All go through the Lovable connector gateway: `Authorization: Bearer LOVABLE_API_KEY` + `X-Connection-Api-Key: <CONNECTOR>_API_KEY`. Never call provider APIs directly.
- Notification: transactional email via Resend connector to `ops@morganoxford` with the payload + CRM link once CRM chosen.

**Edge / error**
- CRM push failure MUST NOT fail the user request — insert to Supabase first, enqueue CRM push, retry with backoff up to 3× (log to `enquiries.status = 'crm_failed'`).
- Rate limit per IP hash: soft cap 5 submissions / 10 min at the route handler (in-memory not viable on Workers — use `enquiries` count query keyed by `ip_hash` in the last 10 min).
- Field-level errors: JSON responses return `{ok:false, errors: { field: [msg] }}` (422); form responses redirect back to referer with `?errors=field1,field2`.
- Duplicate submissions: dedupe by (`email` + `kind` + payload hash) within 60 s → return existing `ref`.

**Security / perf**
- Honeypot + timing gate already live.
- Zod max lengths on every field.
- `ip_hash` = sha256(ip + SUPABASE_PROJECT_ID) truncated to 32 chars — no raw IP retained.
- `user_agent` truncated to 500 chars.
- CRM secrets read from `process.env` inside handler, never module scope.
- No PII in logs; log only `ref` and `status`.

## Feature 3 — AthleteX scout / scholarship enquiry

**User story**: As an athlete/parent/scout, I submit performance detail and a highlight link to trigger scholarship/scout review.

**Acceptance criteria**
- Route: `/athletex/scholarship` (already exists) uses `AthleteXScholarshipForm`.
- Age gate: 13–24 enforced by Zod `date_of_birth` refinement.
- Highlight URL restricted to YouTube, Vimeo, Hudl, Instagram (existing regex).
- Scout applicants (`applicant_type = "Scout / Agency"`) must include `scout_context ≥ 20 chars` (existing superRefine).
- Confirmation: same `/enquiry/thanks` flow with `kind=athletex` messaging.

**Data stored**
- Same `public.enquiries` table, `kind='athletex'`. Payload includes: applicant_type, full_name, phone, country, date_of_birth, sport, position_or_discipline, current_level, current_club_or_school, key_stats, highlight_url, target_destination, available_from, scout_context.
- Planned: `athletex_reviews` table with `enquiry_id` FK, `reviewer_id`, `verdict`, `notes` — internal only, no anon policy.

**Endpoints / API**
- Same `POST /api/enquiries` route, discriminated union in Zod schema.
- Planned CRM: routed to a separate CRM pipeline/board ("AthleteX Scholarship") — e.g. HubSpot pipeline ID configured via `HUBSPOT_ATHLETEX_PIPELINE_ID` secret.
- Planned scout notification: on `applicant_type='Scout / Agency'`, additional email to `scouts@athletex` with priority flag.

**Edge / error**
- Under-13 / over-24 DOB → field-level error, form stays open.
- Non-whitelisted highlight domain → field-level error suggesting supported hosts.
- Missing scout_context for scouts → superRefine field error.
- Broken highlight URL later → CRM record still valid; ops flags manually.

**Security / perf**
- DOB stored in payload jsonb (not indexed) — not a special-category health data field.
- Highlight URL is user-supplied; never render as embed in admin views without sandboxed iframe.
- Same honeypot/timing/rate limit as general enquiries.
- Form ships lazy; hero above the fold uses `HeroReveal` (AthleteX variant) with reduced-motion fallback.

## Feature 4 — Resource downloads (planned)

**User story**: As a parent/athlete, I download a prospectus/brochure/checklist; Morgan Oxford captures a soft lead.

**Acceptance criteria**
- Resource cards on `/insights/*` and programme pages expose a "Download PDF" CTA.
- Two modes:
  - **Ungated** for low-value assets (checklists, one-pagers) — direct signed URL.
  - **Gated** for prospectus / school profiles — modal collects name + email + consent, then redirects to signed URL and creates a `resource_download` record.
- Confirmation email with the same signed link (valid 7 days) sent via Resend connector.

**Data stored** (planned tables)
- `public.resources`: `id`, `slug`, `title`, `kind` ('prospectus'|'guide'|'checklist'), `zone` ('core'|'athletex'), `storage_path`, `gated` bool, `size_bytes`, `updated_at`.
  - Grants: `SELECT` to anon; RLS policy `TO anon USING (true)` for listing.
- `public.resource_downloads`: `id`, `resource_id` FK, `email`, `name`, `consent`, `ref`, `ip_hash`, `user_agent`, `created_at`.
  - Grants: `INSERT` to anon; no SELECT to anon; server reads with admin client.
- Storage: private bucket `resources/` — files never publicly listed; access via signed URL only.

**Endpoints / API**
- `POST /api/resources/request` (server route) — validates Zod (name, email, resource_slug, consent, honeypot, started_at), inserts `resource_downloads`, mints signed URL via `supabaseAdmin.storage.from('resources').createSignedUrl(path, 60*60*24*7)`, returns `{url, ref}` (JSON) or 303 to a `/downloads/ready?ref=…` page.
- Ungated: same route with `gated=false` short-circuit that skips the record and returns URL directly (still rate-limited).
- CRM: pushed as a low-priority "content download" lead into the same CRM connector.

**Edge / error**
- Resource not found → 404 JSON / redirect to `/insights`.
- Storage sign failure → 503 with generic message; queue for retry.
- Duplicate downloads by same email within 60 s → return existing signed URL, do not create new record.
- Signed URL expired → user re-requests via the same form (email pre-fill from query if present).

**Security / perf**
- Never expose bucket path; only signed URLs.
- Signed URL TTL = 7 days.
- Consent stored per download (GDPR audit trail).
- Same honeypot + timing gate as enquiries.
- Rate limit: 3 requests per IP hash per 5 min.
- No `SELECT` on `resource_downloads` from client — admin-only.
- Files served from Supabase Storage CDN; pages preload the CTA-triggered fetch on hover.

## Notes

- CRM connector choice is deliberately left open in the spec; recommend HubSpot as default (best free tier + native contact + deal + pipeline model). Wire via `standard_connectors--connect` when the team picks one.
- No schema migrations, connector links, or route changes ship in this pass — spec only, rendered under `/brand`.
