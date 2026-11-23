import React from 'react';
import { SalonInfo } from '../types.ts';
import { GoldArrow } from './Brand.tsx';
import { Candles, FloralWall, Ivy } from './Decor.tsx';

const LEAF = '#6B7A55';

/** Fine line drawing of a Haven Lofts styling suite, drawn from a photo of the real room:
 *  a tall arched gold mirror, a black styling chair, a black cabinet, gold sconces and plants. */
const SuiteDrawing: React.FC = () => (
  <svg viewBox="0 0 400 500" className="block w-full h-full" role="img" aria-label="Drawing of a Haven Lofts suite: an arched gold mirror, a black styling chair, a black cabinet, gold sconces and plants">
    {/* floor */}
    <path d="M24 462 H376" stroke="var(--ink)" strokeOpacity="0.25" strokeWidth="1.2" />
    {/* the arched floor mirror */}
    <path d="M120 462 V176 A80 80 0 0 1 280 176 V462" fill="none" stroke="var(--gold)" strokeWidth="2.2" />
    <path d="M129 462 V176 A71 71 0 0 1 271 176 V462" fill="none" stroke="var(--gold)" strokeWidth="1" />
    <path d="M150 214 L196 168 M158 246 L222 182 M170 270 L204 236" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" />
    {/* gold sconces either side */}
    {[70, 330].map((x) => (
      <g key={x} stroke="var(--gold)" strokeWidth="1.6" fill="none">
        <path d={`M${x} 238 V222`} />
        <path d={`M${x - 8} 238 H${x + 8}`} />
        <circle cx={x} cy={212} r="10" />
        <circle cx={x} cy={212} r="3.5" fill="var(--gold)" stroke="none" />
      </g>
    ))}
    {/* black styling chair, chrome pedestal */}
    <g>
      <rect x="160" y="300" width="62" height="58" rx="10" fill="var(--ink)" />
      <rect x="146" y="338" width="11" height="32" rx="5" fill="var(--ink)" />
      <rect x="225" y="338" width="11" height="32" rx="5" fill="var(--ink)" />
      <rect x="150" y="356" width="82" height="18" rx="7" fill="var(--ink)" />
      <rect x="187" y="374" width="8" height="64" fill="var(--gold)" />
      <ellipse cx="191" cy="414" rx="22" ry="4.5" fill="none" stroke="var(--gold)" strokeWidth="1.6" />
      <ellipse cx="191" cy="446" rx="36" ry="7" fill="var(--ink)" />
    </g>
    {/* black cabinet with gold pulls */}
    <g>
      <rect x="292" y="334" width="80" height="128" fill="var(--ink)" />
      {[366, 398, 430].map((y) => (
        <path key={y} d={`M296 ${y} H368`} stroke="var(--surface)" strokeOpacity="0.35" strokeWidth="1" />
      ))}
      {[350, 382, 414, 446].map((y) => (
        <rect key={y} x="324" y={y - 1.5} width="16" height="3" rx="1.5" fill="var(--gold)" />
      ))}
    </g>
    {/* plant on the cabinet */}
    <g>
      {[
        'M332 304 C 328 276, 322 254, 326 228 C 334 252, 338 276, 336 304Z',
        'M330 304 C 318 284, 306 268, 300 246 C 314 262, 326 280, 334 304Z',
        'M336 304 C 346 282, 356 266, 366 250 C 358 270, 348 288, 338 304Z',
      ].map((d) => (
        <path key={d} d={d} fill={LEAF} />
      ))}
      <path d="M318 304 H350 L346 334 H322Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.2" />
    </g>
    {/* floor plant, left */}
    <g>
      {[
        'M58 420 C 52 386, 40 362, 30 344 C 48 360, 60 384, 64 420Z',
        'M62 420 C 62 384, 66 356, 76 330 C 76 360, 70 390, 68 420Z',
        'M66 420 C 74 394, 86 376, 100 362 C 92 384, 80 402, 72 420Z',
      ].map((d) => (
        <path key={d} d={d} fill={LEAF} />
      ))}
      <path d="M46 420 H86 L80 462 H52Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.2" />
    </g>
  </svg>
);

// Inside the lofts: the suites and the lounge beside an arched "mirror", then the spray tan room,
// lit by its neon sign against the floral wall.
export const SpaceSection: React.FC<{ salonInfo: SalonInfo; onBook: () => void }> = ({ salonInfo, onBook }) => (
  <section id="space" className="relative overflow-hidden bg-surface pt-32 lg:pt-44 scroll-mt-16">
    <Ivy length={3} className="hidden md:block left-[3%]" delay={0.4} />
    <Ivy length={1} flip className="right-[6%]" delay={2} />
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

      {/* Arched and backlit like the suite's own mirror. A real photo replaces the drawing once salonData.ts has one. */}
      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 max-w-[420px] w-full mx-auto lg:mx-0 relative" data-reveal="image">
        <div className="arch-glow">
          <div className="arch overflow-hidden aspect-[4/5] bg-bg">
            {salonInfo.suitePhoto ? (
              <img
                src={salonInfo.suitePhoto}
                alt="A styling suite at Haven Lofts: arched mirror, black styling chair and cabinet, plants"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full px-6 pt-12 pb-4">
                <SuiteDrawing />
              </div>
            )}
          </div>
        </div>
        <p className="mt-5 text-ink-soft text-center">A suite at Haven Lofts</p>
      </div>
    </div>

    {/* The spray tan room: the floral wall, the neon sign, a tent each. */}
    <div id="spray-tan" className="relative mt-32 lg:mt-44 bg-olive-deep text-on-olive on-olive overflow-hidden scroll-mt-16" data-reveal>
      <FloralWall className="inset-0 opacity-55" />
      <div className="absolute inset-0 bg-olive-deep/40" aria-hidden="true" />
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
