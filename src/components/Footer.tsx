import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { GoldArrow, InstagramIcon, Logo } from './Brand.tsx';
import { mapsUrl } from '../utils/maps.ts';
import { Photo } from './Photo.tsx';

const LINKS = [
  { href: '#space', label: 'The space' },
  { href: '#services', label: 'Services' },
  { href: '#spray-tan', label: 'Spray tan' },
  { href: '#stylists', label: 'Stylists' },
  { href: '#visit', label: 'Visit' },
];

// An asymmetric sign-off: a large italic line on the left, the logo set apart on the right,
// then a framed strip of details.
export const Footer: React.FC<{ salonInfo: SalonInfo; stylists: Stylist[]; onBook: () => void }> = ({ salonInfo, stylists, onBook }) => {
  const socials = [
    salonInfo.instagram && { handle: salonInfo.instagram, label: 'Haven Lofts on Instagram' },
    ...stylists.map((s) => s.instagram && { handle: s.instagram, label: `${s.name} on Instagram` }),
  ].filter(Boolean) as { handle: string; label: string }[];

  return (
    <footer className="relative overflow-hidden bg-bg-alt pt-32 pb-28 sm:pb-14">
      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="display text-[clamp(3rem,6vw,5.5rem)]">Come sit a while.</h2>
            <button type="button" onClick={onBook} data-cta className="btn btn-primary mt-9">
              Book Appointment <GoldArrow className="w-9" />
            </button>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 w-full max-w-sm lg:justify-self-end" data-reveal="photo">
            <Photo id="lounge" sizes="(min-width:1024px) 30vw, 90vw" className="arch w-full aspect-[4/5]" />
          </div>
        </div>
        <Logo className="w-48 h-auto mt-16" />

        <div className="mt-10 bg-bg">
          <div className="px-6 sm:px-10 py-9 grid grid-cols-1 sm:grid-cols-3 gap-9">
            <nav aria-label="Footer">
              <p className="label">Explore</p>
              <ul className="mt-4 space-y-2 text-lg">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-u">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label">Location</p>
              <a href={mapsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="block mt-4 text-lg leading-relaxed hover:text-cognac transition-colors duration-300">
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
                      <a href={`https://instagram.com/${s.handle}`} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="icon-btn">
                        <InstagramIcon />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 text-ink-soft text-sm">© {new Date().getFullYear()} Haven Lofts · Lakeville, Minnesota</p>
      </div>
    </footer>
  );
};
