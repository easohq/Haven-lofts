import React from 'react';
import { Stylist } from '../types.ts';
import { smsHref } from '../utils/hours.ts';
import { GoldArrow } from './Brand.tsx';

export const StylistsSection: React.FC<{ stylists: Stylist[] }> = ({ stylists }) => (
  <section id="stylists" className="py-24 md:py-36 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-display font-semibold text-5xl sm:text-6xl leading-[1]">Meet the stylists</h2>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-14 lg:gap-24">
        {stylists.map((s, i) => (
          <article key={s.id} className={i % 2 ? 'md:mt-32' : ''}>
            <h3 className="font-display font-semibold text-[clamp(4.5rem,9vw,7.5rem)] leading-[0.9]">{s.name}</h3>
            <p className="caps text-base mt-3 text-gold-text">{s.role}</p>
            <p className="mt-6 text-lg leading-relaxed">{s.bio}</p>

            <h4 className="mt-10 font-display font-semibold text-2xl">Ask {s.name} about</h4>
            <ul className="mt-3 text-lg leading-relaxed">
              {s.specialties.map((spec) => (
                <li key={spec} className="flex gap-3 items-baseline">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0 -translate-y-0.5" aria-hidden="true" />
                  {spec}
                </li>
              ))}
            </ul>

            <a
              href={smsHref(s)}
              className="inline-flex items-center gap-4 h-14 px-7 mt-10 bg-ink hover:bg-black active:scale-[0.97] text-white text-lg font-semibold transition"
            >
              Message {s.name} <GoldArrow className="w-8" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
