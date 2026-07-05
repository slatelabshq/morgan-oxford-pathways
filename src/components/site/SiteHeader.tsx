import { Link, useRouterState } from "@tanstack/react-router";
import { PathwayPill } from "./PathwayPill";

const CORE_NAV = [
  { to: "/schools", label: "Schools" },
  { to: "/programmes", label: "Programmes" },
  { to: "/process", label: "Process" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
] as const;

const ATHLETEX_NAV = [
  { to: "/athletex/sports", label: "Sports" },
  { to: "/athletex/schools", label: "Schools" },
  { to: "/athletex/scholarship", label: "Scholarship" },
  { to: "/athletex/success", label: "Success Stories" },
  { to: "/athletex/scouts", label: "For Scouts" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAthleteX = pathname.startsWith("/athletex");
  const nav = isAthleteX ? ATHLETEX_NAV : CORE_NAV;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          to={isAthleteX ? "/athletex" : "/"}
          className="font-display text-lg font-semibold tracking-tight"
        >
          {isAthleteX ? (
            <span>
              Athlete<span className="text-primary">X</span>
            </span>
          ) : (
            <span>Morgan Oxford</span>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground font-semibold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <PathwayPill zone={isAthleteX ? "athletex" : "core"} />
          <Link
            to={isAthleteX ? "/athletex/scholarship" : "/enquire"}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isAthleteX ? "Apply" : "Enquire"}
          </Link>
        </div>
      </div>
    </header>
  );
}
