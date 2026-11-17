import { Stylist } from '../types.ts';

/** A text message to the stylist, already started. `?&body=` works on both iOS and Android. */
export const smsHref = (stylist: Stylist) =>
  `sms:${stylist.phoneRaw}?&body=${encodeURIComponent(`Hi ${stylist.name}! I'd like to book an appointment at Haven Lofts.`)}`;
