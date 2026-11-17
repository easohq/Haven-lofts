import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { AppointmentSeal, Sprig } from './Brand.tsx';
import { directionsUrl, mapEmbedUrl, mapsUrl } from '../utils/maps.ts';

export const LocationSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => (
  <section id="visit" className="py-20 md:py-28 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div className="md:col-span-7 order-2 md:order-1 double-frame glow" data-reveal>
        <div className="double-frame-inner relative aspect-[4/3] bg-bg-alt overflow-hidden">
          {/* Shown if the map can't load (offline, blocked); the map covers it when it does. */}
          <a
            href={mapsUrl(salonInfo)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6"
          >
            <MapPin className="w-10 h-10 text-gold" aria-hidden="true" />
            <span className="font-display font-semibold text-2xl">{salonInfo.street}</span>
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

      <div className="md:col-span-5 order-1 md:order-2">
        <p className="label" data-reveal>Find the lofts</p>
        <h2 data-reveal className="font-display font-semibold text-5xl sm:text-6xl leading-[1] mt-4">Visit us</h2>
        <Sprig className="w-44 text-gold mt-6" />

        <address data-reveal className="not-italic mt-7 font-display font-semibold text-3xl leading-tight">
          {salonInfo.street}
          <br />
          {salonInfo.suite}
          <br />
          {salonInfo.city}, MN {salonInfo.zip}
        </address>

        <div data-reveal className="mt-7 flex items-center gap-5">
          <AppointmentSeal className="w-24 h-24 shrink-0" />
          <p className="text-lg leading-relaxed text-ink-soft">
            Head inside to {salonInfo.suite}.{salonInfo.parking ? ` ${salonInfo.parking}` : ''} We're by appointment
            only, so please book before you visit.
          </p>
        </div>

        <div data-reveal className="mt-9 flex flex-wrap gap-3">
          <a
            href={directionsUrl(salonInfo)}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer inline-flex items-center gap-2.5 h-14 px-7 rounded-full bg-btn text-btn-ink text-lg font-semibold active:scale-[0.97] transition"
          >
            <Navigation className="w-5 h-5" aria-hidden="true" /> Get directions
          </a>
          {salonInfo.phoneRaw && (
            <>
              <a href={`tel:${salonInfo.phoneRaw}`} className="glow inline-flex items-center gap-2.5 h-14 px-6 rounded-full border border-gold text-lg font-semibold">
                <Phone className="w-5 h-5 text-gold" aria-hidden="true" /> Call
              </a>
              <a href={`sms:${salonInfo.phoneRaw}`} className="glow inline-flex items-center gap-2.5 h-14 px-6 rounded-full border border-gold text-lg font-semibold">
                <MessageSquare className="w-5 h-5 text-gold" aria-hidden="true" /> Text
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  </section>
);
