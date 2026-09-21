import { Link } from "@tanstack/react-router";
import { IcefBadge } from "./IcefBadge";

const LINK_GROUPS = [
  {
    title: "Explore",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/destinations", label: "Destinations" },
      { to: "/schools", label: "Schools" },
      { to: "/process", label: "Process" },
      { to: "/contact", label: "Contact" },
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
      { to: "/athletex/enquiry", label: "Enquiry" },
      { to: "/athletex/scouts", label: "For scouts" },
    ],
  },
  {
    title: "Connect",
    links: [
      { to: "/insights", label: "Blogs" },
      { to: "/events", label: "Events" },
      { to: "/enquire", label: "Enquire" },
    ],
  },
] as const;

const LEGAL_LINKS = [
  { to: "/legal/privacy", label: "Privacy" },
  { to: "/legal/terms", label: "Terms" },
  { to: "/legal/cookies", label: "Cookies" },
  { to: "/legal/safeguarding", label: "Safeguarding" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[color:var(--brand-ink)] text-[color:var(--brand-paper)]">
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand + accreditation */}
            <div className="lg:col-span-4">
              <Link
                to="/"
                className="inline-block transition-opacity hover:opacity-90"
                aria-label="Morgan Oxford Education — home"
              >
                <img
                  src="/logo2.png"
                  alt="Morgan Oxford Education"
                  className="h-11 w-auto max-w-[12rem] sm:h-12"
                  width={500}
                  height={500}
                  decoding="async"
                />
              </Link>
              {/* <p className="mt-3 max-w-xs text-sm leading-relaxed text-[color:var(--brand-paper)]/70">
                Independent school placement from Oxford and across Nigeria — guided end-to-end for
                families and student-athletes.
              </p> */}

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
                  Accredited
                </p>
                <div className="mt-4">
                  <IcefBadge />
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[color:var(--brand-paper)]/50">
                  ICEF-accredited agency — independently verified for quality education agency
                  standards.
                </p>
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:gap-6">
              {LINK_GROUPS.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-gold)]">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="text-sm text-[color:var(--brand-paper)]/75 transition-colors hover:text-[color:var(--brand-paper)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-[color:var(--brand-paper)]/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} Morgan Oxford Education · Oxford, UK
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="transition-colors hover:text-[color:var(--brand-paper)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
