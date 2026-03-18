import { z } from "zod";
import { readFileSync } from "fs";
import { join } from "path";

const HUB_ROOT = join(import.meta.dirname, "..", "..");

export const CompetitorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  pricing: z.string(),
  weaknesses: z.array(z.string()),
});

export const RelatedVerticalSchema = z.object({
  name: z.string(),
  domain: z.string(),
  slug: z.string(),
});

export const VerticalConfigSchema = z.object({
  slug: z.string(),
  brandName: z.string(),
  domain: z.string(),
  repoDir: z.string(),
  tagline: z.string(),
  description: z.string(),
  status: z.enum(["planned", "active", "paused"]),

  agent: z.object({
    publicId: z.string().nullable(),
    agentId: z.string().nullable().optional(),
    backendUrl: z.string().url(),
    phoneNumber: z.string().nullable(),
    voiceId: z.string(),
    systemPromptNotes: z.string(),
  }),

  theme: z.object({
    primary: z.string(),
    accent: z.string(),
    success: z.string(),
    warning: z.string(),
  }),

  industry: z.object({
    name: z.string(),
    shortName: z.string(),
    avgTicket: z.string(),
    painPoint: z.string(),
    projectTypes: z.array(z.string()),
    commonSoftware: z.array(z.string()),
    leadSources: z.array(z.string()),
  }),

  seo: z.object({
    primaryKeywords: z.array(z.string()),
    metaPixelId: z.string().nullable(),
    indexNowKey: z.string().nullable(),
  }),

  competitors: z.array(CompetitorSchema),

  relatedVerticals: z.array(RelatedVerticalSchema),

  vercel: z.object({
    projectId: z.string().nullable(),
    teamId: z.string().nullable(),
  }),

  calcomLink: z.string().nullable(),
  social: z.record(z.string()).default({}),
  createdAt: z.string(),
  lastDeployedAt: z.string().nullable(),
});

export type VerticalConfig = z.infer<typeof VerticalConfigSchema>;

export const VerticalsIndexSchema = z.object({
  verticals: z.array(
    z.object({
      slug: z.string(),
      brandName: z.string(),
      domain: z.string(),
      status: z.enum(["planned", "active", "paused"]),
      repoDir: z.string(),
    })
  ),
  backend: z.object({
    url: z.string().url(),
    widgetUrl: z.string().url(),
    repoDir: z.string(),
  }),
  prestyj: z.object({
    url: z.string().url(),
    repoDir: z.string(),
  }),
});

export type VerticalsIndex = z.infer<typeof VerticalsIndexSchema>;

export function loadVerticalConfig(slug: string): VerticalConfig {
  const filePath = join(HUB_ROOT, "registry", `${slug}.json`);
  const raw = JSON.parse(readFileSync(filePath, "utf-8"));
  return VerticalConfigSchema.parse(raw);
}

export function loadVerticalsIndex(): VerticalsIndex {
  const filePath = join(HUB_ROOT, "registry", "verticals.json");
  const raw = JSON.parse(readFileSync(filePath, "utf-8"));
  return VerticalsIndexSchema.parse(raw);
}

export function loadAllVerticalConfigs(): VerticalConfig[] {
  const index = loadVerticalsIndex();
  return index.verticals.map((v) => loadVerticalConfig(v.slug));
}

export { HUB_ROOT };
