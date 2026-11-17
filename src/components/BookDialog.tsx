import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { SalonInfo, Stylist } from '../types.ts';
import { smsHref } from '../utils/sms.ts';
import { Sprig } from './Brand.tsx';

interface BookDialogProps {
  open: boolean;
  onClose: () => void;
  stylists: Stylist[];
  salonInfo: SalonInfo;
  /** When set, that stylist is listed first and highlighted. */
  stylistId: string | null;
}

// Native <dialog>: Escape, focus trapping and the backdrop come from the browser.
export const BookDialog: React.FC<BookDialogProps> = ({ open, onClose, stylists, salonInfo, stylistId }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const ordered = [...stylists].sort((a, b) => Number(b.id === stylistId) - Number(a.id === stylistId));
  const reachable = ordered.filter((s) => s.phoneRaw);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="book-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md bg-bg text-ink p-0 shadow-2xl"
    >
      <div className="double-frame m-2">
        <div className="double-frame-inner p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="book-title" className="font-display font-semibold text-4xl leading-none">Book an appointment</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 -mt-2 -mr-2 shrink-0 flex items-center justify-center rounded-full hover:bg-bg-alt transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <Sprig className="w-36 text-gold mt-4" />

          {reachable.length > 0 ? (
            <>
              <p className="mt-4 text-base text-ink-soft">Choose your stylist. We'll start the text for you.</p>
              <ul className="mt-6 flex flex-col gap-3">
                {reachable.map((s) => (
                  <li key={s.id} className={`p-4 sm:p-5 ${s.id === stylistId ? 'bg-surface ring-1 ring-gold' : 'bg-bg-alt'}`}>
                    <p className="font-display font-semibold text-3xl">{s.name}</p>
                    <div className="grid grid-cols-[1fr_auto] gap-2 mt-3">
                      <a href={smsHref(s)} className="flex items-center justify-center h-12 rounded-full bg-btn text-btn-ink font-semibold">
                        Text {s.name}
                      </a>
                      <a href={`tel:${s.phoneRaw}`} aria-label={`Call ${s.name}`} className="flex items-center justify-center h-12 px-5 rounded-full border border-gold font-semibold">
                        Call
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mt-5 text-lg leading-relaxed">
              <p>
                We're by appointment only, and booking details for {stylists.map((s) => s.name).join(' and ')} are on
                their way.
              </p>
              <p className="mt-4 text-ink-soft">
                You'll find us at {salonInfo.street}, {salonInfo.suite}, {salonInfo.city}, MN {salonInfo.zip}.
              </p>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
};
