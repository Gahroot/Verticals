import type {
  AlternativePageContent,
  AlternativeType,
  FeatureRow,
  PricingInfo,
} from "@/lib/alternatives/types";
import { buildHeroWithPattern } from "../constants/hero-patterns";
import {
  STANDARD_INDUSTRY_STATS,
  REACTIVATION_STATS,
} from "../constants/industry-stats";
import { CTA_TEMPLATES } from "../constants/cta-snippets";
import { BRAND_STANDARD_PRICING } from "../constants/pricing-features";
import type { IconName } from "../constants/icons";

interface AlternativeFactoryInput {
  slug: string;
  type: AlternativeType;
  competitor: {
    name: string;
    shortName?: string;
    pricing?: string;
    website?: string;
    description?: string;
  };
  meta: { title: string; description: string; keywords: string[] };
  hero: { badge: string; subheadline: string };
  industryStats?:
    | "standard"
    | "reactivation"
    | Array<{ stat: string; description: string }>;
  comparison: {
    features: FeatureRow[];
    competitorPricing: PricingInfo;
    brandPricingOverrides?: Partial<PricingInfo>;
  };
  whySwitch: Array<{ icon: IconName; title: string; description: string }>;
  whenCompetitorFits: string[];
  whenBrandFits: string[];
  relatedResources: Array<{
    href: string;
    title: string;
    description: string;
  }>;
  cta?: Partial<{
    headline: string;
    subheadline: string;
    buttonText: string;
    buttonHref: string;
    footnote: string;
  }>;
}

export function createAlternativePage(
  input: AlternativeFactoryInput
): AlternativePageContent {
  const heroSection = buildHeroWithPattern(
    "LOOKING_FOR_ALTERNATIVE",
    `${input.competitor.name} Alternative?`,
    input.hero.badge,
    input.hero.subheadline
  );

  let statsSection;
  if (input.industryStats === "standard") {
    statsSection = STANDARD_INDUSTRY_STATS;
  } else if (input.industryStats === "reactivation") {
    statsSection = REACTIVATION_STATS;
  } else if (Array.isArray(input.industryStats)) {
    statsSection = input.industryStats;
  }

  const brandPricing: PricingInfo = {
    ...BRAND_STANDARD_PRICING,
    ...input.comparison.brandPricingOverrides,
    cons: [],
  };

  const ctaSection = {
    ...CTA_TEMPLATES.STANDARD_DEMO,
    ...input.cta,
  };

  return {
    slug: input.slug,
    type: input.type,
    competitor: input.competitor,
    meta: input.meta,
    hero: heroSection,
    industryStats: statsSection,
    comparison: {
      features: input.comparison.features,
      competitorPricing: input.comparison.competitorPricing,
      brandPricing,
    },
    whySwitch: input.whySwitch,
    whenCompetitorFits: input.whenCompetitorFits,
    whenBrandFits: input.whenBrandFits,
    relatedResources: input.relatedResources,
    cta: ctaSection,
  };
}
