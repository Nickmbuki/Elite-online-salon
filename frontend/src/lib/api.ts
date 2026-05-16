import type { BookingRequest, BookingResponse, GalleryItem, Service, Testimonial, TimeSlot } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    },
    ...options
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : undefined;

  if (!response.ok) {
    throw new Error(payload && "error" in payload ? String(payload.error) : "Request failed");
  }

  if (!payload) {
    throw new Error("API did not return JSON. Check VITE_API_BASE_URL and make sure the backend is running.");
  }

  return payload as T;
}

function assertArray<T>(value: unknown, message: string): T[] {
  if (!Array.isArray(value)) {
    throw new Error(message);
  }

  return value as T[];
}

function assertObject<T>(value: unknown, message: string): T {
  if (!value || typeof value !== "object") {
    throw new Error(message);
  }

  return value as T;
}

export async function getServices(): Promise<Service[]> {
  const payload = await request<{ services: Service[] }>("/api/services");
  return assertArray<Service>(payload.services, "Services API response is missing services.");
}

export async function getAvailability(date: string, serviceId: string): Promise<TimeSlot[]> {
  const params = new URLSearchParams({ date, serviceId });
  const payload = await request<{ slots: TimeSlot[] }>(`/api/availability?${params.toString()}`);
  return assertArray<TimeSlot>(payload.slots, "Availability API response is missing slots.");
}

export async function createBooking(input: BookingRequest): Promise<BookingResponse> {
  const payload = await request<{ booking: BookingResponse }>("/api/bookings", {
    method: "POST",
    body: JSON.stringify(input)
  });
  return assertObject<BookingResponse>(payload.booking, "Booking API response is missing booking.");
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await request<{ testimonials: Testimonial[] }>("/api/testimonials");
  return assertArray<Testimonial>(payload.testimonials, "Testimonials API response is missing testimonials.");
}

export async function getGallery(): Promise<GalleryItem[]> {
  const payload = await request<{ gallery: GalleryItem[] }>("/api/gallery");
  return assertArray<GalleryItem>(payload.gallery, "Gallery API response is missing gallery.");
}
