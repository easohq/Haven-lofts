import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Stylist } from '../types.ts';

const LINKS = [
  { href: '#today', label: 'Today' },
  { href: '#stylists', label: 'Sara & Leah' },
  { href: '#space', label: 'The space' },
  { href: '#visit', label: 'Visit' },
];

interface NavbarProps {
  stylists: Stylist[];
  onOpenPhoneMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ stylists, onOpenPhoneMenu }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <img src="/haven_lofts_logo.jpg" alt="" className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover" />
          <span className="font-display text-2xl sm:text-3xl leading-none">Haven Lofts</span>
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-[15px] text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPhoneMenu}
            className="hidden sm:inline-flex items-center h-11 px-5 bg-sage hover:bg-sage-dark active:scale-[0.97] text-white text-[15px] font-semibold transition"
          >
            Call or text to book
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-11 h-11 bg-field active:scale-95 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden bg-field px-4 pb-6 pt-2">
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 font-display text-3xl">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {stylists.map((s) => (
              <a key={s.id} href={`tel:${s.phoneRaw}`} className="flex items-center justify-center h-12 bg-sage text-white font-semibold">
                Call {s.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
