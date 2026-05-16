import { Router } from "express";
import { createBooking } from "../services/bookings.js";
import { createBookingSchema } from "../validators/booking.js";

export const bookingsRouter = Router();

bookingsRouter.post("/", async (request, response, next) => {
  try {
    const body = createBookingSchema.parse(request.body);
    const booking = await createBooking(body);
    response.status(201).json({ booking });
  } catch (error) {
    next(error);
  }
});
