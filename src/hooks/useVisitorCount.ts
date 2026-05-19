import { useState, useEffect } from "react";

const COUNT_API_KEY = "sahilcodex-portfolio-visitors-v1";
const COUNT_API_BASE = "https://countapi.mileshilliard.com/api/v1";

export const useVisitorCount = (): number | null => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const hitCounter = async () => {
      try {
        const res = await fetch(`${COUNT_API_BASE}/hit/${COUNT_API_KEY}`);
        if (!res.ok) throw new Error("CountAPI request failed");
        const data = await res.json();
        setCount(Number(data.value));
      } catch {
        setCount(null);
      }
    };

    hitCounter();
  }, []);

  return count;
};
