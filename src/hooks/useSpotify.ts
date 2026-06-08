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
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const spotifyCollectionId = process.env.NEXT_PUBLIC_APPWRITE_SPOTIFY_COLLECTION_ID || 'spotify';

  // Keep track of the current status in a ref to avoid resetting the poll interval
  // when state updates, and to check if the track actually changed.
  const currentTrackRef = useRef<SpotifyTrack | null>(null);

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
    // 1. Try Spotify API Route first (if server-side Spotify config is present)
    const success = await fetchSpotifyAPIRoute();
    if (success) {
      setLoading(false);
      return;
    }

    // 2. Fallback to Discord Lanyard API (our legacy / alternative route)
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

          // Check if the song has actually changed compared to our last state
          const hasSongChanged = !currentTrackRef.current || 
            currentTrackRef.current.title !== trackData.title || 
            currentTrackRef.current.artist !== trackData.artist;

          currentTrackRef.current = trackData;
          setData(trackData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trackData));

          // Save to Appwrite database ONLY if the song changed (to prevent write-spamming on poll interval)
          if (hasSongChanged && databaseId) {
            try {
              // Try updating the static document 'last_played'
              await databases.updateDocument(databaseId, spotifyCollectionId, 'last_played', {
                title: trackData.title,
                artist: trackData.artist,
                albumArt: trackData.albumArt,
                songUrl: trackData.songUrl,
                lastPlayedAt: trackData.lastPlayedAt,
                isPlaying: false, // Stored as isPlaying: false since it's history
              });
            } catch (err: any) {
              // If it doesn't exist (404), create it
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
          // We are offline.
          // 1. If we were just playing a song in the current session, transition to offline (not playing) locally.
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

          // 2. Otherwise (initial page load when offline), fetch last played song from Appwrite.
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
            } else {
              setData(null);
            }
          } else {
            // Fallback to local storage
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
      // On fetch error, check if we have data already, otherwise try Appwrite, then local storage
      if (currentTrackRef.current) {
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
          console.error('Failed to fetch Spotify status from Appwrite on error fallback:', err);
        }
      }

      if (appwriteTrack) {
        const lastPlayed = appwriteTrack.lastPlayedAt ? new Date(appwriteTrack.lastPlayedAt).getTime() : 0;
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (!appwriteTrack.lastPlayedAt || Date.now() - lastPlayed < oneWeek) {
          currentTrackRef.current = appwriteTrack;
          setData(appwriteTrack);
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
        }
      }
      setError('Could not load Spotify data');
    } finally {
      setLoading(false);
    }
  }, [discordId, databaseId, spotifyCollectionId, fetchSpotifyAPIRoute]);

  useEffect(() => {
    fetchLanyardData();
    // Lanyard/Spotify API is extremely fast and lightweight; poll every 15s to catch song changes quickly
    const interval = setInterval(fetchLanyardData, 15_000);
    return () => clearInterval(interval);
  }, [fetchLanyardData]);

  return { data, loading, error };
}
