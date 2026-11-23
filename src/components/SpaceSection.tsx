import React, { useContext, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { GoldArrow } from './Brand.tsx';
import { Candles, Ivy } from './Decor.tsx';
import { OpenPhoto, Photo } from './Photo.tsx';
import { PHOTO_ORDER, PhotoId } from '../data/photos.ts';

/** A walk around the lofts, in the order you'd see it. Wide shots get a wider frame. */
const ROOMS: { id: PhotoId; caption: string; wide?: boolean }[] = [
  { id: 'lounge-coffee', caption: 'The lounge and coffee bar', wide: true },
  { id: 'entry-mirror', caption: 'Our mirror, by the door' },
  { id: 'gallery-wall', caption: 'A gallery-wall suite' },
  { id: 'suite-slat', caption: 'Walnut slats and a wash chair', wide: true },
  { id: 'suite-velvet', caption: 'Mustard velvet and a styling chair' },
  { id: 'shampoo', caption: 'The wash bowls' },
  { id: 'suite-macrame', caption: 'A bright suite' },
  { id: 'lounge-wide', caption: 'Room to sit and wait', wide: true },
  { id: 'entry-hall', caption: 'The floral hallway' },
  { id: 'suite-window', caption: 'A quiet room with a big window' },
];

/** The photos of the salon as a strip you swipe (phones) or step through with the arrows (desktop). */
const RoomStrip: React.FC = () => {
  const open = useContext(OpenPhoto);
  const strip = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };
  return (
    <div className="relative mt-28 lg:mt-40">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-10">
        <h3 data-reveal className="display text-[clamp(2.5rem,4.5vw,3.75rem)]">
          Take a look around
        </h3>
        <div className="flex items-center gap-3" data-reveal>
          <button type="button" onClick={() => open(PHOTO_ORDER[0])} className="link-u text-lg font-semibold mr-3">
            See all {PHOTO_ORDER.length} photos
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photos" className="icon-btn !w-12 !h-12 hidden sm:flex">
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="More photos" className="icon-btn !w-12 !h-12 hidden sm:flex">
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul ref={strip} className="suite-strip flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-5 sm:px-8 lg:px-12 pb-2" aria-label="Photos of the salon">
        {ROOMS.map((r, i) => (
          <li key={r.id} className={`snap-start shrink-0 ${r.wide ? 'w-[86vw] sm:w-[60vw] lg:w-[42vw]' : 'w-[66vw] sm:w-[38vw] lg:w-[23vw]'}`} data-reveal style={{ '--delay': `${(i % 4) * 90}ms` } as React.CSSProperties}>
            <Photo id={r.id} sizes="(min-width:1024px) 42vw, 86vw" drift={false} className="w-full h-[min(62vh,560px)] min-h-[340px]" />
            <p className="mt-3 text-ink-soft">{r.caption}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Inside the lofts: the suites and the lounge beside an arched "mirror", then the spray tan room,
// lit by its neon sign against the floral wall.
export const SpaceSection: React.FC<{ salonInfo: SalonInfo; onBook: () => void }> = ({ salonInfo, onBook }) => (
  <section id="space" className="relative overflow-hidden bg-surface pt-32 lg:pt-44 scroll-mt-16">
    <Ivy length={3} className="hidden md:block left-[3%]" delay={0.4} />
    <Ivy length={1} flip className="hidden md:block right-[6%]" delay={2} />
    <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-center">
      <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
        <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)]">
          The space
        </h2>
        <p data-reveal className="mt-6 text-lg leading-[1.6] max-w-lg">
          Haven Lofts is a set of private suites, each styled by the stylist who works in it, around a shared lounge.
          You'll find us in {salonInfo.suite}.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
          <div data-reveal>
            <h3 className="display text-4xl">The suites</h3>
            <p className="mt-4 text-lg leading-[1.6]">
              Quiet rooms with tall arched mirrors, black styling chairs, warm sconces and plenty of green. Just you
              and your stylist.
            </p>
          </div>
          <div data-reveal style={{ '--delay': '140ms' } as React.CSSProperties} className="sm:mt-20">
            <h3 className="display text-4xl">The lounge</h3>
            <p className="mt-4 text-lg leading-[1.6]">
              Olive walls, a walnut slat wall, cognac leather chairs and a simple coffee bar, so there's something
              warm to sip while you wait.
            </p>
          </div>
        </div>
      </div>

      {/* Arched and backlit like the suite's own mirror, holding a photo of that suite. */}
      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 max-w-[420px] w-full mx-auto lg:mx-0 relative" data-reveal="image">
        <div className="arch-glow">
          <Photo id="suite-arch-mirror" sizes="(min-width:1024px) 420px, 90vw" className="arch w-full aspect-[4/5]" />
        </div>
        <p className="mt-5 text-ink-soft text-center">A suite at Haven Lofts, with its tall arched mirror</p>
      </div>
    </div>

    <RoomStrip />

    {/* The spray tan room: the floral wall, the neon sign, a tent each. */}
    <div id="spray-tan" className="relative mt-32 lg:mt-44 bg-olive-deep text-on-olive on-olive overflow-hidden scroll-mt-16" data-reveal>
      <div className="wallpaper-bg absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-olive-deep/80" aria-hidden="true" />
      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-center">
        <p className="neon lg:col-span-6 text-[clamp(4.5rem,11vw,9.5rem)] -rotate-3" aria-hidden="true">
          Spray Tan
        </p>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="display text-[clamp(2.5rem,4.5vw,3.75rem)]">A tan, in private</h2>
          <p className="mt-5 text-lg leading-[1.6] max-w-md">
            Sara and Leah each have their own spray tan tent, so a tan at Haven Lofts is as one-on-one as your
            haircut.
          </p>
          <Candles className="mt-8" />
          <button type="button" onClick={onBook} data-cta className="btn btn-gold mt-8">
            Book a spray tan <GoldArrow className="w-8" />
          </button>
        </div>
      </div>
    </div>
  </section>
);
