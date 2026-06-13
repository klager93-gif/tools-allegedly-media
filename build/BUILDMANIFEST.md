# Build Manifest — Schedule v2.2.1

## Release

- Tool: Schedule
- Version: v2.2.1
- Release name: Request Hours & Admin Override Foundation
- Backup title: 2026-06-12 Schedule Backup Before v2.2.1
- Deployment default: merge / overwrite
- Full-root replacement: only if explicitly chosen for cleanup

## Scope

- Built from: Schedule v2.2.0 Leave Requests Foundation full-root package
- Paycheck touched functionally: No
- Overtime touched functionally: No
- Timeoff touched functionally: No
- Schedule nav linked: Yes
- Junk/work folders included: No

## Added Files

- `schedule/RELEASE-v2.2.1.md`
- `schedule/REQUEST-HOURS-FOUNDATION.md`
- `schedule/api/contracts/request-hours.read.schema.json`
- `schedule/api/coolify/sql/009_request_hours_foundation_schema.sql`
- `schedule/data/request-increment-settings.json`
- `schedule/services/RequestHoursService.js`

## Modified Files

- `ADMIN_CHANGELOG.md`
- `HOWTO.md`
- `MASTER-CHANGELOG.md`
- `MASTER-ROADMAP.md`
- `PUBLIC_CHANGELOG.md`
- `README.md`
- `ROADMAP.md`
- `schedule/CHANGELOG.md`
- `schedule/HOWTO.md`
- `schedule/README.md`
- `schedule/ROADMAP.md`
- `schedule/adapters/JsonLeaveRequestsAdapter.js`
- `schedule/api/contracts/leave-requests.read.schema.json`
- `schedule/api/coolify/README.md`
- `schedule/api/coolify/server.js`
- `schedule/data/leave-request-types.json`
- `schedule/data/leave-requests-preview.json`
- `schedule/leave-requests.css`
- `schedule/leave-requests.js`
- `schedule/leave.html`
- `schedule/repositories/LeaveRequestRepository.js`
- `schedule/services/LeaveRequestService.js`

## Removed Files

None

## Validation

- JS syntax checks passed
- Coolify server syntax check passed
- Schedule JSON files valid
- No `__MACOSX` folder
- No `.git` folder
- No `.DS_Store` files
- No AppleDouble `._*` files
