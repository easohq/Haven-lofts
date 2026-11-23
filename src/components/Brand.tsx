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

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/** Round "By appointment only" seal: a filled gold disc, readable at a glance. */
export const AppointmentSeal: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-full bg-gold text-[#1A1C15] flex items-center justify-center text-center p-3 ${className}`}>
    <span className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold leading-tight">By appointment only</span>
  </div>
);
