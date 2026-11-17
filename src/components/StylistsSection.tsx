import React from 'react';
import { Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon } from './Brand.tsx';

interface StylistsSectionProps {
  stylists: Stylist[];
  onBook: (stylistId: string) => void;
}

/**
 * Arched portrait. Set `photo: '/sarah.jpg'` in salonData.ts (file in /public) and it crops into this
 * exact double arch, weighted toward the face; until then a gold italic initial holds the space.
 */
const Portrait: React.FC<{ stylist: Stylist }> = ({ stylist: s }) => (
  <div>
    <div className="arch overflow-hidden aspect-[3/4] bg-olive-deep">
      {s.photo ? (
        <img
          src={s.photo}
          alt={`${s.name}, owner and stylist at Haven Lofts`}
          loading="lazy"
          className="w-full h-full object-cover object-[50%_25%] transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.06]"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-display italic text-[9rem] leading-none text-gold-light/80 transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.06]"
          aria-hidden="true"
        >
          {s.name[0]}
        </div>
      )}
    </div>
  </div>
);

// Two magazine spreads: Sarah's portrait left with her story beside it; Leah's mirrored and set lower.
export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBook }) => (
  <section id="stylists" className="on-olive bg-olive text-on-olive pt-24 pb-32 lg:pt-32 lg:pb-44 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="lg:ml-[41.66%]">
        <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)]">
          {stylists[0]?.name} &amp; {stylists[1]?.name}
        </h2>
        <p data-reveal className="mt-6 text-lg leading-[1.6] max-w-lg">
          The owners: two longtime stylists with one shared idea, a salon that feels like coming home.
        </p>
      </div>

      <div className="mt-20 lg:mt-28 flex flex-col gap-24 lg:gap-36">
        {stylists.map((s, i) => {
          const mirrored = i % 2 === 1;
          return (
            <article key={s.id} className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 items-center">
              <div
                data-reveal="image"
                className={`md:col-span-5 lg:col-span-4 max-w-[340px] w-full ${
                  mirrored ? 'md:order-2 md:col-start-8 lg:col-start-8 justify-self-end' : 'lg:col-start-2'
                }`}
              >
                <Portrait stylist={s} />
              </div>

              <div
                data-reveal
                style={{ '--delay': '140ms' } as React.CSSProperties}
                className={`md:col-span-7 lg:col-span-5 ${mirrored ? 'md:order-1 lg:col-start-2' : 'lg:col-start-7'}`}
              >
                <h3 className="display text-[clamp(3.5rem,7vw,6rem)]">{s.name}</h3>
                <p className="mt-3 label">{s.role} and stylist</p>
                <p className="mt-6 text-lg leading-[1.6] max-w-lg">{s.bio}</p>

                <p className="label mt-8">Ask {s.name} about</p>
                <ul className="spec-list mt-2 text-lg leading-[1.6] max-w-lg" aria-label={`${s.name}'s specialties`}>
                  {s.specialties.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => onBook(s.id)} data-cta className="btn btn-gold">
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
    </div>
  </section>
);
