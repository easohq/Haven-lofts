import React from 'react';
import { Navigation } from 'lucide-react';
import { SalonInfo } from '../types.ts';

interface LocationSectionProps {
  salonInfo: SalonInfo;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ salonInfo }) => {
  const query = encodeURIComponent(`${salonInfo.street}, ${salonInfo.city}, ${salonInfo.state} ${salonInfo.zip}`);

  return (
    <section id="visit" className="bg-field py-24 md:py-36 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <h2 className="font-display font-medium text-6xl sm:text-7xl leading-[0.95] tracking-[-0.02em]">Visit us</h2>
          <address className="not-italic mt-8 font-display text-3xl sm:text-4xl leading-tight">
            {salonInfo.street}, {salonInfo.suite}
            <br />
            {salonInfo.city}, MN {salonInfo.zip}
          </address>
          <div className="mt-8 space-y-4 text-lg leading-relaxed max-w-md">
            <p>A few minutes off I-35, with free parking right outside the building and a private entrance to the lofts.</p>
            <p>Because we each keep our own schedule, please call or text Sara or Leah before heading over so we're ready for you.</p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-14 px-8 mt-10 bg-sage hover:bg-sage-dark active:scale-[0.97] text-white font-semibold transition"
          >
            <Navigation className="w-4 h-4" aria-hidden="true" /> Get directions
          </a>
        </div>

        <div className="lg:col-span-7 aspect-[4/3] bg-ground">
          <iframe
            title={`Map of Haven Lofts at ${salonInfo.street}, ${salonInfo.city}`}
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
