# Release Standards

## Release Response Requirements

Every release response should include:

- Backup reminder
- Backup folder name
- Download link
- GitHub title
- GitHub summary
- Validation
- Files changed
- Build metadata

## Backup Naming

Use:

```text
YYYY-MM-DD-before-[release-name]
```

## Hotfixes

Hotfix packages should include only affected files and required internal changelog updates.

Do not include public changelog changes for internal-only hotfixes unless the user-visible product changed.

## Full Replacement Packages

Before building a full replacement package, ask:

```text
Are you deleting and replacing the entire Signal Labs folder from this ZIP?
```

If yes, include every live top-level folder, even unchanged ones.

## Version Synchronization

When a page/tool version changes, verify:

- visible version text
- metadata attributes
- shared component version behavior
- cache-busting query strings
- docs/manifests/changelogs

## Nuclear Option Trigger

After two failed hotfixes for the same issue, stop hotfixing and invoke the Nuclear Option.
