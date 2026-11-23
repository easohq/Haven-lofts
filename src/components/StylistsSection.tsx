import React from 'react';
import { Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon, Stripes } from './Brand.tsx';
import { Photo } from './Photo.tsx';

interface StylistsSectionProps {
  stylists: Stylist[];
  /** Opens booking; with an id, that stylist is picked first. */
  onBook: (stylistId?: string) => void;
}

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;
const upper = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// The owners on the mustard field, side by side so a new client can compare them and pick a chair. Each sits
// on her own panel, Sara's walnut and Leah's olive, like two record covers from the same band.
// A headshot (photo: '/sara.jpg' in salonData.ts) appears beside the name once there is one.
export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBook }) => (
  <section id="stylists" className="on-mustard relative overflow-hidden bg-mustard text-on-mustard pt-24 pb-24 lg:pt-36 lg:pb-36 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-end">
        <div className="lg:col-span-7">
          <h2 data-reveal className="display text-[clamp(3.5rem,8vw,7rem)]">
            {stylists.map((s) => s.name).join(' & ')}
          </h2>
          <p data-reveal style={d(90)} className="mt-6 text-lg sm:text-xl leading-[1.55] max-w-xl font-medium">
            The owners: two longtime stylists who built Haven Lofts together, so getting your hair done feels a little
            like coming home. Here's who to book for what.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 w-full max-w-xs lg:max-w-none justify-self-start lg:justify-self-end" data-reveal>
          <div className="relative">
            <Stripes className="absolute -left-[10vw] lg:-left-[7vw] -right-[50vw] top-[38%] h-16 sm:h-20" />
            <Photo id="gallery-wall" sizes="(min-width:1024px) 28vw, 80vw" className="sleeve relative w-full aspect-square" />
          </div>
          <p className="mt-5 font-semibold">One of the suites at Haven Lofts.</p>
        </div>
      </div>

      <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
        {stylists.map((s, i) => (
          <article
            key={s.id}
            data-reveal
            style={d(i * 140)}
            className={`on-dark rounded-[28px] p-7 sm:p-10 lg:p-12 flex flex-col text-on-olive ${i % 2 === 0 ? 'bg-walnut' : 'bg-olive'}`}
          >
            <div className="flex items-center gap-5">
              {s.photo && (
                <img src={s.photo} alt={`${s.name}, owner and stylist`} loading="lazy" className="w-24 h-24 rounded-full object-cover object-[50%_25%] shrink-0" />
              )}
              <div>
                <h3 className="display text-[clamp(3rem,5vw,4.5rem)]">{s.name}</h3>
                <p className="label mt-3">
                  {s.role} and stylist{s.experience ? `, ${s.experience} behind the chair` : ''}
                </p>
              </div>
            </div>

            <p className="mt-7 text-lg leading-[1.6]">{s.bio}</p>

            <p className="label mt-8">Come to {s.name} for</p>
            <ul className="mt-3 space-y-2 text-lg" aria-label={`${s.name}'s specialties`}>
              {s.specialties.map((spec) => (
                <li key={spec} className="flex items-baseline gap-3">
                  <span className="w-2 h-2 rounded-full bg-mustard shrink-0 translate-y-[-0.15em]" aria-hidden="true" />
                  {upper(spec)}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => onBook(s.id)} data-cta className="btn btn-cream">
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

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8" data-reveal>
        <p className="display text-3xl">Not sure who to pick?</p>
        <p className="text-lg leading-[1.6] max-w-md font-medium">Both do cuts and color, so either chair is a good place to start.</p>
        <button type="button" onClick={() => onBook()} className="link-u text-lg font-bold sm:ml-auto shrink-0 self-start sm:self-auto">
          Book with either
        </button>
      </div>
    </div>
  </section>
);
