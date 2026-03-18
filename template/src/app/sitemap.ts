import type { MetadataRoute } from "next";
import { blogSource } from "@/lib/source";
import { getAllAlternativeSlugs } from "@/lib/alternatives";
import { getAllSolutionSlugs } from "@/lib/solutions";
import { getAllBestForSlugs } from "@/lib/best-for";
import { config } from "@/lib/vertical.config";

const baseUrl = `https://${config.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/book-demo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alternatives`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/best-for`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages = blogSource.getPages();
  const blogRoutes: MetadataRoute.Sitemap = blogPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.data.date ? new Date(page.data.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const alternativeRoutes: MetadataRoute.Sitemap = getAllAlternativeSlugs().map(
    (slug) => ({
      url: `${baseUrl}/alternatives/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const solutionRoutes: MetadataRoute.Sitemap = getAllSolutionSlugs().map(
    (slug) => ({
      url: `${baseUrl}/solutions/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const bestForRoutes: MetadataRoute.Sitemap = getAllBestForSlugs().map(
    (slug) => ({
      url: `${baseUrl}/best-for/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...alternativeRoutes,
    ...solutionRoutes,
    ...bestForRoutes,
  ];
}
