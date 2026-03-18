import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      // Keep Lenis in sync with route changes.
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
