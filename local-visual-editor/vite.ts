import { Readable } from 'node:stream';
import type { Plugin } from 'vite';

/** Dev-server adapter. Never registers routes in production or preview. */
export function localVisualEditor(): Plugin {
  return {
    name: 'local-visual-editor',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/local-editor') return next();
        try {
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
          }
          const method = req.method ?? 'GET';
          const request = new Request(`http://${req.headers.host}${req.url}`, {
            method, headers,
            ...(method !== 'GET' && method !== 'HEAD' ? { body: Readable.toWeb(req), duplex: 'half' } : {}),
          } as RequestInit);
          const { editorAvailable } = await import('./guard');
          if (!editorAvailable(request)) { res.statusCode = 404; res.end(); return; }
          const { createEditorHandlers } = await import('./route');
          const handlers = createEditorHandlers({ directories: ['src/components'] });
          const handler = handlers[method as keyof typeof handlers];
          if (!handler) { res.statusCode = 405; res.end(); return; }
          const response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch {
          res.statusCode = 500;
          res.end('Local editor request failed.');
        }
      });
    },
  };
}
