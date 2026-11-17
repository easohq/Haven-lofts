import React from 'react';
import { MapPin } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { AppointmentSeal, GoldArrow } from './Brand.tsx';
import { mapsUrl } from '../utils/maps.ts';

interface HeroProps {
  salonInfo: SalonInfo;
  onBook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ salonInfo, onBook }) => (
  <section id="top" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-center">
      <div className="md:col-span-6 lg:col-span-6">
        <p className="label" data-reveal>
          <span className="whitespace-nowrap">Haven Lofts</span> · <span className="whitespace-nowrap">Hair Salon</span> ·{' '}
          <span className="whitespace-nowrap">{salonInfo.city}, MN</span>
        </p>
        <h1 data-reveal style={{ '--delay': '80ms' } as React.CSSProperties} className="font-display font-semibold text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.98] tracking-[-0.01em] mt-5">
          Unhurried hair care, <em className="font-medium text-cognac">made cozy.</em>
        </h1>
        <p data-reveal style={{ '--delay': '160ms' } as React.CSSProperties} className="text-lg sm:text-xl leading-relaxed text-ink-soft mt-6 max-w-xl">
          A boho, vintage-modern salon owned by stylists {salonInfo.coFounders}. Warm wood, leather chairs, soft light
          and a cup of coffee while you settle in.
        </p>

        <div data-reveal style={{ '--delay': '240ms' } as React.CSSProperties} className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-9">
          <button
            type="button"
            onClick={onBook}
            data-cta
            className="shimmer inline-flex items-center gap-4 h-14 px-8 rounded-full bg-btn text-btn-ink text-lg font-semibold active:scale-[0.97] transition"
          >
            Book Appointment <GoldArrow className="w-9" />
          </button>
          <a href="#services" className="text-lg font-semibold underline underline-offset-[6px] decoration-2 decoration-gold hover:text-cognac transition-colors">
            View services
          </a>
        </div>

        <a
          href={mapsUrl(salonInfo)}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          style={{ '--delay': '320ms' } as React.CSSProperties}
          className="inline-flex items-start gap-2.5 mt-9 text-base text-ink-soft hover:text-ink transition-colors"
        >
          <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            {salonInfo.street}, {salonInfo.suite},{' '}
            <span className="whitespace-nowrap">
              {salonInfo.city}, MN {salonInfo.zip}
            </span>
          </span>
        </a>
      </div>

      <div className="md:col-span-6 lg:col-span-6 relative max-w-[520px] w-full mx-auto" data-reveal style={{ '--delay': '120ms' } as React.CSSProperties}>
        <div className="double-frame arch glow">
          <div className="double-frame-inner arch overflow-hidden">
            <img
              src="/salon-lounge.jpg"
              width={1312}
              height={1199}
              alt="The lounge at Haven Lofts: a walnut slat wall on olive green, a woven pendant light, two cognac leather chairs and a coffee bar"
              className="block w-full aspect-[4/5] object-cover object-[60%_50%]"
            />
          </div>
        </div>
        <AppointmentSeal className="absolute -left-3 sm:-left-8 bottom-10 w-28 h-28 sm:w-32 sm:h-32" />
      </div>
    </div>
  </section>
);
