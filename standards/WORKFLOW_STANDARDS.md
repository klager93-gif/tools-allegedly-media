# Workflow Standards — Signal Schedule v1.0.0 Update

- Before packaging, validate every render registry entry against an actual defined function. Fail the build if any registered renderer is missing.
- Foundation releases should not add new dashboard-style preview panels unless the UI itself is the purpose of the release.
- Architecture-complete releases should audit relationships, assumptions, and database readiness instead of adding feature UI.
- Multi-agency support must use configurable facts and vocabulary, not hard-coded agency-specific engine branches.
- Backend portability is required. No UI or business logic may depend directly on D1, Workers, MySQL, PHP, or any backend-specific implementation.

# Workflow Standards

## Session Startup

At the start of a Signal Labs work session:

- Chat title should be YYYY-MM-DD.
- Review current versions.
- Review roadmap.
- Review active bugs/issues.
- Review releases in progress.
- Determine full replacement or partial update.

## Nuclear Option

Nickname: Nuclear Option.

Trigger: two failed hotfixes for the same issue.

Procedure:

1. Stop patching.
2. Compare the last release ZIP from the dated `Releases/` folder.
3. Compare latest ZIP.
4. Compare GitHub.
5. Compare live site.
6. Inspect affected files line-by-line if needed.
7. Identify root cause.
8. Build one corrective package.

For shared visual components, inspect both component JavaScript and matching CSS.

## Global Change Workflow

If a shared asset changes, update and verify every page that depends on it.


## Release Archive Workflow

Normal releases should be saved as ZIP archives in dated `Releases/` folders. These release archives are the project backups. Do not duplicate the same release by also copying the current folder into a separate `Backups/` folder unless the work is experimental or outside the normal Git/release process.

## Rule 23 — Foundation UI Restraint

Do not create new preview panels for every foundation release. Foundation releases should usually update documentation, data-model notes, workflow standards, manifests, and small conceptual code changes. Add a new render function or registry entry only when the UI itself is the purpose of the release.

Before packaging, validate that every render registry entry and every safeRender call points to a defined render function. Fail the build if any renderer is missing.


## Rule 24 — Backend Portability Required

No UI or business logic may depend directly on D1, Workers, MySQL, PHP, or any backend-specific implementation. All persistence must go through service, repository, and adapter layers so the backend can be replaced later with minimal changes.

D1 is the first likely adapter because the live deployment is already GitHub to Cloudflare. It must not become a lock-in point.


## Rule 25 — Tools Own Their Infrastructure

No new folders, backend components, APIs, functions, or infrastructure files should be placed in the repository root unless they are intentionally shared by multiple tools. Tool-specific infrastructure belongs inside that tool’s directory, such as `/schedule/`. Root-level additions require explicit justification.
