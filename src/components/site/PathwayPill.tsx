import { Link } from "@tanstack/react-router";

type Props = { zone: "core" | "athletex" };

export function PathwayPill({ zone }: Props) {
  if (zone === "core") {
    return (
      <Link
        to="/athletex"
        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--brand-signal)] bg-[color:var(--brand-jet)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-bone)] transition-transform hover:-translate-y-0.5"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-signal)]" />
        AthleteX
      </Link>
    );
  }
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--brand-royal)] bg-[color:var(--brand-paper)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-royal)] transition-transform hover:-translate-y-0.5"
    >
      <span aria-hidden>←</span>
      Morgan Oxford
    </Link>
  );
}
