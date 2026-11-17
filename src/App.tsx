/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { StylistsSection } from './components/StylistsSection.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { MessageDialog } from './components/MessageDialog.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { INITIAL_SALON_INFO as salonInfo, INITIAL_STYLISTS as stylists } from './data/salonData.ts';

export default function App() {
  const [messageOpen, setMessageOpen] = useState(false);
  const openMessage = () => setMessageOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMessage={openMessage} />
      <main className="flex-1">
        <Hero salonInfo={salonInfo} onMessage={openMessage} />
        <StylistsSection stylists={stylists} />
        <LocationSection salonInfo={salonInfo} />
      </main>
      <Footer salonInfo={salonInfo} onMessage={openMessage} />
      <MessageDialog open={messageOpen} onClose={() => setMessageOpen(false)} stylists={stylists} />
      <MobileBottomBar onMessage={openMessage} />
    </div>
  );
}
