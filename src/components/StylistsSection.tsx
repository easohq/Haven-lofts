import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Stylist } from '../types.ts';
import { lakevilleNow } from '../utils/hours.ts';

interface StylistsSectionProps {
  stylists: Stylist[];
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ stylists }) => {
  const todayName = lakevilleNow().day;

  return (
    <section id="stylists" className="bg-field py-24 md:py-36 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-end">
          <h2 className="lg:col-span-7 font-display font-medium text-6xl sm:text-7xl leading-[0.95] tracking-[-0.02em]">
            Meet Sara &amp; Leah
          </h2>
          <p className="lg:col-span-5 text-lg leading-relaxed">
            Two stylists with over twenty years each behind the chair. We each run our own chair and our own hours,
            so call or text whichever of us you'd like to see.
          </p>
        </div>

        <div className="mt-20 md:mt-28 flex flex-col gap-24 md:gap-32">
          {stylists.map((s) => (
            <article key={s.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7">
                <h3 className="font-display font-medium text-7xl sm:text-8xl leading-none tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-3 text-muted text-base">{s.role}</p>
                <p className="mt-8 text-lg leading-relaxed max-w-2xl">{s.bio}</p>

                <h4 className="mt-10 font-display text-2xl">What {s.name} loves doing</h4>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-base">
                  {s.specialties.map((spec) => (
                    <li key={spec} className="flex gap-3">
                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-10">
                  <a href={`tel:${s.phoneRaw}`} className="flex items-center gap-2 h-14 px-6 bg-sage hover:bg-sage-dark active:scale-[0.97] text-white font-semibold transition">
                    <Phone className="w-4 h-4" aria-hidden="true" /> Call {s.phone}
                  </a>
                  <a href={`sms:${s.phoneRaw}`} className="flex items-center gap-2 h-14 px-6 bg-ground hover:bg-white active:scale-[0.97] font-semibold transition">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" /> Text {s.name}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-ground p-6 sm:p-8 self-start w-full">
                <table className="w-full text-base">
                  <caption className="text-left font-display text-3xl pb-4">{s.name}'s hours</caption>
                  <tbody>
                    {s.schedule.map((d) => {
                      const isToday = d.day === todayName;
                      return (
                        <tr key={d.day} className={isToday ? 'bg-field font-semibold' : ''}>
                          <th scope="row" className="text-left font-normal py-2.5 pl-3 pr-4">
                            {d.day}
                            {isToday && <span className="ml-2 text-gold font-semibold">Today</span>}
                          </th>
                          <td className={`py-2.5 pr-3 text-right tabular-nums ${d.isClosed ? 'text-muted' : ''}`}>
                            {d.hours}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-muted">Lakeville (Central) time</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
