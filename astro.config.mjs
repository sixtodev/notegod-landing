import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://notegod.io',
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !['/login', '/register', '/forgot-password', '/reset-password'].some((p) =>
          page.includes(p)
        ),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
