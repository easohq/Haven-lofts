import React, { useContext, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { OpenPhoto, Photo } from './Photo.tsx';
import { PHOTO_ORDER, PhotoId } from '../data/photos.ts';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

const SUITES: { id: PhotoId; wide?: boolean }[] = [
  { id: 'gallery-wall' },
  { id: 'suite-arch-mirror' },
  { id: 'suite-slat', wide: true },
  { id: 'suite-velvet' },
  { id: 'suite-macrame' },
  { id: 'treatment-room', wide: true },
  { id: 'suite-window' },
  { id: 'suite-macrame-2' },
];

/** The suites as a strip you swipe (phones) or step through with the arrows (desktop). */
const SuiteStrip: React.FC = () => {
  const strip = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };
  return (
    <div className="relative">
      <ul ref={strip} className="suite-strip flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-5 sm:px-8 lg:px-12 pb-2" aria-label="The suites">
        {SUITES.map((s, i) => (
          <li key={s.id} className={`snap-start shrink-0 ${s.wide ? 'w-[88vw] sm:w-[62vw] lg:w-[44vw]' : 'w-[70vw] sm:w-[40vw] lg:w-[24vw]'}`} data-reveal style={d((i % 4) * 90)}>
            <Photo id={s.id} sizes="(min-width:1024px) 44vw, 88vw" drift={false} className="w-full aspect-[3/4] sm:h-[min(68vh,640px)] sm:aspect-auto" />
          </li>
        ))}
      </ul>
      <div className="hidden sm:flex justify-end gap-3 mt-6 px-8 lg:px-12">
        <button type="button" onClick={() => step(-1)} aria-label="Previous suites" className="icon-btn !w-12 !h-12">
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="More suites" className="icon-btn !w-12 !h-12">
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

// A walk through the door: the welcome, the lounge, the suites, the wash. Each stop is the photo first,
// with a few words beside it, laid out like a magazine feature rather than a gallery grid.
export const SpaceSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => {
  const open = useContext(OpenPhoto);
  return (
    <section id="space" className="relative pt-28 lg:pt-40 pb-28 lg:pb-40 scroll-mt-16">
      {/* The welcome */}
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 items-end">
        <div className="lg:col-span-5 lg:self-start">
          <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)]">
            Come on in
          </h2>
          <p data-reveal style={d(90)} className="mt-6 text-lg leading-[1.6] max-w-md">
            Step through the door of {salonInfo.suite} and you're greeted by our mirror on a black wall, a pair of green
            velvet chairs, and a hallway papered in songbirds and blossoms.
          </p>
          <p data-reveal style={d(160)} className="mt-5 text-lg leading-[1.6] max-w-md">
            Haven Lofts is a set of private suites around a shared lounge. Each suite is styled by the stylist who works
            in it, so no two rooms look alike.
          </p>
          <button type="button" onClick={() => open(PHOTO_ORDER[0])} className="link-u text-lg font-semibold mt-8" data-reveal style={d(220)}>
            See all {PHOTO_ORDER.length} photos
          </button>
        </div>
        <div className="lg:col-span-3 lg:col-start-7 hidden sm:block" data-reveal="photo" style={d(120)}>
          <Photo id="entry-hall" sizes="(min-width:1024px) 22vw, 45vw" className="w-full aspect-[3/4]" />
        </div>
        <div className="lg:col-span-3 lg:col-start-10 lg:-mb-24" data-reveal="photo">
          <Photo id="entry-mirror" sizes="(min-width:1024px) 22vw, 90vw" className="arch w-full aspect-[3/4]" />
          <p className="mt-4 text-ink-soft">The first thing you'll see.</p>
        </div>
      </div>

      {/* The lounge */}
      <div className="mt-28 lg:mt-48 max-w-[88rem] mx-auto sm:px-8 lg:px-12 relative">
        <div data-reveal="photo">
          <Photo id="lounge-wide" sizes="(min-width:1408px) 1312px, 100vw" className="w-full aspect-[4/3] lg:aspect-[16/8]" />
        </div>
        <div
          data-reveal
          style={d(140)}
          className="relative bg-bg -mt-16 mx-5 sm:mx-0 sm:-mt-28 sm:max-w-md lg:max-w-lg sm:ml-8 lg:ml-16 p-7 sm:p-10"
        >
          <h3 className="display text-[clamp(2.5rem,4.5vw,3.75rem)]">The lounge</h3>
          <p className="mt-4 text-lg leading-[1.6]">
            Olive walls, a walnut slat shelf, woven pendant lights and cognac leather chairs. The coffee bar is simple,
            but there's always something warm to sip while you wait.
          </p>
        </div>
      </div>

      {/* The suites */}
      <div className="mt-28 lg:mt-40">
        <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 items-end mb-12">
          <h3 data-reveal className="display text-[clamp(2.75rem,5vw,4.25rem)] lg:col-span-6">
            The suites
          </h3>
          <p data-reveal style={d(90)} className="text-lg leading-[1.6] lg:col-span-5 lg:col-start-8">
            A gallery wall over a mustard velvet sofa. A tall arched gold mirror. Walnut slats and a wash chair. Quiet
            rooms with a door that closes: just you and your stylist.
          </p>
        </div>
        <SuiteStrip />
      </div>

      {/* The wash */}
      <div className="mt-28 lg:mt-40 max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 items-center">
        <div className="md:col-span-6 lg:col-span-5" data-reveal="photo">
          <Photo id="shampoo" sizes="(min-width:768px) 45vw, 90vw" className="w-full aspect-[4/5]" />
        </div>
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-7">
          <h3 data-reveal className="display text-[clamp(2.5rem,4.5vw,3.75rem)]">The wash</h3>
          <p data-reveal style={d(90)} className="mt-4 text-lg leading-[1.6] max-w-md">
            Reclining chairs at the wash bowls, under walnut cabinets and a trailing plant. Lean back; this part
            doesn't need rushing either.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md" data-reveal style={d(160)}>
            <Photo id="hallway" sizes="(min-width:768px) 20vw, 45vw" className="w-full aspect-[3/4]" />
            <Photo id="floral-panel" sizes="(min-width:768px) 20vw, 45vw" className="w-full aspect-[3/4] mt-12" />
          </div>
        </div>
      </div>
    </section>
  );
};
