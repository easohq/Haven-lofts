import React, { useEffect, useRef, useState } from 'react';
import { X, Phone, MessageSquare, Copy, Check, Mail, CalendarCheck, Navigation } from 'lucide-react';
import { SalonInfo, Stylist } from '../types.ts';
import { smsHref } from '../utils/sms.ts';
import { directionsUrl } from '../utils/maps.ts';
import { InstagramIcon } from './Brand.tsx';
import { Drawer } from './Drawer.tsx';

interface BookDialogProps {
  open: boolean;
  onClose: () => void;
  stylists: Stylist[];
  salonInfo: SalonInfo;
  /** Which stylist is selected first ("Book with Sara" passes Sara). */
  stylistId: string | null;
}

const CopyNumber: React.FC<{ stylist: Stylist }> = ({ stylist }) => {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(stylist.phone);
      setState('copied');
    } catch {
      // Clipboard blocked (older browser or no permission): say how to copy it by hand instead.
      setState('failed');
    }
    setTimeout(() => setState('idle'), 3500);
  };
  return (
    <>
      <button type="button" onClick={copy} className="btn btn-ghost btn-sm !px-3">
        {state === 'copied' ? <Check className="w-4 h-4 text-gold" aria-hidden="true" /> : <Copy className="w-4 h-4 text-gold" aria-hidden="true" />}
        {state === 'copied' ? 'Copied' : 'Copy'}
      </button>
      <p role="status" className="col-span-3 text-sm text-ink-soft empty:hidden">
        {state === 'failed' && "Your browser didn't allow copying. Press and hold the number above to copy it."}
      </p>
    </>
  );
};

/** Small arched portrait; the photo crops into the arch, or the gold initial stands in. */
const MiniArch: React.FC<{ stylist: Stylist }> = ({ stylist }) => (
  <div className="w-12 shrink-0">
    <div className="arch overflow-hidden aspect-[3/4] bg-olive flex items-center justify-center">
      {stylist.photo ? (
        <img src={stylist.photo} alt="" className="w-full h-full object-cover object-[50%_25%]" />
      ) : (
        <span className="font-display italic text-2xl text-gold-light" aria-hidden="true">
          {stylist.name[0]}
        </span>
      )}
    </div>
  </div>
);

const StylistPanel: React.FC<{ stylist: Stylist; salonInfo: SalonInfo }> = ({ stylist: s, salonInfo }) => {
  const hasAny = s.bookingUrl || s.phoneRaw || s.email || s.instagram;

  if (!hasAny) {
    return (
      <div className="bg-bg-alt p-6">
        <p className="display text-2xl leading-snug">
          {s.name}'s booking line is almost ready.
        </p>
        <p className="mt-3 text-ink-soft leading-relaxed">
          We're by appointment only at {salonInfo.street}, {salonInfo.suite}. Online booking and a direct number for{' '}
          {s.name} are being set up.
        </p>
        <a href={directionsUrl(salonInfo)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-5">
          <Navigation className="w-4 h-4 text-gold" aria-hidden="true" /> Get directions
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {s.bookingUrl && (
        <a href={s.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full text-lg">
          <CalendarCheck className="w-5 h-5" aria-hidden="true" /> Book online with {s.name}
        </a>
      )}

      {s.phoneRaw && (
        <div className="bg-bg-alt p-5">
          <p className="label">Call or text {s.name}</p>
          <a href={`tel:${s.phoneRaw}`} className="display block text-4xl mt-2 tabular-nums">
            {s.phone}
          </a>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <a href={`tel:${s.phoneRaw}`} className="btn btn-primary btn-sm !px-3">
              <Phone className="w-4 h-4" aria-hidden="true" /> Call
            </a>
            <a href={smsHref(s)} className="btn btn-ghost btn-sm !px-3">
              <MessageSquare className="w-4 h-4 text-gold" aria-hidden="true" /> Text
            </a>
            <CopyNumber stylist={s} />
          </div>
        </div>
      )}

      {(s.email || s.instagram) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {s.email && (
            <a href={`mailto:${s.email}?subject=${encodeURIComponent('Appointment at Haven Lofts')}`} className="btn btn-ghost btn-sm">
              <Mail className="w-4 h-4 text-gold" aria-hidden="true" /> Email {s.name}
            </a>
          )}
          {s.instagram && (
            <a href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <InstagramIcon className="w-4 h-4 text-gold" /> @{s.instagram}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

/** The booking concierge: a drawer from the right (a bottom sheet on phones). */
export const BookDialog: React.FC<BookDialogProps> = ({ open, onClose, stylists, salonInfo, stylistId }) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (open) setActive(Math.max(0, stylists.findIndex((s) => s.id === stylistId)));
  }, [open, stylistId, stylists]);

  // Arrow keys move between stylists, as screen-reader users expect of tabs.
  const onTabKey = (e: React.KeyboardEvent) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + stylists.length) % stylists.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const current = stylists[active];

  return (
    <Drawer open={open} onClose={onClose} labelledBy="book-title" sheet>
      <div className="min-h-full flex flex-col px-6 sm:px-9 pt-6 sm:pt-8 pb-8">
        {/* On phones the whole top of the sheet is a grab area: drag it down, or flick it away. */}
        <div data-sheet-grab className="-mx-6 -mt-6 px-6 pt-3 pb-1 touch-none sm:touch-auto sm:m-0 sm:p-0">
          <div className="sm:hidden mx-auto mb-5 h-1.5 w-11 rounded-full bg-gold/45" aria-hidden="true" />

          <div className="flex items-start justify-between gap-4">
            <h2 id="book-title" className="display text-5xl sm:text-6xl">
              Reserve your chair
            </h2>
            <button type="button" onClick={onClose} aria-label="Close" className="icon-btn shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft max-w-sm">
          Every visit is one-on-one, by appointment. Choose who you'd like to see and we'll take it from there.
        </p>

        <div role="tablist" aria-label="Choose your stylist" aria-orientation="horizontal" className="mt-8 grid grid-cols-2 gap-3" onKeyDown={onTabKey}>
          {stylists.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`book-tab-${s.id}`}
                aria-controls="book-panel"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 p-3 text-left transition-[transform,background-color] duration-500 ${
                  selected ? 'bg-gold/25' : 'bg-bg-alt hover:bg-gold/15 hover:-translate-y-0.5'
                }`}
              >
                <MiniArch stylist={s} />
                <span>
                  <span className="display block text-2xl leading-none">{s.name}</span>
                  <span className="block text-sm text-ink-soft mt-1.5">
                    {s.role}
                    <span className="hidden sm:inline"> and stylist</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {current && (
          <div role="tabpanel" id="book-panel" aria-labelledby={`book-tab-${current.id}`} className="mt-7">
            <p className="label mb-4">Ways to book with {current.name}</p>
            <StylistPanel key={current.id} stylist={current} salonInfo={salonInfo} />
          </div>
        )}

        <div className="mt-auto pt-10">
          <p className="text-sm text-ink-soft leading-relaxed">
            By appointment only
            <br />
            {salonInfo.street}, {salonInfo.suite}, {salonInfo.city}, MN {salonInfo.zip}
          </p>
        </div>
      </div>
    </Drawer>
  );
};
