import React from 'react';
import { Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon } from './Brand.tsx';
import { Photo } from './Photo.tsx';

interface StylistsSectionProps {
  stylists: Stylist[];
  onBook: (stylistId: string) => void;
}

const list = new Intl.ListFormat('en', { type: 'conjunction' });
const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// The owners, set like a printed card: a real photo of the salon they built stays beside two short
// write-ups. A headshot (photo: '/sarah.jpg' in salonData.ts) appears next to the name once there is one.
// DOM order is heading, photo, write-ups, so phones read it top to bottom; wide screens place the photo left.
export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBook }) => (
  <section id="stylists" className="relative on-olive bg-olive text-on-olive pt-28 pb-28 lg:pt-40 lg:pb-40 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
      <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
        <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)]">
          {stylists.map((s) => s.name).join(' & ')}
        </h2>
        <p data-reveal style={d(90)} className="mt-6 text-lg leading-[1.6] max-w-lg">
          The owners: two longtime stylists who built Haven Lofts together, so getting your hair done feels a little
          like coming home.
        </p>
      </div>

      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2">
        <div className="lg:sticky lg:top-[calc(72px+3rem)]" data-reveal="photo">
          <Photo id="gallery-wall" sizes="(min-width:1024px) 38vw, 90vw" className="w-full aspect-[4/5]" />
          <p className="mt-4 text-on-olive/75">One of the suites at Haven Lofts.</p>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 flex flex-col gap-16 lg:gap-20 lg:pt-6">
        {stylists.map((s) => (
          <article key={s.id} data-reveal className="max-w-xl">
            <div className="flex items-center gap-5">
              {s.photo && (
                <img src={s.photo} alt="" loading="lazy" className="w-20 h-20 rounded-full object-cover object-[50%_25%] shrink-0" />
              )}
              <div>
                <h3 className="display text-[clamp(2.75rem,4.5vw,3.75rem)]">{s.name}</h3>
                <p className="label mt-2">{s.role} and stylist</p>
              </div>
            </div>
            <p className="mt-6 text-lg leading-[1.6]">{s.bio}</p>
            <p className="mt-4 text-lg leading-[1.6] text-on-olive/80">
              Ask {s.name} about {list.format(s.specialties)}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => onBook(s.id)} data-cta className="btn btn-gold">
                Book with {s.name} <GoldArrow className="w-8" />
              </button>
              {s.instagram && (
                <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} on Instagram`} className="icon-btn !w-14 !h-14">
                  <InstagramIcon />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
