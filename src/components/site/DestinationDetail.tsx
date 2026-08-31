import { Link } from "@tanstack/react-router";
import type { DestinationContent } from "@/lib/destinations-content";

type Props = {
  destination: DestinationContent;
};

export function DestinationDetail({ destination }: Props) {
  return (
    <article className="mx-auto max-w-4xl">
      <div className="aspect-[21/9] w-full overflow-hidden rounded-3xl bg-muted">
        <img
          src={destination.image}
          alt={destination.alt}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {destination.narrative}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="card-glow rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Tuition
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-foreground">
            {destination.tuitionPerYear}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">per year, school fees only</p>
        </section>

        <section className="card-glow rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
            Living expenses
          </p>
          <ul className="mt-4 space-y-3">
            {destination.livingExpenses.map((row) => (
              <li
                key={row.region}
                className="flex items-start justify-between gap-4 text-sm sm:text-base"
              >
                <span className="text-muted-foreground">{row.region}</span>
                <span className="font-semibold text-foreground">{row.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Indicative annual ranges — varies by school location and lifestyle.
          </p>
        </section>
      </div>

      <section className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
          Placements & outcomes
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
          What this looks like in practice.
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {destination.stories.map((story) => (
            <blockquote
              key={story.title}
              className="card-glow flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {story.title}
              </p>
              <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                {story.body}
              </p>
            </blockquote>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Link
          to="/enquire/contact"
          className="btn-glow inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Talk to us about {destination.label} →
        </Link>
      </div>
    </article>
  );
}
