import { AlertTriangle, Home } from "lucide-react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export function AppErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : "Something went wrong.";

  return (
    <main className="section-shell grid min-h-[70vh] place-items-center">
      <section className="max-w-2xl rounded-3xl border border-champagne bg-softWhite p-8 text-center shadow-glow">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush/40 text-espresso">
          <AlertTriangle size={24} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6">Application error</p>
        <h1 className="mt-4 font-display text-4xl text-espresso">We could not load this page cleanly.</h1>
        <p className="mt-4 text-sm leading-7 text-cocoa">{message}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-ivory shadow-glow focus-ring"
        >
          <Home size={18} aria-hidden="true" />
          Return Home
        </Link>
      </section>
    </main>
  );
}
