# MOE Copy Implementation Checklist

Based on `MOE_Copy_Implementation_Guide.md`. Tags: ✅ done · 🔄 in progress · ⬜ pending · ⏸ blocked (needs input)

---

## Phase 0 — Locked facts (sitewide)

| # | Task | Status |
|---|------|--------|
| 0.1 | 13 years / Est. 2013 (not 2011 or fifteen) | ✅ |
| 0.2 | Offices: Oxford + Lagos, Abuja, Port Harcourt (remove Cairo) | ✅ |
| 0.3 | "within 48 hours" everywhere (retire 48h / two working days) | ✅ |
| 0.4 | Nav "Programmes" not "Services" | ✅ |
| 0.5 | AthleteX: 6 sports — Football, Basketball, Table Tennis, Swimming, Volleyball, Athletics/Track | ✅ |
| 0.6 | Soccer → Football sitewide | ✅ |
| 0.7 | Club partnerships: schools hold deals, not Morgan Oxford | ✅ |

---

## Phase 1 — Template fix (broken H1s)

| # | Task | Status |
|---|------|--------|
| 1.1 | Fix `hero-images.ts` titleAccent producing garbled H1s | ✅ |
| 1.2 | Update page titles to match guide (Home, About, Schools, Insights, Process, Contact, AthleteX Schools) | ✅ |

---

## Phase 2 — Core pages (copy)

| # | Page | Status |
|---|------|--------|
| 2.1 | `/` Home — eyebrow, H1, meta, stats, CTA text | ✅ |
| 2.2 | `/programmes` — nav label, merge K-12+Boarding, rename listings, 5-step summary | ✅ |
| 2.3 | `/programmes/*` — 5 detail pages with full copy | ✅ |
| 2.4 | `/destinations` — split USA/Canada/Europe cards | ✅ |
| 2.5 | `/process` — H1, steps 3 & 5, post-steps line | ✅ |
| 2.6 | `/about` — full rewrite with 3 new sections + CTA | ✅ |
| 2.7 | `/insights` — fix H1 | ✅ |
| 2.8 | `/contact` — H1, 48h, remove form, Oxford + Lagos offices | ✅ |
| 2.9 | `/enquire` — remove duplicate Contact form | ✅ |
| 2.10 | `/enquire/contact` — dedicated parent form (Section 2) | ✅ |
| 2.11 | `/enquire/school-placement` — parent enquiry form from HTML prototype | ✅ |

---

## Phase 3 — Schools directory [DEV]

| # | Task | Status |
|---|------|--------|
| 3.1 | Shared partner-school dataset with `athletex_partner` flag | ✅ |
| 3.2 | `/schools` — region-grouped browser (UK, US, Canada, ROW) + direct partners + leading examples | ✅ |
| 3.3 | Full ~78-school directory remains on `/athletex/schools` only | ✅ |
| 3.4 | Fix H1 + meta description | ✅ |

---

## Phase 4 — AthleteX

| # | Task | Status |
|---|------|--------|
| 4.1 | `/athletex` — 6 pathway cards (add Volleyball, Athletics/Track) | ✅ |
| 4.2 | `/athletex/sports` — 6-sport list; retire rugby/cricket/hockey routes | ✅ |
| 4.3 | Build basketball + volleyball sport sub-pages | ✅ |
| 4.4 | `/athletex/schools` — H1, stats, 6 filters, club framing, note rewrites | ✅ |
| 4.5 | `/athletex/scholarship` — remove proposal banner, form field updates | ✅ |
| 4.6 | `/athletex/success` — intro copy | ✅ |
| 4.7 | `/athletex/scouts` — body copy + dedicated form | ✅ |

---

## Phase 5 — Legal pages

| # | Task | Status |
|---|------|--------|
| 5.1 | `/legal/privacy` — draft content, remove noindex | ✅ |
| 5.2 | `/legal/terms` — draft content, remove noindex | ✅ |
| 5.3 | `/legal/cookies` — draft content, remove noindex | ✅ |
| 5.4 | `/legal/safeguarding` — draft content (placeholder contact), remove noindex | ✅ |

---

## Phase 6 — Blocked / needs input

| # | Item | Status |
|---|------|--------|
| 6.1 | Abuja & Port Harcourt office addresses | ⏸ placeholder text on /contact |
| 6.2 | True total school count for meta | ⏸ using "partner schools" not "200+" |
| 6.3 | Safeguarding lead name + contact | ⏸ placeholder email on /legal/safeguarding |
| 6.4 | Tag schools for Table Tennis/Volleyball/Athletics | ⏸ filters exist; no schools tagged yet |
| 6.5 | Team bios/photos for About | ⏸ |
| 6.6 | Joseph review on net-new copy (programmes/summer, about, scouts) | ⏸ |

---

## Phase 7 — Post-launch SEO (deferred)

| # | Task | Status |
|---|------|--------|
| 7.1 | sitemap.xml | ⬜ |
| 7.2 | robots.txt | ⬜ |
| 7.3 | Organization schema | ⬜ |
| 7.4 | Canonical tags on /schools filter variants | ⬜ |

---

## Build status

✅ `bun run build` passes (verified)

## Recent UI fixes

| # | Task | Status |
|---|------|--------|
| UI.1 | AthleteX home — shorten “Why AthleteX exists” body | ✅ |
| UI.2 | Destinations hero — remove duplicate “your” | ✅ |
| UI.3 | Destinations Canada card — local Toronto image (`/public/destinations/canada.jpg`) | ✅ |
| UI.4 | AthleteX — remove Sports tab from nav | ✅ |
| UI.5 | AthleteX schools hero — remove duplicate white “your” | ✅ |
| UI.6 | AthleteX — remove Success Stories tab from nav | ✅ |
| UI.7 | AthleteX home hero accent — “Preparations.” (was “your athlete.”) | ✅ |
| UI.7 | Schools filters — stop scroll jump on search/checkbox (`resetScroll: false`) | ✅ |
| UI.8 | `/enquire/school-placement` — integrate `parent-enquiry-form.html` fields + copy | ✅ |
| UI.9 | Fix enquire routing — layout `Outlet` so `/enquire/school-placement` renders its own page | ✅ |
| UI.10 | Home “Why families choose us” CTA → `/enquire/contact` | ✅ |
| UI.11 | Point all `/enquire/school-placement` links to `/enquire/contact` | ✅ |
| UI.12 | Programmes / Destinations / Process heroes — accent keyword on same line as title | ✅ |
| UI.13 | AthleteX schools hero — “rest of Europe and beyond” (was “Europe”) | ✅ |
| UI.14 | `/enquire/contact` hero title → “Talk to Us” | ✅ |
| UI.15 | Fix hero images blank until hard refresh / remount (cached `onLoad` miss) | ✅ |
| UI.16 | `/contact` — remove Abuja and Port Harcourt office blocks | ✅ |
| UI.17 | Sixth Form pathways (A-Levels, IB, Canadian Diploma, AP, Foundations) with imagery on `/programmes/sixth-form` only | ✅ |
| UI.18 | `/schools` — replace full directory with region browser + direct partners + leading-school examples | ✅ |
| UI.18 | Guardianship copy — international scope, not UK-only | ✅ |
| UI.19 | Sixth Form — three condensed value-prop bullets | ✅ |
| UI.20 | Destinations — clickable region pages with narrative, costs & stories (MOE + Horizon) | ✅ |
| UI.21 | Events section — `/events` with hero, ribbon list, empty state (no dummy data) | ✅ |
| UI.22 | ICEF official badge (account 4923) in site footer | ✅ |
| UI.23 | Footer layout — brand + accreditation column, cleaner link grid | ✅ |
| UI.17 | AthleteX hero — replace first image with high-school student-athletes | ✅ |
| UI.18 | `/athletex/scholarship` → `/athletex/enquiry` (redirect from old URL) | ✅ |
| UI.19 | AthleteX header — use `/athletex_logo.png` | ✅ |
| UI.20 | AthleteX home pathway cards → `/athletex/enquiry` | ✅ |
| UI.21 | AthleteX — Tennis → Table Tennis sitewide | ✅ |
| UI.22 | AthleteX schools — remove “General placement enquiry”; polish single CTA | ✅ |
| UI.23 | AthleteX enquiry — Summer Programmes pathway + summer date options | ✅ |
