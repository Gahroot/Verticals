#!/usr/bin/env tsx
/**
 * Push content from a template to one or more vertical sites.
 *
 * Usage:
 *   tsx scripts/push-content.ts <template-path> [--vertical <slug>]
 *
 * Examples:
 *   tsx scripts/push-content.ts content-library/blog-templates/speed-to-lead.mdx --vertical painters
 *   tsx scripts/push-content.ts content-library/blog-templates/speed-to-lead.mdx  # all active verticals
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, basename } from "path";
import {
  loadVerticalConfig,
  loadVerticalsIndex,
  HUB_ROOT,
  type VerticalConfig,
} from "./lib/config";

const args = process.argv.slice(2);
const templatePath = args[0];
const verticalFlag = args.indexOf("--vertical");
const targetSlug = verticalFlag !== -1 ? args[verticalFlag + 1] : null;

if (!templatePath) {
  console.error("Usage: tsx scripts/push-content.ts <template-path> [--vertical <slug>]");
  process.exit(1);
}

const fullTemplatePath = join(HUB_ROOT, templatePath);
if (!existsSync(fullTemplatePath)) {
  console.error(`Template not found: ${fullTemplatePath}`);
  process.exit(1);
}

const template = readFileSync(fullTemplatePath, "utf-8");
const fileName = basename(templatePath);

function replaceVars(content: string, config: VerticalConfig): string {
  return content
    .replace(/\{\{BRAND\}\}/g, config.brandName)
    .replace(/\{\{INDUSTRY\}\}/g, config.industry.name)
    .replace(/\{\{SHORT_NAME\}\}/g, config.industry.shortName)
    .replace(/\{\{DOMAIN\}\}/g, config.domain)
    .replace(/\{\{PAIN_POINT\}\}/g, config.industry.painPoint)
    .replace(/\{\{AVG_TICKET\}\}/g, config.industry.avgTicket)
    .replace(/\{\{TAGLINE\}\}/g, config.tagline);
}

function pushToVertical(config: VerticalConfig) {
  const processed = replaceVars(template, config);

  // Determine target directory based on template location
  let targetDir: string;
  if (templatePath.includes("blog-templates")) {
    targetDir = join(config.repoDir, "content", "blog");
  } else if (templatePath.includes("best-for-templates")) {
    targetDir = join(config.repoDir, "src", "lib", "best-for");
  } else if (templatePath.includes("alternatives-templates")) {
    targetDir = join(config.repoDir, "src", "lib", "alternatives");
  } else {
    targetDir = join(config.repoDir, "content");
  }

  mkdirSync(targetDir, { recursive: true });
  const targetPath = join(targetDir, fileName);
  writeFileSync(targetPath, processed);
  console.log(`  -> ${targetPath}`);
}

// Get target verticals
const index = loadVerticalsIndex();
const targets = targetSlug
  ? [loadVerticalConfig(targetSlug)]
  : index.verticals
      .filter((v) => v.status === "active")
      .map((v) => loadVerticalConfig(v.slug));

if (targets.length === 0) {
  console.error("No active verticals found.");
  process.exit(1);
}

console.log(`\nPushing "${fileName}" to ${targets.length} vertical(s):\n`);

for (const config of targets) {
  if (!existsSync(config.repoDir)) {
    console.log(`  SKIP: ${config.brandName} (repo not found at ${config.repoDir})`);
    continue;
  }
  console.log(`  ${config.brandName} (${config.slug})`);
  pushToVertical(config);
}

console.log("\nDone.");
