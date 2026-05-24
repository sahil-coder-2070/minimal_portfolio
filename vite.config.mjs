import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; connect-src 'self' https://*.appwrite.io https://www.google-analytics.com https://api.github.com https://github-contributions-api.jogruber.de https://api.lanyard.rest; font-src 'self' data: https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;",
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-tooltip',
            '@radix-ui/react-label',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          motion: ['motion'],
          markdown: [
            'react-markdown',
            'remark-gfm',
            'rehype-highlight',
            'gray-matter',
            'highlight.js',
          ],
          form: ['react-hook-form', '@hookform/resolvers', 'zod'],
          misc: [
            'lucide-react',
            'react-helmet-async',
            'rough-notation',
            'sonner',
            'react-github-calendar',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
