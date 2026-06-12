# Signal Schedule v1.5.1 — Employee Data Model Design

Signal Schedule v1.5.1 defines the employee data model before API skeleton work, Postgres setup, CRUD, authentication, or scheduling-engine logic.

This is a design and documentation release. The active app remains browser-safe and read-only.

## Purpose

The employee model is the foundation for scheduling, coverage, requests, overtime, assignments, seniority, and public-safety use cases. The model must support dispatch, police, fire, corrections, EMS, and similar shift-based operations without locking the app into one agency type.

## Design Principles

- Keep identity, employment, scheduling, and eligibility concerns separated.
- Avoid payroll, benefits, medical, discipline, or HR-only data unless directly needed for scheduling.
- Preserve backend portability under Rule 24.
- Keep backend-specific storage details outside the UI and business logic.
- Support Coolify + Postgres as the preferred future backend path without requiring Postgres in this release.

## Employee Model Groups

```text
Employee
├── Core Identity
├── Employment
├── Organization
├── Schedule Assignment
├── Minimum Staffing Role
├── Certifications / Skills
├── Overtime Eligibility
├── Leave Configuration
├── Contact
├── Gender / Assignment Constraints
└── Notes / Metadata
```

## Core Identity

| Field | Purpose | Notes |
|---|---|---|
| `id` | Internal stable employee ID | Required. Should not change after creation. |
| `employeeNumber` | Agency or payroll employee number | Optional but common. |
| `badgeNumber` | Badge, radio, or public-safety number | Optional. May differ from employee number. |
| `firstName` | Legal or HR first name | Required for personnel record. |
| `middleName` | Middle name or initial | Optional. |
| `lastName` | Last name | Required. |
| `preferredName` | Preferred name | Optional. |
| `displayName` | UI-safe display value | Example: `K. Ohligschlager`. |

## Employment

| Field | Purpose | Notes |
|---|---|---|
| `department` | Department or agency unit | Example: Police, Fire, Dispatch, Corrections. |
| `division` | Internal division | Example: Patrol, Investigations, Communications. |
| `position` | HR/job position | Example: Telecommunicator, Officer, Sergeant. |
| `rank` | Rank or grade | Optional; agency-specific. |
| `employmentStatus` | Current work status | Active, probationary, leave, inactive, separated, retired. |
| `hireDate` | Original hire date | Used for history and reporting. |
| `seniorityDate` | Seniority date | Used for bidding, vacation, OT, and assignments. |
| `terminationDate` | Separation date | Optional; inactive/separated records only. |

## Organization

| Field | Purpose | Notes |
|---|---|---|
| `agencyId` | Owning agency | Future multi-agency support. |
| `squad` | Squad or team | Example: A Squad. |
| `watch` | Watch group | Example: Days, Afternoons, Nights. |
| `station` | Station or facility | Optional. |
| `unit` | Specialized unit | Optional. |
| `supervisorId` | Direct supervisor | Optional; should reference another employee ID. |

## Schedule Assignment

| Field | Purpose | Notes |
|---|---|---|
| `scheduleTemplateId` | Assigned schedule template | Example: Pitman, Dupont, 5x8, 4x10. |
| `rotationId` | Rotation pattern | Optional until scheduling engine exists. |
| `assignedShiftId` | Current shift assignment | Optional until shift records exist. |
| `daysOffPattern` | Normal days off | Optional; may become structured later. |
| `kellyDayGroup` | Kelly day group | Public-safety/fire use case. |
| `defaultStartTime` | Normal shift start | Optional. |
| `defaultEndTime` | Normal shift end | Optional. |

## Minimum Staffing Role

This is separate from HR position. The scheduling engine will eventually care more about what role the employee can fill than their job title.

| Field | Purpose | Notes |
|---|---|---|
| `minimumStaffingRole` | Primary coverage role | Example: Dispatcher, Lead Dispatcher, Officer, Sergeant, Firefighter, Paramedic, Corrections Officer. |
| `secondaryStaffingRoles` | Other roles employee may fill | List of role IDs or labels. |
| `canActAsSupervisor` | Coverage eligibility | Useful for lead/supervisor minimums. |
| `soloQualified` | Can work independently | Important for probation/training restrictions. |

## Certifications / Skills

| Field | Purpose | Notes |
|---|---|---|
| `certifications` | List of certifications | Example: CPR, EMD, TAC, NCIC, FTO, Hazmat. |
| `skills` | Scheduling-relevant skills | Optional and agency-defined. |
| `trainingStatus` | Training/probation state | Example: In training, released, restricted. |
| `expirationDates` | Future certification expiration tracking | Should be modeled later as structured records. |

## Overtime Eligibility

| Field | Purpose | Notes |
|---|---|---|
| `overtimeEligible` | Can work overtime | Boolean. |
| `mandatoryOvertimeEligible` | Can be forced/mandated | Boolean. |
| `voluntaryOvertimeEligible` | Can volunteer/bid | Boolean. |
| `compTimeEligible` | Can receive comp time | Boolean. |
| `overtimeGroup` | OT bidding group | Future bid rules. |
| `overtimeRestrictions` | Notes or rule IDs | Avoid free-text long-term; use rule IDs later. |

## Leave Configuration

| Field | Purpose | Notes |
|---|---|---|
| `leaveGroup` | Leave/vacation group | Future vacation rules. |
| `vacationGroup` | Vacation bidding group | Optional. |
| `sickLeaveEligible` | Sick leave tracking eligibility | Boolean. |
| `personalLeaveEligible` | Personal leave tracking eligibility | Boolean. |
| `holidayBankEligible` | Holiday bank eligibility | Boolean. |
| `compBankEligible` | Comp bank eligibility | Boolean. |

## Contact

Contact fields should be permission-controlled later and should not be shown broadly by default.

| Field | Purpose | Notes |
|---|---|---|
| `workEmail` | Work email | Optional. |
| `workPhone` | Work phone | Optional. |
| `mobilePhone` | Personal/mobile phone | Admin-only later. |
| `emergencyContactName` | Emergency contact | Admin-only later. |
| `emergencyContactPhone` | Emergency contact phone | Admin-only later. |

## Gender / Assignment Constraints

Gender should be stored only when needed for legitimate scheduling or assignment constraints and should not drive decisions unless the agency rules require it.

| Field | Purpose | Notes |
|---|---|---|
| `gender` | Assignment-relevant gender value | Example: Male, Female, Other, Prefer Not To Say, Unspecified. |
| `assignmentConstraints` | Scheduling constraints | Future structured rules for housing, jail, locker, transport, or staffing needs. |

## Notes / Metadata

| Field | Purpose | Notes |
|---|---|---|
| `notes` | Admin notes | Keep limited; avoid medical/disciplinary data. |
| `createdAt` | Created timestamp | Future API/database field. |
| `updatedAt` | Updated timestamp | Future API/database field. |
| `archivedAt` | Archive timestamp | Future API/database field. |

## Draft JSON Shape

```json
{
  "id": "emp_10027",
  "employeeNumber": "10027",
  "badgeNumber": "527",
  "firstName": "Kristopher",
  "middleName": "R",
  "lastName": "Ohligschlager",
  "preferredName": "Kris",
  "displayName": "K. Ohligschlager",
  "department": "Communications",
  "division": "Dispatch",
  "position": "Telecommunicator",
  "rank": null,
  "employmentStatus": "active",
  "hireDate": "2020-01-01",
  "seniorityDate": "2020-01-01",
  "agencyId": "agency_default",
  "squad": "A Squad",
  "watch": "Nights",
  "minimumStaffingRole": "Dispatcher",
  "secondaryStaffingRoles": ["Lead Dispatcher"],
  "soloQualified": true,
  "certifications": ["CPR", "EMD", "TAC", "NCIC"],
  "overtimeEligible": true,
  "mandatoryOvertimeEligible": true,
  "voluntaryOvertimeEligible": true,
  "compTimeEligible": true,
  "leaveGroup": "standard",
  "gender": "unspecified",
  "notes": "Sample structure only."
}
```

## Not In Scope Yet

Do not add these to the active Schedule model yet:

- Taxes
- Benefits
- Health insurance
- Medical records
- Discipline records
- Payroll calculations
- Performance reviews
- Personnel-file document storage

## Next Implementation Step

v1.6.0 should build the Coolify API Skeleton around this model direction without adding production credentials, live database writes, authentication, or CRUD.
