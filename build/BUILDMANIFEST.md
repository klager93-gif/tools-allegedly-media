# Build Manifest — Signal Schedule v0.17.1 UI Debt Audit

## Source

- Source ZIP: `signal-schedule-v0.17.0-goal-mode-foundation.zip`
- New ZIP: `signal-schedule-v0.17.1-ui-debt-audit.zip`

## Purpose

This build performs a UI Debt Audit after v0.17.0. It removes foundation-preview dashboard panels that were increasing render registry risk while preserving analytics, notification, and goal-mode concepts in documentation, text output, and data-model planning.

## Validation

- JavaScript syntax checked with `node --check`.
- Render registry validation passed.
- All `safeRender()` calls resolve to defined render functions.
- Removed preview panel IDs are no longer present in `schedule/index.html`.
- ZIP integrity checked.
- SHA256 sums regenerated.
