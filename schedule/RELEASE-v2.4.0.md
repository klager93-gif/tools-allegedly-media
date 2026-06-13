# Signal Schedule v2.5.0 — Overtime Opportunity Board Foundation

## Release type

Feature foundation release.

## Summary

This release turns the prior Open Shifts/VOT preview into an admin-first Overtime Opportunity Board. It previews how supervisors/admins will post available overtime, define required coverage slots, review volunteer interest, compare eligibility, and preview award recommendations before final approval.

## Added

- Posted OT opportunity cards.
- Open slot counts.
- Coverage status and priority display.
- Volunteer count per opportunity.
- Recommended award preview.
- Opportunity filters.
- Admin post-opportunity preview form.
- Award review panel.
- Eligibility rules per opportunity.
- Seniority rank and eligibility status per volunteer.

## Still preview-only

- Posting an opportunity does not write to the database yet.
- Awarding an opportunity remains disabled.
- Authentication and role permissions are not active yet.
- Fatigue, equalization, and seniority logic are represented only as preview data.

## Replace guidance

Replace the entire `/schedule/` folder only. This is not a full-root infrastructure release.
