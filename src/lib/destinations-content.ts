export type LivingExpenseRow = {
  region: string;
  amount: string;
};

export type DestinationStory = {
  title: string;
  body: string;
};

export type DestinationContent = {
  slug: string;
  label: string;
  blurb: string;
  narrative: string;
  image: string;
  alt: string;
  tuitionPerYear: string;
  livingExpenses: LivingExpenseRow[];
  stories: DestinationStory[];
};

export const DESTINATIONS: DestinationContent[] = [
  {
    slug: "uk",
    label: "United Kingdom",
    blurb: "Oxford, Cambridge and centuries of boarding tradition.",
    narrative:
      "A world-class destination for school education, home to boarding schools with centuries of academic tradition and some of the most respected qualifications in the world. The UK system can look complicated from the outside — GCSEs, A-Levels, IB, sixth form — but it is also one of the most flexible once you understand how the pieces fit together. We help families weigh curriculum, culture, and long-term university goals before recommending a shortlist.",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1920&q=80",
    alt: "Oxford's honey-stone college spires at dusk",
    tuitionPerYear: "From ~£25,000+",
    livingExpenses: [
      { region: "London", amount: "~$13,900" },
      { region: "Elsewhere", amount: "~$11,700" },
    ],
    stories: [
      {
        title: "Scholarship placement · Mount St. Mary",
        body: "An alumna of Day Waterman College was awarded a full scholarship to study her A-Levels at Mount St. Mary — a placement built on matching her academic profile precisely to a school's scholarship criteria, not chasing league tables.",
      },
      {
        title: "Boarding beyond London",
        body: "Families often assume the best UK schools sit inside the M25. We regularly place students into strong boarding communities in Kent, Shropshire, and Cumbria — where pastoral care, house culture, and outcomes matter as much as the postcode.",
      },
    ],
  },
  {
    slug: "usa",
    label: "USA",
    blurb: "Day schools and boarding with strong university pathways.",
    narrative:
      "From day schools across the US to boarding options with strong pathway records into American universities, the US offers breadth — liberal arts foundations, AP coursework, and specialist programmes that suit different learners. We shortlist schools where your child's strengths and ambitions align with the admissions culture, not just the brand name on the gate.",
    image:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1920&q=80",
    alt: "US school campus representing American day and boarding options",
    tuitionPerYear: "From ~$25,000+",
    livingExpenses: [
      { region: "LA / NY / DC / TX", amount: "~$22,000–$27,000" },
      { region: "Boston", amount: "~$20,000–$24,000" },
      { region: "Elsewhere", amount: "~$17,000–$22,000" },
    ],
    stories: [
      {
        title: "Day school vs. boarding",
        body: "Many Nigerian families start with US day schools near a guardian or host family, then move into boarding once their child is settled. We coordinate both — and the guardianship contracts that often sit alongside them.",
      },
      {
        title: "AP and university pathways",
        body: "For students targeting competitive US universities, we place into schools where AP offerings, counselling, and alumni outcomes support the application story — not just the transcript.",
      },
    ],
  },
  {
    slug: "canada",
    label: "Canada",
    blurb: "Academic rigour at a lower cost of living than the US or UK.",
    narrative:
      "Canada's boarding and day schools are a strong option for families weighing academic rigour against living costs. OSSD pathways, welcoming communities, and clear progression into Canadian universities make it an increasingly popular choice — especially for families who want North American credentials without US price tags in every city.",
    image: "/destinations/canada.jpg",
    alt: "Toronto skyline and harbour representing Canadian school destinations",
    tuitionPerYear: "From ~C$25,000+",
    livingExpenses: [{ region: "Typical range", amount: "~$20,000–$25,000 CAD" }],
    stories: [
      {
        title: "Toronto and beyond",
        body: "We place students into day and boarding options across Ontario and other provinces — matching school culture and academic level, not just proximity to a single city.",
      },
      {
        title: "OSSD as a foundation",
        body: "For students arriving from Nigerian or British curricula, we explain how the Canadian Secondary Diploma fits their timeline — and which schools offer the bridge support they will need.",
      },
    ],
  },
  {
    slug: "europe",
    label: "Rest of Europe & Beyond",
    blurb: "Switzerland, Australia, Kenya and other destinations.",
    narrative:
      "Beyond the UK, US, and Canada, we place students into international schools across Switzerland, the Netherlands, Australia, Kenya, and other destinations. These routes suit families weighing language, lifestyle, and long-term mobility — whether that means an English-medium IB school in Europe or a boarding option further afield.",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1920&q=80",
    alt: "Historic European city rooftops at sunset",
    tuitionPerYear: "From ~€25,000+",
    livingExpenses: [{ region: "Typical range", amount: "~€7,000–€11,000" }],
    stories: [
      {
        title: "Switzerland and the IB",
        body: "European placements often centre on rigorous IB programmes and multilingual environments — we shortlist schools where your child will thrive socially, not just academically.",
      },
      {
        title: "Destinations further afield",
        body: "From Australia to Kenya, we advise on schools where MOE has active relationships — so the recommendation comes from experience, not a brochure.",
      },
    ],
  },
];

export const DESTINATION_BY_SLUG = Object.fromEntries(
  DESTINATIONS.map((d) => [d.slug, d]),
) as Record<string, DestinationContent>;

export function getDestination(slug: string): DestinationContent | undefined {
  return DESTINATION_BY_SLUG[slug];
}
