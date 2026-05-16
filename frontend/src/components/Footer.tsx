import { Scissors } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-champagne bg-espresso text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory text-espresso">
            <Scissors size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-xl">Elite Doorstep Salon</p>
            <p className="text-sm text-champagne">Luxury beauty care, at home or in salon.</p>
          </div>
        </div>
        <p className="text-sm text-champagne">Never commit secrets. Replace placeholder images before launch.</p>
      </div>
    </footer>
  );
}
