import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { directionsUrl, mapEmbedUrl, mapsUrl } from '../utils/maps.ts';
import { Stripes } from './Brand.tsx';

// How to find us: the address big and plain, then the map in a sleeve. By appointment, so it says so once.
export const LocationSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => (
  <section id="visit" className="on-mustard relative overflow-hidden bg-mustard text-on-mustard pt-24 pb-24 lg:pt-36 lg:pb-36 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 items-center">
      <div className="lg:col-span-5">
        <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6rem)]">
          Visit
        </h2>
        <address data-reveal className="not-italic mt-8 display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1]">
          {salonInfo.street}, {salonInfo.suite}
          <br />
          {salonInfo.city}, MN {salonInfo.zip}
        </address>
        <p data-reveal className="mt-6 text-lg leading-[1.6] max-w-md">
          Head inside to {salonInfo.suite}.{salonInfo.parking ? ` ${salonInfo.parking}` : ''} We're by appointment only,
          so book with Sara or Leah before you come.
        </p>
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <a href={directionsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <Navigation className="w-5 h-5" aria-hidden="true" /> Get directions
          </a>
          {salonInfo.phoneRaw && (
            <>
              <a href={`tel:${salonInfo.phoneRaw}`} className="btn btn-olive">
                <Phone className="w-5 h-5" aria-hidden="true" /> Call
              </a>
              <a href={`sms:${salonInfo.phoneRaw}`} className="btn btn-olive">
                <MessageSquare className="w-5 h-5" aria-hidden="true" /> Text
              </a>
            </>
          )}
        </div>
      </div>

      <div className="lg:col-span-7 relative" data-reveal>
        <Stripes className="absolute -left-[10vw] lg:-left-[9vw] -right-[50vw] top-[40%] h-16 sm:h-24" />
        <div className="sleeve relative aspect-[4/3] lg:aspect-[16/11] bg-surface overflow-hidden">
          {/* Shown if the map can't load (offline, blocked); the map covers it when it does. */}
          <a
            href={mapsUrl(salonInfo)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6"
          >
            <MapPin className="w-10 h-10 text-cognac" aria-hidden="true" />
            <span className="display text-2xl">{salonInfo.street}</span>
            <span className="label">Open in Google Maps</span>
          </a>
          <iframe
            title={`Map of Haven Lofts at ${salonInfo.street}, ${salonInfo.city}`}
            src={mapEmbedUrl(salonInfo)}
            className="map-embed absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  </section>
);
