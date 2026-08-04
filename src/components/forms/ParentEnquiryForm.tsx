import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  parentEnquirySchema,
  enums,
  type ParentEnquiryInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea, NativeSelect } from "./Field";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const fieldOrder: (keyof ParentEnquiryInput & string)[] = [
  "parent_name",
  "email",
  "phone",
  "child_school_year",
  "exploring",
  "destination",
  "destination_other",
  "target_start",
  "about_child",
  "consent",
];

export function ParentEnquiryForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<ParentEnquiryInput>({
    resolver: zodResolver(parentEnquirySchema),
    defaultValues: {
      kind: "parent",
      phone: "+234",
      marketing_opt_in: false,
      company_website: "",
    },
  });

  const destination = watch("destination");

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry(data);
      if (res.ok) {
        navigate({
          to: "/enquiry/thanks",
          search: { kind: "parent", ref: res.ref },
        });
      } else {
        setServerMessage(res.message);
      }
    },
    () => {
      const first = fieldOrder.find((k) => errors[k]);
      if (first) setFocus(first as never);
    },
  );

  return (
    <form
      method="post"
      action="/api/enquiries"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="kind" value="parent" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <FormStatus errors={errors} fieldOrder={fieldOrder} message={serverMessage} />

      <Field
        id="parent_name"
        label="Parent / Guardian full name"
        required
        error={errors.parent_name?.message}
      >
        {(p) => (
          <TextInput
            {...p}
            autoComplete="name"
            {...register("parent_name")}
            name="parent_name"
          />
        )}
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="email" label="Email" required error={errors.email?.message}>
          {(p) => (
            <TextInput
              {...p}
              type="email"
              autoComplete="email"
              {...register("email")}
              name="email"
            />
          )}
        </Field>
        <Field id="phone" label="Phone (with country code)" required error={errors.phone?.message}>
          {(p) => (
            <TextInput
              {...p}
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              name="phone"
            />
          )}
        </Field>
      </div>

      <Field
        id="child_school_year"
        label="Child's current school & year / grade"
        error={errors.child_school_year?.message}
      >
        {(p) => (
          <TextInput
            {...p}
            {...register("child_school_year")}
            name="child_school_year"
            placeholder="e.g. Grange School, Year 9"
          />
        )}
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="exploring" label="What are you exploring?" required error={errors.exploring?.message}>
          {(p) => (
            <NativeSelect {...p} {...register("exploring")} name="exploring" defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              {enums.exploringOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field id="target_start" label="Target start term" required error={errors.target_start?.message}>
          {(p) => (
            <NativeSelect {...p} {...register("target_start")} name="target_start" defaultValue="">
              <option value="" disabled>
                Select a term
              </option>
              {enums.startTerms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      </div>

      <Field id="destination" label="Target destination" required error={errors.destination?.message}>
        {(p) => (
          <NativeSelect {...p} {...register("destination")} name="destination" defaultValue="">
            <option value="" disabled>
              Select a destination
            </option>
            {enums.targetDestinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>

      {destination === "Rest of Europe & Beyond" && (
        <Field
          id="destination_other"
          label="Other destination (optional)"
          error={errors.destination_other?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              {...register("destination_other")}
              name="destination_other"
              placeholder="e.g. Switzerland, Australia, Kenya…"
            />
          )}
        </Field>
      )}

      <Field
        id="about_child"
        label="Tell us about your child"
        required
        hint="20–2000 characters."
        error={errors.about_child?.message}
      >
        {(p) => (
          <TextArea rows={6} {...p} {...register("about_child")} name="about_child" />
        )}
      </Field>

      <label className="flex items-start gap-3 text-sm">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4"
          {...register("consent")}
          name="consent"
          aria-invalid={!!errors.consent}
          aria-required
        />
        <span>
          I agree to be contacted about my enquiry.{" "}
          <span aria-hidden className="text-destructive">*</span>
          {errors.consent ? (
            <span role="alert" className="mt-1 block text-xs font-medium text-destructive">
              {errors.consent.message}
            </span>
          ) : null}
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input
          id="marketing_opt_in"
          type="checkbox"
          className="mt-1 h-4 w-4"
          {...register("marketing_opt_in")}
          name="marketing_opt_in"
        />
        <span>Send me occasional updates from Morgan Oxford Education.</span>
      </label>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm btn-micro hover:bg-primary/90 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send my enquiry"}
        </button>
      </div>
    </form>
  );
}
