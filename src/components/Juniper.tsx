import React from 'react';

// A juniper sprig drawn from the street name (Juniper Path): needles in whorls of three, dusty blue berries.
type Pt = [number, number];

const bez = (a: Pt, c: Pt, b: Pt, t: number): Pt => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];

function Branch({ a, c, b, n, scale = 1 }: { a: Pt; c: Pt; b: Pt; n: number; scale?: number }) {
  const needles: React.ReactNode[] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const [x, y] = bez(a, c, b, t);
    const [x2, y2] = bez(a, c, b, t + 0.01);
    const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI;
    const len = (34 - t * 14) * scale;
    [-38, 38, i % 2 ? 14 : -14].forEach((off, k) =>
      needles.push(
        <path
          key={`${i}-${k}`}
          d={`M0 0 Q${len / 2} -2.6 ${len} 0 Q${len / 2} 2.6 0 0Z`}
          transform={`translate(${x} ${y}) rotate(${ang + off})`}
          fill={k === 2 ? 'var(--needle-2)' : 'var(--needle-1)'}
        />,
      ),
    );
  }
  return (
    <g>
      <path d={`M${a} Q${c} ${b}`} stroke="var(--stem)" strokeWidth={3 * scale} fill="none" strokeLinecap="round" />
      {needles}
    </g>
  );
}

const BERRIES: [number, number, number][] = [
  [212, 262, 11], [230, 248, 9], [226, 272, 10], [318, 168, 10], [334, 182, 8], [150, 330, 9], [168, 318, 7],
];

export const Juniper: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 480" className={className} aria-hidden="true">
    <Branch a={[40, 450]} c={[170, 330]} b={[430, 50]} n={22} />
    <Branch a={[190, 300]} c={[190, 200]} b={[120, 110]} n={9} scale={0.8} />
    <Branch a={[290, 200]} c={[360, 210]} b={[440, 230]} n={8} scale={0.75} />
    {BERRIES.map(([x, y, r]) => (
      <g key={`${x}-${y}`}>
        <circle cx={x} cy={y} r={r} fill="var(--berry)" />
        <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.4} fill="var(--berry-bloom)" />
      </g>
    ))}
  </svg>
);
