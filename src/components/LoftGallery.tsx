import React from 'react';
import { LoftSpace } from '../types.ts';
import { Wallpaper } from './Brand.tsx';

// Set like the directory board in a building lobby.
export const LoftGallery: React.FC<{ spaces: LoftSpace[] }> = ({ spaces }) => {
  // The four salon suites read as one line; each is styled by its own stylist.
  const salons = spaces.filter((s) => s.id.startsWith('salon-'));
  const rows = [
    ...spaces.filter((s) => !s.id.startsWith('salon-')).map((s) => ({ id: s.id, title: s.title, text: s.subtitle })),
  ];
  if (salons.length) {
    rows.splice(2, 0, {
      id: 'salons',
      title: `Salons 1–${salons.length}`,
      text: `${salons.length} private suites, each styled by the stylist who works in it.`,
    });
  }

  return (
  <section id="suites" className="bg-green text-on-dark py-24 md:py-36 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
      <div className="lg:col-span-5">
        <h2 className="font-display font-semibold text-5xl sm:text-6xl leading-[1]">The suites</h2>
        <p className="mt-6 text-lg leading-relaxed max-w-md">
          Every suite is set up by the stylist who works in it, so no two rooms look alike. Between them: a front
          desk, one quiet hallway, wood paneling, warm lights and the floral wall.
        </p>
        <div className="hidden lg:block mt-12 border-2 border-gold p-2 w-72">
          <Wallpaper className="block w-full h-72" />
        </div>
      </div>

      <ul className="lg:col-span-7 bg-green-deep px-5 sm:px-10 py-6 sm:py-8">
        {rows.map((space) => (
          <li key={space.id} className="grid grid-cols-1 sm:grid-cols-5 gap-1 sm:gap-6 py-5">
            <h3 className="sm:col-span-2 font-display font-semibold text-2xl sm:text-3xl text-gold leading-tight">{space.title}</h3>
            <p className="sm:col-span-3 text-lg leading-relaxed text-on-dark/90">{space.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
};
