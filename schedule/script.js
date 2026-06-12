/*
Signal Labs Tool File: schedule/script.js
Version: v0.19.0
Purpose: Architecture Complete audit that keeps foundation concepts in docs/data planning and reduces render-registry risk
*/
(function () {
  var STORAGE_KEY = 'signalSchedule.v0.19.0';
  var OLD_STORAGE_KEYS = ['signalSchedule.v0.19.0', 'signalSchedule.v0.18.0', 'signalSchedule.v0.17.1', 'signalSchedule.v0.16.0', 'signalSchedule.v0.15.0', 'signalSchedule.v0.14.1', 'signalSchedule.v0.13.0', 'signalSchedule.v0.12.0', 'signalSchedule.v0.11.2', 'signalSchedule.v0.10.0', 'signalSchedule.v0.9.0', 'signalSchedule.v0.8.3', 'signalSchedule.v0.8.2', 'signalSchedule.v0.8.1', 'signalSchedule.v0.8.0', 'signalSchedule.v0.7.0', 'signalSchedule.v0.6.0', 'signalSchedule.v0.5.0', 'signalSchedule.v0.4.0', 'signalSchedule.v0.3.0', 'signalSchedule.v0.2.1', 'signalSchedule.v0.2.0', 'signalSchedule.v0.1.4', 'signalSchedule.v0.1.1', 'signalSchedule.v0.1.0'];
  var baseDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var days = baseDays.slice();
  var state = {
    employees: [],
    shifts: [],
    assignments: [],
    rules: {
      maxHoursPerWeek: 40,
      minGapHours: 8,
      monthStart: ''
    },
    ruleProfiles: [],
    patterns: [],
    employeePatterns: [],
    scheduleEvents: [],
    benefitLedger: [],
    benefitRules: [],
    ruleEnginePrinciples: [],
    ruleEvaluationExamples: [],
    agencyRuleTemplates: [],
    coverageRequirements: [],
    scheduleViews: [],
    systemInspectorNotes: [],
    fairnessMetrics: [],
    seniorityLedger: [],
    explanationExamples: [],
    explanationLevels: [],
    mandationRules: [],
    mandateRotation: [],
    operationalTraits: [],
    bidRules: [],
    bidRounds: [],
    voluntaryOvertimeRequests: [],
    postedOvertimeOpportunities: [],
    bidAwardExamples: [],
    analyticsMetrics: [],
    analyticsReports: [],
    analyticsTrendSignals: [],
    analyticsForecasts: [],
    notificationTriggers: [],
    notificationChannels: [],
    notificationSubscriptions: [],
    notificationAuditExamples: [],
    goalModeProfiles: [],
    goalModeTradeoffs: [],
    goalModeRecommendations: [],
    goalModeAuditExamples: [],
    agencyProfile: null,
    selectedEmployeeId: null
  };

  function id(prefix) {
    return prefix + '-' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  function $(selector) { return document.querySelector(selector); }

  function defaultMonthValue() {
    var now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  }


  function ensureFoundationDefaults() {
    if (!Array.isArray(state.mandationRules) || !state.mandationRules.length) state.mandationRules = defaultMandationRules();
    if (!Array.isArray(state.mandateRotation) || !state.mandateRotation.length) state.mandateRotation = defaultMandateRotation();
    if (!Array.isArray(state.operationalTraits) || !state.operationalTraits.length) state.operationalTraits = defaultOperationalTraits();
    if (!Array.isArray(state.bidRules) || !state.bidRules.length) state.bidRules = defaultBidRules();
    if (!Array.isArray(state.bidRounds) || !state.bidRounds.length) state.bidRounds = defaultBidRounds();
    if (!Array.isArray(state.voluntaryOvertimeRequests) || !state.voluntaryOvertimeRequests.length) state.voluntaryOvertimeRequests = defaultVoluntaryOvertimeRequests();
    if (!Array.isArray(state.postedOvertimeOpportunities) || !state.postedOvertimeOpportunities.length) state.postedOvertimeOpportunities = defaultPostedOvertimeOpportunities();
    if (!Array.isArray(state.bidAwardExamples) || !state.bidAwardExamples.length) state.bidAwardExamples = defaultBidAwardExamples();
    if (!Array.isArray(state.analyticsMetrics) || !state.analyticsMetrics.length) state.analyticsMetrics = defaultAnalyticsMetrics();
    if (!Array.isArray(state.analyticsReports) || !state.analyticsReports.length) state.analyticsReports = defaultAnalyticsReports();
    if (!Array.isArray(state.analyticsTrendSignals) || !state.analyticsTrendSignals.length) state.analyticsTrendSignals = defaultAnalyticsTrendSignals();
    if (!Array.isArray(state.analyticsForecasts) || !state.analyticsForecasts.length) state.analyticsForecasts = defaultAnalyticsForecasts();
    if (!Array.isArray(state.notificationTriggers) || !state.notificationTriggers.length) state.notificationTriggers = defaultNotificationTriggers();
    if (!Array.isArray(state.notificationChannels) || !state.notificationChannels.length) state.notificationChannels = defaultNotificationChannels();
    if (!Array.isArray(state.notificationSubscriptions) || !state.notificationSubscriptions.length) state.notificationSubscriptions = defaultNotificationSubscriptions();
    if (!Array.isArray(state.notificationAuditExamples) || !state.notificationAuditExamples.length) state.notificationAuditExamples = defaultNotificationAuditExamples();
    if (!Array.isArray(state.goalModeProfiles) || !state.goalModeProfiles.length) state.goalModeProfiles = defaultGoalModeProfiles();
    if (!Array.isArray(state.goalModeTradeoffs) || !state.goalModeTradeoffs.length) state.goalModeTradeoffs = defaultGoalModeTradeoffs();
    if (!Array.isArray(state.goalModeRecommendations) || !state.goalModeRecommendations.length) state.goalModeRecommendations = defaultGoalModeRecommendations();
    if (!Array.isArray(state.goalModeAuditExamples) || !state.goalModeAuditExamples.length) state.goalModeAuditExamples = defaultGoalModeAuditExamples();
  }

  function defaultAgencyProfile() {
    return {
      name: 'Demo Communications Center',
      industryType: 'Custom / Public Safety',
      timeZone: 'America/Chicago',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '24-hour',
      workWeekStartsOn: 'Sunday',
      payPeriodType: 'Biweekly',
      payPeriodStartsOn: 'Sunday',
      departments: ['Communications', 'Administration'],
      divisions: ['Operations', 'Training'],
      locations: ['Main Center'],
      positions: ['Dispatcher', 'CTO', 'Shift Supervisor'],
      shiftGroups: ['A Days', 'A Nights', 'B Days', 'B Nights'],
      qualifications: ['Calltaking', 'Radio', 'Trainer', 'Supervisor'],
      benefitTypes: ['Vacation', 'Sick', 'Personal', 'Comp Time', 'Holiday'],
      exceptionTypes: ['FMLA', 'Part-time', 'Light duty', 'No mandation', 'Temporary restriction'],
      shiftDefinitions: [
        { id: 'agency-day', name: 'Day Shift', start: '06:00', end: '18:00', paidMinutes: 720, breakRule: 'No automatic unpaid break', displayLabel: '0600-1800' },
        { id: 'agency-night', name: 'Night Shift', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break', displayLabel: '1800-0600' },
        { id: 'agency-office', name: 'Office Shift', start: '07:00', end: '15:30', paidMinutes: 480, breakRule: '30-minute unpaid meal', displayLabel: '7A-3:30P' }
      ],
      coverageRequirements: [
        { id: 'agency-cov-days', role: 'Dispatcher', qualification: 'Radio', location: 'Main Center', days: 'All days', start: '06:00', end: '18:00', minimum: 8, target: 10, maximum: 12, numberedSpots: true },
        { id: 'agency-cov-nights', role: 'Dispatcher', qualification: 'Radio', location: 'Main Center', days: 'All days', start: '18:00', end: '06:00', minimum: 6, target: 8, maximum: 10, numberedSpots: true },
        { id: 'agency-cov-supervisor', role: 'Shift Supervisor', qualification: 'Supervisor', location: 'Main Center', days: 'All days', start: '00:00', end: '23:59', minimum: 1, target: 1, maximum: 2, numberedSpots: false }
      ]
    };
  }

  function defaultRuleProfiles() {
    return [{
      id: 'rules-demo-agency',
      name: 'Demo Agency Rules',
      industry: 'Industry-agnostic shift operations',
      priority: 'Eligibility and safety rules evaluate before fairness and convenience rules.',
      overtime: 'Evaluate overtime eligibility, pay-period rules, fatigue limits, and approval requirements.',
      mandation: 'Track forced OT separately, skip employees with active exceptions, and explain rotation outcomes.',
      benefits: 'Use ledger entries for accrual, use, corrections, carryovers, and payouts.',
      coverage: 'Compare scheduled staffing against minimum, target, and maximum requirements by role/time block.',
      bidding: 'Future shift, vacation, and overtime bids should use configurable seniority and award rules.',
      explanation: 'Every warning, skip, denial, assignment, and override should be explainable.'
    }];
  }

  function defaultRuleEnginePrinciples() {
    return [{
      id: 'rule-priority',
      name: 'Rule priority',
      summary: 'Rules need an order so safety, eligibility, exceptions, and law/policy are checked before preferences.',
      example: 'A person with an active FMLA/no-mandation exception is skipped before fairness rotation is evaluated.'
    }, {
      id: 'rule-explainability',
      name: 'Explainability',
      summary: 'The system should tell users why a person was chosen, skipped, denied, warned, or awarded.',
      example: 'Mandation skipped Taylor because FMLA is active; Alex was next eligible on the rotation.'
    }, {
      id: 'rule-audit',
      name: 'Audit trail',
      summary: 'Rule outcomes should preserve the facts, rule source, admin override, and reason.',
      example: 'Vacation denial, mandate skip, manual benefit correction, and coverage override all need a reason.'
    }, {
      id: 'rule-template',
      name: 'Templates, not modes',
      summary: 'Industries should start from editable templates rather than hard-coded dispatch/fire/nursing modes.',
      example: 'Dispatch and retail can both use coverage, breaks, benefits, fatigue, and eligibility rules differently.'
    }];
  }

  function defaultRuleEvaluationExamples() {
    return [{
      id: 'rule-eval-mandate',
      ruleType: 'Mandation',
      priority: 'Eligibility before rotation',
      input: 'Night coverage shortage; Taylor has active FMLA; Alex is next eligible.',
      outcome: 'Skip Taylor, select Alex, create mandate history entry.',
      explanation: 'Taylor was skipped because active FMLA blocks mandation. Alex was next eligible on the rotation.'
    }, {
      id: 'rule-eval-benefit',
      ruleType: 'Benefit usage',
      priority: 'Approval before ledger entry',
      input: 'Approved vacation event for 720 paid minutes.',
      outcome: 'Create -720 vacation ledger entry linked to the approved event.',
      explanation: 'Vacation was approved, so the ledger records usage instead of overwriting the balance.'
    }, {
      id: 'rule-eval-coverage',
      ruleType: 'Coverage',
      priority: 'Minimum before target before maximum',
      input: 'Dispatcher nights need min 6, target 8, max 10; scheduled count is 5.',
      outcome: 'Flag shortage and suggest open coverage spot planning.',
      explanation: 'Coverage is red because scheduled staffing is below the minimum for that time block.'
    }];
  }

  function defaultAgencyRuleTemplates() {
    return [{
      id: 'template-dispatch',
      name: 'Dispatch / Communications',
      examples: '24-hour coverage, bid shifts, mandates, minimum staffing, benefit usage, and certification rules.'
    }, {
      id: 'template-fire-ems',
      name: 'Fire / EMS',
      examples: 'Stations, 24/48 or 48/96 patterns, apparatus staffing, paramedic requirements, and fatigue rules.'
    }, {
      id: 'template-nursing',
      name: 'Nursing / Healthcare',
      examples: 'Units, skill mix, charge nurse requirements, 12-hour shifts, break rules, and overtime thresholds.'
    }, {
      id: 'template-retail-manufacturing',
      name: 'Retail / Manufacturing',
      examples: 'Locations, lines, roles, unpaid breaks, availability, open shifts, and maximum staffing controls.'
    }];
  }




  function defaultScheduleViews() {
    var agency = state.agencyProfile || defaultAgencyProfile();
    return [{
      id: 'view-day',
      name: 'Day View',
      audience: 'Supervisor / staffing desk',
      purpose: 'Show who is working by hour and whether coverage is below minimum, below target, in range, or over maximum.',
      respects: ['time format: ' + agency.timeFormat, 'coverage minimums', 'events'],
      status: 'Preview only'
    }, {
      id: 'view-week',
      name: 'Week View',
      audience: 'Planner / admin',
      purpose: 'Show the week in the agency-defined order instead of assuming Monday first.',
      respects: ['week starts: ' + agency.workWeekStartsOn, 'time format: ' + agency.timeFormat, 'patterns'],
      status: 'Preview only'
    }, {
      id: 'view-month',
      name: 'Month View',
      audience: 'Planning / employee reference',
      purpose: 'Show high-level shifts, time off, holidays, and coverage warnings without becoming a spreadsheet wall.',
      respects: ['date format: ' + agency.dateFormat, 'events', 'benefit usage'],
      status: 'Preview only'
    }, {
      id: 'view-personal',
      name: 'Personal View',
      audience: 'Employee',
      purpose: 'Show my schedule, my time off, my benefits, my bids, my trades, and my approvals.',
      respects: ['employee profile', 'benefit ledger', 'events'],
      status: 'Future portal concept'
    }, {
      id: 'view-coverage',
      name: 'Coverage View',
      audience: 'Supervisor / command staff',
      purpose: 'Start with staffing need, open spots, shortages, and overstaffing instead of starting with a calendar.',
      respects: ['minimum / target / maximum', 'qualifications', 'locations'],
      status: 'Preview only'
    }, {
      id: 'view-inspector',
      name: 'System Inspector',
      audience: 'Developer / admin troubleshooting',
      purpose: 'Keep the current engine cards as a diagnostic mode rather than the final user interface.',
      respects: ['facts', 'rules', 'events', 'audit explanations'],
      status: 'Internal/debug concept'
    }];
  }

  function defaultSystemInspectorNotes() {
    return [{
      id: 'inspector-debug',
      name: 'Current cards are debug panels',
      detail: 'Agency, employee, pattern, event, benefit, rule, and coverage cards expose the engine while architecture is still being designed.'
    }, {
      id: 'inspector-future-ui',
      name: 'Future UI should hide complexity',
      detail: 'Most users should see views and actions, not every underlying object on one page.'
    }, {
      id: 'inspector-same-engine',
      name: 'Same data, different views',
      detail: 'Day, week, month, personal, coverage, and admin views should all read from the same facts and rules.'
    }];
  }


  function defaultFairnessMetrics() {
    return [{
      id: 'fair-ot-hours',
      name: 'Overtime Hours',
      category: 'Workload',
      metric: 'OT minutes in current fairness window',
      purpose: 'Help show whether voluntary and assigned overtime are being distributed evenly.',
      example: 'Alex has 720 OT minutes; Taylor has 0 because an active exception blocked mandation.'
    }, {
      id: 'fair-mandates',
      name: 'Mandation Count',
      category: 'Forced OT',
      metric: 'Mandates counted against rotation',
      purpose: 'Track who has been forced and who was skipped with a reason.',
      example: 'Alex has 1 mandate; Taylor was skipped because FMLA/no-mandation is active.'
    }, {
      id: 'fair-weekends',
      name: 'Weekend / Holiday Load',
      category: 'Premium Days',
      metric: 'Weekend, holiday, and callback assignments by employee',
      purpose: 'Expose repeated unpopular assignments before employees feel the process is arbitrary.',
      example: 'Jordan has 2 holiday assignments; Casey has 0 and may be ineligible for some bids.'
    }, {
      id: 'fair-seniority',
      name: 'Effective Seniority',
      category: 'Seniority',
      metric: 'Hire date plus seniority ledger adjustments',
      purpose: 'Separate hire date from effective seniority for bidding, vacation awards, and tie breakers.',
      example: 'Taylor has a non-accrual leave adjustment, so effective seniority can differ from hire date.'
    }];
  }

  function defaultSeniorityLedger() {
    return [{
      id: 'seniority-base-alex',
      employeeId: 'emp-alex',
      date: '2021-03-15',
      action: 'Base seniority established',
      adjustmentDays: 0,
      reason: 'Hire/seniority date sample',
      effectiveImpact: 'No adjustment'
    }, {
      id: 'seniority-leave-taylor',
      employeeId: 'emp-taylor',
      date: '2025-04-01',
      action: 'Non-accrual leave period',
      adjustmentDays: 61,
      reason: 'Example unpaid leave where seniority does not accrue',
      effectiveImpact: 'Moves effective seniority back by 61 days'
    }, {
      id: 'seniority-base-jordan',
      employeeId: 'emp-jordan',
      date: '2017-08-01',
      action: 'Base seniority established',
      adjustmentDays: 0,
      reason: 'Hire/seniority date sample',
      effectiveImpact: 'No adjustment'
    }];
  }

  function defaultExplanationExamples() {
    return [{
      id: 'explain-mandation',
      category: 'Mandation',
      question: 'Why was Alex mandated?',
      facts: 'Night dispatcher coverage is below minimum. Taylor has an active FMLA/no-mandation exception. Alex is next eligible in the sample rotation.',
      rules: 'Eligibility exceptions evaluate before rotation order. Mandation creates history and may affect pay/rotation, but does not consume benefit time.',
      outcome: 'Alex is selected for the mandate and Taylor is skipped with a recorded reason.',
      audience: 'Employee and admin'
    }, {
      id: 'explain-coverage',
      category: 'Coverage',
      question: 'Why is night coverage red?',
      facts: 'The night dispatcher requirement needs a minimum of 6, target of 8, and maximum of 10. The sample count is below minimum.',
      rules: 'Coverage evaluates minimum first, then target, then maximum.',
      outcome: 'The system flags a shortage and identifies open coverage spots before any final scheduler exists.',
      audience: 'Supervisor'
    }, {
      id: 'explain-benefit',
      category: 'Benefits',
      question: 'Why did vacation reduce the balance?',
      facts: 'Taylor has an approved vacation event for 720 paid minutes linked to a benefit ledger entry.',
      rules: 'Approved benefit-use events create ledger entries. Balances are calculated from history instead of overwritten totals.',
      outcome: 'Vacation usage is recorded as -720 minutes with an audit source tied to the approved event.',
      audience: 'Employee and admin'
    }, {
      id: 'explain-seniority',
      category: 'Seniority',
      question: 'Why can effective seniority differ from hire date?',
      facts: 'Taylor has an example non-accrual leave period in the seniority ledger.',
      rules: 'Hire date remains factual history; seniority adjustments modify the effective seniority calculation without rewriting the hire date.',
      outcome: 'Effective seniority may move behind another employee depending on agency policy.',
      audience: 'Admin'
    }, {
      id: 'explain-eligibility',
      category: 'Eligibility',
      question: 'Why is Casey not available for a mandate?',
      facts: 'Casey is part-time and has a no-mandation exception in the employee profile.',
      rules: 'Employee exceptions and eligibility flags must be evaluated before assigning forced overtime.',
      outcome: 'Casey is skipped and the skip reason is preserved for audit/history.',
      audience: 'Supervisor and admin'
    }, {
      id: 'explain-fairness',
      category: 'Fairness',
      question: 'Why is the fairness snapshot uneven?',
      facts: 'Overtime, mandates, weekends, holidays, callbacks, skipped exceptions, and seniority history are uneven in sample data.',
      rules: 'Fairness compares facts and history inside the agency-defined window; it does not manually edit totals.',
      outcome: 'The system should show the imbalance and explain which facts created it.',
      audience: 'Admin and employee-safe summary'
    }];
  }

  function defaultExplanationLevels() {
    return [{
      id: 'explain-level-employee',
      name: 'Employee-facing explanation',
      detail: 'Plain-language reason without exposing private employee details that are not needed.'
    }, {
      id: 'explain-level-supervisor',
      name: 'Supervisor explanation',
      detail: 'Shows operational facts such as coverage shortage, eligibility, and staffing impact.'
    }, {
      id: 'explain-level-admin',
      name: 'Admin / audit explanation',
      detail: 'Shows rule source, override reason, timestamps, related events, and ledger/audit references.'
    }];
  }


  function defaultMandationRules() {
    return [{
      id: 'mandate-rule-eligibility',
      name: 'Eligibility before rotation',
      category: 'Mandation priority',
      summary: 'Check FMLA, no-mandation, part-time, light duty, fatigue, and other active exceptions before choosing the next person.',
      example: 'Taylor is skipped because FMLA/no-mandation is active before rotation order is considered.'
    }, {
      id: 'mandate-rule-counts',
      name: 'Count forced OT separately',
      category: 'Mandate history',
      summary: 'Mandates should be counted separately from voluntary overtime so fairness reports can distinguish chosen work from forced work.',
      example: 'Alex has 1 mandate and 720 forced OT minutes in the sample rotation window.'
    }, {
      id: 'mandate-rule-skips',
      name: 'Skipped does not always mean removed',
      category: 'Rotation handling',
      summary: 'Agency rules should decide whether a skipped employee keeps their place, moves to the bottom, or is excluded from the current cycle.',
      example: 'FMLA skip keeps place; refusal or unavailable status may move the person depending on policy.'
    }, {
      id: 'mandate-rule-audit',
      name: 'Mandates need explanations',
      category: 'Audit trail',
      summary: 'Every mandate, skip, override, and exception should preserve the reason and rule source.',
      example: 'Alex mandated because night coverage was below minimum and all higher-priority employees were unavailable or exempt.'
    }];
  }

  function defaultMandateRotation() {
    return [{
      id: 'mandate-rot-alex',
      employeeId: 'emp-alex',
      order: 1,
      status: 'next eligible',
      mandateCount: 1,
      forcedMinutes: 720,
      skipReason: '',
      rotationAction: 'eligible for next mandate evaluation'
    }, {
      id: 'mandate-rot-taylor',
      employeeId: 'emp-taylor',
      order: 2,
      status: 'skipped / protected',
      mandateCount: 0,
      forcedMinutes: 0,
      skipReason: 'Active FMLA / no-mandation exception',
      rotationAction: 'future agency rule decides whether place is held or moved'
    }, {
      id: 'mandate-rot-casey',
      employeeId: 'emp-casey',
      order: 3,
      status: 'not eligible',
      mandateCount: 0,
      forcedMinutes: 0,
      skipReason: 'Part-time and no-mandation exception',
      rotationAction: 'excluded from forced OT pool unless agency override exists'
    }, {
      id: 'mandate-rot-jordan',
      employeeId: 'emp-jordan',
      order: 4,
      status: 'eligible supervisor',
      mandateCount: 0,
      forcedMinutes: 0,
      skipReason: '',
      rotationAction: 'eligible when supervisor-qualified coverage is needed'
    }];
  }

  function defaultOperationalTraits() {
    return [{
      id: 'trait-gender',
      name: 'Gender',
      category: 'Operational trait',
      purpose: 'Can support documented police, fire, corrections, transport, search, housing, or staffing requirements when legally and operationally appropriate.',
      guardrail: 'Use only when tied to a documented coverage, safety, legal, or operational rule.'
    }, {
      id: 'trait-language',
      name: 'Language skill',
      category: 'Operational trait',
      purpose: 'Can help fill specific coverage needs such as bilingual calltaking, public counter coverage, or community response.',
      guardrail: 'Store as capability data and evaluate through coverage rules.'
    }, {
      id: 'trait-restriction',
      name: 'Physical / duty restriction',
      category: 'Operational trait',
      purpose: 'Can prevent unsafe or policy-violating assignments and explain mandate skips.',
      guardrail: 'Tie to date-bounded exceptions and preserve private detail appropriately.'
    }];
  }


  function defaultBidRules() {
    return [{
      id: 'bid-rule-eligibility',
      name: 'Eligibility before award',
      category: 'Bid priority',
      summary: 'Employees must meet position, qualification, exception, fatigue, and agency eligibility rules before any bid or OT request can be awarded.',
      example: 'A part-time or no-mandation employee may be eligible for voluntary OT but excluded from forced OT depending on agency rules.'
    }, {
      id: 'bid-rule-seniority',
      name: 'Seniority / fairness order',
      category: 'Award rules',
      summary: 'Agency rules decide whether awards follow seniority, fairness equalization, first-come order, rotation, or manual review.',
      example: 'Vacation bids may award by seniority, while posted OT may evaluate fairness and hours before seniority.'
    }, {
      id: 'bid-rule-audit',
      name: 'Award explanations',
      category: 'Audit trail',
      summary: 'Every award, denial, skip, tie-breaker, and manual override should preserve the reason and visible explanation.',
      example: 'Alex awarded posted OT because eligible, below fairness target, and first accepted before close time.'
    }];
  }

  function defaultBidRounds() {
    return [{
      id: 'bid-round-shift',
      name: 'Annual Shift Bid',
      bidType: 'Shift bid',
      status: 'planning',
      opens: '2026-07-01 08:00',
      closes: '2026-07-10 17:00',
      selectionBasis: 'Effective seniority with admin-published awards',
      availableSlots: 'A Days, A Nights, B Days, B Nights pattern seats',
      explanation: 'Shift bids can create or modify future employee-pattern assignments.'
    }, {
      id: 'bid-round-vacation',
      name: 'Vacation Pick Round 1',
      bidType: 'Vacation bid',
      status: 'future concept',
      opens: '2026-11-01 08:00',
      closes: '2026-11-15 17:00',
      selectionBasis: 'Seniority, coverage locks, and available vacation slots',
      availableSlots: 'Date blocks with minimum staffing protections',
      explanation: 'Vacation bids reserve future benefit-use events but should not directly overwrite balances.'
    }, {
      id: 'bid-round-ot',
      name: 'Posted OT Opportunity',
      bidType: 'Overtime opportunity',
      status: 'posted sample',
      opens: '2026-06-18 09:00',
      closes: '2026-06-18 15:00',
      selectionBasis: 'Eligibility, fairness, rotation, and manager review',
      availableSlots: 'Night dispatcher OT slot, 18:00-06:00',
      explanation: 'Management can post open OT and employees can volunteer/bid for review.'
    }];
  }

  function defaultVoluntaryOvertimeRequests() {
    return [{
      id: 'vot-req-alex',
      employeeId: 'emp-alex',
      requestType: 'Voluntary OT request',
      status: 'pending review',
      requestedWindow: '2026-06-24 18:00 → 2026-06-25 06:00',
      preferredAssignment: 'Night dispatcher coverage',
      reason: 'Employee is available and wants voluntary OT.',
      reviewNote: 'Future workflow should check eligibility, fatigue, fairness, and coverage need before approval.'
    }, {
      id: 'vot-req-jordan',
      employeeId: 'emp-jordan',
      requestType: 'Voluntary OT request',
      status: 'review later',
      requestedWindow: '2026-06-22 06:00 → 2026-06-22 18:00',
      preferredAssignment: 'Supervisor coverage',
      reason: 'Employee submitted availability for an extra shift.',
      reviewNote: 'Management can approve, deny, hold, or convert to a posted opportunity depending on policy.'
    }];
  }

  function defaultPostedOvertimeOpportunities() {
    return [{
      id: 'posted-ot-night-1',
      title: 'Night Dispatcher OT Slot',
      postedBy: 'Management sample',
      status: 'open for volunteers',
      window: '2026-06-20 18:00 → 2026-06-21 06:00',
      role: 'Dispatcher',
      qualification: 'Radio',
      slotsAvailable: 1,
      volunteers: ['emp-alex', 'emp-casey'],
      awardMethod: 'Eligibility + fairness + manager review',
      explanation: 'Posted OT lets management advertise a need before mandation is considered.'
    }, {
      id: 'posted-ot-training',
      title: 'Training Backfill Opportunity',
      postedBy: 'Training sample',
      status: 'future concept',
      window: '2026-06-22 09:00 → 2026-06-22 13:00',
      role: 'Dispatcher',
      qualification: 'Calltaking',
      slotsAvailable: 2,
      volunteers: ['emp-taylor'],
      awardMethod: 'Eligibility + availability + coverage impact',
      explanation: 'Posted opportunities can fill coverage created by training, leave, sick calls, or open shifts.'
    }];
  }

  function defaultBidAwardExamples() {
    return [{
      id: 'award-posted-ot-alex',
      bidType: 'Posted OT',
      employeeId: 'emp-alex',
      status: 'award preview',
      outcome: 'Awarded pending manager approval',
      reason: 'Eligible for Radio dispatcher coverage, no active exception, and lower recent voluntary OT than other eligible sample candidates.',
      auditTrail: 'Future award should preserve posted opportunity, volunteer timestamp, rule results, and approving manager.'
    }, {
      id: 'award-vacation-taylor',
      bidType: 'Vacation bid',
      employeeId: 'emp-taylor',
      status: 'not final',
      outcome: 'Hold for seniority/coverage review',
      reason: 'Vacation bid awards need benefit availability, coverage minimums, effective seniority, and bid-round rules.',
      auditTrail: 'Future award should link to a vacation event only after approval.'
    }, {
      id: 'award-shift-jordan',
      bidType: 'Shift bid',
      employeeId: 'emp-jordan',
      status: 'planning',
      outcome: 'Potential pattern assignment',
      reason: 'Shift bid awards should create or modify employee-pattern assignments after bid publication.',
      auditTrail: 'Future shift awards should preserve round, pick order, available slot, and rule explanation.'
    }];
  }


  function defaultAnalyticsMetrics() {
    return [{ id: 'metric-hours-worked', family: 'Hours', name: 'Worked hours', sourceFacts: 'Assignments + work events + paid minutes', purpose: 'Compare scheduled, worked, overtime, callback, training, and forced OT hours without mixing categories.', explanation: 'Hours reports should show which events counted and why.' },
      { id: 'metric-benefit-usage', family: 'Benefits', name: 'Benefit usage and balances', sourceFacts: 'Benefit ledger entries + approved time-off events', purpose: 'Track vacation, sick, personal, holiday, and comp activity from ledger movement instead of overwritten totals.', explanation: 'Benefit analytics should explain every balance through accruals, use, corrections, payouts, and carryovers.' },
      { id: 'metric-ot-fairness', family: 'Overtime / Fairness', name: 'OT equalization', sourceFacts: 'Voluntary OT requests + posted OT awards + schedule events + fairness history', purpose: 'Compare opportunity, acceptance, award, denial, and forced OT history separately.', explanation: 'Fairness analytics should distinguish who wanted OT, who was offered OT, who received OT, and who was mandated.' },
      { id: 'metric-coverage-trends', family: 'Coverage', name: 'Coverage shortage trends', sourceFacts: 'Coverage requirements + assignments + events + open spots', purpose: 'Show repeated shortages by role, qualification, location, time block, and shift group.', explanation: 'Coverage reports should identify whether the shortage came from staffing level, leave, training, or unfilled openings.' }];
  }

  function defaultAnalyticsReports() {
    return [{ id: 'report-pay-period-summary', name: 'Pay Period Summary', audience: 'Admin / payroll prep', includes: ['regular hours', 'overtime', 'mandation', 'callbacks', 'benefit usage'], status: 'planned model', guardrail: 'Report totals should be traceable back to events and assignments.' },
      { id: 'report-mandation-history', name: 'Mandation History', audience: 'Supervisor / union audit', includes: ['forced OT counts', 'skip reasons', 'rotation position', 'exceptions', 'override notes'], status: 'planned model', guardrail: 'Mandation analytics must stay separate from voluntary OT analytics.' },
      { id: 'report-benefit-ledger', name: 'Benefit Ledger Report', audience: 'Employee / admin', includes: ['starting balance', 'accruals', 'usage', 'corrections', 'ending balance'], status: 'planned model', guardrail: 'Balances should never be explained by a silent overwrite.' },
      { id: 'report-coverage-review', name: 'Coverage Review', audience: 'Planner / command staff', includes: ['minimum misses', 'target misses', 'open spots', 'overstaffing', 'time-block trends'], status: 'planned model', guardrail: 'Coverage analytics must use agency-defined requirements, not hard-coded assumptions.' }];
  }

  function defaultAnalyticsTrendSignals() {
    return [{ id: 'trend-weekend-load', signal: 'Weekend load concentration', category: 'Fairness', observation: 'Compare weekend assignments across employees and shift groups before calling a schedule balanced.', action: 'Flag repeated concentration and explain whether seniority, bid awards, coverage, or overrides caused it.' },
      { id: 'trend-shortage-repeat', signal: 'Repeated night shortage', category: 'Coverage', observation: 'Track shortages by role and time block so recurring open spots are visible.', action: 'Support future recommendations such as posted OT, training, hiring, pattern changes, or mandate risk warnings.' },
      { id: 'trend-benefit-burn', signal: 'Benefit burn rate', category: 'Benefits', observation: 'Compare benefit usage against accrual and projected balance windows.', action: 'Warn when approvals could create future coverage or balance problems.' }];
  }

  function defaultAnalyticsForecasts() {
    return [{ id: 'forecast-coverage-risk', name: 'Coverage Risk Forecast', inputFacts: 'Known assignments, approved leave, training events, open spots, and coverage requirements', forecast: 'Identify future dates likely to miss minimum or target staffing.', explanation: 'Forecast should list the exact events and requirements driving the risk.' },
      { id: 'forecast-mandate-risk', name: 'Mandate Risk Forecast', inputFacts: 'Open coverage, voluntary OT interest, posted OT responses, exceptions, fatigue, and rotation history', forecast: 'Estimate whether voluntary options may be exhausted before coverage is filled.', explanation: 'Forecast should explain why mandation risk exists before anyone is forced.' },
      { id: 'forecast-benefit-liability', name: 'Benefit Liability Forecast', inputFacts: 'Ledger balances, accrual rules, carryover rules, approved future leave, and payout policy', forecast: 'Project balances and potential payout/carryover exposure.', explanation: 'Forecast should distinguish earned time, used time, projected accrual, and policy limits.' }];
  }

  function defaultNotificationTriggers() {
    return [{ id: 'notice-coverage-shortage', name: 'Coverage Shortage Alert', source: 'Coverage Engine', trigger: 'Minimum staffing is projected below requirement for a role, qualification, location, day, or time block.', audience: 'Supervisor / Scheduler', explanation: 'Alert must list the open spot, required minimum, current staffing, and facts causing the shortage.' },
      { id: 'notice-bid-award', name: 'Bid Award Notice', source: 'Bidding / Opportunities', trigger: 'A shift, vacation, or posted overtime award is ready for review or publication.', audience: 'Employee / Supervisor', explanation: 'Notice must include eligibility, seniority, fairness, tie-breaker, and audit explanation links.' },
      { id: 'notice-mandate-risk', name: 'Mandate Risk Warning', source: 'Forecast + Mandation', trigger: 'Voluntary options may not fill a future open spot before coverage minimum is missed.', audience: 'Supervisor / Admin', explanation: 'Notice must show voluntary OT interest, posted opportunity responses, exceptions, and rotation context.' },
      { id: 'notice-benefit-risk', name: 'Benefit Balance Warning', source: 'Benefit Ledger', trigger: 'A request or approval may create projected negative balance, carryover risk, or coverage conflict.', audience: 'Employee / Supervisor', explanation: 'Notice must distinguish current balance, projected accrual, approved future use, and policy limit.' }];
  }

  function defaultNotificationChannels() {
    return [{ id: 'channel-in-app', name: 'In-app Notice Center', status: 'planned', purpose: 'Primary audit-safe place to show alerts, approvals, awards, and rule explanations.', guardrail: 'Every message should remain linked to its source fact and rule chain.' },
      { id: 'channel-email', name: 'Email', status: 'future', purpose: 'Send reviewable notices to employees, supervisors, and admins after preferences exist.', guardrail: 'Do not email sensitive details unless agency policy and recipient role allow it.' },
      { id: 'channel-sms', name: 'SMS / Text', status: 'future', purpose: 'Urgent operational alerts such as open OT, coverage shortages, callbacks, and mandation risk.', guardrail: 'Use concise messages and link back to full in-app explanation.' },
      { id: 'channel-export', name: 'Report / Export Log', status: 'planned', purpose: 'Preserve notification history for audit, public records, labor review, and internal investigation.', guardrail: 'Export must show delivered, read, acted on, suppressed, and expired states where available.' }];
  }

  function defaultNotificationSubscriptions() {
    return [{ id: 'sub-employee-self', audience: 'Employee', receives: ['Own requests', 'Own awards', 'Own schedule changes', 'Benefit warnings'], preference: 'Employee preference plus agency-required notices', rule: 'Employees should not receive other employees’ private details.' },
      { id: 'sub-supervisor-shift', audience: 'Supervisor', receives: ['Coverage shortages', 'Pending approvals', 'Mandate risk', 'Posted OT response changes'], preference: 'Role-based operational subscription', rule: 'Supervisor notices should match assigned department, shift group, location, or authority.' },
      { id: 'sub-admin-audit', audience: 'Admin / Audit', receives: ['Rule failures', 'Override activity', 'Notification delivery history', 'Suppressed alerts'], preference: 'Administrative subscription', rule: 'Audit notices should preserve complete fact chains without changing schedule outcomes.' }];
  }

  function defaultNotificationAuditExamples() {
    return [{ id: 'audit-suppressed-duplicate', event: 'Duplicate alert suppressed', outcome: 'No second message sent', reason: 'Same coverage shortage already notified the supervisor within the configured window.', explanation: 'Suppression prevents noisy repeated alerts while preserving the source shortage in the audit log.' },
      { id: 'audit-escalated-open-spot', event: 'Open spot escalated', outcome: 'Supervisor alert upgraded', reason: 'Posted OT opportunity received no eligible volunteers before the escalation threshold.', explanation: 'Escalation should cite opportunity age, responses, eligibility, coverage need, and mandate risk.' },
      { id: 'audit-employee-award-read', event: 'Award notice acknowledged', outcome: 'Employee read receipt recorded', reason: 'Employee opened the in-app bid award notice.', explanation: 'Read state should be stored separately from whether the employee accepts, declines, or contests the award.' }];
  }


  function defaultGoalModeProfiles() {
    return [{ id: 'goal-reduce-mandates', name: 'Reduce Mandates', priority: 'High', optimizes: 'Fill open coverage with voluntary options before forced overtime.', sourceFacts: 'Coverage shortages, voluntary OT requests, posted OT responses, mandate rotation, fatigue limits, and exceptions.', explanation: 'The engine should recommend voluntary or posted OT paths first and explain when mandation risk remains.' },
      { id: 'goal-improve-fairness', name: 'Improve Fairness', priority: 'Medium', optimizes: 'Balance overtime, weekends, holidays, undesirable shifts, mandates, and opportunities over time.', sourceFacts: 'Fairness metrics, seniority ledger, award history, mandate counts, and schedule assignments.', explanation: 'Fairness should not replace eligibility or safety; it should explain how distribution was considered after hard rules.' },
      { id: 'goal-max-leave', name: 'Maximize Leave Approvals', priority: 'Medium', optimizes: 'Approve more leave when coverage, benefit balance, and rules allow it.', sourceFacts: 'Leave requests, benefit ledger, coverage requirements, posted OT availability, and forecast windows.', explanation: 'The engine should show what would need to change for a denial to become approvable.' },
      { id: 'goal-stabilize-coverage', name: 'Stabilize Coverage', priority: 'High', optimizes: 'Reduce recurring shortages and last-minute schedule instability.', sourceFacts: 'Coverage trends, forecast risks, schedule views, training events, and shortage history.', explanation: 'The engine should distinguish chronic staffing issues from isolated schedule conflicts.' }];
  }

  function defaultGoalModeTradeoffs() {
    return [{ id: 'tradeoff-cost-coverage', conflict: 'Reduce OT Cost vs Maintain Coverage', winningRule: 'Coverage minimums win over cost controls.', consequence: 'The recommendation may create overtime if no straight-time option can meet minimum staffing.', explanation: 'Goal Mode should name the losing goal and why it lost.' },
      { id: 'tradeoff-seniority-fairness', conflict: 'Seniority Preference vs Fairness Equalization', winningRule: 'Configured bid/contract rule decides which factor applies first.', consequence: 'The recommendation may favor a senior employee even when fairness distribution is uneven, or vice versa if agency rules allow.', explanation: 'The system must show whether seniority, fairness, or eligibility determined the outcome.' },
      { id: 'tradeoff-leave-mandate', conflict: 'Approve Leave vs Avoid Mandation', winningRule: 'Agency policy controls whether leave can be approved if it creates forced OT risk.', consequence: 'The system may suggest posted OT before denying leave.', explanation: 'A denial should include the exact coverage gap and possible path to approval.' }];
  }

  function defaultGoalModeRecommendations() {
    return [{ id: 'recommend-post-ot', goal: 'Reduce Mandates', recommendation: 'Post voluntary overtime before using the mandate list.', action: 'Create posted OT opportunity for the projected open spot.', why: 'Coverage forecast shows a future shortage, but voluntary OT interest exists and fatigue checks have not failed.' },
      { id: 'recommend-adjust-training', goal: 'Stabilize Coverage', recommendation: 'Move non-critical training away from a known shortage block.', action: 'Review training event timing before approving additional leave.', why: 'Coverage engine shows minimum staffing miss caused by training plus approved leave overlap.' },
      { id: 'recommend-conditional-leave', goal: 'Maximize Leave Approvals', recommendation: 'Conditionally approve leave if posted OT fills one slot.', action: 'Hold request as pending coverage action instead of immediate denial.', why: 'Benefit balance is valid and rule checks pass, but coverage target is short by one qualified employee.' }];
  }

  function defaultGoalModeAuditExamples() {
    return [{ id: 'goal-audit-losing-goal', event: 'Coverage goal overrode cost goal', outcome: 'Overtime recommendation kept', reason: 'Minimum staffing would otherwise fail.', explanation: 'Audit should preserve the losing cost goal, the winning coverage goal, and the facts used.' },
      { id: 'goal-audit-supervisor-override', event: 'Supervisor changed recommendation', outcome: 'Override recorded', reason: 'Supervisor chose mandate instead of posted OT because of time sensitivity.', explanation: 'Goal Mode should record human overrides without rewriting the original recommendation.' },
      { id: 'goal-audit-no-action', event: 'No safe recommendation available', outcome: 'Escalated to supervisor review', reason: 'All eligible voluntary options failed coverage, fatigue, or exception checks.', explanation: 'Sometimes the correct recommendation is to explain why automation should stop.' }];
  }

  function defaultEventTypeDefinitions() {
    return [{
      id: 'event-vacation',
      name: 'Vacation',
      category: 'Time Off',
      behavior: ['removes from coverage', 'uses benefit time', 'requires approval', 'requires audit trail'],
      coverageImpact: 'Removes the employee from expected coverage during the event window.',
      benefitImpact: 'Consumes vacation minutes after approval.'
    }, {
      id: 'event-sick',
      name: 'Sick',
      category: 'Time Off',
      behavior: ['removes from coverage', 'uses benefit time', 'may require review', 'requires audit trail'],
      coverageImpact: 'Removes the employee from expected coverage and may create a shortage.',
      benefitImpact: 'Consumes sick minutes based on agency rules.'
    }, {
      id: 'event-overtime',
      name: 'Overtime',
      category: 'Added Work',
      behavior: ['adds to coverage', 'changes pay', 'requires audit trail'],
      coverageImpact: 'Adds the employee to coverage outside their expected pattern.',
      benefitImpact: 'No benefit use; future payroll rules may classify minutes as OT.'
    }, {
      id: 'event-mandation',
      name: 'Mandation',
      category: 'Forced OT',
      behavior: ['adds to coverage', 'changes pay', 'requires approval', 'requires audit trail'],
      coverageImpact: 'Adds forced overtime coverage and should link to mandate rotation history.',
      benefitImpact: 'No benefit use; future mandate rules decide counts, skips, and exceptions.'
    }, {
      id: 'event-training',
      name: 'Training',
      category: 'Assignment Change',
      behavior: ['changes role', 'may remove from coverage', 'requires audit trail'],
      coverageImpact: 'May remove the person from their normal role or change what spot they can fill.',
      benefitImpact: 'No benefit use unless agency policy says otherwise.'
    }, {
      id: 'event-trade',
      name: 'Trade',
      category: 'Swap',
      behavior: ['changes employee assignment', 'requires approval', 'requires audit trail'],
      coverageImpact: 'Swaps who fills a planned shift while preserving coverage requirements.',
      benefitImpact: 'No benefit use by default.'
    }];
  }

  function defaultPatterns() {
    return [{
      id: 'pattern-b-nights',
      name: 'B Nights Sample',
      description: 'Cycle-based nights pattern with normal and short shifts. Short days are based on cycle position, not fixed weekday.',
      cycleLength: 14,
      baseShift: 'Night Shift',
      notes: 'Sample only. Future versions should allow admin-defined patterns and employee-specific variations.',
      cycleDays: [
        { cycleDay: 1, dayType: 'work', shiftType: 'normal', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 2, dayType: 'work', shiftType: 'normal', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 3, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 4, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 5, dayType: 'work', shiftType: 'normal', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 6, dayType: 'work', shiftType: 'short', start: '18:00', end: '02:00', paidMinutes: 480, breakRule: 'Short day / short week example' },
        { cycleDay: 7, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 8, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 9, dayType: 'work', shiftType: 'normal', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 10, dayType: 'work', shiftType: 'normal', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 11, dayType: 'work', shiftType: 'normal', start: '18:00', end: '06:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 12, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 13, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 14, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' }
      ]
    }, {
      id: 'pattern-2-2-3-days',
      name: '2-2-3 Days Sample',
      description: 'Seven-day sample rotation shape using day-shift work/off cycle days.',
      cycleLength: 7,
      baseShift: 'Day Shift',
      notes: 'Sample rotation shape only. Not a final agency policy.',
      cycleDays: [
        { cycleDay: 1, dayType: 'work', shiftType: 'normal', start: '06:00', end: '18:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 2, dayType: 'work', shiftType: 'normal', start: '06:00', end: '18:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 3, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 4, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 5, dayType: 'work', shiftType: 'normal', start: '06:00', end: '18:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 6, dayType: 'work', shiftType: 'normal', start: '06:00', end: '18:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' },
        { cycleDay: 7, dayType: 'work', shiftType: 'normal', start: '06:00', end: '18:00', paidMinutes: 720, breakRule: 'No automatic unpaid break' }
      ]
    }, {
      id: 'pattern-office-8s',
      name: 'Office 8s With Unpaid Break',
      description: 'Non-public-safety example where shift length and paid minutes differ because of an unpaid meal period.',
      cycleLength: 7,
      baseShift: 'Office Shift',
      notes: 'Demonstrates 7A-3:30P display with 480 paid minutes.',
      cycleDays: [
        { cycleDay: 1, dayType: 'work', shiftType: 'normal', start: '07:00', end: '15:30', paidMinutes: 480, breakRule: '30-minute unpaid meal' },
        { cycleDay: 2, dayType: 'work', shiftType: 'normal', start: '07:00', end: '15:30', paidMinutes: 480, breakRule: '30-minute unpaid meal' },
        { cycleDay: 3, dayType: 'work', shiftType: 'normal', start: '07:00', end: '15:30', paidMinutes: 480, breakRule: '30-minute unpaid meal' },
        { cycleDay: 4, dayType: 'work', shiftType: 'normal', start: '07:00', end: '15:30', paidMinutes: 480, breakRule: '30-minute unpaid meal' },
        { cycleDay: 5, dayType: 'work', shiftType: 'normal', start: '07:00', end: '15:30', paidMinutes: 480, breakRule: '30-minute unpaid meal' },
        { cycleDay: 6, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' },
        { cycleDay: 7, dayType: 'off', shiftType: 'off', start: '', end: '', paidMinutes: 0, breakRule: '' }
      ]
    }];
  }

  function defaultCoverageRequirements() {
    return [
      { id: 'cov-days', label: 'Day dispatcher coverage', role: 'Dispatcher', qualification: 'Radio', location: 'Main Center', days: 'All days', start: '06:00', end: '18:00', minimum: 8, target: 10, maximum: 12, numberedSpots: true },
      { id: 'cov-nights', label: 'Night dispatcher coverage', role: 'Dispatcher', qualification: 'Radio', location: 'Main Center', days: 'All days', start: '18:00', end: '06:00', minimum: 6, target: 8, maximum: 10, numberedSpots: true },
      { id: 'cov-supervisor', label: 'Supervisor coverage', role: 'Shift Supervisor', qualification: 'Supervisor', location: 'Main Center', days: 'All days', start: '00:00', end: '23:59', minimum: 1, target: 1, maximum: 2, numberedSpots: false }
    ];
  }


  function defaultBenefitRules() {
    return [{
      id: 'benefit-rule-sick-monthly',
      benefitType: 'Sick',
      method: 'Monthly accrual',
      amountMinutes: 480,
      cadence: 'First day of each month',
      appliesTo: 'Benefit-eligible employees',
      notes: 'Example: add 8 sick hours on the first of the month.'
    }, {
      id: 'benefit-rule-vacation-paycheck',
      benefitType: 'Vacation',
      method: 'Per paycheck accrual',
      amountMinutes: 240,
      cadence: 'Each biweekly pay period',
      appliesTo: 'Full-time employees',
      notes: 'Example: add 4 vacation hours per paycheck.'
    }, {
      id: 'benefit-rule-personal-annual',
      benefitType: 'Personal',
      method: 'Annual bank',
      amountMinutes: 1440,
      cadence: 'January 1',
      appliesTo: 'Eligible active employees',
      notes: 'Example: add 24 personal hours at the start of the year.'
    }, {
      id: 'benefit-rule-seniority-tier',
      benefitType: 'Vacation',
      method: 'Seniority tier',
      amountMinutes: 0,
      cadence: 'Policy-defined tier review',
      appliesTo: 'Employees by seniority date',
      notes: 'Future rules can calculate vacation banks from hire/seniority dates.'
    }];
  }

  function normalizeState(input) {
    var next = input || {};
    next.sampleCleared = next.sampleCleared === true;
    next.employees = Array.isArray(next.employees) ? next.employees : [];
    next.shifts = Array.isArray(next.shifts) ? next.shifts : [];
    next.assignments = Array.isArray(next.assignments) ? next.assignments : [];
    next.ruleProfiles = Array.isArray(next.ruleProfiles) && next.ruleProfiles.length ? next.ruleProfiles : defaultRuleProfiles();
    next.patterns = Array.isArray(next.patterns) && next.patterns.length ? next.patterns : defaultPatterns();
    next.patterns = next.patterns.map(function (pattern) {
      var fallback = defaultPatterns().find(function (item) { return item.id === pattern.id; }) || defaultPatterns()[0];
      return {
        id: pattern.id || id('pattern'),
        name: pattern.name || 'Pattern',
        description: pattern.description || pattern.notes || fallback.description,
        cycleLength: Number(pattern.cycleLength || (pattern.sequence ? pattern.sequence.length : fallback.cycleLength || 0)),
        baseShift: pattern.baseShift || fallback.baseShift || '',
        notes: pattern.notes || fallback.notes || '',
        cycleDays: Array.isArray(pattern.cycleDays) && pattern.cycleDays.length ? pattern.cycleDays : fallback.cycleDays
      };
    });
    next.employeePatterns = Array.isArray(next.employeePatterns) ? next.employeePatterns : [];
    next.eventTypeDefinitions = Array.isArray(next.eventTypeDefinitions) && next.eventTypeDefinitions.length ? next.eventTypeDefinitions : defaultEventTypeDefinitions();
    next.scheduleEvents = Array.isArray(next.scheduleEvents) ? next.scheduleEvents : [];
    next.scheduleEvents = next.scheduleEvents.map(function (event) {
      var definition = next.eventTypeDefinitions.find(function (item) { return item.name.toLowerCase() === String(event.type || '').toLowerCase(); }) || next.eventTypeDefinitions[0];
      return {
        id: event.id || id('evt'),
        employeeId: event.employeeId || '',
        type: event.type || definition.name,
        category: event.category || definition.category || 'Event',
        status: event.status || 'planned',
        start: event.start || '',
        end: event.end || '',
        paidMinutes: Number(event.paidMinutes || 0),
        coverageImpact: event.coverageImpact || definition.coverageImpact || '',
        benefitImpact: (String(event.type || '').toLowerCase() === 'mandation' && /vacation|sick|personal|benefit time/i.test(String(event.benefitImpact || ''))) ? definition.benefitImpact : (event.benefitImpact || definition.benefitImpact || ''),
        behaviors: Array.isArray(event.behaviors) ? event.behaviors : (definition.behavior || []),
        reason: event.reason || '',
        source: event.source || 'manual mock data',
        notes: event.notes || ''
      };
    });
    next.benefitLedger = Array.isArray(next.benefitLedger) ? next.benefitLedger : [];
    next.benefitLedger = next.benefitLedger.map(function (entry) {
      return {
        id: entry.id || id('ben'),
        employeeId: entry.employeeId || '',
        benefitType: entry.benefitType || 'Vacation',
        date: entry.date || '',
        amountMinutes: Number(entry.amountMinutes || (entry.amountHours ? entry.amountHours * 60 : 0) || 0),
        amount: entry.amount || '',
        action: entry.action || 'ledger entry',
        reason: entry.reason || '',
        source: entry.source || 'mock ledger',
        relatedEventId: entry.relatedEventId || '',
        balanceAfterMinutes: Number(entry.balanceAfterMinutes || 0),
        notes: entry.notes || ''
      };
    });
    next.benefitRules = Array.isArray(next.benefitRules) && next.benefitRules.length ? next.benefitRules : defaultBenefitRules();
    next.ruleEnginePrinciples = Array.isArray(next.ruleEnginePrinciples) && next.ruleEnginePrinciples.length ? next.ruleEnginePrinciples : defaultRuleEnginePrinciples();
    next.ruleEvaluationExamples = Array.isArray(next.ruleEvaluationExamples) && next.ruleEvaluationExamples.length ? next.ruleEvaluationExamples : defaultRuleEvaluationExamples();
    next.agencyRuleTemplates = Array.isArray(next.agencyRuleTemplates) && next.agencyRuleTemplates.length ? next.agencyRuleTemplates : defaultAgencyRuleTemplates();
    next.coverageRequirements = Array.isArray(next.coverageRequirements) && next.coverageRequirements.length ? next.coverageRequirements : defaultCoverageRequirements();
    next.scheduleViews = Array.isArray(next.scheduleViews) && next.scheduleViews.length ? next.scheduleViews : defaultScheduleViews();
    next.systemInspectorNotes = Array.isArray(next.systemInspectorNotes) && next.systemInspectorNotes.length ? next.systemInspectorNotes : defaultSystemInspectorNotes();
    next.fairnessMetrics = Array.isArray(next.fairnessMetrics) && next.fairnessMetrics.length ? next.fairnessMetrics : defaultFairnessMetrics();
    next.seniorityLedger = Array.isArray(next.seniorityLedger) && next.seniorityLedger.length ? next.seniorityLedger : defaultSeniorityLedger();
    next.explanationExamples = Array.isArray(next.explanationExamples) && next.explanationExamples.length ? next.explanationExamples : defaultExplanationExamples();
    next.explanationLevels = Array.isArray(next.explanationLevels) && next.explanationLevels.length ? next.explanationLevels : defaultExplanationLevels();
    next.mandationRules = Array.isArray(next.mandationRules) && next.mandationRules.length ? next.mandationRules : defaultMandationRules();
    next.mandateRotation = Array.isArray(next.mandateRotation) && next.mandateRotation.length ? next.mandateRotation : defaultMandateRotation();
    next.operationalTraits = Array.isArray(next.operationalTraits) && next.operationalTraits.length ? next.operationalTraits : defaultOperationalTraits();
    next.bidRules = Array.isArray(next.bidRules) && next.bidRules.length ? next.bidRules : defaultBidRules();
    next.bidRounds = Array.isArray(next.bidRounds) && next.bidRounds.length ? next.bidRounds : defaultBidRounds();
    next.voluntaryOvertimeRequests = Array.isArray(next.voluntaryOvertimeRequests) && next.voluntaryOvertimeRequests.length ? next.voluntaryOvertimeRequests : defaultVoluntaryOvertimeRequests();
    next.postedOvertimeOpportunities = Array.isArray(next.postedOvertimeOpportunities) && next.postedOvertimeOpportunities.length ? next.postedOvertimeOpportunities : defaultPostedOvertimeOpportunities();
    next.bidAwardExamples = Array.isArray(next.bidAwardExamples) && next.bidAwardExamples.length ? next.bidAwardExamples : defaultBidAwardExamples();
    next.analyticsMetrics = Array.isArray(next.analyticsMetrics) && next.analyticsMetrics.length ? next.analyticsMetrics : defaultAnalyticsMetrics();
    next.analyticsReports = Array.isArray(next.analyticsReports) && next.analyticsReports.length ? next.analyticsReports : defaultAnalyticsReports();
    next.analyticsTrendSignals = Array.isArray(next.analyticsTrendSignals) && next.analyticsTrendSignals.length ? next.analyticsTrendSignals : defaultAnalyticsTrendSignals();
    next.analyticsForecasts = Array.isArray(next.analyticsForecasts) && next.analyticsForecasts.length ? next.analyticsForecasts : defaultAnalyticsForecasts();
    next.notificationTriggers = Array.isArray(next.notificationTriggers) && next.notificationTriggers.length ? next.notificationTriggers : defaultNotificationTriggers();
    next.notificationChannels = Array.isArray(next.notificationChannels) && next.notificationChannels.length ? next.notificationChannels : defaultNotificationChannels();
    next.notificationSubscriptions = Array.isArray(next.notificationSubscriptions) && next.notificationSubscriptions.length ? next.notificationSubscriptions : defaultNotificationSubscriptions();
    next.notificationAuditExamples = Array.isArray(next.notificationAuditExamples) && next.notificationAuditExamples.length ? next.notificationAuditExamples : defaultNotificationAuditExamples();
    next.goalModeProfiles = Array.isArray(next.goalModeProfiles) && next.goalModeProfiles.length ? next.goalModeProfiles : defaultGoalModeProfiles();
    next.goalModeTradeoffs = Array.isArray(next.goalModeTradeoffs) && next.goalModeTradeoffs.length ? next.goalModeTradeoffs : defaultGoalModeTradeoffs();
    next.goalModeRecommendations = Array.isArray(next.goalModeRecommendations) && next.goalModeRecommendations.length ? next.goalModeRecommendations : defaultGoalModeRecommendations();
    next.goalModeAuditExamples = Array.isArray(next.goalModeAuditExamples) && next.goalModeAuditExamples.length ? next.goalModeAuditExamples : defaultGoalModeAuditExamples();
    next.agencyProfile = next.agencyProfile || defaultAgencyProfile();
    next.agencyProfile.shiftDefinitions = Array.isArray(next.agencyProfile.shiftDefinitions) ? next.agencyProfile.shiftDefinitions : defaultAgencyProfile().shiftDefinitions;
    next.agencyProfile.coverageRequirements = Array.isArray(next.agencyProfile.coverageRequirements) ? next.agencyProfile.coverageRequirements : defaultAgencyProfile().coverageRequirements;
    next.rules = next.rules || {};
    next.rules.maxHoursPerWeek = Number(next.rules.maxHoursPerWeek || 40);
    next.rules.minGapHours = Number(next.rules.minGapHours || 8);
    next.rules.monthStart = next.rules.monthStart || defaultMonthValue();
    next.selectedEmployeeId = next.selectedEmployeeId || (next.employees[0] ? next.employees[0].id : null);
    next.employees = next.employees.map(function (employee) {
      return {
        id: employee.id || id('emp'),
        name: employee.name || 'Unnamed',
        employeeCode: employee.employeeCode || employee.badge || '',
        role: employee.role || employee.position || 'Dispatcher',
        position: employee.position || employee.role || 'Dispatcher',
        status: employee.status || 'active',
        hireDate: employee.hireDate || '',
        seniorityDate: employee.seniorityDate || employee.hireDate || '',
        seniorityAdjustments: Array.isArray(employee.seniorityAdjustments) ? employee.seniorityAdjustments : [],
        department: employee.department || 'Communications',
        division: employee.division || 'Operations',
        location: employee.location || 'Main Center',
        shiftGroup: employee.shiftGroup || '',
        assignedPattern: employee.assignedPattern || '',
        supervisor: employee.supervisor || '',
        colorLabel: employee.colorLabel || 'Default',
        overtimeEligible: employee.overtimeEligible !== false,
        mandateEligible: employee.mandateEligible !== false,
        tradeEligible: employee.tradeEligible !== false,
        shiftBidEligible: employee.shiftBidEligible !== false,
        vacationBidEligible: employee.vacationBidEligible !== false,
        benefitEligible: employee.benefitEligible !== false,
        exceptions: Array.isArray(employee.exceptions) ? employee.exceptions : [],
        qualifications: Array.isArray(employee.qualifications) ? employee.qualifications : [],
        benefitBalances: employee.benefitBalances || { vacation: 0, sick: 0, personal: 0, comp: 0, holiday: 0 }
      };
    });
    next.shifts = next.shifts.map(function (shift) {
      return {
        id: shift.id || id('shift'),
        name: shift.name || 'Shift',
        start: shift.start || '07:00',
        end: shift.end || '15:00',
        minStaff: Number(shift.minStaff || 1)
      };
    });
    return next;
  }

  function save() {
    state = normalizeState(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    var status = $('#scheduleSaveStatus');
    if (status) status.textContent = 'Saved locally';
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        for (var i = 0; i < OLD_STORAGE_KEYS.length; i += 1) {
          raw = localStorage.getItem(OLD_STORAGE_KEYS[i]);
          if (raw) break;
        }
      }
      if (raw) {
        state = normalizeState(JSON.parse(raw));
        if (!localStorage.getItem(STORAGE_KEY)) state.sampleCleared = false;
      } else {
        state = normalizeState(state);
      }
      if (!state.employees.length && !state.shifts.length && !state.assignments.length && !state.sampleCleared) {
        state = normalizeState(buildSampleState());
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (error) {
      state = normalizeState(buildSampleState());
    }
  }

  function showToast(message, type) {
    if (window.SignalLabs && window.SignalLabs.toast) window.SignalLabs.toast(message, type || 'info');
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  }

  function formatTime(time) {
    if (!time) return '';
    var parts = time.split(':');
    var hour = Number(parts[0]);
    var minute = parts[1] || '00';
    var suffix = hour >= 12 ? 'PM' : 'AM';
    var displayHour = hour % 12 || 12;
    return displayHour + ':' + minute + ' ' + suffix;
  }

  function minutesFromTime(time) {
    var parts = String(time || '00:00').split(':');
    return Number(parts[0] || 0) * 60 + Number(parts[1] || 0);
  }

  function orderedDays() {
    var agency = state.agencyProfile || defaultAgencyProfile();
    var start = agency.workWeekStartsOn || 'Sunday';
    var index = baseDays.indexOf(start);
    if (index < 0) index = 0;
    return baseDays.slice(index).concat(baseDays.slice(0, index));
  }

  function shouldUse24Hour() {
    var agency = state.agencyProfile || defaultAgencyProfile();
    return String(agency.timeFormat || '').toLowerCase().indexOf('24') !== -1;
  }

  function displayTime(time) {
    if (!time) return '';
    if (shouldUse24Hour()) return String(time).replace(':', '');
    return formatTime(time);
  }

  function shiftHours(shift) {
    var start = minutesFromTime(shift.start);
    var end = minutesFromTime(shift.end);
    if (end <= start) end += 24 * 60;
    return (end - start) / 60;
  }

  function shiftLabel(shift) {
    return shift.name + ' · ' + displayTime(shift.start) + '–' + displayTime(shift.end);
  }

  function assignmentSort(a, b) {
    var ordered = orderedDays();
    var dayDiff = ordered.indexOf(a.day) - ordered.indexOf(b.day);
    if (dayDiff) return dayDiff;
    var shiftA = findShift(a.shiftId);
    var shiftB = findShift(b.shiftId);
    return minutesFromTime(shiftA ? shiftA.start : '00:00') - minutesFromTime(shiftB ? shiftB.start : '00:00');
  }

  function findEmployee(employeeId) {
    return state.employees.find(function (person) { return person.id === employeeId; });
  }

  function findShift(shiftId) {
    return state.shifts.find(function (item) { return item.id === shiftId; });
  }

  function renderWeekLabel() {
    var label = $('#currentWeekLabel');
    if (label) label.textContent = 'v0.19.0 Architecture Complete';
  }

  function syncRuleInputs() {
    $('#maxHoursPerWeek').value = state.rules.maxHoursPerWeek;
    $('#minGapHours').value = state.rules.minGapHours;
    $('#monthStart').value = state.rules.monthStart || defaultMonthValue();
  }

  function renderEngineBlueprint() {
    var target = $('#engineBlueprint');
    if (!target) return;
    var items = [
      ['Agency', state.agencyProfile ? 1 : 0, 'The organization defines settings, vocabulary, shift definitions, coverage rules, and future policy defaults.'],
      ['People', state.employees.length, 'Employees are rule-aware profile objects and remain separate from future login users.'],
      ['Rules', state.ruleProfiles.length, 'Agency policies explain overtime, mandation, coverage, benefits, and fairness.'],
      ['Patterns', state.patterns.length, 'Rotations generate expected work instead of storing every day forever.'],
      ['Events', state.scheduleEvents.length, 'Events modify expected pattern work and explain why the final schedule differs from the normal plan.'],
      ['Benefits', state.benefitLedger.length, 'Ledger entries preserve accruals, usage, corrections, payouts, and projected balances.'],
      ['Coverage', state.coverageRequirements.length, 'Requirements compare need vs. scheduled staffing.'],
      ['Views', (state.scheduleViews || []).length, 'Different screens should show the same engine data for different audiences.']
    ];
    target.innerHTML = items.map(function (item) {
      return '<article class="engine-step"><span>' + escapeHtml(item[0]) + '</span><strong>' + item[1] + '</strong><p>' + escapeHtml(item[2]) + '</p></article>';
    }).join('');
  }

  function listText(items) {
    return (items || []).map(function (item) { return escapeHtml(item); }).join(', ');
  }

  function benefitText(balances) {
    var b = balances || {};
    return 'Vacation ' + (b.vacation || 0) + 'h · Sick ' + (b.sick || 0) + 'h · Personal ' + (b.personal || 0) + 'h · Comp ' + (b.comp || 0) + 'h';
  }

  function eligibilityText(employee) {
    var flags = [];
    if (employee.overtimeEligible) flags.push('OT');
    if (employee.mandateEligible) flags.push('Mandate');
    if (employee.tradeEligible) flags.push('Trade');
    if (employee.shiftBidEligible) flags.push('Shift bid');
    if (employee.vacationBidEligible) flags.push('Vacation bid');
    if (employee.benefitEligible) flags.push('Benefits');
    return flags.join(' · ') || 'No eligibility enabled';
  }

  function renderEmployeeProfiles() {
    var cards = $('#employeeProfileCards');
    var detail = $('#employeeProfileDetail');
    if (!cards || !detail) return;
    if (!state.employees.length) {
      cards.innerHTML = '<div class="signal-empty-state"><strong>No employee profiles yet</strong><span>Load sample data or add people to preview rule-aware profiles.</span></div>';
      detail.innerHTML = '<strong>Employee detail preview</strong><p>Select an employee card to see assignment, eligibility, exceptions, qualifications, and benefit snapshot notes.</p>';
      return;
    }
    if (!state.selectedEmployeeId || !findEmployee(state.selectedEmployeeId)) state.selectedEmployeeId = state.employees[0].id;
    cards.innerHTML = state.employees.map(function (employee) {
      var active = employee.id === state.selectedEmployeeId ? ' is-active' : '';
      var exception = employee.exceptions.length ? employee.exceptions.join(', ') : 'None';
      return '<button type="button" class="employee-profile-card-button' + active + '" data-select-employee="' + employee.id + '"><span>' + escapeHtml(employee.status) + '</span><strong>' + escapeHtml(employee.name) + '</strong><small>' + escapeHtml(employee.position) + ' · ' + escapeHtml(employee.shiftGroup || 'No shift group') + '</small><em>Exceptions: ' + escapeHtml(exception) + '</em></button>';
    }).join('');
    var selected = findEmployee(state.selectedEmployeeId) || state.employees[0];
    var exceptions = selected.exceptions.length ? selected.exceptions.join(', ') : 'None';
    var qualifications = selected.qualifications.length ? selected.qualifications.join(', ') : 'None assigned';
    var mandateNote = selected.mandateEligible && !selected.exceptions.length ? 'Can be evaluated for future mandate rotation rules.' : 'Future mandation rules must explain skip/exception handling.';
    var seniorityAdjustments = Array.isArray(selected.seniorityAdjustments) && selected.seniorityAdjustments.length ? selected.seniorityAdjustments.map(function (item) { return (item.effect || '') + ' for ' + (item.reason || 'seniority adjustment'); }).join(', ') : 'None';
    detail.innerHTML = '' +
      '<span>Selected Employee</span>' +
      '<strong>' + escapeHtml(selected.name) + '</strong>' +
      '<p><b>Identity:</b> ' + escapeHtml(selected.employeeCode || 'No employee ID') + ' · hired ' + escapeHtml(selected.hireDate || 'not set') + ' · seniority ' + escapeHtml(selected.seniorityDate || 'not set') + '</p>' +
      '<p><b>Agency assignment:</b> ' + escapeHtml(selected.department) + ' / ' + escapeHtml(selected.division) + ' / ' + escapeHtml(selected.location) + '</p>' +
      '<p><b>Position:</b> ' + escapeHtml(selected.position) + ' · <b>Shift group:</b> ' + escapeHtml(selected.shiftGroup || 'not assigned') + ' · <b>Pattern:</b> ' + escapeHtml(selected.assignedPattern || 'placeholder') + '</p>' +
      '<p><b>Eligibility:</b> ' + escapeHtml(eligibilityText(selected)) + '</p>' +
      '<p><b>Exceptions:</b> ' + escapeHtml(exceptions) + '</p>' +
      '<p><b>Qualifications:</b> ' + escapeHtml(qualifications) + '</p>' +
      '<p><b>Benefit snapshot:</b> ' + escapeHtml(benefitText(selected.benefitBalances)) + '</p>' +
      '<p><b>Rule impact:</b> ' + escapeHtml(mandateNote) + '</p>' +
      '<p><b>Seniority adjustments:</b> ' + escapeHtml(seniorityAdjustments) + '</p>';
  }

  function renderAgencyProfile() {
    var target = $('#agencyProfilePreview');
    if (!target) return;
    var agency = state.agencyProfile || defaultAgencyProfile();
    var cards = [
      ['Agency', agency.name, agency.industryType],
      ['Display', agency.timeZone, agency.timeFormat + ' · ' + agency.dateFormat],
      ['Work Rules', 'Week starts ' + agency.workWeekStartsOn, agency.payPeriodType + ' pay period starts ' + agency.payPeriodStartsOn],
      ['Departments', String((agency.departments || []).length), listText(agency.departments)],
      ['Positions / Titles', String((agency.positions || []).length), listText(agency.positions)],
      ['Shift Groups', String((agency.shiftGroups || []).length), listText(agency.shiftGroups)],
      ['Qualifications', String((agency.qualifications || []).length), listText(agency.qualifications)],
      ['Benefit Types', String((agency.benefitTypes || []).length), listText(agency.benefitTypes)],
      ['Exception Types', String((agency.exceptionTypes || []).length), listText(agency.exceptionTypes)]
    ];
    target.innerHTML = cards.map(function (card) {
      return '<article class="agency-profile-item"><span>' + escapeHtml(card[0]) + '</span><strong>' + escapeHtml(card[1]) + '</strong><p>' + card[2] + '</p></article>';
    }).join('');
  }


  function eventDateLabel(value) {
    if (!value) return 'No time set';
    return String(value).replace('T', ' ');
  }

  function renderEventFoundation() {
    var target = $('#eventFoundationPreview');
    if (!target) return;
    var events = state.scheduleEvents.length ? state.scheduleEvents : [{ type: 'Vacation', status: 'planned', start: '2026-06-15T18:00', end: '2026-06-16T06:00', coverageImpact: 'Removes expected pattern coverage.', benefitImpact: 'Consumes vacation minutes after approval.', behaviors: ['removes from coverage', 'uses benefit time'] }];
    target.innerHTML = events.map(function (event) {
      var employee = findEmployee(event.employeeId);
      var who = employee ? employee.name : 'Unassigned sample';
      return '<article class="event-card"><span>' + escapeHtml(event.type) + ' · ' + escapeHtml(event.status) + '</span><strong>' + escapeHtml(who) + '</strong><p>' + escapeHtml(eventDateLabel(event.start)) + ' → ' + escapeHtml(eventDateLabel(event.end)) + '</p><small>' + escapeHtml(event.coverageImpact || 'Coverage impact planned.') + '<br>' + escapeHtml(event.benefitImpact || 'Benefit impact planned.') + '</small></article>';
    }).join('');
  }

  function renderEventBehaviorPreview() {
    var target = $('#eventBehaviorPreview');
    if (!target) return;
    var definitions = state.eventTypeDefinitions && state.eventTypeDefinitions.length ? state.eventTypeDefinitions : defaultEventTypeDefinitions();
    target.innerHTML = definitions.map(function (item) {
      return '<article class="event-behavior-card-item"><span>' + escapeHtml(item.category) + '</span><strong>' + escapeHtml(item.name) + '</strong><p>' + escapeHtml((item.behavior || []).join(' · ')) + '</p><small>' + escapeHtml(item.coverageImpact || '') + '</small></article>';
    }).join('');
  }


  function formatMinutes(minutes) {
    var value = Number(minutes || 0);
    var sign = value > 0 ? '+' : '';
    var hours = Math.round((value / 60) * 100) / 100;
    return sign + hours + ' hr' + (Math.abs(hours) === 1 ? '' : 's');
  }

  function minutesLabel(minutes) {
    var value = Number(minutes || 0);
    var hours = Math.round((value / 60) * 100) / 100;
    return hours + ' hr' + (Math.abs(hours) === 1 ? '' : 's');
  }

  function renderBenefitLedgerFoundation() {
    var target = $('#benefitLedgerPreview');
    if (!target) return;
    var entries = state.benefitLedger.length ? state.benefitLedger : [{ benefitType: 'Sick', date: '2026-06-01', amountMinutes: 480, action: 'Monthly accrual', reason: 'Monthly sick accrual', source: 'sample policy' }];
    target.innerHTML = entries.map(function (entry) {
      var employee = findEmployee(entry.employeeId);
      var who = employee ? employee.name : 'Agency sample';
      return '<article class="benefit-ledger-card"><span>' + escapeHtml(entry.benefitType) + ' · ' + escapeHtml(entry.action || 'Ledger entry') + '</span><strong>' + escapeHtml(formatMinutes(entry.amountMinutes)) + '</strong><p>' + escapeHtml(who) + ' · ' + escapeHtml(entry.date || 'No date') + '</p><small>' + escapeHtml(entry.reason || 'Benefit ledger entry') + '<br>Source: ' + escapeHtml(entry.source || 'mock ledger') + '</small></article>';
    }).join('');
  }

  function renderBenefitRulePreview() {
    var target = $('#benefitRulePreview');
    if (!target) return;
    var rules = state.benefitRules && state.benefitRules.length ? state.benefitRules : defaultBenefitRules();
    target.innerHTML = rules.map(function (rule) {
      return '<article class="benefit-rule-card-item"><span>' + escapeHtml(rule.benefitType) + '</span><strong>' + escapeHtml(rule.method) + '</strong><p>' + escapeHtml(formatMinutes(rule.amountMinutes)) + ' · ' + escapeHtml(rule.cadence) + '</p><small>' + escapeHtml(rule.appliesTo) + '<br>' + escapeHtml(rule.notes) + '</small></article>';
    }).join('');
  }


  function renderRuleEnginePreview() {
    var target = $('#ruleEnginePreview');
    if (!target) return;
    var items = Array.isArray(state.ruleEnginePrinciples) && state.ruleEnginePrinciples.length ? state.ruleEnginePrinciples : defaultRuleEnginePrinciples();
    target.innerHTML = items.map(function (item) {
      return '<article class="rule-engine-card-item">' +
        '<span class="card-kicker">' + escapeHtml(item.name || 'Rule principle') + '</span>' +
        '<strong>' + escapeHtml(item.summary || '') + '</strong>' +
        '<p>' + escapeHtml(item.example || '') + '</p>' +
        '</article>';
    }).join('');
  }

  function renderRuleEvaluationPreview() {
    var target = $('#ruleEvaluationPreview');
    if (!target) return;
    var items = Array.isArray(state.ruleEvaluationExamples) && state.ruleEvaluationExamples.length ? state.ruleEvaluationExamples : defaultRuleEvaluationExamples();
    target.innerHTML = items.map(function (item) {
      return '<article class="rule-evaluation-card-item">' +
        '<span class="card-kicker">' + escapeHtml(item.ruleType || 'Rule') + '</span>' +
        '<strong>' + escapeHtml(item.priority || 'Priority not set') + '</strong>' +
        '<small class="rule-card-label">Input</small>' +
        '<p>' + escapeHtml(item.input || '') + '</p>' +
        '<small class="rule-card-label">Outcome</small>' +
        '<p>' + escapeHtml(item.outcome || '') + '</p>' +
        '<em>' + escapeHtml(item.explanation || '') + '</em>' +
        '</article>';
    }).join('');
  }

  function renderAgencyTemplatePreview() {
    var target = $('#agencyTemplatePreview');
    if (!target) return;
    var items = Array.isArray(state.agencyRuleTemplates) && state.agencyRuleTemplates.length ? state.agencyRuleTemplates : defaultAgencyRuleTemplates();
    target.innerHTML = items.map(function (item) {
      return '<article class="agency-template-card-item">' +
        '<span class="card-kicker">Editable template</span>' +
        '<strong>' + escapeHtml(item.name || 'Agency template') + '</strong>' +
        '<p>' + escapeHtml(item.examples || '') + '</p>' +
        '</article>';
    }).join('');
  }

  function renderCoverageRequirementPreview() {
    var target = $('#coverageRequirementPreview');
    if (!target) return;
    var agency = state.agencyProfile || defaultAgencyProfile();
    var shiftCards = (agency.shiftDefinitions || []).map(function (shift) {
      return '<article class="coverage-rule-card"><span>Shift Definition</span><strong>' + escapeHtml(shift.name) + '</strong><p>' + escapeHtml(shift.displayLabel || (shift.start + '-' + shift.end)) + ' · ' + Math.round(Number(shift.paidMinutes || 0) / 60 * 100) / 100 + ' paid hrs</p><small>' + escapeHtml(shift.breakRule) + '</small></article>';
    });
    var coverageCards = (agency.coverageRequirements || []).map(function (item) {
      return '<article class="coverage-rule-card"><span>Coverage Requirement</span><strong>' + escapeHtml(item.role) + ' · ' + escapeHtml(item.start) + '-' + escapeHtml(item.end) + '</strong><p>Min ' + item.minimum + ' · Target ' + item.target + ' · Max ' + item.maximum + '</p><small>' + escapeHtml(item.location) + ' · ' + escapeHtml(item.qualification) + ' · ' + (item.numberedSpots ? 'Numbered spots planned' : 'Count-only rule') + '</small></article>';
    });
    target.innerHTML = shiftCards.concat(coverageCards).join('');
  }


  function timeRangeEndMinutes(start, end) {
    var startMinutes = minutesFromTime(start);
    var endMinutes = minutesFromTime(end);
    if (endMinutes <= startMinutes) endMinutes += 24 * 60;
    return { start: startMinutes, end: endMinutes };
  }

  function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    return Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
  }

  function assignmentMatchesCoverage(assignment, requirement) {
    var employee = findEmployee(assignment.employeeId);
    var shift = findShift(assignment.shiftId);
    if (!employee || !shift || !requirement) return false;
    var role = requirement.role || 'Any';
    if (role !== 'Any' && employee.position !== role && employee.role !== role) return false;
    var req = timeRangeEndMinutes(requirement.start || '00:00', requirement.end || '23:59');
    var shiftRange = timeRangeEndMinutes(shift.start, shift.end);
    return rangesOverlap(shiftRange.start, shiftRange.end, req.start, req.end) || rangesOverlap(shiftRange.start + 1440, shiftRange.end + 1440, req.start, req.end);
  }

  function coverageRequirementList() {
    var agency = state.agencyProfile || defaultAgencyProfile();
    var agencyRequirements = Array.isArray(agency.coverageRequirements) && agency.coverageRequirements.length ? agency.coverageRequirements : [];
    return agencyRequirements.length ? agencyRequirements : state.coverageRequirements;
  }

  function coverageEngineRows() {
    var requirements = coverageRequirementList();
    var rows = [];
    orderedDays().forEach(function (day) {
      requirements.forEach(function (requirement) {
        var scheduled = state.assignments.filter(function (assignment) {
          return assignment.day === day && assignmentMatchesCoverage(assignment, requirement);
        }).length;
        var minimum = Number(requirement.minimum || 0);
        var target = Number(requirement.target || minimum);
        var maximum = Number(requirement.maximum || target);
        var status = 'on-target';
        if (scheduled < minimum) status = 'short';
        else if (scheduled > maximum) status = 'over';
        else if (scheduled < target) status = 'below-target';
        rows.push({
          day: day,
          requirement: requirement,
          scheduled: scheduled,
          minimum: minimum,
          target: target,
          maximum: maximum,
          status: status,
          openMinimum: Math.max(0, minimum - scheduled),
          openTarget: Math.max(0, target - scheduled),
          surplus: Math.max(0, scheduled - maximum)
        });
      });
    });
    return rows;
  }

  function coverageStatusLabel(status) {
    if (status === 'short') return 'Below minimum';
    if (status === 'below-target') return 'Below target';
    if (status === 'over') return 'Above maximum';
    return 'Within target range';
  }

  function renderCoverageEnginePreview() {
    var target = $('#coverageEnginePreview');
    if (!target) return;
    var rows = coverageEngineRows();
    var priority = rows.filter(function (row) { return row.status === 'short' || row.status === 'over' || row.status === 'below-target'; }).slice(0, 6);
    if (!priority.length) priority = rows.slice(0, 6);
    target.innerHTML = priority.map(function (row) {
      var req = row.requirement;
      return '<article class="coverage-engine-item status-' + row.status + '">' +
        '<span class="card-kicker">' + escapeHtml(row.day) + ' · ' + escapeHtml(coverageStatusLabel(row.status)) + '</span>' +
        '<strong>' + escapeHtml(req.role || 'Coverage') + ' · ' + displayTime(req.start) + '-' + displayTime(req.end) + '</strong>' +
        '<p>Scheduled ' + row.scheduled + ' · Min ' + row.minimum + ' · Target ' + row.target + ' · Max ' + row.maximum + '</p>' +
        '<small>' + escapeHtml(req.location || 'Any location') + ' · ' + escapeHtml(req.qualification || 'Any qualification') + '<br>' +
        (row.openMinimum ? row.openMinimum + ' below minimum' : row.openTarget ? row.openTarget + ' below target' : row.surplus ? row.surplus + ' over maximum' : 'Coverage is inside the planned range.') + '</small>' +
        '</article>';
    }).join('');
  }

  function renderCoverageSlotPreview() {
    var target = $('#coverageSlotPreview');
    if (!target) return;
    var requirement = coverageRequirementList().find(function (item) { return item.numberedSpots; }) || coverageRequirementList()[0];
    if (!requirement) {
      target.innerHTML = '<div class="signal-empty-state"><strong>No coverage requirements</strong><span>Add agency coverage requirements to preview open spots.</span></div>';
      return;
    }
    var sampleDay = orderedDays()[0];
    var scheduled = state.assignments.filter(function (assignment) { return assignment.day === sampleDay && assignmentMatchesCoverage(assignment, requirement); });
    var maxSpots = Math.max(Number(requirement.maximum || requirement.target || requirement.minimum || 0), scheduled.length);
    var cards = [];
    for (var i = 0; i < maxSpots; i += 1) {
      var assignment = scheduled[i];
      var employee = assignment ? findEmployee(assignment.employeeId) : null;
      var status = i < Number(requirement.minimum || 0) ? 'minimum' : i < Number(requirement.target || 0) ? 'target' : 'maximum';
      cards.push('<article class="coverage-slot-item ' + (employee ? 'is-filled' : 'is-open') + '"><span>Spot ' + (i + 1) + ' · ' + status + '</span><strong>' + escapeHtml(employee ? employee.name : 'Open') + '</strong><small>' + escapeHtml(employee ? (employee.position + ' · ' + employee.shiftGroup) : 'Unfilled coverage spot') + '</small></article>');
    }
    target.innerHTML = '<div class="coverage-slot-summary"><strong>' + escapeHtml(sampleDay) + ' ' + escapeHtml(requirement.role || 'Coverage') + '</strong><span>' + displayTime(requirement.start) + '-' + displayTime(requirement.end) + ' · Min ' + requirement.minimum + ' · Target ' + requirement.target + ' · Max ' + requirement.maximum + '</span></div>' + cards.join('');
  }


  function renderScheduleViewsPreview() {
    var target = $('#scheduleViewsPreview');
    if (!target) return;
    var agency = state.agencyProfile || defaultAgencyProfile();
    var items = Array.isArray(state.scheduleViews) && state.scheduleViews.length ? state.scheduleViews : defaultScheduleViews();
    target.innerHTML = items.map(function (item) {
      var respects = Array.isArray(item.respects) ? item.respects.join(' · ') : '';
      return '<article class="schedule-view-card">' +
        '<span class="card-kicker">' + escapeHtml(item.audience || 'View') + '</span>' +
        '<strong>' + escapeHtml(item.name || 'Schedule view') + '</strong>' +
        '<p>' + escapeHtml(item.purpose || '') + '</p>' +
        '<small>' + escapeHtml(respects || ('Week starts ' + agency.workWeekStartsOn)) + '</small>' +
        '<em>' + escapeHtml(item.status || 'Preview only') + '</em>' +
        '</article>';
    }).join('');
  }

  function renderSystemInspectorPreview() {
    var target = $('#systemInspectorPreview');
    if (!target) return;
    var notes = Array.isArray(state.systemInspectorNotes) && state.systemInspectorNotes.length ? state.systemInspectorNotes : defaultSystemInspectorNotes();
    target.innerHTML = notes.map(function (note) {
      return '<article class="system-inspector-item">' +
        '<span class="card-kicker">Engine-facing</span>' +
        '<strong>' + escapeHtml(note.name || 'Inspector note') + '</strong>' +
        '<p>' + escapeHtml(note.detail || '') + '</p>' +
        '</article>';
    }).join('');
  }


  function renderFairnessEnginePreview() {
    var target = $('#fairnessEnginePreview');
    if (!target) return;
    var items = Array.isArray(state.fairnessMetrics) && state.fairnessMetrics.length ? state.fairnessMetrics : defaultFairnessMetrics();
    target.innerHTML = items.map(function (item) {
      return '<article class="fairness-engine-item"><span class="card-kicker">' + escapeHtml(item.category) + '</span><strong>' + escapeHtml(item.name) + '</strong><p>' + escapeHtml(item.metric) + '</p><small>' + escapeHtml(item.purpose) + '<br>' + escapeHtml(item.example) + '</small></article>';
    }).join('');
  }

  function fairnessEmployeeRows() {
    return state.employees.map(function (employee) {
      var assignments = state.assignments.filter(function (assignment) { return assignment.employeeId === employee.id; });
      var events = state.scheduleEvents.filter(function (event) { return event.employeeId === employee.id; });
      var otMinutes = events.filter(function (event) { return /overtime|mandation|callback/i.test(event.type); }).reduce(function (sum, event) { return sum + Number(event.paidMinutes || 0); }, 0);
      var mandates = events.filter(function (event) { return /mandation/i.test(event.type); }).length;
      var weekendAssignments = assignments.filter(function (assignment) { return assignment.day === 'Saturday' || assignment.day === 'Sunday'; }).length;
      var skippedReason = (employee.exceptions || []).length ? 'Active exception: ' + employee.exceptions.join(', ') : 'No active skip exception in sample data';
      var seniorityAdjustments = (employee.seniorityAdjustments || []).length;
      return { employee: employee, otMinutes: otMinutes, mandates: mandates, weekendAssignments: weekendAssignments, skippedReason: skippedReason, seniorityAdjustments: seniorityAdjustments };
    });
  }

  function renderFairnessSnapshotPreview() {
    var target = $('#fairnessSnapshotPreview');
    if (!target) return;
    var rows = fairnessEmployeeRows();
    target.innerHTML = rows.map(function (row) {
      return '<article class="fairness-snapshot-item"><span class="card-kicker">' + escapeHtml(row.employee.position || row.employee.role) + '</span><strong>' + escapeHtml(row.employee.name) + '</strong><p>OT ' + minutesLabel(row.otMinutes) + ' · Mandates ' + row.mandates + ' · Weekends ' + row.weekendAssignments + '</p><small>' + escapeHtml(row.skippedReason) + '<br>Seniority adjustments: ' + row.seniorityAdjustments + '</small></article>';
    }).join('');
  }

  function renderSeniorityLedgerPreview() {
    var target = $('#seniorityLedgerPreview');
    if (!target) return;
    var items = Array.isArray(state.seniorityLedger) && state.seniorityLedger.length ? state.seniorityLedger : defaultSeniorityLedger();
    target.innerHTML = items.map(function (entry) {
      var employee = findEmployee(entry.employeeId);
      return '<article class="seniority-ledger-item"><span class="card-kicker">' + escapeHtml(entry.action) + '</span><strong>' + escapeHtml(employee ? employee.name : 'Employee') + '</strong><p>' + escapeHtml(entry.date) + ' · ' + Number(entry.adjustmentDays || 0) + ' adjustment day(s)</p><small>' + escapeHtml(entry.reason) + '<br>' + escapeHtml(entry.effectiveImpact) + '</small></article>';
    }).join('');
  }

  function renderExplainabilityPreview() {
    var target = $('#explainabilityPreview');
    if (!target) return;
    var items = Array.isArray(state.explanationExamples) && state.explanationExamples.length ? state.explanationExamples : defaultExplanationExamples();
    target.innerHTML = items.map(function (item) {
      return '<article class="explainability-item">' +
        '<span class="card-kicker">' + escapeHtml(item.category || 'Explanation') + '</span>' +
        '<strong>' + escapeHtml(item.question || 'Why?') + '</strong>' +
        '<p><b>Facts:</b> ' + escapeHtml(item.facts || '') + '</p>' +
        '<p><b>Rules:</b> ' + escapeHtml(item.rules || '') + '</p>' +
        '<small><b>Outcome:</b> ' + escapeHtml(item.outcome || '') + '<br><b>Audience:</b> ' + escapeHtml(item.audience || 'Admin') + '</small>' +
        '</article>';
    }).join('');
  }

  function renderExplanationLevelsPreview() {
    var target = $('#explanationLevelsPreview');
    if (!target) return;
    var items = Array.isArray(state.explanationLevels) && state.explanationLevels.length ? state.explanationLevels : defaultExplanationLevels();
    target.innerHTML = items.map(function (item) {
      return '<article class="explanation-level-item">' +
        '<span class="card-kicker">Why-layer</span>' +
        '<strong>' + escapeHtml(item.name || 'Explanation level') + '</strong>' +
        '<p>' + escapeHtml(item.detail || '') + '</p>' +
        '</article>';
    }).join('');
  }


  function renderMandationFoundationPreview() {
    var target = $('#mandationFoundationPreview');
    if (!target) return;
    target.innerHTML = state.mandationRules.map(function (rule) {
      return '<article class="mandation-rule-item"><span class="card-kicker">' + escapeHtml(rule.category || 'Mandation rule') + '</span><strong>' + escapeHtml(rule.name || 'Rule') + '</strong><p>' + escapeHtml(rule.summary || '') + '</p><small>' + escapeHtml(rule.example || '') + '</small></article>';
    }).join('');
  }

  function renderMandateRotationPreview() {
    var target = $('#mandateRotationPreview');
    if (!target) return;
    target.innerHTML = state.mandateRotation.map(function (row) {
      var employee = findEmployee(row.employeeId);
      var name = employee ? employee.name : row.employeeId;
      var skip = row.skipReason ? '<small>Skip reason: ' + escapeHtml(row.skipReason) + '</small>' : '<small>' + escapeHtml(row.rotationAction || '') + '</small>';
      return '<article class="mandate-rotation-item"><span class="card-kicker">Order ' + escapeHtml(row.order) + ' · ' + escapeHtml(row.status || '') + '</span><strong>' + escapeHtml(name) + '</strong><p>Mandates ' + escapeHtml(row.mandateCount || 0) + ' · Forced OT ' + minutesLabel(row.forcedMinutes || 0) + '</p>' + skip + '</article>';
    }).join('');
  }

  function renderOperationalTraitPreview() {
    var target = $('#operationalTraitPreview');
    if (!target) return;
    target.innerHTML = state.operationalTraits.map(function (trait) {
      return '<article class="operational-trait-item"><span class="card-kicker">' + escapeHtml(trait.category || 'Operational trait') + '</span><strong>' + escapeHtml(trait.name || 'Trait') + '</strong><p>' + escapeHtml(trait.purpose || '') + '</p><small>' + escapeHtml(trait.guardrail || '') + '</small></article>';
    }).join('');
  }

  function renderBiddingFoundationPreview() {
    var target = $('#biddingFoundationPreview');
    if (!target) return;
    var items = Array.isArray(state.bidRounds) && state.bidRounds.length ? state.bidRounds : defaultBidRounds();
    target.innerHTML = items.map(function (item) {
      return '<article class="bidding-card-item">' +
        '<span class="card-kicker">' + escapeHtml(item.bidType || 'Bid') + ' · ' + escapeHtml(item.status || 'planned') + '</span>' +
        '<strong>' + escapeHtml(item.name || 'Bid round') + '</strong>' +
        '<p>' + escapeHtml(item.opens || 'Open date TBD') + ' → ' + escapeHtml(item.closes || 'Close date TBD') + '</p>' +
        '<small>' + escapeHtml(item.selectionBasis || '') + '<br>' + escapeHtml(item.availableSlots || '') + '</small>' +
        '<em>' + escapeHtml(item.explanation || '') + '</em>' +
        '</article>';
    }).join('');
  }

  function renderVoluntaryOvertimePreview() {
    var target = $('#voluntaryOvertimePreview');
    if (!target) return;
    var items = Array.isArray(state.voluntaryOvertimeRequests) && state.voluntaryOvertimeRequests.length ? state.voluntaryOvertimeRequests : defaultVoluntaryOvertimeRequests();
    target.innerHTML = items.map(function (item) {
      var employee = findEmployee(item.employeeId);
      return '<article class="vot-card-item">' +
        '<span class="card-kicker">' + escapeHtml(item.requestType || 'Voluntary OT request') + ' · ' + escapeHtml(item.status || 'pending') + '</span>' +
        '<strong>' + escapeHtml(employee ? employee.name : 'Unknown employee') + '</strong>' +
        '<p>' + escapeHtml(item.requestedWindow || 'Window TBD') + '</p>' +
        '<small>' + escapeHtml(item.preferredAssignment || '') + '<br>' + escapeHtml(item.reason || '') + '</small>' +
        '<em>' + escapeHtml(item.reviewNote || '') + '</em>' +
        '</article>';
    }).join('');
  }

  function renderPostedOvertimePreview() {
    var target = $('#postedOvertimePreview');
    if (!target) return;
    var items = Array.isArray(state.postedOvertimeOpportunities) && state.postedOvertimeOpportunities.length ? state.postedOvertimeOpportunities : defaultPostedOvertimeOpportunities();
    target.innerHTML = items.map(function (item) {
      var volunteers = (item.volunteers || []).map(function (employeeId) {
        var employee = findEmployee(employeeId);
        return employee ? employee.name : employeeId;
      });
      return '<article class="posted-ot-card-item">' +
        '<span class="card-kicker">' + escapeHtml(item.status || 'posted') + ' · ' + escapeHtml(item.role || 'Role') + '</span>' +
        '<strong>' + escapeHtml(item.title || 'Posted opportunity') + '</strong>' +
        '<p>' + escapeHtml(item.window || 'Window TBD') + '</p>' +
        '<small>Slots: ' + escapeHtml(String(item.slotsAvailable || 0)) + ' · Volunteers: ' + escapeHtml(volunteers.join(', ') || 'None yet') + '<br>' + escapeHtml(item.awardMethod || '') + '</small>' +
        '<em>' + escapeHtml(item.explanation || '') + '</em>' +
        '</article>';
    }).join('');
  }

  function renderBidAwardPreview() {
    var target = $('#bidAwardPreview');
    if (!target) return;
    var items = Array.isArray(state.bidAwardExamples) && state.bidAwardExamples.length ? state.bidAwardExamples : defaultBidAwardExamples();
    target.innerHTML = items.map(function (item) {
      var employee = findEmployee(item.employeeId);
      return '<article class="bid-award-card-item">' +
        '<span class="card-kicker">' + escapeHtml(item.bidType || 'Bid') + ' · ' + escapeHtml(item.status || 'preview') + '</span>' +
        '<strong>' + escapeHtml(item.outcome || 'Outcome pending') + '</strong>' +
        '<p>' + escapeHtml(employee ? employee.name : 'Unknown employee') + '</p>' +
        '<small>' + escapeHtml(item.reason || '') + '</small>' +
        '<em>' + escapeHtml(item.auditTrail || '') + '</em>' +
        '</article>';
    }).join('');
  }


  function renderDataModelPreview() {
    var target = $('#dataModelPreview');
    if (!target) return;
    var pattern = state.patterns[0] || defaultPatterns()[0];
    var rule = state.ruleProfiles[0] || defaultRuleProfiles()[0];
    var eventSample = state.scheduleEvents[0] || { type: 'vacation', status: 'planned', start: '2026-06-15T05:00', end: '2026-06-15T17:00' };
    var benefitSample = state.benefitLedger[0] || { benefitType: 'sick', amount: '+8', reason: 'Monthly accrual' };
    var agency = state.agencyProfile || defaultAgencyProfile();
    var cards = [
      ['Agency Profile', agency.name, agency.industryType + ' · ' + agency.timeFormat + ' · week starts ' + agency.workWeekStartsOn],
      ['Rule Profile', rule.name, rule.coverage],
      ['Pattern Object', pattern.name, (pattern.cycleLength || 0) + ' day cycle · ' + (pattern.baseShift || 'custom shift') + ' · ' + ((pattern.cycleDays || []).filter(function (day) { return day.shiftType === 'short'; }).length) + ' short day(s)'],
      ['Schedule Event', eventSample.type + ' · ' + eventSample.status, eventSample.start + ' to ' + eventSample.end],
      ['Event Types', String((state.eventTypeDefinitions || []).length), 'Behavior-aware event definitions describe coverage, benefit, approval, and audit impact.'],
      ['Benefit Ledger', benefitSample.benefitType + ' ' + benefitSample.amount, benefitSample.reason],
      ['Coverage Engine', String(coverageEngineRows().length), 'Compares scheduled counts against min, target, and max by day and time block'],
      ['Schedule Views', String((state.scheduleViews || []).length), 'Day, week, month, personal, coverage, and inspector views should use the same engine.'],
      ['Fairness Metrics', String((state.fairnessMetrics || []).length), 'Fairness compares history, rules, seniority, mandates, overtime, weekends, holidays, and callbacks.'],
      ['Explainability', String((state.explanationExamples || []).length), 'Explains outcomes from facts, rules, history, audience, and audit context.'],
      ['Mandation', String((state.mandateRotation || []).length), 'Tracks forced OT rotation, counts, skips, exceptions, and mandate explanations.'],
      ['Bidding / Opportunities', String((state.bidRounds || []).length + (state.voluntaryOvertimeRequests || []).length + (state.postedOvertimeOpportunities || []).length), 'Plans shift bids, vacation bids, voluntary OT requests, posted OT opportunities, awards, and explanations.'],
      ['Operational Traits', String((state.operationalTraits || []).length), 'Employee traits such as gender can be used only when tied to documented operational rules.'],
      ['Analytics Foundation', String((state.analyticsMetrics || []).length + (state.analyticsReports || []).length + (state.analyticsTrendSignals || []).length + (state.analyticsForecasts || []).length), 'Plans hours, benefits, overtime, mandation, coverage, fairness, trends, forecasts, and audit-ready reports.'],
      ['Notifications Foundation', String((state.notificationTriggers || []).length + (state.notificationChannels || []).length + (state.notificationSubscriptions || []).length + (state.notificationAuditExamples || []).length), 'Plans alert triggers, delivery channels, audience subscriptions, suppression, escalation, and audit-ready notification history.'],
      ['Architecture Complete', String((state.goalModeProfiles || []).length + (state.goalModeTradeoffs || []).length + (state.goalModeRecommendations || []).length + (state.goalModeAuditExamples || []).length), 'Plans optimization goals, tradeoffs, recommendations, override behavior, and audit explanations.']
    ];
    target.innerHTML = cards.map(function (card) {
      return '<article class="model-card"><span>' + escapeHtml(card[0]) + '</span><strong>' + escapeHtml(card[1]) + '</strong><p>' + escapeHtml(card[2]) + '</p></article>';
    }).join('');
  }

  function patternDayLabel(day) {
    if (!day || day.dayType === 'off') return 'Off';
    return displayTime(day.start) + '-' + displayTime(day.end) + ' · ' + Math.round(Number(day.paidMinutes || 0) / 60 * 100) / 100 + ' paid hrs';
  }

  function renderPatternFoundation() {
    var target = $('#patternFoundationPreview');
    if (!target) return;
    target.innerHTML = state.patterns.map(function (pattern) {
      var workDays = (pattern.cycleDays || []).filter(function (day) { return day.dayType === 'work'; }).length;
      var shortDays = (pattern.cycleDays || []).filter(function (day) { return day.shiftType === 'short'; }).length;
      return '<article class="pattern-card"><span>Pattern Template</span><strong>' + escapeHtml(pattern.name) + '</strong><p>' + escapeHtml(pattern.description || pattern.notes || '') + '</p><small>Cycle: ' + escapeHtml(pattern.cycleLength) + ' days · Work days: ' + workDays + ' · Short days: ' + shortDays + ' · Base shift: ' + escapeHtml(pattern.baseShift || 'custom') + '</small></article>';
    }).join('');
  }

  function renderPatternCyclePreview() {
    var target = $('#patternCyclePreview');
    if (!target) return;
    var pattern = state.patterns.find(function (item) { return item.id === 'pattern-b-nights'; }) || state.patterns[0];
    if (!pattern) {
      target.innerHTML = '<div class="signal-empty-state"><strong>No patterns yet</strong><span>Pattern cycle previews will appear here.</span></div>';
      return;
    }
    target.innerHTML = '<div class="pattern-cycle-heading"><strong>' + escapeHtml(pattern.name) + '</strong><span>' + escapeHtml(pattern.description || '') + '</span></div>' +
      '<div class="pattern-cycle-grid">' + (pattern.cycleDays || []).map(function (day) {
        var className = day.dayType === 'off' ? ' is-off' : (day.shiftType === 'short' ? ' is-short' : '');
        return '<article class="pattern-day' + className + '"><span>Day ' + escapeHtml(day.cycleDay) + '</span><strong>' + escapeHtml(day.shiftType || day.dayType) + '</strong><p>' + escapeHtml(patternDayLabel(day)) + '</p><small>' + escapeHtml(day.breakRule || 'No shift') + '</small></article>';
      }).join('') + '</div>';
  }

  function renderSelects() {
    var daySelect = $('#assignmentDay');
    var shiftSelect = $('#assignmentShift');
    var employeeSelect = $('#assignmentEmployee');
    days = orderedDays();
    daySelect.innerHTML = days.map(function (day) { return '<option value="' + day + '">' + day + '</option>'; }).join('');
    shiftSelect.innerHTML = state.shifts.length ? state.shifts.map(function (shift) {
      return '<option value="' + shift.id + '">' + escapeHtml(shiftLabel(shift)) + '</option>';
    }).join('') : '<option value="">Add a shift first</option>';
    employeeSelect.innerHTML = state.employees.length ? state.employees.map(function (employee) {
      return '<option value="' + employee.id + '">' + escapeHtml(employee.name + ' · ' + employee.role) + '</option>';
    }).join('') : '<option value="">Add a person first</option>';
  }

  function renderPills() {
    var employeeList = $('#employeeList');
    var shiftList = $('#shiftList');
    employeeList.innerHTML = state.employees.length ? state.employees.map(function (employee) {
      var exceptionText = employee.exceptions.length ? ' · exception: ' + employee.exceptions.join(', ') : '';
      return '<span class="schedule-pill"><strong>' + escapeHtml(employee.name) + '</strong><small>' + escapeHtml(employee.role + exceptionText) + '</small><button class="icon-button" type="button" data-remove-employee="' + employee.id + '" aria-label="Remove ' + escapeHtml(employee.name) + '">×</button></span>';
    }).join('') : '<div class="signal-empty-state"><strong>No people yet</strong><span>Add employees to start testing schedule logic.</span></div>';
    shiftList.innerHTML = state.shifts.length ? state.shifts.map(function (shift) {
      return '<span class="schedule-pill"><strong>' + escapeHtml(shift.name) + '</strong><small>' + displayTime(shift.start) + '–' + displayTime(shift.end) + ' · need ' + shift.minStaff + '</small><button class="icon-button" type="button" data-remove-shift="' + shift.id + '" aria-label="Remove ' + escapeHtml(shift.name) + '">×</button></span>';
    }).join('') : '<div class="signal-empty-state"><strong>No shifts yet</strong><span>Add shift blocks like Days, Evenings, or Nights.</span></div>';
  }

  function renderBoard() {
    var board = $('#scheduleBoard');
    board.innerHTML = days.map(function (day) {
      var items = state.assignments.filter(function (assignment) { return assignment.day === day; }).sort(assignmentSort);
      var cards = items.length ? items.map(function (assignment) {
        var employee = findEmployee(assignment.employeeId);
        var shift = findShift(assignment.shiftId);
        if (!employee || !shift) return '';
        return '<article class="assignment-card"><strong>' + escapeHtml(employee.name) + '</strong><span>' + escapeHtml(employee.role) + '</span><small>' + escapeHtml(shiftLabel(shift)) + '</small><button type="button" data-remove-assignment="' + assignment.id + '">Remove</button></article>';
      }).join('') : '<div class="day-empty">No one scheduled</div>';
      return '<section class="day-column"><h3>' + day.slice(0, 3) + '<span>' + items.length + ' assignment' + (items.length === 1 ? '' : 's') + '</span></h3>' + cards + '</section>';
    }).join('');
  }

  function employeeHours() {
    var totals = {};
    state.assignments.forEach(function (assignment) {
      var shift = findShift(assignment.shiftId);
      if (!shift) return;
      totals[assignment.employeeId] = (totals[assignment.employeeId] || 0) + shiftHours(shift);
    });
    return totals;
  }

  function coverageWarnings() {
    var warnings = [];
    state.shifts.forEach(function (shift) {
      days.forEach(function (day) {
        var count = state.assignments.filter(function (assignment) {
          return assignment.day === day && assignment.shiftId === shift.id;
        }).length;
        if (count < shift.minStaff) {
          warnings.push(day + ' ' + shift.name + ' is short ' + (shift.minStaff - count) + ' person' + ((shift.minStaff - count) === 1 ? '' : 's') + '.');
        }
      });
    });
    coverageEngineRows().forEach(function (row) {
      if (row.status === 'short') warnings.push(row.day + ' ' + (row.requirement.role || 'Coverage') + ' is below minimum by ' + row.openMinimum + ' for ' + row.requirement.start + '-' + row.requirement.end + '.');
      if (row.status === 'over') warnings.push(row.day + ' ' + (row.requirement.role || 'Coverage') + ' is above maximum by ' + row.surplus + ' for ' + row.requirement.start + '-' + row.requirement.end + '.');
    });
    var totals = employeeHours();
    Object.keys(totals).forEach(function (employeeId) {
      var employee = findEmployee(employeeId);
      if (employee && totals[employeeId] > state.rules.maxHoursPerWeek) {
        warnings.push(employee.name + ' is over ' + state.rules.maxHoursPerWeek + ' hours/week at ' + totals[employeeId].toFixed(1) + ' hours.');
      }
    });
    state.employees.forEach(function (employee) {
      var employeeAssignments = state.assignments.filter(function (assignment) {
        return assignment.employeeId === employee.id;
      }).sort(assignmentSort);
      for (var i = 1; i < employeeAssignments.length; i += 1) {
        var previous = employeeAssignments[i - 1];
        var current = employeeAssignments[i];
        var previousShift = findShift(previous.shiftId);
        var currentShift = findShift(current.shiftId);
        if (!previousShift || !currentShift) continue;
        var previousDayIndex = days.indexOf(previous.day);
        var currentDayIndex = days.indexOf(current.day);
        var previousEnd = previousDayIndex * 24 + minutesFromTime(previousShift.end) / 60;
        var previousStart = previousDayIndex * 24 + minutesFromTime(previousShift.start) / 60;
        if (previousEnd <= previousStart) previousEnd += 24;
        var currentStart = currentDayIndex * 24 + minutesFromTime(currentShift.start) / 60;
        var gap = currentStart - previousEnd;
        if (gap >= 0 && gap < state.rules.minGapHours) {
          warnings.push(employee.name + ' has only ' + gap.toFixed(1) + ' hours between ' + previous.day + ' ' + previousShift.name + ' and ' + current.day + ' ' + currentShift.name + '.');
        }
      }
    });
    state.employees.forEach(function (employee) {
      if (!employee.mandateEligible || employee.exceptions.length) {
        warnings.push(employee.name + ' has mandate exception data in the employee model. Future mandation rules must explain whether they are skipped, held in place, or moved in rotation.');
      }
    });
    return warnings;
  }

  function renderSummary() {
    var summary = $('#coverageSummary');
    var totals = employeeHours();
    var peopleScheduled = new Set(state.assignments.map(function (item) { return item.employeeId; })).size;
    var busiest = days.reduce(function (best, day) {
      var count = state.assignments.filter(function (item) { return item.day === day; }).length;
      return count > best.count ? { day: day, count: count } : best;
    }, { day: 'None', count: 0 });
    var totalHours = Object.keys(totals).reduce(function (sum, key) { return sum + totals[key]; }, 0);
    var warnings = coverageWarnings();
    summary.innerHTML = '' +
      '<div class="coverage-card"><span>Total Assignments</span><strong>' + state.assignments.length + '</strong><p>Scheduled shift blocks this week.</p></div>' +
      '<div class="coverage-card"><span>Total Hours</span><strong>' + totalHours.toFixed(1) + '</strong><p>Estimated scheduled staff hours.</p></div>' +
      '<div class="coverage-card"><span>People Scheduled</span><strong>' + peopleScheduled + '/' + state.employees.length + '</strong><p>Employees with at least one assignment.</p></div>' +
      '<div class="coverage-card"><span>Rule Warnings</span><strong>' + warnings.length + '</strong><p>Coverage, overtime, rest-gap, and model warnings.</p></div>' +
      '<div class="coverage-card"><span>Busiest Day</span><strong>' + busiest.day + '</strong><p>' + busiest.count + ' assignment' + (busiest.count === 1 ? '' : 's') + ' scheduled.</p></div>' +
      '<div class="coverage-card"><span>Storage</span><strong>Local</strong><p>Temporary only. PHP/database storage is planned later.</p></div>';
    var visibleWarnings = warnings.slice(0, 8);
    $('#ruleWarnings').innerHTML = warnings.length ? visibleWarnings.map(function (warning) {
      return '<div class="warning-item">' + escapeHtml(warning) + '</div>';
    }).join('') + (warnings.length > visibleWarnings.length ? '<div class="warning-item">+' + (warnings.length - visibleWarnings.length) + ' more warnings hidden from the live preview. Use the text export for the full list.</div>' : '') : '<div class="success-item">No rule warnings with the current sandbox rules.</div>';
  }

  function textOutput() {
    var lines = [];
    var warnings = coverageWarnings();
    var totals = employeeHours();
    lines.push('SIGNAL SCHEDULE — GOAL MODE FOUNDATION');
    lines.push('Version: v0.19.0');
    lines.push('');
    lines.push('Core model: Agency Profile + Employee Profiles + Patterns + Events + Benefits + Rules + Coverage + Fairness + Explainability + Mandation + Bidding');
    lines.push('');
    lines.push('Rules:');
    lines.push('- Max hours/week: ' + state.rules.maxHoursPerWeek);
    lines.push('- Minimum gap between shifts: ' + state.rules.minGapHours + ' hours');
    lines.push('- Month planning start: ' + (state.rules.monthStart || defaultMonthValue()));
    lines.push('');
    lines.push('Engine Objects:');
    lines.push('- Rule profiles: ' + state.ruleProfiles.length);
    lines.push('- Patterns: ' + state.patterns.length);
    lines.push('- Employee pattern links: ' + state.employeePatterns.length);
    lines.push('- Schedule events: ' + state.scheduleEvents.length);
    lines.push('- Event type definitions: ' + ((state.eventTypeDefinitions || []).length));
    lines.push('- Benefit ledger entries: ' + state.benefitLedger.length);
    lines.push('- Rule engine principles: ' + ((state.ruleEnginePrinciples || []).length));
    lines.push('- Rule evaluation examples: ' + ((state.ruleEvaluationExamples || []).length));
    lines.push('- Agency rule templates: ' + ((state.agencyRuleTemplates || []).length));
    lines.push('- Coverage requirements: ' + coverageRequirementList().length);
    lines.push('- Coverage engine rows this week: ' + coverageEngineRows().length);
    lines.push('- Schedule view previews: ' + ((state.scheduleViews || []).length));
    lines.push('- Fairness metrics: ' + ((state.fairnessMetrics || []).length));
    lines.push('- Explanation examples: ' + ((state.explanationExamples || []).length));
    lines.push('- Seniority ledger entries: ' + ((state.seniorityLedger || []).length));
    lines.push('- Mandation rules: ' + ((state.mandationRules || []).length));
    lines.push('- Bid / opportunity rules: ' + ((state.bidRules || []).length));
    lines.push('- Bid rounds: ' + ((state.bidRounds || []).length));
    lines.push('- Voluntary OT requests: ' + ((state.voluntaryOvertimeRequests || []).length));
    lines.push('- Posted OT opportunities: ' + ((state.postedOvertimeOpportunities || []).length));
    lines.push('- Mandate rotation entries: ' + ((state.mandateRotation || []).length));
    lines.push('- Operational traits: ' + ((state.operationalTraits || []).length));
    lines.push('- Analytics foundation objects: ' + ((state.analyticsMetrics || []).length + (state.analyticsReports || []).length + (state.analyticsTrendSignals || []).length + (state.analyticsForecasts || []).length));
    lines.push('- Notification triggers: ' + ((state.notificationTriggers || []).length));
    lines.push('- Notification channels: ' + ((state.notificationChannels || []).length));
    lines.push('- Notification subscriptions: ' + ((state.notificationSubscriptions || []).length));
    lines.push('- Goal Mode objects: ' + ((state.goalModeProfiles || []).length + (state.goalModeTradeoffs || []).length + (state.goalModeRecommendations || []).length + (state.goalModeAuditExamples || []).length));
    lines.push('- Notification audit examples: ' + ((state.notificationAuditExamples || []).length));
    lines.push('');
    lines.push('Pattern Templates:');
    state.patterns.forEach(function (pattern) {
      var shortDays = (pattern.cycleDays || []).filter(function (day) { return day.shiftType === 'short'; }).length;
      lines.push('- ' + pattern.name + ': ' + pattern.cycleLength + ' day cycle, ' + shortDays + ' short day' + (shortDays === 1 ? '' : 's') + ', base shift ' + (pattern.baseShift || 'custom'));
    });

    lines.push('');
    lines.push('Event Samples:');
    if (state.scheduleEvents.length) {
      state.scheduleEvents.forEach(function (event) {
        var employee = findEmployee(event.employeeId);
        lines.push('- ' + event.type + ' / ' + event.status + ': ' + (employee ? employee.name : 'Unassigned') + ' from ' + eventDateLabel(event.start) + ' to ' + eventDateLabel(event.end) + ' — ' + (event.coverageImpact || 'coverage impact planned'));
      });
    } else {
      lines.push('- No event samples loaded');
    }

    lines.push('');
    lines.push('Employees:');
    if (state.employees.length) {
      state.employees.forEach(function (employee) {
        var mandate = employee.mandateEligible ? 'mandate eligible' : 'not mandate eligible';
        lines.push('- ' + employee.name + ' (' + employee.position + ' / ' + (employee.shiftGroup || 'No group') + ') — ' + (totals[employee.id] || 0).toFixed(1) + ' hrs, ' + mandate + ', qualifications: ' + (employee.qualifications.length ? employee.qualifications.join(', ') : 'none'));
      });
    } else {
      lines.push('- None added');
    }
    lines.push('');
    lines.push('Weekly Schedule:');
    days.forEach(function (day) {
      lines.push(day + ':');
      var items = state.assignments.filter(function (assignment) { return assignment.day === day; }).sort(assignmentSort);
      if (!items.length) {
        lines.push('  - No assignments');
        return;
      }
      items.forEach(function (assignment) {
        var employee = findEmployee(assignment.employeeId);
        var shift = findShift(assignment.shiftId);
        if (!employee || !shift) return;
        lines.push('  - ' + shift.name + ' (' + displayTime(shift.start) + '-' + displayTime(shift.end) + '): ' + employee.name + ' [' + employee.role + ']');
      });
    });
    lines.push('');
    lines.push('Warnings / Explanations:');
    if (warnings.length) warnings.forEach(function (warning) { lines.push('- ' + warning); });
    else lines.push('- None');
    lines.push('');
    lines.push('v0.19.0 Notes:');
    lines.push('- Adds Architecture Complete audit after v0.19.0.');
    lines.push('- Removes dashboard-style foundation preview panels for analytics, notifications, and goal mode.');
    lines.push('- Confirms engines, entities, rules, explanations, audit records, notifications, goals, and agency profiles are ready to map into database tables.');
    lines.push('- Recommendations must explain winning goals, losing goals, source facts, and human overrides.');
    lines.push('- This is still local mock data, not a backend.');
    lines.push('- Events, rules, benefit entries, coverage rows, views, templates, fairness metrics, and explanations are sample objects, not editable database records or approval workflows yet.');
    lines.push('- Pattern templates and cycle days are still sample objects, not editable database records yet.');
    lines.push('- PHP should wait until agency profile, people, patterns, events, rules, benefits, mandates, fairness, explainability, and coverage are mapped.');
    lines.push('- Future schedules should be generated from agency settings + pattern + start date + events + overrides, then displayed through audience-specific views and explanations.');
    return lines.join('\n');
  }

  function renderOutput() { $('#scheduleOutput').value = textOutput(); }

  function renderMonthPreview() {
    var target = state.rules.monthStart || defaultMonthValue();
    var parts = target.split('-');
    var year = Number(parts[0]);
    var month = Number(parts[1]) - 1;
    var first = new Date(year, month, 1);
    var last = new Date(year, month + 1, 0);
    var cells = [];
    for (var date = 1; date <= last.getDate(); date += 1) {
      var current = new Date(year, month, date);
      var dayName = baseDays[current.getDay()];
      var count = state.assignments.filter(function (assignment) { return assignment.day === dayName; }).length;
      cells.push('<div class="month-cell"><strong>' + date + '</strong><span>' + dayName.slice(0, 3) + '</span><small>' + count + ' weekly assignment' + (count === 1 ? '' : 's') + '</small></div>');
    }
    $('#monthPreview').innerHTML = '<div class="month-heading">' + first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) + '</div><div class="month-grid">' + cells.join('') + '</div>';
  }

  function safeRender(label, callback) {
    try {
      if (typeof callback === 'string') callback = window.SignalScheduleRenderRegistry && window.SignalScheduleRenderRegistry[callback];
      if (typeof callback !== 'function') {
        if (window.console && window.console.warn) window.console.warn('Signal Schedule missing renderer: ' + label);
        return;
      }
      callback();
    } catch (error) {
      if (window.console && window.console.error) window.console.error('Signal Schedule render error in ' + label + ':', error);
      var status = $('#scheduleSaveStatus');
      if (status) status.textContent = 'Preview warning: ' + label + ' failed';
    }
  }

  function bindIfFound(selector, eventName, callback) {
    var element = $(selector);
    if (element) element.addEventListener(eventName, callback);
  }

  window.SignalScheduleRenderRegistry = {
    renderWeekLabel: renderWeekLabel,
    syncRuleInputs: syncRuleInputs,
    renderEngineBlueprint: renderEngineBlueprint,
    renderAgencyProfile: renderAgencyProfile,
    renderEmployeeProfiles: renderEmployeeProfiles,
    renderPatternFoundation: renderPatternFoundation,
    renderPatternCyclePreview: renderPatternCyclePreview,
    renderEventFoundation: renderEventFoundation,
    renderEventBehaviorPreview: renderEventBehaviorPreview,
    renderBenefitLedgerFoundation: renderBenefitLedgerFoundation,
    renderBenefitRulePreview: renderBenefitRulePreview,
    renderRuleEnginePreview: renderRuleEnginePreview,
    renderRuleEvaluationPreview: renderRuleEvaluationPreview,
    renderAgencyTemplatePreview: renderAgencyTemplatePreview,
    renderCoverageRequirementPreview: renderCoverageRequirementPreview,
    renderCoverageEnginePreview: renderCoverageEnginePreview,
    renderCoverageSlotPreview: renderCoverageSlotPreview,
    renderScheduleViewsPreview: renderScheduleViewsPreview,
    renderSystemInspectorPreview: renderSystemInspectorPreview,
    renderFairnessEnginePreview: renderFairnessEnginePreview,
    renderFairnessSnapshotPreview: renderFairnessSnapshotPreview,
    renderSeniorityLedgerPreview: renderSeniorityLedgerPreview,
    renderExplainabilityPreview: renderExplainabilityPreview,
    renderExplanationLevelsPreview: renderExplanationLevelsPreview,
    renderMandationFoundationPreview: renderMandationFoundationPreview,
    renderMandateRotationPreview: renderMandateRotationPreview,
    renderOperationalTraitPreview: renderOperationalTraitPreview,
    renderBiddingFoundationPreview: renderBiddingFoundationPreview,
    renderVoluntaryOvertimePreview: renderVoluntaryOvertimePreview,
    renderPostedOvertimePreview: renderPostedOvertimePreview,
    renderBidAwardPreview: renderBidAwardPreview,
    renderDataModelPreview: renderDataModelPreview,
    renderSelects: renderSelects,
    renderPills: renderPills,
    renderBoard: renderBoard,
    renderSummary: renderSummary,
    renderOutput: renderOutput,
    renderMonthPreview: renderMonthPreview
  };

  function render() {
    safeRender('week label', 'renderWeekLabel');
    safeRender('rule inputs', 'syncRuleInputs');
    safeRender('engine blueprint', 'renderEngineBlueprint');
    safeRender('agency profile', 'renderAgencyProfile');
    safeRender('employee profiles', 'renderEmployeeProfiles');
    safeRender('pattern foundation', 'renderPatternFoundation');
    safeRender('pattern cycle preview', 'renderPatternCyclePreview');
    safeRender('event foundation', 'renderEventFoundation');
    safeRender('event behavior preview', 'renderEventBehaviorPreview');
    safeRender('benefit ledger', 'renderBenefitLedgerFoundation');
    safeRender('benefit rules', 'renderBenefitRulePreview');
    safeRender('rule engine', 'renderRuleEnginePreview');
    safeRender('rule evaluation', 'renderRuleEvaluationPreview');
    safeRender('agency templates', 'renderAgencyTemplatePreview');
    safeRender('coverage requirements', 'renderCoverageRequirementPreview');
    safeRender('coverage engine', 'renderCoverageEnginePreview');
    safeRender('coverage slots', 'renderCoverageSlotPreview');
    safeRender('schedule views', 'renderScheduleViewsPreview');
    safeRender('system inspector', 'renderSystemInspectorPreview');
    safeRender('fairness engine', 'renderFairnessEnginePreview');
    safeRender('fairness snapshot', 'renderFairnessSnapshotPreview');
    safeRender('seniority ledger', 'renderSeniorityLedgerPreview');
    safeRender('explainability', 'renderExplainabilityPreview');
    safeRender('explanation levels', 'renderExplanationLevelsPreview');
    safeRender('mandation foundation', 'renderMandationFoundationPreview');
    safeRender('mandate rotation', 'renderMandateRotationPreview');
    safeRender('operational traits', 'renderOperationalTraitPreview');
    safeRender('bidding foundation', 'renderBiddingFoundationPreview');
    safeRender('voluntary overtime', 'renderVoluntaryOvertimePreview');
    safeRender('posted overtime', 'renderPostedOvertimePreview');
    safeRender('bid awards', 'renderBidAwardPreview');
    safeRender('data model', 'renderDataModelPreview');
    safeRender('selects', 'renderSelects');
    safeRender('pills', 'renderPills');
    safeRender('board', 'renderBoard');
    safeRender('summary', 'renderSummary');
    safeRender('output', 'renderOutput');
    safeRender('month preview', 'renderMonthPreview');
  }

  function addEmployee(name, role) {
    var clean = name.trim();
    if (!clean) return showToast('Enter an employee name first.', 'error');
    state.employees.push({ id: id('emp'), name: clean, employeeCode: '', role: role || 'Dispatcher', position: role || 'Dispatcher', status: 'active', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: '', assignedPattern: '', hireDate: '', seniorityDate: '', overtimeEligible: true, mandateEligible: true, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: [], qualifications: [], benefitBalances: { vacation: 0, sick: 0, personal: 0, comp: 0, holiday: 0 }, seniorityAdjustments: [] });
    save(); render(); showToast('Person added.', 'success');
  }

  function addShift(name, start, end, minStaff) {
    var clean = name.trim();
    if (!clean) return showToast('Enter a shift name first.', 'error');
    state.shifts.push({ id: id('shift'), name: clean, start: start || '07:00', end: end || '15:00', minStaff: Number(minStaff || 1) });
    save(); render(); showToast('Shift added.', 'success');
  }

  function addAssignment(day, shiftId, employeeId) {
    if (!shiftId || !employeeId) return showToast('Add at least one person and one shift first.', 'error');
    state.assignments.push({ id: id('asg'), day: day, shiftId: shiftId, employeeId: employeeId });
    save(); render(); showToast('Assignment added.', 'success');
  }

  function saveRules() {
    state.rules.maxHoursPerWeek = Number($('#maxHoursPerWeek').value || 40);
    state.rules.minGapHours = Number($('#minGapHours').value || 8);
    state.rules.monthStart = $('#monthStart').value || defaultMonthValue();
    save(); render(); showToast('Rules saved.', 'success');
  }

  function removeEmployee(employeeId) {
    state.employees = state.employees.filter(function (item) { return item.id !== employeeId; });
    state.assignments = state.assignments.filter(function (item) { return item.employeeId !== employeeId; });
    save(); render();
  }

  function removeShift(shiftId) {
    state.shifts = state.shifts.filter(function (item) { return item.id !== shiftId; });
    state.assignments = state.assignments.filter(function (item) { return item.shiftId !== shiftId; });
    save(); render();
  }

  function removeAssignment(assignmentId) {
    state.assignments = state.assignments.filter(function (item) { return item.id !== assignmentId; });
    save(); render();
  }

  function buildSampleState() {
    return {
      employees: [
        { id: 'emp-alex', name: 'Alex Rivera', employeeCode: 'E-1001', role: 'Dispatcher', position: 'Dispatcher', status: 'active', hireDate: '2021-03-15', seniorityDate: '2021-03-15', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'B Nights', assignedPattern: 'B Nights Sample', overtimeEligible: true, mandateEligible: true, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: [], qualifications: ['Calltaking', 'Radio'], benefitBalances: { vacation: 84, sick: 48, personal: 24, comp: 6, holiday: 12 }, seniorityAdjustments: [] },
        { id: 'emp-jordan', name: 'Jordan Smith', employeeCode: 'E-1002', role: 'Supervisor', position: 'Shift Supervisor', status: 'active', hireDate: '2017-08-01', seniorityDate: '2017-08-01', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'A Days', assignedPattern: '2-2-3 Days Sample', overtimeEligible: true, mandateEligible: true, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: [], qualifications: ['Radio', 'Supervisor', 'Trainer'], benefitBalances: { vacation: 120, sick: 80, personal: 16, comp: 0, holiday: 24 }, seniorityAdjustments: [] },
        { id: 'emp-taylor', name: 'Taylor Morgan', employeeCode: 'E-1003', role: 'Dispatcher', position: 'Dispatcher', status: 'active', hireDate: '2020-02-10', seniorityDate: '2020-02-10', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'B Nights', assignedPattern: 'B Nights Sample', overtimeEligible: true, mandateEligible: false, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: ['FMLA'], qualifications: ['Calltaking', 'Radio'], benefitBalances: { vacation: 40, sick: 96, personal: 8, comp: 0, holiday: 8 }, seniorityAdjustments: [{ type: 'Unpaid leave', reason: 'Example non-accrual leave period', start: '2025-04-01', end: '2025-05-31', effect: '-61 seniority days' }] },
        { id: 'emp-casey', name: 'Casey Lee', employeeCode: 'PT-204', role: 'Part-Time', position: 'Dispatcher', status: 'part-time', hireDate: '2024-11-01', seniorityDate: '2024-11-01', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'Float', assignedPattern: 'No fixed pattern', overtimeEligible: false, mandateEligible: false, tradeEligible: true, shiftBidEligible: false, vacationBidEligible: false, benefitEligible: false, exceptions: ['Part-time', 'No mandation'], qualifications: ['Calltaking'], benefitBalances: { vacation: 12, sick: 16, personal: 0, comp: 0, holiday: 0 }, seniorityAdjustments: [] }
      ],
      shifts: [
        { id: 'shift-days', name: 'Days', start: '05:00', end: '17:00', minStaff: 2 },
        { id: 'shift-nights', name: 'Nights', start: '17:00', end: '05:00', minStaff: 1 },
        { id: 'shift-ot', name: 'OT Holdover', start: '13:00', end: '17:00', minStaff: 1 }
      ],
      assignments: [
        { id: 'asg-1', day: 'Monday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-2', day: 'Monday', shiftId: 'shift-days', employeeId: 'emp-jordan' },
        { id: 'asg-3', day: 'Monday', shiftId: 'shift-nights', employeeId: 'emp-taylor' },
        { id: 'asg-4', day: 'Tuesday', shiftId: 'shift-nights', employeeId: 'emp-casey' },
        { id: 'asg-5', day: 'Wednesday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-6', day: 'Thursday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-7', day: 'Friday', shiftId: 'shift-days', employeeId: 'emp-alex' }
      ],
      ruleProfiles: defaultRuleProfiles(),
      patterns: defaultPatterns(),
      employeePatterns: [
        { employeeId: 'emp-alex', patternId: 'pattern-b-nights', startDate: '2026-06-01' },
        { employeeId: 'emp-jordan', patternId: 'pattern-2-2-3-days', startDate: '2026-06-01' }
      ],
      eventTypeDefinitions: defaultEventTypeDefinitions(),
      scheduleEvents: [
        { id: 'evt-vacation-sample', employeeId: 'emp-taylor', type: 'Vacation', category: 'Time Off', status: 'approved', start: '2026-06-18T18:00', end: '2026-06-19T06:00', paidMinutes: 720, coverageImpact: 'Removes Taylor from expected B Nights dispatcher coverage.', benefitImpact: 'Consumes 720 vacation minutes after approval.', behaviors: ['removes from coverage', 'uses benefit time', 'requires approval'], reason: 'Approved vacation sample', source: 'mock approval' },
        { id: 'evt-mandate-sample', employeeId: 'emp-alex', type: 'Mandation', category: 'Forced OT', status: 'planned', start: '2026-06-20T18:00', end: '2026-06-21T06:00', paidMinutes: 720, coverageImpact: 'Adds Alex to night coverage outside expected pattern.', benefitImpact: 'No benefit use; future mandate rules track count and rotation.', behaviors: ['adds to coverage', 'changes pay', 'requires audit trail'], reason: 'Coverage shortage sample', source: 'mock mandate list' },
        { id: 'evt-training-sample', employeeId: 'emp-jordan', type: 'Training', category: 'Assignment Change', status: 'scheduled', start: '2026-06-22T09:00', end: '2026-06-22T13:00', paidMinutes: 240, coverageImpact: 'Changes Jordan from normal coverage to training assignment during event window.', benefitImpact: 'No benefit use.', behaviors: ['changes role', 'may remove from coverage', 'requires audit trail'], reason: 'CTO refresher sample', source: 'mock training schedule' }
      ],
      benefitLedger: [
        { id: 'ben-1', employeeId: 'emp-alex', benefitType: 'Sick', date: '2026-06-01', amountMinutes: 480, action: 'Monthly accrual', reason: 'Monthly sick accrual', source: 'mock accrual rule', balanceAfterMinutes: 3360 },
        { id: 'ben-2', employeeId: 'emp-taylor', benefitType: 'Vacation', date: '2026-06-18', amountMinutes: -720, action: 'Approved use', reason: 'Approved vacation event', source: 'evt-vacation-sample', relatedEventId: 'evt-vacation-sample', balanceAfterMinutes: 1680 },
        { id: 'ben-3', employeeId: 'emp-jordan', benefitType: 'Personal', date: '2026-01-01', amountMinutes: 1440, action: 'Annual bank', reason: 'Annual personal time bank', source: 'mock annual rule', balanceAfterMinutes: 2400 },
        { id: 'ben-4', employeeId: 'emp-alex', benefitType: 'Comp Time', date: '2026-06-21', amountMinutes: 120, action: 'Manual adjustment', reason: 'Example correction entry with audit reason', source: 'admin adjustment sample', balanceAfterMinutes: 480 }
      ],
      benefitRules: defaultBenefitRules(),
      ruleEnginePrinciples: defaultRuleEnginePrinciples(),
      ruleEvaluationExamples: defaultRuleEvaluationExamples(),
      agencyRuleTemplates: defaultAgencyRuleTemplates(),
      coverageRequirements: defaultCoverageRequirements(),
      scheduleViews: defaultScheduleViews(),
      systemInspectorNotes: defaultSystemInspectorNotes(),
      fairnessMetrics: defaultFairnessMetrics(),
      seniorityLedger: defaultSeniorityLedger(),
      explanationExamples: defaultExplanationExamples(),
      explanationLevels: defaultExplanationLevels(),
      mandationRules: defaultMandationRules(),
      mandateRotation: defaultMandateRotation(),
      operationalTraits: defaultOperationalTraits(),
      bidRules: defaultBidRules(),
      bidRounds: defaultBidRounds(),
      voluntaryOvertimeRequests: defaultVoluntaryOvertimeRequests(),
      postedOvertimeOpportunities: defaultPostedOvertimeOpportunities(),
      bidAwardExamples: defaultBidAwardExamples(),
      analyticsMetrics: defaultAnalyticsMetrics(),
      analyticsReports: defaultAnalyticsReports(),
      analyticsTrendSignals: defaultAnalyticsTrendSignals(),
      analyticsForecasts: defaultAnalyticsForecasts(),
      notificationTriggers: defaultNotificationTriggers(),
      notificationChannels: defaultNotificationChannels(),
      notificationSubscriptions: defaultNotificationSubscriptions(),
      notificationAuditExamples: defaultNotificationAuditExamples(),
      goalModeProfiles: defaultGoalModeProfiles(),
      goalModeTradeoffs: defaultGoalModeTradeoffs(),
      goalModeRecommendations: defaultGoalModeRecommendations(),
      goalModeAuditExamples: defaultGoalModeAuditExamples(),
      agencyProfile: defaultAgencyProfile(),
      rules: { maxHoursPerWeek: 40, minGapHours: 8, monthStart: defaultMonthValue() },
      selectedEmployeeId: 'emp-alex'
    };
  }

  function loadSample() {
    state = normalizeState(buildSampleState());
    save(); render(); showToast('Core engine sample data loaded.', 'success');
  }

  function bindEvents() {
    bindIfFound('#employeeForm', 'submit', function (event) {
      event.preventDefault();
      addEmployee($('#employeeName').value, $('#employeeRole').value);
      $('#employeeName').value = '';
      $('#employeeName').focus();
    });
    bindIfFound('#shiftForm', 'submit', function (event) {
      event.preventDefault();
      addShift($('#shiftName').value, $('#shiftStart').value, $('#shiftEnd').value, $('#shiftMinStaff').value);
      $('#shiftName').value = '';
      $('#shiftMinStaff').value = '1';
      $('#shiftName').focus();
    });
    bindIfFound('#ruleForm', 'submit', function (event) { event.preventDefault(); saveRules(); });
    bindIfFound('#assignmentForm', 'submit', function (event) {
      event.preventDefault();
      addAssignment($('#assignmentDay').value, $('#assignmentShift').value, $('#assignmentEmployee').value);
    });
    document.addEventListener('click', function (event) {
      var target = event.target;
      var employeeId = target && target.getAttribute ? target.getAttribute('data-remove-employee') : '';
      var shiftId = target && target.getAttribute ? target.getAttribute('data-remove-shift') : '';
      var assignmentId = target && target.getAttribute ? target.getAttribute('data-remove-assignment') : '';
      var selectedButton = target && target.closest ? target.closest('[data-select-employee]') : null;
      var selectEmployeeId = selectedButton ? selectedButton.getAttribute('data-select-employee') : '';
      if (employeeId) removeEmployee(employeeId);
      if (shiftId) removeShift(shiftId);
      if (assignmentId) removeAssignment(assignmentId);
      if (selectEmployeeId) { state.selectedEmployeeId = selectEmployeeId; save(); render(); }
    });
    bindIfFound('#sampleDataBtn', 'click', loadSample);
    bindIfFound('#clearDataBtn', 'click', function () {
      state = normalizeState({ employees: [], shifts: [], assignments: [], rules: state.rules, agencyProfile: state.agencyProfile, selectedEmployeeId: null, sampleCleared: true });
      save(); render(); showToast('Schedule cleared.', 'info');
    });
    bindIfFound('#printBtn', 'click', function () { window.print(); });
    bindIfFound('#copyOutputBtn', 'click', function () {
      var output = $('#scheduleOutput');
      if (output) output.select();
      document.execCommand('copy');
      showToast('Text output copied.', 'success');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    load(); ensureFoundationDefaults(); bindEvents(); render();
  });
})();
