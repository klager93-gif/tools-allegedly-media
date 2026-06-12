/*
Signal Labs Tool File: schedule/adapters/JsonEmployeeAdapter.js
Version: v1.6.0
Purpose: Browser-safe read-only JSON employee adapter for the Coolify API Skeleton release. Active adapter remains static JSON.
*/
(function (global) {
  function readJson(url, fallback) {
    if (!global.fetch) return Promise.resolve(fallback || []);
    return global.fetch(url, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to read ' + url);
        return response.json();
      })
      .catch(function () { return fallback || []; });
  }

  global.SignalScheduleJsonEmployeeAdapter = {
    sourceName: 'static-json',
    mode: 'read-only',
    listEmployees: function () { return readJson('data/employees.json', []); },
    getEmployee: function (employeeId) {
      return this.listEmployees().then(function (employees) {
        return (employees || []).find(function (employee) {
          return employee.id === employeeId || employee.employeeId === employeeId;
        }) || null;
      });
    }
  };
})(window);
