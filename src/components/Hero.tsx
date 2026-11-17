import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { lakevilleNow, shortHours, statusToday } from '../utils/hours.ts';
import { GoldArrow, Wallpaper } from './Brand.tsx';

interface HeroProps {
  salonInfo: SalonInfo;
  stylists: Stylist[];
  onMessage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ salonInfo, stylists, onMessage }) => {
  const now = lakevilleNow();

  return (
    <section id="top" className="pt-6 pb-24 md:pt-12 md:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h1 className="rise">
            <img src="/haven-lofts-logo.png" alt="Haven Lofts" className="w-full max-w-[520px] h-auto -ml-2" />
          </h1>
          <p className="rise rise-2 caps text-lg sm:text-xl mt-6">By appointment only</p>
          <p className="rise rise-2 font-display font-medium text-3xl sm:text-4xl leading-[1.15] mt-6 max-w-lg">
            A boho, modern hair salon in {salonInfo.city}, made of private suites.
          </p>
          <p className="rise rise-3 text-lg leading-relaxed mt-5 max-w-lg">
            Wood paneling, warm lights, green walls and one wall of floral wallpaper. Each suite has its own style,
            and your appointment happens in your stylist's own room, never on a busy salon floor.
          </p>
          <div className="rise rise-4 flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
            <button
              type="button"
              onClick={onMessage}
              className="inline-flex items-center gap-4 h-14 px-8 bg-ink hover:bg-black active:scale-[0.97] text-white text-lg font-semibold transition"
            >
              Message a stylist <GoldArrow className="w-9" />
            </button>
            <a href="#visit" className="text-lg font-semibold underline underline-offset-[6px] decoration-2 decoration-gold hover:text-green transition-colors">
              Directions
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col min-h-[440px] lg:min-h-[640px]">
          <Wallpaper className="w-full flex-1 min-h-[300px]" />
          <div className="bg-green-deep text-on-dark px-6 sm:px-10 py-6 sm:py-8">
            <h2 className="font-display font-semibold text-3xl">Today, {now.day}</h2>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stylists.map((s) => {
                const { today, inNow, untilLabel } = statusToday(s, now);
                return (
                  <li key={s.id} className="text-lg">
                    <span className="font-semibold">{s.name}</span>
                    <span className="block text-on-dark/85">
                      {inNow ? (
                        <>
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold mr-2" aria-hidden="true" />
                          In now, until {untilLabel && shortHours(untilLabel)}
                        </>
                      ) : today && !today.isClosed ? (
                        <>Working {shortHours(today.hours)}</>
                      ) : (
                        <>Off today</>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
