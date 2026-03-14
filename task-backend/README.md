# Task Backend

Technical test backend built with Ruby on Rails API and MongoDB.

## Stack

- Ruby on Rails 8 API-only
- MongoDB with Mongoid
- Docker Compose for local development

## Requirements

- Docker
- Docker Compose

## Run the project

```bash
docker compose up --build
```

The API will be available at:

```text
http://localhost:3000
```

## Available endpoints

### Health check

```http
GET /up
```

### List tasks

```http
GET /tasks
```

### Create task

```http
POST /tasks
```

Example request body:

```json
{
  "task": {
    "title": "Primera tarea",
    "description": "Crear el endpoint inicial",
    "status": "pending"
  }
}
```

## Expected statuses

- `200 OK` for `GET /tasks`
- `201 Created` for successful `POST /tasks`
- `422 Unprocessable Entity` for validation errors

## Validation rules

- `title` is required
- `title` must be unique
- `status` must be `pending` or `completed`

## Notes

- Tasks are returned ordered by creation date
- MongoDB runs as a service inside Docker Compose
- This repository currently contains the backend service only
