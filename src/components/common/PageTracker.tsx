'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const BASE_URL = 'https://page-views-api.ratneshc.com/api/v1';
const SITE = 'sahilcodex.vercel.app';
const PATH = 'all_pages';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track page views in production to avoid polluting stats and dev console errors
    if (process.env.NODE_ENV !== 'production') return;

    const trackVisit = async () => {
      try {
        await fetch(`${BASE_URL}/track?site=${SITE}&path=${PATH}`, {
          keepalive: true,
        });
      } catch (err) {
        console.warn('Failed to track page view:', err);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}

