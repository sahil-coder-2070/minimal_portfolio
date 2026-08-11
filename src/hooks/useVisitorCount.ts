import { useState, useEffect } from 'react';
import { databases } from '@/lib/appwrite';

const LOCAL_STORAGE_KEY = 'sahilcodex_visitor_count';
const REAL_BASE_VISITORS = 2608;

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_SPOTIFY_COLLECTION_ID || 'spotify';
const DOC_ID = 'visitor_count';

export const useVisitorCount = (): number => {
  // Restore the last known visitor count from localStorage instantly on load (ensuring minimum 2608)
  const [count, setCount] = useState<number>(() => {
    if (typeof window === 'undefined') return REAL_BASE_VISITORS;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= REAL_BASE_VISITORS) return parsed;
      }
    } catch {
      return REAL_BASE_VISITORS;
    }
    return REAL_BASE_VISITORS;
  });

  useEffect(() => {
    const hasVisitedThisSession = sessionStorage.getItem('sahilcodex_visited_session');

    const syncVisitorCount = async () => {
      let updatedCount = Math.max(count, REAL_BASE_VISITORS);

      if (databaseId) {
        try {
          // Fetch existing visitor_count document from Appwrite
          const doc = (await databases.getDocument(databaseId, collectionId, DOC_ID)) as any;
          
          let remoteCount = REAL_BASE_VISITORS;
          if (doc.artist) {
            const parsed = parseInt(doc.artist, 10);
            if (!isNaN(parsed) && parsed >= REAL_BASE_VISITORS) {
              remoteCount = parsed;
            }
          } else if (typeof doc.count === 'number' && doc.count >= REAL_BASE_VISITORS) {
            remoteCount = doc.count;
          }

          const baseCount = Math.max(remoteCount, REAL_BASE_VISITORS);

          if (!hasVisitedThisSession) {
            const newCount = baseCount + 1;
            try {
              await databases.updateDocument(databaseId, collectionId, DOC_ID, {
                title: 'VISITOR_COUNT',
                artist: String(newCount),
                albumArt: '',
                songUrl: '',
                lastPlayedAt: new Date().toISOString(),
                isPlaying: false,
              });
            } catch (updateErr) {
              console.error('Failed to update visitor count in Appwrite:', updateErr);
            }
            sessionStorage.setItem('sahilcodex_visited_session', 'true');
            updatedCount = newCount;
          } else {
            updatedCount = baseCount;
          }
        } catch (err: any) {
          // If document doesn't exist yet in Appwrite (404), create it with required schema attributes
          if (err.code === 404 && databaseId) {
            try {
              const initialCount = REAL_BASE_VISITORS + 1;
              await databases.createDocument(databaseId, collectionId, DOC_ID, {
                title: 'VISITOR_COUNT',
                artist: String(initialCount),
                albumArt: '',
                songUrl: '',
                lastPlayedAt: new Date().toISOString(),
                isPlaying: false,
              });
              sessionStorage.setItem('sahilcodex_visited_session', 'true');
              updatedCount = initialCount;
            } catch (createErr) {
              console.error('Failed to create visitor count document in Appwrite:', createErr);
            }
          }
        }
      } else {
        // Fallback if Appwrite is not configured
        if (!hasVisitedThisSession) {
          updatedCount = updatedCount + 1;
          sessionStorage.setItem('sahilcodex_visited_session', 'true');
        }
      }

      setCount(updatedCount);
      localStorage.setItem(LOCAL_STORAGE_KEY, updatedCount.toString());
    };

    syncVisitorCount();
  }, []);

  return count;
};
