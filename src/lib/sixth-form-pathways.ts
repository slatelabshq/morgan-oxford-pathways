export type SixthFormPathway = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

const img = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=960&h=640&fit=crop`;

export const SIXTH_FORM_INTRO =
  "For students weighing up post-16 options, we place students into sixth-form colleges and pathway providers chosen for their social, academic and pastoral strengths — not just their exam scores.";

export const SIXTH_FORM_BULLETS = [
  "Clear guidance across sixth form, foundation, and vocational routes",
  "Shortlisting based on your child's strengths and fit — not just matching results to schools",
  "Entrance exam and interview preparation through our partner tutors",
] as const;

export const SIXTH_FORM_PATHWAYS: SixthFormPathway[] = [
  {
    title: "A-Levels",
    body: "The UK's two-year gold standard for Russell Group and competitive UK university entry — typically three or four subjects studied in depth.",
    image: img("1181534"),
    alt: "Student studying at a desk with notes and textbooks",
  },
  {
    title: "IB Diploma",
    body: "A globally recognised programme spanning six subject groups, theory of knowledge, and an extended essay — strong for universities worldwide.",
    image: img("1181671"),
    alt: "Students collaborating in a bright classroom",
  },
  {
    title: "Canadian Secondary Diploma",
    body: "OSSD and Canadian high-school pathways for families targeting universities in Canada and North America, with clear credit and progression structures.",
    image: img("289737"),
    alt: "Modern school campus representing Canadian secondary education",
  },
  {
    title: "AP",
    body: "Advanced Placement courses for US-bound students — college-level study that strengthens applications and can earn university credit.",
    image: img("5905709"),
    alt: "Student working through advanced coursework on a laptop",
  },
  {
    title: "Foundations",
    body: "International Foundation Year and pre-university programmes that bridge the gap between school qualifications and degree-level study abroad.",
    image: img("1181396"),
    alt: "University pathway students in a seminar-style setting",
  },
];
