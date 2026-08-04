import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  scoutEnquirySchema,
  countries,
  enums,
  type ScoutEnquiryInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea, NativeSelect } from "./Field";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const fieldOrder: (keyof ScoutEnquiryInput & string)[] = [
  "scout_name",
  "organisation",
  "email",
  "phone",
  "country",
  "athletes_of_interest",
  "proposal",
  "additional_context",
  "consent",
];

export function ScoutEnquiryForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<ScoutEnquiryInput>({
    resolver: zodResolver(scoutEnquirySchema),
    defaultValues: { kind: "scout", company_website: "" },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry(data);
      if (res.ok) {
        navigate({
          to: "/enquiry/thanks",
          search: { kind: "scout", ref: res.ref },
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
      <input type="hidden" name="kind" value="scout" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <FormStatus errors={errors} fieldOrder={fieldOrder} message={serverMessage} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="scout_name" label="Scout / Club name" required error={errors.scout_name?.message}>
          {(p) => (
            <TextInput {...p} {...register("scout_name")} name="scout_name" />
          )}
        </Field>
        <Field id="organisation" label="Organisation" required error={errors.organisation?.message}>
          {(p) => (
            <TextInput {...p} {...register("organisation")} name="organisation" />
          )}
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="email" label="Email" required error={errors.email?.message}>
          {(p) => (
            <TextInput {...p} type="email" {...register("email")} name="email" />
          )}
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone?.message}>
          {(p) => (
            <TextInput {...p} type="tel" {...register("phone")} name="phone" />
          )}
        </Field>
      </div>

      <Field id="country" label="Country" required error={errors.country?.message}>
        {(p) => (
          <NativeSelect {...p} {...register("country")} name="country" defaultValue="">
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>

      <Field
        id="athletes_of_interest"
        label="Athlete(s) of interest"
        required
        hint="Name, current school/club, sport."
        error={errors.athletes_of_interest?.message}
      >
        {(p) => (
          <TextArea
            rows={4}
            {...p}
            {...register("athletes_of_interest")}
            name="athletes_of_interest"
          />
        )}
      </Field>

      <Field id="proposal" label="What are you proposing?" required error={errors.proposal?.message}>
        {(p) => (
          <NativeSelect {...p} {...register("proposal")} name="proposal" defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            {enums.scoutProposals.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>

      <Field
        id="additional_context"
        label="Additional context"
        error={errors.additional_context?.message}
      >
        {(p) => (
          <TextArea
            rows={4}
            {...p}
            {...register("additional_context")}
            name="additional_context"
          />
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
          I agree to be contacted about this enquiry.{" "}
          <span aria-hidden className="text-destructive">*</span>
          {errors.consent ? (
            <span role="alert" className="mt-1 block text-xs font-medium text-destructive">
              {errors.consent.message}
            </span>
          ) : null}
        </span>
      </label>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-micro inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
