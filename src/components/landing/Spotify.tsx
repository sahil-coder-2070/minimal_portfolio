'use client';

import { useState, useRef, useEffect } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion, AnimatePresence } from 'motion/react';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon';

const DISC_SIZE = 260;
const DISC_COLLAPSED = 100;
const DISC_SCALE_COLLAPSED = DISC_COLLAPSED / DISC_SIZE;

const CARD = {
  collapsed: { w: 270, h: 88, r: 22 },
  expanded: { w: 250, h: 284, r: 28 },
} as const;

/** Shared spring — every layer uses the same curve so nothing drifts apart */
const SPRING = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 46,
  mass: 0.9,
};

const FADE = {
  duration: 0.2,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

const SoundBars = ({ compact = false }: { compact?: boolean }) => {
  const bars = compact
    ? [
        { max: 8, delay: 0 },
        { max: 12, delay: 0.15 },
        { max: 7, delay: 0.08 },
        { max: 11, delay: 0.22 },
      ]
    : [
        { max: 10, delay: 0 },
        { max: 14, delay: 0.12 },
        { max: 8, delay: 0.06 },
        { max: 12, delay: 0.18 },
      ];

  return (
    <span className={`flex items-end gap-[2.5px] ${compact ? 'h-3' : 'h-3.5'}`}>
      {bars.map((bar, i) => (
        <Motion.span
          key={i}
          className="inline-block w-[2.5px] rounded-full bg-[#1DB954]"
          animate={{ height: [3, bar.max, 3] }}
          transition={{
            duration: 0.65 + i * 0.05,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );
};

const CdDisc = ({
  albumArt,
  title,
  isPlaying,
  isOffline,
}: {
  albumArt: string | null;
  title: string;
  isPlaying: boolean;
  isOffline: boolean;
}) => (
  <div className="relative size-full overflow-hidden rounded-full border border-black/10 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12)] dark:border-white/10">
    {albumArt ? (
      <img
        src={albumArt}
        alt={title}
        className={`size-full rounded-full object-cover ${
          isPlaying
            ? 'animate-[spin_8s_linear_infinite]'
            : 'animate-[spin_18s_linear_infinite]'
        }`}
        style={{
          filter: isOffline ? 'saturate(65%) brightness(0.9)' : undefined,
        }}
      />
    ) : (
      <div className="flex size-full items-center justify-center bg-neutral-800">
        <SpotifyIcon className="size-1/3 text-[#1DB954]" />
      </div>
    )}

    <div
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        background: `
          radial-gradient(circle at center, transparent 28%, rgba(0,0,0,0.06) 29%, transparent 30%),
          radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.05) 43%, transparent 44%),
          radial-gradient(circle at center, transparent 56%, rgba(0,0,0,0.04) 57%, transparent 58%),
          radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0.04) 71%, transparent 72%)
        `,
      }}
    />

    <div
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        boxShadow:
          'inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 12px rgba(0,0,0,0.15)',
      }}
    />

    <div className="pointer-events-none absolute inset-0 m-auto flex size-[22%] items-center justify-center rounded-full border-2 border-[#A8ACBA] bg-gradient-to-b from-[#E8EBF5] via-[#9EA2B4] to-[#6B6F82] shadow-md">
      <div className="size-[42%] rounded-full border-[1.5px] border-[#3a3a3a] bg-[#111111] shadow-inner" />
    </div>
  </div>
);

const Spotify = () => {
  const { data, loading, error } = useSpotify();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;

  useEffect(() => {
    if (!isExpanded) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isExpanded]);

  if (!discordId || (error && !data)) return null;

  if (loading) {
    return (
      <div className="relative z-40 my-4 h-[88px]  w-full select-none flex justify-center">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex w-fit items-center justify-center">
          <div className="flex h-[88px] w-[270px] items-center gap-3 overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.08)] dark:border-neutral-700/60 dark:bg-[#1A1715]">
            <div className="flex min-w-0 flex-1 flex-col gap-2.5 pl-1">
              <div className="h-2.5 w-20 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700/50" />
              <div className="h-2.5 w-16 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-700/30" />
              <div className="h-3.5 w-28 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700/50" />
            </div>
            <div className="size-[72px] shrink-0 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    );
  }

  const isOffline = !data;
  const displayData = data || {
    isPlaying: false,
    title: 'Offline',
    artist: 'Not listening right now',
    albumArt: null,
    songUrl: 'https://open.spotify.com',
  };

  const statusLabel = displayData.isPlaying
    ? 'Now Playing'
    : isOffline
      ? 'Offline'
      : 'Last Played';

  return (
    /* Fixed slot (h-[88px]) — expanded card expands upward absolutely, page layout never shifts */
    <div className="relative z-40 my-4 h-[88px] w-full select-none flex justify-center">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex w-fit items-end justify-center">
        <Motion.div
          ref={cardRef}
          onClick={() => setIsExpanded((v) => !v)}
          initial={false}
          whileTap={{ scale: 0.985 }}
          transition={SPRING}
          animate={{
            width: isExpanded ? CARD.expanded.w : CARD.collapsed.w,
            height: isExpanded ? CARD.expanded.h : CARD.collapsed.h,
            borderRadius: isExpanded ? CARD.expanded.r : CARD.collapsed.r,
          }}
          style={{ transformOrigin: 'bottom center' }}
          className="group relative z-50 cursor-pointer overflow-hidden border border-neutral-200/90 bg-white text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-6px_rgba(0,0,0,0.1)] dark:border-[#38332F] dark:bg-[#1A1715] dark:text-white dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_-6px_rgba(0,0,0,0.4)]"
        >
          <Motion.div
            initial={false}
            style={{ width: DISC_SIZE, height: DISC_SIZE }}
            animate={
              isExpanded
                ? { scale: 1, x: -5, y: -130 }
                : { scale: DISC_SCALE_COLLAPSED, x: 118, y: -86 }
            }
            transition={SPRING}
            className="pointer-events-none absolute top-0 left-0 z-20"
          >
            <CdDisc
              albumArt={displayData.albumArt}
              title={displayData.title}
              isPlaying={displayData.isPlaying}
              isOffline={isOffline}
            />
          </Motion.div>

          <Motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{
              duration: 0.18,
              delay: isExpanded ? 0 : 0.32,
              ease: FADE.ease,
            }}
            className="pointer-events-none absolute inset-y-0 right-[68px] z-30 w-8 bg-gradient-to-r from-white to-transparent dark:from-[#1A1715]"
          />

          <AnimatePresence>
            {displayData.isPlaying && !isExpanded && (
              <Motion.div
                key="glow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute -right-4 top-1/2 size-28 -translate-y-1/2 rounded-full blur-2xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(29,185,84,0.45) 0%, transparent 70%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Collapsed content view */}
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <Motion.div
                key="collapsed-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-y-0 left-0 z-10 flex w-[calc(100%-100px)] flex-col justify-center gap-1.5 pl-4 pr-2"
              >
                <div className="flex items-center gap-1.5">
                  <SpotifyIcon className="size-3 shrink-0 text-[#1DB954]" />
                  <span className="text-[11px] font-medium tracking-wide text-neutral-400 dark:text-neutral-500">
                    {statusLabel}
                  </span>
                  {displayData.isPlaying && <SoundBars compact />}
                </div>

                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-xs font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
                    {displayData.title}
                  </span>
                  <span className="truncate text-[11px] font-medium leading-snug text-neutral-500 dark:text-neutral-400">
                    {displayData.artist}
                  </span>
                </div>
              </Motion.div>
            ) : (
              <Motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-[152px] z-10 flex h-[calc(100%-152px)] w-full flex-col items-center px-5 pb-8 pt-1 text-center"
              >
                {displayData.isPlaying && (
                  <div className="mb-4 flex items-center justify-center">
                    <SoundBars />
                  </div>
                )}

                <div className="flex w-full flex-col items-center gap-1 text-center">
                  <span
                    className="block w-full truncate text-sm font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white"
                    style={{ maxWidth: 210 }}
                  >
                    {displayData.title}
                  </span>
                  <span
                    className="block w-full truncate text-xs font-medium leading-snug text-neutral-500 dark:text-neutral-400"
                    style={{ maxWidth: 210 }}
                  >
                    {displayData.artist}
                  </span>
                </div>

                <div className="mt-auto flex w-full flex-col items-center pt-4">
                  <div className="mb-4 h-[2px] w-6 rounded-full bg-neutral-400/40 dark:bg-neutral-600/40" />
                  <a
                    href={displayData.songUrl || 'https://open.spotify.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/link flex cursor-pointer items-center gap-1.5 pb-0.5 text-xs font-bold text-[#1DB954] hover:text-[#1ed760]"
                  >
                    <span>Open Song</span>
                    <SpotifyIcon className="size-3.5 text-[#1DB954] transition-transform duration-150 group-hover/link:scale-110" />
                  </a>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>
      </div>
    </div>
  );
};

export default Spotify;
