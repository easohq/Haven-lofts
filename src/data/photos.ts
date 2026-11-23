// The salon's own photos, in /public/photos as <id>-640|1280|2048.webp (the number is the short edge).
// Graded slightly warmer from the iPhone originals; nothing added or removed from the rooms.
export const PHOTOS = {
  'lounge-coffee': { landscape: true, alt: 'The lounge: an olive green wall with a walnut slat shelf, two woven pendant lights, cognac leather chairs and the coffee bar' },
  'lounge-wide': { landscape: true, alt: 'The lounge from the corner: cognac leather chairs, the coffee bar and two green velvet swivel chairs' },
  lounge: { alt: 'Cognac leather chairs and a brass planter under woven pendant lights, beside the coffee bar' },
  'entry-mirror': { alt: 'The Haven Lofts mirror on a black wall between brass globe sconces, with two green swivel chairs' },
  'entry-hall': { alt: 'The entry hall: a floral wallpaper panel, a woven bench, cognac chairs and a snake plant in a brass pot' },
  'floral-panel': { alt: 'A dark floral wallpaper panel above a woven bench, lit by a wall sconce' },
  hallway: { alt: 'The hallway past the floral panel, with warm sconces leading to the suites' },
  wallpaper: { alt: 'Close-up of the floral wallpaper: cream blossoms and songbirds on deep green' },
  'gallery-wall': { alt: 'A suite with a gallery wall of gold frames on olive green above a mustard velvet sofa' },
  'suite-velvet': { alt: 'A suite with a black styling chair, a mustard velvet sofa and a gallery wall on olive green' },
  'suite-arch-mirror': { alt: 'A suite with a tall arched gold mirror, green velvet curtains and a gold trolley' },
  'suite-slat': { landscape: true, alt: 'A suite with a walnut slat wall, a shampoo chair and the mustard sofa' },
  'suite-macrame': { alt: 'A bright suite with a black styling chair and a leaf wall hanging between black cabinets' },
  'suite-macrame-2': { alt: 'The same suite from the doorway, with product shelves and a window' },
  'suite-window': { alt: 'A light-filled room with a big window, a white armchair and a round rug' },
  shampoo: { alt: 'Two black shampoo chairs at the wash bowls under walnut cabinets and a trailing plant' },
  'treatment-room': { landscape: true, alt: 'A room with a black treatment bed and a gold rolling cart' },
  'tan-neon': { landscape: true, alt: 'A pink neon sign reading “Life’s better with a tan” on a boxwood wall' },
  'tan-room': { landscape: true, alt: 'The spray tan room: two black tents, a gold robe stand and green curtains' },
  'tan-tent': { alt: 'A spray tan tent beside a gold stand with a robe, under the neon sign' },
  'tan-tent-2': { alt: 'A spray tan tent by the window with green velvet curtains' },
  'tan-art': { alt: 'A dreamy pink beach print on the spray tan room’s dark wall' },
} as const satisfies Record<string, { alt: string; landscape?: boolean }>;

export type PhotoId = keyof typeof PHOTOS;

/** Every photo in walking order, for the gallery and the full-screen viewer. */
export const PHOTO_ORDER: PhotoId[] = [
  'entry-mirror', 'entry-hall', 'floral-panel', 'hallway', 'lounge-coffee', 'lounge', 'lounge-wide',
  'gallery-wall', 'suite-velvet', 'suite-arch-mirror', 'suite-slat', 'suite-macrame', 'suite-macrame-2',
  'suite-window', 'shampoo', 'treatment-room', 'tan-neon', 'tan-room', 'tan-tent', 'tan-tent-2', 'tan-art', 'wallpaper',
];
