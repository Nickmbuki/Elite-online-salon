import { eq, sql } from "drizzle-orm";
import { db } from "../db/client.js";
import { bookings, services } from "../db/schema.js";
import { HttpError } from "../middleware/error.js";
import { assertSlotIsAvailable } from "./availability.js";
import type { CreateBookingInput } from "../validators/booking.js";

interface BookingResponse {
  id: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  appointmentDate: string;
  startTime: string;
  endTime: string;
}

export async function createBooking(input: CreateBookingInput): Promise<BookingResponse> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${input.appointmentDate}))`);

    const [service] = await tx
      .select()
      .from(services)
      .where(eq(services.id, input.serviceId))
      .limit(1);

    if (!service || !service.active) {
      throw new HttpError(404, "Service not found");
    }

    const endTime = await assertSlotIsAvailable(input.appointmentDate, service, input.startTime, tx);

    const [booking] = await tx
      .insert(bookings)
      .values({
        clientName: input.clientName,
        phone: input.phone,
        email: input.email,
        serviceId: input.serviceId,
        locationType: input.locationType,
        appointmentDate: input.appointmentDate,
        startTime: input.startTime,
        endTime,
        address: input.address,
        occasion: input.occasion,
        notes: input.notes,
        status: "pending"
      })
      .returning({
        id: bookings.id,
        status: bookings.status,
        appointmentDate: bookings.appointmentDate,
        startTime: bookings.startTime,
        endTime: bookings.endTime
      });

    return {
      id: booking.id,
      status: booking.status,
      appointmentDate: booking.appointmentDate,
      startTime: booking.startTime.slice(0, 5),
      endTime: booking.endTime.slice(0, 5)
    };
  });
}
