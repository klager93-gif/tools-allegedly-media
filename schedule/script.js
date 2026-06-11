/*
Signal Labs Tool File: schedule/script.js
Version: v0.1.1
Purpose: Logic-first Signal Schedule sandbox with text output and rule warnings
*/
(function () {
  var STORAGE_KEY = 'signalSchedule.v0.1.1';
  var OLD_STORAGE_KEY = 'signalSchedule.v0.1.0';
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var state = {
    employees: [],
    shifts: [],
    assignments: [],
    rules: {
      maxHoursPerWeek: 40,
      minGapHours: 8,
      monthStart: ''
    }
  };

  function id(prefix) {
    return prefix + '-' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  function $(selector) { return document.querySelector(selector); }

  function normalizeState(input) {
    var next = input || {};
    next.employees = Array.isArray(next.employees) ? next.employees : [];
    next.shifts = Array.isArray(next.shifts) ? next.shifts : [];
    next.assignments = Array.isArray(next.assignments) ? next.assignments : [];
    next.rules = next.rules || {};
    next.rules.maxHoursPerWeek = Number(next.rules.maxHoursPerWeek || 40);
    next.rules.minGapHours = Number(next.rules.minGapHours || 8);
    next.rules.monthStart = next.rules.monthStart || defaultMonthValue();
    next.employees = next.employees.map(function (employee) {
      return {
        id: employee.id || id('emp'),
        name: employee.name || 'Unnamed',
        role: employee.role || 'Dispatcher'
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
      var raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
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

  function defaultMonthValue() {
    var now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
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
    var now = new Date();
    var day = now.getDay() || 7;
    var monday = new Date(now);
    monday.setDate(now.getDate() - day + 1);
    var sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    var opts = { month: 'short', day: 'numeric' };
    $('#currentWeekLabel').textContent = monday.toLocaleDateString(undefined, opts) + ' – ' + sunday.toLocaleDateString(undefined, opts);
  }

  function syncRuleInputs() {
    $('#maxHoursPerWeek').value = state.rules.maxHoursPerWeek;
    $('#minGapHours').value = state.rules.minGapHours;
    $('#monthStart').value = state.rules.monthStart || defaultMonthValue();
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
      return '<span class="schedule-pill"><strong>' + escapeHtml(employee.name) + '</strong><small>' + escapeHtml(employee.role) + '</small><button class="icon-button" type="button" data-remove-employee="' + employee.id + '" aria-label="Remove ' + escapeHtml(employee.name) + '">×</button></span>';
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

    return warnings;
  }

  function renderSummary() {
    var summary = $('#coverageSummary');
    var totals = employeeHours();
    var peopleScheduled = new Set(state.assignments.map(function (item) { return item.employeeId; })).size;
    var openDays = days.filter(function (day) {
      return !state.assignments.some(function (item) { return item.day === day; });
    });
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
      '<div class="coverage-card"><span>Rule Warnings</span><strong>' + warnings.length + '</strong><p>Coverage, overtime, and rest-gap warnings.</p></div>' +
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
    lines.push('SIGNAL SCHEDULE — LOGIC SANDBOX');
    lines.push('Version: v0.1.1');
    lines.push('');
    lines.push('Rules:');
    lines.push('- Max hours/week: ' + state.rules.maxHoursPerWeek);
    lines.push('- Minimum gap between shifts: ' + state.rules.minGapHours + ' hours');
    lines.push('- Month planning start: ' + (state.rules.monthStart || defaultMonthValue()));
    lines.push('');
    lines.push('Employees:');
    if (state.employees.length) {
      state.employees.forEach(function (employee) {
        lines.push('- ' + employee.name + ' (' + employee.role + ') — ' + (totals[employee.id] || 0).toFixed(1) + ' hrs');
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
    lines.push('Warnings:');
    if (warnings.length) warnings.forEach(function (warning) { lines.push('- ' + warning); });
    else lines.push('- None');
    lines.push('');
    lines.push('Next Build Notes:');
    lines.push('- Month view should reuse these same assignment objects with actual dates.');
    lines.push('- PHP should not start until employees, users, roles, shifts, assignments, availability, time off, and templates are mapped.');
    return lines.join('\n');
  }

  function renderOutput() {
    $('#scheduleOutput').value = textOutput();
  }

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
    state.employees.push({ id: id('emp'), name: clean, role: role || 'Dispatcher' });
    save();
    render();
    showToast('Person added.', 'success');
  }

  function addShift(name, start, end, minStaff) {
    var clean = name.trim();
    if (!clean) return showToast('Enter a shift name first.', 'error');
    state.shifts.push({ id: id('shift'), name: clean, start: start || '07:00', end: end || '15:00', minStaff: Number(minStaff || 1) });
    save();
    render();
    showToast('Shift added.', 'success');
  }

  function addAssignment(day, shiftId, employeeId) {
    if (!shiftId || !employeeId) return showToast('Add at least one person and one shift first.', 'error');
    state.assignments.push({ id: id('asg'), day: day, shiftId: shiftId, employeeId: employeeId });
    save();
    render();
    showToast('Assignment added.', 'success');
  }

  function saveRules() {
    state.rules.maxHoursPerWeek = Number($('#maxHoursPerWeek').value || 40);
    state.rules.minGapHours = Number($('#minGapHours').value || 8);
    state.rules.monthStart = $('#monthStart').value || defaultMonthValue();
    save();
    render();
    showToast('Rules saved.', 'success');
  }

  function removeEmployee(employeeId) {
    state.employees = state.employees.filter(function (item) { return item.id !== employeeId; });
    state.assignments = state.assignments.filter(function (item) { return item.employeeId !== employeeId; });
    save();
    render();
  }

  function removeShift(shiftId) {
    state.shifts = state.shifts.filter(function (item) { return item.id !== shiftId; });
    state.assignments = state.assignments.filter(function (item) { return item.shiftId !== shiftId; });
    save();
    render();
  }

  function removeAssignment(assignmentId) {
    state.assignments = state.assignments.filter(function (item) { return item.id !== assignmentId; });
    save();
    render();
  }

  function loadSample() {
    state = normalizeState({
      employees: [
        { id: 'emp-alex', name: 'Alex', role: 'Dispatcher' },
        { id: 'emp-jordan', name: 'Jordan', role: 'Supervisor' },
        { id: 'emp-taylor', name: 'Taylor', role: 'Dispatcher' },
        { id: 'emp-casey', name: 'Casey', role: 'Part-Time' }
      ],
      shifts: [
        { id: 'shift-days', name: 'Days', start: '07:00', end: '15:00', minStaff: 2 },
        { id: 'shift-evenings', name: 'Evenings', start: '15:00', end: '23:00', minStaff: 2 },
        { id: 'shift-nights', name: 'Nights', start: '23:00', end: '07:00', minStaff: 1 }
      ],
      assignments: [
        { id: 'asg-1', day: 'Monday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-2', day: 'Monday', shiftId: 'shift-days', employeeId: 'emp-jordan' },
        { id: 'asg-3', day: 'Monday', shiftId: 'shift-evenings', employeeId: 'emp-taylor' },
        { id: 'asg-4', day: 'Tuesday', shiftId: 'shift-nights', employeeId: 'emp-casey' },
        { id: 'asg-5', day: 'Wednesday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-6', day: 'Thursday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-7', day: 'Friday', shiftId: 'shift-days', employeeId: 'emp-alex' }
      ],
      rules: {
        maxHoursPerWeek: 32,
        minGapHours: 8,
        monthStart: defaultMonthValue()
      }
    });
    save();
    render();
    showToast('Sample logic schedule loaded.', 'success');
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

    $('#ruleForm').addEventListener('submit', function (event) {
      event.preventDefault();
      saveRules();
    });

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
      state = normalizeState({ employees: [], shifts: [], assignments: [], rules: state.rules });
      save();
      render();
      showToast('Schedule cleared.', 'info');
    });
    $('#printBtn').addEventListener('click', function () { window.print(); });
    $('#copyOutputBtn').addEventListener('click', function () {
      $('#scheduleOutput').select();
      document.execCommand('copy');
      showToast('Text output copied.', 'success');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    load();
    bindEvents();
    render();
  });
})();
