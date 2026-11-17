import React, { useId } from 'react';

/** The long gold arrow from the "By appointment only" poster. */
export const GoldArrow: React.FC<{ className?: string }> = ({ className = 'w-10' }) => (
  <svg viewBox="0 0 80 16" className={`arrow shrink-0 text-gold ${className}`} aria-hidden="true">
    <rect x="0" y="6.5" width="66" height="3" fill="currentColor" />
    <path d="M62 0 L80 8 L62 16 Z" fill="currentColor" />
  </svg>
);

function Flower({ x, y, r, turn = 0 }: { x: number; y: number; r: number; turn?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy={-r} rx={r * 0.55} ry={r} transform={`rotate(${a})`} fill="var(--petal)" />
      ))}
      <circle r={r * 0.42} fill="var(--color-gold)" />
    </g>
  );
}

function Leaf({ x, y, len, turn }: { x: number; y: number; len: number; turn: number }) {
  return (
    <path
      d={`M0 0 Q${len / 2} -${len / 4} ${len} 0 Q${len / 2} ${len / 4} 0 0Z`}
      transform={`translate(${x} ${y}) rotate(${turn})`}
      fill="var(--leaf)"
    />
  );
}

/** The floral wallpaper wall, on the salon's green. A half-drop repeat, like real wallpaper. */
export const Wallpaper: React.FC<{ className?: string }> = ({ className }) => {
  const id = useId();
  return (
    <svg className={className} aria-hidden="true" style={{ '--petal': '#EDE8DC', '--leaf': '#7C9474' } as React.CSSProperties}>
      <defs>
        <pattern id={id} width="200" height="200" patternUnits="userSpaceOnUse">
          {[[50, 55, 0], [150, 155, 36]].map(([x, y, t]) => (
            <g key={`${x}`}>
              <path d={`M${x} ${y + 14} q 18 30 -6 52`} stroke="var(--leaf)" strokeWidth="2.5" fill="none" />
              <Leaf x={x + 4} y={y + 34} len={30} turn={-25 + t} />
              <Leaf x={x + 2} y={y + 48} len={26} turn={200 + t} />
              <Flower x={x} y={y} r={15} turn={t} />
            </g>
          ))}
          {[[150, 50], [50, 150], [100, 100], [0, 100], [200, 100]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="4.5" fill="var(--color-gold)" />
              <Leaf x={x + 6} y={y} len={16} turn={-30} />
              <Leaf x={x - 6} y={y} len={16} turn={210} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="var(--color-green)" />
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};
