import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";

type NavItem = { to: string; label: string };

type SiteMobileNavProps = {
  open: boolean;
  onClose: () => void;
  nav: readonly NavItem[];
  isAthleteX: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  brand: ReactNode;
};

export function SiteMobileNav({
  open,
  onClose,
  nav,
  isAthleteX,
  triggerRef,
  brand,
}: SiteMobileNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Close on route change
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Scroll lock + Escape + focus management
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  const panelTransition = reduced
    ? { duration: 0 }
    : { type: "tween" as const, duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            key="panel"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="glass fixed right-0 top-0 z-50 flex h-dvh w-[min(320px,85vw)] flex-col border-l border-white/15 shadow-2xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={panelTransition}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="font-display text-lg font-semibold tracking-tight">{brand}</div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="btn-micro inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-2 py-4">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="block rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-muted hover:text-foreground"
                      activeProps={{ className: "bg-muted text-foreground font-semibold" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border p-4">
              <Link
                to={isAthleteX ? "/athletex/scholarship" : "/enquire"}
                onClick={onClose}
                className="btn-micro inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {isAthleteX ? "Apply" : "Enquire"}
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
