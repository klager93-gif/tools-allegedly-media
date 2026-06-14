# Signal Schedule Roadmap

## Current: v4.4.0 — Saved Schedule CRUD + True Release Rebuild

The 4.4 release adds the first protected database-backed save/load foundation for schedule drafts and published schedule payloads. It also cleans the release package so GitHub receives real changed files instead of a renamed v4.3 package.

## Near-Term Roadmap

- v4.5.0 — Authentication, roles, and real logins while preserving View As.
- v4.6.0 — Post, seat, console, beat, station, and apparatus assignment engine.
- v4.7.0 — Overtime, vacancy, volunteer, award, and open-shift engine.
- v4.8.0 — Mandation engine with queue, rules, exceptions, and audit.
- v5.0.0 — Alpha milestone with admin, employee portal, builder, requests, publication, and core schedule intelligence working together.

## Permanent View System Direction

View As remains after authentication. The system should support View As employee, group, role, location, department, qualification, shift, pattern, post, and compound saved views. Anything visible to a person or group should be inspectable by an authorized scheduler without needing that user's password.

## Long-Term Vision

- 4.x: Make it usable for real schedule testing.
- 5.x: Make it coherent enough for alpha users.
- 6.x: Make it strong enough to challenge enterprise scheduling systems.
