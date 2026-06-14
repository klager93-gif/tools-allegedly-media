# Signal Schedule v2.26.0 File Manifest Addendum

Adds Seniority Engine Foundation files and migration 032.

- schedule/seniority.html
- schedule/seniority.css
- schedule/seniority.js
- schedule/data/seniority-engine-preview.json
- schedule/adapters/JsonSeniorityEngineAdapter.js
- schedule/repositories/SeniorityEngineRepository.js
- schedule/services/SeniorityEngineService.js
- schedule/api/contracts/seniority-engine.read.schema.json
- schedule/api/coolify/sql/032_seniority_engine_schema.sql
- schedule/api/coolify/server.js

# Signal Schedule File Manifest

## v2.25.0 — Mandation Engine Foundation

New/updated key files:

- schedule/mandation.html
- schedule/mandation.css
- schedule/mandation.js
- schedule/data/mandation-engine-preview.json
- schedule/adapters/JsonMandationEngineAdapter.js
- schedule/repositories/MandationEngineRepository.js
- schedule/services/MandationEngineService.js
- schedule/api/contracts/mandation-engine.read.schema.json
- schedule/api/coolify/sql/031_mandation_engine_foundation_schema.sql
- schedule/api/coolify/server.js
- schedule/components/footer.js
- schedule/*.html navigation/footer cache metadata


## v2.27.0 — Assignment Generator Foundation

Added assignment-generator page/assets, preview data, service/repository/adapter, API contract, SQL migration 033, and Coolify read endpoint.

## v2.28.0 — Conflict Detection Foundation

Adds Conflict Detection Foundation for generated schedules and assignment drafts. Includes double-assignment, under-minimum, over-maximum, leave overlap, missing qualification, rest-rule, and manual override conflict previews; role-based employee/supervisor/admin visibility panels; read-only API contract/endpoint; and Postgres migration 034.

### v2.28.0 Conflict Detection files
- `conflict-detection.html`
- `conflict-detection.css`
- `conflict-detection.js`
- `data/conflict-detection-preview.json`
- `adapters/JsonConflictDetectionAdapter.js`
- `repositories/ConflictDetectionRepository.js`
- `services/ConflictDetectionService.js`
- `api/contracts/conflict-detection.read.schema.json`
- `api/coolify/sql/034_conflict_detection_foundation_schema.sql`

## v2.29.0 Additions

- schedule/qualifications.html
- schedule/qualifications.css
- schedule/qualifications.js
- schedule/data/qualifications-certifications-preview.json
- schedule/adapters/JsonQualificationsCertificationAdapter.js
- schedule/repositories/QualificationsCertificationRepository.js
- schedule/services/QualificationsCertificationService.js
- schedule/api/contracts/qualifications-certifications.read.schema.json
- schedule/api/coolify/sql/035_qualifications_certifications_schema.sql
