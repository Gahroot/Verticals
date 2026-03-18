import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroDemoSection } from "@/components/sections/hero-demo";
import { faqs } from "@/lib/faq-data";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  ProductJsonLd,
  FAQJsonLd,
  SoftwareApplicationJsonLd,
  ServiceJsonLd,
} from "@/components/seo/json-ld";
import { config } from "@/lib/vertical.config";

const SpeedToLeadSection = dynamic(
  () => import("@/components/sections/speed-to-lead").then((m) => m.SpeedToLeadSection),
  { ssr: true },
);
const PainPointsSection = dynamic(
  () => import("@/components/sections/pain-points").then((m) => m.PainPointsSection),
  { ssr: true },
);
const SolutionSection = dynamic(
  () => import("@/components/sections/solution").then((m) => m.SolutionSection),
  { ssr: true },
);
const HowItWorksSection = dynamic(
  () => import("@/components/sections/how-it-works").then((m) => m.HowItWorksSection),
  { ssr: true },
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.TestimonialsSection),
  { ssr: true },
);
const PricingSection = dynamic(
  () => import("@/components/sections/pricing").then((m) => m.PricingSection),
  { ssr: true },
);
const FAQSection = dynamic(
  () => import("@/components/sections/faq").then((m) => m.FAQSection),
  { ssr: true },
);
const CTASection = dynamic(
  () => import("@/components/sections/cta").then((m) => m.CTASection),
  { ssr: true },
);

export const metadata: Metadata = {
  title: `${config.brandName} | AI Lead Generation, Sales Agents & Automation for Service Businesses`,
  description:
    "AI lead generation and sales automation platform. Deploy AI agents that capture leads, respond instantly, qualify prospects, and book appointments 24/7. For HVAC, roofing, plumbing, real estate, and service businesses.",
  keywords: [
    "AI lead generation",
    "AI sales agent",
    "sales automation",
    "marketing automation",
    "lead reactivation",
    "business automation",
    "conversion rate optimization",
    "AI customer engagement",
    "service business automation",
    "AI receptionist",
    "home services AI",
    "contractor lead response",
    "AI appointment booking",
    "missed call text back",
    "AI workforce",
    "lead response automation",
    "speed to lead",
    "lead qualification",
    "real estate AI",
  ],
  openGraph: {
    title: `${config.brandName} | AI Lead Generation, Sales Agents & Automation for Service Businesses`,
    description:
      "AI lead generation and sales automation platform. Deploy AI agents that capture leads, respond instantly, qualify prospects, and book appointments 24/7. For HVAC, roofing, plumbing, real estate, and service businesses.",
    type: "website",
    url: `https://${config.domain}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.brandName} | AI Lead Generation, Sales Agents & Automation for Service Businesses`,
    description:
      "AI lead generation and sales automation platform. Deploy AI agents that capture leads, respond instantly, qualify prospects, and book appointments 24/7. For HVAC, roofing, plumbing, real estate, and service businesses.",
  },
  alternates: {
    canonical: `https://${config.domain}`,
  },
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <ProductJsonLd />
      <SoftwareApplicationJsonLd />
      <ServiceJsonLd />
      <FAQJsonLd faqs={faqs} />
      <Navbar />
      <main>
        <HeroDemoSection />
        <SpeedToLeadSection />
        <PainPointsSection />
        <SolutionSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
