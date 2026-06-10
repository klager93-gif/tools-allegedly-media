# Signal Labs Home Admin Changelog

## v0.8.1 — Design System Cleanup

**Date:** 2026-06-10

### Changes

- Removed the public-facing Design System Foundation card from the Home page.
- Updated Home visible build metadata to `v0.8.1`.
- Updated Home theme text to `Design System Cleanup`.
- Preserved the shared design-system foundations added in v0.8.0 for future tool adoption.
- Kept shared asset cache-busting references at `v0.8.0` because no shared asset content changed in this release.
- No calculator logic changes.
- No shared asset content changes.

---


## Home v0.8.0 — Signal Labs Design System

**Date:** 2026-06-10

- Added shared design-system foundations after Paycheck action bar review revealed a stronger visual direction for Signal Labs.
- Added reusable styling and script foundations for future metadata-driven headers, footers, action bars, modals, dialogs, and toasts.
- Updated standards to require shared design-system review before shared layout/component releases.
- Added Home public/admin changelog split.
- Kept tool adoption gradual to avoid forcing Paycheck, Overtime, and Time Off into a global migration inside this Home release.
- GitHub remains the primary repository source; current-chat approved decisions were used for design-system direction.

---

## Home v0.7.1 — Version Synchronization

**Date:** 2026-06-10

- Added version synchronization standards after the Home footer/build labels missed the v0.7.0 bump.

---

## Home v0.7.0 — Standards Architecture

**Date:** 2026-06-10

- Split Signal Labs standards into constitution plus domain standards.
- Added workflow verification requirements and release response format rules.
