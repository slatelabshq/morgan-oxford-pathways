import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/athletex/about")({
  head: () => ({
    meta: [
      { title: "About AthleteX" },
      { name: "description", content: "The AthleteX athlete pathway — origin, coaches, scouting network." },
      { property: "og:title", content: "About AthleteX" },
      { property: "og:description", content: "The athlete pathway by Morgan Oxford." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="AthleteX"
      title="Built for athletes, backed by placement."
      crumbs={[{ label: "Home", to: "/" }, { label: "AthleteX", to: "/athletex" }, { label: "About" }]}
    />
  ),
});
