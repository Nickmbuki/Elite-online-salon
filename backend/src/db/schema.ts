import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled"
]);

export const locationTypeEnum = pgEnum("location_type", ["home", "salon"]);

export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    description: varchar("description", { length: 800 }).notNull(),
    category: varchar("category", { length: 120 }).notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    priceFrom: integer("price_from").notNull(),
    imageUrl: varchar("image_url", { length: 800 }),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => ({
    slugUnique: uniqueIndex("services_slug_unique").on(table.slug)
  })
);

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  clientName: varchar("client_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 240 }),
  serviceId: uuid("service_id")
    .references(() => services.id, { onDelete: "restrict" })
    .notNull(),
  locationType: locationTypeEnum("location_type").notNull(),
  appointmentDate: date("appointment_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  address: varchar("address", { length: 500 }),
  occasion: varchar("occasion", { length: 160 }),
  notes: varchar("notes", { length: 1200 }),
  status: bookingStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
});

export const businessHours = pgTable(
  "business_hours",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dayOfWeek: integer("day_of_week").notNull(),
    openTime: time("open_time").notNull(),
    closeTime: time("close_time").notNull(),
    isOpen: boolean("is_open").default(true).notNull()
  },
  (table) => ({
    dayUnique: uniqueIndex("business_hours_day_unique").on(table.dayOfWeek)
  })
);

export const blockedTimes = pgTable("blocked_times", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  reason: varchar("reason", { length: 400 })
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  message: varchar("message", { length: 1000 }).notNull(),
  rating: integer("rating").notNull(),
  occasion: varchar("occasion", { length: 160 })
});

export const galleryItems = pgTable("gallery_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  imageUrl: varchar("image_url", { length: 800 }).notNull(),
  altText: varchar("alt_text", { length: 400 }).notNull()
});

export const servicesRelations = relations(services, ({ many }) => ({
  bookings: many(bookings)
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id]
  })
}));

export type ServiceRecord = typeof services.$inferSelect;
export type NewBookingRecord = typeof bookings.$inferInsert;
export type BookingRecord = typeof bookings.$inferSelect;
