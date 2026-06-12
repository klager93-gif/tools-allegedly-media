-- Signal Schedule v1.8.0 Employee CRUD Foundation Safety Indexes
-- Optional but recommended before enabling protected employee writes.

create unique index if not exists idx_employees_agency_employee_code_unique
on employees (agency_id, employee_code)
where status <> 'deleted';

create index if not exists idx_employees_updated_at on employees (updated_at);
