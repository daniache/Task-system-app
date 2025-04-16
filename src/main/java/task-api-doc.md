# Task Management API Documentation

## Overview

The Task Management API allows users to **create**, **retrieve**, **update**, and **delete** task records, as well as update a task's status independently.

### What this API does

- Manages tasks with fields such as title, status, description, case number, and due date.
- Enables creation, editing, and deletion of tasks.
- Allows filtering and status-specific updates.
- Ideal for integrating into task dashboards or admin tools.

### What this API does not do

- Handle user authentication or roles
- Support file attachments or comments

### Status

This API is currently in the **live** phase.

### Benefits

- Lightweight and RESTful
- Easily integratable in frontend apps
- Minimal setup required

### Technical prerequisites

- Java 17+ and Spring Boot
- JSON parsing support on client side
- No authentication required

### Access

Open to any clients with access to the API endpoint (no auth restrictions).

---

## Conceptual Overview

Each task is represented as a JSON object and includes a title, case number, description, status, and a due date/time.

API operations are RESTful and use standard HTTP verbs:
- `GET` to retrieve tasks
- `POST` to create tasks
- `PUT` to fully update tasks
- `PATCH` to update task status
- `DELETE` to remove tasks

---

## Get Started

### Base URL

```
http://localhost:8080/tasks
```

### Required Headers

```http
Content-Type: application/json
Accept: application/json
```

### Request/Response Format

- All requests and responses use **JSON**.

### Example: Create a Task

```http
POST /tasks HTTP/1.1
Content-Type: application/json

{
  "caseNumber": "TMS-101",
  "title": "Fix security bug",
  "description": "Patch XSS vulnerability in login page",
  "status": "Pending",
  "dueDateTime": "2025-04-20T00:00:00"
}
```

### Response

```json
{
  "id": 1,
  "caseNumber": "TMS-101",
  "title": "Fix security bug",
  "description": "Patch XSS vulnerability in login page",
  "status": "Pending",
  "dueDateTime": "2025-04-20T00:00:00"
}
```

---

## Common Tasks

### Create a task

**Endpoint:** `POST /tasks`  
**Body:** JSON containing task data  
**Returns:** 201 Created with task object

### Get all tasks

**Endpoint:** `GET /tasks`  
**Returns:** List of task objects

### Get a task by ID

**Endpoint:** `GET /tasks/{id}`  
**Returns:** Task object or 404

### Update a task

**Endpoint:** `PUT /tasks/{id}`  
**Body:** Entire task object (with updated fields)

### Update task status

**Endpoint:** `PATCH /tasks/{id}/status`  
**Body:**

```json
{ "status": "Completed" }
```

### Delete a task

**Endpoint:** `DELETE /tasks/{id}`  
**Returns:** 204 No Content

---

## Task Schema

```json
{
  "id": 1,
  "caseNumber": "TMS-101",
  "title": "Fix security bug",
  "description": "Patch XSS vulnerability in login page",
  "status": "Pending",
  "dueDateTime": "2025-04-20T00:00:00"
}
```

Fields:
- `id` (Long): Auto-generated ID
- `caseNumber` (String): Unique case identifier (optional)
- `title` (String): Required task title
- `description` (String): Optional
- `status` (String): Required status (e.g., Pending, Completed)
- `dueDateTime` (DateTime): Required due date

---

## Testing the API

You can test using:
- Postman / Insomnia (manual testing)
- CURL
- JavaScript `fetch()` or `axios` calls

The API has no sandbox or environment distinction. All requests affect the real database.

---

## Support

If you encounter errors, ensure:
- Your JSON is valid and matches the expected schema
- Required fields are not missing

Unhandled errors will return:

```json
{ "error": "An internal error occurred" }
```

Validation errors return:

```json
{ "title": "Title is required", "status": "Status is required" }
```

---

_Last updated: 2025-04-16_