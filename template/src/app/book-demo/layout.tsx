import type { Metadata } from "next";
import { config } from "@/lib/vertical.config";

export const metadata: Metadata = {
  title: `Book Your AI Sales Agent Demo | ${config.brandName}`,
  description:
    `Schedule a personalized demo to see how ${config.brandName} AI agents respond to leads in under 30 seconds. Close 30-50% more deals from your existing ad spend. No credit card required.`,
  keywords: [
    "book demo",
    "AI sales agent demo",
    "lead response demo",
    `${config.brandName} demo`,
    "AI receptionist demo",
    "automated lead response",
  ],
  openGraph: {
    title: `Book Your AI Sales Agent Demo | ${config.brandName}`,
    description:
      `Schedule a personalized demo to see how ${config.brandName} AI agents respond to leads in under 30 seconds. Close 30-50% more deals from your existing ad spend. No credit card required.`,
    type: "website",
    url: `https://${config.domain}/book-demo`,
    siteName: config.brandName,
    images: [
      {
        url: `https://${config.domain}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${config.brandName} AI Sales Agent Demo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Book Your AI Sales Agent Demo | ${config.brandName}`,
    description:
      `Schedule a personalized demo to see how ${config.brandName} AI agents respond to leads in under 30 seconds. Close 30-50% more deals from your existing ad spend. No credit card required.`,
    images: [`https://${config.domain}/og-image.jpg`],
  },
  alternates: {
    canonical: `https://${config.domain}/book-demo`,
  },
};

export default function BookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
