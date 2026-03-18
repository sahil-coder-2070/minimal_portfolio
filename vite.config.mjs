import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "lenis", "lenis/react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          ui: [
            "@radix-ui/react-tooltip",
            "@radix-ui/react-label",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
          motion: ["motion"],
          markdown: [
            "react-markdown",
            "remark-gfm",
            "rehype-highlight",
            "gray-matter",
            "highlight.js",
          ],
          form: ["react-hook-form", "@hookform/resolvers", "zod"],
          misc: [
            "lucide-react",
            "react-helmet-async",
            "rough-notation",
            "sonner",
            "react-github-calendar",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
