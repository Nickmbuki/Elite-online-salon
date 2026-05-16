import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./env.js";
import { availabilityRouter } from "./routes/availability.js";
import { bookingsRouter } from "./routes/bookings.js";
import { galleryRouter } from "./routes/gallery.js";
import { healthRouter } from "./routes/health.js";
import { servicesRouter } from "./routes/services.js";
import { testimonialsRouter } from "./routes/testimonials.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";

const allowedOrigins = env.CORS_ORIGIN.split(",").map((origin) => origin.trim());

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json({ limit: "1mb" }));

app.use("/api/health", healthRouter);
app.use("/api/services", servicesRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/gallery", galleryRouter);

app.use(notFoundHandler);
app.use(errorHandler);
