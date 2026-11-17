import React from 'react';
import { GoldArrow } from './Brand.tsx';

export const MobileBottomBar: React.FC<{ onMessage: () => void }> = ({ onMessage }) => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-paper px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(20_20_20/0.08)]">
    <button
      type="button"
      onClick={onMessage}
      className="w-full flex items-center justify-center gap-4 h-12 bg-ink active:bg-black text-white text-base font-semibold"
    >
      Message a stylist <GoldArrow className="w-8" />
    </button>
  </div>
);
