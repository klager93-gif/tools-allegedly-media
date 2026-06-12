/*
Signal Labs Tool File: schedule/script.js
Version: v0.3.0
Purpose: Agency Profile Foundation sandbox for organization settings, vocabulary, shifts, coverage, and generated output
*/
(function () {
  var STORAGE_KEY = 'signalSchedule.v0.3.0';
  var OLD_STORAGE_KEYS = ['signalSchedule.v0.2.1', 'signalSchedule.v0.2.0', 'signalSchedule.v0.1.4', 'signalSchedule.v0.1.1', 'signalSchedule.v0.1.0'];
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
    coverageRequirements: [],
    agencyProfile: null
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
      industry: 'Public safety / shift operations',
      overtime: 'Warn after weekly max hours.',
      mandation: 'Track forced OT separately and skip employees with active exceptions.',
      benefits: 'Use ledger entries for accrual, use, corrections, and payouts.',
      coverage: 'Compare scheduled staffing against minimum requirements.',
      explanation: 'Every warning should be explainable.'
    }];
  }

  function defaultPatterns() {
    return [{
      id: 'pattern-2-2-3-days',
      name: '2-2-3 Days Sample',
      sequence: ['work', 'work', 'off', 'off', 'work', 'work', 'work'],
      shiftStart: '05:00',
      shiftEnd: '17:00',
      notes: 'Sample rotation shape only. Not a final agency policy.'
    }, {
      id: 'pattern-24-48',
      name: '24/48 Sample',
      sequence: ['work', 'off', 'off'],
      shiftStart: '07:00',
      shiftEnd: '07:00',
      notes: 'Common fire/EMS-style rotation example.'
    }];
  }

  function defaultCoverageRequirements() {
    return [{ id: 'cov-days', label: 'Day coverage', start: '05:00', end: '17:00', minimum: 2, role: 'Any' },
      { id: 'cov-nights', label: 'Night coverage', start: '17:00', end: '05:00', minimum: 1, role: 'Any' }];
  }

  function normalizeState(input) {
    var next = input || {};
    next.employees = Array.isArray(next.employees) ? next.employees : [];
    next.shifts = Array.isArray(next.shifts) ? next.shifts : [];
    next.assignments = Array.isArray(next.assignments) ? next.assignments : [];
    next.ruleProfiles = Array.isArray(next.ruleProfiles) && next.ruleProfiles.length ? next.ruleProfiles : defaultRuleProfiles();
    next.patterns = Array.isArray(next.patterns) && next.patterns.length ? next.patterns : defaultPatterns();
    next.employeePatterns = Array.isArray(next.employeePatterns) ? next.employeePatterns : [];
    next.scheduleEvents = Array.isArray(next.scheduleEvents) ? next.scheduleEvents : [];
    next.benefitLedger = Array.isArray(next.benefitLedger) ? next.benefitLedger : [];
    next.coverageRequirements = Array.isArray(next.coverageRequirements) && next.coverageRequirements.length ? next.coverageRequirements : defaultCoverageRequirements();
    next.agencyProfile = next.agencyProfile || defaultAgencyProfile();
    next.agencyProfile.shiftDefinitions = Array.isArray(next.agencyProfile.shiftDefinitions) ? next.agencyProfile.shiftDefinitions : defaultAgencyProfile().shiftDefinitions;
    next.agencyProfile.coverageRequirements = Array.isArray(next.agencyProfile.coverageRequirements) ? next.agencyProfile.coverageRequirements : defaultAgencyProfile().coverageRequirements;
    next.rules = next.rules || {};
    next.rules.maxHoursPerWeek = Number(next.rules.maxHoursPerWeek || 40);
    next.rules.minGapHours = Number(next.rules.minGapHours || 8);
    next.rules.monthStart = next.rules.monthStart || defaultMonthValue();
    next.employees = next.employees.map(function (employee) {
      return {
        id: employee.id || id('emp'),
        name: employee.name || 'Unnamed',
        role: employee.role || 'Dispatcher',
        status: employee.status || 'active',
        mandateEligible: employee.mandateEligible !== false,
        exceptions: Array.isArray(employee.exceptions) ? employee.exceptions : [],
        benefitBalances: employee.benefitBalances || { vacation: 0, sick: 0, personal: 0, comp: 0 }
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
    } catch (error) {
      state = normalizeState({ employees: [], shifts: [], assignments: [] });
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

  function shiftHours(shift) {
    var start = minutesFromTime(shift.start);
    var end = minutesFromTime(shift.end);
    if (end <= start) end += 24 * 60;
    return (end - start) / 60;
  }

  function shiftLabel(shift) {
    return shift.name + ' · ' + formatTime(shift.start) + '–' + formatTime(shift.end);
  }

  function assignmentSort(a, b) {
    var dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
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
    if (label) label.textContent = 'v0.3.0 Agency';
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
      ['People', state.employees.length, 'Employees remain separate from future login users.'],
      ['Rules', state.ruleProfiles.length, 'Agency policies explain overtime, mandation, coverage, benefits, and fairness.'],
      ['Patterns', state.patterns.length, 'Rotations generate expected work instead of storing every day forever.'],
      ['Events', state.scheduleEvents.length, 'Vacation, sick, OT, mandates, trades, training, and overrides become events.'],
      ['Benefits', state.benefitLedger.length, 'Balances should come from auditable ledger entries.'],
      ['Coverage', state.coverageRequirements.length, 'Requirements compare need vs. scheduled staffing.']
    ];
    target.innerHTML = items.map(function (item) {
      return '<article class="engine-step"><span>' + escapeHtml(item[0]) + '</span><strong>' + item[1] + '</strong><p>' + escapeHtml(item[2]) + '</p></article>';
    }).join('');
  }

  function listText(items) {
    return (items || []).map(function (item) { return escapeHtml(item); }).join(', ');
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
      ['Pattern Object', pattern.name, pattern.sequence.join(' / ') + ' · ' + pattern.shiftStart + '-' + pattern.shiftEnd],
      ['Schedule Event', eventSample.type + ' · ' + eventSample.status, eventSample.start + ' to ' + eventSample.end],
      ['Benefit Ledger', benefitSample.benefitType + ' ' + benefitSample.amount, benefitSample.reason]
    ];
    target.innerHTML = cards.map(function (card) {
      return '<article class="model-card"><span>' + escapeHtml(card[0]) + '</span><strong>' + escapeHtml(card[1]) + '</strong><p>' + escapeHtml(card[2]) + '</p></article>';
    }).join('');
  }

  function renderSelects() {
    var daySelect = $('#assignmentDay');
    var shiftSelect = $('#assignmentShift');
    var employeeSelect = $('#assignmentEmployee');
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
      return '<span class="schedule-pill"><strong>' + escapeHtml(shift.name) + '</strong><small>' + formatTime(shift.start) + '–' + formatTime(shift.end) + ' · need ' + shift.minStaff + '</small><button class="icon-button" type="button" data-remove-shift="' + shift.id + '" aria-label="Remove ' + escapeHtml(shift.name) + '">×</button></span>';
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
    $('#ruleWarnings').innerHTML = warnings.length ? warnings.map(function (warning) {
      return '<div class="warning-item">' + escapeHtml(warning) + '</div>';
    }).join('') : '<div class="success-item">No rule warnings with the current sandbox rules.</div>';
  }

  function textOutput() {
    var lines = [];
    var warnings = coverageWarnings();
    var totals = employeeHours();
    lines.push('SIGNAL SCHEDULE — CORE ENGINE BLUEPRINT');
    lines.push('Version: v0.3.0');
    lines.push('');
    lines.push('Core model: People + Rules + Patterns + Events + Coverage + Explanations');
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
    lines.push('- Benefit ledger entries: ' + state.benefitLedger.length);
    lines.push('- Coverage requirements: ' + state.coverageRequirements.length);
    lines.push('');
    lines.push('Employees:');
    if (state.employees.length) {
      state.employees.forEach(function (employee) {
        var mandate = employee.mandateEligible ? 'mandate eligible' : 'not mandate eligible';
        lines.push('- ' + employee.name + ' (' + employee.role + ') — ' + (totals[employee.id] || 0).toFixed(1) + ' hrs, ' + mandate);
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
        lines.push('  - ' + shift.name + ' (' + formatTime(shift.start) + '-' + formatTime(shift.end) + '): ' + employee.name + ' [' + employee.role + ']');
      });
    });
    lines.push('');
    lines.push('Warnings / Explanations:');
    if (warnings.length) warnings.forEach(function (warning) { lines.push('- ' + warning); });
    else lines.push('- None');
    lines.push('');
    lines.push('v0.3 Notes:');
    lines.push('- This is still local mock data, not a backend.');
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
      var dayName = days[(current.getDay() + 6) % 7];
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
    state.employees.push({ id: id('emp'), name: clean, role: role || 'Dispatcher', status: 'active', mandateEligible: true, exceptions: [], benefitBalances: { vacation: 0, sick: 0, personal: 0, comp: 0 } });
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

  function loadSample() {
    state = normalizeState({
      employees: [
        { id: 'emp-alex', name: 'Alex', role: 'Dispatcher', mandateEligible: true, exceptions: [], benefitBalances: { vacation: 84, sick: 48, personal: 24, comp: 6 } },
        { id: 'emp-jordan', name: 'Jordan', role: 'Supervisor', mandateEligible: true, exceptions: [], benefitBalances: { vacation: 120, sick: 80, personal: 16, comp: 0 } },
        { id: 'emp-taylor', name: 'Taylor', role: 'Dispatcher', mandateEligible: false, exceptions: ['FMLA'], benefitBalances: { vacation: 40, sick: 96, personal: 8, comp: 0 } },
        { id: 'emp-casey', name: 'Casey', role: 'Part-Time', mandateEligible: false, exceptions: ['Part-time'], benefitBalances: { vacation: 12, sick: 16, personal: 0, comp: 0 } }
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
        { employeeId: 'emp-alex', patternId: 'pattern-2-2-3-days', startDate: '2026-06-01' },
        { employeeId: 'emp-jordan', patternId: 'pattern-2-2-3-days', startDate: '2026-06-01' }
      ],
      scheduleEvents: [
        { id: 'evt-vacation-sample', employeeId: 'emp-taylor', type: 'vacation', status: 'approved', start: '2026-06-18T05:00', end: '2026-06-18T17:00' },
        { id: 'evt-mandate-sample', employeeId: 'emp-alex', type: 'mandate', status: 'planned', start: '2026-06-20T17:00', end: '2026-06-21T05:00' }
      ],
      benefitLedger: [
        { id: 'ben-1', employeeId: 'emp-alex', benefitType: 'sick', date: '2026-06-01', amount: '+8', reason: 'Monthly sick accrual' },
        { id: 'ben-2', employeeId: 'emp-taylor', benefitType: 'vacation', date: '2026-06-18', amount: '-12', reason: 'Approved vacation event' }
      ],
      coverageRequirements: defaultCoverageRequirements(),
      agencyProfile: defaultAgencyProfile(),
      rules: { maxHoursPerWeek: 40, minGapHours: 8, monthStart: defaultMonthValue() }
    });
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
      if (employeeId) removeEmployee(employeeId);
      if (shiftId) removeShift(shiftId);
      if (assignmentId) removeAssignment(assignmentId);
    });
    $('#sampleDataBtn').addEventListener('click', loadSample);
    $('#clearDataBtn').addEventListener('click', function () {
      state = normalizeState({ employees: [], shifts: [], assignments: [], rules: state.rules, agencyProfile: state.agencyProfile });
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
