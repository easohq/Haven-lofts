import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { GoldArrow } from './Brand.tsx';
import { Photo } from './Photo.tsx';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// The front page is the lounge itself: its deep green wall, the name set large, and the real lounge photo
// filling the other half of the screen.
export const Hero: React.FC<{ salonInfo: SalonInfo; stylists: Stylist[]; onBook: (stylistId?: string) => void }> = ({ salonInfo, stylists, onBook }) => (
  <section id="top" className="on-dark relative overflow-hidden bg-forest text-on-forest">

    <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-20 sm:pt-12 lg:pt-14 lg:pb-14 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-9 lg:gap-y-14 items-center">
      <div className="lg:col-span-6 relative z-10 lg:pt-10 order-2 lg:order-none">
        <h1 data-reveal className="display text-[clamp(3.75rem,11vw,9.5rem)]">
          Haven
          <br />
          Lofts
        </h1>
        <p data-reveal style={d(90)} className="mt-7 text-lg sm:text-xl leading-[1.55] max-w-md font-medium">
          Two stylists, a private room each, and a lounge with good coffee. By appointment, in {salonInfo.city}.
        </p>
        <div data-reveal style={d(170)} className="mt-9 flex flex-wrap gap-3">
          {stylists.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onBook(s.id)}
              data-cta
              className={`btn ${i === 0 ? 'btn-brass' : 'btn-cream'} text-lg`}
            >
              Book with {s.name} <GoldArrow className="w-8" />
            </button>
          ))}
        </div>
      </div>

      {/* The real lounge, large: on phones it comes first, so the space leads before the words. */}
      <div className="hero-settle order-1 lg:order-none lg:col-span-6 lg:col-start-7 relative w-full mt-2 lg:mt-0">
        <div className="relative" data-reveal style={d(120)}>
          <Photo id="lounge" priority sizes="(min-width:1024px) 46vw, 92vw" className="sleeve w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-auto lg:h-[calc(100svh-72px-7rem)] lg:min-h-[520px] lg:max-h-[780px]" imgClassName="object-[50%_62%]" />
        </div>
      </div>
    </div>
  </section>
);
