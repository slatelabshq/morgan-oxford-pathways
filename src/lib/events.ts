/**
 * Add upcoming fairs and events here. Leave empty until dates are confirmed.
 *
 * Example:
 * {
 *   id: "lagos-fair-2026",
 *   name: "Lagos Education Fair",
 *   startDate: "2026-09-12",
 *   endDate: "2026-09-14",
 *   location: "Victoria Island, Lagos",
 *   participateUrl: "https://forms.example.com/lagos-fair",
 *   participateLabel: "Click to participate",
 * }
 */
export type EventItem = {
  id: string;
  name: string;
  /** ISO date (YYYY-MM-DD) or display string */
  startDate: string;
  endDate?: string;
  location?: string;
  /** External form URL or internal path */
  participateUrl: string;
  participateLabel?: string;
};

export const EVENTS: EventItem[] = [];

export const eventsPageCopy = {
  eyebrow: "Events",
  title: "Education fairs & open days",
  lede: "Fairs, open days and in-person dates where you can speak to Morgan Oxford consultants — separate from our blogs and long-form guides.",
  emptyTitle: "No upcoming events scheduled",
  emptyBody:
    "We publish fair dates and open days here as they are confirmed. Check back soon, or get in touch to hear about the next event in your city.",
};
