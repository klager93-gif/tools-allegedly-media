# Build Manifest

Release: Schedule v2.17.1 — Asset Drift & Load Cleanup
Package: signal-schedule-v2.17.1-asset-drift-load-cleanup.zip
Scope: Full-root replacement
Database: No new migration; remains at 023 request_approval_workflow

## Summary

- Normalized Schedule asset cache-busting query strings to v2.17.1.
- Removed duplicate root header/footer component loads from Schedule pages.
- Standardized Schedule footer loading order.
- Updated stale page asset references and Schedule metadata.
- Preserved all valid files for full-root replacement.
