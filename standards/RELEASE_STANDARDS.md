# Release Standards

## Hotfixes

Hotfixes include only affected files and required internal changelog updates.

## Full Replacement Rule

Before full-replacement packages, ask whether the user is deleting/replacing the whole Signal Labs folder.

If yes, include every live top-level folder, even unchanged ones.

## Shared Asset Releases

Shared asset releases must include all affected page files and cache-busting updates.

## Rule 23 — Version Consistency

Whenever a tool version changes:

- Update all visible version references.
- Update status cards.
- Update footer versions.
- Update hero text where applicable.
- Update cache-busting query strings for changed tool files.
- Search the entire tool for stale version references.
- No page should display an older version than the current release.
- If a global component affects multiple pages, all affected pages must be updated together.

## Rule 24 — Backend Portability

Backend releases must preserve service/repository/adapter boundaries. Do not couple UI or scheduling engines directly to Cloudflare D1, Workers, PHP, MySQL, or any other backend.

## Rule 25 — Tools Own Their Infrastructure

No new folders, backend components, APIs, functions, or infrastructure files should be placed in the repository root unless they are intentionally shared by multiple tools. Tool-specific infrastructure belongs inside that tool’s directory, such as `/schedule/`. Root-level additions require explicit justification.

## Rule 26 — Build Response Standard

Every build response must include a concise release handoff with:

- Download link.
- Source release used.
- Files changed, grouped by directory when practical.
- GitHub title in copyable form.
- GitHub description in copyable form.
- What changed.
- What did not change.

Long architectural explanations are optional unless the user asks for them.

## Rule 27 — Release Archives Are Backups

Released ZIP files are complete snapshots and are considered the authoritative backup and restore point for each release.

Use dated release folders instead of duplicate backup folders:

```text
Releases/
  YYYY-MM-DD/
    release-zip-files
```

Do not require a separate `Backups/` folder for normal releases. Manual folder backups are reserved for risky experiments, large manual edits outside Git, temporary sandboxes, or unreleased testing.

Preferred workflow:

```text
Current
↓
Release ZIP
↓
GitHub
```
