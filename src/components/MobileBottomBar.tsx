import React, { useEffect, useState } from 'react';
import { GoldArrow } from './Brand.tsx';

// Sticky phone bar, behaving like a phone's own toolbar: it slides away while you scroll down to read, so it
// never sits over a heading, and comes back when you scroll up or reach the bottom. It also steps aside
// whenever another Book button ([data-cta]) is on screen, so two identical buttons never stack.
export const MobileBottomBar: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [ctaVisible, setCtaVisible] = useState(true); // the hero's buttons are on screen at load
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    const ctas = document.querySelectorAll('[data-cta]');
    if (!('IntersectionObserver' in window) || !ctas.length) return setCtaVisible(false);
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setCtaVisible(visible.size > 0);
    });
    ctas.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = y + innerHeight >= document.documentElement.scrollHeight - 8;
      if (Math.abs(y - last) > 6) setScrollingDown(y > last && !atEnd);
      if (atEnd) setScrollingDown(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hidden = ctaVisible || scrollingDown;

  return (
    <div
      aria-hidden={hidden}
      className={`sm:hidden fixed bottom-0 inset-x-0 z-30 sheet-bar px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease)] motion-reduce:transition-none ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <button type="button" onClick={onBook} tabIndex={hidden ? -1 : 0} className="btn btn-primary w-full !h-12">
        Book Appointment <GoldArrow className="w-8" />
      </button>
    </div>
  );
};
