import React from 'react';
import { GoldArrow } from './Brand.tsx';

export const MobileBottomBar: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-bg/95 backdrop-blur-md border-t border-gold/30 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
    <button
      type="button"
      onClick={onBook}
      className="shimmer w-full flex items-center justify-center gap-4 h-12 rounded-full bg-btn text-btn-ink text-base font-semibold"
    >
      Book Appointment <GoldArrow className="w-8" />
    </button>
  </div>
);
