Scaffold a new vertical site from the template and create its CRM agent.

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

## Usage

```
/new-vertical painters
/new-vertical hardscaping
/new-vertical windows-doors
```
