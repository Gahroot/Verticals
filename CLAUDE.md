# Verticals Orchestration Hub

This is NOT a website. It's the tooling, registry, and documentation that manages multiple vertical-specific AI agent websites.

## Architecture

- **Backend (The Tribunal):** Single AI CRM at `/home/groot/aicrm`, deployed on Railway at `https://backend-api-production-b536.up.railway.app`
- **Marketing site (Prestyj):** Separate at `/home/groot/prestyj`, deployed on Vercel at `https://prestyj.com` — NOT managed by this hub
- **Per-vertical sites:** Each at `/home/groot/vertical-{slug}/`, separate git repos, separate Vercel projects
- **This hub:** `/home/groot/verticals/` — registry, scripts, templates, Claude commands

## Registry

`registry/verticals.json` is the source of truth for all active verticals. Each vertical also has its own `registry/{slug}.json` with full config.

## Embed Integration

Each vertical site embeds the CRM chat widget:
```html
<script src="https://backend-api-production-b536.up.railway.app/widget/v1/widget.js"></script>
<ai-agent agent-id="{publicId}"></ai-agent>
```
- Use the **production widget URL**, not demo endpoints
- Each agent must have `embed_enabled=true` and the vertical's domain in `allowed_domains`
- Agent `public_id` is stored in `registry/{slug}.json` after creation

## CLI Tools

- **Railway CLI** (`railway`) — already authenticated, use for backend ops
- **Vercel CLI** (`vercel`) — already authenticated, use for frontend deploys
- **Node/npm** — for scripts in this hub and vertical sites

## Per-Vertical Repos

Each vertical site lives at `/home/groot/vertical-{slug}/`:
- Cloned from the `template/` in this hub via scaffold script
- Independent git repo, independent Vercel project
- Reads config from `src/lib/vertical.config.ts` (generated from registry JSON)
- All content (best-for, alternatives, blog) is vertical-specific

## Content Engine

Factory pattern inherited from prestyj:
- **best-for/** — industry-specific landing pages (e.g., "Best AI for Residential Painters")
- **alternatives/** — comparison pages (e.g., "AI Receptionist vs Answering Service")
- **solutions/** — problem-focused pages (e.g., "Speed to Lead for Painters")
- **blog/** — MDX posts via Fumadocs
- **compare/** — head-to-head comparison data

Templates in `content-library/` use variables: `{{BRAND}}`, `{{INDUSTRY}}`, `{{DOMAIN}}`, `{{PAIN_POINT}}`

## Common Operations

| Task | Command |
|------|---------|
| Scaffold new vertical | `/new-vertical {slug}` |
| Push content to vertical(s) | `/push-content {template} [--vertical slug]` |
| Deploy a vertical | `/deploy {slug}` |
| Sync cross-links | `/sync-crosslinks` |
| Check status of all verticals | `/status` |

## Branding

Independent brands per vertical. No mention of Prestyj on vertical sites. Each has its own name, domain, and visual identity. Cross-links between verticals use each site's own brand.

## Key Backend References

- Embed endpoints: `/home/groot/aicrm/backend/app/api/v1/embed.py`
- Agent management: `/home/groot/aicrm/backend/app/api/v1/agents.py` (lines 265-390 for embed settings)
- Agent model: `/home/groot/aicrm/backend/app/models/agent.py` (embed_enabled, allowed_domains, public_id)
- Widget source: `/home/groot/aicrm/frontend/src/widget/widget.ts`
- Origin validation: `/home/groot/aicrm/backend/app/core/origin_validation.py`
