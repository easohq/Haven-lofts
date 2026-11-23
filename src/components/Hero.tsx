import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { GoldArrow } from './Brand.tsx';
import { Photo } from './Photo.tsx';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// The front page is the living room: a mustard field, the name set huge like a record title, and the real
// lounge photo as the album sleeve with its record sliding out. Three warm stripes run behind the sleeve.
export const Hero: React.FC<{ salonInfo: SalonInfo; stylists: Stylist[]; onBook: (stylistId?: string) => void }> = ({ salonInfo, stylists, onBook }) => (
  <section id="top" className="on-mustard relative overflow-hidden bg-mustard text-on-mustard">
    <div className="stripes absolute inset-x-0 top-[170px] h-20 sm:top-[220px] sm:h-24 lg:top-auto lg:bottom-[7%] lg:h-28" aria-hidden="true" />

    <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-24 sm:pt-14 lg:pt-16 lg:pb-40 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-9 lg:gap-y-14 items-start">
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
              className={`btn ${i === 0 ? 'btn-primary' : 'btn-olive'} text-lg`}
            >
              Book with {s.name} <GoldArrow className="w-8" />
            </button>
          ))}
        </div>
      </div>

      {/* The sleeve: the real lounge, with the record (label and all) slid out of its right edge.
          On phones the room comes first, so the space leads before the words. */}
      <div className="order-1 lg:order-none lg:col-span-5 lg:col-start-7 relative w-[74%] sm:w-[60%] lg:w-full max-w-[460px] lg:mr-[18%] justify-self-start lg:justify-self-center mt-2 lg:mt-0">
        <div className="record-out absolute top-[8%] right-[-48%] w-[88%] aspect-square" aria-hidden="true">
          <div className="record record-spin w-full h-full" />
        </div>
        <div className="relative" data-reveal style={d(120)}>
          <Photo id="lounge" priority sizes="(min-width:1024px) 520px, 88vw" className="sleeve w-full aspect-[4/5]" imgClassName="object-[50%_62%]" />
        </div>
      </div>
    </div>
  </section>
);
