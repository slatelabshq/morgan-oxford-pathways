**`SLATE LABS`**

`Software & Marketing Company  ·  Internal Recap`

**Morgan Oxford Education — Copy & Implementation Guide**

*Old copy → new copy, page by page, section by section — for Michael to implement*

| `COVERS` | Every page of Morgan Oxford Education's Schools site (morgan-oxford-pathways.vercel.app), including AthleteX. Builds directly on the prior audit and the 16 Jul executive summary. |
| :---- | :---- |
| **`FOR`** | Michael, for implementation. Joseph, for review of anything flagged \[NEEDS REVIEW\] or \[NEEDS INPUT\] before this goes live. |
| **`HOW TO READ IT`** | Each page has a table: OLD (what's live now) → NEW (what to replace it with). Pink \= old text being replaced. Green \= new text. “NO CHANGE” means leave that element exactly as is. |
| **`TAGS`** | \[DEV\] a build task, not a copy task  ·  \[DATA\] a data/content-ops task  ·  \[IMAGE\] a suggestion for David  ·  \[NEEDS REVIEW\] new copy Joseph hasn't seen yet  ·  \[NEEDS INPUT\] Michael/Joseph needs to supply a real fact I don't have |

# **1\. Locked Facts — Single Source of Truth**

Check here first if a number or name looks off anywhere else in this document or on the site. These are confirmed.

| `Fact` | `Confirmed value — use everywhere` |
| :---- | :---- |
| Years in business | 13 years. Founded 2013 (13 years before 2026). Retire “fifteen years” (About) and “Est. 2011” (Home eyebrow) — both imply 15 years, both wrong. |
| Office footprint | Oxford, UK  \+  Lagos, Abuja, Port Harcourt, Nigeria. Four offices. Cairo comes out sitewide — it was accurate for the old combined Schools+Universities business (confirmed via the old site's own About copy: “offices in Oxford, UK, Cairo, Egypt and Lagos, Nigeria”) but isn't part of the footprint agreed for the Schools-only site post-split. |
| Response-time promise | “within 48 hours” — use this exact phrase everywhere. Retire “48h” as a standalone label and “within two working days.” |
| Nav / section label | “Programmes” — everywhere, including the top nav (which currently says “Services”). “Services” retires. |
| AthleteX sports (locked) | Football, Basketball, Tennis, Swimming, Volleyball, Athletics/Track — six, exactly. “Soccer” becomes “Football” everywhere. Rugby, cricket and hockey come out. |
| Club-academy partnerships (PSG / Man Utd / Man City) | Per Joseph: Morgan Oxford's direct partnerships are with the SCHOOLS. Those schools separately hold their own arrangements with club academies for specialist programmes. Copy must never say or imply Morgan Oxford itself partners with PSG/Man Utd/Man City — only that a given partner school does. See Section 5, AthleteX Schools, for the exact rewrite pattern. |
| Schools directory | Confirmed oversight, not intentional. /schools and /athletex/schools should be the same underlying dataset (currently 78 schools), with the existing “AthleteX partner schools only” filter used to show/hide the athlete-specific ones. Right now /schools is wired to nothing and /athletex/schools has all the data — see Section 5\. |

*One thing worth flagging while we're locking facts: the Home page eyebrow currently reads “Est. 2011” right next to a stat that says “13 Years.” 2026 minus 2011 is 15 — so the homepage was quietly contradicting itself, in the same breath, before we even compare it to the About page. Fixed to “Est. 2013” below.*

# **2\. Contact & Enquiry Architecture — the Fix**

Before the page-by-page tables, one structural decision this rewrite depends on. Right now /contact, /enquire and /enquire/contact contain three overlapping forms, and the page every homepage CTA actually points to (/enquire/contact) renders the same generic content as the catch-all page. Here's the resolution used throughout this document:

### **/enquire/contact — the parent form (this is what every homepage CTA should lead to)**

Becomes its own dedicated, tailored form — this is the front door for the exact audience the whole site is written for. Fields:

* Parent / Guardian full name \*

* Email \*

* Phone, with country code (default \+234) \*

* Child's current school & year / grade

* What are you exploring? — Day school / Boarding / Sixth Form & Pathway / Summer or Winter Programme / Guardianship / AthleteX / Not sure yet 

* Target destination — UK / USA / Canada / Rest of Europe & Beyond / Not sure yet (include text box to type other options)

* Target start term — Sep 2026 / Jan 2027 / Sep 2027 / Later / Unsure

* Tell us about your child (free text, 20–2000 characters) \*

* I agree to be contacted about my enquiry. \*

* Send me occasional updates from Morgan Oxford Education. (optional)

* Button: “Send my enquiry”

### **/enquire — stays the general catch-all**

Keeps its existing “I'm a… / topic / how can we help” form largely as-is — it's for schools, agents, careers questions, and anyone who isn't a parent enquiring about their own child. Remove the second, duplicate “Contact us” form currently stacked underneath it on the same page — it adds nothing the first form doesn't already cover and just gives a visitor two forms to choose between.

### **/contact — office info \+ a way in, not a third form**

Keeps the office blocks and map. Replace its own standalone form with a single clear button through to /enquire/contact (parents) and a small secondary line for anyone who'd rather use /enquire (schools/agents/other). This removes the third overlapping form without losing anything — the two purpose-built forms already cover every case.

# **3\. Page-by-Page — Core Site**

## **/  (Home)**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **Eyebrow** | Oxford · Lagos · Cairo · Est. 2011 | Oxford · Lagos · Abuja · Port Harcourt · Est. 2013 |  |
| **H1** | Every child's next school should feel inevitable. | Your child’s dream school is now within reach | Directly speaks to the parent looking for the best opportunity for their child |
| **Subhead** | For 13 years, Morgan Oxford Education has guided families through the world of international school placement — matching students to the right school, in the right country, for the right reasons. | NO CHANGE | 13 is now confirmed correct. |
| **Meta description** | For 13 years, Morgan Oxford Education has guided families through international school placement — matching students to the right school, in the right country, for the right reasons. | For 13 years, Morgan Oxford Education has guided Nigerian and international families through school placement in the UK, USA, Canada and beyond — matching every child to the right school, for the right reasons. | Adds Nigeria-first \+ destination keywords for SEO. |
| **OG description** | Independent international school placement — Oxford, Lagos, Cairo. ICEF-accredited, 13 years of guiding families. | Independent international school placement, run from Oxford and across Nigeria. ICEF-accredited. 13 years of guiding families. |  |
| **Stat 3 (offices)** | 3 · Global offices · Oxford · Lagos · Cairo | 4 · Offices · Oxford, Lagos, Abuja & Port Harcourt |  |
| **Stat 4 (response)** | 48h · Response on every enquiry | 48h · We reply within 48 hours |  |
| **Hero CTA 1** | Start your enquiry | NO CHANGE | Destination becomes the new tailored /enquire/contact form. |
| **Hero CTA 2** | Explore AthleteX Pathways | NO CHANGE |  |
| **Parent card quote \+ CTA** | “I want the clearest, most trustworthy path to the right school for my child — without wading through it alone.” / See how placement works → | NO CHANGE |  |
| **“Why families choose us” body** | (two paragraphs, current copy) | NO CHANGE | Warm, clear, on-brand as written. |
| **CTA under that section** | Begin the conversation → | Talk to us about your child → | This is the stiff/formal CTA the exec summary flagged. |
| **Success stories intro** | Real students. Real placements. Real outcomes. | NO CHANGE | Exec summary explicitly said keep this line. |
| **Testimonial block** | (Day Waterman College alumna → Mount St Mary) | NO CHANGE |  |
| **Sixth Form & Pathway block** | (current copy) | NO CHANGE |  |
| **Closing CTA** | Start your own story → | NO CHANGE |  |

### **Dev / build notes for Michael**

* **`[DEV]`**  No build work needed on Home beyond wiring the two CTA destinations to the rebuilt /enquire/contact form (Section 2).

### **Image suggestions for David**

* **`[IMAGE]`**  The four current hero images (Oxford quad, generic campus shots) are fine but could be improved as a rotating stock set for now — lower priority than About and Destinations below. Longer-term, one real photo (team, an office, a genuine placement moment) here would do more for trust than any stock swap.

## **/programmes  (nav currently says “Services”)**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **Top nav label** | Services | Programmes | Sitewide — every page's nav. |
| **H1** | School placement, done properly. | NO CHANGE |  |
| **Subhead** | (current copy) | NO CHANGE |  |
| **Listing 1+2** | K-12 Placement  /  Boarding School Placement (two separate listings) | K-12 & Boarding School Placement (one merged listing) | Per exec summary. |
| **Listing 1+2 body** | (two separate paragraphs) | From primary transitions through to secondary and boarding, we help families find schools that match their child academically, culturally, and personally.  | Merges both old paragraphs into one. |
| **Listing 3** | Pathway College Placement | Pathway Placement | Per exec summary. |
| **Listing 3 body** | (current copy) | For students preparing for IGCSE, A-Levels, the IB Diploma, or an International Foundation Year, we connect families with pathway providers and sixth-form colleges that build the right foundation for what comes next. | Addresses the Nigeria-parent confusion flagged in the audit. |
| **Listing 4** | Summer & Winter Schools | Summer & Winter Programs | Exec summary's literal rename — flagging below that this may read as vague out of context. |
| **Listing 5** | Student Exchange Programmes | NO CHANGE |  |
| **5-step process summary** | … 3\. Introduction … 5\. Ongoing support (visas, guardianship, school visits) | … 3\. Application … 5\. Visa Support | Must move in lockstep with /process (below). |

## **/programmes/day-school, /boarding, /sixth-form, /summer, /guardianship**

*All five are currently “Programme detail coming soon.” Recommendation: keep these as five separate detail pages even though the overview card above merges K-12+Boarding into one listing — each still deserves its own URL for search (a parent searching “boarding school placement UK” wants a boarding-specific landing page, not a shared one). Full new copy below for each, all flagged for review since none of this existed before.*

### **/programmes/day-school**

**`NEW H1:` Day School Placement**

Whether your child is moving from a Nigerian primary or prep school into an international day school, or transferring mid-way through secondary education, we start with your child. We take the time to understand their strengths, interests and the kind of environment they'll thrive in, then match that against schools we know well.

* A shortlist matched to your child's academic and personal profile, not just exam results

* Direct introductions to admissions teams on your behalf

* Entrance exam and interview preparation through partner tutors

* Support through to enrolment and settling in

### **/programmes/boarding**

**`NEW H1:` Boarding School Placement**

Boarding is a bigger decision than day placement, and we treat it as one. We guide families through the UK's boarding system in particular — weighing pastoral care, house culture and academic rigour alongside each other, since the right boarding school is as much about how your child will be looked after as what they'll study.

* Guidance on full boarding vs. weekly/flexi boarding

* Introductions to housemasters/housemistresses, not just admissions offices

* Guardianship arrangements coordinated alongside placement

* Entrance exam and interview preparation through partner tutors

### **/programmes/sixth-form**

**`NEW H1:` Sixth Form & Pathway Placement**

For students weighing up A-Levels, the IB Diploma, an International Foundation Year, or a vocational route, we place students into sixth-form colleges and pathway providers chosen for their social, academic and pastoral strengths, not just their exam scores.

* Clear guidance on A-Levels vs. IB vs. Foundation Year vs. vocational routes

* Shortlisting based on progression record into your child's target destination

* Entrance exam and interview preparation through partner tutors

* Support from application through to enrolment

### **/programmes/summer**

**`NEW H1:` Summer & Winter Programs**

Short-term, high-impact. For families who want their child to experience an international academic environment — or simply build confidence and independence — before committing to a full placement, we arrange summer and winter programmes with trusted partner institutions abroad.

* Programmes from two weeks to a full term

* A low-commitment way to test a destination before a full placement decision

* Guardianship and travel logistics arranged alongside the programme

* **`[NEEDS REVIEW]`**  All net-new — hasn't been seen by Joseph before. Please confirm before this goes live.

### **/programmes/guardianship**

**`NEW H1:` Guardianship**

For students boarding or studying in the UK without family close by, we arrange guardianship with vetted, experienced guardians — covering half-term and exeat weekends, emergency contact, and the day-to-day support a school expects a guardian to provide.

* Vetted, experienced UK guardians

* Coordination with the school's own guardianship requirements

* Support during half-terms, exeats, and school holidays

* A single point of contact for the family back home

## **/destinations**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Where in the world is right for your child? | NO CHANGE |  |
| **Structure** | 4 cards: United Kingdom / North America (USA+Canada combined) / Europe / Beyond | 4 cards: United Kingdom / USA / Canada / Rest of Europe & Beyond | Per exec summary — USA and Canada become individual flagship destinations. |
| **USA card body** | (shared North America paragraph) | From day schools across the US to boarding options with strong pathway records into US universities.  | Split out of the old combined paragraph.INCLUDE US SCHOOLS under |
| **Canada card body** | (shared North America paragraph) | Canada's boarding and day schools are a strong option for families weighing academic rigour against a lower cost of living than the US or UK | Split out of the old combined paragraph. INCLUDE CA SCHOOLS under  |
| **Rest of Europe & Beyond card body** | (Europe and Beyond as two separate cards) | Placement options across Switzerland, Australia, Kenya and other destinations.  | Merges the old Europe \+ Beyond copy into one bucket. |

### **Image suggestions for David**

* **`[IMAGE]`**  USA card needs its own distinct hero (a recognisable US school/city image) rather than reusing the UK boarding-school photo currently pooled across all four cards.

* **`[IMAGE]`**  Canada card needs a genuinely Canadian image (e.g. a Toronto/Ontario school campus or skyline) — there's currently nothing Canada-specific in the image set at all.

## **/process**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | From first conversation to first day. | From first conversation to enrollment. | Locked headline per exec summary. |
| **Step 3 title** | Introduction | Application |  |
| **Step 3 body** | Once you've chosen a direction, we make contact with your shortlisted schools directly, opening the door on your behalf. | Once you've chosen a direction, we make contact with your shortlisted schools directly and manage the application on your behalf. |  |
| **Step 5 title** | Ongoing Support | Visa Support |  |
| **Step 5 body** | From visas and guardianship arrangements through to organising school visits wherever possible, we stay involved until your child is settled — not just until the offer letter arrives. | Once your child has an offer, we manage the visa process end-to-end — the paperwork, the timelines, and the follow-up with the relevant consulate. |  |
| **New line after the 5 steps** | (none) | Looking for guardianship, tutoring, or accommodation support too? These are offered as separate, dedicated services — see Programmes for details. | Per exec summary: these should be named as separate paid services, not folded into step 5\. |

### **Dev / build notes for Michael**

* **`[DEV]`**  This must be changed in lockstep with the matching 5-step summary on /programmes — they currently repeat the same content and need to stay identical.

## **/schools**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Schools  child? (broken template) | Find the right school for your child. |  |
| **Directory state** | “Directory data coming soon… No schools indexed yet.” | Populated from the same partner-school dataset as /athletex/schools (78 schools and growing), with the AthleteX-only filter toggle already built into this page used to show/hide the athlete-specific ones. | Include all schools from the sheet here. |
| **Meta description** | Search 200+ UK independent schools by type, gender, region, fees and AthleteX partnership. | Search our partner UK independent schools by type, gender, region, fees and AthleteX partnership. | Holding off on a specific number until the real total is confirmed — see \[NEEDS INPUT\] below. Don't publish “200+” unless that's the actual confirmed count. |

### **Dev / build notes for Michael**

* **`[DEV]`**  Wire /schools to the same school records currently only surfacing at /athletex/schools. Recommend one shared dataset with an \`athletex\_partner: true/false\` flag per record, rather than two separate stores.

* **`[DEV]`**  Once wired, confirm sort (Relevance/Fees/A–Z) actually functions — untestable while the directory is empty.

* **`[NEEDS INPUT]`**  What's the real total school count once /schools and /athletex/schools share data? The meta description currently claims “200+” but only 78 AthleteX schools have real records right now — need the true number (or a broader non-AthleteX list) before publishing a specific figure.

# **4\. Page-by-Page — About, Insights, Contact & Enquiry**

## **/about**

*This is the page you specifically flagged: fold in whatever's relevant from the old morganoxfordeducation.co.uk/about, cut anything that's really about the Universities business (going to HorizonPath), fix the two hard factual errors (Oxford-only footprint, wrong years), and make it noticeably better written than the old site — which, in fairness, was never doing this page any favours. Here's what I pulled from the old site as raw material, and what I did with it.*

### **What the old site actually says (for reference — not to be reused as-is)**

From morganoxfordeducation.co.uk/about, current live text: “We are an international education agency providing bespoke support for students looking for a global education experience. Founded by CEO Richard Morgan, Morgan Oxford Education (formerly Y2GO Limited) began its journey 12 years ago in Oxford, UK… supporting our students throughout their journey from our global offices in Oxford, UK, Cairo, Egypt and Lagos, Nigeria… With over 12 years of experience in educational recruitment and contacts across 4 continents…”

*Worth keeping from this: the founding story (Oxford, 2013 once corrected for 13 years — the old site said “12 years ago” at whatever point it was last updated, which is roughly consistent with our confirmed 2013), and the name Richard Morgan as founder. Worth cutting: the Cairo office (per Locked Facts), and anything implying this covers university placement, since that's HorizonPath's remit now.*

### **New copy**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | An independent advisory, based in Oxford.  story (broken template) | Founded in Oxford. Built for the families we serve. |  |
| **Subhead** | Fifteen years placing families across the UK's leading independent schools — with a growing athlete practice under the AthleteX pathway. | For 13 years, Morgan Oxford Education has placed students into the UK's leading independent schools, with offices across Nigeria and a growing athlete practice under AthleteX Pathways. |  |
| **Section: Where we started (new H2)** | (doesn't exist) | Morgan Oxford Education was founded in Oxford in 2013 by Richard Morgan, built around a simple observation: more families than ever wanted an international education for their children, and almost none of them had a straightforward way to navigate it.  What started as a small placement practice has grown into an agency with real, working relationships across the UK's top independent schools. |  |
| **Section: Where we are now (new H2)** | (doesn't exist) | Today, Morgan Oxford Education is run from Oxford, UK, with offices in Lagos, Abuja and Port Harcourt, Nigeria — reflecting where most of the families we work with are based. |  |
| **Section: AthleteX (new H2)** | (doesn't exist) | In recent years we've built a dedicated practice for student-athletes — AthleteX Pathways — placing footballers, basketballers, tennis and volleyball players, swimmers and track athletes into schools built to take both their sport and their academics seriously. Learn more about AthleteX Pathways → |  |
| **Closing CTA** | (none) | Talk to us about your child → |  |
| **Meta description** | The team, ethos and results behind Morgan Oxford's UK school placement practice. | 13 years placing families into the UK's leading independent schools — run from Oxford, with offices across Lagos, Abuja and Port Harcourt, Nigeria. |  |

* **`[NEEDS REVIEW]`**  This entire page is a substantial rewrite, not a small edit — please read it in full before it goes live, particularly the founding-story paragraph, since I've drawn on old-site material but rewritten it from scratch.

* **`[NEEDS INPUT]`**  Need to add “the team” and “results” — a real Team section (names, roles, photos) and a results/stats section.

### **Image suggestions for David**

* **`[IMAGE]`**  Hero: swap the current stock (grand library, generic historic building) for something that reads as genuinely Oxford \+ Nigeria, not just a postcard of Oxford.

* **`[IMAGE]`**  We need a real photo of the MOE office, Richard Morgan, and the wider team. (Seph to provide)

## **/insights**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Guides, case studies,  Real outcomes. (broken template) | Guides and real outcomes, from the placement desk. |  |
| **Body** | Long-form thinking from the placement desk. | NO CHANGE |  |

*Actual articles are a content project in their own right, not something to invent wholesale in a copy-fix pass — but here are six starter briefs, chosen for matching real parent search intent (ties back to the SEO gap the audit flagged):*

* IB Diploma vs A-Levels: which is right for your child?

* Boarding school vs day school: what actually matters

* A parent's guide to UK school guardianship

* What is a Sixth Form College, and does my child need one?

* Applying to UK boarding school from Nigeria: a step-by-step guide

* AthleteX: how school sports scholarships actually work

* **`[NEEDS REVIEW]`**  These are titles/briefs only, not full articles — flagging so nobody mistakes the brief for finished copy.

## **/contact**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Begin the conversation  together. (broken template) | Let's begin the conversation. |  |
| **Response line** | A consultant will respond within two working days. | A consultant will respond within 48 hours. |  |
| **Form** | Full duplicate enquiry form | Removed — replaced with a button through to /enquire/contact (parents) and a smaller link to /enquire (schools, agents, other) | See Section 2 for the full architecture decision. |
| **UK office** | 54 Davenant Road, Oxford OX2 8BY, United Kingdom | NO CHANGE |  |
| **Nigeria office(s)** | One block: “Nigeria” — Rooftop, 33 Kofo Abayomi Street, Victoria Island, Lagos 100001 | Three blocks: Lagos (updated to 10, Ologun Agbaje, Victoria Island, Lagos), Abuja (address needed), Port Harcourt (address needed) |  |

* **`[NEEDS INPUT]`**  Need real addresses/phone numbers for the Abuja and Port Harcourt offices before this page can go live with all four locations — Lagos and Oxford are already confirmed and live.

## **/enquire**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | How can we help? | NO CHANGE |  |
| **General enquiry form** | (current fields) | NO CHANGE | This form is well-built as-is. |
| **Second “Contact us” form** | Duplicate form stacked below the first | Removed | Redundant with the form above it — see Section 2\. |

## **/enquire/contact**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **Page content** | Identical to /enquire (bug — has its own meta promising something different) | Its own dedicated parent/child-placement form | Full field spec in Section 2 — this is the highest-priority fix in the whole document. |
| **H1** | How can we help? (inherited from /enquire) | Tell us about your child. |  |
| **Meta description** | Tell us about your child and we'll be in touch within 48 hours. Offices in Oxford and Lagos. | Tell us about your child and we'll be in touch within 48 hours. Offices in Oxford, Lagos, Abuja and Port Harcourt. |  |

* **`[DEV]`**  This is the fix that matters most for conversions — see Section 2 for the reasoning and full field list. Every parent-facing CTA on the homepage points here.

* Delete one or merge them somehow if they dont serve distinctly different purposes.

# **5\. Page-by-Page — AthleteX**

*Every AthleteX page needs to move onto the same locked six-sport list: Football, Basketball, Tennis, Swimming, Volleyball, Athletics/Track. Right now three pages disagree with each other and none of them match this list — that gets fixed sitewide below.*

## **/athletex  (landing)**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1 / subhead / “why AthleteX” body** | (current copy) | NO CHANGE | Well written as-is. |
| **Pathway cards** | 4 cards: Football, Basketball, Tennis, Swimming | 6 cards: Football, Basketball, Tennis, Swimming, Volleyball, Athletics/Track |  |
| **New card: Volleyball** | (doesn't exist) | Placement into schools with competitive volleyball programmes and coaching pathways, for players balancing club and school commitments. |  |
| **New card: Athletics/Track** | (doesn't exist) | Access to schools with strong athletics and track programmes, for sprinters, distance runners and field athletes serious about competing at school and beyond. |  |

## **/athletex/sports**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Sports we cover. | NO CHANGE |  |
| **List** | football, rugby, tennis, athletics, cricket, hockey, swimming (7 — no basketball, includes 3 sports being dropped) | Football, Basketball, Tennis, Swimming, Volleyball, Athletics/Track (6 — the locked list) |  |

### **Dev / build notes for Michael**

* **`[DEV]`**  Rugby, cricket and hockey sub-pages (/athletex/sports/rugby etc.) can be retired along with the list entries.

* **`[DEV]`**  Basketball and Volleyball sub-pages need to be built to match the new list — they don't currently exist as their own routes.

## **/athletex/schools**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Partner schools.  right school. (broken template) | The right school for your athlete. |  |
| **Stat callout** | 78 Partner schools · 4 Regions · 3 Sports · Elite partners: PSG · MUFC · MCFC | 78 Partner schools · 4 Regions · 6 Sports | Move the club-academy mention into body copy (below) rather than a bare stat — see Locked Facts on why the phrasing needs to change, not just the count. |
| **Sport filters** | Soccer / Basketball / Swimming (3) | Football / Basketball / Tennis / Swimming / Volleyball / Athletics-Track (6) | “Soccer” → “Football” throughout this page, including every individual school's sport tag. |
| **Club-partnership framing (new intro line)** | (implied only via the “Elite partners” stat and per-school notes) | A number of our partner schools hold their own direct arrangements with professional club academies — including Paris Saint-Germain, Manchester United, and Manchester City — for specialist training programmes. |  |

*Per-school notes that name a specific club need the same reframing — Morgan Oxford didn't do this deal, the school did. Same pattern, applied to every entry that currently names a club:*

| `School` | `OLD note` | `NEW note` |
| :---- | :---- | :---- |
| Ackworth School | Football academy; partners with PSG. | Football academy; the school holds its own training partnership with Paris Saint-Germain. |
| LVS Ascot | Football academy; partners with Southampton FC. | Football academy; the school holds its own training partnership with Southampton FC. |
| Ellesmere College | Partnership with PSG. Swimming academy from Year 5\. | The school holds its own training partnership with Paris Saint-Germain. Swimming academy from Year 5\. |
| Bethany School | Football Excellence pathway with Manchester United; swimming in general sports. | The school's own Football Excellence pathway runs in partnership with Manchester United; swimming in general sports. |
| Aiglon College | Partnership with Manchester City FC. | The school holds its own training partnership with Manchester City FC. |

* **`[DATA]`**  Apply the same OLD→NEW pattern to any other entries in the 78-school list that name a specific club — these five are the ones this pass found, but the same rewrite rule (“the school holds its own partnership,” never “we partner with”) applies to any others.

* **`[DEV]`**  Alphabetize all four regional lists (UK, Canada, USA, Europe & Beyond) — none are currently in A–Z order.

* **`[DATA]`**  Tennis, Volleyball and Athletics/Track have no schools tagged for them at all in the current 78-school dataset (everything is Soccer/Basketball/Swimming). Either tag existing schools that also offer these, or source additional partner schools specifically for them, before the filters go live claiming to cover six sports. Worth escalating to MOE.

## **/athletex/scholarship**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **Visible internal flag** | ⚑ Proposal — pending Seph sign-off | Removed entirely | Do this one first, independent of everything else. |
| **Sport dropdown** | Football / Basketball / Tennis / Swimming / Multi-sport / Other | Football / Basketball / Tennis / Swimming / Volleyball / Athletics or Track / Multi-sport / Other |  |
| **Video field label** | Highlight video URL | Video URL | Per exec summary — plainer label. |
| **Target pathway dropdown** | UK boarding school / US NCAA / UK university / Pro or semi-pro pathway / Unsure | Boarding School / Sixth Form College / University / University Pathway / Pro or Semi-Pro Pathway / Unsure | Per exec summary's five named options. |
| **“I'm applying as” dropdown** | Athlete (18+) / Parent or Guardian / Coach or Club / Scout or Agency | Athlete (18+) / Parent or Guardian / Coach or Club | Scout/Agency moves to its own dedicated form on /athletex/scouts — see below. |

* **`[DEV]`**  “Position / discipline” should become a dynamic field per sport. Suggested per-sport labels: Football → “Position (e.g. striker, midfielder)” · Basketball → “Position (e.g. guard, forward)” · Tennis → “UTR / national ranking” · Swimming → “Best times & strokes” · Volleyball → “Position (e.g. setter, libero)” · Athletics/Track → “Event(s) & personal bests”.

## **/athletex/success**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | Success stories. | NO CHANGE |  |
| **Intro copy** | (none — page is empty below the H1) | Every athlete's path is different — some are looking for their first serious sporting environment, others are already competing at a representative level. Here's how a few of those journeys have gone. |  |

*One illustrative template for when real case studies are ready (generic placeholder — not a real story):*

* \[Sport\] Placement · \[School name\] — “One-paragraph placeholder: what the athlete was looking for, what made this school the right fit, and how it's gone since.” — First name only or initials, per safeguarding guidance for minors.

* **`[NEEDS REVIEW]`**  Confirmed via the exec summary: text/photo only here, no video, since subjects are minors. This page needs real stories from placed athletes before it can go live — the above is a structural template, not content to publish.

## **/athletex/scouts**

| `Element` | `OLD (live now)` | `NEW (replace with)` | `Note` |
| :---- | :---- | :---- | :---- |
| **H1** | For scouts & clubs. | NO CHANGE |  |
| **Body** | Partner with the AthleteX scouting desk for verified athlete introductions. | Partner with the AthleteX scouting desk for verified athlete introductions. Tell us who you're looking for and what you're proposing — trial, scholarship offer, or an ongoing scouting relationship — and we'll come back to you within 48 hours. |  |
| **Form** | None — no form exists on this page | New dedicated Scouts & Clubs form (see fields below) | Per exec summary action item \#9. |

*Suggested field list for the new form:*

* Scout / Club name \*

* Organisation \*

* Email \*

* Phone \*

* Country \*

* Athlete(s) of interest — name, current school/club, sport (free text)

* What are you proposing? — Trial invitation / Scholarship offer / Ongoing scouting relationship / Other

* Additional context (free text)

* I agree to be contacted about this enquiry. \*

* **`[DEV]`**  Confirm CRM segmentation for this form with Demola before build, per the exec summary — scout/club leads likely need different routing than parent or athlete leads.

# **6\. Legal Pages — Draft Content**

**DRAFT ONLY — RECOMMEND LEGAL REVIEW BEFORE PUBLISHING.** *These four pages are currently completely empty. The drafts below are a reasonable, standard starting point — not a substitute for an actual legal read, especially since the business collects data on minors (school placement forms, and AthleteX intake with date of birth and video links) across both UK (GDPR) and Nigeria (NDPA) jurisdictions.*

## **/legal/privacy**

### **What we collect**

Contact details, information about your child (age, current school, academic history), and any documents you choose to share with us as part of a placement enquiry. For AthleteX, this may also include date of birth and a link to footage of the athlete.

### **Why we collect it**

To advise on and arrange school placement, and to introduce your family to schools, tutors, guardians and — where relevant — AthleteX partner schools and scouts on your behalf.

### **How long we keep it**

For as long as we're actively working with your family, and for a reasonable period afterwards in case you return to us — full retention periods to be confirmed.

### **Who we share it with**

Only the schools, tutors, and guardians directly relevant to your enquiry, and only with your consent. We do not sell or share your data with unrelated third parties.

### **International transfers**

As we operate from both the UK and Nigeria, your data may be processed in either country. We take reasonable steps to protect it in both.

### **Your rights**

You can ask to see what we hold on your family, correct it, or ask us to delete it, at any time — contact enquiries@morganoxfordeducation.co.uk.

## **/legal/terms**

### **Our service**

Morgan Oxford Education provides advisory and placement support for international school admissions. We do not guarantee admission to any specific school. Final decisions rest with the school in question.

### **Engagement & fees**

Specific tuition fees and scope of work are agreed directly with your family before work begins, and are set out in a separate engagement letter rather than on this page.

### **Intellectual property**

All content on this site belongs to Morgan Oxford Education unless otherwise credited.

### **Liability**

We advise in good faith based on the information you provide and our knowledge of partner schools, but we aren't liable for decisions made independently by schools, universities, visa authorities, or other third parties.

### **Governing law**

These terms are governed by the laws of England & Wales and, where applicable to our Nigeria operations, the Federal Republic of Nigeria.

## **/legal/cookies**

We use a small number of essential cookies to make this site work, and analytics cookies to understand how it's used, so we can improve it. You can manage or disable non-essential cookies through your browser settings at any time. See our Privacy policy for more on how we handle any data collected this way.

## **/legal/safeguarding**

### **Our commitment**

Morgan Oxford Education works with families placing children in schools overseas, and — through AthleteX — collects information directly about minors, including date of birth and video footage. We take the safeguarding of every young person we work with seriously.

### **What this means in practice**

We only collect the minimum information needed to make a good placement recommendation. We never publish identifying information about a minor without explicit parental consent. Any footage or photos submitted through AthleteX are used solely for placement and scouting purposes, never public marketing, without separate written consent.

### **Raising a concern**

If you have a safeguarding concern about our conduct or a partner school/guardian's conduct, contact \[safeguarding lead name/role to be confirmed\] directly at \[dedicated contact to be confirmed\].

* **`[NEEDS INPUT]`**  Safeguarding needs a named responsible person/role and a dedicated contact route before publishing — I can't invent this, since it needs to be a real, accountable person at Morgan Oxford Education. This is the one page on the entire site I'd push hardest to get right before launch, given what AthleteX collects.

# **7\. Image Suggestions — Summary for David**

Pulled together from every page above, in priority order:

* **`[IMAGE]`**  About (hero \+ team): highest priority. A real photo — Oxford office, Richard Morgan, or the wider team — would do more for trust here than anywhere else on the site. If unavailable yet, at minimum choose stock that reads UK \+ Nigeria, not just an Oxford postcard. (Seph to request & provide)

* **`[IMAGE]`**  Destinations: USA card and Canada card each need their own distinct hero once split apart — right now all four region cards pool from the same 4 generic images. Canada in particular has nothing region-specific at all yet.

* **`[IMAGE]`**  AthleteX (all pages): once the sport list expands to six, Volleyball and Athletics/Track need their own imagery rather than reusing the generic floodlit-track hero across every sport.

* **`[IMAGE]`**  AthleteX Success: needs cover photos design for testimonials template as we can’t use miro’s pictures for marketing— avoid generic stock here since it can read as an uncredited real minor.

* **`[IMAGE]`**  Home: need better rotating stock short-term; a real photo somewhere on this page (team, office, a genuine placement moment) is worth planning for eventually.

# **8\. Dev Punch List — Everything for Michael in One Place**

Every \[DEV\] and \[DATA\] item from this document, gathered here so nothing gets missed once the copy itself is signed off:

* **`[DEV]`**  Fix the broken two-part headline template — it's producing garbled H1s on About, Schools, Insights, and AthleteX Schools. Needs a template/component fix, not just new text typed into the same broken slot.

* **`[DEV]`**  Wire /schools to the same partner-school dataset as /athletex/schools (currently 78 records, AthleteX-only). Use the existing “AthleteX partner schools only” filter to distinguish, rather than running two separate directories.

* **`[DEV]`**  Build /enquire/contact as its own distinct form/template (see Section 2\) — right now it just renders /enquire's content. This is the single highest-priority build item in this document.

* **`[DEV]`**  Remove the duplicate “Contact us” form on /enquire, and the standalone form on /contact — replace the latter with a button through to /enquire/contact plus a smaller link to /enquire.

* **`[DEV]`**  Retire rugby/cricket/hockey sub-pages under /athletex/sports/; build Basketball and Volleyball sub-pages to match the new six-sport list.

* **`[DEV]`**  Make the AthleteX scholarship form's sport-specific field (“Position/discipline”) dynamic per sport — see Section 5 for suggested per-sport labels.

* **`[DEV]`**  Build the new, separate Scouts & Clubs form on /athletex/scouts (field list in Section 5); confirm CRM routing with Demola.

* **`[DEV]`**  Alphabetize all four regional lists on /athletex/schools.

* **`[DEV]`**  Global find/replace: “Services” (nav) → “Programmes”; “Soccer” → “Football” (AthleteX); “within two working days” / standalone “48h” copy → “within 48 hours.”

* **`[DEV]`**  Remove noindex from the four /legal/ pages once real content replaces the current empty shells.

* **`[DATA]`**  Tag or source partner schools for Tennis, Volleyball and Athletics/Track — the current 78-school dataset only covers Soccer/Basketball/Swimming.

* **`[DATA]`**  Apply the “the school holds its own partnership” rewrite pattern to any other entries in the 78-school list beyond the five identified in Section 5\.

* **`[NEEDS INPUT]`**  Real addresses/phone numbers for the Abuja and Port Harcourt offices.

* **`[NEEDS INPUT]`**  The true total school count for /schools' meta description, once it's wired to real data.

* **`[NEEDS INPUT]`**  A named safeguarding lead and dedicated contact route for /legal/safeguarding.

* **`[NEEDS INPUT]`**  Verification of the five specific club-academy partnership claims (Ackworth/PSG, LVS Ascot/Southampton, Ellesmere/PSG, Bethany/Man Utd, Aiglon/Man City).

* **`[NEEDS INPUT]`**  Real team bios/photos for a future About page “Our team” section.

# **9\. Getting the Site Indexed, Once the Copy is Live**

Here's the practical checklist for once everything above is implemented and the site is ready for real visitors:

* Remove the blanket noindex tag from the four /legal/ pages once they carry real content.

* Create or update sitemap.xml with every real, public URL (the five programme pages, all AthleteX pages, Insights once articles exist, etc.).

* Confirm robots.txt allows crawling of all public paths and references the sitemap.

* Verify domain ownership in Google Search Console (DNS TXT record or HTML tag) and submit the sitemap there; do the same in Bing Webmaster Tools.

* Add basic structured data — an Organization/LocalBusiness or EducationalOrganization schema block with the correct four-office address list — so search engines understand who you are, not just what the pages say.

* Set canonical tags on /schools so its filter query-string variants (?athletex=false\&gender=any\&sort=relevance\&type=any) all point back to the clean base URL — otherwise every filter combination risks being indexed as separate, duplicate pages.

* Once live, manually request indexing for the highest-priority pages (Home, Programmes, About, Destinations, Contact, AthleteX) via Search Console's URL Inspection tool rather than waiting for organic crawl to find them.

* Watch Search Console's Coverage report in the following weeks for anything flagged “crawled but not indexed” or “duplicate” — the placeholder/duplicate-content issues this document fixes (five near-identical programme stubs, three overlapping contact forms) were the main risk here, so most of this should clear up once the copy above goes in.