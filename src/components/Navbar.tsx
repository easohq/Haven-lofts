import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './Brand.tsx';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#stylists', label: 'Stylists' },
  { href: '#visit', label: 'Visit' },
];

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('haven-theme', next);
    } catch {
      // Private browsing: the choice just won't be remembered.
    }
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vt = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
  if (vt && !reduce) vt.call(document, apply);
  else apply();
}

/** Close the menu first, then scroll: closing shrinks the sticky header, which would otherwise throw off where the page lands. */
function goTo(e: React.MouseEvent<HTMLAnchorElement>, close: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  const target = hash && document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  close();
  requestAnimationFrame(() => {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    history.replaceState(null, '', hash);
  });
}

const ThemeToggle: React.FC = () => (
  <button
    type="button"
    onClick={toggleTheme}
    aria-label="Switch between light and dark mode"
    className="glow flex items-center justify-center w-11 h-11 rounded-full border border-gold/60 text-gold-ink hover:text-ink transition-colors"
  >
    {/* Show the icon of the mode you'd switch to; CSS picks it so it matches before React runs. */}
    <Moon className="w-[18px] h-[18px] logo-for-light" aria-hidden="true" />
    <Sun className="w-[18px] h-[18px] logo-for-dark" aria-hidden="true" />
  </button>
);

export const Navbar: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-gold/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4">
        <a href="#top" onClick={(e) => goTo(e, () => setOpen(false))} className="shrink-0" aria-label="Haven Lofts, back to top">
          <Logo alt="" className="h-14 sm:h-[60px] w-auto -my-1" />
        </a>

        <nav aria-label="Main" className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => goTo(e, () => setOpen(false))} className="label !text-ink-soft hover:!text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={onBook}
            className="shimmer hidden sm:inline-flex items-center h-11 px-6 rounded-full bg-btn text-btn-ink font-semibold active:scale-[0.97] transition"
          >
            Book Appointment
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-bg-alt active:scale-95 transition"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="md:hidden bg-bg-alt border-t border-gold/25 px-4 pb-6 pt-2 flex flex-col">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => goTo(e, () => setOpen(false))} className="py-3 font-display font-semibold text-3xl">
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="mt-4 h-12 rounded-full bg-btn text-btn-ink font-semibold"
          >
            Book Appointment
          </button>
        </nav>
      )}
    </header>
  );
};
