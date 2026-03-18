import type { AlternativePageContent } from "./types";

export const alternatives: Record<string, AlternativePageContent> = {
  // Add vertical-specific alternative pages here
};

export function getAlternative(slug: string): AlternativePageContent | undefined {
  return alternatives[slug];
}

export function getAllAlternativeSlugs(): string[] {
  return Object.keys(alternatives);
}

export function getAlternativesByType(type: "direct-competitor" | "integration-partner"): AlternativePageContent[] {
  return Object.values(alternatives).filter((alt) => alt.type === type);
}

export type { AlternativePageContent, FeatureRow, WhySwitchReason } from "./types";
