import React, { useEffect, useRef, useState } from 'react';
import { Service } from '../types.ts';
import { GoldArrow } from './Brand.tsx';
import { Photo } from './Photo.tsx';
import { PhotoId } from '../data/photos.ts';

/** The room each service happens in. Services added later fall back to the lounge. */
const ROOM: Record<string, PhotoId> = {
  'Cuts & Styling': 'suite-macrame',
  'Dimensional Color & Balayage': 'suite-arch-mirror',
  'Blonding & Gray Blending': 'suite-velvet',
  'Gloss & Treatments': 'shampoo',
  'Spray Tans': 'tan-tent',
};
const roomFor = (s: Service): PhotoId => ROOM[s.name] ?? 'lounge';

// The menu on the right; on wide screens the photo on the left stays put and cross-fades to the room
// for whichever service is in the middle of the screen (or under the pointer). Phones get a photo per row.
export const Services: React.FC<{ services: Service[]; onBook: () => void }> = ({ services, onBook }) => {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [services.length]);

  return (
    <section id="services" className="relative bg-bg-alt pt-28 pb-28 lg:pt-40 lg:pb-40 scroll-mt-16">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-8">
        {/* The stage: every room is stacked, and only the active one shows. */}
        <div className="hidden lg:block lg:col-span-5">
          <div className="sticky top-[calc(72px+3rem)] h-[calc(100vh-72px-6rem)] max-h-[760px]">
            {services.map((s, i) => (
              <div
                key={s.name}
                className="service-stage absolute inset-0"
                data-on={i === active || undefined}
                inert={i !== active}
              >
                <Photo id={roomFor(s)} sizes="40vw" drift={false} className="arch w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)]">
            Our services
          </h2>
          <p data-reveal className="mt-6 text-lg leading-[1.6] max-w-md">
            Every appointment begins with a conversation: your hair, your routine, and how much time you'd like to
            spend on it each morning.
          </p>

          <ul className="mt-16 lg:mt-24">
            {services.map((s, i) => (
              <li
                key={s.name}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                data-i={i}
                data-reveal
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="service-row py-10 lg:py-14"
                data-on={i === active || undefined}
              >
                <div className="lg:hidden mb-6">
                  <Photo id={roomFor(s)} sizes="90vw" drift={false} className="w-full aspect-[4/3]" />
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="display text-4xl sm:text-[2.75rem]">{s.name}</h3>
                  <p className={`font-semibold ${s.price ? 'text-cognac' : 'text-gold-ink'}`}>
                    {s.price || 'Priced at consultation'}
                  </p>
                </div>
                <p className="mt-4 text-lg leading-[1.6] max-w-lg">{s.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col sm:flex-row sm:items-center gap-6" data-reveal>
            <p className="display text-3xl max-w-xs">Not sure where to start? We'll talk it through.</p>
            <button type="button" onClick={onBook} data-cta className="btn btn-primary text-lg shrink-0 self-start sm:self-auto">
              Book Appointment <GoldArrow className="w-9" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
