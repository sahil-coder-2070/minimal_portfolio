'use client';

import { useState, useRef, useEffect } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion, AnimatePresence } from 'motion/react';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon';

const SoundBars = () => (
  <span className="flex h-3.5 items-end gap-[3px]">
    {[0, 1, 2, 3].map((i) => (
      <Motion.span
        key={i}
        className="inline-block w-[3px] rounded-full bg-[#1DB954]"
        animate={{ height: ['4px', '14px', '4px'] }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          delay: i * 0.12,
          ease: 'easeInOut',
        }}
      />
    ))}
  </span>
);

const Spotify = () => {
  const { data, loading, error } = useSpotify();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;

  // Handle clicking outside the expanded card to close it
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
      <div className="relative z-40 mb-3 h-16 w-full select-none">
        <div className="absolute right-0 bottom-3 left-0 mx-auto flex w-fit items-center">
          <div className="flex w-fit items-center gap-2.5 rounded-full border border-neutral-300/80 bg-neutral-100/60 py-1.5 pr-4 pl-2 text-xs shadow-sm ring-1 ring-black/5 dark:border-neutral-700/80 dark:bg-neutral-900/60 dark:ring-white/10">
            <div className="flex size-8 animate-pulse items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
              <SpotifyIcon className="size-4 text-neutral-400 dark:text-neutral-600" />
            </div>
            <div className="flex flex-col gap-0.5 leading-tight">
              <span className="max-w-[140px] truncate text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                Spotify
              </span>
              <span className="max-w-[140px] truncate text-[10px] text-neutral-400 dark:text-neutral-500">
                Loading activity...
              </span>
            </div>
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

  return (
    <div className="relative z-40 mb-3 h-16 w-full select-none">
      <div className="absolute right-0 bottom-3 left-0 mx-auto flex w-fit items-center justify-center">
        {/* Outer Card Container */}
        <Motion.div
          ref={cardRef}
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 28,
          }}
          className={`relative z-50 overflow-hidden border border-neutral-300/80 bg-[#EDEDED] text-neutral-800 shadow-2xl ring-1 ring-black/5 backdrop-blur-md dark:border-neutral-700/80 dark:bg-[#1A1A1A] dark:text-neutral-100 dark:ring-white/10 ${
            isExpanded
              ? 'flex w-[260px] cursor-pointer flex-col items-center rounded-[32px] pb-5 pt-0'
              : 'group flex w-fit cursor-pointer items-center gap-2.5 rounded-full py-1.5 pr-3.5 pl-2 text-xs hover:bg-neutral-200/60 dark:hover:bg-neutral-800/80'
          }`}
        >
          {/* Top Vinyl Album Disc Container */}
          <Motion.div
            layout
            className={
              isExpanded
                ? '-mt-24 mb-3 relative flex size-[240px] shrink-0 items-center justify-center overflow-hidden rounded-full'
                : 'relative size-8 shrink-0 overflow-hidden rounded-full'
            }
          >
            {displayData.albumArt ? (
              <div className="relative size-full overflow-hidden rounded-full">
                {/* Rotating Perfect Circle Image */}
                <img
                  src={displayData.albumArt}
                  alt={displayData.title}
                  className={`size-full rounded-full object-cover ${displayData.isPlaying ? 'animate-[spin_15s_linear_infinite]' : ''}`}
                />

                {isExpanded && (
                  <>
                    {/* Metallic Spindle Overlay */}
                    <div className="pointer-events-none absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full border-[3px] border-[#A0A4B8] bg-gradient-to-b from-[#D2D5E5] via-[#9DA1B6] to-[#717588] shadow-md dark:border-neutral-600 dark:from-neutral-700 dark:to-neutral-900">
                      <div className="size-4.5 rounded-full border border-neutral-400 bg-[#EDEDED] shadow-inner dark:border-neutral-700 dark:bg-[#1A1A1A]" />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex size-full items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
                <SpotifyIcon className={isExpanded ? 'size-12 text-[#1DB954]' : 'size-4 text-[#1DB954]'} />
              </div>
            )}
          </Motion.div>

          {/* Equalizer Sound Bars */}
          {isExpanded && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-1.5 flex items-center justify-center"
            >
              <SoundBars />
            </Motion.div>
          )}

          {/* Track Details */}
          <Motion.div
            layout
            className={
              isExpanded
                ? 'flex flex-col items-center text-center'
                : 'flex min-w-0 flex-col gap-0.5 leading-tight'
            }
          >
            {/* Title */}
            <Motion.span
              layout
              className={
                isExpanded
                  ? 'max-w-[210px] truncate px-3 text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50'
                  : 'max-w-[140px] truncate text-[11px] font-semibold text-neutral-800 transition-colors group-hover:text-[#1DB954] dark:text-neutral-100'
              }
            >
              {displayData.title}
            </Motion.span>

            {/* Artist */}
            <Motion.span
              layout
              className={
                isExpanded
                  ? 'order-first max-w-[210px] truncate px-3 text-xs font-medium tracking-wide text-neutral-400 dark:text-neutral-400'
                  : 'max-w-[140px] truncate text-[10px] text-neutral-500 dark:text-neutral-400'
              }
            >
              {displayData.artist}
            </Motion.span>
          </Motion.div>

          {/* Status Indicator (Capsule view only) */}
          {!isExpanded && (
            <Motion.div layout className="shrink-0 pl-1">
              {displayData.isPlaying ? (
                <SoundBars />
              ) : (
                !isOffline && (
                  <span className="rounded-full bg-neutral-200/60 px-1.5 py-0.5 text-[9px] font-medium text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
                    last played
                  </span>
                )
              )}
            </Motion.div>
          )}

          {/* Expanded view Accent line & "Open Song" Link */}
          <AnimatePresence>
            {isExpanded && (
              <Motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="my-2.5 h-[2px] w-7 rounded-full bg-neutral-400/40 dark:bg-neutral-600/40" />
                <a
                  href={displayData.songUrl || 'https://open.spotify.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/link flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#1DB954] transition-colors hover:text-[#1ed760]"
                >
                  <span>Open Song</span>
                  <SpotifyIcon className="size-3.5 text-[#1DB954] transition-transform group-hover/link:scale-110" />
                </a>
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>
      </div>
    </div>
  );
};

export default Spotify;
