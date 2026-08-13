'use client';

import React from 'react';
import Container from '@/components/layouts/Container';
import SectionHeading from '@/components/common/SectionHeading';
import RepeatSeparator from '@/components/ui/repeat-separator';
import ComponentCard from '@/components/components/ComponentCard';
import Spotify from '@/components/landing/Spotify';
import CustomKeyboard from '@/components/ui/custom-keyboard';
import LoaderAnimation from '@/components/ui/loader-animation';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function ComponentsSection() {
  return (
    <Container>
      <RepeatSeparator />
      <SectionHeading heading="Components" />

      {/* Grid of UI Components matching Blog/Project Layout 1:1 */}
      <div className="relative py-4">
        {/* Vertical separator line */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-border border-r"></div>
          <div className="border-border border-l"></div>
        </div>

        {/* Row 1 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li>
            <ComponentCard
              title="Music Player"
              description="Interactive live music player widget with real-time audio spectrum animations, vinyl CD disc spin, and song metadata."
              href="/components/spotify"
              badge="Widget · Audio"
            >
              <Spotify />
            </ComponentCard>
          </li>
          <li>
            <ComponentCard
              title="Mac Keyboard"
              description="Interactive Mac keyboard replica with real-time keystroke tracking, sound feedback, and Space Black / Silver themes."
              href="/components/mac-keyboard"
              badge="Interactive · Sound"
            >
              <div className="transform scale-[0.4] xs:scale-[0.5] sm:scale-[0.6] origin-center my-2">
                <CustomKeyboard theme="dark" enableSound={false} showPreview={true} />
              </div>
            </ComponentCard>
          </li>
        </ul>

        {/* Continuous Horizontal Grid Separator between Row 1 and Row 2 */}
        <div className="before:bg-border after:bg-border relative my-4 h-4 w-full before:absolute before:top-0 before:left-0 before:h-px before:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-full" />

        {/* Row 2 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li>
            <ComponentCard
              title="Page Loader"
              description="Smooth multilingual greeting text loader built with Motion. Features smooth text transitions."
              href="/components/loader-animation"
              badge="Animation · UI"
            >
              <div className="my-6">
                <LoaderAnimation />
              </div>
            </ComponentCard>
          </li>
        </ul>
      </div>

      {/* Button separator matching Projects section 1:1 */}
      <div className="before:bg-border after:bg-border relative m-auto mt-1 flex w-full max-w-screen items-center justify-center gap-2 overflow-visible px-4 py-1.5 transition-shadow duration-300 before:absolute before:top-0 before:left-1/2 before:z-[1] before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
        <Link href="/components">
          <Button variant="default" size="sm" className="cursor-pointer">
            Show all Components <MoveRight />
          </Button>
        </Link>
      </div>
    </Container>
  );
}
