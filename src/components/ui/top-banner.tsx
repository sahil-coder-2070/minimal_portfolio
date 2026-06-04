'use client';

import { useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';

const TopBanner = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  // Keep references to in-flight spring animations so we can cancel them
  const springs = useRef<{ stop: () => void }[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const cancelSprings = () => {
    springs.current.forEach((a) => a.stop());
    springs.current = [];
  };

  const springBack = () => {
    cancelSprings();
    const ax = animate(x, 0, { type: 'spring', stiffness: 80, damping: 8, mass: 1 });
    const ay = animate(y, 0, { type: 'spring', stiffness: 80, damping: 8, mass: 1 });
    springs.current = [ax, ay];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // e.buttons === 1 directly reads hardware left-button state — no stale closure
    if (e.buttons !== 1) return;

    cancelSprings(); // stop any spring mid-flight before overwriting position

    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const xRatio = (e.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (e.clientY - bounds.top) / bounds.height - 0.5;
    const maxMove = 36;

    x.set(xRatio * maxMove * 2);
    y.set(yRatio * maxMove * 2);
  };

  const handlePointerLeave = () => {
    setGrabbing(false);
    springBack();
  };

  const handlePointerDown = () => {
    cancelSprings();
    setGrabbing(true);
  };

  const handlePointerUp = () => {
    setGrabbing(false);
    springBack();
  };

  return (
    <div className="after:z relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-3 transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-neutral-100 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:after:bg-neutral-900 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
      <div className="flex h-full min-h-20 w-full items-center justify-center bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] mask-y-from-90% mask-x-from-95% mask-circle bg-size-[10px_10px] bg-center px-1.25 [--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)] sm:min-h-32 dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]">
        <div
          ref={wrapperRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className={`px-10 py-6 ${grabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <motion.h3
            style={{ x, y }}
            className="text-xl font-normal tracking-tight leading-4.5 opacity-50 will-change-transform select-none"
          >
            Open for full-time <br /> &amp; freelance work
          </motion.h3>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
