import { useState, useEffect } from 'react';

const BASE_URL = 'https://page-views-api.ratneshc.com/api/v1';
const SITE = 'sahilcodex.vercel.app';
const PATH = 'all_pages';
const BASE_VISITORS = 613;

export const useVisitorCount = (): number | null => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/views?site=${SITE}&path=${PATH}`);
        if (!res.ok) throw new Error('Failed to fetch views');
        const data = await res.json();
        setCount(data.views + BASE_VISITORS);
      } catch {
        setCount(BASE_VISITORS);
      }
    };

    fetchViews();
  }, []);

  return count;
};
