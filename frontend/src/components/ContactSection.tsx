import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="bg-champagne/35">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Beauty care that comes to your schedule"
          copy="Use the booking page for available slots. The owner can replace these contact placeholders before launch."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-champagne bg-softWhite p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Phone, "Phone", "+254 700 000 000"],
                [Mail, "Email", "hello@elitedoorstepsalon.com"],
                [MapPin, "Service area", "Salon visits and local home visits"],
                [Clock, "Hours", "Mon-Fri 8:30-18:00, Sat 9:00-16:00"]
              ].map(([Icon, label, value]) => (
                <div key={label as string} className="rounded-2xl bg-ivory p-4">
                  <Icon className="text-roseGold" size={22} aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold text-espresso">{label as string}</p>
                  <p className="mt-1 text-sm text-cocoa">{value as string}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-espresso p-6 text-ivory shadow-glow">
            <p className="font-display text-3xl">Ready for your occasion?</p>
            <p className="mt-4 text-sm leading-7 text-champagne">
              Book hair, nails, face scrubs, facials, leg washing, leg scrubbing, children’s beauty care, or a full home visit service.
            </p>
            <Link
              to="/booking"
              className="mt-6 inline-flex rounded-full bg-ivory px-5 py-3 text-sm font-semibold text-espresso focus-ring"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
