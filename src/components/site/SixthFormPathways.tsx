import { cn } from "@/lib/utils";
import { SIXTH_FORM_PATHWAYS, type SixthFormPathway } from "@/lib/sixth-form-pathways";

type Props = {
  className?: string;
  /** Slightly tighter layout when nested inside the programmes index card. */
  compact?: boolean;
};

function PathwayCard({ pathway, compact }: { pathway: SixthFormPathway; compact?: boolean }) {
  return (
    <article className="card-glow flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className={cn("w-full overflow-hidden bg-muted", compact ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <img
          src={pathway.image}
          alt={pathway.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col", compact ? "p-4 sm:p-5" : "p-5 sm:p-6")}>
        <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
          {pathway.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {pathway.body}
        </p>
      </div>
    </article>
  );
}

export function SixthFormPathways({ className, compact }: Props) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        compact ? "lg:grid-cols-3" : "lg:grid-cols-3 xl:gap-6",
        className,
      )}
    >
      {SIXTH_FORM_PATHWAYS.map((pathway) => (
        <div key={pathway.title} className="group">
          <PathwayCard pathway={pathway} compact={compact} />
        </div>
      ))}
    </div>
  );
}
