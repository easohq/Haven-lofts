import React from 'react';
import { LoftSpace } from '../types.ts';

interface LoftGalleryProps {
  spaces: LoftSpace[];
}

export const LoftGallery: React.FC<LoftGalleryProps> = ({ spaces }) => (
  <section id="space" className="py-24 md:py-36 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h2 className="font-display font-medium text-6xl sm:text-7xl leading-[0.95] tracking-[-0.02em]">The space</h2>
        <p className="mt-8 text-lg leading-relaxed max-w-md">
          Haven Lofts is a building of private salon suites along one quiet hallway, with a front desk to greet you
          and a room set aside for spray tanning. Your appointment happens in your stylist's own suite, never on a
          busy salon floor.
        </p>
        <p className="mt-10 font-display text-[clamp(5rem,12vw,10rem)] leading-[0.8] text-sage [font-variant-numeric:lining-nums]">{spaces.length}</p>
        <p className="mt-4 text-lg">rooms under one roof</p>
      </div>

      <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 self-center">
        {spaces.map((space) => (
          <li key={space.id} className="bg-field p-6">
            <h3 className="font-display text-3xl leading-tight">{space.title}</h3>
            <p className="mt-2 text-base leading-relaxed">{space.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
