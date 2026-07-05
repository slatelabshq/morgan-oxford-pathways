# Morgan Oxford — Navigation & Site Structure

## 1. Top-Level Information Architecture

```text
morganoxford.com (CORE — royal blue)
├── /                         Home (dual gateway: CORE / AthleteX)
├── /about                    Story, team, ethos, results
├── /schools                  School directory (search + filter)
│   ├── /schools/[slug]       School profile
│   └── /schools/compare      Side-by-side compare (up to 3)
├── /programmes               Programme index (search + filter)
│   ├── /programmes/day-school
│   ├── /programmes/boarding
│   ├── /programmes/sixth-form
│   ├── /programmes/summer
│   └── /programmes/guardianship
├── /process                  How placement works (5-step)
├── /insights                 Articles / guides / case studies
│   └── /insights/[slug]
├── /athletex  ⇢ pathway root (black / red — visually distinct)
│   ├── /athletex/about
│   ├── /athletex/scholarship         Scholarship & scouting programme
│   ├── /athletex/sports              Sport index
│   │   └── /athletex/sports/[sport]  Football, rugby, tennis, athletics…
│   ├── /athletex/schools             Sports-specialist school subset
│   ├── /athletex/success             Athlete case studies
│   └── /athletex/scouts              For scouts / clubs (B2B)
├── /enquire                  General enquiry (hub)
│   ├── /enquire/school-placement
│   └── /enquire/contact
├── /brand                    Internal design system
└── /legal/{privacy,terms,cookies,safeguarding}
```

**Reasoning.** CORE is the parent brand and default surface; AthleteX is a first-class pathway under `/athletex/*`, not a separate domain. A shared root keeps SEO authority, cross-linking, and one CRM pipeline while allowing full visual + editorial divergence at the pathway boundary.

---

## 2. Primary Navigation (persistent header)

| Slot | Label | Target | Why |
|---|---|---|---|
| 1 | Schools | `/schools` | Highest-intent browse surface |
| 2 | Programmes | `/programmes` | Secondary browse axis (type of study) |
| 3 | Process | `/process` | Reassurance for first-time parents |
| 4 | Insights | `/insights` | SEO + trust |
| 5 | About | `/about` | Standard trust link |
| 6 | **AthleteX** | `/athletex` | Pathway pivot — styled as pill/badge in AthleteX red on CORE, and in CORE royal on AthleteX (see §6) |
| CTA | Enquire | `/enquire` | Persistent primary CTA, right-aligned |

- Mobile: same order in a full-screen sheet; AthleteX pill sits above the CTA.
- No mega-menu on CORE by default — Schools and Programmes open lightweight two-column flyouts (categories + "Browse all").

**Reasoning.** Six items + CTA is the ceiling for scannability. AthleteX earns a slot (not a dropdown item) because it's a distinct audience and revenue line; burying it kills discovery.

---

## 3. AthleteX Primary Navigation (when inside `/athletex/*`)

| Slot | Label | Target |
|---|---|---|
| 1 | Sports | `/athletex/sports` |
| 2 | Schools | `/athletex/schools` |
| 3 | Scholarship | `/athletex/scholarship` |
| 4 | Success Stories | `/athletex/success` |
| 5 | For Scouts | `/athletex/scouts` |
| 6 | **← Morgan Oxford** | `/` | Return pill, CORE royal |
| CTA | Apply | `/athletex/scholarship#apply` |

**Reasoning.** Users inside AthleteX get an AthleteX-native nav (their vocabulary: Sports, Scholarship, Scouts). The CORE return link is always the sixth slot in mirrored position — predictable pivot.

---

## 4. Secondary Navigation

**CORE — none globally.** Contextual sub-nav appears only on:
- `/schools/*` — filter rail (see §7)
- `/programmes/*` — tabbed sub-nav across the 5 programme types
- `/process` — sticky step index (1–5)

**AthleteX — sport sub-nav** on `/athletex/sports/*`: horizontal scroll of sports chips (Football, Rugby, Tennis, Athletics, Cricket, Hockey, Swimming, Other).

**Reasoning.** Global secondary nav dilutes the primary and adds cognitive load. Contextual sub-nav is only added where the page genuinely has siblings.

---

## 5. Footer (shared, CORE-styled with AthleteX column)

Four columns + utility row.

| Explore | Schools | AthleteX | Company |
|---|---|---|---|
| Home | Browse all schools | AthleteX home | About |
| Process | Day school | Sports | Insights |
| Programmes | Boarding | Scholarship | Careers |
| Insights | Sixth Form | Success stories | Press |
| Enquire | Summer | For scouts | Contact |
|  | Guardianship |  |  |

**Utility row:** logo lockup · office (Oxford, UK) · © year · Privacy · Terms · Cookies · Safeguarding · LinkedIn · Instagram.

**Reasoning.** The AthleteX column in the shared footer reinforces that it's part of the group, and gives AthleteX permanent link equity from every CORE page.

---

## 6. CORE ↔ AthleteX Transitions

Three deliberate pivots — no accidental crossings.

1. **Header pathway pill.** Always visible top-right of the primary nav. Colour inverts by context (AthleteX red on CORE, CORE royal on AthleteX). Icon + label.
2. **Home dual gateway.** The `/` hero has two equally weighted entry cards: "Find a school" (CORE) and "Athlete pathway" (AthleteX). Sets the choice on first visit.
3. **Contextual bridges.**
   - School profiles with sport specialism show a "Sports scholarships at this school → AthleteX" callout.
   - AthleteX school subset links each card back to its full `/schools/[slug]` profile.
   - `/athletex/scholarship` success page links to `/enquire/school-placement` for non-athlete siblings.

**Visual signalling.** Crossing the boundary triggers a full theme swap (background, primary, type-scale accents) with a 200 ms crossfade — no ambiguity about which brand you're in.

**Reasoning.** One universal nav can't serve two distinct audiences (parents seeking a school vs athletes/scouts). Explicit pivots + theme swap make the boundary a feature, not a bug.

---

## 7. Search & Filter — Schools and Programmes

### `/schools` — School directory

**Search bar (top):** free-text over name, town, county, keywords. Debounced, server-driven.

**Filter rail (left on desktop, sheet on mobile):**

| Filter | Type | Notes |
|---|---|---|
| Type | multi-select | Day, Boarding, Day+Boarding, Sixth Form only |
| Gender | segmented | Co-ed / Boys / Girls |
| Age range | dual slider | 3–18 |
| Region | multi-select | UK regions + "Overseas" |
| Fees (annual) | dual slider | £ bands |
| Curriculum | multi-select | A-Level, IB, GCSE, iGCSE, BTEC |
| Specialisms | chips | Arts, STEM, Sport, Music, SEND |
| AthleteX partner | toggle | Cross-links to sports-specialist subset |

**Sort:** Relevance · Fees ↑ · Fees ↓ · A–Z · Recently updated.
**URL state:** all filters are query params (`/schools?type=boarding&region=south-east`) so results are shareable and SSR-indexable.
**Empty state:** "No schools match — relax a filter" with one-click chip removal.

### `/programmes` — Programme index

Lighter surface: tabs across the 5 programme types, plus a single "Which is right for me?" quiz link. No heavy filters — programmes are a small set.

### `/athletex/schools` — Sports-specialist subset

Reuses the schools filter component but pre-scopes `AthleteX partner = true` and swaps the Specialisms filter for a **Sport** multi-select. AthleteX theme.

**Reasoning.** One filter component, two mounts. Query-param state is essential for SEO (each filter combo is a landing page candidate) and shareability.

---

## 8. Breadcrumbs

Enabled on all pages ≥ 2 levels deep. Not on `/`, primary section indexes, or forms.

Examples:
- `Home / Schools / Eton College`
- `Home / Programmes / Boarding`
- `Home / AthleteX / Sports / Football`
- `Home / AthleteX / Schools / Millfield`

JSON-LD `BreadcrumbList` on every breadcrumb-bearing page.

**Reasoning.** School and sport profiles are deep and reached from search — breadcrumbs are the primary "where am I / back up" affordance and a documented SEO win.

---

## 9. Utility & Global Elements

- **Skip link** to `#main` on every page.
- **Announcement bar** (optional, dismissible) above header — used for AthleteX intake windows or open days.
- **Persistent Enquire CTA** in header (both themes).
- **Cookie banner** — bottom-left, non-blocking.
- **404** — themed to current pathway; offers "Back to Schools" + "Back to AthleteX".

---

## 10. Route Additions Required

New route files (all under `src/routes/`, TanStack file-based):

```
about.tsx
schools.tsx  schools.index.tsx  schools.$slug.tsx  schools.compare.tsx
programmes.tsx  programmes.index.tsx
programmes.day-school.tsx  programmes.boarding.tsx  programmes.sixth-form.tsx
programmes.summer.tsx  programmes.guardianship.tsx
process.tsx
insights.tsx  insights.index.tsx  insights.$slug.tsx
athletex.tsx  athletex.index.tsx  athletex.about.tsx
athletex.sports.tsx  athletex.sports.index.tsx  athletex.sports.$sport.tsx
athletex.schools.tsx  athletex.success.tsx  athletex.scouts.tsx
legal.privacy.tsx  legal.terms.tsx  legal.cookies.tsx  legal.safeguarding.tsx
```

Existing routes kept: `/`, `/brand`, `/enquire`, `/enquire/school-placement`, `/athletex/scholarship`, `/enquiry/thanks`.

Shared components to add: `SiteHeader` (theme-aware), `SiteFooter`, `PathwayPill`, `Breadcrumbs`, `SchoolsFilterRail`, `SchoolsSearchBar`, `SportChips`.

---

## 11. Out of Scope (this pass)

Content for each new page, school/programme data model + CMS, search backend (Postgres FTS vs Meili), real breadcrumb data sources — plan those separately once IA is approved.
