import type { ComparePageData, SwitchReason } from "@/lib/compare/types";
import { CTA_TEMPLATES } from "../constants/cta-snippets";
import { STANDARD_INDUSTRY_STATS } from "../constants/industry-stats";
import { getIcon, type IconName } from "../constants/icons";
import { config } from "@/lib/vertical.config";

interface CompareFactoryInput {
  slug: string;
  competitorName: string;
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    description?: string;
    keyStats?: Array<{ value: string; label: string }>;
  };
  stats?: Array<{ value: string; label: string; description?: string }> | "standard";
  pricing: {
    brand: Omit<ComparePageData["pricing"]["brand"], "name">;
    competitor: Omit<ComparePageData["pricing"]["competitor"], "name">;
  };
  features: ComparePageData["features"];
  whySwitch: {
    title: string;
    description: string;
    reasons: Array<{ icon: IconName; title: string; description: string }>;
  };
  relatedResources?: ComparePageData["relatedResources"];
  cta?: Partial<ComparePageData["cta"]>;
  specialSections?: ComparePageData["specialSections"];
}

export function createComparePage(input: CompareFactoryInput): ComparePageData {
  const statsSection =
    input.stats === "standard"
      ? STANDARD_INDUSTRY_STATS.map((s) => ({
          value: s.stat,
          label: s.description,
        }))
      : input.stats;

  const whySwitchReasons: SwitchReason[] = input.whySwitch.reasons.map(
    (reason) => ({
      icon: getIcon(reason.icon),
      title: reason.title,
      description: reason.description,
    })
  );

  const pricingSection = {
    brand: { name: config.brandName, highlight: true, ...input.pricing.brand },
    competitor: { name: input.competitorName, ...input.pricing.competitor },
  };

  const ctaSection = {
    title: `Ready to See ${config.brandName} in Action?`,
    description: CTA_TEMPLATES.STANDARD_DEMO.subheadline,
    buttonText: CTA_TEMPLATES.STANDARD_DEMO.buttonText,
    buttonHref: CTA_TEMPLATES.STANDARD_DEMO.buttonHref,
    disclaimer: CTA_TEMPLATES.STANDARD_DEMO.footnote,
    ...input.cta,
  };

  return {
    slug: input.slug,
    competitorName: input.competitorName,
    hero: {
      badge: input.hero.badge,
      title: input.hero.title,
      titleAccent: input.hero.titleAccent,
      subtitle: input.hero.subtitle,
      description: input.hero.description || "",
      keyStats: input.hero.keyStats,
    },
    stats: statsSection,
    pricing: pricingSection,
    features: input.features,
    whySwitch: {
      title: input.whySwitch.title,
      description: input.whySwitch.description,
      reasons: whySwitchReasons,
    },
    relatedResources: input.relatedResources,
    cta: ctaSection,
    specialSections: input.specialSections,
  };
}
