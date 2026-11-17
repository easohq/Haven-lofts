import { Stylist, LoftSpace, SalonInfo, Service } from '../types.ts';

export const INITIAL_SALON_INFO: SalonInfo = {
  name: 'Haven Lofts',
  tagline: 'A warm, inviting hair salon in Lakeville, Minnesota',
  city: 'Lakeville',
  state: 'Minnesota',
  zip: '55044',
  street: '17685 Juniper Path',
  suite: 'Suite 204',
  coFounders: 'Sarah & Leah',
  phone: '',
  phoneRaw: '',
  instagram: '',
  parking: '',
  suitePhoto: '',
};

// Contact details stay empty until the real ones are known; each button appears once its field is filled:
//   phone / phoneRaw  '(952) 555-0100' / '9525550100'  -> Call, Text and Copy number
//   bookingUrl        'https://...'                    -> Book online (GlossGenius, Vagaro, Square...)
//   email             'sarah@example.com'              -> Email
//   instagram         'handle' (no @)                  -> Instagram
//   photo             '/sarah.jpg' (file in /public)   -> replaces the monogram inside the arched frame
export const INITIAL_STYLISTS: Stylist[] = [
  {
    id: 'sara',
    name: 'Sarah',
    role: 'Owner',
    phone: '',
    phoneRaw: '',
    bio: 'Sarah has been doing hair in the south metro for over 20 years. She loves easy-to-manage lived-in cuts, soft dimensional color, and catching up with her clients in a relaxed, comfortable chair. No rushing, no pressure—just good honest hair care.',
    specialties: ['Lived-In Cuts & Layers', 'Dimensional Color & Highlights', 'Easy Low-Maintenance Styles', 'Blowouts & Styling'],
    imageKey: 'stylist_sarah',
    photo: '',
    instagram: '',
    bookingUrl: '',
    email: '',
    schedule: [
      { day: 'Monday', shortDay: 'Mon', hours: 'Closed / By Special Request', isClosed: true },
      { day: 'Tuesday', shortDay: 'Tue', hours: '9:00 AM – 6:00 PM' },
      { day: 'Wednesday', shortDay: 'Wed', hours: '9:00 AM – 7:00 PM' },
      { day: 'Thursday', shortDay: 'Thu', hours: '10:00 AM – 8:00 PM' },
      { day: 'Friday', shortDay: 'Fri', hours: '9:00 AM – 5:00 PM' },
      { day: 'Saturday', shortDay: 'Sat', hours: '9:00 AM – 3:00 PM' },
      { day: 'Sunday', shortDay: 'Sun', hours: 'Closed', isClosed: true },
    ],
  },
  {
    id: 'leah',
    name: 'Leah',
    role: 'Owner',
    phone: '',
    phoneRaw: '',
    bio: 'With over two decades behind the chair, Leah is known for her friendly, down-to-earth approach and great listening ear. She specializes in natural gray blending, soft dimensional blonding, and precision cuts that look great every morning without fuss.',
    specialties: ['Custom Blonding & Foiling', 'Gray Coverage & Blending', 'Textured Bobs & Soft Shags', 'Deep Conditioning Treatments'],
    imageKey: 'stylist_leah',
    photo: '',
    instagram: '',
    bookingUrl: '',
    email: '',
    schedule: [
      { day: 'Monday', shortDay: 'Mon', hours: '10:00 AM – 6:00 PM' },
      { day: 'Tuesday', shortDay: 'Tue', hours: '9:00 AM – 7:00 PM' },
      { day: 'Wednesday', shortDay: 'Wed', hours: 'Closed', isClosed: true },
      { day: 'Thursday', shortDay: 'Thu', hours: '9:00 AM – 7:00 PM' },
      { day: 'Friday', shortDay: 'Fri', hours: '9:00 AM – 6:00 PM' },
      { day: 'Saturday', shortDay: 'Sat', hours: '8:30 AM – 3:00 PM' },
      { day: 'Sunday', shortDay: 'Sun', hours: 'Closed', isClosed: true },
    ],
  },
];

// The service menu. Add a starting price like 'from $65' to show it; empty reads "Priced at consultation".
export const SERVICES: Service[] = [
  {
    name: 'Cuts & Styling',
    description: 'Lived-in cuts, soft layers, textured bobs and shags, finished with a blowout.',
    price: '',
  },
  {
    name: 'Dimensional Color & Balayage',
    description: 'Soft, blended color and hand-painted balayage that grows out gracefully.',
    price: '',
  },
  {
    name: 'Blonding & Gray Blending',
    description: 'Custom foils and brightening, or natural gray blending that lets you go longer between visits.',
    price: '',
  },
  {
    name: 'Gloss & Treatments',
    description: 'Shine-boosting glosses and deep conditioning treatments to bring hair back to life.',
    price: '',
  },
  {
    name: 'Spray Tans',
    description: 'An even, natural-looking tan in Sarah or Leah’s own private spray tan tent.',
    price: '',
  },
];

export const INITIAL_LOFT_SPACES: LoftSpace[] = [
  {
    id: 'front-desk',
    title: 'Front Desk & Reception',
    subtitle: 'Main entrance and welcome area for all guests.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'The front entryway where clients are greeted when arriving at Haven Lofts.',
    imageKey: 'space_front_desk',
  },
  {
    id: 'main-hallway',
    title: 'Main Hallway',
    subtitle: 'Central walkway connecting the individual suites and lofts.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'Clean, well-lit main corridor providing private access to each individual salon suite.',
    imageKey: 'space_main_hallway',
  },
  {
    id: 'salon-1',
    title: 'Salon 1',
    subtitle: 'Private hair styling loft suite.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'Dedicated private suite with personal styling station, shampoo bowl, and mirror.',
    imageKey: 'space_salon_1',
  },
  {
    id: 'salon-2',
    title: 'Salon 2',
    subtitle: 'Private hair styling loft suite.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'Dedicated private suite with personal styling chair, wash basin, and private storage.',
    imageKey: 'space_salon_2',
  },
  {
    id: 'spray-tanning',
    title: 'Spray Tanning Room',
    subtitle: 'Dedicated private sunless spray tanning suite.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'Private custom spray tanning space with specialized ventilation and lighting.',
    imageKey: 'space_spray_tanning',
  },
  {
    id: 'salon-3',
    title: 'Salon 3',
    subtitle: 'Private salon loft suite.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'Independent loft suite designed for a private stylist or beauty professional.',
    imageKey: 'space_salon_3',
  },
  {
    id: 'salon-4',
    title: 'Salon 4',
    subtitle: 'Private salon loft suite.',
    aspect: '4:3',
    recommendedResolution: '1600 × 1200 px',
    description: 'Independent loft suite designed for a private stylist or beauty professional.',
    imageKey: 'space_salon_4',
  },
];
