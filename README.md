# Elite Doorstep Salon

Elite Doorstep Salon is a full TypeScript monorepo for a premium mobile salon booking platform.

## Apps

- `frontend`: React + Vite + Tailwind CSS + Framer Motion + React Router + vite-plugin-pwa
- `backend`: Node.js + Express + TypeScript + Drizzle ORM + PostgreSQL + Zod
- `shared`: Shared booking and API types
- `docs`: Installation, development, database, PWA, booking, and Google Cloud deployment notes
- `railway.yaml`: Railway deployment plan, with detected service configs in `backend/railway.json` and `frontend/railway.json`

The frontend includes a Share tab at `/share` with native device sharing, WhatsApp/SMS/email links, and clipboard fallback.

## Quick Start

```bash
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run typecheck
npm run build
```

Run PostgreSQL, set `backend/.env`, then apply migrations:

```bash
npm run db:migrate --workspace backend
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:8080/api/health`

## Booking

The frontend calls:

```text
GET /api/availability?date=YYYY-MM-DD&serviceId=...
```

Only available slots are shown. `POST /api/bookings` re-checks availability in a transaction and PostgreSQL also enforces a no-overlap exclusion constraint for pending and confirmed bookings.

## Official References Used

- Vite: https://vite.dev and Vite 7 migration note for Node `20.19+` or `22.12+`
- Drizzle ORM PostgreSQL and migrations: https://orm.drizzle.team/docs
- Cloud Run Node/container deployment: https://cloud.google.com/run/docs
- vite-plugin-pwa: https://vite-pwa-org.netlify.app
- Railway Config as Code and monorepo deployment: https://docs.railway.com/config-as-code/reference and https://docs.railway.com/deployments/monorepo
