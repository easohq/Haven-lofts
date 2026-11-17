import { SalonInfo } from '../types.ts';

const query = (s: SalonInfo) => encodeURIComponent(`${s.street}, ${s.city}, ${s.state} ${s.zip}`);

/** Opens Google Maps (or the phone's maps app) on the salon. */
export const mapsUrl = (s: SalonInfo) => `https://www.google.com/maps/search/?api=1&query=${query(s)}`;

/** One-tap directions from wherever the visitor is. */
export const directionsUrl = (s: SalonInfo) => `https://www.google.com/maps/dir/?api=1&destination=${query(s)}`;

/** Keyless Google Maps embed. */
export const mapEmbedUrl = (s: SalonInfo) => `https://maps.google.com/maps?q=${query(s)}&z=15&output=embed`;
