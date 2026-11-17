import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { InstagramIcon, Logo, Sprig } from './Brand.tsx';
import { mapsUrl } from '../utils/maps.ts';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#stylists', label: 'Stylists' },
  { href: '#visit', label: 'Visit' },
];

export const Footer: React.FC<{ salonInfo: SalonInfo; stylists: Stylist[] }> = ({ salonInfo, stylists }) => {
  const socials = [
    salonInfo.instagram && { handle: salonInfo.instagram, label: 'Haven Lofts on Instagram' },
    ...stylists.map((s) => s.instagram && { handle: s.instagram, label: `${s.name} on Instagram` }),
  ].filter(Boolean) as { handle: string; label: string }[];

  return (
    <footer className="bg-bg-alt pt-14 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="double-frame">
          <div className="double-frame-inner px-6 sm:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
            <div className="sm:col-span-2 lg:col-span-1">
              <Logo className="w-48 h-auto" />
            </div>

            <nav aria-label="Footer">
              <p className="label">Explore</p>
              <ul className="mt-4 space-y-2 text-lg">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="hover:text-cognac transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label">Location</p>
              <a href={mapsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="block mt-4 text-lg leading-relaxed hover:text-cognac transition-colors">
                {salonInfo.street}, {salonInfo.suite}
                <br />
                {salonInfo.city}, MN {salonInfo.zip}
              </a>
            </div>

            <div>
              <p className="label">Owners</p>
              <p className="mt-4 text-lg">{salonInfo.coFounders}</p>
              <p className="text-ink-soft">By appointment only</p>
              {socials.length > 0 && (
                <ul className="mt-5 flex gap-3">
                  {socials.map((s) => (
                    <li key={s.handle}>
                      <a
                        href={`https://instagram.com/${s.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="glow flex items-center justify-center w-11 h-11 rounded-full border border-gold/60 text-gold-ink hover:text-ink transition-colors"
                      >
                        <InstagramIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-ink-soft">
          <p>© {new Date().getFullYear()} Haven Lofts · Lakeville, Minnesota</p>
          <Sprig className="w-36 text-gold" />
        </div>
      </div>
    </footer>
  );
};
