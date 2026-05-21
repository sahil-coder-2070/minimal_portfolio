import { useState, useEffect, useCallback } from 'react';

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  songUrl: string | null;
  lastPlayedAt?: string;
}

interface LanyardResponse {
  success: boolean;
  data: {
    listening_to_spotify: boolean;
    spotify: {
      track_id: string;
      song: string;
      artist: string;
      album: string;
      album_art_url: string;
    } | null;
  };
}

interface UseSpotifyReturn {
  data: SpotifyTrack | null;
  loading: boolean;
  error: string | null;
}

const LOCAL_STORAGE_KEY = 'sahilcodex_last_played_song';

export function useSpotify(): UseSpotifyReturn {
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const discordId = import.meta.env.VITE_DISCORD_ID;

  const fetchLanyardData = useCallback(async () => {
    if (!discordId) {
      setError('Discord ID not configured');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LanyardResponse = await res.json();

      if (json.success && json.data) {
        const { listening_to_spotify, spotify } = json.data;

        if (listening_to_spotify && spotify) {
          const trackData: SpotifyTrack = {
            isPlaying: true,
            title: spotify.song,
            artist: spotify.artist,
            albumArt: spotify.album_art_url,
            songUrl: `https://open.spotify.com/track/${spotify.track_id}`,
          };

          // Save to local storage for offline / stopped playback
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trackData));
          setData(trackData);
        } else {
          // Check if we have a last played song saved in local storage
          const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (savedData) {
            try {
              const parsed: SpotifyTrack = JSON.parse(savedData);
              setData({
                ...parsed,
                isPlaying: false,
              });
            } catch {
              setData(null);
            }
          } else {
            setData(null);
          }
        }
        setError(null);
      }
    } catch (e) {
      // On API error, try to show last saved song at least
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        try {
          const parsed: SpotifyTrack = JSON.parse(savedData);
          setData({
            ...parsed,
            isPlaying: false,
          });
        } catch {
          setData(null);
        }
      }
      setError('Could not load Lanyard Spotify data');
    } finally {
      setLoading(false);
    }
  }, [discordId]);

  useEffect(() => {
    fetchLanyardData();
    // Lanyard is extremely fast and lightweight; poll every 15s to catch song changes quickly
    const interval = setInterval(fetchLanyardData, 15_000);
    return () => clearInterval(interval);
  }, [fetchLanyardData]);

  return { data, loading, error };
}
