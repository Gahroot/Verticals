#!/usr/bin/env tsx
/**
 * Create a CRM agent for a vertical and update the registry with the public_id.
 *
 * Usage: tsx scripts/setup-agent.ts <slug>
 * Example: tsx scripts/setup-agent.ts painters
 *
 * This script:
 * 1. Reads registry/{slug}.json
 * 2. Runs the Python agent creation script via Railway CLI (production DB)
 * 3. Parses the JSON output (public_id, agent_id)
 * 4. Updates registry/{slug}.json with the agent's publicId and agentId
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { loadVerticalConfig, HUB_ROOT } from "./lib/config";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: tsx scripts/setup-agent.ts <slug>");
  console.error("Example: tsx scripts/setup-agent.ts painters");
  process.exit(1);
}

console.log(`\n🤖 Setting up CRM agent for vertical: ${slug}\n`);

// 1. Load and validate config
console.log("1. Loading registry config...");
const config = loadVerticalConfig(slug);
console.log(`   Brand: ${config.brandName}`);
console.log(`   Domain: ${config.domain}`);

// 2. Get absolute path to the registry JSON
const configPath = join(HUB_ROOT, "registry", `${slug}.json`);
console.log(`   Config: ${configPath}`);

// 3. Run the Python script via Railway CLI
console.log("\n2. Creating agent in production database via Railway...");
const aicrm = "/home/groot/aicrm";
const cmd = `cd ${aicrm} && railway run -- bash -c "cd backend && python scripts/create_vertical_agent.py ${configPath}"`;

let output: string;
try {
  output = execSync(cmd, {
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "inherit"], // stderr passes through for logs
    timeout: 60_000,
  });
} catch (error: any) {
  console.error("\n❌ Failed to create agent. Check the error output above.");
  console.error(
    "   Make sure Railway CLI is authenticated and the aicrm project is linked."
  );
  process.exit(1);
}

// 4. Parse JSON output from the script
console.log("\n3. Parsing agent details...");
let agentResult: {
  agent_id: string;
  public_id: string;
  name: string;
  embed_enabled: boolean;
  allowed_domains: string[];
};

try {
  // The Python script outputs JSON to stdout (last line)
  const lines = output.trim().split("\n");
  const jsonLine = lines[lines.length - 1];
  agentResult = JSON.parse(jsonLine);
} catch {
  console.error("❌ Failed to parse agent output.");
  console.error("Raw output:", output);
  process.exit(1);
}

console.log(`   Agent ID:  ${agentResult.agent_id}`);
console.log(`   Public ID: ${agentResult.public_id}`);
console.log(`   Name:      ${agentResult.name}`);
console.log(`   Embed:     ${agentResult.embed_enabled}`);
console.log(`   Domains:   ${agentResult.allowed_domains.join(", ")}`);

// 5. Update registry JSON with agent details
console.log("\n4. Updating registry config...");
const rawConfig = JSON.parse(readFileSync(configPath, "utf-8"));
rawConfig.agent.publicId = agentResult.public_id;
rawConfig.agent.agentId = agentResult.agent_id;
writeFileSync(configPath, JSON.stringify(rawConfig, null, 2) + "\n");
console.log(`   Updated registry/${slug}.json with publicId and agentId`);

console.log(`\n✅ CRM agent ready for ${config.brandName}`);
console.log(`   Public ID: ${agentResult.public_id}`);
console.log(
  `   Embed widget will work on: ${agentResult.allowed_domains.join(", ")}`
);
console.log(
  `\n   Next: Re-run scaffold or manually update vertical.config.ts with the new publicId`
);
