# Railway Deployment

Railway currently detects Config as Code from `railway.json` or `railway.toml`. This repo also includes a root `railway.yaml` as a human-readable deployment plan for the two Railway services.

## Files

- `railway.yaml`: project-level Railway deployment plan
- `backend/railway.json`: backend service config detected by Railway
- `frontend/railway.json`: frontend service config detected by Railway
- `backend/Dockerfile`: backend container
- `frontend/Dockerfile`: frontend container

## Services

Create two Railway services from the same GitHub repo:

```text
https://github.com/Nickmbuki/Elite-online-salon
```

Backend service:

```text
Config file path: /backend/railway.json
Root directory: /
```

Frontend service:

```text
Config file path: /frontend/railway.json
Root directory: /
```

The root directory stays `/` because both Dockerfiles build from the monorepo root and copy shared workspace files.

## Backend Variables

```env
DATABASE_URL=
PORT=8080
CORS_ORIGIN=https://YOUR_FRONTEND_RAILWAY_DOMAIN
```

Add a Railway PostgreSQL service and set `DATABASE_URL` from its connection string.

## Frontend Variables

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_RAILWAY_DOMAIN
```

This variable is used at frontend build time.

## Database Migrations

The backend Railway service runs this pre-deploy command automatically:

```bash
node dist/db/bootstrap.js
```

It connects to PostgreSQL, applies the initial schema if needed, and seeds services, business hours, testimonials, and gallery items idempotently.

## Notes

- The backend healthcheck is `/api/health`.
- The frontend healthcheck is `/`.
- The frontend serves the Vite build through Nginx and listens on Railway's `PORT`.
- Pending and confirmed bookings remain collision-free through backend transaction checks and the PostgreSQL exclusion constraint.
