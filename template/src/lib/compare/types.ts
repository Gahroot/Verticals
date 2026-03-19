import type { ReactNode } from "react";

export interface SwitchReason {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ComparePageData {
  slug: string;
  competitorName: string;
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    description: string;
    keyStats?: Array<{ value: string; label: string }>;
  };
  stats?: Array<{ value: string; label: string; description?: string }>;
  pricing: {
    brand: {
      name: string;
      highlight?: boolean;
      price: string;
      period?: string;
      features: string[];
    };
    competitor: {
      name: string;
      price: string;
      period?: string;
      features: string[];
    };
  };
  features: Array<{
    name: string;
    brand: boolean | string;
    competitor: boolean | string;
  }>;
  whySwitch: {
    title: string;
    description: string;
    reasons: SwitchReason[];
  };
  relatedResources?: Array<{
    title: string;
    href: string;
    description?: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    disclaimer?: string;
  };
  specialSections?: Array<{
    title: string;
    content: ReactNode;
  }>;
}
