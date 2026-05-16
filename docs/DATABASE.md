# Database

## Tables

- `services`
- `bookings`
- `business_hours`
- `blocked_times`
- `testimonials`
- `gallery_items`

## Drizzle

Schema file:

```text
backend/src/db/schema.ts
```

Migration folder:

```text
backend/drizzle
```

Generate a new migration after schema edits:

```bash
npm run db:generate --workspace backend
```

Apply migrations:

```bash
npm run db:migrate --workspace backend
```

## Booking Constraint

The initial migration enables `btree_gist` and adds:

```sql
EXCLUDE USING gist (
  appointment_date WITH =,
  tsrange((appointment_date + start_time), (appointment_date + end_time), '[)') WITH &&
)
WHERE (status IN ('pending', 'confirmed'));
```

This prevents overlapping pending or confirmed appointments at the PostgreSQL layer.

## Seed Data

The initial migration inserts services, standard business hours, testimonials, and placeholder gallery items. Replace placeholder image URLs before launch.
