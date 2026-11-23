import React from 'react';
import { Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon } from './Brand.tsx';
import { Photo } from './Photo.tsx';

interface StylistsSectionProps {
  stylists: Stylist[];
  /** Opens booking; with an id, that stylist is picked first. */
  onBook: (stylistId?: string) => void;
}

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;
const upper = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// The owners side by side, so a new client can compare them at a glance and pick a chair: each on her
// own deeper-green panel with what she's best at as a short list. A headshot (photo: '/sara.jpg' in
// salonData.ts) appears beside the name once there is one.
export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBook }) => (
  <section id="stylists" className="relative on-olive bg-olive text-on-olive pt-28 pb-28 lg:pt-40 lg:pb-40 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-end">
        <div className="lg:col-span-7">
          <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6.5rem)]">
            {stylists.map((s) => s.name).join(' & ')}
          </h2>
          <p data-reveal style={d(90)} className="mt-6 text-lg sm:text-xl leading-[1.6] max-w-xl">
            The owners: two longtime stylists who built Haven Lofts together, so getting your hair done feels a little
            like coming home. Here's who to book for what.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 w-full max-w-sm lg:max-w-none" data-reveal="photo">
          <Photo id="gallery-wall" sizes="(min-width:1024px) 30vw, 90vw" className="arch w-full aspect-[4/5]" />
          <p className="mt-4 text-on-olive/80">One of the suites at Haven Lofts.</p>
        </div>
      </div>

      <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {stylists.map((s, i) => (
          <article key={s.id} data-reveal style={d(i * 140)} className="bg-olive-deep p-7 sm:p-10 lg:p-12 flex flex-col">
            <div className="flex items-center gap-5">
              {s.photo && (
                <img src={s.photo} alt={`${s.name}, owner and stylist`} loading="lazy" className="w-24 h-24 rounded-full object-cover object-[50%_25%] shrink-0" />
              )}
              <div>
                <h3 className="display text-[clamp(3rem,5vw,4.25rem)]">{s.name}</h3>
                <p className="label mt-2">
                  {s.role} and stylist{s.experience ? `, ${s.experience} behind the chair` : ''}
                </p>
              </div>
            </div>

            <p className="mt-7 text-lg leading-[1.6]">{s.bio}</p>

            <p className="label mt-8">Come to {s.name} for</p>
            <ul className="mt-3 space-y-2 text-lg" aria-label={`${s.name}'s specialties`}>
              {s.specialties.map((spec) => (
                <li key={spec} className="flex items-baseline gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-light shrink-0 translate-y-[-0.2em]" aria-hidden="true" />
                  {upper(spec)}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10 flex flex-wrap items-center gap-4">
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

      <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8" data-reveal>
        <p className="display text-3xl">Not sure who to pick?</p>
        <p className="text-lg leading-[1.6] text-on-olive/85 max-w-md">
          Both do cuts and color, so either chair is a good place to start.
        </p>
        <button type="button" onClick={() => onBook()} className="link-u link-light text-lg font-semibold sm:ml-auto shrink-0 self-start sm:self-auto">
          Book with either
        </button>
      </div>
    </div>
  </section>
);
