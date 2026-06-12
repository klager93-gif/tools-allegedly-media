## v1.1.0 HOWTO — Repository / Adapter Layer

Use **Load Multi-Agency Data** to load pretend agencies and employees from JSON files.

Use the **Current pretend agency** selector in the Agency Profile section to switch between Corrections, Fire, Dispatch, and Police sample agencies.

The app is still static. No database, login, or server write behavior exists yet.


## How data loading works in v1.1.0

Agency and employee data still comes from JSON files, but the app should think in services and repositories. Future backends should replace the adapter layer instead of changing UI behavior.
