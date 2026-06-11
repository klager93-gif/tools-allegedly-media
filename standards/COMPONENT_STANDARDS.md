# Component Standards

## Shared Components

Shared components include:

- assets/components/header.js
- assets/components/footer.js
- assets/global.css
- assets/global.js

## Matched Component Rule

Shared components and their CSS are a matched set.

Do not replace component markup without verifying the stylesheet that supports it.

Before replacing a shared component, verify:

- markup class names match existing CSS selectors,
- required CSS is included in the package,
- cache-busting is updated when shared assets change,
- affected pages are listed,
- legacy/unaffected pages are identified.

If a shared component visually breaks after hotfixes, invoke the Nuclear Option.
