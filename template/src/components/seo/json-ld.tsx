import type { Organization, WebSite, Product, FAQPage, WithContext } from "schema-dts";
import { SafeJsonLd } from "./safe-json-ld";
import { config } from "@/lib/vertical.config";

const siteConfig = {
  name: config.brandName,
  url: `https://${config.domain}`,
  description: config.description,
  logo: `https://${config.domain}/icon-512.png`,
};

export function OrganizationJsonLd() {
  const sameAs = Object.values(config.social).filter(Boolean);

  const jsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    description: siteConfig.description,
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "English",
    },
  };

  return <SafeJsonLd data={jsonLd} />;
}

export function WebSiteJsonLd() {
  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    } as WebSite["potentialAction"],
  };

  return <SafeJsonLd data={jsonLd} />;
}

export function ProductJsonLd() {
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${config.brandName} AI Receptionist`,
    description: config.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "297",
      highPrice: "997",
      offerCount: "3",
      availability: "https://schema.org/InStock",
    },
    category: "Software",
    audience: {
      "@type": "Audience",
      audienceType: config.industry.name,
    },
  };

  return <SafeJsonLd data={jsonLd} />;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <SafeJsonLd data={jsonLd} />;
}

export function SoftwareApplicationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${config.brandName} AI Receptionist`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "297",
      priceCurrency: "USD",
    },
    featureList: [
      "24/7 AI call answering",
      "AI-powered lead qualification",
      "Automated appointment booking",
      "CRM integration",
      `Built for ${config.industry.name.toLowerCase()}`,
      "Missed call text back",
    ],
  };

  return <SafeJsonLd data={jsonLd} />;
}

export function ServiceJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI Receptionist for ${config.industry.name}`,
    description: config.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: [
      "AI Receptionist",
      "AI Lead Qualification",
      "Automated Appointment Booking",
      "AI Call Answering",
    ],
    areaServed: "United States",
  };

  return <SafeJsonLd data={jsonLd} />;
}
