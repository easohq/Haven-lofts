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

/** "10:00 AM – 8:00 PM" → "10am–8pm" */
export const shortHours = (hours: string) =>
  hours.replace(/:00/g, '').replace(/\s?(AM|PM)/g, (m) => m.trim().toLowerCase()).replace(/\s*[–—-]\s*/, '–');

/** A text message to the stylist, already written. `?&body=` works on both iOS and Android. */
export const smsHref = (stylist: Stylist, day?: string) =>
  `sms:${stylist.phoneRaw}?&body=${encodeURIComponent(
    day
      ? `Hi ${stylist.name}! I'd like to book an appointment on ${day}. What times do you have open?`
      : `Hi ${stylist.name}! I'd like to book an appointment. What times do you have open?`,
  )}`;
