# Signal Labs Development Standards v3.0

## Core Philosophy

Useful tools without the noise. Files do not lie. Releases must be understandable months later.

## 1. Versioning and Release Discipline

- Every change gets a version.
- Visible versions must agree.
- No page may display an older version than the current release.
- Changelog, roadmap, manifests, and documentation are part of the release.

## 2. Build Accountability

Every build must disclose exactly what changed, what was added, what was removed, what was included unchanged, and what was validated.

## 3. Single Source Naming

Every release begins with one Release Title. GitHub title, backup title, ZIP filename, changelog header, and release notes are derived from it.

## 4. Replace Scope Must Match Package Scope

Tool packages replace only that tool folder. Full-root packages may replace the repository root. Never recommend broader replacement than the package contains.

## 5. Whole Files Only

No snippets as release deliverables. Replace complete files or folders.

## 6. Shared Asset Rule

Changes to shared assets, headers, footers, global CSS, or global JS must be validated across all affected tools.

## 7. Tool Ownership and Portability

Tool-specific infrastructure belongs inside the tool folder. For Schedule, adapters, repositories, services, models, validators, API, data, and SQL belong under /schedule/.

## 8. Navigation Responsibility

New pages require navigation updates. Desktop, mobile, dropdowns, and cross-links must be reviewed. No new page should be unreachable.

## 9. Documentation Standards

Each tool should maintain README.md, ROADMAP.md, CHANGELOG.md, HOWTO.md, FILEMANIFEST.md, and BUILDMANIFEST.md. Master docs remain at the root.

## 10. Validation Standards

Before packaging, validate syntax, imports, render functions, manifest consistency, broken references, version consistency, and package cleanliness.

## 11. Nuclear Option

After two failed hotfixes, stop. Compare backup, release ZIP, GitHub, and live deployment line-by-line before a third fix.

## 12. Architecture First

Prefer models, repositories, services, adapters, API contracts, and data boundaries before UI polish.

## 13. Feature Responsibility

A feature includes pages, navigation, documentation, changelog, roadmap, manifests, validation, and cross-tool impact review.

## 14. Release Handoff Standards

Every build response must be presented in this order:

1. Release Title
2. ZIP Filename
3. Download Link
4. Backup Title
5. GitHub Title
6. GitHub Description
7. Replace Recommendation
8. Files Modified
9. Files Added
10. Files Removed
11. Files Unchanged but Included
12. Validation Performed
13. Next Planned Release

No build is complete until all thirteen sections are present. No placeholders such as "I'll give the rest next" are permitted.

## Chat Rules

- No incomplete handoffs.
- Always disclose changed files.
- Mention cross-tool impacts.
- Proactively raise architecture concerns.
- No image generation unless explicitly requested.

## Package Rules

Exclude .git, .DS_Store, ._*, __MACOSX, and node_modules. Include release notes and updated docs.


## Database Migration Discipline

Schedule database migrations must be tracked in `schema_migrations`. Migration numbers should remain sequential whenever practical. Every migration should end with an idempotent insert into `schema_migrations` using `ON CONFLICT DO NOTHING`.


## Release File Standard — No Persistent Per-Version Release Files

Do not accumulate `RELEASE-vX.X.X*.md` files in the repository. Historical release details belong in changelogs and GitHub release/commit history. The repository should keep one current release summary at `schedule/LATEST_RELEASE.md`, overwritten each release.

## Release File Standard

Persistent per-version `RELEASE-v*.md` files should not accumulate in the repository. Use `schedule/LATEST_RELEASE.md` for the current Schedule release summary and keep historical release details in changelogs and GitHub releases.
