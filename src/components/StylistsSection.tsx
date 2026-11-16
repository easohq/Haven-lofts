import React from 'react';
import { Stylist } from '../types.ts';
import { smsHref } from '../utils/hours.ts';

export const StylistsSection: React.FC<{ stylists: Stylist[] }> = ({ stylists }) => (
  <section id="stylists" className="py-24 md:py-36 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-display text-5xl sm:text-6xl leading-[1] tracking-[-0.02em]">Sara &amp; Leah</h2>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-14 lg:gap-24">
        {stylists.map((s, i) => (
          <article key={s.id} className={i === 1 ? 'md:mt-40' : ''}>
            <h3 className="font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.03em] text-juniper">{s.name}</h3>
            <p className="mt-6 text-lg leading-relaxed">{s.bio}</p>

            <h4 className="mt-10 font-display text-2xl">Ask {s.name} about</h4>
            <ul className="mt-3 text-lg leading-relaxed">
              {s.specialties.map((spec) => (
                <li key={spec} className="flex gap-3 items-baseline">
                  <span className="w-2 h-2 rounded-full bg-berry shrink-0 translate-y-[-2px]" aria-hidden="true" />
                  {spec}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10">
              <a
                href={smsHref(s)}
                className="inline-flex items-center h-14 px-7 rounded-full bg-juniper hover:bg-juniper-deep active:scale-[0.97] text-white text-lg font-semibold transition"
              >
                Text {s.name}
              </a>
              <a href={`tel:${s.phoneRaw}`} className="text-lg font-semibold tabular-nums underline underline-offset-[6px] decoration-2 decoration-gold">
                {s.phone}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
