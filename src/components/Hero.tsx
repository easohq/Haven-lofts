import React from 'react';
import { MapPin } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { AppointmentSeal, GoldArrow } from './Brand.tsx';
import { mapsUrl } from '../utils/maps.ts';
import { PHOTOS } from '../data/photos.ts';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// The first thing you see is the room itself: the lounge, full-bleed, with the words set into its
// darker lower edge. Phones get the upright shot of the same corner.
export const Hero: React.FC<{ salonInfo: SalonInfo; onBook: () => void }> = ({ salonInfo, onBook }) => (
  <section id="top" className="relative h-[calc(100svh-72px)] min-h-[600px] max-h-[1100px] overflow-hidden bg-olive-deep text-[#F6EFE4]">
    <picture className="hero-photo absolute inset-0">
      <source
        media="(max-width: 767px)"
        srcSet="/photos/lounge-640.webp 640w, /photos/lounge-1280.webp 1280w"
        sizes="100vw"
      />
      <img
        src="/photos/lounge-coffee-1280.webp"
        srcSet="/photos/lounge-coffee-1280.webp 1706w, /photos/lounge-coffee-2048.webp 2730w"
        sizes="100vw"
        alt={PHOTOS['lounge-coffee'].alt}
        fetchPriority="high"
        className="w-full h-full object-cover object-[50%_40%]"
      />
    </picture>
    <div className="hero-scrim absolute inset-0" aria-hidden="true" />

    <div className="relative h-full max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-14 sm:pb-16 lg:pb-20">
      <h1 data-reveal className="display text-[clamp(3.25rem,8vw,7.75rem)]">
        Unhurried hair,
        <br />
        made cozy.
      </h1>
      <p data-reveal style={d(90)} className="text-lg sm:text-xl leading-[1.6] mt-6 max-w-lg text-[#F6EFE4]/90">
        A boho, vintage-modern salon in {salonInfo.city}, Minnesota, owned by stylists {salonInfo.coFounders}.
        Pull up a leather chair, pour a coffee, stay a while.
      </p>

      <div data-reveal style={d(180)} className="flex flex-wrap items-center gap-x-8 gap-y-5 mt-9">
        <button type="button" onClick={onBook} data-cta className="btn btn-gold text-lg">
          Book Appointment <GoldArrow className="w-9" />
        </button>
        <a href="#space" className="link-u link-light text-lg font-semibold">
          Take a look inside
        </a>
      </div>

      <a
        href={mapsUrl(salonInfo)}
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        style={d(270)}
        className="group hidden sm:inline-flex items-start gap-3 mt-10 text-[#F6EFE4]/80 hover:text-[#F6EFE4] transition-colors duration-300 self-start"
      >
        <MapPin className="w-5 h-5 text-[#E9CF95] shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          {salonInfo.street}, {salonInfo.suite}, {salonInfo.city}, MN {salonInfo.zip}
        </span>
      </a>

      <AppointmentSeal className="hidden md:flex absolute right-8 lg:right-12 bottom-16 lg:bottom-20 w-32 h-32" />
    </div>
  </section>
);
