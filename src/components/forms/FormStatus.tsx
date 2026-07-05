import type { FieldErrors, FieldValues } from "react-hook-form";

export function FormStatus<T extends FieldValues>({
  errors,
  fieldOrder,
  message,
}: {
  errors: FieldErrors<T>;
  fieldOrder: (keyof T & string)[];
  message?: string;
}) {
  const entries = fieldOrder
    .map((name) => ({
      name,
      message: (errors as Record<string, { message?: string } | undefined>)[name]
        ?.message,
    }))
    .filter((e) => !!e.message) as { name: string; message: string }[];

  if (entries.length === 0 && !message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
    >
      {message ? (
        <p className="font-medium">{message}</p>
      ) : (
        <>
          <p className="font-medium">
            {entries.length} problem{entries.length === 1 ? "" : "s"} to fix — see
            highlighted fields.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {entries.map((e) => (
              <li key={e.name}>
                <a
                  href={`#${e.name}`}
                  className="underline underline-offset-2 hover:no-underline"
                >
                  {e.message}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
