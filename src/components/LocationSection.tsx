import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { AppointmentSeal } from './Brand.tsx';
import { directionsUrl, mapEmbedUrl, mapsUrl } from '../utils/maps.ts';

// Layered: a wide framed map on the right, with the address card laid over its left edge.
export const LocationSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => (
  <section id="visit" className="pt-24 pb-28 lg:pt-32 lg:pb-40 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="lg:ml-[8.33%]">
        <p className="kicker" data-reveal>Find us</p>
        <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)] mt-7">
          Visit the <em>lofts</em>
        </h2>
      </div>

      <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-start-5 lg:col-span-8 lg:row-start-1 double-frame glow" data-reveal="image">
          <div className="double-frame-inner relative aspect-[4/3] lg:aspect-[16/10] bg-bg-alt overflow-hidden">
            {/* Shown if the map can't load (offline, blocked); the map covers it when it does. */}
            <a
              href={mapsUrl(salonInfo)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6"
            >
              <MapPin className="w-10 h-10 text-gold" aria-hidden="true" />
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

        <div
          className="relative z-10 lg:col-start-1 lg:col-span-5 lg:row-start-1 -mt-16 mx-4 sm:mx-10 lg:m-0 double-frame bg-surface shadow-[0_30px_60px_-30px_rgb(var(--shadow)/0.55)]"
          data-reveal
          style={{ '--delay': '160ms' } as React.CSSProperties}
        >
          <div className="double-frame-inner p-7 sm:p-10">
            <address className="not-italic display text-[2.1rem] leading-[1.1]">
              {salonInfo.street}
              <br />
              <em>{salonInfo.suite}</em>
              <br />
              {salonInfo.city}, MN {salonInfo.zip}
            </address>

            <div className="mt-8 flex items-center gap-5">
              <AppointmentSeal className="w-24 h-24 shrink-0" />
              <p className="leading-relaxed text-ink-soft">
                Head inside to {salonInfo.suite}.{salonInfo.parking ? ` ${salonInfo.parking}` : ''} We're by appointment
                only, so please book before you visit.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={directionsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Navigation className="w-5 h-5" aria-hidden="true" /> Get directions
              </a>
              {salonInfo.phoneRaw && (
                <>
                  <a href={`tel:${salonInfo.phoneRaw}`} className="btn btn-ghost">
                    <Phone className="w-5 h-5 text-gold" aria-hidden="true" /> Call
                  </a>
                  <a href={`sms:${salonInfo.phoneRaw}`} className="btn btn-ghost">
                    <MessageSquare className="w-5 h-5 text-gold" aria-hidden="true" /> Text
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
