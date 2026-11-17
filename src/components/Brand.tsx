import React from 'react';

/** The long gold arrow from the "By appointment only" poster. */
export const GoldArrow: React.FC<{ className?: string }> = ({ className = 'w-10' }) => (
  <svg viewBox="0 0 80 16" className={`arrow shrink-0 text-gold ${className}`} aria-hidden="true">
    <rect x="0" y="6.5" width="66" height="3" fill="currentColor" />
    <path d="M62 0 L80 8 L62 16 Z" fill="currentColor" />
  </svg>
);

/** The real logo; dark mode shows the cream-script version. */
export const Logo: React.FC<{ className?: string; alt?: string }> = ({ className = '', alt = 'Haven Lofts' }) => (
  <>
    <img src="/haven-lofts-logo.png" alt={alt} className={`logo-for-light ${className}`} />
    <img src="/haven-lofts-logo-light.png" alt={alt} className={`logo-for-dark ${className}`} />
  </>
);

/** Line-art divider: two botanical sprigs reaching toward a small star. */
export const Sprig: React.FC<{ className?: string }> = ({ className = 'w-44 text-gold' }) => (
  <svg viewBox="0 0 220 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M4 14 H86" />
    <path d="M216 14 H134" />
    {[24, 44, 64].map((x) => (
      <g key={x}>
        <path d={`M${x} 14 q 6 -9 14 -9 q -4 8 -14 9`} />
        <path d={`M${x} 14 q 6 9 14 9 q -4 -8 -14 -9`} />
        <path d={`M${220 - x} 14 q -6 -9 -14 -9 q 4 8 14 9`} />
        <path d={`M${220 - x} 14 q -6 9 -14 9 q 4 -8 14 -9`} />
      </g>
    ))}
    <path d="M110 3 L113 11 L121 14 L113 17 L110 25 L107 17 L99 14 L107 11 Z" fill="currentColor" stroke="none" />
    <circle cx="94" cy="14" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="126" cy="14" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

/** A soft wave between two sections instead of a hard horizontal cut. */
// `top` is the upper section's bg class, `fill` the lower section's color as a text class (both written out in full so Tailwind sees them).
export const Wave: React.FC<{ top: string; fill: string; flip?: boolean }> = ({ top, fill, flip }) => (
  <div aria-hidden="true" className={top}>
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block w-full h-10 sm:h-16 ${fill} ${flip ? '-scale-x-100' : ''}`}>
      <path d="M0 48 C 240 8, 480 8, 720 40 S 1200 80, 1440 32 L1440 80 L0 80 Z" fill="currentColor" />
    </svg>
  </div>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Small round "By appointment only" seal, framed with a double gold ring. */
export const AppointmentSeal: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-full bg-surface border-[1.5px] border-gold p-1.5 ${className}`}>
    <div className="rounded-full border border-gold w-full h-full flex flex-col items-center justify-center text-center">
      <span className="label !text-[0.6875rem] !tracking-[0.04em] leading-tight">
        By
        <br />
        appointment
        <br />
        only
      </span>
    </div>
  </div>
);
