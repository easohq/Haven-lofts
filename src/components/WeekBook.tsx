import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Stylist } from '../types.ts';
import { lakevilleNow, shortHours, smsHref } from '../utils/hours.ts';

// Every stylist's week side by side. Tapping a time opens a text to that stylist about that day, already written.
export const WeekBook: React.FC<{ stylists: Stylist[] }> = ({ stylists }) => {
  const today = lakevilleNow().day;
  const days = stylists[0].schedule.map((d) => d.day);

  return (
    <section id="hours" className="bg-stone py-24 md:py-36 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 className="font-display font-semibold text-5xl sm:text-6xl leading-[1]">Hours this week</h2>
          <p className="mt-6 text-lg leading-relaxed">
            We're by appointment only, and each stylist keeps their own hours. Tap a time to message that stylist
            about that day.
          </p>
        </div>

        <div className="lg:col-span-8">
          <table className="w-full text-base sm:text-lg border-separate border-spacing-y-1.5">
            <thead>
              <tr>
                <td />
                {stylists.map((s) => (
                  <th key={s.id} scope="col" className="font-display font-semibold text-3xl sm:text-4xl text-left px-2 sm:px-4 pb-3">
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
                      {isToday && <span className="block text-sm font-normal text-gold-text">today</span>}
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
                            aria-label={`Message ${s.name} about ${day}, ${byRequest ? 'by request' : d.hours}`}
                            className={`group flex items-center justify-between gap-2 ${isToday ? 'bg-stone' : 'bg-paper'} hover:bg-ink hover:text-white active:scale-[0.97] px-3 sm:px-4 h-11 sm:h-12 tabular-nums transition`}
                          >
                            <span className="whitespace-nowrap">{byRequest ? 'By request' : shortHours(d.hours)}</span>
                            <MessageSquare className="w-4 h-4 shrink-0 text-gold hidden sm:block" aria-hidden="true" />
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
