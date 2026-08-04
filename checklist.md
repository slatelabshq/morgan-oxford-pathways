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
| 0.5 | AthleteX: 6 sports — Football, Basketball, Tennis, Swimming, Volleyball, Athletics/Track | ✅ |
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
| 2.8 | `/contact` — H1, 48h, remove form, 4 office blocks | ✅ (Abuja/PH addresses placeholder) |
| 2.9 | `/enquire` — remove duplicate Contact form | ✅ |
| 2.10 | `/enquire/contact` — dedicated parent form (Section 2) | ✅ |

---

## Phase 3 — Schools directory [DEV]

| # | Task | Status |
|---|------|--------|
| 3.1 | Shared partner-school dataset with `athletex_partner` flag | ✅ |
| 3.2 | Wire `/schools` to dataset + AthleteX filter | ✅ |
| 3.3 | Fix H1 + meta description | ✅ |
| 3.4 | A–Z sort on regional lists | ✅ |

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
| 6.4 | Tag schools for Tennis/Volleyball/Athletics | ⏸ filters exist; no schools tagged yet |
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
