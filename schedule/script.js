/*
Signal Labs Tool File: schedule/script.js
Version: v0.1.0
Purpose: Local-first Signal Schedule MVP logic
*/
(function () {
  var STORAGE_KEY = 'signalSchedule.v0.1.0';
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var state = {
    employees: [],
    shifts: [],
    assignments: []
  };

  function id(prefix) {
    return prefix + '-' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  function $(selector) { return document.querySelector(selector); }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    var status = $('#scheduleSaveStatus');
    if (status) status.textContent = 'Saved locally';
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state = JSON.parse(raw);
    } catch (error) {
      state = { employees: [], shifts: [], assignments: [] };
    }
  }

  function showToast(message, type) {
    if (window.SignalLabs && window.SignalLabs.toast) window.SignalLabs.toast(message, type || 'info');
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

  function shiftLabel(shift) {
    return shift.name + ' · ' + formatTime(shift.start) + '–' + formatTime(shift.end);
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

  function renderSelects() {
    var daySelect = $('#assignmentDay');
    var shiftSelect = $('#assignmentShift');
    var employeeSelect = $('#assignmentEmployee');

    daySelect.innerHTML = days.map(function (day) { return '<option value="' + day + '">' + day + '</option>'; }).join('');
    shiftSelect.innerHTML = state.shifts.length ? state.shifts.map(function (shift) {
      return '<option value="' + shift.id + '">' + shiftLabel(shift) + '</option>';
    }).join('') : '<option value="">Add a shift first</option>';
    employeeSelect.innerHTML = state.employees.length ? state.employees.map(function (employee) {
      return '<option value="' + employee.id + '">' + employee.name + '</option>';
    }).join('') : '<option value="">Add a person first</option>';
  }

  function renderPills() {
    var employeeList = $('#employeeList');
    var shiftList = $('#shiftList');

    employeeList.innerHTML = state.employees.length ? state.employees.map(function (employee) {
      return '<span class="schedule-pill">' + escapeHtml(employee.name) + '<button class="icon-button" type="button" data-remove-employee="' + employee.id + '" aria-label="Remove ' + escapeHtml(employee.name) + '">×</button></span>';
    }).join('') : '<div class="signal-empty-state"><strong>No people yet</strong><span>Add employees to start building the schedule.</span></div>';

    shiftList.innerHTML = state.shifts.length ? state.shifts.map(function (shift) {
      return '<span class="schedule-pill">' + escapeHtml(shift.name) + '<small>' + formatTime(shift.start) + '–' + formatTime(shift.end) + '</small><button class="icon-button" type="button" data-remove-shift="' + shift.id + '" aria-label="Remove ' + escapeHtml(shift.name) + '">×</button></span>';
    }).join('') : '<div class="signal-empty-state"><strong>No shifts yet</strong><span>Add shift blocks like Days, Evenings, or Nights.</span></div>';
  }

  function renderBoard() {
    var board = $('#scheduleBoard');
    board.innerHTML = days.map(function (day) {
      var items = state.assignments.filter(function (assignment) { return assignment.day === day; });
      var cards = items.length ? items.map(function (assignment) {
        var employee = state.employees.find(function (person) { return person.id === assignment.employeeId; });
        var shift = state.shifts.find(function (item) { return item.id === assignment.shiftId; });
        if (!employee || !shift) return '';
        return '<article class="assignment-card"><strong>' + escapeHtml(employee.name) + '</strong><span>' + escapeHtml(shiftLabel(shift)) + '</span><button type="button" data-remove-assignment="' + assignment.id + '">Remove</button></article>';
      }).join('') : '<div class="day-empty">No one scheduled</div>';
      return '<section class="day-column"><h3>' + day.slice(0, 3) + '<span>' + items.length + ' shift' + (items.length === 1 ? '' : 's') + '</span></h3>' + cards + '</section>';
    }).join('');
  }

  function renderSummary() {
    var summary = $('#coverageSummary');
    var peopleScheduled = new Set(state.assignments.map(function (item) { return item.employeeId; })).size;
    var openDays = days.filter(function (day) {
      return !state.assignments.some(function (item) { return item.day === day; });
    });
    var busiest = days.reduce(function (best, day) {
      var count = state.assignments.filter(function (item) { return item.day === day; }).length;
      return count > best.count ? { day: day, count: count } : best;
    }, { day: 'None', count: 0 });

    summary.innerHTML = '' +
      '<div class="coverage-card"><span>Total Assignments</span><strong>' + state.assignments.length + '</strong><p>Scheduled shift blocks this week.</p></div>' +
      '<div class="coverage-card"><span>People Scheduled</span><strong>' + peopleScheduled + '/' + state.employees.length + '</strong><p>Employees with at least one assignment.</p></div>' +
      '<div class="coverage-card"><span>Open Days</span><strong>' + openDays.length + '</strong><p>' + (openDays.length ? openDays.join(', ') : 'Every day has at least one assignment.') + '</p></div>' +
      '<div class="coverage-card"><span>Shifts Created</span><strong>' + state.shifts.length + '</strong><p>Reusable shift blocks available.</p></div>' +
      '<div class="coverage-card"><span>Busiest Day</span><strong>' + busiest.day + '</strong><p>' + busiest.count + ' assignment' + (busiest.count === 1 ? '' : 's') + ' scheduled.</p></div>' +
      '<div class="coverage-card"><span>Storage</span><strong>Local</strong><p>This version saves only in this browser.</p></div>';
  }

  function render() {
    renderWeekLabel();
    renderSelects();
    renderPills();
    renderBoard();
    renderSummary();
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  }

  function addEmployee(name) {
    var clean = name.trim();
    if (!clean) return showToast('Enter an employee name first.', 'error');
    state.employees.push({ id: id('emp'), name: clean });
    save();
    render();
    showToast('Person added.', 'success');
  }

  function addShift(name, start, end) {
    var clean = name.trim();
    if (!clean) return showToast('Enter a shift name first.', 'error');
    state.shifts.push({ id: id('shift'), name: clean, start: start || '07:00', end: end || '15:00' });
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
    state = {
      employees: [
        { id: 'emp-alex', name: 'Alex' },
        { id: 'emp-jordan', name: 'Jordan' },
        { id: 'emp-taylor', name: 'Taylor' },
        { id: 'emp-casey', name: 'Casey' }
      ],
      shifts: [
        { id: 'shift-days', name: 'Days', start: '07:00', end: '15:00' },
        { id: 'shift-evenings', name: 'Evenings', start: '15:00', end: '23:00' },
        { id: 'shift-nights', name: 'Nights', start: '23:00', end: '07:00' }
      ],
      assignments: [
        { id: 'asg-1', day: 'Monday', shiftId: 'shift-days', employeeId: 'emp-alex' },
        { id: 'asg-2', day: 'Monday', shiftId: 'shift-evenings', employeeId: 'emp-jordan' },
        { id: 'asg-3', day: 'Tuesday', shiftId: 'shift-days', employeeId: 'emp-taylor' },
        { id: 'asg-4', day: 'Wednesday', shiftId: 'shift-nights', employeeId: 'emp-casey' }
      ]
    };
    save();
    render();
    showToast('Sample schedule loaded.', 'success');
  }

  function bindEvents() {
    $('#employeeForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addEmployee($('#employeeName').value);
      $('#employeeName').value = '';
      $('#employeeName').focus();
    });

    $('#shiftForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addShift($('#shiftName').value, $('#shiftStart').value, $('#shiftEnd').value);
      $('#shiftName').value = '';
      $('#shiftName').focus();
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
      state = { employees: [], shifts: [], assignments: [] };
      save();
      render();
      showToast('Schedule cleared.', 'info');
    });
    $('#printBtn').addEventListener('click', function () { window.print(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    load();
    bindEvents();
    render();
  });
})();
