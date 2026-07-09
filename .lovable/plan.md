Populate `/athletex/schools` with the school list from the uploaded PDF, grouped by region and filterable by sport.

## Data

Create `src/lib/athletex-schools.ts` — a typed dataset of 81 schools grouped into 4 regions:

- **United Kingdom** (20): Ackworth, LVS Ascot, Royal Russell, Brentwood, Windermere, Marymount International, Cardiff Sixth Form, Kneller Hall, Rochester Independent, Cobham Hall, Ellesmere, Bethany, Devonshire Prep, Mill Hill, St Bees, St Lawrence, The Leys, St Andrews, Earlscliffe, Sidcot.
- **Canada** (25): Ridley, Brookes Westshore, Shawnigan Lake, Rosseau Lake, King's-Edgehill, Luther, St John's-Kilmarnock, St John's-Ravenscourt, TAIE, Maclachlan, Fort Erie, Blyth, Lakefield, St George's, Queen Margaret's, Brentwood College, Stanstead, Appleby, Ashbury, Athol Murray Notre Dame, Bishop Strachan, Trinity College, Albert, Trafalgar Castle, Bodwell.
- **United States** (16): North Broward Prep, Forman, Fryeberg Academy, The Newman, The Ross, Phillips Exeter, Groton, Leman Manhattan, Florida Prep, Thornton, Hyde, Choate Rosemary Hall, Riverdale Country, British International (Houston), Fairmont, Woodside Priory.
- **Europe & Beyond** (17): Amadeus International (Austria), BBIS (Germany), International School of Athens (Greece), Blackrock, Glenstal Abbey (Ireland), Canadian College Italy, British School of Lisbon, United Lisbon, Collegio Julio Dinis, CLIP Oporto (Portugal), International College Spain, Hamelin-Laie (Spain), La Cote, Collège du Léman, Aiglon, Brillantmont (Switzerland), Eerde (Netherlands).

Each record: `{ name, location, country, sports: ("soccer"|"basketball"|"swimming")[], note }`.

## Page rebuild — `src/routes/athletex.schools.tsx`

Replace the empty PageShell with:

1. Hero (existing PageShell + eyebrow/title/lede — refreshed lede: "81 partner schools across the UK, Canada, USA and Europe with soccer, basketball and swimming pathways.").
2. Summary strip: 4 stat chips (total schools, regions, sports, notable partners — PSG, Southampton FC, Man Utd, Man City).
3. Sport filter pills (All / Soccer / Basketball / Swimming), URL-synced via `validateSearch` like `/schools`.
4. Four region sections, each in AthleteX-tinted glass cards:
   - Region heading + count.
   - Grid of school cards showing name, location, sport badges, and the comment/partner note.
   - Filter hides cards that don't match selected sport; hides whole region if empty.
5. Footer CTA linking to `/athletex/scholarship`.

Uses existing tokens (jet/signal), `StaggerGrid`/`StaggerItem`, card hover-glow — consistent with the rest of the AthleteX zone. No new dependencies. Metadata updated for the richer content.
