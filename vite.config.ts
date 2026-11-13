import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import dns from 'node:dns';

try {
  dns.setDefaultResultOrder?.('ipv4first');
} catch {}

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths(),
    {
      name: 'telegram-news-dev-server',
      configureServer(server) {
        server.middlewares.use('/api/news', async (_req, res) => {
          try {
            const { getTelegramNews } = await import('./api/news');
            const data = await getTelegramNews();
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({ success: true, count: data.length, data }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err?.message || 'Error', data: [] }));
          }
        });
      },
    },
  ],
})
