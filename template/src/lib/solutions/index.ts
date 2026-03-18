import type { SolutionPageContent } from "./types";

export const solutions: Record<string, SolutionPageContent> = {
  // Add vertical-specific solution pages here
};

export function getSolution(slug: string): SolutionPageContent | undefined {
  return solutions[slug];
}

export function getAllSolutionSlugs(): string[] {
  return Object.keys(solutions);
}

export type { SolutionPageContent } from "./types";
