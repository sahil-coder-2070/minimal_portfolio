import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const TopBanner = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.6 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const xRatio = (e.clientX - bounds.left) / bounds.width - 0.5;
    const yRatio = (e.clientY - bounds.top) / bounds.height - 0.5;

    const maxMove = 36;

    rawX.set(xRatio * maxMove * 2);
    rawY.set(yRatio * maxMove * 2);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setGrabbing(false);
  };

  return (
    <div className="after:bg-border after:z relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-3 transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
      {/* Full-width background pattern — no pointer interaction */}
      <div className="flex h-full min-h-20 w-full items-center justify-center bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] mask-y-from-90% mask-x-from-95% mask-circle bg-size-[10px_10px] bg-center px-1.25 [--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)] sm:min-h-32 dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]">
        {/* Grab zone — snug around the text with a little breathing room */}
        <div
          ref={wrapperRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={() => setGrabbing(true)}
          onPointerUp={() => setGrabbing(false)}
          className={`px-10 py-6 ${grabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          <motion.h3
            style={{ x, y }}
            className="text-xl font-medium opacity-50 will-change-transform select-none"
          >
            Open for full-time <br /> &amp; freelance work
          </motion.h3>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
