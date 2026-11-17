import React from 'react';
import { Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon, Sprig } from './Brand.tsx';

interface StylistsSectionProps {
  stylists: Stylist[];
  onBook: (stylistId: string) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists, onBook }) => (
  <section id="stylists" className="bg-olive text-on-olive py-20 md:py-28 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <p className="label !text-gold" data-reveal>Meet the owners</p>
        <h2 data-reveal className="font-display font-semibold text-5xl sm:text-6xl leading-[1] mt-4">
          {stylists.map((s) => s.name).join(' & ')}
        </h2>
        <Sprig className="w-44 text-gold mt-6" />
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        {stylists.map((s, i) => (
          <article
            key={s.id}
            data-reveal
            style={{ '--delay': `${i * 120}ms` } as React.CSSProperties}
            className="group double-frame bg-olive-deep glow"
          >
            <div className="double-frame-inner p-5 sm:p-8 lg:p-10 h-full flex flex-col sm:flex-row md:flex-col lg:flex-row gap-7">
              {/* Arched headshot frame; a monogram holds the space until a photo is added. */}
              <div className="double-frame arch shrink-0 w-44 sm:w-48 md:w-44 lg:w-48 self-center sm:self-start md:self-center lg:self-start">
                <div className="double-frame-inner arch overflow-hidden aspect-[3/4] bg-olive">
                  {s.photo ? (
                    <img
                      src={s.photo}
                      alt={`${s.name}, owner and stylist at Haven Lofts`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display italic text-8xl text-gold/80 transition-transform duration-700 ease-out group-hover:scale-105" aria-hidden="true">
                      {s.name[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-5xl leading-none">{s.name}</h3>
                <p className="label !text-gold mt-3">{s.role} &amp; Stylist</p>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-on-olive/90">{s.bio}</p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${s.name}'s specialties`}>
                  {s.specialties.map((spec) => (
                    <li key={spec} className="text-sm px-3 py-1.5 rounded-full border border-gold/50 text-on-olive/90">
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-4 pt-1 sm:mt-auto">
                  <button
                    type="button"
                    onClick={() => onBook(s.id)}
                    className="shimmer inline-flex items-center gap-3 h-12 px-6 rounded-full bg-gold text-[#1A1C15] font-semibold active:scale-[0.97] transition"
                  >
                    Book with {s.name} <GoldArrow className="w-7 !text-[#1A1C15]" />
                  </button>
                  {s.instagram && (
                    <a
                      href={`https://instagram.com/${s.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.name} on Instagram`}
                      className="glow flex items-center justify-center w-12 h-12 rounded-full border border-gold/60 text-gold hover:text-on-olive transition-colors"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
