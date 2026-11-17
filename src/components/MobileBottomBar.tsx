import React, { useEffect, useState } from 'react';
import { GoldArrow } from './Brand.tsx';

// Sticky phone bar. It steps aside whenever another Book button ([data-cta]) is on screen,
// so two identical buttons never stack.
export const MobileBottomBar: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [hidden, setHidden] = useState(true); // the hero's button is on screen at load

  useEffect(() => {
    const ctas = document.querySelectorAll('[data-cta]');
    if (!('IntersectionObserver' in window) || !ctas.length) return setHidden(false);
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHidden(visible.size > 0);
    });
    ctas.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`sm:hidden fixed bottom-0 inset-x-0 z-30 bg-bg/95 backdrop-blur-md border-t border-gold/30 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <button
        type="button"
        onClick={onBook}
        tabIndex={hidden ? -1 : 0}
        className="shimmer w-full flex items-center justify-center gap-4 h-12 rounded-full bg-btn text-btn-ink text-base font-semibold"
      >
        Book Appointment <GoldArrow className="w-8" />
      </button>
    </div>
  );
};
