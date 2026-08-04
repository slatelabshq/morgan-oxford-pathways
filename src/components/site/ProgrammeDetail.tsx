import { Link } from "@tanstack/react-router";

type ProgrammeDetailProps = {
  title: string;
  intro: string;
  bullets: string[];
  slug: string;
};

export function ProgrammeDetail({ title, intro, bullets, slug }: ProgrammeDetailProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
      <ul className="mt-8 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--brand-gold)]" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Link
          to="/enquire/contact"
          className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Talk to us about {title.toLowerCase()} →
        </Link>
      </div>
    </div>
  );
}

export function ProgrammeCrumbs(label: string): { label: string; to?: string }[] {
  return [
    { label: "Home", to: "/" },
    { label: "Programmes", to: "/programmes" },
    { label },
  ];
}
