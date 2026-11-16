/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { StylistsSection } from './components/StylistsSection.tsx';
import { LoftGallery } from './components/LoftGallery.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { PhoneModal } from './components/PhoneModal.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { INITIAL_SALON_INFO as salonInfo, INITIAL_STYLISTS as stylists, INITIAL_LOFT_SPACES } from './data/salonData.ts';

export default function App() {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const openPhones = () => setPhoneModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar stylists={stylists} onOpenPhoneMenu={openPhones} />
      <main className="flex-1">
        <Hero salonInfo={salonInfo} stylists={stylists} onOpenPhoneMenu={openPhones} />
        <StylistsSection stylists={stylists} />
        <LoftGallery spaces={INITIAL_LOFT_SPACES} />
        <LocationSection salonInfo={salonInfo} />
      </main>
      <Footer salonInfo={salonInfo} stylists={stylists} />
      <PhoneModal isOpen={phoneModalOpen} onClose={() => setPhoneModalOpen(false)} stylists={stylists} />
      <MobileBottomBar stylists={stylists} />
    </div>
  );
}
