export type Sport = "soccer" | "basketball" | "swimming";

export type AthleteXSchool = {
  name: string;
  location: string;
  country: string;
  sports: Sport[];
  note: string;
};

export type AthleteXRegion = {
  id: "uk" | "canada" | "usa" | "europe";
  label: string;
  blurb: string;
  schools: AthleteXSchool[];
};

const S = {
  soc: ["soccer"] as Sport[],
  bb: ["basketball"] as Sport[],
  sw: ["swimming"] as Sport[],
  socBb: ["soccer", "basketball"] as Sport[],
  socSw: ["soccer", "swimming"] as Sport[],
  swBb: ["swimming", "basketball"] as Sport[],
  all: ["soccer", "swimming", "basketball"] as Sport[],
};

export const athletexRegions: AthleteXRegion[] = [
  {
    id: "uk",
    label: "United Kingdom",
    blurb: "Independent schools with credible pathways into professional sport — including partnerships with PSG, Southampton FC and Manchester United.",
    schools: [
      { name: "Ackworth School", location: "West Yorkshire", country: "UK", sports: S.soc, note: "Football academy; partners with PSG." },
      { name: "LVS Ascot", location: "Ascot, Berkshire", country: "UK", sports: S.soc, note: "Football academy; partners with Southampton FC." },
      { name: "Royal Russell School", location: "Surrey", country: "UK", sports: S.soc, note: "Pathway into professional football." },
      { name: "Brentwood School", location: "Essex", country: "UK", sports: S.sw, note: "General school sports programme." },
      { name: "Windermere School", location: "Cumbria", country: "UK", sports: S.socBb, note: "Sports offered as part of the curriculum." },
      { name: "Marymount International School", location: "Kingston upon Thames", country: "UK", sports: S.socBb, note: "All-girls school." },
      { name: "Cardiff Sixth Form College", location: "Cambridge", country: "UK", sports: S.socBb, note: "General school sports programme." },
      { name: "Kneller Hall School", location: "Twickenham", country: "UK", sports: S.socBb, note: "Formerly Radnor House, Twickenham." },
      { name: "Rochester Independent College", location: "Rochester", country: "UK", sports: S.socBb, note: "General school sports programme." },
      { name: "Cobham Hall School", location: "Kent", country: "UK", sports: S.socSw, note: "Swimming is an extracurricular activity." },
      { name: "Ellesmere College", location: "Shropshire", country: "UK", sports: S.socSw, note: "Partnership with PSG. Swimming academy from Year 5." },
      { name: "Bethany School", location: "Kent", country: "UK", sports: S.socSw, note: "Football Excellence pathway with Manchester United; swimming in general sports." },
      { name: "Devonshire Preparatory School", location: "London", country: "UK", sports: S.socSw, note: "General school sports programme." },
      { name: "Mill Hill School", location: "London", country: "UK", sports: S.all, note: "Swimming and basketball are elective." },
      { name: "St Bees School", location: "Cumbria", country: "UK", sports: S.all, note: "General school sports programme." },
      { name: "St Lawrence College", location: "Kent", country: "UK", sports: S.all, note: "Competitive swimming pathway; football and basketball in general sports." },
      { name: "The Leys School", location: "Cambridge", country: "UK", sports: S.all, note: "Links with the City of Cambridge Swimming Club." },
      { name: "St Andrews College", location: "Cambridge", country: "UK", sports: S.all, note: "General school sports programme." },
      { name: "Earlscliffe", location: "Folkestone", country: "UK", sports: S.all, note: "Competitive basketball and soccer teams; swimming is recreational." },
      { name: "Sidcot School", location: "Winscombe", country: "UK", sports: S.all, note: "Supports students building a career from available sport programmes." },
    ],
  },
  {
    id: "canada",
    label: "Canada",
    blurb: "Boarding and day schools across Canada with varsity soccer, basketball and swimming programmes — from British Columbia to the Maritimes.",
    schools: [
      { name: "Ridley College", location: "St. Catharines, ON", country: "Canada", sports: S.bb, note: "General school sports programme." },
      { name: "Brookes Westshore", location: "Victoria, BC", country: "Canada", sports: S.bb, note: "General school sports programme." },
      { name: "Shawnigan Lake School", location: "Shawnigan Lake, BC", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "Rosseau Lake College", location: "Rosseau, ON", country: "Canada", sports: S.socBb, note: "Varsity soccer; basketball is recreational." },
      { name: "King's-Edgehill School", location: "Windsor, NS", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "Luther College High School", location: "Regina, SK", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "St John's-Kilmarnock School", location: "Breslau, ON", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "St John's-Ravenscourt School", location: "Winnipeg, MB", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "TAIE Institute", location: "Thornhill, ON", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "Maclachlan College", location: "Oakville, ON", country: "Canada", sports: S.socBb, note: "General school sports programme." },
      { name: "Fort Erie International Academy", location: "Fort Erie, ON", country: "Canada", sports: S.socBb, note: "Competitive sports programme." },
      { name: "Blyth Academy", location: "Ontario", country: "Canada", sports: S.socSw, note: "General school sports programme." },
      { name: "Lakefield College School", location: "Lakefield, ON", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "St George's School", location: "Vancouver, BC", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Queen Margaret's School", location: "Duncan, BC", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Brentwood College School", location: "Mill Bay, BC", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Stanstead College", location: "Quebec", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Appleby College", location: "Oakville, ON", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Ashbury College", location: "Ottawa, ON", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Athol Murray College of Notre Dame", location: "Wilcox, SK", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Bishop Strachan School", location: "Toronto, ON", country: "Canada", sports: S.all, note: "All-girls school." },
      { name: "Trinity College School", location: "Port Hope, ON", country: "Canada", sports: S.all, note: "General school sports programme." },
      { name: "Albert College", location: "Belleville, ON", country: "Canada", sports: S.all, note: "Available from Grade 7–12." },
      { name: "Trafalgar Castle School", location: "Whitby, ON", country: "Canada", sports: S.all, note: "All-girls school." },
      { name: "Bodwell High School", location: "North Vancouver, BC", country: "Canada", sports: S.all, note: "Recreational sports programme." },
    ],
  },
  {
    id: "usa",
    label: "United States",
    blurb: "Elite US prep schools with strong varsity athletics and clear college-recruitment pathways.",
    schools: [
      { name: "North Broward Preparatory School", location: "Coconut Creek, FL", country: "USA", sports: S.bb, note: "High school students only." },
      { name: "Forman School", location: "Connecticut", country: "USA", sports: S.socBb, note: "General school sports programme." },
      { name: "Fryeburg Academy", location: "Maine", country: "USA", sports: S.socBb, note: "Competitive school athletic programme." },
      { name: "The Newman School", location: "Boston", country: "USA", sports: S.socBb, note: "General school sports programme." },
      { name: "The Ross School", location: "East Hampton, NY", country: "USA", sports: S.socBb, note: "Offered as electives from Grade 6–12." },
      { name: "Phillips Exeter Academy", location: "New Hampshire", country: "USA", sports: S.socBb, note: "Varsity sports." },
      { name: "Groton School", location: "Massachusetts", country: "USA", sports: S.socBb, note: "Both varsity and recreational." },
      { name: "Léman Manhattan Preparatory School", location: "New York", country: "USA", sports: S.swBb, note: "General school sports programme." },
      { name: "Florida Prep Academy", location: "Melbourne, FL", country: "USA", sports: S.swBb, note: "General school sports programme." },
      { name: "Thornton Academy", location: "Maine", country: "USA", sports: S.all, note: "General school sports programme." },
      { name: "Hyde School", location: "Maine", country: "USA", sports: S.all, note: "General school sports programme." },
      { name: "Choate Rosemary Hall", location: "Connecticut", country: "USA", sports: S.all, note: "Strong varsity athletics with college-athlete development." },
      { name: "Riverdale Country School", location: "New York", country: "USA", sports: S.all, note: "General school sports programme." },
      { name: "British International School of Houston", location: "Houston, TX", country: "USA", sports: S.all, note: "Varsity sports." },
      { name: "Fairmont Schools", location: "Anaheim, CA", country: "USA", sports: S.all, note: "Varsity sports." },
      { name: "Woodside Priory School", location: "Portola Valley, CA", country: "USA", sports: S.all, note: "General school sports programme." },
    ],
  },
  {
    id: "europe",
    label: "Europe & Beyond",
    blurb: "International schools across mainland Europe — several with Manchester City FC and tournament-team pathways.",
    schools: [
      { name: "Amadeus International School", location: "Vienna", country: "Austria", sports: S.all, note: "Swimming programme still in development." },
      { name: "Berlin Brandenburg International School", location: "Kleinmachnow", country: "Germany", sports: S.all, note: "Grade 6–12; competes in the GISST tournament." },
      { name: "International School of Athens", location: "Kifissia", country: "Greece", sports: S.socBb, note: "Varsity teams compete in local and European tournaments." },
      { name: "Blackrock College", location: "Dublin", country: "Ireland", sports: S.all, note: "General school sports programme." },
      { name: "Glenstal Abbey School", location: "Limerick", country: "Ireland", sports: S.all, note: "General school sports programme." },
      { name: "Canadian College Italy", location: "Lanciano", country: "Italy", sports: S.socBb, note: "General school sports programme." },
      { name: "The British School of Lisbon", location: "Lisbon", country: "Portugal", sports: S.socBb, note: "Compulsory after-school activities for all students." },
      { name: "United Lisbon International School", location: "Lisbon", country: "Portugal", sports: S.all, note: "Swimming available Grades 6–10 only." },
      { name: "Colégio Júlio Dinis", location: "Porto", country: "Portugal", sports: S.all, note: "General school sports programme." },
      { name: "CLIP — Oporto International School", location: "Porto", country: "Portugal", sports: S.all, note: "Competitive sports programme." },
      { name: "International College Spain", location: "Madrid", country: "Spain", sports: S.bb, note: "Summer programme (ages 10–19)." },
      { name: "Hamelin-Laie International School", location: "Barcelona", country: "Spain", sports: S.all, note: "Summer programmes only." },
      { name: "La Côte International School", location: "Aubonne", country: "Switzerland", sports: S.soc, note: "Summer programme." },
      { name: "Collège du Léman", location: "Geneva", country: "Switzerland", sports: S.socBb, note: "Competitive school sports." },
      { name: "Aiglon College", location: "Chesières", country: "Switzerland", sports: S.socBb, note: "Partnership with Manchester City FC." },
      { name: "Brillantmont International School", location: "Lausanne", country: "Switzerland", sports: S.socBb, note: "General school sports programme." },
      { name: "Eerde International Boarding School", location: "Ommen", country: "Netherlands", sports: S.socBb, note: "General school sports programme." },
    ],
  },
];

export const athletexSchoolCount = athletexRegions.reduce((n, r) => n + r.schools.length, 0);

export const sportLabel: Record<Sport, string> = {
  soccer: "Soccer",
  basketball: "Basketball",
  swimming: "Swimming",
};
