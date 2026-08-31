import type { HeroImage } from "@/components/site/PageHero";

const p = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop`;

export const HERO: Record<string, HeroImage> = {
  home: {
    images: [p("208701"), p("1454360"), p("289737"), p("356065")],
    alt: "Oxford college quadrangle at golden hour",
    titleAccent: "within reach.",
  },
  about: {
    images: [p("2041540"), p("1370295"), p("256541"), p("159711")],
    alt: "Grand historic library reading room lined with books",
    titleAccent: "we serve.",
  },
  schools: {
    images: [
      "/schools/hero/1.jpg",
      "/schools/hero/2.jpg",
      "/schools/hero/3.jpg",
      "/schools/hero/4.jpg",
    ],
    alt: "Partner school campuses and academic environments",
    titleAccent: "your child.",
  },
  destinations: {
    images: [p("289737"), p("1454360"), p("208701"), p("2305098")],
    alt: "International school destinations across the UK, USA, Canada and beyond",
    titleAccent: "your child.",
    titleAccentInline: true,
  },
  programmes: {
    images: [p("1181396"), p("1181533"), p("1181671"), p("5905709")],
    alt: "Students collaborating around a table in bright natural light",
    titleAccent: "properly.",
    titleAccentInline: true,
  },
  athletex: {
    images: [p("34424815"), p("1263426"), p("209977"), p("1263349")],
    alt: "Young student-athletes in school sport settings",
    titleAccent: "your athlete.",
  },
  insights: {
    images: [p("1370295"), p("2041540"), p("256541"), p("1181772")],
    alt: "Open book resting on a dark polished wooden desk",
    titleAccent: "from the placement desk.",
  },
  process: {
    images: [p("1181534"), p("1181671"), p("5905709"), p("1181396")],
    alt: "Focused student writing at a desk in warm light",
    titleAccent: "enrollment.",
    titleAccentInline: true,
  },
  contact: {
    images: [p("1454360"), p("208701"), p("289737"), p("356065")],
    alt: "Historic Oxford sandstone buildings on a bright afternoon",
    titleAccent: "the conversation.",
  },
  events: {
    images: [p("2774556"), p("1181717"), p("7688336"), p("2774552")],
    alt: "Education fair with families speaking to school representatives",
    titleAccent: "near you.",
    titleAccentInline: true,
  },
};
