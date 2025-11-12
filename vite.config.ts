import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'robots.txt'],
          manifest: {
            name: 'Massimo Raso | Senior Analytics Engineer',
            short_name: 'Massimo Raso',
            description: 'Portfolio of Massimo Raso, an AI & Analytics Engineer based in Sydney, Australia',
            theme_color: '#4A90E2',
            background_color: '#FFFFFF',
            display: 'standalone',
            scope: '/',
            start_url: '/',
            icons: [
              {
                src: '/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png'
              },
              {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
            globIgnores: ['**/data/vector/work_experiences_embeddings.jsonl'],
            maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MB
            runtimeCaching: [
              {
                urlPattern: /\/data\/vector\/work_experiences_embeddings\.jsonl/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'vector-embeddings-cache',
                  expiration: {
                    maxEntries: 1,
                    maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                  }
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'gstatic-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                  },
                  cacheableResponse: {
                    statuses: [0, 200]
                  }
                }
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
