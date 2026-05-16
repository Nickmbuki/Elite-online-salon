import { motion } from "framer-motion";
import { Baby, Brush, HandHeart, Home, Sparkles } from "lucide-react";
import type { Service } from "@elite-doorstep-salon/shared";
import { SectionHeading } from "./SectionHeading";

const categoryIcons = {
  Hair: Brush,
  Bridal: Sparkles,
  Nails: HandHeart,
  Children: Baby,
  "Home Visit": Home,
  "Skin Care": Sparkles,
  "Body Care": HandHeart
};

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-softWhite">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Prepared for every beautiful occasion"
          copy="Choose polished hair, braids, bridal styling, nails, facials, leg care, children’s care, and calm home visit beauty services."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = categoryIcons[service.category as keyof typeof categoryIcons] ?? Sparkles;

            return (
              <motion.article
                key={service.id}
                className="group rounded-3xl border border-champagne bg-ivory p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-glow"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush/35 text-espresso">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-champagne/70 px-3 py-1 text-xs font-semibold text-espresso">
                    From KSh {service.priceFrom.toLocaleString()}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl text-espresso">{service.name}</h3>
                <p className="mt-3 min-h-24 text-sm leading-7 text-cocoa">{service.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-champagne pt-4 text-sm text-cocoa">
                  <span>{service.category}</span>
                  <span>{service.durationMinutes} min</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
