import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  schoolPlacementSchema,
  enums,
  type SchoolPlacementInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea, NativeSelect } from "./Field";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const fieldOrder: (keyof SchoolPlacementInput & string)[] = [
  "parent_name",
  "email",
  "phone_number",
  "child_school_year",
  "exploring",
  "destination",
  "target_start",
  "about_child",
  "consent",
];

const PHONE_CODE_LABELS: Record<(typeof enums.phoneCodes)[number], string> = {
  "+234": "🇳🇬 +234",
  "+44": "🇬🇧 +44",
  "+1": "🇺🇸 +1",
  "+233": "🇬🇭 +233",
  "+other": "Other",
};

export function SchoolPlacementForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<SchoolPlacementInput>({
    resolver: zodResolver(schoolPlacementSchema),
    defaultValues: {
      kind: "school_placement",
      phone_code: "+234",
      phone_number: "",
      child_school_year: "",
      exploring: "",
      destination: "",
      target_start: "",
      marketing_opt_in: false,
      company_website: "",
    },
  });

  const aboutChild = watch("about_child") ?? "";
  const aboutLen = aboutChild.length;
  const charLabel =
    aboutLen < 20
      ? `${aboutLen} / 20 characters minimum`
      : `${aboutLen} / 2000 characters`;

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry(data);
      if (res.ok) {
        navigate({
          to: "/enquiry/thanks",
          search: { kind: "school_placement", ref: res.ref },
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
      className="rounded-2xl border border-border bg-card p-6 sm:p-9"
    >
      <input type="hidden" name="kind" value="school_placement" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <div className="flex flex-col gap-6">
        <FormStatus errors={errors} fieldOrder={fieldOrder} message={serverMessage} />

        <div className="grid gap-4 sm:grid-cols-2">
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
                placeholder="e.g. Funmilayo Adeyemi"
                {...register("parent_name")}
                name="parent_name"
              />
            )}
          </Field>
          <Field id="email" label="Email" required error={errors.email?.message}>
            {(p) => (
              <TextInput
                {...p}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
                name="email"
              />
            )}
          </Field>
        </div>

        <Field id="phone_number" label="Phone" required error={errors.phone_number?.message}>
          {(p) => (
            <div className="flex gap-2">
              <NativeSelect
                aria-label="Country code"
                className="w-[7.5rem] shrink-0"
                {...register("phone_code")}
                name="phone_code"
                defaultValue="+234"
              >
                {enums.phoneCodes.map((code) => (
                  <option key={code} value={code}>
                    {PHONE_CODE_LABELS[code]}
                  </option>
                ))}
              </NativeSelect>
              <TextInput
                {...p}
                type="tel"
                autoComplete="tel-national"
                placeholder="801 234 5678"
                className="flex-1"
                {...register("phone_number")}
                name="phone_number"
              />
            </div>
          )}
        </Field>

        <Field
          id="child_school_year"
          label="Child's current school & year / grade"
          hint="Optional"
          error={errors.child_school_year?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              placeholder="e.g. Greensprings School, Year 9"
              {...register("child_school_year")}
              name="child_school_year"
            />
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="exploring" label="What are you exploring?" hint="Optional" error={errors.exploring?.message}>
            {(p) => (
              <NativeSelect {...p} {...register("exploring")} name="exploring" defaultValue="">
                <option value="">Select an option</option>
                {enums.exploringOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </NativeSelect>
            )}
          </Field>
          <Field id="destination" label="Target destination" hint="Optional" error={errors.destination?.message}>
            {(p) => (
              <NativeSelect {...p} {...register("destination")} name="destination" defaultValue="">
                <option value="">Select an option</option>
                {enums.targetDestinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </NativeSelect>
            )}
          </Field>
        </div>

        <Field id="target_start" label="Target start term" hint="Optional" error={errors.target_start?.message}>
          {(p) => (
            <NativeSelect {...p} {...register("target_start")} name="target_start" defaultValue="">
              <option value="">Select an option</option>
              {enums.placementStartTerms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>

        <Field
          id="about_child"
          label="Tell us about your child"
          required
          error={errors.about_child?.message}
        >
          {(p) => (
            <>
              <TextArea
                rows={5}
                placeholder="What's their current school experience like? What are you hoping to find for them?"
                maxLength={2000}
                {...p}
                {...register("about_child")}
                name="about_child"
              />
              <p
                className={`mt-1.5 text-right text-xs ${
                  aboutLen >= 20 ? "text-[color:var(--brand-signal,#3F6B44)]" : "text-muted-foreground"
                }`}
              >
                {charLabel}
              </p>
            </>
          )}
        </Field>

        <fieldset className="space-y-3 border-0 p-0">
          <legend className="sr-only">Consent</legend>
          <label className="flex items-start gap-3 text-sm">
            <input
              id="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 accent-primary"
              {...register("consent")}
              name="consent"
              aria-invalid={!!errors.consent}
              aria-required
            />
            <span>
              I agree to be contacted about my enquiry.{" "}
              <span aria-hidden className="text-[color:var(--brand-gold)]">
                *
              </span>
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
              className="mt-1 h-4 w-4 accent-primary"
              {...register("marketing_opt_in")}
              name="marketing_opt_in"
            />
            <span>Send me occasional updates from Morgan Oxford Education.</span>
          </label>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="btn-glow inline-flex min-h-12 w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Send my enquiry"}
        </button>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By submitting, you agree to our{" "}
          <Link to="/legal/privacy" className="text-foreground underline">
            Privacy policy
          </Link>
          . We'll only use this to help place your child.
        </p>
      </div>
    </form>
  );
}
