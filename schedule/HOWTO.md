# Signal Schedule v2.19.0 How To

After uploading v2.19.0, open `/schedule/coverage-spots.html` and verify the Coverage Spots Foundation page loads numbered spots, open spots, role counts, under-minimum warnings, and foundation rules.

If using the Coolify/Postgres backend, run `025_coverage_spots_foundation_schema.sql` and verify `schema_migrations` shows version `025`.

Coverage spots remain read-only preview records in this release. Do not expect assignment writes or drag/drop scheduling yet.
