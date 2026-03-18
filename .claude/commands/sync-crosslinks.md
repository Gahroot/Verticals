Sync cross-links across all active vertical sites.

## Steps

1. Load `registry/verticals.json` to get all active verticals
2. For each active vertical:
   a. Load its full config from `registry/{slug}.json`
   b. Build a crosslinks array from ALL OTHER active verticals (name, domain, tagline)
   c. Write `src/lib/crosslinks.ts` in the vertical's repo with the cross-link data
   d. Update the footer component data to include a "Network" section with cross-links
3. Run typecheck in each affected vertical
4. Optionally commit changes in each vertical repo

## Output format for crosslinks.ts

```typescript
export const crosslinks = [
  {
    name: "HardscapeAI",
    domain: "hardscapeai.com",
    url: "https://hardscapeai.com",
    tagline: "AI Receptionist for Hardscaping Contractors",
  },
  // ... other verticals
];
```

## Usage

```
/sync-crosslinks
```
