import React from 'react';
import { LoftSpace } from '../types.ts';
import { Juniper } from './Juniper.tsx';

// Set like the directory board in a building lobby.
export const LoftGallery: React.FC<{ spaces: LoftSpace[] }> = ({ spaces }) => (
  <section id="lofts" className="bg-juniper text-on-dark py-24 md:py-36 scroll-mt-16 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
      <div className="lg:col-span-5 relative">
        <h2 className="font-display text-5xl sm:text-6xl leading-[1] tracking-[-0.02em]">Inside the lofts</h2>
        <p className="mt-6 text-lg leading-relaxed max-w-md">
          A front desk, one quiet hallway and a row of private suites. Your appointment happens in your stylist's
          own room, with the door closed and the music low.
        </p>
        <Juniper className="hidden lg:block w-80 mt-12 -ml-6 opacity-90" />
      </div>

      <ul className="lg:col-span-7 bg-juniper-deep px-5 sm:px-10 py-6 sm:py-8">
        {spaces.map((space) => (
          <li key={space.id} className="grid grid-cols-1 sm:grid-cols-5 gap-1 sm:gap-6 py-5">
            <h3 className="sm:col-span-2 font-display text-2xl sm:text-3xl text-gold leading-tight">{space.title}</h3>
            <p className="sm:col-span-3 text-lg leading-relaxed text-on-dark/90">{space.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
