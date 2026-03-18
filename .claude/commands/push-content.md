Push content from a template to one or more vertical sites.

## Arguments

`$ARGUMENTS` should be in the format: `{template-name} [--vertical {slug}]`

If no `--vertical` is specified, push to ALL active verticals.

## Steps

1. Read the template from `content-library/` matching the template name
2. Load the target vertical config(s) from `registry/`
3. Replace template variables with vertical-specific values:
   - `{{BRAND}}` → `brandName`
   - `{{INDUSTRY}}` → `industry.name`
   - `{{SHORT_NAME}}` → `industry.shortName`
   - `{{DOMAIN}}` → `domain`
   - `{{PAIN_POINT}}` → `industry.painPoint`
   - `{{AVG_TICKET}}` → `industry.avgTicket`
   - `{{TAGLINE}}` → `tagline`
4. Copy the processed content to each vertical's content directory
5. Run typecheck in each affected vertical to verify

## Usage

```
/push-content blog-speed-to-lead --vertical painters
/push-content blog-speed-to-lead
```
