import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';

interface FooterProps {
  salonInfo: SalonInfo;
  stylists: Stylist[];
}

export const Footer: React.FC<FooterProps> = ({ salonInfo, stylists }) => (
  <footer className="bg-ink text-on-sage pt-20 pb-28 md:pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] tracking-[-0.02em]">Haven Lofts</p>
      <p className="mt-4 text-gold text-lg">Beautifully independent</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 text-base">
        <address className="not-italic leading-relaxed">
          {salonInfo.street}, {salonInfo.suite}
          <br />
          {salonInfo.city}, MN {salonInfo.zip}
        </address>
        {stylists.map((s) => (
          <div key={s.id} className="leading-relaxed">
            <p className="font-semibold">{s.name}</p>
            <a href={`tel:${s.phoneRaw}`} className="tabular-nums hover:underline">{s.phone}</a>
            <span aria-hidden="true"> · </span>
            <a href={`sms:${s.phoneRaw}`} className="underline underline-offset-4 hover:text-white">Text</a>
          </div>
        ))}
      </div>

      <p className="mt-16 text-sm text-on-sage/70">© {new Date().getFullYear()} Haven Lofts, Lakeville, Minnesota</p>
    </div>
  </footer>
);
