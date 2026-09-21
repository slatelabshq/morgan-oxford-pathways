import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { PathwayPill } from "./PathwayPill";
import { SiteMobileNav } from "./SiteMobileNav";
import { cn } from "@/lib/utils";

const CORE_NAV = [
  { to: "/about", label: "About" },
  { to: "/programmes", label: "Programmes" },
  { to: "/destinations", label: "Destinations" },
  { to: "/schools", label: "Schools" },
  { to: "/process", label: "Process" },
  { to: "/events", label: "Events" },
  { to: "/insights", label: "Blogs" },
  { to: "/contact", label: "Contact" },
] as const;

const ATHLETEX_NAV = [
  { to: "/athletex/schools", label: "Schools" },
  { to: "/athletex/enquiry", label: "Enquiry" },
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
    <span className="relative block h-10 w-[8.5rem] shrink-0 sm:h-11 sm:w-[9.5rem]">
      <img
        src="/athletex_logo.png"
        alt="AthleteX"
        className="h-full w-full object-contain object-left"
        width={152}
        height={44}
        decoding="async"
      />
    </span>
  ) : (
    <span
      className="relative block h-16 w-[9.25rem] shrink-0 overflow-hidden sm:w-[10.25rem] md:w-[11.5rem]"
    >
      <img
        src="/logo.png"
        alt="Morgan Oxford Education"
        className="absolute left-0 top-[47%] h-[7.5rem] w-[7.5rem] max-w-none -translate-y-1/2 sm:h-[8rem] sm:w-[8rem] md:h-[8.5rem] md:w-[8.5rem]"
        width={500}
        height={500}
        decoding="async"
      />
    </span>
  );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 ease-in-out",
          scrolled
            ? "glass border-b border-white/10 shadow-sm"
            : "glass-subtle border-b border-transparent",
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-1.5 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            to={isAthleteX ? "/athletex" : "/"}
            className="relative z-10 shrink-0"
          >
            {brand}
          </Link>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 justify-center px-4 md:flex lg:absolute lg:left-1/2 lg:top-1/2 lg:flex-none lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-0"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] font-medium lg:gap-x-6 lg:text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="whitespace-nowrap text-foreground/80 transition-colors hover:text-foreground"
                    activeProps={{ className: "text-foreground font-semibold" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 ml-auto flex items-center gap-3">
            <div className="hidden md:block">
              <PathwayPill zone={isAthleteX ? "athletex" : "core"} />
            </div>
            <Link
              to={isAthleteX ? "/athletex/enquiry" : "/enquire"}
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
