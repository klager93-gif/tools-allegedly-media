# Signal Labs Combined Release

## Versions

```text
Home: v0.5.1 — Navigation Refresh & Paycheck Integration
Overtime: v0.9.9 — Pre-1.0 Sync & Metadata Cleanup
Time Off: v0.9.9 — Pre-1.0 Cleanup & Report Fix
Paycheck: v0.1 — Foundation
```

## Backup Reminder

Before uploading this release, back up the current live Home/root folder and tool folders.

## Backup Folder Name

```text
2026-06-08-before-home-v0.5.1-paycheck-v0.1-navigation-refresh-paycheck-integration
```

## GitHub Title

```text
Home v0.5.1 + Paycheck v0.1 — Navigation Refresh & Paycheck Integration
```

## GitHub Summary

```text
- Updated Home to v0.5.1 with Paycheck integration.
- Added Paycheck Calculator v0.1 foundation files.
- Added Paycheck to Home tool cards and shared navigation.
- Refreshed desktop navigation with pill-style links.
- Added mobile hamburger/collapsible navigation behavior.
- Updated master changelog, master roadmap, release history, Home documentation, manifests, and build checks.
- Preserved Overtime v0.9.9 and Time Off v0.9.9 behavior.
```

## Upload Instructions

Copy all files and folders in this package into the matching live locations. Replace complete files, not snippets.

```text
root files -> site root
assets/* -> /assets/
overtime/* -> /overtime/
timeoff/* -> /timeoff/
paycheck/* -> /paycheck/
backups/* -> /backups/
```

## Expected Results

- Home footer shows v0.5.1.
- Home includes a Paycheck Calculator card.
- Shared navigation includes Home, Overtime, Time Off, and Paycheck.
- Desktop navigation uses pill-style links.
- Mobile navigation uses a collapsible Menu button.
- Paycheck Calculator opens and shows v0.1.
- Overtime remains v0.9.9.
- Time Off remains v0.9.9.

## Validation Checklist

- Open `/`.
- Open `/overtime/`.
- Open `/timeoff/`.
- Open `/paycheck/`.
- Confirm all footer versions.
- Confirm global asset cache-busting uses `v=0.5.1`.
- Confirm Paycheck Copy Results works.
- Confirm Paycheck Print Report opens a populated report window.
- Confirm mobile navigation opens and closes.
