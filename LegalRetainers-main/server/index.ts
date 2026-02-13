import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Anti-scraping middleware - blocks site scrapers while allowing LLM crawlers
const BLOCKED_SCRAPERS = [
  'sitesucker', 'httrack', 'webcopy', 'webcopier', 'teleport', 'website-download',
  'webzip', 'wget', 'curl', 'libwww-perl', 'python-requests', 'scrapy', 'httpclient',
  'java/', 'apache-httpclient', 'go-http-client', 'node-fetch', 'axios/',
  'webripper', 'offline explorer', 'blackwidow', 'pavuk', 'prowebwalker',
  'cheesebot', 'cherrypicker', 'emailcollector', 'extractorpro', 'webbandit',
  'websitequester', 'webstripper', 'webwhacker', 'leechftp', 'smartdownload',
  'superbot', 'webspider', 'flashget', 'getright', 'teleport pro', 'webdevil',
  'mass downloader', 'netspider', 'sitesnagger', 'web downloader', 'webzip',
  'web data extractor', 'sitevault', 'sitecopy', 'digext', 'httpunit'
];

const ALLOWED_BOTS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
  'gptbot', 'chatgpt-user', 'claudebot', 'claude-web', 'anthropic-ai',
  'cohere-ai', 'perplexitybot', 'youbot', 'ccbot', 'applebot',
  'petalbot', 'bytespider', 'semrushbot', 'ahrefsbot', 'mj12bot'
];

// Track request frequency per IP for suspicious behavior detection
const requestCounts = new Map<string, { count: number; firstRequest: number }>();
const RATE_WINDOW_MS = 60000; // 1 minute
const SUSPICIOUS_RATE = 100; // requests per minute threshold

function getClientIP(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || 
         (req.headers['cf-connecting-ip'] as string) || 
         req.ip || 
         'unknown';
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const userAgent = (req.headers['user-agent'] || '').toLowerCase();
  const clientIP = getClientIP(req);
  
  // Block requests with empty user agents (common scraper behavior)
  if (!userAgent || userAgent.length < 5) {
    console.log(`Blocked empty/short UA from ${clientIP}`);
    return res.status(403).json({ 
      error: 'Access denied', 
      message: 'Invalid request' 
    });
  }
  
  // Always allow known good bots (LLM crawlers, search engines, social media)
  const isAllowedBot = ALLOWED_BOTS.some(bot => userAgent.includes(bot));
  if (isAllowedBot) {
    return next();
  }
  
  // Block known scraping tools
  const isBlockedScraper = BLOCKED_SCRAPERS.some(scraper => userAgent.includes(scraper));
  if (isBlockedScraper) {
    console.log(`Blocked scraper: ${userAgent} from ${clientIP}`);
    return res.status(403).json({ 
      error: 'Access denied', 
      message: 'Automated scraping is not permitted. Please contact us for API access.' 
    });
  }
  
  // Rate-based detection for suspicious crawling behavior
  const now = Date.now();
  const clientData = requestCounts.get(clientIP);
  
  if (clientData) {
    if (now - clientData.firstRequest < RATE_WINDOW_MS) {
      clientData.count++;
      if (clientData.count > SUSPICIOUS_RATE) {
        console.log(`Rate limited suspicious activity from ${clientIP}: ${clientData.count} requests/min`);
        return res.status(429).json({ 
          error: 'Too many requests', 
          message: 'Please slow down your requests.' 
        });
      }
    } else {
      // Reset window
      requestCounts.set(clientIP, { count: 1, firstRequest: now });
    }
  } else {
    requestCounts.set(clientIP, { count: 1, firstRequest: now });
  }
  
  // Cleanup old entries periodically
  if (requestCounts.size > 10000) {
    const cutoff = now - RATE_WINDOW_MS;
    for (const [ip, data] of requestCounts) {
      if (data.firstRequest < cutoff) {
        requestCounts.delete(ip);
      }
    }
  }
  
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
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

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
  throw err;
});

const PORT = parseInt(process.env.PORT || "3001", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on port ${PORT}`);
});
