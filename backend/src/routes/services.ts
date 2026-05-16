import { Router } from "express";
import { asc, eq } from "drizzle-orm";
import { db } from "../db/client.js";
import { services } from "../db/schema.js";

export const servicesRouter = Router();

servicesRouter.get("/", async (_request, response, next) => {
  try {
    const records = await db
      .select()
      .from(services)
      .where(eq(services.active, true))
      .orderBy(asc(services.category), asc(services.name));

    response.json({ services: records });
  } catch (error) {
    next(error);
  }
});
