import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  athletexSchema,
  countries,
  enums,
  type AthletexInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea, NativeSelect } from "./Field";
import { Fieldset } from "./Fieldset";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const fieldOrder: (keyof AthletexInput & string)[] = [
  "applicant_type",
  "full_name",
  "email",
  "phone",
  "country",
  "date_of_birth",
  "sport",
  "position_or_discipline",
  "current_level",
  "current_club_or_school",
  "key_stats",
  "highlight_url",
  "target_destination",
  "available_from",
  "scout_context",
  "consent",
];

export function AthleteXScholarshipForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<AthletexInput>({
    resolver: zodResolver(athletexSchema),
    defaultValues: { kind: "athletex", company_website: "" },
  });

  const applicantType = watch("applicant_type");
  const isScout = applicantType === "Scout / Agency";

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry(data);
      if (res.ok) {
        navigate({
          to: "/enquiry/thanks",
          search: { kind: "athletex", ref: res.ref },
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
      <input type="hidden" name="kind" value="athletex" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <FormStatus errors={errors} fieldOrder={fieldOrder} message={serverMessage} />

      <Fieldset legend="Applicant">
        <Field
          id="applicant_type"
          label="I'm applying as"
          required
          error={errors.applicant_type?.message}
          className="md:col-span-2"
        >
          {(p) => (
            <div
              role="radiogroup"
              aria-labelledby={`${p.id}-label`}
              aria-invalid={p["aria-invalid"]}
              aria-describedby={p["aria-describedby"]}
              className="grid gap-2 sm:grid-cols-2"
            >
              {enums.applicantTypes.map((opt) => (
                <label
                  key={opt}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-input bg-background px-3 py-2 text-sm hover:border-primary"
                >
                  <input
                    type="radio"
                    value={opt}
                    {...register("applicant_type")}
                    name="applicant_type"
                    className="h-4 w-4"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}
        </Field>
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
        <Field id="phone" label="Phone" required error={errors.phone?.message}>
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
          id="date_of_birth"
          label="Date of birth"
          required
          error={errors.date_of_birth?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              type="date"
              {...register("date_of_birth")}
              name="date_of_birth"
            />
          )}
        </Field>
      </Fieldset>

      <Fieldset legend="Sport & level">
        <Field id="sport" label="Primary sport" required error={errors.sport?.message}>
          {(p) => (
            <NativeSelect {...p} {...register("sport")} name="sport" defaultValue="">
              <option value="" disabled>
                Select a sport
              </option>
              {enums.sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="position_or_discipline"
          label="Position / discipline"
          required
          error={errors.position_or_discipline?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              {...register("position_or_discipline")}
              name="position_or_discipline"
            />
          )}
        </Field>
        <Field
          id="current_level"
          label="Current competitive level"
          required
          error={errors.current_level?.message}
        >
          {(p) => (
            <NativeSelect
              {...p}
              {...register("current_level")}
              name="current_level"
              defaultValue=""
            >
              <option value="" disabled>
                Select level
              </option>
              {enums.currentLevels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="current_club_or_school"
          label="Current club or school"
          required
          error={errors.current_club_or_school?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              {...register("current_club_or_school")}
              name="current_club_or_school"
            />
          )}
        </Field>
        <Field
          id="key_stats"
          label="Key stats & achievements"
          required
          hint="PBs, honours, minutes, results (40–1500 chars)."
          error={errors.key_stats?.message}
          className="md:col-span-2"
        >
          {(p) => (
            <TextArea rows={5} {...p} {...register("key_stats")} name="key_stats" />
          )}
        </Field>
        <Field
          id="highlight_url"
          label="Highlight video URL"
          hint="Optional. YouTube, Vimeo, Hudl or Instagram."
          error={errors.highlight_url?.message}
          className="md:col-span-2"
        >
          {(p) => (
            <TextInput
              {...p}
              type="url"
              inputMode="url"
              placeholder="https://"
              {...register("highlight_url")}
              name="highlight_url"
            />
          )}
        </Field>
      </Fieldset>

      <Fieldset legend="Pathway">
        <Field
          id="target_destination"
          label="Target pathway"
          required
          error={errors.target_destination?.message}
        >
          {(p) => (
            <NativeSelect
              {...p}
              {...register("target_destination")}
              name="target_destination"
              defaultValue=""
            >
              <option value="" disabled>
                Select pathway
              </option>
              {enums.destinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="available_from"
          label="Available from"
          required
          error={errors.available_from?.message}
        >
          {(p) => (
            <NativeSelect
              {...p}
              {...register("available_from")}
              name="available_from"
              defaultValue=""
            >
              <option value="" disabled>
                Select term
              </option>
              {enums.startTerms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="scout_context"
          label={isScout ? "Scout context" : "Scout context (optional)"}
          required={isScout}
          hint="Scouts: tell us the athlete, event and what you're proposing."
          error={errors.scout_context?.message}
          className="md:col-span-2"
        >
          {(p) => (
            <TextArea
              rows={4}
              {...p}
              {...register("scout_context")}
              name="scout_context"
            />
          )}
        </Field>
      </Fieldset>

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
            I agree AthleteX / Morgan Oxford Education can contact me about this
            application.{" "}
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
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
