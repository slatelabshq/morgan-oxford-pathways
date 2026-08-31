import { Link } from "@tanstack/react-router";

const COLS = [
  {
    title: "Explore",
    links: [
      { to: "/", label: "Home" },
      { to: "/process", label: "Process" },
      { to: "/schools", label: "Browse all schools" },
      { to: "/insights", label: "Blogs" },
      { to: "/events", label: "Events" },
      { to: "/enquire", label: "Enquire" },
    ],
  },
  {
    title: "Programmes",
    links: [
      { to: "/programmes", label: "All programmes" },
      { to: "/programmes/day-school", label: "Day school" },
      { to: "/programmes/boarding", label: "Boarding" },
      { to: "/programmes/sixth-form", label: "Sixth Form" },
      { to: "/programmes/summer", label: "Summer" },
      { to: "/programmes/guardianship", label: "Guardianship" },
    ],
  },
  {
    title: "AthleteX",
    links: [
      { to: "/athletex", label: "AthleteX home" },
      { to: "/athletex/scholarship", label: "Scholarship" },
      { to: "/athletex/scouts", label: "For scouts" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/insights", label: "Blogs" },
      { to: "/events", label: "Events" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-foreground/80 hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold text-foreground">
              Morgan Oxford Education
            </span>
            <span aria-hidden>·</span>
            <span>Oxford, UK</span>
            <span aria-hidden>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/terms">Terms</Link>
            <Link to="/legal/cookies">Cookies</Link>
            <Link to="/legal/safeguarding">Safeguarding</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
