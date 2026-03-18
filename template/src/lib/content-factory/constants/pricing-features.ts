export const BRAND_PRICING_FEATURES = {
  AI_RECEPTIONIST: "AI Receptionist",
  AI_CHAT_TEXT: "AI Chat & Text Agent",
  AI_VOICE: "AI Voice Agent",
  CRM_SYNC: "CRM Sync",
  APPOINTMENT_BOOKING: "Automated appointment booking",
  LEAD_QUALIFICATION: "Lead qualification",
  MISSED_CALL_TEXTBACK: "Missed call text back",
} as const;

export const BRAND_STANDARD_PRICING = {
  price: "Starting at $297/mo",
  note: "No setup fee. Cancel anytime.",
  pros: [
    BRAND_PRICING_FEATURES.AI_RECEPTIONIST,
    BRAND_PRICING_FEATURES.AI_VOICE,
    BRAND_PRICING_FEATURES.CRM_SYNC,
  ] as string[],
  cons: [] as string[],
};
