import { motion } from "framer-motion";
import type { GalleryItem } from "../types/api";
import { SectionHeading } from "./SectionHeading";

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section id="gallery">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Gallery"
          title="Inclusive beauty references for the owner to replace"
          copy="Tasteful placeholder image data is kept in a gallery config file, with accessible descriptions for diverse clients, children, bridal styling, nails, facials, and leg care."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.figure
              key={item.id}
              className="overflow-hidden rounded-3xl border border-champagne bg-softWhite shadow-soft"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
            >
              <img src={item.imageUrl} alt={item.altText} className="aspect-[4/5] w-full object-cover" />
              <figcaption className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-roseGold">{item.category}</p>
                <p className="mt-2 font-display text-xl text-espresso">{item.title}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
