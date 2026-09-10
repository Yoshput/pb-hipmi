import { defineConfig } from 'vite';
import handler from './api/upload.js';

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'esnext'
  },
  plugins: [
    {
      name: 'api-upload-dev-middleware',
      configureServer(server) {
        server.middlewares.use('/api/upload', async (req, res) => {
          // Adapt Node req/res to Vercel-like handler
          const vercelRes = {
            statusCode: 200,
            setHeader(name, val) {
              res.setHeader(name, val);
              return this;
            },
            status(code) {
              this.statusCode = code;
              res.statusCode = code;
              return this;
            },
            json(data) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return this;
            },
            end(data) {
              res.end(data);
              return this;
            }
          };

          try {
            await handler(req, vercelRes);
          } catch (err) {
            console.error('Dev server API upload error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      }
    }
  ]
});
