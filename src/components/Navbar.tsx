import React, { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { GoldArrow, Logo } from './Brand.tsx';
import { Drawer } from './Drawer.tsx';
import { toggleTheme } from '../utils/theme.ts';
import { mapsUrl } from '../utils/maps.ts';

const LINKS = [
  { href: '#space', label: 'The rooms' },
  { href: '#services', label: 'Services' },
  { href: '#stylists', label: 'Sara & Leah' },
  { href: '#spray-tan', label: 'Spray tan' },
  { href: '#visit', label: 'Visit' },
];

/** Smooth-scroll to a section and keep the address bar in step. */
function goTo(e: React.MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  const target = hash && document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  then?.();
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  history.replaceState(null, '', hash);
}

export const ThemeToggle: React.FC = () => (
  <button type="button" onClick={toggleTheme} aria-label="Switch between light and dark mode" className="icon-btn">
    {/* The icon of the mode you'd switch to; CSS picks it so it's right before React runs. */}
    <Moon className="w-[18px] h-[18px] logo-for-light" aria-hidden="true" />
    <Sun className="w-[18px] h-[18px] logo-for-dark" aria-hidden="true" />
  </button>
);

/** Which section is in the middle of the screen right now, for the nav's "you are here" mark. */
function useCurrentSection() {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }, // a thin band across the middle of the viewport
    );
    ['top', ...LINKS.map((l) => l.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return current;
}

export const Navbar: React.FC<{ salonInfo: SalonInfo; onBook: () => void }> = ({ salonInfo, onBook }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = useCurrentSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav-material sticky top-0 z-40 text-ink" data-scrolled={scrolled || undefined}>
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-6">
        <a href="#top" onClick={(e) => goTo(e)} className="shrink-0" aria-label="Haven Lofts, back to top">
          <Logo alt="" className="h-14 sm:h-[60px] w-auto -my-1" />
        </a>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-10 ml-auto mr-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => goTo(e)}
              aria-current={current === l.href ? 'location' : undefined}
              className="nav-link font-bold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button type="button" onClick={onBook} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Book Appointment
          </button>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-haspopup="dialog" className="icon-btn lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} labelledBy="menu-title">
        <div className="min-h-full flex flex-col px-7 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex items-center justify-between">
            <h2 id="menu-title" className="display text-3xl">Menu</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="icon-btn">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-12 flex flex-col gap-2">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => goTo(e, () => setOpen(false))} className="group py-3">
                <span className="display block text-5xl transition-[transform,color] duration-500 group-hover:text-cognac group-hover:translate-x-1">
                  {l.label}
                </span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onBook();
            }}
            className="btn btn-primary mt-10 w-full"
          >
            Book Appointment <GoldArrow className="w-9" />
          </button>

          <div className="mt-auto pt-12">
            <div className="flex items-end justify-between gap-6">
              <a href={mapsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="text-ink-soft leading-relaxed hover:text-ink transition-colors">
                {salonInfo.street}, {salonInfo.suite}
                <br />
                {salonInfo.city}, MN {salonInfo.zip}
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
