# Signal Labs Overtime Release

## Versions

```text
Overtime: v0.9.8 — UX Flow & Plain-English Polish
Time Off: v0.9.8 — Quick Start + Stacked Layout
```

## Backup Reminder

Before uploading this release, back up the current live Overtime folder.

## Backup Folder Name

```text
2026-06-08-before-overtime-v0.9.8-ux-flow-plain-english-polish
```

## Upload Instructions

Copy the updated Overtime files into the matching live location:

```text
overtime/* -> /overtime/
```

Also copy these Home-level master docs into the Signal Labs Home/root folder:

```text
MASTER-CHANGELOG.md
MASTER-ROADMAP.md
```

Time Off remains unchanged at v0.9.8.

## Expected Results

### Overtime

- The main input card is renamed to Overtime Details.
- Deductions & Adjustments appears before Pay Details.
- Pay Details replaces Advanced Pay.
- Target Pay replaces Goal Mode.
- Estimated Pay replaces Results.
- Total Gross Pay becomes Before Taxes (Gross).
- Estimated Take-Home Pay becomes Take-Home Pay (Net).
- Section descriptions use plainer, more user-friendly wording.
- Info icons provide short examples for deductions, pay details, and target pay.
- Suggested tax, deduction, and other adjustment pills remain inside their modal windows.
- Static Amount / Percentage selector remains available for deductions and other adjustments.
- Saved settings, Print Report, and Copy Results still work.

### Time Off

- No files changed.
- Remains v0.9.8.

## Validation Checklist

- Open `/overtime/`.
- Confirm footer says `Signal Labs · Overtime Calculator · v0.9.8`.
- Confirm build card says `v0.9.8`.
- Confirm stylesheet and script cache-busting references use `v=0.9.8`.
- Confirm section order:
  1. Overtime Details
  2. Deductions & Adjustments
  3. Pay Details
  4. Target Pay
  5. Estimated Pay
- Confirm Add Tax modal pills appear inside the modal.
- Confirm Add Deduction modal pills and Static Amount / Percentage controls appear inside the modal.
- Confirm Add Other modal pills and Static Amount / Percentage controls appear inside the modal.
- Confirm Copy Results works.
- Confirm Print Report opens a populated report window.
- Confirm saved settings still load.
