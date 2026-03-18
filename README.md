# Verticals Orchestration Hub

The command center for managing multiple vertical-specific AI agent websites. Each vertical is an independently branded site (e.g., PainterAI, HardscapeAI) that sells an AI receptionist to a specific home-services trade. This hub holds the registry, templates, scripts, and automation to scaffold, configure, and deploy them all.

This repo is **not** a website. It's the tooling layer that sits above the per-vertical sites and below the shared backend.

## How the System Fits Together

```
                      ┌──────────────────────────┐
                      │    The Tribunal (CRM)     │
                      │    /home/groot/aicrm      │
                      │    Railway (production)   │
                      └────────────┬─────────────┘
                                   │ API + Embed Widget
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
┌───────┴────────┐   ┌────────────┴──────────┐   ┌──────────┴─────────┐
│  PainterAI     │   │    HardscapeAI        │   │   WindowProAI      │
│  painterai.com │   │    hardscapeai.com     │   │   windowproai.com  │
│  Vercel        │   │    Vercel              │   │   Vercel           │
└───────┬────────┘   └────────────┬──────────┘   └──────────┬─────────┘
        │                          │                          │
        └──────────────────────────┼──────────────────────────┘
                                   │ Scaffolded & managed by
                      ┌────────────┴─────────────┐
                      │   THIS REPO              │
                      │   Verticals Hub          │
                      │   /home/groot/verticals  │
                      └──────────────────────────┘
```

**Prestyj** (`prestyj.com`) is the marketing site for The Tribunal itself — it is NOT managed by this hub.

## Directory Structure

```
verticals/
├── registry/                  # Source of truth for all verticals
│   ├── verticals.json         # Index of all verticals (slug, brand, domain, status)
│   ├── painters.json          # Full config for PainterAI
│   ├── hardscaping.json       # Full config for HardscapeAI
│   └── windows-doors.json     # Full config for WindowProAI
├── template/                  # Next.js site template (copied per-vertical)
│   ├── src/
│   │   ├── app/               # Pages: home, blog, best-for, alternatives, pricing, etc.
│   │   ├── components/        # UI, sections, SEO, embed widget
│   │   └── lib/               # Content factories, config, utils
│   └── public/                # Images, icons, manifest
├── content-library/           # Reusable content templates with {{VARIABLES}}
│   └── blog-templates/        # MDX blog post templates
├── scripts/                   # Hub automation scripts (TypeScript, run with tsx)
│   ├── scaffold.ts            # Scaffold a new vertical from template
│   ├── setup-agent.ts         # Create CRM agent + enable embed widget
│   ├── push-content.ts        # Push templated content to vertical site(s)
│   ├── sync-crosslinks.ts     # Sync cross-links between vertical sites
│   ├── status.ts              # Check status of all verticals
│   └── lib/config.ts          # Zod schemas + loaders for registry configs
├── .claude/commands/          # Claude Code slash commands
│   ├── new-vertical.md        # /new-vertical <slug> — full scaffold + agent flow
│   ├── deploy.md              # /deploy <slug> — build + Vercel deploy
│   ├── push-content.md        # /push-content <template> [--vertical <slug>]
│   ├── sync-crosslinks.md     # /sync-crosslinks
│   └── status.md              # /status
├── CLAUDE.md                  # AI agent instructions (loaded into Claude context)
├── package.json               # Hub scripts: scaffold, setup-agent, push-content, etc.
└── tsconfig.json
```

## Registry System

### `registry/verticals.json` — The Index

Lists every vertical with its slug, brand name, domain, status (`planned` | `active` | `paused`), and local repo path. This is the first file to check when you need to know what verticals exist.

### `registry/{slug}.json` — Per-Vertical Config

Each vertical has a comprehensive config file containing:

| Section | What it holds |
|---------|---------------|
| `slug`, `brandName`, `domain` | Identity |
| `agent.publicId` | CRM embed widget ID (populated by `setup-agent`) |
| `agent.agentId` | Internal CRM agent UUID |
| `agent.backendUrl` | Backend API URL |
| `agent.voiceId` | OpenAI voice for the AI receptionist |
| `agent.systemPromptNotes` | Personality/behavior notes for prompt generation |
| `theme` | Color palette (`primary`, `accent`, `success`, `warning`) |
| `industry` | Name, short name, avg ticket, pain point, project types, common software, lead sources |
| `seo` | Primary keywords, Meta pixel ID, IndexNow key |
| `competitors` | Competitor data for alternatives/comparison pages |
| `relatedVerticals` | Cross-links to sibling vertical sites |
| `vercel` | Vercel project/team IDs (populated after first deploy) |

## Lifecycle of a Vertical

### 1. Define the Vertical

Create `registry/{slug}.json` with all the config fields. Add an entry to `registry/verticals.json` with `status: "planned"`.

### 2. Scaffold the Site

```bash
npm run scaffold -- painters
# OR via Claude Code:
/new-vertical painters
```

This copies `template/` to `/home/groot/vertical-{slug}`, generates `vertical.config.ts` from the registry config, installs deps, runs typecheck + build, then creates the CRM agent in the backend database (with embed enabled, domain whitelisted, and system prompt generated from industry config). The `publicId` is written back to the registry and the site is rebuilt with the working embed widget.

### 3. Add Content

```bash
npm run push-content -- blog-speed-to-lead --vertical painters
# OR via Claude Code:
/push-content blog-speed-to-lead --vertical painters
```

Content templates in `content-library/` use variables that get replaced with vertical-specific values:

| Variable | Replaced with |
|----------|---------------|
| `{{BRAND}}` | `brandName` (e.g., "PainterAI") |
| `{{INDUSTRY}}` | `industry.name` (e.g., "Painting Contractors") |
| `{{SHORT_NAME}}` | `industry.shortName` (e.g., "Painters") |
| `{{DOMAIN}}` | `domain` (e.g., "painterai.com") |
| `{{PAIN_POINT}}` | `industry.painPoint` |
| `{{AVG_TICKET}}` | `industry.avgTicket` |
| `{{TAGLINE}}` | `tagline` |

### 4. Deploy

```bash
# Via Claude Code:
/deploy painters
```

Builds the site, links to Vercel (first time), deploys to production, submits to IndexNow, and verifies the embed widget loads.

### 5. Maintain

```bash
/status              # Check all verticals
/sync-crosslinks     # Update cross-links across all active sites
```

## CRM Agent Setup

Each vertical gets its own AI agent in The Tribunal backend. The `setup-agent` script automates this:

```bash
npm run setup-agent -- painters
```

**What it does:**
1. Reads `registry/painters.json`
2. Runs `create_vertical_agent.py` via Railway CLI against the production database
3. The Python script builds a full system prompt from the config (qualification questions, industry context, appointment booking rules) and creates the agent with:
   - `embed_enabled: true`
   - `allowed_domains: [domain, *.domain, localhost]`
   - `public_id: ag_XXXXXXXX` (auto-generated)
   - `channel_mode: both` (voice + text)
   - `enabled_tools: [book_appointment]`
4. Writes the `publicId` and `agentId` back to the registry JSON

**The Python script** lives in the backend repo at `/home/groot/aicrm/backend/scripts/create_vertical_agent.py`. It follows the same pattern as `create_demo_agent.py` (direct DB access via SQLAlchemy, async, uses `settings.demo_workspace_id`).

### Embed Widget Integration

Each vertical site embeds the CRM chat widget:
```html
<script src="https://backend-api-production-b536.up.railway.app/widget/v1/widget.js"></script>
<ai-agent agent-id="{publicId}"></ai-agent>
```

The `publicId` comes from `registry/{slug}.json` after running `setup-agent`. The embed component is at `template/src/components/embed/ai-agent-widget.tsx`.

## Content Engine

The template site includes a content factory system for generating SEO pages at scale:

| Content Type | URL Pattern | Purpose |
|---|---|---|
| **best-for/** | `/best-for/residential-painters` | Industry-niche landing pages |
| **alternatives/** | `/alternatives/ruby-receptionists` | Competitor comparison pages |
| **solutions/** | `/solutions/speed-to-lead` | Problem-focused pages |
| **blog/** | `/blog/why-painters-lose-leads` | MDX blog posts via Fumadocs |
| **compare/** | `/compare/ai-vs-answering-service` | Head-to-head data |

Factories in `template/src/lib/content-factory/` generate page data from the vertical config + competitor data in the registry.

## Infrastructure

| Component | Location | Deployed on |
|---|---|---|
| Backend (The Tribunal) | `/home/groot/aicrm` | Railway |
| Marketing site (Prestyj) | `/home/groot/prestyj` | Vercel |
| This hub | `/home/groot/verticals` | N/A (local tooling) |
| Per-vertical sites | `/home/groot/vertical-{slug}` | Vercel (each) |

**CLI tools (pre-authenticated):**
- `railway` — Backend ops, running DB scripts in production
- `vercel` — Frontend deploys for each vertical
- `npm` / `tsx` — Hub scripts

## Key Backend References

If you need to understand or modify the backend integration:

| What | Where |
|---|---|
| Embed API endpoints | `/home/groot/aicrm/backend/app/api/v1/embed.py` |
| Agent API (embed settings) | `/home/groot/aicrm/backend/app/api/v1/agents.py` (lines 265-390) |
| Agent model | `/home/groot/aicrm/backend/app/models/agent.py` |
| Widget source | `/home/groot/aicrm/frontend/src/widget/widget.ts` |
| Origin validation | `/home/groot/aicrm/backend/app/core/origin_validation.py` |
| Vertical agent creation | `/home/groot/aicrm/backend/scripts/create_vertical_agent.py` |

## Branding Rules

- Each vertical is an **independent brand** — PainterAI, HardscapeAI, WindowProAI, etc.
- **No mention of Prestyj** on any vertical site. Prestyj is the parent brand for The Tribunal, not for verticals.
- Cross-links between verticals use each site's own brand name and domain.
- Each vertical has its own color theme defined in its registry config.

## Current Verticals

| Brand | Slug | Domain | Status |
|-------|------|--------|--------|
| PainterAI | `painters` | painterai.com | Planned |
| HardscapeAI | `hardscaping` | hardscapeai.com | Planned |
| WindowProAI | `windows-doors` | windowproai.com | Planned |

## Quick Reference for AI Agents

If you're an AI agent working in this codebase, here's what you need to know:

1. **Read `CLAUDE.md` first** — it has the system architecture and operational instructions.
2. **Registry is the source of truth** — always read `registry/{slug}.json` before making changes to a vertical.
3. **Don't edit generated files in vertical repos** — `vertical.config.ts`, `crosslinks.ts`, `.env.local` are generated by hub scripts. Edit the registry JSON and re-run the scaffold/sync instead.
4. **The template is the golden copy** — changes to the site structure should be made in `template/`, then scaffolded to new verticals or manually synced to existing ones.
5. **Agent setup is automated** — run `npm run setup-agent -- {slug}` to create/update the CRM agent. Don't manually create agents via the API.
6. **Use Claude commands** — `/new-vertical`, `/deploy`, `/push-content`, `/sync-crosslinks`, `/status` handle the common workflows.
7. **Backend scripts run via Railway** — any script in `/home/groot/aicrm/backend/scripts/` that needs the production DB must be run through `railway run`.
