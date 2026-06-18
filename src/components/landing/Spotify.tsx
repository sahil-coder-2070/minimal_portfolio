'use client';

import { useState, useRef, useEffect } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion, AnimatePresence } from 'motion/react';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon';
import { X, Play } from 'lucide-react';
import Clickhere from '../icons/common/clickhere';

const SoundBars = () => (
  <span className="mb-[2px] flex h-3 items-end gap-[2px]">
    {[0, 1, 2].map((i) => (
      <Motion.span
        key={i}
        className="inline-block w-[3px] rounded-sm bg-[#1DB954]"
        animate={{ height: ['4px', '12px', '4px'] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.15,
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

  if (!discordId) {
    return (
      <div className="flex w-fit items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-600 select-none dark:text-yellow-400">
        Add VITE_DISCORD_ID in your .env file to enable Spotify Now Playing!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="relative z-40 mb-3 h-16 w-full select-none">
        <div className="absolute right-0 bottom-3 left-0 mx-auto flex w-fit items-center">
          <div className="flex w-fit items-center gap-2.5 rounded-full border border-neutral-200 bg-neutral-100/40 py-1.5 pr-4 pl-2 text-xs shadow-sm ring-1 ring-neutral-300/50 dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:ring-neutral-700/50">
            {/* Album Art Placeholder */}
            <div className="flex size-9 animate-pulse items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
              <SpotifyIcon className="size-4 animate-pulse text-neutral-300 dark:text-neutral-600" />
            </div>

            {/* Skeleton Details */}
            <div className="flex flex-col gap-0.5 leading-tight">
              <span className="max-w-[150px] truncate text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                Spotify
              </span>
              <span className="max-w-[150px] animate-pulse truncate text-[10px] text-neutral-400/80 dark:text-neutral-500/80">
                Fetching Spotify activity…
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return null; // Don't show anything if there's an error and no cached song
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
    /* Stable Flow Parent: Always occupies exactly 64px (h-16) so page content below never shifts */
    <div className="relative z-40 mb-3 h-16 w-full select-none">
      <AnimatePresence>
        {!isExpanded ? (
          /* Minimized Capsule View - positioned absolutely and centered using margin auto */
          <div className="group/spotify absolute right-0 bottom-3 left-0 mx-auto flex w-fit items-center">
            {/* Clickhere component placed relative to capsule, sticking out to the right */}
            {/* <div className="pointer-events-none absolute -top-[30px] left-[calc(100%-5px)] -z-10 scale-60 -rotate-45 opacity-30 transition-transform duration-100 group-hover/spotify:translate-x-1.5">
              <Clickhere />
            </div> */}
            <Motion.div
              key="capsule"
              layoutId="spotify-container"
              onClick={() => setIsExpanded(true)}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 28,
              }}
              className="group hover:text-neutral-850 inset-shadow flex w-fit cursor-pointer items-center gap-2.5 rounded-full border border-transparent bg-neutral-100/70 py-1.5 pr-3 pl-2 text-xs text-neutral-500 shadow-sm ring-1 ring-neutral-300 inset-shadow-neutral-100 select-none hover:border-neutral-50 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-400 dark:ring-neutral-700/70 dark:inset-shadow-neutral-800/70 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-200"
            >
              {/* Album Artwork or Fallback */}
              {displayData.albumArt ? (
                <Motion.img
                  layoutId="spotify-album-art"
                  src={displayData.albumArt}
                  alt={displayData.title}
                  className={`size-9 animate-[spin_13s_linear_infinite] rounded-full object-cover transition-all duration-300 ${displayData.isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
                />
              ) : (
                <Motion.div
                  layoutId="spotify-album-art"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800"
                >
                  <SpotifyIcon className="size-4 text-[#1DB954]" />
                </Motion.div>
              )}

              {/* Details Wrapper */}
              <Motion.div
                layoutId="spotify-details"
                className="flex min-w-0 flex-col gap-0.5 leading-tight"
              >
                <Motion.span
                  layoutId="spotify-title"
                  className="max-w-[150px] truncate text-[11px] font-semibold text-neutral-800 transition-colors duration-200 group-hover:text-[#1DB954] dark:text-neutral-100"
                >
                  {displayData.title}
                </Motion.span>
                <Motion.span
                  layoutId="spotify-artist"
                  className="max-w-[150px] truncate text-[10px] text-neutral-500 dark:text-neutral-400"
                >
                  {displayData.artist}
                </Motion.span>
              </Motion.div>

              {/* Status indicators */}
              {displayData.isPlaying ? (
                <Motion.div layoutId="spotify-status-area" className="shrink-0 pl-1">
                  <SoundBars />
                </Motion.div>
              ) : (
                !isOffline && (
                  <Motion.span
                    layoutId="spotify-status-area"
                    className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
                  >
                    last played
                  </Motion.span>
                )
              )}
            </Motion.div>
          </div>
        ) : (
          /* Expanded Card View - expands upwards from the exact same bottom alignment, overlaying elements above */
          <Motion.div
            ref={cardRef}
            key="card"
            layoutId="spotify-container"
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
            }}
            className="absolute right-0 bottom-3 left-0 z-50 mx-auto flex w-fit max-w-[340px] min-w-[260px] cursor-default flex-row items-center gap-4 rounded-2xl border border-neutral-300 bg-neutral-100 p-4 text-neutral-700 shadow-xl backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-300 dark:shadow-2xl"
          >
            {/* Close button for expanded state */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-2 right-2 cursor-pointer rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
            >
              <X className="size-4" />
            </button>

            {/* Album Artwork or Fallback */}
            <Motion.div
              layoutId="spotify-album-art-wrapper"
              className="relative flex shrink-0 items-center justify-center"
            >
              {displayData.albumArt ? (
                <Motion.img
                  layoutId="spotify-album-art"
                  src={displayData.albumArt}
                  alt={displayData.title}
                  className="dark:border-neutral-850 size-20 rounded-xl border border-neutral-100 object-cover shadow-md"
                />
              ) : (
                <Motion.div
                  layoutId="spotify-album-art"
                  className="flex size-20 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800"
                >
                  <SpotifyIcon className="size-8 text-[#1DB954]" />
                </Motion.div>
              )}

              {/* Animating play badge in expanded state if active */}
              {displayData.isPlaying && (
                <span className="absolute -right-1 -bottom-1 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-white bg-[#1DB954] shadow-sm dark:border-neutral-950">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75"></span>
                  <Play className="ml-[1px] size-2 fill-neutral-950 text-neutral-950" />
                </span>
              )}
            </Motion.div>

            {/* Details Wrapper */}
            <Motion.div
              layoutId="spotify-details"
              className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 leading-tight"
            >
              {/* Expanded view Top Row: Status details */}
              <Motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-1 flex items-center gap-1.5 text-[9px] font-extrabold tracking-wider uppercase"
              >
                {displayData.isPlaying ? (
                  <>
                    <span className="flex items-center gap-1 text-[#1DB954]">Playing Now</span>
                    <SoundBars />
                  </>
                ) : (
                  <span className="text-neutral-400 dark:text-neutral-500">
                    Offline / Last Played
                  </span>
                )}
              </Motion.div>

              {/* Song Title */}
              <Motion.span
                layoutId="spotify-title"
                className="block max-w-[190px] truncate text-sm font-bold tracking-tight text-neutral-800 dark:text-neutral-100"
              >
                {displayData.title}
              </Motion.span>

              {/* Artist Name */}
              <Motion.span
                layoutId="spotify-artist"
                className="block max-w-[190px] truncate text-xs text-neutral-500 dark:text-neutral-400"
              >
                {displayData.artist}
              </Motion.span>

              {/* Expanded view Action Button */}
              <Motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-2"
              >
                <a
                  href={displayData.songUrl || 'https://open.spotify.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#1DB954] px-3.5 py-1.5 text-[10px] font-semibold text-black shadow-sm transition-all duration-200 hover:bg-[#1ed760] hover:shadow"
                >
                  <SpotifyIcon className="size-3.5 text-black" />
                  Listen Song
                </a>
              </Motion.div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Spotify;
