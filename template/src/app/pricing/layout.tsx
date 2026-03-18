import type { Metadata } from "next";
import { config } from "@/lib/vertical.config";

export const metadata: Metadata = {
  title: `Pricing | ${config.brandName} AI Marketing Automation`,
  description:
    "Transparent pricing for AI-powered marketing automation. Three plans built for service businesses — ad management, AI lead response, and done-for-you setup included.",
  keywords: [
    "AI marketing pricing",
    "service business marketing automation",
    "AI lead response pricing",
    "roofing marketing pricing",
    "HVAC marketing automation cost",
    "AI sales agent pricing",
    `${config.brandName} pricing`,
  ],
  openGraph: {
    title: `Pricing | ${config.brandName} AI Marketing Automation`,
    description:
      "Transparent pricing for AI-powered marketing automation. Ad management, AI agents, and done-for-you setup included in every plan.",
    type: "website",
    url: `https://${config.domain}/pricing`,
  },
  alternates: {
    canonical: `https://${config.domain}/pricing`,
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
