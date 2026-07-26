import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());

  // Simple proxy endpoint to bypass iframe restrictions
  app.use("/proxy", createProxyMiddleware({
    target: "https://google.com",
    router: (req) => {
      let target = req.query.url as string;
      if (!target) return "https://google.com";
      if (!target.startsWith("http")) {
        target = "https://" + target;
      }
      return target;
    },
    changeOrigin: true,
    ws: true,
    followRedirects: true,
    selfHandleResponse: true, // We will handle the response to modify HTML
    on: {
      proxyRes: (proxyRes, req, res) => {
        // Strip out headers that block embedding in iframes
        delete proxyRes.headers["x-frame-options"];
        delete proxyRes.headers["content-security-policy"];
        delete proxyRes.headers["x-content-security-policy"];
        delete proxyRes.headers["x-webkit-csp"];
        proxyRes.headers["access-control-allow-origin"] = "*";

        const targetUrl = (req.query.url as string) || "https://google.com";
        let baseUrl = targetUrl;
        try {
           const parsed = new URL(targetUrl);
           baseUrl = parsed.origin;
        } catch(e) {}

        // Copy headers to response
        Object.keys(proxyRes.headers).forEach((key) => {
          const val = proxyRes.headers[key];
          if (val) res.append(key, val as any);
        });

        res.status(proxyRes.statusCode || 200);

        // If it's HTML, inject <base> tag
        const contentType = proxyRes.headers["content-type"];
        if (contentType && contentType.includes("text/html")) {
          let body = Buffer.from([]);
          proxyRes.on('data', (chunk) => {
            body = Buffer.concat([body, chunk]);
          });
          proxyRes.on('end', () => {
            let html = body.toString('utf-8');
            // Inject base tag right after <head>
            const baseTag = `<base href="${baseUrl}/">`;
            html = html.replace(/<head>/i, `<head>${baseTag}`);
            // If there are scripts checking for window.top, bypass them
            const bypassScript = `<script>
              Object.defineProperty(window, 'top', { value: window, writable: false });
              Object.defineProperty(window, 'parent', { value: window, writable: false });
            </script>`;
            html = html.replace(/<head>/i, `<head>${bypassScript}`);
            res.send(html);
          });
        } else {
          proxyRes.pipe(res);
        }
      }
    },
    pathRewrite: (path, req) => {
      return '';
    }
  }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
