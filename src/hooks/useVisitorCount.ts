import { useState, useEffect } from 'react';

const BASE_URL = 'https://page-views-api.ratneshc.com/api/v1';
const SITE = 'sahilcodex.vercel.app';
const PATH = '/';
const BASE_VISITORS = 564;

export const useVisitorCount = (): number | null => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const trackAndFetch = async () => {
      try {
        // Track the visit first (increments the counter)
        await fetch(`${BASE_URL}/track?site=${SITE}&path=${PATH}`, {
          keepalive: true,
        });

        // Then read the updated count
        const res = await fetch(`${BASE_URL}/views?site=${SITE}&path=${PATH}`);
        if (!res.ok) throw new Error('Failed to fetch views');
        const data = await res.json();
        setCount(data.views + BASE_VISITORS);
      } catch {
        setCount(BASE_VISITORS);
      }
    };

    trackAndFetch();
  }, []);

  return count;
};
