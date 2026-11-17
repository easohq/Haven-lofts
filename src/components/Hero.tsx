import React from 'react';
import { SalonInfo } from '../types.ts';
import { GoldArrow } from './Brand.tsx';

interface HeroProps {
  salonInfo: SalonInfo;
  onMessage?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ salonInfo, onMessage }) => (
  <section id="top" className="pt-6 pb-24 md:pt-12 md:pb-36">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <div className="lg:col-span-6 flex flex-col justify-center">
        <h1 className="rise">
          <img src="/haven-lofts-logo.png" alt="Haven Lofts" className="w-full max-w-[520px] h-auto -ml-2" />
        </h1>
        <p className="rise rise-2 caps text-lg sm:text-xl mt-6">By appointment only</p>
        <p className="rise rise-2 font-display font-medium text-3xl sm:text-4xl leading-[1.15] mt-6 max-w-lg">
          A hair salon in {salonInfo.city}, Minnesota, owned by {salonInfo.coFounders}.
        </p>
        <div className="rise rise-3 flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
          {onMessage && (
            <button
              type="button"
              onClick={onMessage}
              className="inline-flex items-center gap-4 h-14 px-8 bg-ink hover:bg-black active:scale-[0.97] text-white text-lg font-semibold transition"
            >
              Message a stylist <GoldArrow className="w-9" />
            </button>
          )}
          <a href="#visit" className="text-lg font-semibold underline underline-offset-[6px] decoration-2 decoration-gold hover:text-green transition-colors">
            Directions
          </a>
        </div>
      </div>

      <figure className="lg:col-span-6 border-2 border-gold p-2">
        <img
          src="/salon-lounge.jpg"
          width={1312}
          height={1199}
          alt="The lounge corner at Haven Lofts: a walnut slat wall on olive green, a woven pendant light, two leather chairs and a coffee bar"
          className="block w-full h-full object-cover"
        />
      </figure>
    </div>
  </section>
);
