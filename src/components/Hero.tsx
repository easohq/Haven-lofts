import React from 'react';
import { SalonInfo, Stylist } from '../types.ts';
import { lakevilleNow, shortHours, statusToday } from '../utils/hours.ts';
import { Juniper } from './Juniper.tsx';

interface HeroProps {
  salonInfo: SalonInfo;
  stylists: Stylist[];
}

export const Hero: React.FC<HeroProps> = ({ salonInfo, stylists }) => {
  const now = lakevilleNow();

  return (
    <section id="top" className="pt-8 pb-24 md:pt-14 md:pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <h1 className="rise font-display text-[clamp(3.75rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.03em]">
            Haven Lofts
          </h1>
          <p className="rise rise-2 font-display text-2xl sm:text-[2rem] leading-[1.2] mt-8 max-w-lg">
            Hair by Sara and Leah, upstairs at {salonInfo.street} in {salonInfo.city}.
          </p>
          <p className="rise rise-3 text-lg leading-relaxed mt-6 max-w-lg">
            We built this place to feel more like a living room than a salon floor: plants, warm wood, a good chair
            and nobody rushing you. There's no front desk taking bookings. You text whichever of us you'd like to see.
          </p>
          <div className="rise rise-4 flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
            <a
              href="#book"
              className="inline-flex items-center h-14 px-8 rounded-full bg-juniper hover:bg-juniper-deep active:scale-[0.97] text-white text-lg font-semibold transition"
            >
              See who's in this week
            </a>
            <a href="#visit" className="text-lg font-semibold underline underline-offset-[6px] decoration-2 decoration-gold hover:text-juniper transition-colors">
              Directions
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 bg-juniper text-on-dark flex flex-col min-h-[460px] lg:min-h-[640px] overflow-hidden">
          <Juniper className="sway w-full flex-1 max-h-[420px] lg:max-h-none p-6 sm:p-10" />
          <div className="bg-juniper-deep px-6 sm:px-10 py-6 sm:py-8">
            <h2 className="font-display text-2xl sm:text-3xl">Today, {now.day}</h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stylists.map((s) => {
                const { today, inNow, untilLabel } = statusToday(s, now);
                return (
                  <li key={s.id} className="text-lg">
                    <span className="font-semibold">{s.name}</span>
                    <span className="block text-on-dark/85">
                      {inNow ? (
                        <>
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#A9D18E] mr-2" aria-hidden="true" />
                          In now, until {untilLabel && shortHours(untilLabel)}
                        </>
                      ) : today && !today.isClosed ? (
                        <>Working {shortHours(today.hours)}</>
                      ) : (
                        <>Off today, texts welcome</>
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
