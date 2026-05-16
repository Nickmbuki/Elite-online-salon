import { Router } from "express";
import { pool } from "../db/client.js";

export const healthRouter = Router();

healthRouter.get("/", async (_request, response, next) => {
  try {
    const result = await pool.query<{
      services_count: string;
      gallery_count: string;
      testimonials_count: string;
    }>(`
      SELECT
        (SELECT count(*) FROM services) AS services_count,
        (SELECT count(*) FROM gallery_items) AS gallery_count,
        (SELECT count(*) FROM testimonials) AS testimonials_count;
    `);

    response.json({
      status: "ok",
      database: "connected",
      seedData: {
        services: Number(result.rows[0]?.services_count ?? 0),
        galleryItems: Number(result.rows[0]?.gallery_count ?? 0),
        testimonials: Number(result.rows[0]?.testimonials_count ?? 0)
      }
    });
  } catch (error) {
    next(error);
  }
});
