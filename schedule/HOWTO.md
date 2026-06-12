## v1.2.1 HOWTO — Worker Folder Repair

Signal Schedule still runs as a static browser app. Use the multi-agency demo data exactly as before.

### What changed

The project now includes the planned Cloudflare API shape and mock Pages Function endpoint files. These are for backend transition planning only.

### Current app path

```text
UI
↓
Service Layer
↓
Repository Layer
↓
JSON Adapter
↓
/schedule/data/agencies.json and employees.json
```

### Future app path

```text
UI
↓
Service Layer
↓
Repository Layer
↓
API Adapter
↓
Cloudflare Worker / Pages Function
↓
D1
```

### Do not add yet

```text
D1 credentials
CRUD forms
Authentication
Approval workflows
Live writes
```
