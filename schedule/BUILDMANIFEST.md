# Build Manifest

Release: Schedule v2.16.0 — Roles & Permissions Engine
ZIP: signal-schedule-v2.16.0-roles-permissions-engine.zip
Date: 2026-06-13
Scope: Full root replacement package

## Added
- schedule/permissions.html
- schedule/permissions.css
- schedule/permissions.js
- schedule/data/roles-permissions-preview.json
- schedule/adapters/JsonRolesPermissionsAdapter.js
- schedule/repositories/RolesPermissionsRepository.js
- schedule/services/RolesPermissionsService.js
- schedule/api/contracts/roles-permissions.read.schema.json
- schedule/api/coolify/sql/022_roles_permissions_schema.sql
- schedule/RELEASE-v2.16.0-Roles-Permissions-Engine.md

## Database
Run 022_roles_permissions_schema.sql after uploading v2.16.0.
