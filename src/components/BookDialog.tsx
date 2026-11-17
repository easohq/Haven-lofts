import React, { useEffect, useRef, useState } from 'react';
import { X, Phone, MessageSquare, Copy, Check, Mail, CalendarCheck, Navigation } from 'lucide-react';
import { SalonInfo, Stylist } from '../types.ts';
import { smsHref } from '../utils/sms.ts';
import { directionsUrl } from '../utils/maps.ts';
import { InstagramIcon, Sprig } from './Brand.tsx';

interface BookDialogProps {
  open: boolean;
  onClose: () => void;
  stylists: Stylist[];
  salonInfo: SalonInfo;
  /** Which stylist's tab opens first ("Book with Sarah" passes Sarah). */
  stylistId: string | null;
}

const action =
  'flex items-center justify-center gap-2.5 h-12 px-5 rounded-full font-semibold active:scale-[0.97] transition';

const CopyNumber: React.FC<{ stylist: Stylist }> = ({ stylist }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(stylist.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (old browser, no permission): the number is still on screen to copy by hand.
    }
  };
  return (
    <button type="button" onClick={copy} className={`${action} border border-gold/60`} aria-live="polite">
      {copied ? <Check className="w-4 h-4 text-gold" aria-hidden="true" /> : <Copy className="w-4 h-4 text-gold" aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

const StylistPanel: React.FC<{ stylist: Stylist; salonInfo: SalonInfo }> = ({ stylist: s, salonInfo }) => {
  const hasAny = s.bookingUrl || s.phoneRaw || s.email || s.instagram;

  return (
    <div className="flex flex-col gap-3">
      {s.bookingUrl && (
        <a href={s.bookingUrl} target="_blank" rel="noopener noreferrer" className={`shimmer ${action} h-14 bg-btn text-btn-ink text-lg`}>
          <CalendarCheck className="w-5 h-5" aria-hidden="true" /> Book online with {s.name}
        </a>
      )}

      {s.phoneRaw && (
        <div className="bg-bg-alt p-4">
          <p className="label">Call or text {s.name}</p>
          <a href={`tel:${s.phoneRaw}`} className="block font-display font-semibold text-3xl mt-1 tabular-nums">
            {s.phone}
          </a>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <a href={`tel:${s.phoneRaw}`} className={`${action} !px-3 bg-btn text-btn-ink`}>
              <Phone className="w-4 h-4" aria-hidden="true" /> Call
            </a>
            <a href={smsHref(s)} className={`${action} !px-3 border border-gold/60`}>
              <MessageSquare className="w-4 h-4 text-gold" aria-hidden="true" /> Text
            </a>
            <CopyNumber stylist={s} />
          </div>
        </div>
      )}

      {(s.email || s.instagram) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {s.email && (
            <a
              href={`mailto:${s.email}?subject=${encodeURIComponent('Appointment at Haven Lofts')}`}
              className={`${action} border border-gold/60`}
            >
              <Mail className="w-4 h-4 text-gold" aria-hidden="true" /> Email {s.name}
            </a>
          )}
          {s.instagram && (
            <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" className={`${action} border border-gold/60`}>
              <InstagramIcon className="w-4 h-4 text-gold" /> @{s.instagram}
            </a>
          )}
        </div>
      )}

      {!hasAny && (
        <div className="bg-bg-alt p-5">
          <p className="text-lg leading-relaxed">
            {s.name}'s online booking and direct line are being set up. We're by appointment only at {salonInfo.street},{' '}
            {salonInfo.suite}.
          </p>
          <a href={directionsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className={`${action} mt-4 border border-gold/60 w-fit`}>
            <Navigation className="w-4 h-4 text-gold" aria-hidden="true" /> Get directions
          </a>
        </div>
      )}
    </div>
  );
};

// Native <dialog>: Escape, focus trapping and the backdrop come from the browser.
export const BookDialog: React.FC<BookDialogProps> = ({ open, onClose, stylists, salonInfo, stylistId }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open) {
      setActive(Math.max(0, stylists.findIndex((s) => s.id === stylistId)));
      if (!d.open) d.showModal();
    } else if (d.open) d.close();
  }, [open, stylistId, stylists]);

  // Arrow keys move between tabs, as screen-reader users expect.
  const onTabKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + stylists.length) % stylists.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = stylists[active];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="book-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md bg-bg text-ink p-0 shadow-2xl"
    >
      <div className="double-frame m-2">
        <div className="double-frame-inner p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id="book-title" className="font-display font-semibold text-4xl leading-none">Book an appointment</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 -mt-2 -mr-2 shrink-0 flex items-center justify-center rounded-full hover:bg-bg-alt transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <Sprig className="w-36 text-gold mt-3" />

          <div role="tablist" aria-label="Choose your stylist" className="mt-5 grid grid-cols-2 gap-1 p-1 rounded-full bg-bg-alt" onKeyDown={onTabKey}>
            {stylists.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`book-tab-${s.id}`}
                aria-controls="book-panel"
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`h-11 rounded-full font-display font-semibold text-xl transition ${
                  i === active ? 'bg-surface text-ink shadow-sm ring-1 ring-gold' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {current && (
            <div role="tabpanel" id="book-panel" aria-labelledby={`book-tab-${current.id}`} className="mt-5">
              <StylistPanel stylist={current} salonInfo={salonInfo} />
            </div>
          )}

          <p className="mt-6 text-sm text-ink-soft text-center">
            By appointment only · {salonInfo.street}, {salonInfo.suite}, {salonInfo.city}
          </p>
        </div>
      </div>
    </dialog>
  );
};
