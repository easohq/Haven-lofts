import React from 'react';
import { MapPin } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { AppointmentSeal, GoldArrow } from './Brand.tsx';
import { mapsUrl } from '../utils/maps.ts';

interface HeroProps {
  salonInfo: SalonInfo;
  onBook: () => void;
}

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// Off-center editorial hero: type sits left, the arched lounge photo stands right,
// and a smaller arch of the slat wall overlaps its corner.
export const Hero: React.FC<HeroProps> = ({ salonInfo, onBook }) => (
  <section id="top" className="relative overflow-hidden pt-12 pb-28 md:pt-16 lg:pt-20 lg:pb-40">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-center">
      <div className="lg:col-span-6 relative z-10">
        <h1 data-reveal className="display text-[clamp(3.5rem,7.5vw,7.25rem)]">
          Unhurried hair,
          <br />
          made cozy.
        </h1>
        <p data-reveal style={d(90)} className="text-lg sm:text-xl leading-[1.6] mt-8 max-w-md">
          A boho, vintage-modern salon in {salonInfo.city}, Minnesota, owned by stylists {salonInfo.coFounders}. Warm
          walnut, cognac leather, soft light and a cup of coffee while you settle in.
        </p>

        <div data-reveal style={d(180)} className="flex flex-wrap items-center gap-x-8 gap-y-5 mt-11">
          <button type="button" onClick={onBook} data-cta className="btn btn-primary text-lg">
            Book Appointment <GoldArrow className="w-9" />
          </button>
          <a href="#services" className="link-u text-lg font-semibold">
            View services
          </a>
        </div>

        <a
          href={mapsUrl(salonInfo)}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          style={d(270)}
          className="group inline-flex items-start gap-3 mt-12 text-ink-soft hover:text-ink transition-colors duration-300"
        >
          <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5 transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
          <span>
            {salonInfo.street}, {salonInfo.suite},{' '}
            <span className="whitespace-nowrap">
              {salonInfo.city}, MN {salonInfo.zip}
            </span>
          </span>
        </a>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 relative">
        <div className="relative max-w-[560px] mx-auto lg:mr-0 lg:ml-auto">
          <div className="arch overflow-hidden bg-bg-alt" data-reveal="image" style={d(120)}>
            <img
              src="/salon-lounge.jpg"
              width={1312}
              height={1199}
              alt="The lounge at Haven Lofts: a walnut slat wall on olive green, a woven pendant light, two cognac leather chairs and a coffee bar"
              className="block w-full aspect-[4/5] object-cover object-[60%_50%]"
            />
          </div>

          {/* The smaller arch overlapping the corner: a close-up of the slat wall and pendant. */}
          <div className="absolute -left-3 sm:-left-14 -bottom-12 sm:-bottom-16 w-32 sm:w-44 arch bg-bg p-2" data-reveal style={d(420)}>
            <div className="arch overflow-hidden bg-bg-alt">
              <img src="/salon-slat-wall.jpg" alt="" loading="lazy" className="block w-full aspect-[3/4] object-cover" />
            </div>
          </div>

          <AppointmentSeal className="absolute -right-2 sm:-right-8 top-[16%] w-24 h-24 sm:w-32 sm:h-32" />
        </div>
      </div>
    </div>
  </section>
);
