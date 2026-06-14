-- Signal Schedule v2.1.3 Employee Identity Cleanup
-- Future Postgres schema planning only.
-- Review existing production tables before applying.

-- Core principle:
-- Human-entered identifiers belong to the agency.
-- Database identifiers belong to the system.

-- If employees already exists, these additions preserve a hidden system key
-- while allowing admin-entered agency employee IDs and optional badge numbers.

ALTER TABLE employees
  ADD COLUMN IF NOT EXISTS employee_id TEXT,
  ADD COLUMN IF NOT EXISTS badge_number TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_employees_employee_id
  ON employees (employee_id)
  WHERE employee_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_employees_badge_number
  ON employees (badge_number)
  WHERE badge_number IS NOT NULL;

-- Future authentication tables. Do not store plaintext passwords.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  employee_record_id TEXT REFERENCES employees(id),
  username TEXT,
  email TEXT,
  password_hash TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_username_or_email_required CHECK (username IS NOT NULL OR email IS NOT NULL)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_unique
  ON users (LOWER(username))
  WHERE username IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique
  ON users (LOWER(email))
  WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id TEXT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role_id)
);

INSERT INTO roles (id, name, description) VALUES
  ('role-admin', 'Admin', 'Full Schedule administration access'),
  ('role-scheduler', 'Scheduler', 'Schedule creation and staffing management access'),
  ('role-supervisor', 'Supervisor', 'Shift/team management access'),
  ('role-telecommunicator', 'Telecommunicator', 'Employee self-service and schedule visibility'),
  ('role-trainee', 'Trainee', 'Limited trainee schedule visibility'),
  ('role-employee', 'Employee', 'General employee self-service access')
ON CONFLICT (id) DO NOTHING;

INSERT INTO schema_migrations (version, name)
VALUES ('007', 'employee_identity_cleanup')
ON CONFLICT (version) DO NOTHING;
