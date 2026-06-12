/*
Signal Labs Tool File: schedule/services/EmployeeService.js
Version: v1.6.0
Purpose: Read-only employee service boundary for current JSON and future Coolify API/Postgres replacement.
*/
(function (global) {
  global.SignalScheduleEmployeeService = function SignalScheduleEmployeeService(repository) {
    return {
      listEmployees: function () { return repository.list(); },
      listEmployeesForAgency: function (agencyId) { return repository.listByAgency(agencyId); },
      getEmployee: function (employeeId) { return repository.getById(employeeId); }
    };
  };
})(window);
