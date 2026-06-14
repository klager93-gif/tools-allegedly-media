# Component Standards

## Shared Components

Shared components include:

```text
assets/components/header.js
assets/components/footer.js
assets/global.css
assets/global.js
```

## Matched Component Rule

Shared components and their CSS are a matched set.

Do not replace component markup without verifying the stylesheet that supports it.

Before replacing a shared component, verify:

- markup class names match existing CSS selectors,
- required CSS is included in the package,
- cache-busting is updated when shared assets change,
- affected pages are listed,
- legacy/unaffected pages are identified.

## Global Change Rule

When modifying shared assets such as:

```text
assets/components/header.js
assets/components/footer.js
assets/global.css
assets/global.js
```

treat the release as a system-wide dependency change.

The release must include:

1. Affected pages.
2. Unaffected or legacy pages.
3. Cache-busting updates for every affected page.
4. Verification that all affected page files are included.

Shared component releases are infrastructure releases, not single-page releases.

## Legacy Pages

Do not assume legacy pages inherit shared components.

Overtime and Time Off remain legacy/unmigrated until their own migration releases.
