# Signal Schedule v1.1.0 — Repository / Adapter Layer

## Summary

Adds the first repository and adapter layer around the v1.0 static JSON data source.

The app remains static and browser-only, but agencies and employees now load through service/repository/adapter boundaries instead of direct fetch calls from application behavior.

## Added

- Static JSON adapter contract.
- Agency repository.
- Employee repository.
- Agency service.
- Employee service.
- Data gateway object for future adapter swaps.
- Repository/adapter documentation.

## Not added

- No D1 database.
- No Worker API.
- No credentials.
- No CRUD.
- No authentication.
- No new dashboard preview panels.

## Backend portability

The JSON adapter is the first adapter, not the permanent backend.
