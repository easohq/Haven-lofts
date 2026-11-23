import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon } from './Brand.tsx';
import { mapsUrl } from '../utils/maps.ts';

const LINKS = [
  { href: '#space', label: 'The rooms' },
  { href: '#services', label: 'Services' },
  { href: '#stylists', label: 'Sara & Leah' },
  { href: '#spray-tan', label: 'Spray tan' },
  { href: '#visit', label: 'Visit' },
];

// The sign-off: the three stripes, then the espresso back cover with the logo, one last invitation and the details.
export const Footer: React.FC<{ salonInfo: SalonInfo; stylists: Stylist[]; onBook: () => void }> = ({ salonInfo, stylists, onBook }) => {
  const socials = [
    salonInfo.instagram && { handle: salonInfo.instagram, label: 'Haven Lofts on Instagram' },
    ...stylists.map((s) => s.instagram && { handle: s.instagram, label: `${s.name} on Instagram` }),
  ].filter(Boolean) as { handle: string; label: string }[];

  return (
    <footer className="on-dark relative bg-[#24180F] text-[#F4E8CC]">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 pt-20 pb-28 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="display text-[clamp(3rem,6.5vw,5.75rem)]">Come sit a while.</h2>
            <button type="button" onClick={onBook} data-cta className="btn btn-gold mt-9">
              Book a visit <GoldArrow className="w-8" />
            </button>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end" data-reveal>
            <img src="/haven-lofts-logo-light.png" alt="Haven Lofts, Beautifully Independent" className="w-52 h-auto" />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
          <nav aria-label="Footer">
            <p className="label">Explore</p>
            <ul className="mt-4 space-y-2 text-lg">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-u decoration-transparent hover:decoration-current">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label">Find us</p>
            <a href={mapsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="block mt-4 text-lg leading-relaxed link-u decoration-transparent hover:decoration-current">
              {salonInfo.street}, {salonInfo.suite}
              <br />
              {salonInfo.city}, MN {salonInfo.zip}
            </a>
          </div>
          <div>
            <p className="label">Owners</p>
            <p className="mt-4 text-lg">{salonInfo.coFounders}</p>
            <p className="text-[#F4E8CC]/80">By appointment only</p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {socials.map((s) => (
                  <li key={s.handle}>
                    <a href={`https://instagram.com/${s.handle}`} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="icon-btn">
                      <InstagramIcon />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-14 text-sm text-[#F4E8CC]/75">© {new Date().getFullYear()} Haven Lofts · Lakeville, Minnesota</p>
      </div>
    </footer>
  );
};
