## v1.3.3 Cloudflare Status Update

Cloudflare is not currently the app host for Signal Labs. The live deployment uses GitHub to Coolify. Cloudflare D1 setup work is paused and should not be treated as the default backend path.

## v1.3.0 D1 Foundation

Cloudflare D1 is the first planned persistent database for Signal Schedule. D1 is introduced as an adapter target only; the live app still uses static JSON.

# Signal Schedule v1.0.0 — Cloudflare Data Layer Foundation

Signal Schedule is Cloudflare-native first: Pages now, JSON data layer now, Workers/Pages Functions next, and D1 later.

Rule 24 keeps Cloudflare as the first adapter path, not a lock-in point.
