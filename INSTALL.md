# Signal Labs Shared UX Foundation Release

## Versions

```text
Home: v0.6 — Shared UX Foundation
Paycheck: v0.3.3 — Shared Action Bar
Overtime: v0.9.9.2 — Shared Action Bar
Time Off: v0.9.9 — Shared Action Bar
```

## Backup Reminder

Before uploading this release, back up the current live version.

## Backup Folder Name

```text
2026-06-08-before-home-v0.6-shared-ux-foundation-paycheck-v0.3.3-overtime-v0.9.9.2-timeoff-v0.9.9
```

## Upload Instructions

Copy all files into the matching live locations.

## Expected Results

- Home shows v0.6.
- Global assets use v0.6 cache busting.
- Paycheck, Overtime, and Time Off each show a sticky shared action bar.
- Calculate, Example, Reset, Copy Results, and Print Report still work where available.
- Paycheck Save Settings still works.
- Existing calculator logic remains unchanged.

## Validation Checklist

- Open `/` and confirm Home v0.6.
- Open `/paycheck/` and confirm the action bar appears and Paycheck v0.3.3 displays.
- Open `/overtime/` and confirm the action bar appears and Overtime v0.9.9.2 displays.
- Open `/timeoff/` and confirm the action bar appears and Time Off v0.9.9 displays.
- Test Calculate, Copy Results, and Print Report on each tool.
- Hard refresh after upload if old CSS or JS appears.
