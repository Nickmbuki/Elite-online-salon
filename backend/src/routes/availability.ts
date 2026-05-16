import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { services } from "../db/schema.js";
import { HttpError } from "../middleware/error.js";
import { getAvailableSlots } from "../services/availability.js";
import { availabilityQuerySchema } from "../validators/booking.js";

export const availabilityRouter = Router();

availabilityRouter.get("/", async (request, response, next) => {
  try {
    const query = availabilityQuerySchema.parse(request.query);
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, query.serviceId))
      .limit(1);

    if (!service || !service.active) {
      throw new HttpError(404, "Service not found");
    }

    const slots = await getAvailableSlots(query.date, service);
    response.json({ date: query.date, serviceId: query.serviceId, slots });
  } catch (error) {
    next(error);
  }
});
