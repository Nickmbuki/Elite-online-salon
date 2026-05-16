import { Router } from "express";
import { asc } from "drizzle-orm";
import { db } from "../db/client.js";
import { galleryItems } from "../db/schema.js";

export const galleryRouter = Router();

galleryRouter.get("/", async (_request, response, next) => {
  try {
    const records = await db.select().from(galleryItems).orderBy(asc(galleryItems.category), asc(galleryItems.title));
    response.json({ gallery: records });
  } catch (error) {
    next(error);
  }
});
