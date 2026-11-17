import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Stylist } from '../types.ts';
import { shortHours, smsHref, statusToday } from '../utils/hours.ts';

interface MessageDialogProps {
  open: boolean;
  onClose: () => void;
  stylists: Stylist[];
}

// Native <dialog>: Escape, focus trapping and the backdrop come from the browser.
export const MessageDialog: React.FC<MessageDialogProps> = ({ open, onClose, stylists }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="message-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md bg-paper text-ink p-0 shadow-2xl"
    >
      <div className="border-2 border-gold m-2 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="message-title" className="font-display font-semibold text-4xl leading-none">Message a stylist</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 -mt-2 -mr-2 flex items-center justify-center hover:bg-stone transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-3 text-base text-muted">Choose your stylist. We'll start the text for you.</p>

        <ul className="mt-6 flex flex-col gap-3">
          {stylists.map((s) => {
            const { today } = statusToday(s);
            const todayLabel = !today || today.isClosed ? 'Off today' : `Today ${shortHours(today.hours)}`;
            return (
              <li key={s.id} className="bg-stone p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display font-semibold text-3xl">{s.name}</p>
                  <p className="text-sm text-muted">{todayLabel}</p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2 mt-3">
                  <a href={smsHref(s)} className="flex items-center justify-center h-12 bg-ink hover:bg-black text-white font-semibold transition-colors">
                    Message {s.name}
                  </a>
                  <a href={`tel:${s.phoneRaw}`} aria-label={`Call ${s.name}`} className="flex items-center justify-center h-12 px-5 bg-paper hover:bg-white font-semibold transition-colors">
                    Call
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </dialog>
  );
};
