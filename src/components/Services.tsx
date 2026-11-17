import React from 'react';
import { Service } from '../types.ts';
import { GoldArrow, Sprig } from './Brand.tsx';

// Set like a vintage salon menu card: double gold frame, each service with a dotted leader to its price.
export const Services: React.FC<{ services: Service[]; onBook: () => void }> = ({ services, onBook }) => (
  <section id="services" className="bg-bg-alt py-20 md:py-28 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <p className="label" data-reveal>The menu</p>
        <h2 data-reveal className="font-display font-semibold text-5xl sm:text-6xl leading-[1] mt-4">Services</h2>
        <Sprig className="w-44 text-gold mt-6" />
        <p data-reveal className="text-lg leading-relaxed text-ink-soft mt-6 max-w-md">
          Every appointment starts with a conversation about your hair, your routine and how much time you want to
          spend on it each morning.
        </p>
        <button
          type="button"
          onClick={onBook}
          data-reveal
          data-cta
          className="shimmer inline-flex items-center gap-4 h-14 px-8 mt-8 rounded-full bg-btn text-btn-ink text-lg font-semibold active:scale-[0.97] transition"
        >
          Book Appointment <GoldArrow className="w-9" />
        </button>
      </div>

      <div className="lg:col-span-8 double-frame bg-surface glow" data-reveal>
        <ul className="double-frame-inner px-5 sm:px-10 py-4 sm:py-6">
          {services.map((s, i) => (
            <li key={s.name} data-reveal style={{ '--delay': `${i * 80}ms` } as React.CSSProperties} className="py-6 sm:py-7 [&+li]:border-t [&+li]:border-gold/30">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <h3 className="font-display font-semibold text-2xl sm:text-3xl leading-tight">{s.name}</h3>
                <span className="hidden sm:block flex-1 border-b-2 border-dotted border-gold/50 translate-y-[-6px] min-w-6" aria-hidden="true" />
                <span className={`shrink-0 sm:text-right ${s.price ? 'font-display font-semibold text-2xl text-cognac' : 'text-sm text-ink-soft italic'}`}>
                  {s.price || 'Priced at consultation'}
                </span>
              </div>
              <p className="mt-2 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
