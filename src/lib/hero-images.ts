import type { HeroImage } from "@/components/site/PageHero";

const p = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop`;

export const HERO: Record<string, HeroImage> = {
  home: {
    src: p("208701"),
    alt: "Oxford college quadrangle at golden hour",
    titleAccent: "Oxford",
  },
  about: {
    src: p("2041540"),
    alt: "Grand historic library reading room lined with books",
    titleAccent: "story",
  },
  schools: {
    src: p("289737"),
    alt: "Elegant British boarding school building at dusk",
    titleAccent: "future",
  },
  programmes: {
    src: p("1181396"),
    alt: "Students collaborating around a table in bright natural light",
    titleAccent: "journey",
  },
  athletex: {
    src: p("2402777"),
    alt: "Athlete on a floodlit stadium running track",
    titleAccent: "excellence",
  },
  insights: {
    src: p("1370295"),
    alt: "Open book resting on a dark polished wooden desk",
    titleAccent: "ideas",
  },
  process: {
    src: p("1181534"),
    alt: "Focused student writing at a desk in warm light",
    titleAccent: "step by step",
  },
  contact: {
    src: p("1454360"),
    alt: "Historic Oxford sandstone buildings on a bright afternoon",
    titleAccent: "in touch",
  },
};
