import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock, Home, Loader2, MapPin } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { BookingRequest, Service, TimeSlot } from "@elite-doorstep-salon/shared";
import { fallbackServices } from "../data/services";
import { createBooking, getAvailability, getServices } from "../lib/api";

const emptyForm = {
  clientName: "",
  phone: "",
  email: "",
  address: "",
  occasion: "",
  notes: ""
};

function todayIso() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);
}

export function BookingPage() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [serviceId, setServiceId] = useState(fallbackServices[0]?.id ?? "");
  const [appointmentDate, setAppointmentDate] = useState(todayIso());
  const [locationType, setLocationType] = useState<"home" | "salon">("home");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedService = useMemo(() => services.find((service) => service.id === serviceId), [serviceId, services]);
  const selectedTimeSlot = slots.find((slot) => slot.startTime === selectedSlot);

  useEffect(() => {
    void getServices()
      .then((records) => {
        setServices(records);
        setServiceId((current) => current || records[0]?.id || "");
      })
      .catch(() => setServices(fallbackServices));
  }, []);

  useEffect(() => {
    if (!serviceId || !appointmentDate) {
      return;
    }

    setLoadingSlots(true);
    setSelectedSlot("");
    setError("");

    void getAvailability(appointmentDate, serviceId)
      .then(setSlots)
      .catch((availabilityError: Error) => {
        setSlots([]);
        setError(availabilityError.message || "Availability is not available right now.");
      })
      .finally(() => setLoadingSlots(false));
  }, [appointmentDate, serviceId]);

  function updateForm(field: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!selectedSlot || !selectedTimeSlot) {
      setError("Choose an available time slot before booking.");
      return;
    }

    if (locationType === "home" && !form.address.trim()) {
      setError("Enter your address for a home visit.");
      return;
    }

    const payload: BookingRequest = {
      clientName: form.clientName,
      phone: form.phone,
      email: form.email || undefined,
      serviceId,
      locationType,
      appointmentDate,
      startTime: selectedSlot,
      address: form.address || undefined,
      occasion: form.occasion || undefined,
      notes: form.notes || undefined
    };

    setSubmitting(true);
    try {
      const booking = await createBooking(payload);
      setMessage(`Booking requested for ${booking.appointmentDate} from ${booking.startTime} to ${booking.endTime}.`);
      setForm(emptyForm);
      setSelectedSlot("");
      const updatedSlots = await getAvailability(appointmentDate, serviceId);
      setSlots(updatedSlots);
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "Booking failed. Please try another slot.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="section-shell">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Book online</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-espresso">Reserve your salon time</h1>
        <p className="mt-5 text-lg leading-8 text-cocoa">
          Select a service, date, live available time slot, and visit type. Busy periods are removed automatically.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-3xl border border-champagne bg-softWhite p-6 shadow-soft">
          <h2 className="font-display text-3xl text-espresso">Booking steps</h2>
          <div className="mt-6 space-y-4">
            {[
              [CalendarDays, "Choose service and date"],
              [Clock, "Pick a visible available slot"],
              [MapPin, "Add visit details"],
              [CheckCircle2, "Submit pending booking"]
            ].map(([Icon, label], index) => (
              <motion.div
                key={label as string}
                className="flex items-center gap-3 rounded-2xl bg-ivory p-4"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-blush/40 text-espresso">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-espresso">{label as string}</span>
              </motion.div>
            ))}
          </div>

          {selectedService ? (
            <div className="mt-6 rounded-3xl bg-espresso p-5 text-ivory">
              <p className="text-sm uppercase tracking-[0.2em] text-champagne">Selected service</p>
              <p className="mt-3 font-display text-3xl">{selectedService.name}</p>
              <p className="mt-3 text-sm leading-7 text-champagne">{selectedService.durationMinutes} minutes from KSh {selectedService.priceFrom.toLocaleString()}</p>
            </div>
          ) : null}
        </aside>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-champagne bg-softWhite p-5 shadow-glow sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-espresso">Service</span>
              <select
                value={serviceId}
                onChange={(event) => setServiceId(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 text-espresso focus-ring"
                required
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-espresso">Day/date</span>
              <input
                type="date"
                min={todayIso()}
                value={appointmentDate}
                onChange={(event) => setAppointmentDate(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 text-espresso focus-ring"
                required
              />
            </label>
          </div>

          <div className="mt-6">
            <span className="text-sm font-semibold text-espresso">Available time slot</span>
            <div className="mt-3 grid min-h-24 grid-cols-2 gap-3 sm:grid-cols-4">
              {loadingSlots ? (
                <div className="col-span-full flex items-center gap-3 rounded-2xl bg-ivory p-4 text-cocoa">
                  <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                  Loading availability
                </div>
              ) : slots.length > 0 ? (
                slots.map((slot) => (
                  <button
                    key={`${slot.startTime}-${slot.endTime}`}
                    type="button"
                    onClick={() => setSelectedSlot(slot.startTime)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition focus-ring ${
                      selectedSlot === slot.startTime
                        ? "border-espresso bg-espresso text-ivory"
                        : "border-champagne bg-ivory text-espresso hover:border-roseGold"
                    }`}
                  >
                    {slot.startTime}
                  </button>
                ))
              ) : (
                <p className="col-span-full rounded-2xl bg-ivory p-4 text-sm text-cocoa">
                  No available slots for this date and service.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <span className="text-sm font-semibold text-espresso">Location type</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["home", "Home visit"],
                ["salon", "Salon visit"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLocationType(value as "home" | "salon")}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold focus-ring ${
                    locationType === value
                      ? "border-espresso bg-espresso text-ivory"
                      : "border-champagne bg-ivory text-espresso hover:border-roseGold"
                  }`}
                >
                  <Home size={17} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-espresso">Name</span>
              <input className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 focus-ring" value={form.clientName} onChange={(event) => updateForm("clientName", event.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-espresso">Phone</span>
              <input className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 focus-ring" value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-espresso">Optional email</span>
              <input type="email" className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 focus-ring" value={form.email} onChange={(event) => updateForm("email", event.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-espresso">Occasion</span>
              <select className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 focus-ring" value={form.occasion} onChange={(event) => updateForm("occasion", event.target.value)}>
                <option value="">Select occasion</option>
                <option>Wedding</option>
                <option>Interview</option>
                <option>Graduation</option>
                <option>Corporate occasion</option>
                <option>Photoshoot</option>
                <option>Date night</option>
                <option>General beauty care</option>
                <option>Children's care</option>
              </select>
            </label>
          </div>

          <AnimatePresence>
            {locationType === "home" ? (
              <motion.label
                className="mt-6 block"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <span className="text-sm font-semibold text-espresso">Address for home visit</span>
                <input className="mt-2 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 focus-ring" value={form.address} onChange={(event) => updateForm("address", event.target.value)} required />
              </motion.label>
            ) : null}
          </AnimatePresence>

          <label className="mt-6 block">
            <span className="text-sm font-semibold text-espresso">Notes</span>
            <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-champagne bg-ivory px-4 py-3 focus-ring" value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} placeholder="Hair texture, child care needs, parking notes, preferred style, or timing notes." />
          </label>

          {error ? <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p> : null}
          {message ? <p className="mt-5 rounded-2xl bg-green-50 p-4 text-sm text-green-700">{message}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-sm font-semibold text-ivory shadow-glow transition hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-60 focus-ring"
          >
            {submitting ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
            Request Booking
          </button>
        </form>
      </div>
    </main>
  );
}
