import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#hours', label: 'Hours' },
  { href: '#stylists', label: 'Stylists' },
  { href: '#suites', label: 'The suites' },
  { href: '#visit', label: 'Visit' },
];

export const Navbar: React.FC<{ onMessage: () => void }> = ({ onMessage }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <a href="#top" className="shrink-0">
          <img src="/haven-lofts-logo.png" alt="Haven Lofts, back to top" className="h-12 sm:h-14 w-auto" />
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-base text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMessage}
            className="hidden sm:inline-flex items-center h-11 px-5 bg-ink hover:bg-black active:scale-[0.97] text-white font-semibold transition"
          >
            Message a stylist
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-11 h-11 bg-stone active:scale-95 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="md:hidden bg-stone px-4 pb-6 pt-2 flex flex-col">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 font-display font-semibold text-3xl">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
