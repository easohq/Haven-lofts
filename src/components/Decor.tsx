import React from 'react';

/* Drawn decorations taken from the salon itself: trailing ivy off the shelves, the woven rattan
   pendants, the floral accent wall, the walnut slat wall and the candles. All are aria-hidden and
   never take clicks; every animation lives in index.css behind prefers-reduced-motion. */

type Pos = { className?: string; style?: React.CSSProperties };

/** A strand of trailing ivy hanging from the top edge. `length` 1–3 sets how far it falls. */
export const Ivy: React.FC<Pos & { length?: 1 | 2 | 3; flip?: boolean; delay?: number }> = ({
  className = '',
  style,
  length = 2,
  flip,
  delay = 0,
}) => {
  const h = 180 + length * 120;
  const n = 7 + length * 4;
  // Pothos-style heart leaves hang alternately off a gently wandering stem, shrinking toward the tip.
  const leaves = Array.from({ length: n }, (_, i) => {
    const y = 14 + i * ((h - 34) / n);
    const x = 45 + Math.sin(i * 0.8) * 10;
    const side = i % 2 ? 1 : -1;
    const s = (1.25 - (i / n) * 0.55) * (0.85 + ((i * 37) % 10) / 40);
    return { x, y, side, s };
  });
  const stem = leaves.map((l, i) => `${i ? 'L' : 'M'}${l.x.toFixed(1)} ${l.y.toFixed(1)}`).join(' ');
  return (
    <div
      aria-hidden="true"
      className={`decor sway pointer-events-none absolute top-0 ${className}`}
      style={{ ...style, '--sway-delay': `${delay}s` } as React.CSSProperties}
    >
      <svg viewBox={`0 0 90 ${h}`} width="90" height={h} className={flip ? '-scale-x-100' : ''}>
        <path d={`M45 0 ${stem}`} fill="none" stroke="var(--leaf-dark)" strokeWidth="1.6" strokeLinecap="round" />
        {leaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.side * 55}) scale(${l.s})`}>
            {/* heart-shaped leaf on a short stalk, tip pointing down and out */}
            <path d="M0 0 L0 6" stroke="var(--leaf-dark)" strokeWidth="1.2" />
            <path
              d="M0 6 C -9 2, -15 10, -11 18 C -8 24, -2 27, 0 31 C 2 27, 8 24, 11 18 C 15 10, 9 2, 0 6Z"
              fill={i % 3 === 0 ? 'var(--leaf-light)' : 'var(--leaf)'}
            />
            <path d="M0 8 L0 27" stroke="var(--leaf-dark)" strokeOpacity="0.5" strokeWidth="0.9" />
          </g>
        ))}
      </svg>
    </div>
  );
};

/** The woven rattan dome pendant, with its pool of warm light. */
export const Pendant: React.FC<Pos & { cord?: number }> = ({ className = '', style, cord = 120 }) => {
  const id = React.useId().replace(/:/g, '');
  return (
  <div aria-hidden="true" className={`decor sway-slow pointer-events-none absolute top-0 ${className}`} style={style}>
    <svg viewBox={`0 0 200 ${cord + 120}`} className="relative z-10 block w-full h-auto overflow-visible">
      <defs>
        <pattern id={`weave${id}`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 4.5 H9 M4.5 0 V9" stroke="var(--rattan-dark)" strokeWidth="1.6" />
        </pattern>
        <clipPath id={`dome${id}`}>
          <path d={`M30 ${cord + 100} C 30 ${cord + 30}, 62 ${cord + 6}, 100 ${cord + 6} C 138 ${cord + 6}, 170 ${cord + 30}, 170 ${cord + 100} Z`} />
        </clipPath>
      </defs>
      <path d={`M100 0 V${cord + 8}`} stroke="var(--ink)" strokeOpacity="0.55" strokeWidth="1.5" />
      <g clipPath={`url(#dome${id})`}>
        <rect x="20" y={cord} width="160" height="110" fill="var(--rattan)" />
        <rect x="20" y={cord} width="160" height="110" fill={`url(#weave${id})`} />
      </g>
      <path d={`M30 ${cord + 100} H170`} stroke="var(--rattan-dark)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="100" cy={cord + 101} rx="16" ry="5" fill="var(--glow)" className="bulb" />
    </svg>
    {/* The light it throws: a soft warm pool under the dome. */}
    <div className="pendant-light absolute left-1/2 -translate-x-1/2 rounded-full" />
  </div>
  );
};

/** The floral accent wall: pale five-petal blooms and leaves, as a repeating background. */
export const FloralWall: React.FC<Pos> = ({ className = '', style }) => (
  <div aria-hidden="true" className={`decor pointer-events-none absolute ${className}`} style={style}>
    <svg className="block w-full h-full">
      <defs>
        {/* Hydrangea-like bloom: two rings of soft rounded petals around a warm centre. */}
        <g id="bloom">
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <path key={r} d="M0 0 C -9 -6, -8 -20, 0 -22 C 8 -20, 9 -6, 0 0Z" transform={`rotate(${r})`} fill="var(--bloom)" />
          ))}
          {[30, 90, 150, 210, 270, 330].map((r) => (
            <path key={r} d="M0 0 C -5 -4, -5 -12, 0 -13 C 5 -12, 5 -4, 0 0Z" transform={`rotate(${r})`} fill="var(--bloom)" opacity="0.7" />
          ))}
          <circle r="3.6" fill="var(--glow)" />
        </g>
        <path id="leaf" d="M0 0 C 8 -12, 26 -13, 34 0 C 26 13, 8 12, 0 0Z" fill="var(--leaf-light)" />
        <pattern id="florals" width="220" height="220" patternUnits="userSpaceOnUse">
          <use href="#leaf" transform="translate(30 70) rotate(-35)" />
          <use href="#leaf" transform="translate(80 40) rotate(205)" />
          <use href="#bloom" transform="translate(60 60) scale(1.3)" />
          <use href="#leaf" transform="translate(140 170) rotate(15)" />
          <use href="#leaf" transform="translate(190 150) rotate(160)" />
          <use href="#bloom" transform="translate(166 160) scale(1.05)" />
          <use href="#leaf" transform="translate(165 40) rotate(75)" />
          <use href="#bloom" transform="translate(40 180) scale(0.8)" />
          <use href="#leaf" transform="translate(95 200) rotate(-120)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#florals)" />
    </svg>
  </div>
);

/** The walnut slat wall: horizontal boards of uneven length, warmly lit. */
export const SlatWall: React.FC<Pos> = ({ className = '', style }) => (
  <div aria-hidden="true" className={`decor slat-wall pointer-events-none absolute ${className}`} style={style}>
    <svg className="block w-full h-full" preserveAspectRatio="none">
      <defs>
        <pattern id="slats" width="420" height="22" patternUnits="userSpaceOnUse">
          <rect x="0" y="3" width="260" height="15" rx="1" fill="var(--walnut)" />
          <rect x="268" y="3" width="152" height="15" rx="1" fill="var(--walnut-light)" />
        </pattern>
        <pattern id="slats-b" width="420" height="44" patternUnits="userSpaceOnUse" patternTransform="translate(-130 22)">
          <rect x="0" y="3" width="300" height="15" rx="1" fill="var(--walnut-light)" />
          <rect x="308" y="3" width="112" height="15" rx="1" fill="var(--walnut)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#slats)" />
      <rect width="100%" height="100%" fill="url(#slats-b)" />
    </svg>
  </div>
);

/** A small pillar candle with a flickering flame. */
export const Candle: React.FC<Pos & { h?: number; delay?: number }> = ({ className = '', style, h = 34, delay = 0 }) => (
  <div aria-hidden="true" className={`decor pointer-events-none ${className}`} style={style}>
    <svg viewBox={`0 0 30 ${h + 30}`} width="30" height={h + 30} className="overflow-visible">
      <circle cx="15" cy="14" r="16" fill="var(--glow)" opacity="0.18" className="flame-halo" style={{ animationDelay: `${delay}s` }} />
      <path
        d="M15 4 C 19 10, 19 16, 15 19 C 11 16, 11 10, 15 4Z"
        fill="var(--glow)"
        className="flame"
        style={{ animationDelay: `${delay}s` }}
      />
      <path d="M15 19 V23" stroke="var(--ink)" strokeOpacity="0.6" strokeWidth="1.2" />
      <rect x="3" y="23" width="24" height={h} rx="2" fill="var(--candle)" />
    </svg>
  </div>
);

/** A row of candles of different heights, like the ones along the shelves. */
export const Candles: React.FC<Pos> = ({ className = '', style }) => (
  <div aria-hidden="true" className={`flex items-end gap-2 pointer-events-none ${className}`} style={style}>
    <Candle h={40} />
    <Candle h={26} delay={0.7} />
    <Candle h={34} delay={1.3} />
  </div>
);
