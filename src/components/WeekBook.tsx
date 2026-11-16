import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Stylist } from '../types.ts';
import { lakevilleNow, shortHours, smsHref } from '../utils/hours.ts';

// The appointment book: both stylists' weeks side by side. Tapping a time opens a text to that stylist, already written.
export const WeekBook: React.FC<{ stylists: Stylist[] }> = ({ stylists }) => {
  const today = lakevilleNow().day;
  const days = stylists[0].schedule.map((d) => d.day);

  return (
    <section id="book" className="bg-mist py-24 md:py-36 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 className="font-display text-5xl sm:text-6xl leading-[1] tracking-[-0.02em]">Who's in this week</h2>
          <p className="mt-6 text-lg leading-relaxed">
            We each keep our own hours. Tap a time to text that stylist about that day, and we'll write back with
            what's open.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Rather call? Sara is{' '}
            <a href={`tel:${stylists[0].phoneRaw}`} className="font-semibold underline underline-offset-4 decoration-gold whitespace-nowrap">{stylists[0].phone}</a>
            {' '}and Leah is{' '}
            <a href={`tel:${stylists[1].phoneRaw}`} className="font-semibold underline underline-offset-4 decoration-gold whitespace-nowrap">{stylists[1].phone}</a>.
          </p>
        </div>

        <div className="lg:col-span-8">
          <table className="w-full text-base sm:text-lg border-separate border-spacing-y-1.5">
            <thead>
              <tr>
                <td />
                {stylists.map((s) => (
                  <th key={s.id} scope="col" className="font-display font-normal text-2xl sm:text-4xl text-left px-2 sm:px-4 pb-3">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const isToday = day === today;
                return (
                  <tr key={day} className={isToday ? 'bg-paper' : ''}>
                    <th scope="row" className="text-left font-semibold py-2 pl-3 pr-2 whitespace-nowrap">
                      <span className="sm:hidden">{day.slice(0, 3)}</span>
                      <span className="hidden sm:inline">{day}</span>
                      {isToday && <span className="block text-sm font-normal text-muted">today</span>}
                    </th>
                    {stylists.map((s) => {
                      const d = s.schedule.find((x) => x.day === day);
                      const byRequest = d?.hours.toLowerCase().includes('request');
                      if (!d || (d.isClosed && !byRequest)) {
                        return <td key={s.id} className="px-2 sm:px-4 py-2 text-muted">Off</td>;
                      }
                      return (
                        <td key={s.id} className="px-1 sm:px-2 py-1">
                          <a
                            href={smsHref(s, day)}
                            aria-label={`Text ${s.name} about ${day}, ${byRequest ? 'by request' : d.hours}`}
                            className={`group flex items-center justify-between gap-2 rounded-full ${isToday ? 'bg-white' : 'bg-paper'} hover:bg-juniper hover:text-white active:scale-[0.97] px-3 sm:px-4 h-11 sm:h-12 tabular-nums transition`}
                          >
                            <span className="whitespace-nowrap">{byRequest ? 'By request' : shortHours(d.hours)}</span>
                            <MessageSquare className="w-4 h-4 shrink-0 text-juniper group-hover:text-white hidden sm:block" aria-hidden="true" />
                          </a>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-muted">Hours are Lakeville time.</p>
        </div>
      </div>
    </section>
  );
};
