import React from 'react';
import { SalonInfo } from '../types.ts';

export const LocationSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => {
  const query = encodeURIComponent(`${salonInfo.street}, ${salonInfo.city}, ${salonInfo.state} ${salonInfo.zip}`);

  return (
    <section id="visit" className="py-24 md:py-36 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1 aspect-[4/3] bg-stone">
          <iframe
            title={`Map of Haven Lofts at ${salonInfo.street}, ${salonInfo.city}`}
            src={`https://www.google.com/maps?q=${query}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <h2 className="font-display font-semibold text-5xl sm:text-6xl leading-[1] tracking-[-0.02em]">Visit us</h2>
          <address className="not-italic mt-8 font-display font-semibold text-3xl leading-tight">
            {salonInfo.street}
            <br />
            {salonInfo.suite}
            <br />
            {salonInfo.city}, MN {salonInfo.zip}
          </address>
          <p className="mt-8 text-lg leading-relaxed">
            A few minutes off I-35. Park free right outside and come up through the private entrance to the lofts.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            We are by appointment only, so please message your stylist before you come by.
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-14 px-8 mt-10 bg-ink hover:bg-black active:scale-[0.97] text-white text-lg font-semibold transition"
          >
            Open in Maps
          </a>
        </div>
      </div>
    </section>
  );
};
