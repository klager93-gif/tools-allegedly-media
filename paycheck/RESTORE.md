# Paycheck v0.8.5 Restore Instructions

## Backup Folder

`2026-06-10-before-paycheck-v0.8.5-tool-action-bar-foundation`

## Restore Steps

1. Confirm the current live Paycheck files are backed up externally.
2. Upload the contents of the `paycheck/` folder from this package to `/paycheck/`.
3. Upload `MASTER-CHANGELOG.md` to the repository root.
4. Commit changes to GitHub.
5. Allow Coolify/static deployment to complete.
6. Verify the live Paycheck page.

## Verification

- Footer shows `Signal Labs · Paycheck Calculator · v0.8.5`.
- Build card shows `Build: v0.8.5`.
- Theme shows `Tool Action Bar Foundation`.
- The visible `⋮ Actions` button is gone.
- Setup actions, Calculate Paycheck, Copy Results, and Print Report are visible in a clean action bar.
- Mobile view places Calculate Paycheck first.
