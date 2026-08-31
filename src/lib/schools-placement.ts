export type PlacementRegionId = "uk" | "usa" | "canada" | "row";

export type NamedSchool = {
  name: string;
  location: string;
};

export type PlacementRegion = {
  id: PlacementRegionId;
  label: string;
  blurb: string;
  /** Schools Morgan Oxford works with directly — safe to name on the site. */
  directPartners: NamedSchool[];
  /** Illustrative examples of leading schools in the region — not a partner list. */
  leadingSchools: NamedSchool[];
};

export const placementRegions: PlacementRegion[] = [
  {
    id: "uk",
    label: "United Kingdom",
    blurb:
      "Boarding and day schools across England, Scotland and Wales — from established independents to specialist sixth-form colleges.",
    directPartners: [
      { name: "Brentwood School", location: "Essex" },
      { name: "Mill Hill School", location: "London" },
      { name: "The Leys School", location: "Cambridge" },
      { name: "Ellesmere College", location: "Shropshire" },
      { name: "Bethany School", location: "Kent" },
      { name: "Royal Russell School", location: "Surrey" },
    ],
    leadingSchools: [
      { name: "Eton College", location: "Windsor" },
      { name: "Winchester College", location: "Hampshire" },
      { name: "Westminster School", location: "London" },
      { name: "St Paul's School", location: "London" },
      { name: "Cheltenham Ladies' College", location: "Gloucestershire" },
      { name: "Rugby School", location: "Warwickshire" },
      { name: "Harrow School", location: "London" },
      { name: "Charterhouse", location: "Surrey" },
      { name: "Wycombe Abbey", location: "Buckinghamshire" },
      { name: "Sevenoaks School", location: "Kent" },
    ],
  },
  {
    id: "usa",
    label: "United States",
    blurb:
      "Day and boarding prep schools with strong academics and clear routes into US universities.",
    directPartners: [
      { name: "Phillips Exeter Academy", location: "New Hampshire" },
      { name: "Groton School", location: "Massachusetts" },
      { name: "Choate Rosemary Hall", location: "Connecticut" },
      { name: "Forman School", location: "Connecticut" },
    ],
    leadingSchools: [
      { name: "Phillips Academy Andover", location: "Massachusetts" },
      { name: "Deerfield Academy", location: "Massachusetts" },
      { name: "Lawrenceville School", location: "New Jersey" },
      { name: "The Hotchkiss School", location: "Connecticut" },
      { name: "St. Paul's School", location: "New Hampshire" },
      { name: "Middlesex School", location: "Massachusetts" },
      { name: "The Taft School", location: "Connecticut" },
      { name: "Peddie School", location: "New Jersey" },
      { name: "Blair Academy", location: "New Jersey" },
      { name: "Mercersburg Academy", location: "Pennsylvania" },
    ],
  },
  {
    id: "canada",
    label: "Canada",
    blurb:
      "Boarding and day schools from British Columbia to the Maritimes, with OSSD and IB pathways into Canadian universities.",
    directPartners: [
      { name: "Ridley College", location: "St. Catharines, ON" },
      { name: "Appleby College", location: "Oakville, ON" },
      { name: "Brentwood College School", location: "Mill Bay, BC" },
      { name: "Shawnigan Lake School", location: "Shawnigan Lake, BC" },
      { name: "Lakefield College School", location: "Lakefield, ON" },
    ],
    leadingSchools: [
      { name: "Upper Canada College", location: "Toronto, ON" },
      { name: "St. George's School", location: "Vancouver, BC" },
      { name: "Ashbury College", location: "Ottawa, ON" },
      { name: "Bishop Strachan School", location: "Toronto, ON" },
      { name: "Trinity College School", location: "Port Hope, ON" },
      { name: "Strathcona-Tweedsmuir School", location: "Okotoks, AB" },
      { name: "St. Andrew's College", location: "Aurora, ON" },
      { name: "Havergal College", location: "Toronto, ON" },
      { name: "Collège Jean-de-Brébeuf", location: "Montreal, QC" },
      { name: "Crofton House School", location: "Vancouver, BC" },
    ],
  },
  {
    id: "row",
    label: "Rest of world",
    blurb:
      "International and boarding schools across Europe, the Middle East and beyond — for families weighing destinations outside the UK, US and Canada.",
    directPartners: [
      { name: "Aiglon College", location: "Chesières, Switzerland" },
      { name: "Collège du Léman", location: "Geneva, Switzerland" },
      { name: "Blackrock College", location: "Dublin, Ireland" },
      { name: "International School of Athens", location: "Kifissia, Greece" },
    ],
    leadingSchools: [
      { name: "Institut Le Rosey", location: "Rolle, Switzerland" },
      { name: "Institut auf dem Rosenberg", location: "St. Gallen, Switzerland" },
      { name: "TASIS The American School in Switzerland", location: "Montagnola" },
      { name: "International School of Geneva", location: "Geneva" },
      { name: "American School of Paris", location: "Saint-Cloud, France" },
      { name: "Frankfurt International School", location: "Oberursel, Germany" },
      { name: "Copenhagen International School", location: "Copenhagen, Denmark" },
      { name: "The British School of Lisbon", location: "Lisbon, Portugal" },
      { name: "United Lisbon International School", location: "Lisbon, Portugal" },
      { name: "Glenstal Abbey School", location: "Limerick, Ireland" },
    ],
  },
];

export const placementRegionFilters: { id: PlacementRegionId | "all"; label: string }[] = [
  { id: "all", label: "All regions" },
  { id: "uk", label: "United Kingdom" },
  { id: "usa", label: "United States" },
  { id: "canada", label: "Canada" },
  { id: "row", label: "Rest of world" },
];

const REGION_ALIASES: Record<PlacementRegionId, string[]> = {
  uk: [
    "uk",
    "u.k.",
    "united kingdom",
    "great britain",
    "britain",
    "england",
    "scotland",
    "wales",
    "northern ireland",
    "british",
  ],
  usa: [
    "us",
    "u.s.",
    "u.s.a.",
    "usa",
    "united states",
    "united states of america",
    "america",
    "american",
  ],
  canada: ["canada", "canadian"],
  row: [
    "rest of world",
    "rest of the world",
    "europe",
    "european",
    "international",
    "abroad",
    "global",
    "switzerland",
    "swiss",
    "ireland",
    "irish",
    "france",
    "french",
    "germany",
    "german",
    "greece",
    "greek",
    "portugal",
    "portuguese",
    "denmark",
    "danish",
    "austria",
    "netherlands",
  ],
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Short tokens (e.g. us, uk, on) only match on word/field boundaries. */
function tokenMatchesHaystack(haystack: string, token: string) {
  if (!token) return true;
  if (haystack.includes(token)) return true;
  if (haystack === token) return true;
  const re = new RegExp(`(^|[\\s,.\\-/])${escapeRegExp(token)}($|[\\s,.\\-/])`);
  return re.test(haystack);
}

function schoolSearchHaystack(school: NamedSchool, region: PlacementRegion) {
  return normalizeSearchText(
    [
      school.name,
      school.location,
      region.label,
      region.id,
      ...REGION_ALIASES[region.id],
    ].join(" "),
  );
}

function matchesSearchQuery(school: NamedSchool, region: PlacementRegion, query: string) {
  const q = normalizeSearchText(query);
  if (!q) return true;

  const haystack = schoolSearchHaystack(school, region);
  const tokens = q.split(/\s+/).filter(Boolean);

  if (tokens.length === 1) return haystack.includes(tokens[0]!);

  return tokens.every((token) => tokenMatchesHaystack(haystack, token));
}

export function filterPlacementRegions(opts: {
  region?: PlacementRegionId | "all";
  q?: string;
}): PlacementRegion[] {
  const q = normalizeSearchText(opts.q ?? "");
  let regions =
    opts.region && opts.region !== "all"
      ? placementRegions.filter((r) => r.id === opts.region)
      : placementRegions;

  if (!q) return regions;

  return regions
    .map((r) => ({
      ...r,
      directPartners: r.directPartners.filter((s) => matchesSearchQuery(s, r, q)),
      leadingSchools: r.leadingSchools.filter((s) => matchesSearchQuery(s, r, q)),
    }))
    .filter((r) => r.directPartners.length > 0 || r.leadingSchools.length > 0);
}

export const directPartnerCount = placementRegions.reduce(
  (n, r) => n + r.directPartners.length,
  0,
);
