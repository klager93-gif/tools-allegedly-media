# Home v0.8.0 Build Manifest

## Release

Home v0.8.0 — Signal Labs Design System

## Build Date

2026-06-10

## Source

- GitHub repository reviewed: https://github.com/klager93-gif/tools-allegedly-media
- GitHub standards reviewed before build.
- Current-chat approved decisions used for design-system scope.
- Home v0.7.1 package used as the most recent successful Home package baseline when newer than GitHub page text.

## Build Type

Full replacement Home/shared-asset release package.

## Scope

Changed:

- Home page version and design-system messaging.
- Shared global CSS.
- Shared global JavaScript.
- Standards language for shared design-system releases.
- Home documentation.
- Home public/admin changelog split.

Not changed:

- Paycheck calculator logic.
- Overtime calculator logic.
- Time Off calculator logic.
- Tool folder contents.

## Validation

```text
ZIP integrity passed.
assets/global.js syntax check passed.
Home index references assets/global.css?v=0.8.0.
Home index references assets/global.js?v=0.8.0.
Shared design-system files included.
PUBLIC_CHANGELOG.md included.
ADMIN_CHANGELOG.md included.
MASTER-CHANGELOG.md updated.
SHA256SUMS.txt generated.
```
