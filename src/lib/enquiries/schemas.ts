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

const placementStartTerms = [
  "September 2026",
  "January 2027",
  "September 2027",
  "Later",
  "Unsure",
] as const;

const phoneCodes = ["+234", "+44", "+1", "+233", "+other"] as const;

const sports = [
  "Football",
  "Basketball",
  "Tennis",
  "Swimming",
  "Volleyball",
  "Athletics or Track",
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
  "Boarding School",
  "Sixth Form College",
  "University",
  "University Pathway",
  "Pro or Semi-Pro Pathway",
  "Unsure",
] as const;

const applicantTypes = [
  "Athlete (18+)",
  "Parent / Guardian",
  "Coach / Club",
] as const;

const exploringOptions = [
  "Day school",
  "Boarding",
  "Sixth Form & Pathway",
  "Summer or Winter Programme",
  "Guardianship",
  "AthleteX",
  "Not sure yet",
] as const;

const targetDestinations = [
  "UK",
  "USA",
  "Canada",
  "Rest of Europe & Beyond",
  "Not sure yet",
] as const;

const scoutProposals = [
  "Trial invitation",
  "Scholarship offer",
  "Ongoing scouting relationship",
  "Other",
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
  email: emailField,
  phone_code: z.enum(phoneCodes, {
    errorMap: () => ({ message: "Choose a country code." }),
  }),
  phone_number: z
    .string()
    .trim()
    .min(6, "Please enter a phone number.")
    .max(20, "That phone number looks too long."),
  child_school_year: z
    .string()
    .trim()
    .max(200, "Keep this under 200 characters.")
    .optional()
    .default(""),
  exploring: z.union([z.literal(""), z.enum(exploringOptions)]).optional().default(""),
  destination: z.union([z.literal(""), z.enum(targetDestinations)]).optional().default(""),
  target_start: z.union([z.literal(""), z.enum(placementStartTerms)]).optional().default(""),
  about_child: messageField,
  consent: consentField,
  marketing_opt_in: marketingField,
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

export const parentEnquirySchema = z.object({
  kind: z.literal("parent"),
  parent_name: nameField,
  email: emailField,
  phone: phoneField,
  child_school_year: z
    .string()
    .trim()
    .max(200, "Keep this under 200 characters.")
    .optional()
    .default(""),
  exploring: z.enum(exploringOptions, {
    errorMap: () => ({ message: "Tell us what you're exploring." }),
  }),
  destination: z.enum(targetDestinations, {
    errorMap: () => ({ message: "Choose a target destination." }),
  }),
  destination_other: z
    .string()
    .trim()
    .max(200, "Keep this under 200 characters.")
    .optional()
    .default(""),
  target_start: z.enum(startTerms, {
    errorMap: () => ({ message: "Choose a target start term." }),
  }),
  about_child: messageField,
  consent: consentField,
  marketing_opt_in: marketingField,
  company_website: honeypotField,
});

export const scoutEnquirySchema = z.object({
  kind: z.literal("scout"),
  scout_name: nameField,
  organisation: z
    .string()
    .trim()
    .min(2, "Enter the organisation name.")
    .max(120, "Keep the organisation name under 120 characters."),
  email: emailField,
  phone: phoneField,
  country: countryField,
  athletes_of_interest: z
    .string()
    .trim()
    .min(10, "Tell us which athlete(s) you're interested in.")
    .max(2000, "Keep this under 2000 characters."),
  proposal: z.enum(scoutProposals, {
    errorMap: () => ({ message: "Tell us what you're proposing." }),
  }),
  additional_context: z
    .string()
    .trim()
    .max(2000, "Keep this under 2000 characters.")
    .optional()
    .default(""),
  consent: consentField,
  company_website: honeypotField,
});

export const enquirySchema = z.union([
  generalEnquirySchema,
  schoolPlacementSchema,
  athletexSchema,
  contactSchema,
  parentEnquirySchema,
  scoutEnquirySchema,
]);

export type GeneralEnquiryInput = z.input<typeof generalEnquirySchema>;
export type SchoolPlacementInput = z.input<typeof schoolPlacementSchema>;
export type AthletexInput = z.input<typeof athletexSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type ParentEnquiryInput = z.input<typeof parentEnquirySchema>;
export type ScoutEnquiryInput = z.input<typeof scoutEnquirySchema>;
export type EnquiryInput = z.input<typeof enquirySchema>;

export const enums = {
  yearGroups,
  startTerms,
  placementStartTerms,
  phoneCodes,
  sports,
  budgetBands,
  currentLevels,
  destinations,
  applicantTypes,
  exploringOptions,
  targetDestinations,
  scoutProposals,
};

export const sportDisciplineLabels: Record<(typeof sports)[number], string> = {
  Football: "Position (e.g. striker, midfielder)",
  Basketball: "Position (e.g. guard, forward)",
  Tennis: "UTR / national ranking",
  Swimming: "Best times & strokes",
  Volleyball: "Position (e.g. setter, libero)",
  "Athletics or Track": "Event(s) & personal bests",
  "Multi-sport": "Primary discipline",
  Other: "Position / discipline",
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
