export type LocationType = "home" | "salon";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  durationMinutes: number;
  priceFrom: number;
  imageUrl: string | null;
  active: boolean;
  createdAt: string;
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface BookingRequest {
  clientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  locationType: LocationType;
  appointmentDate: string;
  startTime: string;
  address?: string;
  occasion?: string;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  status: BookingStatus;
  appointmentDate: string;
  startTime: string;
  endTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  occasion: string | null;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  altText: string;
}
