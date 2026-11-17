import React from 'react';

/** The long gold arrow from the "By appointment only" poster. */
export const GoldArrow: React.FC<{ className?: string }> = ({ className = 'w-10' }) => (
  <svg viewBox="0 0 80 16" className={`arrow shrink-0 text-gold ${className}`} aria-hidden="true">
    <rect x="0" y="6.5" width="66" height="3" fill="currentColor" />
    <path d="M62 0 L80 8 L62 16 Z" fill="currentColor" />
  </svg>
);
