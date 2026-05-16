import { motion } from "framer-motion";
import { CalendarCheck, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="section-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 pb-12 lg:grid-cols-[1fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">Premium door-to-door beauty care</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] text-espresso sm:text-6xl lg:text-7xl">
            Elite Doorstep Salon
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cocoa">
            A refined mobile salon experience for weddings, interviews, graduations, corporate occasions,
            photoshoots, date nights, children, and everyday beauty care.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-sm font-semibold text-ivory shadow-glow transition hover:bg-cocoa focus-ring"
            >
              <CalendarCheck size={18} aria-hidden="true" />
              Book Appointment
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-roseGold/40 bg-softWhite px-6 py-4 text-sm font-semibold text-espresso transition hover:border-roseGold hover:shadow-soft focus-ring"
            >
              <Sparkles size={18} aria-hidden="true" />
              Explore Services
            </a>
          </div>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["7+ years", "occasion styling"],
              ["Home visits", "comfort first"],
              ["Children", "gentle care"]
            ].map(([value, label]) => (
              <div key={value} className="rounded-3xl border border-champagne bg-softWhite/80 p-5 shadow-soft">
                <dt className="font-display text-3xl text-espresso">{value}</dt>
                <dd className="mt-1 text-sm text-cocoa">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-champagne bg-softWhite p-3 shadow-glow">
            <img
              src="https://placehold.co/1000x1250/f6ded5/3f2a24?text=Elegant+Doorstep+Salon"
              alt="Placeholder portrait of a diverse salon client with elegant finished styling"
              className="h-[34rem] w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-5 rounded-3xl border border-champagne bg-ivory/95 p-5 shadow-soft backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blush/50 text-espresso">
                <Home size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-espresso">Salon quality at your door</p>
                <p className="text-sm text-cocoa">Prepared, punctual, polished service for your occasion.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
