import React, { useContext } from 'react';
import { SalonInfo } from '../types.ts';
import { OpenPhoto, Photo } from './Photo.tsx';
import { PHOTO_ORDER, PhotoId } from '../data/photos.ts';

const d = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

/** A walk around the lofts, in the order you'd see it. Wide shots take two columns; four rows of four on desktop. */
const ROOMS: { id: PhotoId; caption: string; wide?: boolean }[] = [
  { id: 'entry-mirror', caption: 'Our mirror, by the door' },
  { id: 'lounge-coffee', caption: 'The lounge and coffee bar', wide: true },
  { id: 'gallery-wall', caption: "Leah's suite" },
  { id: 'suite-arch-mirror', caption: 'The arched-mirror suite' },
  { id: 'suite-slat', caption: "Leah's suite, with its wash chair", wide: true },
  { id: 'shampoo', caption: 'The wash bowls' },
  { id: 'suite-macrame', caption: 'A bright suite' },
  { id: 'entry-hall', caption: 'The floral hallway' },
  { id: 'lounge-wide', caption: 'Room to sit and wait', wide: true },
  { id: 'suite-window', caption: "Sara's suite: quiet, with a big window" },
  { id: 'hallway', caption: 'Down the hall to the suites' },
  { id: 'treatment-room', caption: 'A treatment room', wide: true },
];

// The rooms on the warm white wall: a few plain words, then the salon's own photos as a grid of sleeves that
// stays inside the page margins. Any photo opens full screen.
export const SpaceSection: React.FC<{ salonInfo: SalonInfo }> = ({ salonInfo }) => {
  const open = useContext(OpenPhoto);

  return (
    <section id="space" className="relative overflow-hidden bg-bg text-ink pt-24 pb-24 lg:pt-36 lg:pb-32 scroll-mt-16">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-start">
          <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6rem)] lg:col-span-6">
            Come on in
          </h2>
          <div className="lg:col-span-5 lg:col-start-8" data-reveal style={d(90)}>
            <p className="text-lg leading-[1.6]">
              Haven Lofts is a set of private suites around a shared lounge in {salonInfo.suite}. Each suite is styled by
              the stylist who works in it, so it's just you and her, with the door closed. The coffee's on in the lounge.
            </p>
            <button type="button" onClick={() => open(PHOTO_ORDER[0])} className="link-u text-lg font-bold mt-6">
              See all {PHOTO_ORDER.length} photos
            </button>
          </div>
        </div>

        <div className="relative mt-14 lg:mt-20">
          <ul className="relative grid grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-x-5 gap-y-8 sm:gap-x-8 sm:gap-y-10" aria-label="Photos of the salon">
            {ROOMS.map((r, i) => (
              <li key={r.id} className={`relative ${r.wide ? 'col-span-2' : ''}`} data-reveal style={d((i % 4) * 80)}>
                <div className="relative">
                  <Photo id={r.id} sizes={r.wide ? '(min-width:1024px) 44vw, 90vw' : '(min-width:1024px) 22vw, 45vw'} className="sleeve sleeve-thin relative w-full h-56 sm:h-72 lg:h-[380px]" />
                </div>
                <p className="mt-4 font-semibold">{r.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
