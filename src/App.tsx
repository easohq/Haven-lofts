/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { StylistsSection } from './components/StylistsSection.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { BookDialog } from './components/BookDialog.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { Wave } from './components/Brand.tsx';
import { INITIAL_SALON_INFO as salonInfo, INITIAL_STYLISTS as stylists, SERVICES } from './data/salonData.ts';

/** Fade-up reveal as sections scroll into view. Without the script, everything simply shows. */
function useReveal() {
  useEffect(() => {
    // index.html adds the `js` class before paint so nothing flickers; undo it if reveals can't run.
    if (!('IntersectionObserver' in window)) return void document.documentElement.classList.remove('js');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [booking, setBooking] = useState<{ open: boolean; stylistId: string | null }>({ open: false, stylistId: null });
  const book = (stylistId: string | null = null) => setBooking({ open: true, stylistId });
  useReveal();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar salonInfo={salonInfo} onBook={() => book()} />
      <main className="flex-1">
        <Hero salonInfo={salonInfo} onBook={() => book()} />
        <Wave top="bg-bg" fill="text-bg-alt" />
        <Services services={SERVICES} onBook={() => book()} />
        <Wave top="bg-bg-alt" fill="text-olive" flip />
        <StylistsSection stylists={stylists} onBook={book} />
        <Wave top="bg-olive" fill="text-bg" />
        <LocationSection salonInfo={salonInfo} />
      </main>
      <Wave top="bg-bg" fill="text-bg-alt" flip />
      <Footer salonInfo={salonInfo} stylists={stylists} onBook={() => book()} />
      <BookDialog
        open={booking.open}
        onClose={() => setBooking((b) => ({ ...b, open: false }))}
        stylists={stylists}
        salonInfo={salonInfo}
        stylistId={booking.stylistId}
      />
      <MobileBottomBar onBook={() => book()} />
    </div>
  );
}
