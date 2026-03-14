# Tasks Project

Technical test solution built with Rails, Angular, MongoDB, Playwright, and Docker Compose.

## What is included

- `task-backend`: Ruby on Rails API with Mongoid
- `task-frontend`: Angular application
- `mongo`: MongoDB service through Docker Compose

This repository covers the requested end-to-end flow:

1. Open the frontend
2. Create a task from the form
3. Send the request to the Rails API
4. Persist the task in MongoDB
5. Refresh the task list in the frontend

## Repository structure

```text
tasks-project/
  task-backend/
  task-frontend/
  docker-compose.yml
  README.md
```

## Tech stack

- Ruby on Rails 8 API-only
- MongoDB with Mongoid
- Angular 21
- Playwright for E2E
- Docker Compose for local orchestration

## Quick start

From the repository root:

```bash
docker compose up --build
```

Available services:

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend: [http://localhost:3000](http://localhost:3000)
- MongoDB: `localhost:27017`

## Backend API

Base URL:

```text
http://localhost:3000
```

Endpoints:

- `GET /up`
- `GET /tasks`
- `POST /tasks`

Example request:

```json
{
  "task": {
    "title": "Prepare deployment checklist",
    "description": "Create compose setup for frontend and backend",
    "status": "pending"
  }
}
```

Validation rules:

- `title` is required
- `title` must be unique
- `status` must be `pending` or `completed`

Example successful response:

```json
{
  "message": "Task created successfully",
  "data": {
    "id": "...",
    "title": "Prepare deployment checklist",
    "description": "Create compose setup for frontend and backend",
    "status": "pending",
    "created_at": "...",
    "updated_at": "..."
  }
}
```

## Frontend

The Angular application includes:

- task creation form
- task list ordered by creation date
- integration with the Rails API
- visual system adapted from previous UX/UI work

## Testing

### Frontend unit tests

From `task-frontend`:

```bash
npm test -- --watch=false
```

### End-to-end test

Playwright validates the full happy path:

1. open the frontend
2. fill the task form
3. submit the task
4. verify the task appears in the list

From `task-frontend`:

```bash
npm run e2e
```

## Notes for local development

- The frontend currently points to `http://localhost:3000/tasks`
- The backend accepts requests from `http://localhost:4200`
- Docker Compose exposes the same ports used during local development to keep setup simple for evaluation

## CI/CD approach for staging

A simple GitHub Actions pipeline for staging would be:

1. install backend and frontend dependencies
2. run backend checks
3. run frontend build and unit tests
4. run Playwright E2E
5. build Docker images
6. deploy to a staging environment if all checks pass

Possible staging targets:

- AWS
- Render
- Railway
- Google Cloud Run

## Deliverables covered

- Rails API with MongoDB persistence
- Angular frontend
- Playwright E2E validation
- Docker Compose with frontend, backend, and MongoDB
