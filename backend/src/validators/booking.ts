import { z } from "zod";
import { isIsoDate } from "../utils/time.js";

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Use HH:MM time format");

export const availabilityQuerySchema = z.object({
  date: z.string().refine(isIsoDate, "Use YYYY-MM-DD date format"),
  serviceId: z.string().uuid()
});

export const createBookingSchema = z
  .object({
    clientName: z.string().trim().min(2).max(160),
    phone: z.string().trim().min(7).max(40),
    email: z.string().trim().email().max(240).optional().or(z.literal("")),
    serviceId: z.string().uuid(),
    locationType: z.enum(["home", "salon"]),
    appointmentDate: z.string().refine(isIsoDate, "Use YYYY-MM-DD date format"),
    startTime: timeSchema,
    address: z.string().trim().max(500).optional().or(z.literal("")),
    occasion: z.string().trim().max(160).optional().or(z.literal("")),
    notes: z.string().trim().max(1200).optional().or(z.literal(""))
  })
  .superRefine((value, context) => {
    if (value.locationType === "home" && !value.address?.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address"],
        message: "Address is required for home visits"
      });
    }
  })
  .transform((value) => ({
    ...value,
    email: value.email || undefined,
    address: value.address || undefined,
    occasion: value.occasion || undefined,
    notes: value.notes || undefined
  }));

export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
