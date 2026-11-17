import React from 'react';
import { SalonInfo } from '../types.ts';
import { GoldArrow } from './Brand.tsx';

// The close is the poster: gold frame, logo, "By appointment only", the arrow.
export const Footer: React.FC<{ salonInfo: SalonInfo; onMessage: () => void }> = ({ salonInfo, onMessage }) => (
  <footer className="bg-paper pt-8 pb-28 md:pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-2 border-gold px-6 py-14 sm:py-20 flex flex-col items-center text-center">
        <img src="/haven-lofts-logo.png" alt="Haven Lofts" className="w-full max-w-[440px] h-auto" />
        <p className="caps text-xl sm:text-3xl mt-8">By appointment only</p>
        <button
          type="button"
          onClick={onMessage}
          className="inline-flex items-center gap-4 h-14 px-8 mt-10 bg-ink hover:bg-black active:scale-[0.97] text-white text-lg font-semibold transition"
        >
          Message a stylist <GoldArrow className="w-9" />
        </button>
        <address className="not-italic mt-12 text-lg leading-relaxed">
          {salonInfo.street}, {salonInfo.suite}
          <br />
          {salonInfo.city}, MN {salonInfo.zip}
        </address>
      </div>
      <p className="mt-8 text-muted">© {new Date().getFullYear()} Haven Lofts, Lakeville, Minnesota</p>
    </div>
  </footer>
);
