import { useState } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion, AnimatePresence } from 'motion/react';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon';
import { X, Play } from 'lucide-react';

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
  const discordId = import.meta.env.VITE_DISCORD_ID;

  if (!discordId) {
    return (
      <div className="flex w-fit items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-600 select-none dark:text-yellow-400">
        ⚠️ Add VITE_DISCORD_ID in your .env file to enable Spotify Now Playing!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 flex w-fit animate-pulse items-center gap-2 rounded-full border px-3 py-1.5 text-xs bg-neutral-50/50 dark:bg-neutral-900/50">
        <span className="bg-[#1DB954] size-2 rounded-full animate-ping" />
        Fetching Spotify activity…
      </div>
    );
  }

  if (error && !data) {
    return null; // Don't show anything if there's an error and no cached song
  }

  // If there's no active data and no offline cache, render offline state capsule
  const isOffline = !data;
  const displayData = data || {
    isPlaying: false,
    title: 'Offline',
    artist: 'Not listening right now',
    albumArt: null,
    songUrl: 'https://open.spotify.com',
  };

  return (
    <div className="w-full flex items-center justify-center py-4 relative min-h-[64px]">
      <AnimatePresence mode="popLayout">
        {!isExpanded ? (
          /* Minimized Capsule View */
          <Motion.div
            key="capsule"
            layoutId="spotify-container"
            onClick={() => setIsExpanded(true)}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
            }}
            className="group border select-none cursor-pointer flex items-center gap-2.5 rounded-full px-3 py-1.5 text-xs bg-neutral-50 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300/80 dark:bg-neutral-900/90 dark:border-neutral-800/80 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-200 text-neutral-500 hover:text-neutral-850"
          >
            {/* Album Artwork or Fallback */}
            {displayData.albumArt ? (
              <Motion.img
                layoutId="spotify-album-art"
                src={displayData.albumArt}
                alt={displayData.title}
                className={`size-7 rounded-full object-cover grayscale-50 group-hover:grayscale-0 shrink-0 transition-all duration-300 ${displayData.isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
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
              className="flex min-w-0 flex-col leading-tight gap-0.5"
            >
              <Motion.span
                layoutId="spotify-title"
                className="text-neutral-800 dark:text-neutral-100 font-semibold text-[11px] font-medium max-w-[150px] truncate group-hover:text-[#1DB954] transition-colors duration-200"
              >
                {displayData.title}
              </Motion.span>
              <Motion.span
                layoutId="spotify-artist"
                className="text-neutral-500 dark:text-neutral-400 text-[10px] max-w-[150px] truncate"
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
                  className="text-neutral-400 bg-neutral-100 dark:text-neutral-500 dark:bg-neutral-800 rounded-full px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap"
                >
                  last played
                </Motion.span>
              )
            )}
          </Motion.div>
        ) : (
          /* Expanded Card View - Anchored to absolute bottom to expand upwards */
          <Motion.div
            key="card"
            layoutId="spotify-container"
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
            }}
            className="absolute bottom-4 left-0 right-0 mx-auto z-50 w-full max-w-[340px] rounded-2xl p-4 bg-white border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-xl dark:shadow-2xl cursor-default flex flex-row gap-4 items-center border"
          >
            {/* Close button for expanded state */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <X className="size-4" />
            </button>

            {/* Album Artwork or Fallback */}
            <Motion.div
              layoutId="spotify-album-art-wrapper"
              className="relative shrink-0 flex items-center justify-center"
            >
              {displayData.albumArt ? (
                <Motion.img
                  layoutId="spotify-album-art"
                  src={displayData.albumArt}
                  alt={displayData.title}
                  className="size-20 rounded-xl object-cover shadow-md border border-neutral-100 dark:border-neutral-850"
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
                <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#1DB954] shadow-sm border border-white dark:border-neutral-950">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                  <Play className="size-2 text-neutral-950 fill-neutral-950 ml-[1px]" />
                </span>
              )}
            </Motion.div>

            {/* Details Wrapper */}
            <Motion.div
              layoutId="spotify-details"
              className="flex min-w-0 flex-col leading-tight gap-0.5 justify-center flex-1"
            >
              {/* Expanded view Top Row: Status details */}
              <Motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1.5 text-[9px] uppercase font-extrabold tracking-wider mb-1"
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

              {/* Song Title */}
              <Motion.span
                layoutId="spotify-title"
                className="text-neutral-800 dark:text-neutral-100 font-bold tracking-tight block max-w-[190px] text-sm truncate"
              >
                {displayData.title}
              </Motion.span>

              {/* Artist Name */}
              <Motion.span
                layoutId="spotify-artist"
                className="text-neutral-500 dark:text-neutral-400 text-xs max-w-[190px] truncate block"
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
                  className="inline-flex items-center gap-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold rounded-full py-1.5 px-3.5 text-[10px] shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
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
