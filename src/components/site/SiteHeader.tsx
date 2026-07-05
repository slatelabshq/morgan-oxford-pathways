import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { PathwayPill } from "./PathwayPill";
import { SiteMobileNav } from "./SiteMobileNav";
import { cn } from "@/lib/utils";

const CORE_NAV = [
  { to: "/programmes", label: "Services" },
  { to: "/schools", label: "Destinations" },
  { to: "/process", label: "Process" },
  { to: "/insights", label: "Success Stories" },
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

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const brand = isAthleteX ? (
    <span>
      Athlete<span className="text-primary">X</span>
    </span>
  ) : (
    <span>Morgan Oxford</span>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300 ease-in-out",
          scrolled
            ? "border-border bg-background/85 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-sm",
        )}
      >
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
            {brand}
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
            <div className="hidden md:block">
              <PathwayPill zone={isAthleteX ? "athletex" : "core"} />
            </div>
            <Link
              to={isAthleteX ? "/athletex/scholarship" : "/enquire"}
              className="btn-micro hidden h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:inline-flex"
            >
              {isAthleteX ? "Apply" : "Enquire"}
            </Link>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="btn-micro inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-muted hover:text-foreground md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <SiteMobileNav
        open={open}
        onClose={() => setOpen(false)}
        nav={nav}
        isAthleteX={isAthleteX}
        triggerRef={triggerRef}
        brand={brand}
      />
    </>
  );
}
