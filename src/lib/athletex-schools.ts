export type Sport =
  | "football"
  | "basketball"
  | "table-tennis"
  | "swimming"
  | "volleyball"
  | "athletics";

export type PartnerSchool = {
  name: string;
  location: string;
  country: string;
  sports: Sport[];
  note: string;
  athletex_partner: boolean;
};

export type PartnerRegion = {
  id: "uk" | "canada" | "usa" | "europe";
  label: string;
  blurb: string;
  schools: PartnerSchool[];
};

const S = {
  fb: ["football"] as Sport[],
  bb: ["basketball"] as Sport[],
  sw: ["swimming"] as Sport[],
  fbBb: ["football", "basketball"] as Sport[],
  fbSw: ["football", "swimming"] as Sport[],
  swBb: ["swimming", "basketball"] as Sport[],
  all: ["football", "swimming", "basketball"] as Sport[],
};

const partner = true;

const rawRegions: PartnerRegion[] = [
  {
    id: "uk",
    label: "United Kingdom",
    blurb:
      "Independent schools with credible pathways into competitive sport and varsity programmes.",
    schools: [
      { name: "Ackworth School", location: "West Yorkshire", country: "UK", sports: S.fb, note: "Football academy; the school holds its own training partnership with Paris Saint-Germain.", athletex_partner: partner },
      { name: "LVS Ascot", location: "Ascot, Berkshire", country: "UK", sports: S.fb, note: "Football academy; the school holds its own training partnership with Southampton FC.", athletex_partner: partner },
      { name: "Royal Russell School", location: "Surrey", country: "UK", sports: S.fb, note: "Pathway into professional football.", athletex_partner: partner },
      { name: "Brentwood School", location: "Essex", country: "UK", sports: S.sw, note: "General school sports programme.", athletex_partner: partner },
      { name: "Windermere School", location: "Cumbria", country: "UK", sports: S.fbBb, note: "Sports offered as part of the curriculum.", athletex_partner: partner },
      { name: "Marymount International School", location: "Kingston upon Thames", country: "UK", sports: S.fbBb, note: "All-girls school.", athletex_partner: partner },
      { name: "Cardiff Sixth Form College", location: "Cambridge", country: "UK", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Kneller Hall School", location: "Twickenham", country: "UK", sports: S.fbBb, note: "Formerly Radnor House, Twickenham.", athletex_partner: partner },
      { name: "Rochester Independent College", location: "Rochester", country: "UK", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Cobham Hall School", location: "Kent", country: "UK", sports: S.fbSw, note: "Swimming is an extracurricular activity.", athletex_partner: partner },
      { name: "Ellesmere College", location: "Shropshire", country: "UK", sports: S.fbSw, note: "The school holds its own training partnership with Paris Saint-Germain. Swimming academy from Year 5.", athletex_partner: partner },
      { name: "Bethany School", location: "Kent", country: "UK", sports: S.fbSw, note: "The school's own Football Excellence pathway runs in partnership with Manchester United; swimming in general sports.", athletex_partner: partner },
      { name: "Devonshire Preparatory School", location: "London", country: "UK", sports: S.fbSw, note: "General school sports programme.", athletex_partner: partner },
      { name: "Mill Hill School", location: "London", country: "UK", sports: S.all, note: "Swimming and basketball are elective.", athletex_partner: partner },
      { name: "St Bees School", location: "Cumbria", country: "UK", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "St Lawrence College", location: "Kent", country: "UK", sports: S.all, note: "Competitive swimming pathway; football and basketball in general sports.", athletex_partner: partner },
      { name: "The Leys School", location: "Cambridge", country: "UK", sports: S.all, note: "Links with the City of Cambridge Swimming Club.", athletex_partner: partner },
      { name: "St Andrews College", location: "Cambridge", country: "UK", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Earlscliffe", location: "Folkestone", country: "UK", sports: S.all, note: "Competitive basketball and football teams; swimming is recreational.", athletex_partner: partner },
      { name: "Sidcot School", location: "Winscombe", country: "UK", sports: S.all, note: "Supports students building a career from available sport programmes.", athletex_partner: partner },
    ],
  },
  {
    id: "canada",
    label: "Canada",
    blurb:
      "Boarding and day schools across Canada with varsity football, basketball and swimming programmes — from British Columbia to the Maritimes.",
    schools: [
      { name: "Ridley College", location: "St. Catharines, ON", country: "Canada", sports: S.bb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Brookes Westshore", location: "Victoria, BC", country: "Canada", sports: S.bb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Shawnigan Lake School", location: "Shawnigan Lake, BC", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Rosseau Lake College", location: "Rosseau, ON", country: "Canada", sports: S.fbBb, note: "Varsity football; basketball is recreational.", athletex_partner: partner },
      { name: "King's-Edgehill School", location: "Windsor, NS", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Luther College High School", location: "Regina, SK", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "St John's-Kilmarnock School", location: "Breslau, ON", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "St John's-Ravenscourt School", location: "Winnipeg, MB", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "TAIE Institute", location: "Thornhill, ON", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Maclachlan College", location: "Oakville, ON", country: "Canada", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Fort Erie International Academy", location: "Fort Erie, ON", country: "Canada", sports: S.fbBb, note: "Competitive sports programme.", athletex_partner: partner },
      { name: "Blyth Academy", location: "Ontario", country: "Canada", sports: S.fbSw, note: "General school sports programme.", athletex_partner: partner },
      { name: "Lakefield College School", location: "Lakefield, ON", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "St George's School", location: "Vancouver, BC", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Queen Margaret's School", location: "Duncan, BC", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Brentwood College School", location: "Mill Bay, BC", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Stanstead College", location: "Quebec", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Appleby College", location: "Oakville, ON", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Ashbury College", location: "Ottawa, ON", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Athol Murray College of Notre Dame", location: "Wilcox, SK", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Bishop Strachan School", location: "Toronto, ON", country: "Canada", sports: S.all, note: "All-girls school.", athletex_partner: partner },
      { name: "Trinity College School", location: "Port Hope, ON", country: "Canada", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Albert College", location: "Belleville, ON", country: "Canada", sports: S.all, note: "Available from Grade 7–12.", athletex_partner: partner },
      { name: "Trafalgar Castle School", location: "Whitby, ON", country: "Canada", sports: S.all, note: "All-girls school.", athletex_partner: partner },
      { name: "Bodwell High School", location: "North Vancouver, BC", country: "Canada", sports: S.all, note: "Recreational sports programme.", athletex_partner: partner },
    ],
  },
  {
    id: "usa",
    label: "United States",
    blurb: "Elite US prep schools with strong varsity athletics and clear college-recruitment pathways.",
    schools: [
      { name: "North Broward Preparatory School", location: "Coconut Creek, FL", country: "USA", sports: S.bb, note: "High school students only.", athletex_partner: partner },
      { name: "Forman School", location: "Connecticut", country: "USA", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Fryeburg Academy", location: "Maine", country: "USA", sports: S.fbBb, note: "Competitive school athletic programme.", athletex_partner: partner },
      { name: "The Newman School", location: "Boston", country: "USA", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "The Ross School", location: "East Hampton, NY", country: "USA", sports: S.fbBb, note: "Offered as electives from Grade 6–12.", athletex_partner: partner },
      { name: "Phillips Exeter Academy", location: "New Hampshire", country: "USA", sports: S.fbBb, note: "Varsity sports.", athletex_partner: partner },
      { name: "Groton School", location: "Massachusetts", country: "USA", sports: S.fbBb, note: "Both varsity and recreational.", athletex_partner: partner },
      { name: "Léman Manhattan Preparatory School", location: "New York", country: "USA", sports: S.swBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Florida Prep Academy", location: "Melbourne, FL", country: "USA", sports: S.swBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Thornton Academy", location: "Maine", country: "USA", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Hyde School", location: "Maine", country: "USA", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Choate Rosemary Hall", location: "Connecticut", country: "USA", sports: S.all, note: "Strong varsity athletics with college-athlete development.", athletex_partner: partner },
      { name: "Riverdale Country School", location: "New York", country: "USA", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "British International School of Houston", location: "Houston, TX", country: "USA", sports: S.all, note: "Varsity sports.", athletex_partner: partner },
      { name: "Fairmont Schools", location: "Anaheim, CA", country: "USA", sports: S.all, note: "Varsity sports.", athletex_partner: partner },
      { name: "Woodside Priory School", location: "Portola Valley, CA", country: "USA", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
    ],
  },
  {
    id: "europe",
    label: "Europe & Beyond",
    blurb: "International schools across mainland Europe with competitive varsity and tournament-team pathways.",
    schools: [
      { name: "Amadeus International School", location: "Vienna", country: "Austria", sports: S.all, note: "Swimming programme still in development.", athletex_partner: partner },
      { name: "Berlin Brandenburg International School", location: "Kleinmachnow", country: "Germany", sports: S.all, note: "Grade 6–12; competes in the GISST tournament.", athletex_partner: partner },
      { name: "International School of Athens", location: "Kifissia", country: "Greece", sports: S.fbBb, note: "Varsity teams compete in local and European tournaments.", athletex_partner: partner },
      { name: "Blackrock College", location: "Dublin", country: "Ireland", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Glenstal Abbey School", location: "Limerick", country: "Ireland", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "Canadian College Italy", location: "Lanciano", country: "Italy", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "The British School of Lisbon", location: "Lisbon", country: "Portugal", sports: S.fbBb, note: "Compulsory after-school activities for all students.", athletex_partner: partner },
      { name: "United Lisbon International School", location: "Lisbon", country: "Portugal", sports: S.all, note: "Swimming available Grades 6–10 only.", athletex_partner: partner },
      { name: "Colégio Júlio Dinis", location: "Porto", country: "Portugal", sports: S.all, note: "General school sports programme.", athletex_partner: partner },
      { name: "CLIP — Oporto International School", location: "Porto", country: "Portugal", sports: S.all, note: "Competitive sports programme.", athletex_partner: partner },
      { name: "International College Spain", location: "Madrid", country: "Spain", sports: S.bb, note: "Summer programme (ages 10–19).", athletex_partner: partner },
      { name: "Hamelin-Laie International School", location: "Barcelona", country: "Spain", sports: S.all, note: "Summer programmes only.", athletex_partner: partner },
      { name: "La Côte International School", location: "Aubonne", country: "Switzerland", sports: S.fb, note: "Summer programme.", athletex_partner: partner },
      { name: "Collège du Léman", location: "Geneva", country: "Switzerland", sports: S.fbBb, note: "Competitive school sports.", athletex_partner: partner },
      { name: "Aiglon College", location: "Chesières", country: "Switzerland", sports: S.fbBb, note: "The school holds its own training partnership with Manchester City FC.", athletex_partner: partner },
      { name: "Brillantmont International School", location: "Lausanne", country: "Switzerland", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
      { name: "Eerde International Boarding School", location: "Ommen", country: "Netherlands", sports: S.fbBb, note: "General school sports programme.", athletex_partner: partner },
    ],
  },
];

function sortRegions(regions: PartnerRegion[]): PartnerRegion[] {
  return regions.map((r) => ({
    ...r,
    schools: [...r.schools].sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

export const partnerRegions = sortRegions(rawRegions);

/** @deprecated Use partnerRegions — kept for existing imports */
export const athletexRegions = partnerRegions;

export type AthleteXSchool = PartnerSchool;
export type AthleteXRegion = PartnerRegion;

export const partnerSchoolCount = partnerRegions.reduce((n, r) => n + r.schools.length, 0);

/** @deprecated Use partnerSchoolCount */
export const athletexSchoolCount = partnerSchoolCount;

export const sportLabel: Record<Sport, string> = {
  football: "Football",
  basketball: "Basketball",
  "table-tennis": "Table Tennis",
  swimming: "Swimming",
  volleyball: "Volleyball",
  athletics: "Athletics/Track",
};

export const sportFilters = [
  { value: "all" as const, label: "All sports" },
  { value: "football" as const, label: "Football" },
  { value: "basketball" as const, label: "Basketball" },
  { value: "table-tennis" as const, label: "Table Tennis" },
  { value: "swimming" as const, label: "Swimming" },
  { value: "volleyball" as const, label: "Volleyball" },
  { value: "athletics" as const, label: "Athletics/Track" },
];

export type FlatPartnerSchool = PartnerSchool & {
  regionId: PartnerRegion["id"];
  regionLabel: string;
};

export function getAllPartnerSchools(): FlatPartnerSchool[] {
  return partnerRegions.flatMap((r) =>
    r.schools.map((s) => ({
      ...s,
      regionId: r.id,
      regionLabel: r.label,
    })),
  );
}

export function filterPartnerSchools(opts: {
  q?: string;
  athletexOnly?: boolean;
  sport?: Sport | "all";
  sort?: "relevance" | "az";
}): FlatPartnerSchool[] {
  let list = getAllPartnerSchools();

  if (opts.athletexOnly) {
    list = list.filter((s) => s.athletex_partner);
  }

  if (opts.sport && opts.sport !== "all") {
    list = list.filter((s) => s.sports.includes(opts.sport as Sport));
  }

  const q = (opts.q ?? "").trim().toLowerCase();
  if (q) {
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.regionLabel.toLowerCase().includes(q),
    );
  }

  if (opts.sort === "az") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}
