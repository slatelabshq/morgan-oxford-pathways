import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  contactSchema,
  type ContactInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea } from "./Field";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const fieldOrder: (keyof ContactInput & string)[] = [
  "full_name",
  "email",
  "subject",
  "message",
  "consent",
];

export function ContactForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { kind: "contact", company_website: "" },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry(data);
      if (res.ok) {
        navigate({
          to: "/enquiry/thanks",
          search: { kind: "contact", ref: res.ref },
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
      <input type="hidden" name="kind" value="contact" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <FormStatus errors={errors} fieldOrder={fieldOrder} message={serverMessage} />

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
      </div>

      <Field
        id="subject"
        label="Subject"
        required
        error={errors.subject?.message}
      >
        {(p) => <TextInput {...p} {...register("subject")} name="subject" />}
      </Field>

      <Field
        id="message"
        label="Message"
        required
        hint="20–2000 characters."
        error={errors.message?.message}
      >
        {(p) => (
          <TextArea rows={6} {...p} {...register("message")} name="message" />
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
          aria-describedby={errors.consent ? "consent-error" : undefined}
          aria-required
        />
        <span>
          <span className="text-foreground">
            I agree to be contacted.{" "}
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

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm btn-micro hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
