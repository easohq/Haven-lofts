import React, { useContext, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SalonInfo } from '../types.ts';
import { OpenPhoto, Photo } from './Photo.tsx';
import { Stripes } from './Brand.tsx';
import { PHOTO_ORDER, PhotoId } from '../data/photos.ts';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

/** A walk around the lofts, in the order you'd see it. Wide shots get a wider sleeve. */
const ROOMS: { id: PhotoId; caption: string; wide?: boolean }[] = [
  { id: 'entry-mirror', caption: 'Our mirror, by the door' },
  { id: 'lounge-coffee', caption: 'The lounge and coffee bar', wide: true },
  { id: 'gallery-wall', caption: 'A gallery-wall suite' },
  { id: 'suite-arch-mirror', caption: 'The arched-mirror suite' },
  { id: 'suite-slat', caption: 'Walnut slats and a wash chair', wide: true },
  { id: 'shampoo', caption: 'The wash bowls' },
  { id: 'suite-macrame', caption: 'A bright suite' },
  { id: 'entry-hall', caption: 'The floral hallway' },
  { id: 'lounge-wide', caption: 'Room to sit and wait', wide: true },
  { id: 'suite-window', caption: 'A quiet room with a big window' },
];

// The rooms on the olive wall: a few plain words, then the salon's own photos as a row of record sleeves
// you swipe or step through. Each sleeve's record peeks out under the pointer.
export const SpaceSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => {
  const open = useContext(OpenPhoto);
  const strip = useRef<HTMLUListElement>(null);
  // On phones, mark the sleeve that has snapped into view so its record peeks out (no hover on touch).
  useEffect(() => {
    const el = strip.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-active', e.intersectionRatio > 0.75)),
      { root: el, threshold: [0, 0.75, 1] },
    );
    el.querySelectorAll('.peek').forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  const step = (dir: 1 | -1) => {
    const el = strip.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section id="space" className="on-dark relative overflow-hidden bg-olive text-on-olive pt-24 pb-24 lg:pt-36 lg:pb-32 scroll-mt-16">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-start">
        <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6rem)] lg:col-span-6">
          Come on in
        </h2>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal style={d(90)}>
          <p className="text-lg leading-[1.6]">
            Haven Lofts is a set of private suites around a shared lounge in {salonInfo.suite}. Each suite is styled by
            the stylist who works in it, so it's just you and her, with the door closed. The coffee's on in the lounge.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={() => open(PHOTO_ORDER[0])} className="link-u text-lg font-bold mr-auto">
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
      </div>

      <div className="relative">
      <Stripes className="absolute inset-x-0 top-[38%] h-20 sm:h-28" />
      <ul
        ref={strip}
        className="suite-strip mt-14 lg:mt-20 flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-5 sm:px-8 lg:px-12 pt-3 pb-4"
        aria-label="Photos of the salon"
      >
        {ROOMS.map((r, i) => (
          <li
            key={r.id}
            className={`peek relative snap-start shrink-0 ${r.wide ? 'w-[84vw] sm:w-[58vw] lg:w-[40vw]' : 'w-[64vw] sm:w-[36vw] lg:w-[22vw]'}`}
            data-reveal
            style={d((i % 4) * 90)}
          >
            <div className="relative">
              <div className="record absolute top-[12%] right-[3%] w-[76%] aspect-square" aria-hidden="true" />
              <Photo
                id={r.id}
                sizes="(min-width:1024px) 40vw, 84vw"
                className="sleeve relative w-full h-[min(58vh,520px)] min-h-[320px] !shadow-[0_0_0_6px_var(--rim)]"
              />
            </div>
            <p className="mt-5 font-semibold">{r.caption}</p>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
};
