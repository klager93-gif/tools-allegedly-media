# Build Manifest

## Release

- Project: Home
- Version: v0.8.1
- Theme: Design System Cleanup
- Date: 2026-06-10
- Build type: Full replacement Home cleanup release
- Source: GitHub baseline plus Home v0.8.0 package and live visual review

## Purpose

Remove the public-facing Design System Foundation card from the Home page while preserving the shared design-system foundation for future gradual tool adoption.

## Shared Assets

- `assets/global.css` unchanged from v0.8.0.
- `assets/global.js` unchanged from v0.8.0.
- Home cache-busting references remain at `v=0.8.0` because shared asset content did not change.

## Validation

- Public Design System Foundation card removed from `index.html`.
- Home build metadata updated to v0.8.1.
- Home theme metadata updated to Design System Cleanup.
- No calculator logic changes.
- No shared asset content changes.
- SHA256SUMS.txt generated.
