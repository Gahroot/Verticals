#!/usr/bin/env tsx
/**
 * Check the status of all verticals in the registry.
 *
 * Usage: tsx scripts/status.ts
 */

import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { loadVerticalConfig, loadVerticalsIndex } from "./lib/config";

const index = loadVerticalsIndex();

console.log("\n========================================");
console.log("  Vertical Status Dashboard");
console.log("========================================\n");

for (const entry of index.verticals) {
  const config = loadVerticalConfig(entry.slug);
  const repoExists = existsSync(config.repoDir);

  console.log(`${config.brandName} (${config.slug})`);
  console.log(`  Status:    ${config.status}`);
  console.log(`  Domain:    ${config.domain}`);
  console.log(`  Agent:     ${config.agent.publicId ? `yes (${config.agent.publicId})` : "not created"}`);
  console.log(`  Phone:     ${config.agent.phoneNumber || "not assigned"}`);
  console.log(`  Vercel:    ${config.vercel.projectId ? `yes (${config.vercel.projectId})` : "not linked"}`);
  console.log(`  Deployed:  ${config.lastDeployedAt || "never"}`);
  console.log(`  Repo:      ${repoExists ? "exists" : "NOT FOUND"}`);

  if (repoExists) {
    try {
      const bestForDir = join(config.repoDir, "src", "lib", "best-for");
      const altDir = join(config.repoDir, "src", "lib", "alternatives");
      const blogDir = join(config.repoDir, "content", "blog");

      const bestForCount = existsSync(bestForDir)
        ? readdirSync(bestForDir).filter((f) => f.endsWith(".ts") && f !== "types.ts" && f !== "index.ts").length
        : 0;
      const altCount = existsSync(altDir)
        ? readdirSync(altDir).filter((f) => f.endsWith(".ts") && f !== "types.ts" && f !== "index.ts").length
        : 0;
      const blogCount = existsSync(blogDir)
        ? readdirSync(blogDir).filter((f) => f.endsWith(".mdx")).length
        : 0;

      console.log(`  Content:   ${bestForCount} best-for, ${altCount} alternatives, ${blogCount} blog posts`);
    } catch {
      console.log("  Content:   unable to count");
    }
  }

  console.log("");
}

console.log("Backend: " + index.backend.url);
console.log("");
