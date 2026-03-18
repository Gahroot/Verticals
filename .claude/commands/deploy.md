Deploy a vertical site to Vercel.

## Arguments

`$ARGUMENTS` = vertical slug (e.g., `painters`)

## Steps

1. Load the vertical config from `registry/$ARGUMENTS.json`
2. `cd` to the vertical's `repoDir`
3. Run `npm run build` to verify the build passes
4. If `vercel.projectId` is null in the config:
   - Run `vercel link` to link the project
   - Update `registry/$ARGUMENTS.json` with the project ID
5. Run `vercel deploy --prod`
6. If a custom domain is configured, verify it's added: `vercel domains ls`
7. Run the IndexNow submission script if `seo.indexNowKey` is set
8. Update `lastDeployedAt` in `registry/$ARGUMENTS.json`
9. Verify the site loads at the deployed URL

## Post-deploy checks

- Embed widget loads and connects to backend
- No CORS errors in browser console
- Sitemap is accessible at `/sitemap.xml`
- JSON-LD is present in page source

## Usage

```
/deploy painters
/deploy hardscaping
```
