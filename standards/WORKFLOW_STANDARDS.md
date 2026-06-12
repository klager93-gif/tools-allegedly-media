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
