import { Stylist } from '../types.ts';

const toMinutes = (h: string, m: string, ap: string) =>
  (Number(h) % 12 + (ap.toUpperCase() === 'PM' ? 12 : 0)) * 60 + Number(m);

/** "9:00 AM – 6:00 PM" → [540, 1080] minutes after midnight, or null if it isn't a range. */
export function parseRange(hours: string): [number, number] | null {
  const m = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–—-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  return m ? [toMinutes(m[1], m[2], m[3]), toMinutes(m[4], m[5], m[6])] : null;
}

/** Weekday and minutes-after-midnight in Lakeville, whatever the visitor's own time zone. */
export function lakevilleNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: get('weekday'), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export function statusToday(stylist: Stylist, now = lakevilleNow()) {
  const today = stylist.schedule.find((d) => d.day === now.day);
  const range = today && !today.isClosed ? parseRange(today.hours) : null;
  const inNow = !!range && now.minutes >= range[0] && now.minutes < range[1];
  return { today, inNow, untilLabel: today?.hours.split(/[–—-]/)[1]?.trim() };
}
