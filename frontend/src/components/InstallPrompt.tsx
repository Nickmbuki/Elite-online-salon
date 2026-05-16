import { Download, X } from "lucide-react";
import { useState } from "react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export function InstallPrompt() {
  const { canInstall, install } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-3xl border border-champagne bg-softWhite p-4 shadow-glow">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-espresso text-ivory">
          <Download size={18} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-espresso">Install Elite Salon</p>
          <p className="mt-1 text-sm leading-6 text-cocoa">Add the booking app to your phone for quick appointments.</p>
          <button
            type="button"
            className="mt-3 rounded-full bg-espresso px-4 py-2 text-sm font-semibold text-ivory focus-ring"
            onClick={install}
          >
            Download App
          </button>
        </div>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full text-cocoa hover:bg-blush/30 focus-ring"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss install prompt"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
