# Signal Schedule Migration Plan — v0.99.0

The current app is browser-only and stores prototype state locally. v1.x should migrate carefully.

## Phase 1

Create schema and read-only database test.

## Phase 2

Persist agencies and employees.

## Phase 3

Persist assignments and shift definitions.

## Phase 4

Persist requests and schedule events.

## Phase 5

Persist opportunities, bids, awards, explanations, notifications, and audit logs.

## Rule

Do not migrate every prototype object at once. Move one family at a time and keep fallback exports until data is verified.
