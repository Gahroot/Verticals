Wire a vertical's AI agent: add its domain to backend CORS, update demo-api.ts to use embed endpoints, deploy frontend, and verify everything works.

## Prerequisites

- Vertical must be scaffolded and have a `publicId` in its registry config
- Railway CLI authenticated
- Vercel CLI authenticated

## Steps

1. Read `registry/$ARGUMENTS.json` and extract: `domain`, `agent.publicId`, `agent.backendUrl`, `repoDir`, `brandName`
2. **Validate agent exists** — Confirm `agent.publicId` is set and not null. If missing, stop and tell the user to run `/new-vertical $ARGUMENTS` or `npm run setup-agent -- $ARGUMENTS` first.
3. **Update `demo-api.ts`** — In the vertical's `repoDir`, check `src/lib/demo-api.ts`. If it still uses a hardcoded URL (contains `p/demo` or a literal URL string instead of config import), replace it with:

```typescript
import { config } from "@/lib/vertical.config";

const EMBED_API_BASE = `${config.agent.backendUrl}/api/v1/p/embed/${config.agent.publicId}`;

export interface DemoResponse {
  success: boolean;
  message: string;
}

export async function triggerDemo(
  type: "call" | "text",
  phoneNumber: string
): Promise<DemoResponse> {
  const response = await fetch(`${EMBED_API_BASE}/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone_number: phoneNumber }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Something went wrong. Please try again.");
  }

  return response.json();
}
```

If it already uses the config import pattern, skip this step (already wired).

4. **Add domain to CORS_ORIGINS** — From `/home/groot/aicrm`, run:
   ```bash
   railway variables get CORS_ORIGINS
   ```
   Parse the JSON array. Check if `https://{domain}` is already present. If not, append both `https://{domain}` and `https://www.{domain}` to the array. Then set the updated value:
   ```bash
   railway variables set CORS_ORIGINS='[...updated array...]'
   ```
   If both domains are already present, skip this step and note it was already configured.

5. **Wait for Railway redeploy** — The CORS env var change triggers an automatic Railway redeploy. If CORS was updated in step 4, wait ~90 seconds for the redeploy to complete. Then verify with a preflight check:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" -X OPTIONS \
     -H "Origin: https://{domain}" \
     -H "Access-Control-Request-Method: POST" \
     "{backendUrl}/api/v1/p/embed/{publicId}/call"
   ```
   Expected: 200. If not 200, wait another 30s and retry once.

6. **Deploy frontend** — From the vertical's `repoDir`, run:
   ```bash
   vercel --prod --yes
   ```

7. **Verify embed endpoint** — curl the embed call endpoint with the Origin header:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" -X POST \
     -H "Content-Type: application/json" \
     -H "Origin: https://{domain}" \
     -d '{"phone_number": "+15555555555"}' \
     "{backendUrl}/api/v1/p/embed/{publicId}/call"
   ```
   Expected: 422 (validation error because it's a fake number, but proves the endpoint is reachable and CORS allows the origin — not 404 or 403).

8. **Report results** — Summarize what was done:
   - Whether demo-api.ts was updated or already correct
   - Whether CORS domains were added or already present
   - Frontend deploy URL
   - Verification result (status code)

## Usage

```
/wire-agent windows-doors
/wire-agent painters
/wire-agent hardscaping
```
