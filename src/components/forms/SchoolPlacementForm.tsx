import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  schoolPlacementSchema,
  countries,
  enums,
  type SchoolPlacementInput,
} from "@/lib/enquiries/schemas";
import { submitEnquiry } from "@/lib/enquiries/submit";
import { Field, TextInput, TextArea, NativeSelect } from "./Field";
import { Fieldset } from "./Fieldset";
import { FormStatus } from "./FormStatus";
import { Honeypot } from "./Honeypot";

const fieldOrder: (keyof SchoolPlacementInput & string)[] = [
  "parent_name",
  "parent_email",
  "parent_phone",
  "country",
  "student_first_name",
  "student_age",
  "current_year_group",
  "target_start",
  "academic_snapshot",
  "budget_range",
  "school_preferences",
  "consent",
];

export function SchoolPlacementForm() {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState<string | undefined>();
  const [pickedFiles, setPickedFiles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<SchoolPlacementInput>({
    resolver: zodResolver(schoolPlacementSchema),
    defaultValues: {
      kind: "school_placement",
      company_website: "",
      document_names: [],
    },
  });

  const onSubmit = handleSubmit(
    async (data) => {
      setServerMessage(undefined);
      const res = await submitEnquiry({ ...data, document_names: pickedFiles });
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
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="kind" value="school_placement" />
      <input type="hidden" name="redirect" value="/enquiry/thanks" />
      <input
        type="hidden"
        name="started_at"
        value={typeof window !== "undefined" ? String(Date.now()) : ""}
      />
      <Honeypot register={register} name="company_website" />

      <FormStatus errors={errors} fieldOrder={fieldOrder} message={serverMessage} />

      <Fieldset legend="Parent / guardian">
        <Field id="parent_name" label="Full name" required error={errors.parent_name?.message}>
          {(p) => (
            <TextInput
              {...p}
              autoComplete="name"
              {...register("parent_name")}
              name="parent_name"
            />
          )}
        </Field>
        <Field id="parent_email" label="Email" required error={errors.parent_email?.message}>
          {(p) => (
            <TextInput
              {...p}
              type="email"
              autoComplete="email"
              {...register("parent_email")}
              name="parent_email"
            />
          )}
        </Field>
        <Field id="parent_phone" label="Phone" required error={errors.parent_phone?.message}>
          {(p) => (
            <TextInput
              {...p}
              type="tel"
              autoComplete="tel"
              {...register("parent_phone")}
              name="parent_phone"
            />
          )}
        </Field>
        <Field id="country" label="Country of residence" required error={errors.country?.message}>
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
      </Fieldset>

      <Fieldset legend="Student">
        <Field
          id="student_first_name"
          label="First name"
          required
          error={errors.student_first_name?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              {...register("student_first_name")}
              name="student_first_name"
            />
          )}
        </Field>
        <Field
          id="student_age"
          label="Age"
          required
          error={errors.student_age?.message}
        >
          {(p) => (
            <TextInput
              {...p}
              type="number"
              min={4}
              max={24}
              {...register("student_age")}
              name="student_age"
            />
          )}
        </Field>
        <Field
          id="current_year_group"
          label="Current year group"
          required
          error={errors.current_year_group?.message}
        >
          {(p) => (
            <NativeSelect
              {...p}
              {...register("current_year_group")}
              name="current_year_group"
              defaultValue=""
            >
              <option value="" disabled>
                Select year group
              </option>
              {enums.yearGroups.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="target_start"
          label="Target start"
          required
          error={errors.target_start?.message}
        >
          {(p) => (
            <NativeSelect
              {...p}
              {...register("target_start")}
              name="target_start"
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
          id="academic_snapshot"
          label="Academic snapshot"
          required
          hint="Grades, strengths, any support needs (40–1500 chars)."
          error={errors.academic_snapshot?.message}
          className="md:col-span-2"
        >
          {(p) => (
            <TextArea
              rows={5}
              {...p}
              {...register("academic_snapshot")}
              name="academic_snapshot"
            />
          )}
        </Field>
      </Fieldset>

      <Fieldset legend="Placement preferences">
        <Field
          id="budget_range"
          label="Annual fee budget"
          required
          error={errors.budget_range?.message}
        >
          {(p) => (
            <NativeSelect
              {...p}
              {...register("budget_range")}
              name="budget_range"
              defaultValue=""
            >
              <option value="" disabled>
                Select budget band
              </option>
              {enums.budgetBands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
        <Field
          id="school_preferences"
          label="School preferences"
          hint="e.g. day vs boarding, single-sex, region."
          error={errors.school_preferences?.message}
        >
          {(p) => (
            <TextArea
              rows={3}
              {...p}
              {...register("school_preferences")}
              name="school_preferences"
            />
          )}
        </Field>
        <Field
          id="documents"
          label="Supporting documents"
          hint="PDF, Word, JPG or PNG — up to 4 files, 10 MB each."
          className="md:col-span-2"
        >
          {(p) => (
            <input
              {...p}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              name="documents"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                const overSize = files.find((f) => f.size > 10 * 1024 * 1024);
                if (overSize) {
                  e.target.setCustomValidity("Each file must be under 10 MB.");
                  e.target.reportValidity();
                  setPickedFiles([]);
                  return;
                }
                if (files.length > 4) {
                  e.target.setCustomValidity("Attach up to 4 documents.");
                  e.target.reportValidity();
                  setPickedFiles([]);
                  return;
                }
                e.target.setCustomValidity("");
                setPickedFiles(files.map((f) => f.name));
              }}
              className="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm"
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
            I agree to be contacted about this placement enquiry.{" "}
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
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? "Sending…" : "Submit placement enquiry"}
        </button>
      </div>
    </form>
  );
}
