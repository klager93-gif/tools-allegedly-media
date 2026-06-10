# Restore Instructions — Home v0.8.0

## Release

Home v0.8.0 — Signal Labs Design System

## Restore Previous Version

If this release causes problems:

1. Restore the external backup created before upload.
2. Revert Home files to the previous successful Home release.
3. Confirm `index.html` no longer references `assets/global.css?v=0.8.0` or `assets/global.js?v=0.8.0` if reverting shared assets.
4. Redeploy through GitHub/Coolify.
5. Verify Home and tool pages load.

## Files Most Likely To Revert

```text
index.html
assets/global.css
assets/global.js
```

## Documentation Files

If reverting fully, also restore the documentation files included in this release package.
