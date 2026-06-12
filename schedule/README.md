## v0.19.1 Pre-Database Safety Audit

Signal Schedule v0.19.1 closes the 0.x architecture phase before v1.0 database foundation work begins.

This is an audit release, not a feature UI release. It confirms that the foundations built across v0.1 through v0.18 fit together as one workforce management architecture.

### Architecture covered

- Agency profiles and terminology
- Employee profiles and operational traits
- Pattern foundation
- Event foundation
- Benefit ledger
- Rule engine
- Coverage engine
- Schedule views
- Fairness foundation
- Explainability foundation
- Mandation foundation
- Bidding and opportunity foundation
- Analytics foundation
- Notifications foundation
- Goal Mode foundation
- Multi-agency foundation

### Core principle

Store facts, not assumptions. Engines should consume stored facts and produce explainable outcomes.

### v1.0 readiness

The next major phase begins persistence: PHP, MySQL, users, roles, CRUD, approvals, and audit logs. v0.19.1 prepares the entity map and relationship map needed before tables are created.


## v0.19.1 Safety Audit Additions

- `PRE-DATABASE-SAFETY-AUDIT.md` — pre-v1.0 safety review of the live/local source package.
- `DEPRECATION-AUDIT.md` — files that may be deprecated or consolidated after v1.0 scaffolding exists.
- `PHP-MYSQL-STARTER.md` — plain-English starter plan for introducing PHP/MySQL safely.
