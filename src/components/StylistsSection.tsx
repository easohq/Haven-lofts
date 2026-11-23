import React from 'react';
import { Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon } from './Brand.tsx';
import { Photo } from './Photo.tsx';
import { PhotoId } from '../data/photos.ts';

interface StylistsSectionProps {
  stylists: Stylist[];
  /** Opens booking; with an id, that stylist is picked first. */
  onBook: (stylistId?: string) => void;
}

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;
const upper = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Each owner's own suite, as the owners describe them: Leah's has the gallery wall over the mustard velvet sofa;
 * Sara's is the quiet white room with the big window. The panel takes its colour from the room.
 */
const SUITE: Record<string, { photo: PhotoId; caption: string; dark: boolean }> = {
  sara: { photo: 'suite-window', caption: "Sara's suite: quiet and bright, with a big window.", dark: false },
  leah: { photo: 'gallery-wall', caption: "Leah's suite: a gallery wall over a velvet sofa.", dark: true },
};

// The owners side by side, so a new client can compare them and pick a chair. Each panel opens on a photo of
// her own suite and takes its colour from it. A headshot (photo: '/sara.jpg' in salonData.ts) appears beside
// the name once there is one.
export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBook }) => (
  <section id="stylists" className="relative overflow-hidden bg-bg-alt text-ink pt-24 pb-24 lg:pt-36 lg:pb-36 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6rem)]">
          {stylists.map((s) => s.name).join(' & ')}
        </h2>
        <p data-reveal style={d(90)} className="mt-6 text-lg sm:text-xl leading-[1.55] max-w-xl">
          The owners: two longtime stylists who built Haven Lofts together, so getting your hair done feels a little
          like coming home. Each has her own suite. Here's who to book for what.
        </p>
      </div>

      <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
        {stylists.map((s, i) => {
          const suite = SUITE[s.id];
          const dark = suite?.dark ?? i % 2 === 1;
          return (
            <article
              key={s.id}
              data-reveal
              style={d(i * 140)}
              className={`rounded-[28px] p-5 sm:p-7 lg:p-8 flex flex-col ${dark ? 'on-dark bg-forest text-on-forest' : 'bg-surface text-ink'}`}
            >
              {suite && (
                <figure>
                  <Photo id={suite.photo} sizes="(min-width:768px) 42vw, 90vw" className="sleeve-sm w-full aspect-[4/3]" />
                  <figcaption className={`mt-3 text-[0.9375rem] ${dark ? 'text-on-forest/80' : 'text-ink-soft'}`}>{suite.caption}</figcaption>
                </figure>
              )}

              <div className="px-2 sm:px-3 lg:px-4 pt-8 flex flex-col flex-1">
                <div className="flex items-center gap-5">
                  {s.photo && (
                    <img src={s.photo} alt={`${s.name}, owner and stylist`} loading="lazy" className="w-24 h-24 rounded-full object-cover object-[50%_25%] shrink-0" />
                  )}
                  <div>
                    <h3 className="display text-[clamp(2.75rem,4.5vw,4rem)]">{s.name}</h3>
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
                      <span className="w-2 h-2 rounded-full bg-brass shrink-0 translate-y-[-0.15em]" aria-hidden="true" />
                      {upper(spec)}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10 pb-2 flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => onBook(s.id)} data-cta className={`btn ${dark ? 'btn-cream' : 'btn-primary'}`}>
                    Book with {s.name} <GoldArrow className="w-8" />
                  </button>
                  {s.instagram && (
                    <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} on Instagram`} className="icon-btn !w-14 !h-14">
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8" data-reveal>
        <p className="display text-3xl">Not sure who to pick?</p>
        <p className="text-lg leading-[1.6] max-w-md">Both do cuts and color, so either chair is a good place to start.</p>
        <button type="button" onClick={() => onBook()} className="link-u text-lg font-bold sm:ml-auto shrink-0 self-start sm:self-auto">
          Book with either
        </button>
      </div>
    </div>
  </section>
);
