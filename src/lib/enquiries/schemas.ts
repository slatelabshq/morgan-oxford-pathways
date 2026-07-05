import { z } from "zod";

// -- Shared primitives -----------------------------------------------------
const nameField = z
  .string()
  .trim()
  .min(2, "Enter the full name (2–80 characters, letters only).")
  .max(80, "Enter the full name (2–80 characters, letters only).")
  .regex(/^[\p{L}\s'\-.]+$/u, "Enter the full name (2–80 characters, letters only).");

const emailField = z
  .string()
  .trim()
  .max(254, "That email looks too long — check for typos.")
  .email("That email doesn't look right — check for typos like ‘gmial’.");

const phoneField = z
  .string()
  .trim()
  .regex(
    /^\+?[0-9\s()\-]{7,20}$/,
    "Enter a phone number with country code, e.g. +44 7700 900123.",
  );

const optionalPhone = z.union([z.literal(""), phoneField]).optional();

const messageField = z
  .string()
  .trim()
  .min(20, "Tell us a bit more — at least 20 characters so we can help.")
  .max(
    2000,
    "Keep it under 2000 characters; you can attach a document instead.",
  );

const consentField = z.literal(true, {
  errorMap: () => ({
    message: "We need your permission to reply to this enquiry.",
  }),
});

const marketingField = z.boolean().optional().default(false);

const honeypotField = z.literal("").optional().default("");

const countryField = z
  .string()
  .trim()
  .length(2, "Choose a country from the list.")
  .regex(/^[A-Z]{2}$/, "Choose a country from the list.");

const yearGroups = [
  "Reception",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
  "Year 13",
  "Sixth Form",
  "Post-18",
] as const;

const startTerms = [
  "Sep 2026",
  "Jan 2027",
  "Sep 2027",
  "Later",
  "Unsure",
] as const;

const sports = [
  "Football",
  "Basketball",
  "Tennis",
  "Swimming",
  "Multi-sport",
  "Other",
] as const;

const budgetBands = [
  "Under £25k",
  "£25–40k",
  "£40–60k",
  "£60k+",
  "Prefer to discuss",
] as const;

const currentLevels = [
  "School",
  "Club / Academy",
  "Regional",
  "National",
  "International",
] as const;

const destinations = [
  "UK boarding school",
  "US NCAA",
  "UK university",
  "Pro / semi-pro pathway",
  "Unsure",
] as const;

const applicantTypes = [
  "Athlete (18+)",
  "Parent / Guardian",
  "Coach / Club",
  "Scout / Agency",
] as const;

// -- Form schemas ----------------------------------------------------------
export const generalEnquirySchema = z.object({
  kind: z.literal("general"),
  full_name: nameField,
  email: emailField,
  phone: optionalPhone,
  role: z.enum(["Parent / Guardian", "Student", "School / Agent", "Other"], {
    errorMap: () => ({ message: "Tell us who's enquiring." }),
  }),
  topic: z.enum(
    ["Tutoring", "School placement", "AthleteX", "Careers", "Other"],
    { errorMap: () => ({ message: "Choose what your enquiry is about." }) },
  ),
  message: messageField,
  consent: consentField,
  marketing_opt_in: marketingField,
  company_website: honeypotField,
});

export const schoolPlacementSchema = z.object({
  kind: z.literal("school_placement"),
  parent_name: nameField,
  parent_email: emailField,
  parent_phone: phoneField.refine(() => true, {
    message: "We need a phone number for placement calls.",
  }),
  country: countryField,
  student_first_name: z
    .string()
    .trim()
    .min(2, "Enter the student's first name.")
    .max(40, "Enter the student's first name."),
  student_age: z
    .coerce.number({ invalid_type_error: "Student age must be between 4 and 24." })
    .int("Student age must be between 4 and 24.")
    .min(4, "Student age must be between 4 and 24.")
    .max(24, "Student age must be between 4 and 24."),
  current_year_group: z.enum(yearGroups, {
    errorMap: () => ({ message: "Select the current year group." }),
  }),
  target_start: z.enum(startTerms, {
    errorMap: () => ({ message: "Choose when the student would start." }),
  }),
  school_preferences: z
    .string()
    .trim()
    .max(500, "Keep preferences under 500 characters.")
    .optional()
    .default(""),
  academic_snapshot: z
    .string()
    .trim()
    .min(
      40,
      "Give us a short academic summary — grades, strengths, any support needs (at least 40 characters).",
    )
    .max(1500, "Keep the academic snapshot under 1500 characters."),
  budget_range: z.enum(budgetBands, {
    errorMap: () => ({
      message: "Pick a budget band so we can shortlist realistically.",
    }),
  }),
  document_names: z
    .array(z.string().max(200))
    .max(4, "Attach up to 4 documents.")
    .optional()
    .default([]),
  consent: consentField,
  company_website: honeypotField,
});

export const athletexSchema = z
  .object({
    kind: z.literal("athletex"),
    applicant_type: z.enum(applicantTypes, {
      errorMap: () => ({ message: "Tell us who's applying." }),
    }),
    full_name: nameField,
    email: emailField,
    phone: phoneField,
    country: countryField,
    date_of_birth: z
      .string()
      .min(1, "Enter a date of birth.")
      .refine((v) => !Number.isNaN(Date.parse(v)), {
        message: "Enter a valid date of birth.",
      })
      .refine((v) => new Date(v).getTime() <= Date.now(), {
        message: "Date of birth can't be in the future.",
      })
      .refine(
        (v) => {
          const age =
            (Date.now() - new Date(v).getTime()) /
            (365.25 * 24 * 60 * 60 * 1000);
          return age >= 13 && age <= 24;
        },
        { message: "AthleteX is for athletes aged 13–24." },
      ),
    sport: z.enum(sports, {
      errorMap: () => ({ message: "Pick the primary sport." }),
    }),
    position_or_discipline: z
      .string()
      .trim()
      .min(2, "Enter position or discipline (e.g. left-back, 200m free).")
      .max(60, "Keep position/discipline under 60 characters."),
    current_level: z.enum(currentLevels, {
      errorMap: () => ({ message: "Select the current competitive level." }),
    }),
    current_club_or_school: z
      .string()
      .trim()
      .min(2, "Enter the current club or school.")
      .max(120, "Keep the club/school name under 120 characters."),
    key_stats: z
      .string()
      .trim()
      .min(
        40,
        "Add key stats, PBs, achievements (at least 40 characters).",
      )
      .max(1500, "Keep key stats under 1500 characters."),
    highlight_url: z
      .union([
        z.literal(""),
        z
          .string()
          .url("Paste a public video link (YouTube, Vimeo, Hudl or Instagram).")
          .refine(
            (v) =>
              /^(https?:)\/\/([^/]+\.)?(youtube\.com|youtu\.be|vimeo\.com|hudl\.com|instagram\.com)\//i.test(
                v,
              ),
            {
              message:
                "Paste a public video link (YouTube, Vimeo, Hudl or Instagram).",
            },
          ),
      ])
      .optional(),
    target_destination: z.enum(destinations, {
      errorMap: () => ({ message: "Choose the pathway you're aiming at." }),
    }),
    available_from: z.enum(startTerms, {
      errorMap: () => ({ message: "Choose when the athlete is available." }),
    }),
    scout_context: z
      .string()
      .trim()
      .max(1000, "Keep scout context under 1000 characters.")
      .optional()
      .default(""),
    consent: consentField,
    company_website: honeypotField,
  })
  .superRefine((val, ctx) => {
    if (
      val.applicant_type === "Scout / Agency" &&
      (val.scout_context ?? "").trim().length < 20
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scout_context"],
        message:
          "Scouts: tell us the athlete, event and what you're proposing (at least 20 characters).",
      });
    }
  });

export const contactSchema = z.object({
  kind: z.literal("contact"),
  full_name: nameField,
  email: emailField,
  subject: z
    .string()
    .trim()
    .min(3, "Add a short subject (3–120 characters).")
    .max(120, "Add a short subject (3–120 characters)."),
  message: messageField,
  consent: consentField,
  company_website: honeypotField,
});

export const enquirySchema = z.discriminatedUnion("kind", [
  generalEnquirySchema,
  schoolPlacementSchema,
  athletexSchema,
  contactSchema,
]);

export type GeneralEnquiryInput = z.input<typeof generalEnquirySchema>;
export type SchoolPlacementInput = z.input<typeof schoolPlacementSchema>;
export type AthletexInput = z.input<typeof athletexSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type EnquiryInput = z.input<typeof enquirySchema>;

export const enums = {
  yearGroups,
  startTerms,
  sports,
  budgetBands,
  currentLevels,
  destinations,
  applicantTypes,
};

// Small ISO country subset (extend later).
export const countries: { code: string; name: string }[] = [
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "HK", name: "Hong Kong" },
  { code: "SG", name: "Singapore" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "NG", name: "Nigeria" },
  { code: "ZA", name: "South Africa" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "CH", name: "Switzerland" },
  { code: "OTHER", name: "Other" },
];
