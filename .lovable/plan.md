
# Enquiry Forms — Spec + Implementation

Four forms, one shared schema/validator layer, one shared submission pipeline. All submissions land in Lovable Cloud (the interim CRM) via a single server route that also works without JS.

## 1. Architecture

- **Storage (interim CRM)**: Lovable Cloud table `enquiries` — one table, discriminated by `kind` column (`general | school_placement | athletex | contact`). Payload-specific fields live in a `jsonb payload` column; indexed columns for `kind`, `email`, `created_at`, `status`.
- **Client**: `react-hook-form` + `zod` resolver for inline validation + accessible error wiring.
- **Server**: TanStack server route `POST /api/enquiries` (accepts both `application/json` and `multipart/form-data` → no-JS fallback). Re-validates with the same Zod schemas, inserts via server-side Supabase client (service role), returns `303` redirect to `/enquiry/thanks?kind=…` for form posts, `200 { ok:true, id }` for JSON.
- **No-JS fallback**: every form is a real `<form method="post" action="/api/enquiries" enctype="multipart/form-data">` with a hidden `kind` input and hidden `redirect` input. Progressive JS enhancement intercepts submit for inline errors; without JS the browser posts natively and the server responds with a 303 to the thanks page.
- **Shared UI**: `src/components/forms/Field.tsx` renders `<label htmlFor>`, control, `aria-describedby` linking to `#{id}-hint` + `#{id}-error`, `aria-invalid`, `aria-required`, and a `role="alert"` error node. Required marker is a visible `*` plus `<span class="sr-only"> required</span>`.
- **Honeypot + timing**: hidden `company_website` field (must stay empty) + `started_at` timestamp (reject <1500ms). No CAPTCHA in this pass.
- **Rate limit**: per-IP 5 submissions / 10 min in the route handler (in-memory map is fine for now; note in code as upgrade point).

## 2. Files touched / added

- `supabase/migrations/<ts>_enquiries.sql` — table + RLS + grants (INSERT to `anon`; SELECT restricted to `service_role` only).
- `src/lib/enquiries/schemas.ts` — Zod schemas + shared field types + error-copy map.
- `src/lib/enquiries/submit.ts` — client submit helper (JSON path).
- `src/routes/api/enquiries.ts` — server route (POST, handles JSON + FormData, honeypot, rate limit, insert, redirect).
- `src/components/forms/Field.tsx`, `Fieldset.tsx`, `FormStatus.tsx`, `Honeypot.tsx`.
- `src/components/forms/GeneralEnquiryForm.tsx`
- `src/components/forms/SchoolPlacementForm.tsx`
- `src/components/forms/AthleteXScholarshipForm.tsx` (zone-athletex)
- `src/components/forms/ContactForm.tsx`
- `src/routes/enquire.tsx` — hosts General + Contact (tabs).
- `src/routes/enquire.school-placement.tsx`
- `src/routes/athletex.scholarship.tsx` (zone-athletex, flagged PROPOSAL)
- `src/routes/enquiry.thanks.tsx` — success page (reads `?kind=` and `?ref=`).
- `src/routes/api/public/health.ts` — not needed here; skip.

No changes to `src/routes/index.tsx` or `/brand`.

## 3. Shared field types + validation primitives (Zod)

| Primitive | Rule | Error copy |
|---|---|---|
| `name` | trim, 2–80, letters/space/`'-` only | `"Enter the full name (2–80 characters, letters only)."` |
| `email` | trim, RFC email, ≤254 | `"That email doesn't look right — check for typos like ‘gmial’."` |
| `phone` | optional, E.164-ish `^\+?[0-9 ()-]{7,20}$` | `"Enter a phone number with country code, e.g. +44 7700 900123."` |
| `country` | 2-letter ISO from list | `"Choose a country from the list."` |
| `message` | trim, 20–2000 | too short: `"Tell us a bit more — at least 20 characters so we can help."` / too long: `"Keep it under 2000 characters; you can attach a document instead."` |
| `consent` | boolean === true | `"We need your permission to reply to this enquiry."` |
| `marketing_opt_in` | boolean, optional | — |
| `age` | int 4–24 (student age) | `"Student age must be between 4 and 24."` |
| `year_group` | enum `Reception … Year 13 / Sixth Form / Post-18` | `"Select the current year group."` |
| `start_term` | enum `Sep 2026 / Jan 2027 / Sep 2027 / Later / Unsure` | `"Choose when the student would start."` |
| `sport` | enum `Football / Basketball / Tennis / Swimming / Multi-sport / Other` | `"Pick the primary sport."` |
| `honeypot` | must be `""` | (no user-facing copy; server rejects silently 200-style) |

## 4. Form 1 — General enquiry (`kind: "general"`)

**Fields**

| Field | Type | Required | Notes |
|---|---|---|---|
| `full_name` | text | ✓ | primitive `name` |
| `email` | email | ✓ | primitive `email` |
| `phone` | tel | — | primitive `phone` |
| `role` | select: `Parent / Guardian`, `Student`, `School / Agent`, `Other` | ✓ | error: `"Tell us who's enquiring."` |
| `topic` | select: `Tutoring`, `School placement`, `AthleteX`, `Careers`, `Other` | ✓ | error: `"Choose what your enquiry is about."` |
| `message` | textarea | ✓ | primitive `message` |
| `consent` | checkbox | ✓ | label: `"I agree to be contacted about my enquiry."` |
| `marketing_opt_in` | checkbox | — | label: `"Send me occasional updates from Morgan Oxford Education."` |

**Success**: redirect `/enquiry/thanks?kind=general&ref=…` — H1 `"Thanks — we'll be in touch within 2 working days."` with reference code + secondary CTA `Back to home`.

## 5. Form 2 — School placement enquiry (`kind: "school_placement"`)

**Fields**

| Field | Type | Required | Notes |
|---|---|---|---|
| `parent_name` | text | ✓ | primitive `name` |
| `parent_email` | email | ✓ | |
| `parent_phone` | tel | ✓ (required here) | error: `"We need a phone number for placement calls."` |
| `country` | select ISO list | ✓ | |
| `student_first_name` | text | ✓ | 2–40 chars — `"Enter the student's first name."` |
| `student_age` | number | ✓ | primitive `age` |
| `current_year_group` | select | ✓ | primitive `year_group` |
| `target_start` | select | ✓ | primitive `start_term` |
| `school_preferences` | textarea | — | 0–500; hint: `"e.g. day vs boarding, single-sex, region."` |
| `academic_snapshot` | textarea | ✓ | 40–1500; error: `"Give us a short academic summary — grades, strengths, any support needs (at least 40 characters)."` |
| `budget_range` | select: `Under £25k`, `£25–40k`, `£40–60k`, `£60k+`, `Prefer to discuss` | ✓ | `"Pick a budget band so we can shortlist realistically."` |
| `documents` | file, multiple | — | accept `.pdf,.doc,.docx,.jpg,.png`; ≤10 MB each, ≤4 files; oversize: `"Each file must be under 10 MB."`; count: `"Attach up to 4 documents."`; type: `"We accept PDF, Word, JPG or PNG."` |
| `consent` | checkbox | ✓ | as above |

**Success**: `"Placement enquiry received — a consultant will call you within 1 working day."` + reference + `Add to calendar` link (mailto ICS in a later pass; stub for now).

## 6. Form 3 — AthleteX scholarship / scout enquiry (`kind: "athletex"`) ⚑ PROPOSAL

Rendered in `.zone-athletex`. Header ribbon: `PROPOSAL — pending sign-off`.

**Fields**

| Field | Type | Required | Notes |
|---|---|---|---|
| `applicant_type` | radio: `Athlete (18+)`, `Parent / Guardian`, `Coach / Club`, `Scout / Agency` | ✓ | `"Tell us who's applying."` |
| `full_name` | text | ✓ | |
| `email` | email | ✓ | |
| `phone` | tel | ✓ | |
| `country` | select | ✓ | |
| `date_of_birth` | date | ✓ | age must be 13–24; too young: `"AthleteX is for athletes aged 13–24."`; future: `"Date of birth can't be in the future."` |
| `sport` | select | ✓ | primitive `sport` |
| `position_or_discipline` | text | ✓ | 2–60; `"Enter position or discipline (e.g. left-back, 200m free)."` |
| `current_level` | select: `School`, `Club / Academy`, `Regional`, `National`, `International` | ✓ | `"Select the current competitive level."` |
| `current_club_or_school` | text | ✓ | 2–120 |
| `key_stats` | textarea | ✓ | 40–1500; `"Add key stats, PBs, achievements (at least 40 characters)."` |
| `highlight_url` | url | — | must be http(s), Hudl/YouTube/Vimeo/Instagram host; `"Paste a public video link (YouTube, Vimeo, Hudl or Instagram)."` |
| `target_destination` | select: `UK boarding school`, `US NCAA`, `UK university`, `Pro / semi-pro pathway`, `Unsure` | ✓ | `"Choose the pathway you're aiming at."` |
| `available_from` | select `start_term` values | ✓ | |
| `scout_context` | textarea | conditional-required when `applicant_type = Scout / Agency` | 20–1000; `"Scouts: tell us the athlete, event and what you're proposing."` |
| `consent` | checkbox | ✓ | AthleteX-worded: `"I agree AthleteX / Morgan Oxford Education can contact me about this application."` |

**Success**: `"Application logged — the AthleteX scouting desk will review within 3 working days."` + reference + secondary CTA `Explore CORE placements`.

## 7. Form 4 — Contact (`kind: "contact"`)

Short. Sits alongside address/phone block.

**Fields**

| Field | Type | Required | Notes |
|---|---|---|---|
| `full_name` | text | ✓ | |
| `email` | email | ✓ | |
| `subject` | text | ✓ | 3–120; `"Add a short subject (3–120 characters)."` |
| `message` | textarea | ✓ | primitive `message` |
| `consent` | checkbox | ✓ | |

**Success**: `"Message received — expect a reply within 2 working days."` + reference.

## 8. Accessibility rules (applied by shared `Field` component)

- Every control has a visible `<label htmlFor={id}>`. No placeholder-as-label.
- Required: visible `*` + `aria-required="true"` + screen-reader `" required"`.
- Errors: `aria-invalid="true"`, `aria-describedby="{id}-hint {id}-error"`, error node has `role="alert"` and appears immediately below the control.
- On submit failure: focus moves to the first invalid control; a top-of-form `<div role="alert" aria-live="polite">` announces `"N problems to fix — see highlighted fields."` with an unordered list of anchor links `<a href="#{id}">…</a>` to each error (native browser scroll + focus).
- Fieldsets use `<fieldset><legend>` (e.g. `Applicant`, `Student`, `Sport & level`).
- Focus ring: shared token from the brand system (`--ring`), never removed.
- Submit button has explicit `type="submit"`; disabled state includes `aria-busy="true"` and text swap to `Sending…`.
- All form elements sized ≥ 44×44 tap target.
- Colour is never the sole error signal — icon + text + border-weight change.

## 9. No-JS fallback

- Every form is a real `<form method="post" action="/api/enquiries" enctype="multipart/form-data">`.
- Hidden inputs: `<input type="hidden" name="kind" value="…">`, `<input type="hidden" name="redirect" value="/enquiry/thanks?kind=…">`.
- Server route parses `FormData`, runs the same Zod schema, and on error re-renders the form page with `?errors=…` (server route does a `303` back to the form path with error keys; the route component reads `useSearch()` and shows the same error copy). On success, `303` to the redirect target.
- Client JS enhancement wraps `onSubmit`, `preventDefault`s, submits JSON, and shows inline errors — but the HTML form remains valid without it.

## 10. Server route — validation + CRM insert

`src/routes/api/enquiries.ts`:

1. Content-type sniff → `request.json()` or `request.formData()` → normalized object.
2. Honeypot check + timing check → 200 no-op on trap.
3. Rate-limit by IP → 429 with `Retry-After`.
4. Discriminated Zod parse by `kind` → on error: JSON → 422 `{ errors: {field: message[]} }`; FormData → 303 back to referrer with `?errors=…`.
5. Insert into `enquiries` (service-role client, loaded inside handler): `{ kind, email, payload, ip_hash, user_agent, ref }` where `ref = crypto.randomUUID().slice(0, 8).toUpperCase()`.
6. On success: JSON → `{ ok:true, ref }`; FormData → `303` to `redirect` value with `&ref=…`.

## 11. Migration (Lovable Cloud)

```sql
create type public.enquiry_kind as enum ('general','school_placement','athletex','contact');

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind public.enquiry_kind not null,
  ref text not null unique,
  email citext not null,
  payload jsonb not null,
  ip_hash text,
  user_agent text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index on public.enquiries (kind, created_at desc);
create index on public.enquiries (email);

grant insert on public.enquiries to anon, authenticated;
grant all on public.enquiries to service_role;

alter table public.enquiries enable row level security;

-- No SELECT/UPDATE/DELETE policies → only service_role can read.
-- Public INSERT policy: allow anon inserts with basic shape guard.
create policy "public can submit enquiries"
on public.enquiries for insert
to anon, authenticated
with check (
  length(coalesce(ref,'')) between 6 and 12
  and length(email::text) between 5 and 254
);
```

Enable Lovable Cloud in the same pass (required before running the migration).

## 12. Out of scope (this pass)

- Email notifications to staff (needs Resend/Mailgun connector — separate pass).
- Real CRM export (HubSpot / Pipedrive / Zoho) — swap `submit.ts` insert for a connector call later; the `enquiries` table becomes the mirror.
- File antivirus scanning; documents are stored size/type-validated only.
- CAPTCHA / hCaptcha — deferred; honeypot + timing + rate-limit for now.
- Admin dashboard for reading enquiries.
