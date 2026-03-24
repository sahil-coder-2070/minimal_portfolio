import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/common/ScrollToTop";
import { useLenis } from "./hooks/useLenis";
import { inject } from "@vercel/analytics";

inject();

const rootEl = document.getElementById("root");

document.documentElement.classList.add("theme-custom");

function Root() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useLenis(!prefersReduced);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
}

if (rootEl) {
  createRoot(rootEl).render(<Root />);
}
