# Signal Schedule v1.5.1 — Scheduling Entity Model Draft

This document defines the high-level entity groups that will eventually support the scheduling engine. It is a planning document only.

## Purpose

Employee data is only one part of the scheduling system. Signal Schedule will also need structured models for shifts, assignments, requests, overtime, coverage, and rules.

## Core Entity Groups

```text
Agency
Employee
Position
Minimum Staffing Role
Shift
Schedule Template
Rotation
Assignment
Coverage Requirement
Request
Overtime Opportunity
Overtime Bid
Leave Event
Audit Event
```

## Agency

Represents the organization or department using Signal Schedule.

Likely future fields:

- `id`
- `name`
- `type`
- `timezone`
- `defaultPayPeriod`
- `settings`

## Position

Represents an HR/job title.

Examples:

- Telecommunicator
- Patrol Officer
- Sergeant
- Firefighter
- Paramedic
- Corrections Officer

## Minimum Staffing Role

Represents what coverage the schedule requires.

Examples:

- Dispatcher
- Lead Dispatcher
- Officer
- Supervisor
- Firefighter
- Paramedic
- Jail Officer

This is intentionally separate from `position` because a single employee may be able to fill multiple staffing roles.

## Shift

Represents a single work period.

Likely future fields:

- `id`
- `name`
- `startTime`
- `endTime`
- `durationHours`
- `timezone`
- `crossesMidnight`

## Schedule Template

Represents reusable schedule patterns.

Examples:

- 5x8
- 4x10
- 12-hour Pitman
- Dupont
- 24/48
- 48/96
- Custom

## Rotation

Represents repeating assignment logic inside a schedule template.

Likely future fields:

- `id`
- `templateId`
- `cycleLengthDays`
- `pattern`
- `anchorDate`

## Assignment

Connects an employee to a shift, role, date, and schedule state.

Likely future fields:

- `id`
- `employeeId`
- `date`
- `shiftId`
- `staffingRole`
- `assignmentType`
- `status`

Assignment types may include:

- Regular
- Overtime
- Mandatory Overtime
- Training
- Light Duty
- Detail
- Special Event

## Coverage Requirement

Defines required staffing.

Examples:

- Minimum 2 dispatchers on nights
- Minimum 1 supervisor per shift
- Minimum 1 paramedic per ambulance
- Minimum 1 female corrections officer for specific housing assignments when required by agency policy

## Request

Parent model for employee requests.

Future request types:

- Time off
- Vacation
- Sick
- Comp time
- Voluntary overtime request
- Shift trade
- Availability update

## Overtime Opportunity

Created by management when overtime is available.

Likely future fields:

- `id`
- `date`
- `shiftId`
- `roleNeeded`
- `hours`
- `status`
- `postedBy`
- `bidWindowOpenAt`
- `bidWindowCloseAt`

## Overtime Bid

Created by employees when they volunteer/bid for posted overtime.

Likely future fields:

- `id`
- `opportunityId`
- `employeeId`
- `submittedAt`
- `status`
- `awardReason`

## Leave Event

Represents approved time away from work.

Likely future fields:

- `id`
- `employeeId`
- `startDateTime`
- `endDateTime`
- `leaveType`
- `status`

## Audit Event

Records meaningful changes.

Likely future fields:

- `id`
- `actorId`
- `action`
- `entityType`
- `entityId`
- `timestamp`
- `metadata`

## Not In Scope Yet

v1.5.1 does not add:

- Table creation
- Database migrations
- API routes
- CRUD screens
- Authentication
- Role permissions
- Scheduling engine logic

