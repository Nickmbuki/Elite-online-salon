import { and, eq, inArray, lt, gt } from "drizzle-orm";
import { db } from "../db/client.js";
import { blockedTimes, bookings, businessHours, type ServiceRecord } from "../db/schema.js";
import { dayOfWeek, isPastDate, minutesFromTime, normalizeTime, overlaps, timeFromMinutes } from "../utils/time.js";
import { HttpError } from "../middleware/error.js";

const SLOT_INTERVAL_MINUTES = 30;
const BUSY_STATUSES = ["pending", "confirmed"] as const;

type DbLike = {
  select: typeof db.select;
};

interface BusyRange {
  startTime: string;
  endTime: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

export async function getAvailableSlots(date: string, service: ServiceRecord, database: DbLike = db): Promise<TimeSlot[]> {
  if (isPastDate(date)) {
    return [];
  }

  const [hours] = await database
    .select()
    .from(businessHours)
    .where(eq(businessHours.dayOfWeek, dayOfWeek(date)));

  if (!hours || !hours.isOpen) {
    return [];
  }

  const openMinutes = minutesFromTime(hours.openTime);
  const closeMinutes = minutesFromTime(hours.closeTime);
  const latestStart = closeMinutes - service.durationMinutes;

  if (latestStart < openMinutes) {
    return [];
  }

  const busyBookings = await database
    .select({
      startTime: bookings.startTime,
      endTime: bookings.endTime
    })
    .from(bookings)
    .where(
      and(
        eq(bookings.appointmentDate, date),
        inArray(bookings.status, BUSY_STATUSES)
      )
    );

  const blocked = await database
    .select({
      startTime: blockedTimes.startTime,
      endTime: blockedTimes.endTime
    })
    .from(blockedTimes)
    .where(eq(blockedTimes.date, date));

  const busy: BusyRange[] = [...busyBookings, ...blocked].map((range) => ({
    startTime: normalizeTime(range.startTime),
    endTime: normalizeTime(range.endTime)
  }));

  const slots: TimeSlot[] = [];

  for (let cursor = openMinutes; cursor <= latestStart; cursor += SLOT_INTERVAL_MINUTES) {
    const startTime = timeFromMinutes(cursor);
    const endTime = timeFromMinutes(cursor + service.durationMinutes);
    const isBusy = busy.some((range) => overlaps(startTime, endTime, range.startTime, range.endTime));

    if (!isBusy) {
      slots.push({ startTime, endTime });
    }
  }

  return slots;
}

export async function assertSlotIsAvailable(
  date: string,
  service: ServiceRecord,
  startTime: string,
  database: DbLike = db
): Promise<string> {
  const normalizedStart = normalizeTime(startTime);
  const slots = await getAvailableSlots(date, service, database);
  const match = slots.find((slot) => slot.startTime === normalizedStart);

  if (!match) {
    throw new HttpError(409, "That time is not available. Please choose another slot.");
  }

  const overlappingBooking = await database
    .select({ id: bookings.id })
    .from(bookings)
    .where(
      and(
        eq(bookings.appointmentDate, date),
        inArray(bookings.status, BUSY_STATUSES),
        lt(bookings.startTime, match.endTime),
        gt(bookings.endTime, match.startTime)
      )
    )
    .limit(1);

  if (overlappingBooking.length > 0) {
    throw new HttpError(409, "That appointment time was just booked. Please choose another available slot.");
  }

  return match.endTime;
}
