import type { Service } from "@elite-doorstep-salon/shared";

const createdAt = new Date().toISOString();

export const fallbackServices: Service[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    name: "Signature Hair Styling",
    slug: "signature-hair-styling",
    description: "Elegant styling for interviews, date nights, photoshoots, and everyday confidence.",
    category: "Hair",
    durationMinutes: 90,
    priceFrom: 4500,
    imageUrl: "https://placehold.co/900x1100/f7efe8/4b342a?text=Hair+Styling",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    name: "Braids",
    slug: "braids",
    description: "Neat protective braids shaped with patience, polish, and long-wear comfort.",
    category: "Hair",
    durationMinutes: 180,
    priceFrom: 6500,
    imageUrl: "https://placehold.co/900x1100/f3d9d1/4b342a?text=Braids",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    name: "Natural Hair Styling",
    slug: "natural-hair-styling",
    description: "Soft, healthy styling for coils, curls, twists, and natural hair care routines.",
    category: "Hair",
    durationMinutes: 120,
    priceFrom: 5000,
    imageUrl: "https://placehold.co/900x1100/faf5ef/4b342a?text=Natural+Hair",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    name: "Bridal Hair",
    slug: "bridal-hair",
    description: "Calm, premium bridal styling for weddings, introductions, and special ceremonies.",
    category: "Bridal",
    durationMinutes: 150,
    priceFrom: 12000,
    imageUrl: "https://placehold.co/900x1100/fff7f2/4b342a?text=Bridal+Hair",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    name: "Wig and Weave Styling",
    slug: "wig-weave-styling",
    description: "Installation, shaping, and finishing for wigs and weaves with a natural look.",
    category: "Hair",
    durationMinutes: 120,
    priceFrom: 7000,
    imageUrl: "https://placehold.co/900x1100/f1dfd3/4b342a?text=Wigs+%26+Weaves",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000006",
    name: "Manicure",
    slug: "manicure",
    description: "Clean shaping, cuticle care, polish, and refined finishing for hands.",
    category: "Nails",
    durationMinutes: 60,
    priceFrom: 2500,
    imageUrl: "https://placehold.co/900x1100/f4cfc9/4b342a?text=Manicure",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000007",
    name: "Pedicure",
    slug: "pedicure",
    description: "Relaxing foot care, nail shaping, scrub, and polished finishing.",
    category: "Nails",
    durationMinutes: 75,
    priceFrom: 3000,
    imageUrl: "https://placehold.co/900x1100/efd8c8/4b342a?text=Pedicure",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000008",
    name: "Face Scrub and Facial",
    slug: "face-scrub-facial",
    description: "A gentle cleanse, scrub, and facial glow care for fresh, camera-ready skin.",
    category: "Skin Care",
    durationMinutes: 75,
    priceFrom: 3500,
    imageUrl: "https://placehold.co/900x1100/faeee9/4b342a?text=Facial",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000009",
    name: "Leg Washing and Scrubbing",
    slug: "leg-washing-scrubbing",
    description: "Detailed leg and foot refresh with washing, exfoliation, and soft-care finishing.",
    category: "Body Care",
    durationMinutes: 60,
    priceFrom: 2800,
    imageUrl: "https://placehold.co/900x1100/f8e9dd/4b342a?text=Leg+Care",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000010",
    name: "Children's Hair and Beauty Care",
    slug: "childrens-hair-beauty-care",
    description: "Gentle, patient, efficient care for children with calm handling and kind reassurance.",
    category: "Children",
    durationMinutes: 90,
    priceFrom: 3500,
    imageUrl: "https://placehold.co/900x1100/fde8ec/4b342a?text=Children%27s+Care",
    active: true,
    createdAt
  },
  {
    id: "10000000-0000-4000-8000-000000000011",
    name: "Home Visit Beauty Service",
    slug: "home-visit-beauty-service",
    description: "Door-to-door beauty care for busy clients who want salon-quality service at home.",
    category: "Home Visit",
    durationMinutes: 120,
    priceFrom: 6000,
    imageUrl: "https://placehold.co/900x1100/fff8f0/4b342a?text=Home+Visit",
    active: true,
    createdAt
  }
];
