import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  generalEnquirySchema,
  type GeneralEnquiryInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea, NativeSelect } from "./Field";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const roleOptions = ["Parent / Guardian", "Student", "School / Agent", "Other"];
const topicOptions = [
  "Tutoring",
  "School placement",
  "AthleteX",
  "Careers",
  "Other",
];

const fieldOrder: (keyof GeneralEnquiryInput & string)[] = [
  "full_name",
  "email",
  "phone",
  "role",
  "topic",
  "message",
  "consent",
];

export function GeneralEnquiryForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<GeneralEnquiryInput>({
    resolver: zodResolver(generalEnquirySchema),
    defaultValues: {
      kind: "general",
      marketing_opt_in: false,
      company_website: "",
    },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry(data);
      if (res.ok) {
        navigate({
          to: "/enquiry/thanks",
          search: { kind: "general", ref: res.ref },
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
      <input type="hidden" name="kind" value="general" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <FormStatus
        errors={errors}
        fieldOrder={fieldOrder}
        message={serverMessage}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field id="full_name" label="Full name" required error={errors.full_name?.message}>
          {(p) => (
            <TextInput
              {...p}
              autoComplete="name"
              {...register("full_name")}
              name="full_name"
            />
          )}
        </Field>
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
        <Field
          id="phone"
          label="Phone"
          hint="Optional — include country code."
          error={errors.phone?.message}
        >
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
        <Field id="role" label="I'm a…" required error={errors.role?.message}>
          {(p) => (
            <NativeSelect {...p} {...register("role")} name="role" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="topic"
          label="Enquiry topic"
          required
          error={errors.topic?.message}
          className="md:col-span-2"
        >
          {(p) => (
            <NativeSelect {...p} {...register("topic")} name="topic" defaultValue="">
              <option value="" disabled>
                Select a topic
              </option>
              {topicOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      </div>

      <Field
        id="message"
        label="How can we help?"
        required
        hint="20–2000 characters."
        error={errors.message?.message}
      >
        {(p) => (
          <TextArea rows={6} {...p} {...register("message")} name="message" />
        )}
      </Field>

      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 text-sm">
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-4 w-4"
            {...register("consent")}
            name="consent"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            aria-required
          />
          <span>
            <span className="text-foreground">
              I agree to be contacted about my enquiry.{" "}
              <span aria-hidden="true" className="text-destructive">*</span>
              <span className="sr-only"> required</span>
            </span>
            {errors.consent ? (
              <span
                id="consent-error"
                role="alert"
                className="mt-1 block text-xs font-medium text-destructive"
              >
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
          <span className="text-muted-foreground">
            Send me occasional updates from Morgan Oxford Education.
          </span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm btn-micro hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
