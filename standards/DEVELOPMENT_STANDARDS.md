# Development Standards

## Core Principle

Think through consequences, dependencies, and future maintainability before making changes.

## Files Are Truth

Never rely only on memory, assumptions, or previous chat summaries.

Verify actual files when working on:

- shared components
- versioning
- cache busting
- metadata
- calculations
- releases
- recovery work

## Dependency Awareness

Before changing one file, determine what depends on it.

Examples:

- `assets/components/header.js`
- `assets/components/footer.js`
- `assets/global.js`
- `assets/global.css`
- tool-specific `script.js`
- tool-specific `style.css`

Always identify affected and unaffected pages.
