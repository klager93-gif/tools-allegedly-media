# Schedule v2.2.0 — Leave Requests Foundation

This release turns the Leave Requests placeholder into a preview-only admin workflow.

## Included

- Leave request types
- Leave request preview records
- Admin review dashboard preview
- Disabled request intake form
- Staffing impact placeholders
- Calendar impact planning
- Adapter / repository / service boundaries
- Read-only API contract
- Future Postgres planning schema

## Not Included

- Live request submission
- Approval or denial writes
- Authentication
- Role enforcement
- Calendar write integration
- Minimum staffing enforcement

## Identity Dependency

Production leave requests should reference employee records through the admin-entered agency employee ID while authentication should be handled through the separate future users table.
