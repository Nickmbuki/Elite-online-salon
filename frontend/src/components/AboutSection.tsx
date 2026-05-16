import { motion } from "framer-motion";
import { Baby, CalendarHeart, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section className="bg-espresso text-ivory">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://placehold.co/900x1100/f5dfc6/3f2a24?text=Expert+Salonist"
            alt="Placeholder portrait of the expert salonist prepared for a home visit appointment"
            className="max-h-[38rem] w-full rounded-[2rem] object-cover shadow-glow"
          />
        </motion.div>
        <div>
          <SectionHeading
            eyebrow="About the salonist"
            title="Experienced hands for milestone days and regular care"
            copy="The salonist brings years of calm, precise preparation for weddings, interviews, graduations, corporate occasions, photoshoots, date nights, and routine beauty care."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: CalendarHeart,
                title: "Occasion ready",
                copy: "Timelines are respected so the client is polished before the event begins."
              },
              {
                icon: Baby,
                title: "Gentle with children",
                copy: "Children are handled gently, patiently, and efficiently, with experience calming them with care."
              },
              {
                icon: ShieldCheck,
                title: "Doorstep comfort",
                copy: "Home visit services are organized, respectful, and prepared for a clean setup."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-champagne/20 bg-ivory/10 p-5">
                <item.icon className="text-champagne" size={24} aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-champagne">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
