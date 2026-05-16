import { useState, useEffect } from 'react';

const NAMESPACE = 'sahilcodex';
const KEY = 'portfolio-visitors';
const BASE_VISITORS = 564;

export const useVisitorCount = (): number | null => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const hitCounter = async () => {
      try {
        const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`);
        if (!res.ok) throw new Error('CounterAPI request failed');
        const data = await res.json();
        setCount(data.count + BASE_VISITORS);
      } catch {
        setCount(BASE_VISITORS);
      }
    };

    hitCounter();
  }, []);

  return count;
};
