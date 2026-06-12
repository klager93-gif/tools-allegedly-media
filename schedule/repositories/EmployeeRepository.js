/*
Signal Labs Tool File: schedule/repositories/EmployeeRepository.js
Version: v1.5.0
Purpose: Read-only employee repository boundary. UI code must not read adapters directly.
*/
(function (global) {
  global.SignalScheduleEmployeeRepository = function SignalScheduleEmployeeRepository(adapter) {
    return {
      list: function () { return adapter.listEmployees(); },
      listByAgency: function (agencyId) {
        return adapter.listEmployees().then(function (employees) {
          return (employees || []).filter(function (employee) { return !agencyId || employee.agencyId === agencyId; });
        });
      },
      getById: function (employeeId) { return adapter.getEmployee(employeeId); }
    };
  };
})(window);
