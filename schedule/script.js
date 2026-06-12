/*
Signal Labs Tool File: schedule/script.js
Version: v0.8.2
Purpose: Rule Engine Foundation sandbox with stabilized sample data, event-impact labels, and warning display
*/
(function () {
  var STORAGE_KEY = 'signalSchedule.v0.8.2';
  var OLD_STORAGE_KEYS = ['signalSchedule.v0.8.1', 'signalSchedule.v0.8.0', 'signalSchedule.v0.7.0', 'signalSchedule.v0.6.0', 'signalSchedule.v0.5.0', 'signalSchedule.v0.4.0', 'signalSchedule.v0.3.0', 'signalSchedule.v0.2.1', 'signalSchedule.v0.2.0', 'signalSchedule.v0.1.4', 'signalSchedule.v0.1.1', 'signalSchedule.v0.1.0'];
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
    return [{ id: 'cov-days', label: 'Day coverage', start: '05:00', end: '17:00', minimum: 2, role: 'Any' },
      { id: 'cov-nights', label: 'Night coverage', start: '17:00', end: '05:00', minimum: 1, role: 'Any' }];
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
      if (raw) state = normalizeState(JSON.parse(raw));
      else state = normalizeState(state);
      if (!state.sampleCleared && !state.employees.length && !state.shifts.length && !state.assignments.length) {
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
    if (label) label.textContent = 'v0.8.2 Rules';
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
      ['Coverage', state.coverageRequirements.length, 'Requirements compare need vs. scheduled staffing.']
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
      '<p><b>Rule impact:</b> ' + escapeHtml(mandateNote) + '</p>';
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
      return '<article class="rule-engine-item">' +
        '<span>' + escapeHtml(item.name || 'Rule principle') + '</span>' +
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
      return '<article class="rule-evaluation-item">' +
        '<span>' + escapeHtml(item.ruleType || 'Rule') + ' · ' + escapeHtml(item.priority || 'priority not set') + '</span>' +
        '<strong>Input</strong>' +
        '<p>' + escapeHtml(item.input || '') + '</p>' +
        '<strong>Outcome</strong>' +
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
      return '<article class="agency-template-item">' +
        '<span>Editable template</span>' +
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
      ['Benefit Ledger', benefitSample.benefitType + ' ' + benefitSample.amount, benefitSample.reason]
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
    lines.push('SIGNAL SCHEDULE — CORE ENGINE BLUEPRINT');
    lines.push('Version: v0.8.2');
    lines.push('');
    lines.push('Core model: Agency Profile + Employee Profiles + Pattern Templates + Events + Rules + Coverage + Explanations');
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
    lines.push('- Coverage requirements: ' + state.coverageRequirements.length);
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
    lines.push('v0.8 Notes:');
    lines.push('- This is still local mock data, not a backend.');
    lines.push('- Events, rules, benefit entries, and templates are sample objects, not editable database records or approval workflows yet.');
    lines.push('- Pattern templates and cycle days are still sample objects, not editable database records yet.');
    lines.push('- PHP should wait until agency profile, people, patterns, events, rules, benefits, mandates, and coverage are mapped.');
    lines.push('- Future schedules should be generated from agency settings + pattern + start date + events + overrides.');
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

  function render() {
    renderWeekLabel();
    syncRuleInputs();
    renderEngineBlueprint();
    renderAgencyProfile();
    renderEmployeeProfiles();
    renderPatternFoundation();
    renderPatternCyclePreview();
    renderEventFoundation();
    renderEventBehaviorPreview();
    renderBenefitLedgerFoundation();
    renderBenefitRulePreview();
    renderRuleEnginePreview();
    renderRuleEvaluationPreview();
    renderAgencyTemplatePreview();
    renderCoverageRequirementPreview();
    renderDataModelPreview();
    renderSelects();
    renderPills();
    renderBoard();
    renderSummary();
    renderOutput();
    renderMonthPreview();
  }

  function addEmployee(name, role) {
    var clean = name.trim();
    if (!clean) return showToast('Enter an employee name first.', 'error');
    state.employees.push({ id: id('emp'), name: clean, employeeCode: '', role: role || 'Dispatcher', position: role || 'Dispatcher', status: 'active', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: '', assignedPattern: '', hireDate: '', seniorityDate: '', overtimeEligible: true, mandateEligible: true, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: [], qualifications: [], benefitBalances: { vacation: 0, sick: 0, personal: 0, comp: 0, holiday: 0 } });
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
        { id: 'emp-alex', name: 'Alex Rivera', employeeCode: 'E-1001', role: 'Dispatcher', position: 'Dispatcher', status: 'active', hireDate: '2021-03-15', seniorityDate: '2021-03-15', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'B Nights', assignedPattern: 'B Nights Sample', overtimeEligible: true, mandateEligible: true, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: [], qualifications: ['Calltaking', 'Radio'], benefitBalances: { vacation: 84, sick: 48, personal: 24, comp: 6, holiday: 12 } },
        { id: 'emp-jordan', name: 'Jordan Smith', employeeCode: 'E-1002', role: 'Supervisor', position: 'Shift Supervisor', status: 'active', hireDate: '2017-08-01', seniorityDate: '2017-08-01', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'A Days', assignedPattern: '2-2-3 Days Sample', overtimeEligible: true, mandateEligible: true, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: [], qualifications: ['Radio', 'Supervisor', 'Trainer'], benefitBalances: { vacation: 120, sick: 80, personal: 16, comp: 0, holiday: 24 } },
        { id: 'emp-taylor', name: 'Taylor Morgan', employeeCode: 'E-1003', role: 'Dispatcher', position: 'Dispatcher', status: 'active', hireDate: '2020-02-10', seniorityDate: '2020-02-10', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'B Nights', assignedPattern: 'B Nights Sample', overtimeEligible: true, mandateEligible: false, tradeEligible: true, shiftBidEligible: true, vacationBidEligible: true, benefitEligible: true, exceptions: ['FMLA'], qualifications: ['Calltaking', 'Radio'], benefitBalances: { vacation: 40, sick: 96, personal: 8, comp: 0, holiday: 8 } },
        { id: 'emp-casey', name: 'Casey Lee', employeeCode: 'PT-204', role: 'Part-Time', position: 'Dispatcher', status: 'part-time', hireDate: '2024-11-01', seniorityDate: '2024-11-01', department: 'Communications', division: 'Operations', location: 'Main Center', shiftGroup: 'Float', assignedPattern: 'No fixed pattern', overtimeEligible: false, mandateEligible: false, tradeEligible: true, shiftBidEligible: false, vacationBidEligible: false, benefitEligible: false, exceptions: ['Part-time', 'No mandation'], qualifications: ['Calltaking'], benefitBalances: { vacation: 12, sick: 16, personal: 0, comp: 0, holiday: 0 } }
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
    $('#employeeForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addEmployee($('#employeeName').value, $('#employeeRole').value);
      $('#employeeName').value = '';
      $('#employeeName').focus();
    });
    $('#shiftForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addShift($('#shiftName').value, $('#shiftStart').value, $('#shiftEnd').value, $('#shiftMinStaff').value);
      $('#shiftName').value = '';
      $('#shiftMinStaff').value = '1';
      $('#shiftName').focus();
    });
    $('#ruleForm').addEventListener('submit', function (event) { event.preventDefault(); saveRules(); });
    $('#assignmentForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addAssignment($('#assignmentDay').value, $('#assignmentShift').value, $('#assignmentEmployee').value);
    });
    document.addEventListener('click', function (event) {
      var employeeId = event.target.getAttribute('data-remove-employee');
      var shiftId = event.target.getAttribute('data-remove-shift');
      var assignmentId = event.target.getAttribute('data-remove-assignment');
      var selectEmployeeId = event.target.closest('[data-select-employee]') ? event.target.closest('[data-select-employee]').getAttribute('data-select-employee') : '';
      if (employeeId) removeEmployee(employeeId);
      if (shiftId) removeShift(shiftId);
      if (assignmentId) removeAssignment(assignmentId);
      if (selectEmployeeId) { state.selectedEmployeeId = selectEmployeeId; save(); render(); }
    });
    $('#sampleDataBtn').addEventListener('click', loadSample);
    $('#clearDataBtn').addEventListener('click', function () {
      state = normalizeState({ employees: [], shifts: [], assignments: [], rules: state.rules, agencyProfile: state.agencyProfile, selectedEmployeeId: null, sampleCleared: true });
      save(); render(); showToast('Schedule cleared.', 'info');
    });
    $('#printBtn').addEventListener('click', function () { window.print(); });
    $('#copyOutputBtn').addEventListener('click', function () {
      $('#scheduleOutput').select();
      document.execCommand('copy');
      showToast('Text output copied.', 'success');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    load(); bindEvents(); render();
  });
})();
