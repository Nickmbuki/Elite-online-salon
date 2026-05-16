# Installation

## Requirements

- Node.js `20.19+` or `22.12+`
- npm `10+`
- PostgreSQL `15+`
- Docker for container builds
- Google Cloud CLI for Cloud Run deployment

## Install Dependencies

```bash
npm install
```

## Environment Files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `backend/.env`:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/elite_doorstep_salon
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

Update `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Database

Create the local database, then run Drizzle migrations:

```bash
createdb elite_doorstep_salon
npm run db:migrate --workspace backend
```

The initial migration creates schema, booking conflict constraints, business hours, services, testimonials, and placeholder gallery records.
