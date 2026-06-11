## Paycheck v0.9.9 — Report & Metadata Cleanup

- Synced Paycheck footer/header metadata while preserving Weekly OT profile support.


## Home v0.9.1 — Shared Header & Footer Components

**Date:** 2026-06-10

### Changes

- Added shared header and footer components.
- Updated Home and public pages to use the shared layout components.
- Removed public page version/theme pills from the page hero area.
- Kept public pages as real HTML pages instead of markdown downloads or popups.

---

# Signal Labs Public Changelog

## v0.9.0 — Public Pages Architecture

**Date:** 2026-06-10

### User-facing changes

- Added real public pages for Changelog, Roadmap, How To, Report Issue, Request Feature, Contact, About, Privacy, Terms, and Status.
- Updated Home footer links to open pages instead of markdown files or popups.
- Removed developer-only footer links such as Calculator Standards, README, and Documentation from the public footer.
- Kept mobile and desktop footer behavior consistent by using normal page links.



## v0.8.5 — Documentation & File Cleanup

**Date:** 2026-06-10

- Cleaned up Home documentation so public and admin changelogs are the active Home history files.
- Removed the duplicate regular Home changelog from the release package after preserving history in the public/admin changelog system.
- Retired the duplicate release-history file in favor of the permanent append-only master changelog.
- Updated Home documentation and manifests to point to `PUBLIC_CHANGELOG.md`, `ADMIN_CHANGELOG.md`, and `MASTER-CHANGELOG.md`.
- Added cleanup guidance for old changelog files that should be deleted from the repository after upload.
- No calculator logic changes.


## v0.8.4 — Hero Control Polish

**Date:** 2026-06-10

### Changes

- Improved the optical centering of the Home hero `Explore Tools` button.
- Converted hero buttons to explicit flex alignment for cleaner text and arrow positioning.
- Added a clearer gap between the primary button label and arrow.
- Simplified the `How It Works` control by removing the info icon from the visible label.
- No calculator logic changes.

---


## v0.8.3 — Homepage Density Pass

**Date:** 2026-06-10

- Improved the Home page on mobile by reducing oversized cards, spacing, and the hero graphic.
- Made the footer easier to use on mobile with collapsible Resources, Support, and About sections.
- Tightened desktop spacing while preserving the redesigned Signal Labs look.
- Added footer placeholder pages to the future work list.


## v0.8.2 — Homepage Redesign

**Date:** 2026-06-10

- Redesigned the Signal Labs Home page with a cleaner dark dashboard layout.
- Added the new Signal Labs tagline and clearer site description.
- Improved the main navigation so it feels more consistent with the newer tool action bar style.
- Added updated tool cards for Paycheck, Overtime, and Time Off.
- Added a "Why Signal Labs?" section.
- Redesigned the footer with Resources, Support, About, Status, and quick links.

---
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

- Added the foundation for a more consistent Signal Labs interface.
- Improved shared styling for navigation, action bars, buttons, cards, empty states, and popups.
- Prepared the site for a future consistent header, footer, and navigation system across all tools.
- Added a cleaner public changelog structure for Home.

---

## Home v0.7.1 — Version Synchronization

**Date:** 2026-06-10

- Corrected Home version labels so the page version matches the release.

---

## Home v0.7.0 — Standards Architecture

**Date:** 2026-06-10

- Added a stronger project structure for consistent future development.
