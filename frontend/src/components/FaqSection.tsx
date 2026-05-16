import { SectionHeading } from "./SectionHeading";

const faqs = [
  {
    question: "Do you offer home visits?",
    answer: "Yes. Select home visit during booking and enter the address so the appointment can be prepared correctly."
  },
  {
    question: "Can I book for a child?",
    answer: "Yes. Children are handled gently, patiently, and efficiently, with calm reassurance throughout the appointment."
  },
  {
    question: "Why do unavailable times disappear?",
    answer: "The booking system checks service duration, working hours, blocked time, and existing appointments before showing slots."
  },
  {
    question: "What happens if two people book at once?",
    answer: "The backend uses a booking transaction and database overlap constraint. The second request receives a clear conflict error."
  }
];

export function FaqSection() {
  return (
    <section>
      <div className="section-shell">
        <SectionHeading eyebrow="FAQ" title="Clear booking rules and gentle care" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-champagne rounded-3xl border border-champagne bg-softWhite shadow-soft">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="cursor-pointer list-none font-semibold text-espresso focus-ring">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-cocoa">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
