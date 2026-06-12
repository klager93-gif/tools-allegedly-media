/*
Signal Labs Tool File: schedule/adapters/ApiEmployeeAdapter.js
Version: v1.7.0
Purpose: Browser-safe read-only API employee adapter for future Coolify/Postgres employee reads.
*/
(function (global) {
  function normalizeBaseUrl(baseUrl) {
    return String(baseUrl || '').replace(/\/$/, '');
  }

  function readApi(url, fallback) {
    if (!global.fetch) return Promise.resolve(fallback || []);
    return global.fetch(url, { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('Unable to read ' + url);
        return response.json();
      })
      .then(function (payload) {
        if (payload && payload.ok === true && Array.isArray(payload.data)) return payload.data;
        if (Array.isArray(payload)) return payload;
        return fallback || [];
      })
      .catch(function () { return fallback || []; });
  }

  global.SignalScheduleApiEmployeeAdapter = function SignalScheduleApiEmployeeAdapter(options) {
    var config = options || {};
    var baseUrl = normalizeBaseUrl(config.baseUrl || '/api');
    return {
      sourceName: 'coolify-api-postgres-read',
      mode: 'read-only-api',
      activeByDefault: false,
      endpoints: {
        health: baseUrl + '/health',
        employees: baseUrl + '/employees'
      },
      listEmployees: function () { return readApi(baseUrl + '/employees', []); },
      getEmployee: function (employeeId) {
        return this.listEmployees().then(function (employees) {
          return (employees || []).find(function (employee) {
            return employee.id === employeeId || employee.employeeId === employeeId;
          }) || null;
        });
      }
    };
  };
})(window);
