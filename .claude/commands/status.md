Check the status of all verticals in the registry.

## Steps

1. Load `registry/verticals.json`
2. For each vertical, load its full config and report:
   - **Status**: planned / active / paused
   - **Domain**: configured domain
   - **Agent**: whether `publicId` is set (CRM agent created)
   - **Phone**: whether a phone number is assigned
   - **Vercel**: whether `projectId` is set (linked to Vercel)
   - **Last deployed**: timestamp or "never"
   - **Repo exists**: check if `repoDir` directory exists
3. If the vertical is active and has a domain, optionally check:
   - Whether the site responds (curl the domain)
   - Page count (count files in best-for, alternatives, blog directories)
4. Print a summary table

## Output format

```
Vertical Status Dashboard
========================

painters (PainterAI)
  Status:    active
  Domain:    painterai.com
  Agent:     ✓ (abc123)
  Phone:     ✓ (+1-555-0100)
  Vercel:    ✓ (prj_xxx)
  Deployed:  2026-03-18
  Content:   5 best-for, 3 alternatives, 3 blog posts

hardscaping (HardscapeAI)
  Status:    planned
  Domain:    hardscapeai.com
  Agent:     ✗
  ...
```

## Usage

```
/status
```
