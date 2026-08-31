import { Link } from "@tanstack/react-router";
import type { EventItem } from "@/lib/events";
import { eventsPageCopy } from "@/lib/events";

function formatRibbonDate(isoOrDisplay: string) {
  const parsed = Date.parse(isoOrDisplay);
  if (Number.isNaN(parsed)) {
    return { month: "—", day: "—", range: isoOrDisplay };
  }
  const d = new Date(parsed);
  return {
    month: d.toLocaleString("en-GB", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    range: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function formatDateRange(event: EventItem) {
  const start = formatRibbonDate(event.startDate);
  if (!event.endDate) return start.range;
  const end = formatRibbonDate(event.endDate);
  if (start.range === end.range) return start.range;
  return `${start.range} – ${end.range}`;
}

function ParticipateLink({ event }: { event: EventItem }) {
  const label = event.participateLabel ?? "Click to participate";
  const className =
    "inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-[color:var(--brand-gold)]";

  if (event.participateUrl.startsWith("/")) {
    return (
      <Link to={event.participateUrl} className={className}>
        {label} <span aria-hidden>→</span>
      </Link>
    );
  }

  return (
    <a
      href={event.participateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label} <span aria-hidden>→</span>
    </a>
  );
}

function EventRibbonCard({ event }: { event: EventItem }) {
  const ribbon = formatRibbonDate(event.startDate);

  return (
    <li className="card-glow group flex overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-[color:var(--brand-gold)]/40">
      <div
        aria-hidden
        className="relative flex w-[5.5rem] shrink-0 flex-col items-center justify-center bg-[color:var(--brand-ink)] px-2 py-6 text-center text-[color:var(--brand-paper)] sm:w-28"
      >
        <div className="absolute inset-y-3 left-0 w-1 rounded-full bg-[color:var(--brand-gold)]" />
        <span className="text-[0.65rem] font-bold tracking-[0.2em]">{ribbon.month}</span>
        <span className="mt-1 font-display text-3xl font-semibold leading-none sm:text-4xl">
          {ribbon.day}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-5 sm:p-7">
        <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          {event.name}
        </h2>
        <p className="text-sm text-muted-foreground">{formatDateRange(event)}</p>
        {event.location ? (
          <p className="text-sm text-muted-foreground">{event.location}</p>
        ) : null}
        <div className="mt-2">
          <ParticipateLink event={event} />
        </div>
      </div>
    </li>
  );
}

type Props = {
  events: EventItem[];
};

export function EventsList({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="card-glow rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          Upcoming
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          {eventsPageCopy.emptyTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          {eventsPageCopy.emptyBody}
        </p>
        <Link
          to="/contact"
          className="btn-glow mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Contact us about events →
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-5" aria-label="Upcoming events">
      {events.map((event) => (
        <EventRibbonCard key={event.id} event={event} />
      ))}
    </ul>
  );
}
