import { Star } from "lucide-react";
import type { Testimonial } from "@elite-doorstep-salon/shared";
import { SectionHeading } from "./SectionHeading";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="bg-softWhite">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Warm, careful service clients remember"
          copy="Reviews emphasize punctuality, calm handling, and polished results for home visits, children, and important occasions."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-3xl border border-champagne bg-ivory p-6 shadow-soft">
              <div className="flex gap-1 text-roseGold" aria-label={`${testimonial.rating} star rating`}>
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-cocoa">“{testimonial.message}”</p>
              <p className="mt-5 font-semibold text-espresso">{testimonial.name}</p>
              {testimonial.occasion ? <p className="text-sm text-roseGold">{testimonial.occasion}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
