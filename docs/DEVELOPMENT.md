# Development

## Scripts

Root:

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
```

Frontend:

```bash
npm run dev --workspace frontend
npm run build --workspace frontend
npm run preview --workspace frontend
npm run typecheck --workspace frontend
```

Backend:

```bash
npm run dev --workspace backend
npm run build --workspace backend
npm run start --workspace backend
npm run db:generate --workspace backend
npm run db:migrate --workspace backend
npm run db:studio --workspace backend
npm run typecheck --workspace backend
```

## Architecture Rules

- Frontend code stays in `frontend`.
- Backend code stays in `backend`.
- Shared TypeScript contracts stay in `shared`.
- API input is validated with Zod.
- Schema changes are made through Drizzle schema and migrations.
- The gallery placeholder data lives in `frontend/src/data/gallery.ts` and database seed rows in `backend/drizzle/0000_initial.sql`.

## Local API Flow

1. Start PostgreSQL.
2. Run migrations.
3. Start backend on `8080`.
4. Start frontend on `5173`.
5. Confirm `GET http://localhost:8080/api/health`.
