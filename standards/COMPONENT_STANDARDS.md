# Component Standards

## Shared Components

Shared components include:

```text
assets/components/header.js
assets/components/footer.js
assets/global.js
assets/global.css
```

Future components:

```text
assets/components/actionbar.js
assets/components/toast.js
assets/components/modal.js
assets/reports/report-base.js
```

## Before Changing Shared Components

Identify:

- affected pages
- unaffected pages
- legacy pages not yet migrated
- required cache-busting changes

## Avoid Drift

Prefer shared components over copied markup.

If copied markup still exists, do not assume shared component changes will affect it.
