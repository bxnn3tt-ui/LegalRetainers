import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { publicRouteRedirects } from "../shared/redirects";

type ErrorWithStatus = Error & {
  status?: number;
  statusCode?: number;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HOST = process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");

function normalizeRoutePath(requestPath: string): string {
  if (!requestPath || requestPath === "/") {
    return "/";
  }

  return requestPath.replace(/\/+$/, "") || "/";
}

function getPrerenderedHtmlPath(distPath: string, requestPath: string): string {
  const normalizedPath = normalizeRoutePath(requestPath);

  if (normalizedPath === "/") {
    return path.join(distPath, "index.html");
  }

  if (normalizedPath === "/404") {
    return path.join(distPath, "404.html");
  }

  const routeSegments = normalizedPath.split("/").filter(Boolean);
  return path.join(distPath, ...routeSegments, "index.html");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const requestPath = req.path;
  let capturedJsonResponse: unknown;

  const originalResJson = res.json.bind(res) as (body?: unknown) => Response;
  res.json = ((bodyJson: unknown) => {
    capturedJsonResponse = bodyJson;
    return originalResJson(bodyJson);
  }) as typeof res.json;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (requestPath.startsWith("/api")) {
      let logLine = `${req.method} ${requestPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse !== undefined) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

registerRoutes(app);

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath, { index: false, redirect: false }));

  app.get(/^(?!\/api).*/, (req, res) => {
    const normalizedPath = normalizeRoutePath(req.path);

    if (normalizedPath !== req.path && normalizedPath !== "/") {
      return res.redirect(301, normalizedPath);
    }

    const redirectTarget = publicRouteRedirects[normalizedPath];
    if (redirectTarget) {
      return res.redirect(301, redirectTarget);
    }

    const htmlPath = getPrerenderedHtmlPath(distPath, normalizedPath);
    if (fs.existsSync(htmlPath)) {
      return res.sendFile(htmlPath);
    }

    const notFoundPath = path.join(distPath, "404.html");
    if (fs.existsSync(notFoundPath)) {
      return res.status(404).sendFile(notFoundPath);
    }

    return res.status(404).sendFile(path.join(distPath, "index.html"));
  });
}

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const normalizedError = err instanceof Error ? (err as ErrorWithStatus) : undefined;
  const status = normalizedError?.status || normalizedError?.statusCode || 500;
  const message = normalizedError?.message || "Internal Server Error";

  if (!res.headersSent) {
    res.status(status).json({ message });
  }

  console.error(err);
});

const PORT = parseInt(process.env.PORT || "3001", 10);
app.listen(PORT, HOST, () => {
  console.log(`Backend server running on http://${HOST}:${PORT}`);
});
