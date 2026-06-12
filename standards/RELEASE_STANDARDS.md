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

