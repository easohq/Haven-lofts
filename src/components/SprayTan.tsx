import React from 'react';
import { GoldArrow } from './Brand.tsx';
import { Photo } from './Photo.tsx';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// The spray tan room is the salon's moodiest: dark walls, their own pink neon, a tent each for Sarah
// and Leah. The band opens under a strip of the hallway's floral wallpaper, then lets the neon lead.
export const SprayTan: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section id="spray-tan" className="relative bg-noir text-on-olive on-olive overflow-hidden scroll-mt-16">
    <div className="wallpaper-strip h-40 sm:h-56" aria-hidden="true" />

    <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 pb-28 lg:pb-32 -mt-10 sm:-mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-end">
        <div className="lg:col-span-7" data-reveal="photo">
          <Photo id="tan-neon" sizes="(min-width:1024px) 55vw, 100vw" className="w-full aspect-[4/3]" />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:pb-6">
          <h2 data-reveal className="display text-[clamp(3rem,5.5vw,4.75rem)]">
            A tan, in private
          </h2>
          <p data-reveal style={d(90)} className="mt-6 text-lg leading-[1.6] max-w-md">
            Sarah and Leah each have their own spray tan tent, in a dark, cozy room with a robe waiting on the gold
            stand. A tan here is as one-on-one as your haircut.
          </p>
          <button type="button" onClick={onBook} data-cta className="btn btn-gold mt-9" data-reveal style={d(160)}>
            Book a spray tan <GoldArrow className="w-8" />
          </button>
        </div>
      </div>

      <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        <div className="col-span-2 lg:col-span-6" data-reveal="photo">
          <Photo id="tan-room" sizes="(min-width:1024px) 48vw, 100vw" className="w-full aspect-[4/3]" />
        </div>
        <div className="lg:col-span-3 lg:mt-24" data-reveal="photo" style={d(120)}>
          <Photo id="tan-tent-2" sizes="(min-width:1024px) 24vw, 48vw" className="w-full aspect-[3/4]" />
        </div>
        <div className="lg:col-span-3 mt-16 lg:mt-32" data-reveal="photo" style={d(240)}>
          <Photo id="tan-art" sizes="(min-width:1024px) 24vw, 48vw" className="w-full aspect-[3/4]" />
          <p className="mt-4 text-on-olive/75">On the wall: the beach, in pink.</p>
        </div>
      </div>
    </div>
  </section>
);
