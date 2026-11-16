import React, { useEffect, useRef } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';
import { Stylist } from '../types.ts';
import { statusToday } from '../utils/hours.ts';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  stylists: Stylist[];
}

// Native <dialog>: Escape, focus trapping and the backdrop come from the browser.
export const PhoneModal: React.FC<PhoneModalProps> = ({ isOpen, onClose, stylists }) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="phone-modal-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md bg-ground text-ink p-0 shadow-2xl"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="phone-modal-title" className="font-display text-4xl leading-none">Call or text your stylist</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 -mt-2 -mr-2 flex items-center justify-center hover:bg-field transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-3 text-base text-muted">Reach Sara or Leah directly to find a time.</p>

        <div className="mt-6 flex flex-col gap-4">
          {stylists.map((s) => {
            const { today } = statusToday(s);
            return (
              <div key={s.id} className="bg-field p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-3xl">{s.name}</p>
                  <p className="text-lg font-semibold tabular-nums">{s.phone}</p>
                </div>
                {today && <p className="mt-1 text-sm text-muted">Today: {today.hours}</p>}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <a href={`tel:${s.phoneRaw}`} className="flex items-center justify-center gap-2 h-12 bg-sage hover:bg-sage-dark text-white font-semibold transition-colors">
                    <Phone className="w-4 h-4" aria-hidden="true" /> Call
                  </a>
                  <a href={`sms:${s.phoneRaw}`} className="flex items-center justify-center gap-2 h-12 bg-ground hover:bg-white font-semibold transition-colors">
                    <MessageSquare className="w-4 h-4" aria-hidden="true" /> Text
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
};
