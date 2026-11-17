export interface StylistScheduleDay {
  day: string;
  shortDay: string;
  hours: string;
  isClosed?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  phone: string;
  phoneRaw: string;
  bio: string;
  specialties: string[];
  schedule: StylistScheduleDay[];
  imageKey: string;
  /** Headshot path in /public, e.g. '/sarah.jpg'. Empty shows a monogram. */
  photo: string;
  /** Instagram handle without the @. Empty hides the link. */
  instagram: string;
  /** Online booking page (GlossGenius, Vagaro, Square...). Empty hides the button. */
  bookingUrl: string;
  /** Email for booking questions. Empty hides the button. */
  email: string;
}

export interface Service {
  name: string;
  description: string;
  /** Starting price, e.g. 'from $65'. Empty shows "Priced at consultation". */
  price: string;
}

export interface LoftSpace {
  id: string;
  title: string;
  subtitle: string;
  aspect: string;
  recommendedResolution: string;
  description: string;
  imageKey: string;
  defaultConceptImage?: string;
}

export interface SalonInfo {
  name: string;
  tagline: string;
  city: string;
  state: string;
  zip: string;
  street: string;
  suite: string;
  coFounders: string;
  phone: string;
  phoneRaw: string;
  /** Instagram handle without the @. Empty hides the icon. */
  instagram: string;
  /** Parking or arrival note for the Visit section. Empty hides it. */
  parking: string;
  /** Full-size photo of a styling suite in /public, e.g. '/suite.jpg'. Empty shows the line drawing. */
  suitePhoto: string;
}
