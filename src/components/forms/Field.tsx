import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    "aria-required": boolean | undefined;
  }) => ReactNode;
};

export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden="true" className="text-destructive">*</span>
            <span className="sr-only"> required</span>
          </>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        "aria-invalid": !!error,
        "aria-describedby": describedBy,
        "aria-required": required || undefined,
      })}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const baseControlClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30";

export const baseTextareaClass =
  "min-h-[7rem] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30";

export const TextInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function TextInput(props, ref) {
    return <input ref={ref} {...props} className={cn(baseControlClass, props.className)} />;
  },
);

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(function TextArea(props, ref) {
  return (
    <textarea ref={ref} {...props} className={cn(baseTextareaClass, props.className)} />
  );
});

export const NativeSelect = forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(function NativeSelect(props, ref) {
  return (
    <select ref={ref} {...props} className={cn(baseControlClass, props.className)} />
  );
});
