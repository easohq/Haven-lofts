import React from 'react';
import { Service } from '../types.ts';
import { GoldArrow, Sprig } from './Brand.tsx';

/** "Cuts & Styling" → "Cuts <em>&</em> Styling": the ampersand in italic, as a magazine would set it. */
const withItalicAmp = (name: string) =>
  name.split(' & ').flatMap((part, i) => (i ? [' ', <em key={i}>&amp;</em>, ' ', part] : [part]));

// Editorial menu: a header weighted to the left with its intro pushed to the far right, then a
// two-column list whose right column hangs lower, like a magazine spread.
export const Services: React.FC<{ services: Service[]; onBook: () => void }> = ({ services, onBook }) => (
  <section id="services" className="bg-bg-alt pt-24 pb-36 lg:pt-32 lg:pb-48 scroll-mt-16">
    <div className="max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-end">
        <div className="lg:col-span-7">
          <p className="kicker" data-reveal>The craft</p>
          <h2 data-reveal className="display text-[clamp(3rem,6.5vw,5.75rem)] mt-7">
            Our <em>services</em>
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9" data-reveal>
          <Sprig className="w-36 text-gold" />
          <p className="mt-5 text-lg leading-[1.7] text-ink-soft">
            Every appointment begins with a conversation: your hair, your routine, and how much time you'd like to
            spend on it each morning.
          </p>
        </div>
      </div>

      <ul className="mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-28 gap-y-16 lg:gap-y-20">
        {services.map((s, i) => (
          <li
            key={s.name}
            data-reveal
            style={{ '--delay': `${(i % 2) * 140}ms` } as React.CSSProperties}
            className="md:[&:nth-child(even)]:relative md:[&:nth-child(even)]:top-24"
          >
            <span className="text-gold text-xs" aria-hidden="true">✦</span>
            <h3 className="display text-4xl sm:text-[2.75rem] mt-3">{withItalicAmp(s.name)}</h3>
            <span className="block w-14 h-px bg-gold mt-6" aria-hidden="true" />
            <p className="mt-6 text-lg leading-[1.7] text-ink-soft max-w-md">{s.description}</p>
            <p className={`mt-4 font-display italic text-xl ${s.price ? 'text-cognac' : 'text-ink-soft'}`}>
              {s.price || 'Priced at consultation'}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-36 lg:mt-44 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 lg:ml-[8.33%]" data-reveal>
        <p className="display text-3xl sm:text-4xl max-w-md">
          Not sure where to start? <em>We'll talk it through.</em>
        </p>
        <button type="button" onClick={onBook} data-cta className="btn btn-primary text-lg shrink-0 self-start sm:self-auto">
          Book Appointment <GoldArrow className="w-9" />
        </button>
      </div>
    </div>
  </section>
);
