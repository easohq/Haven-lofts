import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { smsHref } from '../utils/hours.ts';

export const Footer: React.FC<{ salonInfo: SalonInfo; stylists: Stylist[] }> = ({ salonInfo, stylists }) => (
  <footer className="bg-ink text-on-dark pt-20 pb-28 md:pb-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-display text-[clamp(4rem,15vw,13rem)] leading-[0.85] tracking-[-0.04em]">Haven Lofts</p>
      <p className="mt-5 text-gold text-xl">Beautifully independent</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 text-lg">
        <address className="not-italic leading-relaxed">
          {salonInfo.street}, {salonInfo.suite}
          <br />
          {salonInfo.city}, MN {salonInfo.zip}
        </address>
        {stylists.map((s) => (
          <p key={s.id} className="leading-relaxed">
            <span className="font-semibold">{s.name}</span>
            <br />
            <a href={`tel:${s.phoneRaw}`} className="tabular-nums hover:underline">{s.phone}</a>
            <span aria-hidden="true"> · </span>
            <a href={smsHref(s)} className="underline underline-offset-4 hover:text-white">Text</a>
          </p>
        ))}
      </div>

      <p className="mt-16 text-on-dark/70">© {new Date().getFullYear()} Haven Lofts, Lakeville, Minnesota</p>
    </div>
  </footer>
);
