import type { FeatureRow } from "@/lib/alternatives/types";

export const STANDARD_FEATURES = {
  AI_TEXT: { feature: "AI Text Conversations", brand: true } as const,
  AI_VOICE: { feature: "AI Voice Assistants", brand: true } as const,
  RESPONSE_24_7: { feature: "24/7 Lead Response", brand: true } as const,
  BUILT_IN_CRM: { feature: "Built-in CRM", brand: true } as const,
  APPOINTMENT_BOOKING: {
    feature: "Appointment Booking",
    brand: true,
  } as const,
  LEAD_QUALIFICATION: {
    feature: "Lead Qualification",
    brand: true,
  } as const,
  CALENDAR_INTEGRATION: {
    feature: "Calendar Integration",
    brand: true,
  } as const,
} as const;

export function buildAlternativeFeature(
  baseFeature: (typeof STANDARD_FEATURES)[keyof typeof STANDARD_FEATURES],
  competitor: boolean | string,
  note?: string
): FeatureRow {
  return { feature: baseFeature.feature, brand: baseFeature.brand, competitor, note };
}
