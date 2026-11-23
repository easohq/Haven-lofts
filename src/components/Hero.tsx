import React from 'react';
import { SalonInfo } from '../types.ts';
import { PHOTOS } from '../data/photos.ts';

// The front page is the room itself: the lounge, edge to edge, as a real photo (not a CSS background),
// with only the name over its darker lower edge. Phones get the upright shot of the same corner.
export const Hero: React.FC<{ salonInfo: SalonInfo; onBook: () => void }> = ({ salonInfo }) => (
  <section id="top" className="relative h-[calc(100svh-72px)] min-h-[520px] max-h-[1100px] overflow-hidden bg-olive-deep">
    <picture className="hero-photo absolute inset-0">
      <source media="(max-width: 767px)" srcSet="/photos/lounge-640.webp 640w, /photos/lounge-1280.webp 1280w" sizes="100vw" />
      <img
        src="/photos/lounge-coffee-1280.webp"
        srcSet="/photos/lounge-coffee-1280.webp 1706w, /photos/lounge-coffee-2048.webp 2730w"
        sizes="100vw"
        alt={PHOTOS['lounge-coffee'].alt}
        fetchPriority="high"
        className="w-full h-full object-cover object-[50%_45%]"
      />
    </picture>
    <div className="hero-scrim absolute inset-0" aria-hidden="true" />

    <div className="relative h-full max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 flex items-end pb-28 sm:pb-16 lg:pb-20">
      <h1 data-reveal className="display text-[clamp(4rem,11vw,10rem)] text-[#F6EFE4]">
        {salonInfo.name}
      </h1>
    </div>
  </section>
);
