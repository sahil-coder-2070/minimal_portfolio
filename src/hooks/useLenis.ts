import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Enables Lenis smooth scrolling when `enabled` is true.
 * It sets up a single rAF loop and cleans up on unmount.
 */
export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.12,
    });

    lenisRef.current = lenis;
    // Expose for utilities (e.g., ScrollToTop).
    (window as any).__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, [enabled]);

  return lenisRef;
}
