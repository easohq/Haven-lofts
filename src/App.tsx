/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { OpenPhoto, PhotoViewer } from './components/Photo.tsx';
import { PHOTO_ORDER, PhotoId } from './data/photos.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { StylistsSection } from './components/StylistsSection.tsx';
import { SpaceSection } from './components/SpaceSection.tsx';
import { SprayTan } from './components/SprayTan.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { BookDialog } from './components/BookDialog.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
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
  const [viewer, setViewer] = useState<number | null>(null);
  const openPhoto = useCallback((id: PhotoId) => setViewer(PHOTO_ORDER.indexOf(id)), []);
  useReveal();

  return (
    <OpenPhoto.Provider value={openPhoto}>
    <div className="min-h-svh flex flex-col">
      <Navbar salonInfo={salonInfo} onBook={() => book()} />
      <main className="flex-1">
        <Hero salonInfo={salonInfo} stylists={stylists} onBook={book} />
        <SpaceSection salonInfo={salonInfo} />
        <Services services={SERVICES} onBook={() => book()} />
        <StylistsSection stylists={stylists} onBook={book} />
        <SprayTan onBook={() => book()} />
        <LocationSection salonInfo={salonInfo} />
      </main>
      <Footer salonInfo={salonInfo} stylists={stylists} onBook={() => book()} />
      <BookDialog
        open={booking.open}
        onClose={() => setBooking((b) => ({ ...b, open: false }))}
        stylists={stylists}
        salonInfo={salonInfo}
        stylistId={booking.stylistId}
      />
      <MobileBottomBar onBook={() => book()} />
      <PhotoViewer index={viewer} onIndex={setViewer} onClose={() => setViewer(null)} />
    </div>
    </OpenPhoto.Provider>
  );
}
