import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { Stylist } from '../types.ts';
import { smsHref } from '../utils/hours.ts';

export const MobileBottomBar: React.FC<{ stylists: Stylist[] }> = ({ stylists }) => (
  <aside
    aria-label="Text or call a stylist"
    className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-paper px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(24_35_31/0.08)]"
  >
    <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
      {stylists.map((s) => (
        <div key={s.id} className="flex gap-1">
          <a href={smsHref(s)} className="flex-1 flex items-center justify-center gap-1.5 h-12 rounded-full bg-juniper active:bg-juniper-deep text-white font-semibold">
            <MessageSquare className="w-4 h-4" aria-hidden="true" /> Text {s.name}
          </a>
          <a href={`tel:${s.phoneRaw}`} aria-label={`Call ${s.name}`} className="flex items-center justify-center w-12 h-12 rounded-full bg-mist active:bg-[#D3D8CD] text-juniper">
            <Phone className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      ))}
    </div>
  </aside>
);
