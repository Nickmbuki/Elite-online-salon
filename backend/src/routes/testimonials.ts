import { Router } from "express";
import { asc } from "drizzle-orm";
import { db } from "../db/client.js";
import { testimonials } from "../db/schema.js";

export const testimonialsRouter = Router();

testimonialsRouter.get("/", async (_request, response, next) => {
  try {
    const records = await db.select().from(testimonials).orderBy(asc(testimonials.name));
    response.json({ testimonials: records });
  } catch (error) {
    next(error);
  }
});
