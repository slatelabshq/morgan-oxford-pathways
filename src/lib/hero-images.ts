import type { HeroImage } from "@/components/site/PageHero";

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`;

export const HERO: Record<string, HeroImage> = {
  home: {
    src: u("photo-1548786811-dcc851b53908"),
    alt: "Oxford college spires at golden hour",
    credit: { name: "Ben Seymour", url: "https://unsplash.com/photos/G4tPiOEwqBk" },
  },
  about: {
    src: u("photo-1519452575417-564c1401ecc0"),
    alt: "Historic Oxford library reading room with rows of books",
    credit: { name: "Alex Block", url: "https://unsplash.com/photos/6xeDIZgoPaw" },
  },
  schools: {
    src: u("photo-1580537659466-0a9bfa916a54"),
    alt: "British independent school exterior in warm afternoon light",
    credit: { name: "Ivan Aleksic", url: "https://unsplash.com/photos/PDRFeeDniCk" },
  },
  programmes: {
    src: u("photo-1571260899304-425eee4c7efc"),
    alt: "Students in school uniform on a campus lawn",
    credit: { name: "Note Thanun", url: "https://unsplash.com/photos/CYlPykF-r7E" },
  },
  athletex: {
    src: u("photo-1461896836934-ffe607ba8211"),
    alt: "Athletics running track under stadium lights",
    credit: { name: "Braden Collum", url: "https://unsplash.com/photos/9HI8UJMSdZA" },
  },
  insights: {
    src: u("photo-1507842217343-583bb7270b66"),
    alt: "Open book on a wooden desk in a quiet library",
    credit: { name: "Aaron Burden", url: "https://unsplash.com/photos/y02jEX_B0O0" },
  },
  process: {
    src: u("photo-1497633762265-9d179a990aa6"),
    alt: "Student studying with a book and notes at a desk",
    credit: { name: "Ben White", url: "https://unsplash.com/photos/qDY9ahp0Mto" },
  },
  contact: {
    src: u("photo-1523050854058-8df90110c9f1"),
    alt: "Oxford university buildings on a bright afternoon",
    credit: { name: "Sidharth Bhatia", url: "https://unsplash.com/photos/Pv5WeEyxMWU" },
  },
};
