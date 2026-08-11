import { useState, useEffect, useCallback, useRef } from 'react';
import { databases } from '@/lib/appwrite';

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
  // Start initial state as null/loading: true to match SSR hydration frame 100%
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const spotifyCollectionId = process.env.NEXT_PUBLIC_APPWRITE_SPOTIFY_COLLECTION_ID || 'spotify';

  const currentTrackRef = useRef<SpotifyTrack | null>(null);

  // Restore cached track from localStorage immediately after hydration pass
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed: SpotifyTrack = JSON.parse(saved);
        currentTrackRef.current = parsed;
        setData(parsed);
        setLoading(false);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Attempt to fetch from official Spotify API route first
  const fetchSpotifyAPIRoute = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/spotify');
      if (res.status === 200) {
        const trackData = await res.json();
        if (trackData && trackData.isConfigured === false) {
          return false;
        }
        currentTrackRef.current = trackData;
        setData(trackData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trackData));
        setError(null);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const fetchLanyardData = useCallback(async () => {
    // 1. Try Spotify API Route first
    const success = await fetchSpotifyAPIRoute();
    if (success) {
      setLoading(false);
      return;
    }

    // 2. Fallback to Discord Lanyard API
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
            lastPlayedAt: new Date().toISOString(),
          };

          const hasSongChanged = !currentTrackRef.current || 
            currentTrackRef.current.title !== trackData.title || 
            currentTrackRef.current.artist !== trackData.artist;

          currentTrackRef.current = trackData;
          setData(trackData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trackData));

          if (hasSongChanged && databaseId) {
            try {
              await databases.updateDocument(databaseId, spotifyCollectionId, 'last_played', {
                title: trackData.title,
                artist: trackData.artist,
                albumArt: trackData.albumArt,
                songUrl: trackData.songUrl,
                lastPlayedAt: trackData.lastPlayedAt,
                isPlaying: false,
              });
            } catch (err: any) {
              if (err.code === 404) {
                try {
                  await databases.createDocument(databaseId, spotifyCollectionId, 'last_played', {
                    title: trackData.title,
                    artist: trackData.artist,
                    albumArt: trackData.albumArt,
                    songUrl: trackData.songUrl,
                    lastPlayedAt: trackData.lastPlayedAt,
                    isPlaying: false,
                  });
                } catch (createErr) {
                  console.error('Failed to create Spotify document in Appwrite:', createErr);
                }
              } else {
                console.error('Failed to update Spotify document in Appwrite:', err);
              }
            }
          }
        } else {
          if (currentTrackRef.current) {
            if (currentTrackRef.current.isPlaying) {
              const offlineTrack = {
                ...currentTrackRef.current,
                isPlaying: false,
              };
              currentTrackRef.current = offlineTrack;
              setData(offlineTrack);
            }
            setLoading(false);
            return;
          }

          let appwriteTrack: SpotifyTrack | null = null;
          if (databaseId) {
            try {
              const doc = await databases.getDocument(databaseId, spotifyCollectionId, 'last_played') as any;
              appwriteTrack = {
                isPlaying: false,
                title: doc.title,
                artist: doc.artist,
                albumArt: doc.albumArt,
                songUrl: doc.songUrl,
                lastPlayedAt: doc.lastPlayedAt,
              };
            } catch (err) {
              console.error('Failed to fetch Spotify status from Appwrite:', err);
            }
          }

          if (appwriteTrack) {
            const lastPlayed = appwriteTrack.lastPlayedAt ? new Date(appwriteTrack.lastPlayedAt).getTime() : 0;
            const oneWeek = 7 * 24 * 60 * 60 * 1000;

            if (!appwriteTrack.lastPlayedAt || Date.now() - lastPlayed < oneWeek) {
              currentTrackRef.current = appwriteTrack;
              setData(appwriteTrack);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appwriteTrack));
            } else {
              setData(null);
            }
          } else {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
              try {
                const parsed: SpotifyTrack = JSON.parse(savedData);
                const lastPlayed = parsed.lastPlayedAt ? new Date(parsed.lastPlayedAt).getTime() : 0;
                const oneWeek = 7 * 24 * 60 * 60 * 1000;

                if (!parsed.lastPlayedAt || Date.now() - lastPlayed < oneWeek) {
                  const offlineTrack = {
                    ...parsed,
                    isPlaying: false,
                  };
                  currentTrackRef.current = offlineTrack;
                  setData(offlineTrack);
                } else {
                  setData(null);
                }
              } catch {
                setData(null);
              }
            } else {
              setData(null);
            }
          }
        }
        setError(null);
      }
    } catch {
      if (currentTrackRef.current) {
        setLoading(false);
        return;
      }
      setError('Could not load Spotify data');
    } finally {
      setLoading(false);
    }
  }, [discordId, databaseId, spotifyCollectionId, fetchSpotifyAPIRoute]);

  useEffect(() => {
    fetchLanyardData();
    const interval = setInterval(fetchLanyardData, 15_000);
    return () => clearInterval(interval);
  }, [fetchLanyardData]);

  return { data, loading, error };
}
