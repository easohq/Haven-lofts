import React from 'react';
import { Stylist } from '../types.ts';
import { smsHref } from '../utils/sms.ts';
import { GoldArrow } from './Brand.tsx';

export const StylistsSection: React.FC<{ stylists: Stylist[] }> = ({ stylists }) => (
  <section id="stylists" className="bg-green text-on-dark py-24 md:py-32 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="caps text-xl sm:text-2xl">Your stylists</h2>

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-14">
        {stylists.map((s) => (
          <article key={s.id}>
            <h3 className="font-display font-semibold text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.9]">{s.name}</h3>
            <p className="mt-4 text-lg text-on-dark/85">{s.role}</p>
            <a
              href={smsHref(s)}
              className="inline-flex items-center gap-4 h-14 px-7 mt-8 bg-paper hover:bg-white active:scale-[0.97] text-ink text-lg font-semibold transition"
            >
              Message {s.name} <GoldArrow className="w-8" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
