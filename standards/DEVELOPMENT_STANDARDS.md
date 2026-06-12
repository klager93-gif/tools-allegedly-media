# Development Standards

Think through consequences, dependencies, and future maintainability before making changes.

Files are truth. Verify actual files, GitHub, live pages, backups, and ZIP contents before making claims.


## Release Archive Standard

Release archives are backups. Use versioned ZIP files in dated `Releases/` folders as normal restore points instead of maintaining duplicate backup folders.

## Render Registry Validation

Every Signal Schedule build must validate renderer integrity before packaging:

- Every registry entry must point to a defined render function.
- Every safeRender call must point to a defined render function.
- Foundation-only releases should avoid new render functions unless required.
