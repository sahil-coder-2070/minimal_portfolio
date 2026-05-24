import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/common/ScrollToTop";
import { inject } from "@vercel/analytics";

inject();

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element not found");
}

document.documentElement.classList.add("theme-custom");

function Root() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  );
}

createRoot(rootEl).render(<Root />);
