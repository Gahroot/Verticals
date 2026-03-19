Scaffold a new vertical site from the template, create its CRM agent, create GitHub repo, and deploy to Vercel — fully hands-off.

## Prerequisites

- Domain must be purchased before running this command
- `gh` CLI authenticated (GitHub)
- `vercel` CLI authenticated (Vercel)
- Railway CLI authenticated (backend)

## Steps

1. Read and validate `registry/$ARGUMENTS.json` using the Zod schema in `scripts/lib/config.ts`
2. Copy the `template/` directory to the vertical's `repoDir` (from the config)
3. Generate `src/lib/vertical.config.ts` from the registry config
4. Update `package.json` name to `vertical-$ARGUMENTS`
5. Write `.env.local` with `BACKEND_URL` and `AGENT_PUBLIC_ID` from the config
6. Generate `src/lib/nav-data.ts` with vertical-appropriate navigation links
7. Generate `src/lib/crosslinks.ts` from `relatedVerticals` in the config
8. Run `git init` in the new directory
9. Run `npm install`
10. Run `npm run typecheck && npm run build` to verify everything works
11. Update `registry/verticals.json` to set the vertical's status to "active"
12. Run `npm run setup-agent -- $ARGUMENTS` to create the CRM agent with embed enabled
13. Re-generate `src/lib/vertical.config.ts` with the new `publicId` from step 12
14. Update `.env.local` with the new `AGENT_PUBLIC_ID`
15. Rebuild the vertical site so the embed widget is configured with the real `publicId`
16. Create GitHub repo (`gh repo create Gahroot/{brandName} --public --source . --push`)
17. Link to Vercel (`vercel link --yes`) and store project ID in registry
18. Add custom domain and www subdomain (`vercel domains add`)
19. Run production deploy (`vercel deploy --prod`)
20. Run `/wire-agent $ARGUMENTS` to add the vertical's domain to backend CORS and verify embed endpoints work
21. Connect GitHub repo to Vercel for auto-deploys (`vercel git connect`)

Everything runs via `npm run scaffold -- $ARGUMENTS` — a single command that handles the entire lifecycle.

## OG Images & Favicons

Automatically generated per-vertical using `next/og` ImageResponse:
- **OG image**: Brand initial + theme gradient + tagline (1200x630)
- **Twitter card**: Same as OG image
- **Favicons**: Brand initial on theme gradient (192x192, 512x512)
- **Manifest**: Dynamic route reads brand name and theme from config

No manual image creation needed.

## Usage

```
/new-vertical painters
/new-vertical hardscaping
/new-vertical windows-doors
```
