/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { WeekBook } from './components/WeekBook.tsx';
import { StylistsSection } from './components/StylistsSection.tsx';
import { LoftGallery } from './components/LoftGallery.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { INITIAL_SALON_INFO as salonInfo, INITIAL_STYLISTS as stylists, INITIAL_LOFT_SPACES } from './data/salonData.ts';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero salonInfo={salonInfo} stylists={stylists} />
        <WeekBook stylists={stylists} />
        <StylistsSection stylists={stylists} />
        <LoftGallery spaces={INITIAL_LOFT_SPACES} />
        <LocationSection salonInfo={salonInfo} />
      </main>
      <Footer salonInfo={salonInfo} stylists={stylists} />
      <MobileBottomBar stylists={stylists} />
    </div>
  );
}
