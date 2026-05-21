import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion } from 'motion/react';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon'; // Let's check if they have a spotify icon, or we can use a custom SVG!

const SoundBars = () => (
  <span className="flex items-end gap-[2px] h-3">
    {[0, 1, 2].map((i) => (
      <Motion.span
        key={i}
        className="w-[3px] rounded-sm bg-[#1DB954] inline-block"
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
  const discordId = import.meta.env.VITE_DISCORD_ID;

  if (!discordId) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-600 dark:text-yellow-400 w-fit select-none">
        ⚠️ Add VITE_DISCORD_ID in your .env file to enable Spotify Now Playing!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground w-fit animate-pulse">
        <span className="size-2 rounded-full bg-muted-foreground/40" />
        Fetching Spotify activity…
      </div>
    );
  }

  if (error && !data) {
    return null; // Don't show anything if there's an error and no cached song
  }

  if (!data) {
    // Idle state: not playing, and no history yet
    return (
      <div className="group flex items-center gap-2.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-all duration-200 w-fit select-none">
        <div className="size-7 rounded-sm bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
          <svg className="size-4 text-muted-foreground/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.786-.97-.333.075-.66-.135-.736-.468-.076-.333.136-.66.469-.736 3.812-.87 7.08-.495 9.716 1.115.293.18.383.563.204.856zm1.224-2.724c-.226.367-.707.487-1.074.26-2.69-1.653-6.785-2.13-9.957-1.166-.41.124-.843-.105-.968-.516-.124-.41.106-.843.517-.968 3.63-1.1 8.13-.566 11.22 1.332.368.226.488.708.262 1.075v-.017zm.105-2.836C14.492 8.71 8.822 8.522 5.526 9.52c-.506.153-1.04-.137-1.193-.642-.153-.505.137-1.04.642-1.193 3.778-1.147 10.026-.93 13.974 1.413.456.27.608.863.337 1.32-.27.455-.863.607-1.32.337l.016-.017z"/>
          </svg>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-medium text-foreground">Offline</span>
          <span className="text-muted-foreground">Not listening right now</span>
        </div>
      </div>
    );
  }

  return (
    <Motion.a
      href={data.songUrl ?? 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group flex items-center gap-2.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:border-[#1DB954]/40 hover:text-foreground transition-all duration-200 w-fit select-none"
    >
      {/* Album art or Spotify Icon fallback */}
      {data.albumArt ? (
        <img
          src={data.albumArt}
          alt={data.title}
          className={`size-7 rounded-sm object-cover shrink-0 ${data.isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
        />
      ) : (
        <div className="size-7 rounded-sm bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
          <svg className="size-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.786-.97-.333.075-.66-.135-.736-.468-.076-.333.136-.66.469-.736 3.812-.87 7.08-.495 9.716 1.115.293.18.383.563.204.856zm1.224-2.724c-.226.367-.707.487-1.074.26-2.69-1.653-6.785-2.13-9.957-1.166-.41.124-.843-.105-.968-.516-.124-.41.106-.843.517-.968 3.63-1.1 8.13-.566 11.22 1.332.368.226.488.708.262 1.075v-.017zm.105-2.836C14.492 8.71 8.822 8.522 5.526 9.52c-.506.153-1.04-.137-1.193-.642-.153-.505.137-1.04.642-1.193 3.778-1.147 10.026-.93 13.974 1.413.456.27.608.863.337 1.32-.27.455-.863.607-1.32.337l.016-.017z"/>
          </svg>
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col leading-tight min-w-0">
        <span className="font-medium text-foreground truncate max-w-[180px] group-hover:text-[#1DB954] transition-colors duration-200">
          {data.title}
        </span>
        <span className="truncate max-w-[180px] text-muted-foreground">
          {data.artist}
        </span>
      </div>

      {/* Status indicator */}
      <div className="ml-auto pl-1 shrink-0">
        {data.isPlaying ? (
          <SoundBars />
        ) : (
          <span className="text-[10px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
            last played
          </span>
        )}
      </div>
    </Motion.a>
  );
};

export default Spotify;
