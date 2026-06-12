## v0.18.0 Multi-Agency Data Planning

Future database work should support agency-independent engines through configurable agency facts.

### Planned tables / concepts

- agencies
- agency_profiles
- agency_vocabulary
- agency_rank_structures
- agency_units
- agency_assignment_types
- agency_qualification_types
- agency_operational_trait_types
- employee_qualifications
- employee_operational_traits
- coverage_requirements

### Design rule

Avoid agency-specific engine branches such as `if agency is fire`. Store terms and requirements as data, then let the common engines evaluate facts.
