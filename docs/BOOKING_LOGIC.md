# Booking Logic

## Availability

Endpoint:

```text
GET /api/availability?date=YYYY-MM-DD&serviceId=...
```

The backend:

1. Validates query parameters with Zod.
2. Loads the selected active service.
3. Reads business hours for the date.
4. Generates slots in 30-minute intervals.
5. Removes slots that overlap pending or confirmed bookings.
6. Removes slots that overlap `blocked_times`.
7. Returns only available `{ startTime, endTime }` values.

## Booking Creation

Endpoint:

```text
POST /api/bookings
```

The backend:

1. Validates all input with Zod.
2. Requires an address for home visits.
3. Starts a database transaction.
4. Takes a date-scoped PostgreSQL advisory transaction lock.
5. Re-checks slot availability inside the transaction.
6. Inserts the booking as `pending`.
7. Lets the PostgreSQL exclusion constraint reject any overlapping write that slips through.

## Collision Behavior

If two users try the same slot:

- First valid request creates a pending booking.
- Second request receives HTTP `409`.
- Error message: `That appointment time was just booked. Please choose another available slot.`

## Statuses

- `pending`
- `confirmed`
- `completed`
- `cancelled`

Pending and confirmed bookings block availability. Cancelled bookings do not.
