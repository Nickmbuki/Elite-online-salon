import { Menu, Scissors, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Booking" },
  { href: "/share", label: "Share" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-champagne/60 bg-ivory/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3 text-espresso focus-ring rounded-full">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-espresso text-ivory shadow-soft">
            <Scissors size={20} aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl leading-5">Elite Doorstep</span>
            <span className="block text-xs uppercase tracking-[0.22em] text-roseGold">Salon</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-champagne bg-softWhite/80 p-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-cocoa transition hover:bg-blush/30 hover:text-espresso focus-ring"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/booking"
          className="hidden rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-ivory shadow-glow transition hover:bg-cocoa focus-ring lg:inline-flex"
        >
          Book Now
        </Link>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-champagne bg-softWhite text-espresso focus-ring lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-champagne bg-ivory px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-cocoa hover:bg-blush/30 focus-ring"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
