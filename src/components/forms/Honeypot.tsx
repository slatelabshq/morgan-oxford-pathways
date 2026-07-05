import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

export function Honeypot<T extends FieldValues>({
  register,
  name,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        top: "auto",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <label>
        Company website
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register(name)}
        />
      </label>
    </div>
  );
}
