# Signal Labs Paycheck Release

## Versions

```text
Paycheck: v0.4.1 — Script Cache-Busting Hotfix
```

## Backup Reminder

Before uploading this release, back up the current live Paycheck files.

## Backup Folder Name

```text
2026-06-08-before-paycheck-v0.4.1-script-cache-busting-hotfix
```

## Upload Instructions

Copy the included files into their matching live locations.

This hotfix package intentionally includes only the affected Paycheck files and required documentation files.

## Expected Results

- Paycheck loads `script.js?v=0.4.1`.
- Pay Details pill controls function correctly.
- Paycheck build/footer labels show v0.4.1.
- Paycheck report metadata shows v0.4.1.
- Changelog, master changelog, release history, and manifests are synchronized.

## Validation Checklist

- Open `/paycheck/`.
- Confirm Pay Details pills respond when clicked.
- Confirm footer says `Signal Labs · Paycheck Calculator · v0.4.1`.
- Confirm script reference uses `script.js?v=0.4.1`.
- Confirm Copy Results works.
- Confirm Print Report opens and shows v0.4.1.
