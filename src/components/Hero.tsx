import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { SalonInfo, Stylist } from '../types.ts';
import { lakevilleNow, statusToday } from '../utils/hours.ts';

interface HeroProps {
  salonInfo: SalonInfo;
  stylists: Stylist[];
  onOpenPhoneMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ salonInfo, stylists, onOpenPhoneMenu }) => {
  const now = lakevilleNow();

  return (
    <section id="top" className="pt-10 pb-24 md:pt-16 md:pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="rise font-display font-medium text-[clamp(4rem,10vw,9rem)] leading-[0.9] tracking-[-0.02em]">
            Haven Lofts
          </h1>
          <p className="rise rise-2 font-display text-2xl sm:text-3xl leading-snug mt-8 max-w-xl">
            A cozy hair salon in {salonInfo.city}, Minnesota, run by longtime local stylists Sara and Leah.
          </p>
          <p className="rise rise-3 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
            Think warm wood, lots of greenery, comfortable chairs and an unhurried conversation. We each keep our
            own schedule, so you book straight with your stylist by phone or text.
          </p>
          <div className="rise rise-4 flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
            <button
              type="button"
              onClick={onOpenPhoneMenu}
              className="h-14 px-8 bg-sage hover:bg-sage-dark active:scale-[0.97] text-white text-base font-semibold transition"
            >
              Call or text to book
            </button>
            <a href="#visit" className="text-base font-semibold underline underline-offset-4 decoration-2 decoration-gold hover:text-sage transition-colors">
              {salonInfo.street}, {salonInfo.city}
            </a>
          </div>
        </div>

        {/* The live panel: who is in the salon today, in Lakeville time */}
        <div id="today" className="lg:col-span-5 bg-sage text-on-sage p-6 sm:p-10 flex flex-col scroll-mt-24">
          <h2 className="font-display text-4xl sm:text-5xl leading-none">Today at Haven Lofts</h2>
          <p className="mt-3 text-on-sage/80">{now.day} in {salonInfo.city}</p>

          <div className="mt-8 flex flex-col gap-8 flex-1 justify-center">
            {stylists.map((s) => {
              const { today, inNow, untilLabel } = statusToday(s, now);
              return (
                <div key={s.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-4xl sm:text-5xl leading-none">{s.name}</h3>
                    <a href={`tel:${s.phoneRaw}`} className="text-lg font-semibold tabular-nums hover:underline">
                      {s.phone}
                    </a>
                  </div>
                  <p className="mt-2 text-base">
                    {inNow ? (
                      <><span className="inline-block w-2 h-2 rounded-full bg-[#B9D99B] mr-2 align-middle" aria-hidden="true" />In the salon now, until {untilLabel}</>
                    ) : today && !today.isClosed ? (
                      <>Working {today.hours}</>
                    ) : (
                      <>Not in today. Texts are welcome.</>
                    )}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <a href={`tel:${s.phoneRaw}`} className="flex items-center justify-center gap-2 h-12 bg-on-sage text-ink font-semibold hover:bg-white active:scale-[0.97] transition">
                      <Phone className="w-4 h-4" aria-hidden="true" /> Call {s.name}
                    </a>
                    <a href={`sms:${s.phoneRaw}`} className="flex items-center justify-center gap-2 h-12 bg-sage-dark text-on-sage font-semibold hover:bg-[#323C2D] active:scale-[0.97] transition">
                      <MessageSquare className="w-4 h-4" aria-hidden="true" /> Text {s.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
