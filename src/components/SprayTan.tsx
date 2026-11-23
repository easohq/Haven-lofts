import React from 'react';
import { GoldArrow } from './Brand.tsx';
import { Photo } from './Photo.tsx';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

// The spray tan room is the salon's moodiest: the floral wallpaper from the hallway behind the black of its walls,
// their own pink neon in a sleeve, and a tent each for Sara and Leah.
export const SprayTan: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section id="spray-tan" className="on-dark relative overflow-hidden bg-noir text-on-noir scroll-mt-16">
    <div className="wallpaper-bg absolute inset-0 opacity-25" aria-hidden="true" />
    <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 items-center">
      <div className="lg:col-span-6 relative grid grid-cols-5 gap-5 items-end" data-reveal>
        <Photo id="tan-neon" sizes="(min-width:1024px) 34vw, 60vw" className="sleeve relative col-span-3 w-full aspect-[4/3]" />
        <Photo id="tan-tent" sizes="(min-width:1024px) 22vw, 40vw" className="sleeve-sm relative col-span-2 w-full aspect-[3/4] lg:-mb-12" />
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6rem)]">
          A tan, in private
        </h2>
        <p data-reveal style={d(90)} className="mt-6 text-lg leading-[1.6] max-w-md">
          Sara and Leah each have their own spray tan tent, in a dark, cozy room with a robe waiting on the gold
          stand. A tan here is as one-on-one as your haircut.
        </p>
        <button type="button" onClick={onBook} data-cta className="btn btn-brass mt-9" data-reveal style={d(160)}>
          Book a spray tan <GoldArrow className="w-8" />
        </button>
      </div>
    </div>
  </section>
);
