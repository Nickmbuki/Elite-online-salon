import { useEffect, useState } from "react";
import type { GalleryItem, Service, Testimonial } from "../types/api";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { FaqSection } from "../components/FaqSection";
import { GallerySection } from "../components/GallerySection";
import { Hero } from "../components/Hero";
import { ServicesSection } from "../components/ServicesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { galleryItems as fallbackGallery } from "../data/gallery";
import { fallbackServices } from "../data/services";
import { fallbackTestimonials } from "../data/testimonials";
import { getGallery, getServices, getTestimonials } from "../lib/api";

export function HomePage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    void getServices().then(setServices).catch(() => setServices(fallbackServices));
    void getGallery().then(setGallery).catch(() => setGallery(fallbackGallery));
    void getTestimonials().then(setTestimonials).catch(() => setTestimonials(fallbackTestimonials));
  }, []);

  return (
    <>
      <Hero />
      <ServicesSection services={services} />
      <GallerySection items={gallery} />
      <AboutSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <ContactSection />
    </>
  );
}
