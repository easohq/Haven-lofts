import React, { useEffect, useRef, useState } from 'react';
import { Service } from '../types.ts';
import { GoldArrow, Stripes } from './Brand.tsx';
import { Photo } from './Photo.tsx';
import { PhotoId } from '../data/photos.ts';

/** The room each service happens in. Services added later fall back to the lounge. */
const ROOM: Record<string, PhotoId> = {
  'Cuts & Styling': 'suite-macrame',
  'Dimensional Color & Balayage': 'suite-arch-mirror',
  'Blonding & Gray Blending': 'suite-velvet',
  'Gloss & Treatments': 'shampoo',
  'Spray Tans': 'tan-room',
};
const roomFor = (s: Service): PhotoId => ROOM[s.name] ?? 'lounge';

// The menu reads like the back of a record sleeve: a track list, each line with its price set flush right.
// On wide screens the mustard panel beside it holds the room for whichever service you're on.
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
    <section id="services" className="on-dark relative overflow-x-clip bg-cognac-field text-on-olive pt-24 pb-24 lg:pt-36 lg:pb-36 scroll-mt-16">
      <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
        <div className="order-1 lg:order-none lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(72px+2.5rem)] bg-mustard rounded-[28px] p-5 sm:p-8 aspect-[4/3] lg:aspect-auto lg:h-[calc(100vh-72px-5rem)] max-h-[720px]">
            <div className="relative w-full h-full">
              {services.map((s, i) => (
                <div
                  key={s.name}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === active ? 1 : 0 }}
                  inert={i !== active}
                >
                  <Photo id={roomFor(s)} sizes="38vw" className="sleeve-sm w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 lg:order-none lg:col-span-7">
          <h2 data-reveal className="display text-[clamp(3.25rem,7vw,6rem)]">
            Services
          </h2>
          <p data-reveal className="mt-6 text-lg leading-[1.6] max-w-lg">
            Every appointment starts with a conversation: your hair, your routine, and how much time you'd like to
            spend on it each morning. Prices are set at that consultation.
          </p>
          <Stripes className="mt-10 h-14 sm:h-16 mr-[calc(50%-50vw)]" />

          <ul className="mt-12 lg:mt-16">
            {services.map((s, i) => (
              <li
                key={s.name}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                data-i={i}
                data-reveal
                onPointerEnter={() => setActive(i)}
                className={`py-7 lg:py-9 transition-opacity duration-500 ${i === active ? '' : 'lg:opacity-55'}`}
              >
                <div className="flex items-baseline gap-4">
                  <h3 className="display text-[2rem] sm:text-[2.5rem]">{s.name}</h3>
                  {s.price && (
                    <>
                      <span className="flex-1 border-b-2 border-dotted border-on-olive/35 translate-y-[-0.35em] hidden sm:block" aria-hidden="true" />
                      <p className="font-bold shrink-0 hidden sm:block text-on-olive">{s.price}</p>
                    </>
                  )}
                </div>
                {s.price && <p className="sm:hidden mt-2 font-bold text-on-olive">{s.price}</p>}
                <p className="mt-3 text-lg leading-[1.6] max-w-xl text-on-olive/90">{s.description}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5" data-reveal>
            <p className="display text-3xl">Not sure where to start? We'll talk it through.</p>
            <button type="button" onClick={onBook} data-cta className="btn btn-gold shrink-0 self-start sm:self-auto sm:ml-auto">
              Book a visit <GoldArrow className="w-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
