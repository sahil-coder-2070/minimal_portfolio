import { useState, useRef, useEffect } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion, AnimatePresence } from 'motion/react';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon';
import { X, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const SoundBars = () => (
  <span className="flex h-3 items-end gap-[2px] mb-[2px]">
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
  const discordId = import.meta.env.VITE_DISCORD_ID;

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
        ⚠️ Add VITE_DISCORD_ID in your .env file to enable Spotify Now Playing!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-16 flex items-center justify-center w-full">
        <div className="border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 flex w-fit animate-pulse items-center gap-2 rounded-full border px-3 py-1.5 text-xs bg-neutral-50/50 dark:bg-neutral-900/50">
          <span className="bg-[#1DB954] size-2 rounded-full animate-ping" />
          Fetching Spotify activity…
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
    <div className="w-full h-16 relative z-40 select-none">
      <Motion.div
        ref={cardRef}
        layout
        onClick={() => !isExpanded && setIsExpanded(true)}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 28,
        }}
        className={cn(
          "absolute bottom-3 left-0 right-0 mx-auto select-none flex flex-row items-center border shadow-sm",
          isExpanded ? (
            "w-full max-w-[340px] rounded-2xl p-4 bg-white border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-xl dark:shadow-2xl cursor-default z-50 gap-4"
          ) : (
            "w-fit rounded-full px-3 py-1.5 text-xs bg-neutral-50 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300/80 dark:bg-neutral-900/90 dark:border-neutral-800/80 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-200 text-neutral-500 hover:text-neutral-850 cursor-pointer z-40 gap-2.5 group"
          )
        )}
      >
        {/* Close button for expanded state */}
        <AnimatePresence>
          {isExpanded && (
            <Motion.button
              key="close-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer z-50"
            >
              <X className="size-4" />
            </Motion.button>
          )}
        </AnimatePresence>

        {/* Album Artwork or Fallback Layout Wrapper */}
        <Motion.div
          layout
          className={cn(
            "relative shrink-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800",
            isExpanded ? (
              "size-20 rounded-xl shadow-md border border-neutral-100 dark:border-neutral-850"
            ) : (
              "size-7 rounded-full"
            )
          )}
        >
          {/* Spin Wrapper that rotates using Framer Motion so it transitions smoothly to 0 degrees when expanded */}
          <Motion.div
            className="w-full h-full rounded-[inherit] overflow-hidden flex items-center justify-center"
            animate={(!isExpanded && displayData.isPlaying) ? { rotate: 360 } : { rotate: 0 }}
            transition={(!isExpanded && displayData.isPlaying) ? { repeat: Infinity, duration: 8, ease: "linear" } : { duration: 0.5, ease: "easeOut" }}
          >
            {displayData.albumArt ? (
              <img
                src={displayData.albumArt}
                alt={displayData.title}
                className="w-full h-full object-cover grayscale-50 group-hover:grayscale-0 transition-[filter] duration-300"
              />
            ) : (
              <SpotifyIcon className={isExpanded ? "size-8 text-[#1DB954]" : "size-4 text-[#1DB954]"} />
            )}
          </Motion.div>

          {/* Animating play badge in expanded state if active */}
          <AnimatePresence>
            {isExpanded && displayData.isPlaying && (
              <Motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#1DB954] shadow-sm border border-white dark:border-neutral-950 z-10"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                <Play className="size-2 text-neutral-950 fill-neutral-950 ml-[1px]" />
              </Motion.span>
            )}
          </AnimatePresence>
        </Motion.div>

        {/* Details Wrapper */}
        <Motion.div
          layout
          className={cn(
            "flex min-w-0 flex-col leading-tight gap-0.5",
            isExpanded ? "justify-center flex-1" : ""
          )}
        >
          {/* Expanded view Top Row: Status details */}
          <AnimatePresence>
            {isExpanded && (
              <Motion.div
                key="top-row"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 4 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="flex items-center gap-1.5 text-[9px] uppercase font-extrabold tracking-wider overflow-hidden"
              >
                {displayData.isPlaying ? (
                  <>
                    <span className="text-[#1DB954] flex items-center gap-1">
                      Playing Now
                    </span>
                    <SoundBars />
                  </>
                ) : (
                  <span className="text-neutral-400 dark:text-neutral-500">Offline / Last Played</span>
                )}
              </Motion.div>
            )}
          </AnimatePresence>

          {/* Song Title */}
          <Motion.span
            layout="position"
            className={cn(
              "text-neutral-800 dark:text-neutral-100 truncate transition-colors duration-200 block",
              isExpanded ? (
                "font-bold tracking-tight max-w-[190px] text-sm"
              ) : (
                "font-semibold text-[11px] max-w-[150px] group-hover:text-[#1DB954]"
              )
            )}
          >
            {displayData.title}
          </Motion.span>

          {/* Artist Name */}
          <Motion.span
            layout="position"
            className={cn(
              "text-neutral-500 dark:text-neutral-400 truncate block",
              isExpanded ? (
                "text-xs max-w-[190px]"
              ) : (
                "text-[10px] max-w-[150px]"
              )
            )}
          >
            {displayData.artist}
          </Motion.span>

          {/* Expanded view Action Button */}
          <AnimatePresence>
            {isExpanded && (
              <Motion.div
                key="action-button"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 28,
                }}
                className="overflow-hidden"
              >
                <a
                  href={displayData.songUrl || 'https://open.spotify.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full py-1.5 px-3.5 text-[10px] shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
                >
                  <SpotifyIcon className="size-3.5 text-black" />
                  Listen Song
                </a>
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>

        {/* Status indicators (Only visible in capsule view) */}
        <AnimatePresence>
          {!isExpanded && (
            <Motion.div
              key="capsule-status"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="shrink-0 pl-1"
            >
              {displayData.isPlaying ? (
                <SoundBars />
              ) : (
                !isOffline && (
                  <span className="text-neutral-400 bg-neutral-100 dark:text-neutral-500 dark:bg-neutral-800 rounded-full px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap">
                    last played
                  </span>
                )
              )}
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.div>
    </div>
  );
};

export default Spotify;
