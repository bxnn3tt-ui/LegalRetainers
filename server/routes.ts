import type { Express, Request, Response } from "express";
import { db } from "./db";
import { rateLimits, newsletterSchema, contactSchema, lawFirmLeadSchema, claimOrderSchema } from "../shared/schema";
import { eq, and, gte } from "drizzle-orm";
import { createTwentyOpportunity } from "./twenty";

const RATE_LIMIT = 5;
const RATE_LIMIT_ORDER = 3;
const RATE_WINDOW = 60 * 60 * 1000;
const memoryRateLimits = new Map<string, { requestCount: number; windowStart: number; lastRequest: number }>();

function getClientIP(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || 
         (req.headers['cf-connecting-ip'] as string) || 
         req.ip ||
         'unknown';
}

async function checkRateLimit(clientIP: string, functionName: string, limit: number = RATE_LIMIT): Promise<boolean> {
  const now = Date.now();
  const windowStart = new Date(now - RATE_WINDOW);
  const key = `${clientIP}:${functionName}`;

  if (!db) {
    const existing = memoryRateLimits.get(key);

    if (!existing || existing.windowStart < now - RATE_WINDOW) {
      memoryRateLimits.set(key, {
        requestCount: 1,
        windowStart: now,
        lastRequest: now,
      });
      return false;
    }

    if (existing.requestCount >= limit) {
      return true;
    }

    memoryRateLimits.set(key, {
      ...existing,
      requestCount: existing.requestCount + 1,
      lastRequest: now,
    });

    return false;
  }

  const existing = await db
    .select()
    .from(rateLimits)
    .where(
      and(
        eq(rateLimits.ipAddress, clientIP),
        eq(rateLimits.functionName, functionName),
        gte(rateLimits.windowStart, windowStart)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    await db.insert(rateLimits).values({
      ipAddress: clientIP,
      functionName: functionName,
      requestCount: 1,
      windowStart: new Date(now),
    });
    return false;
  }

  const record = existing[0];
  if (record.requestCount >= limit) {
    return true;
  }

  await db
    .update(rateLimits)
    .set({ requestCount: record.requestCount + 1, lastRequest: new Date() })
    .where(eq(rateLimits.id, record.id));

  return false;
}

function formatDetailLines(details: Array<[string, string | undefined]>): string {
  return details
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function registerRoutes(app: Express): void {
  app.post("/api/send-newsletter", async (req: Request, res: Response) => {
    const clientIP = getClientIP(req);
    const isLimited = await checkRateLimit(clientIP, 'send-newsletter');
    if (isLimited) {
      return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    }

    const parsed = newsletterSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const { name, email } = parsed.data;

    try {
      await createTwentyOpportunity({
        source: "newsletter",
        title: `Newsletter signup - ${name}`,
        description: formatDetailLines([
          ["Submission type", "Newsletter signup"],
          ["Name", name],
          ["Email", email],
          ["Submitted", new Date().toISOString()],
        ]),
        contactName: name,
        email,
      });

      res.json({ success: true, message: "Newsletter subscription successful" });
    } catch (error) {
      console.error("Twenty sync error:", error);
      res.status(500).json({ error: "Failed to process newsletter subscription" });
    }
  });

  app.post("/api/send-contact", async (req: Request, res: Response) => {
    const clientIP = getClientIP(req);
    const isLimited = await checkRateLimit(clientIP, 'send-contact');
    if (isLimited) {
      return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    }

    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "All required fields must be completed" });
    }

    const { firstName, lastName, email, phone, inquiryType, message } = parsed.data;

    try {
      await createTwentyOpportunity({
        source: "contact-form",
        title: `Contact inquiry - ${firstName} ${lastName}`,
        description: formatDetailLines([
          ["Submission type", "Contact inquiry"],
          ["Name", `${firstName} ${lastName}`],
          ["Email", email],
          ["Phone", phone],
          ["Inquiry type", inquiryType],
          ["Message", message],
          ["Submitted", new Date().toISOString()],
        ]),
        contactName: `${firstName} ${lastName}`,
        email,
        phone,
      });

      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Twenty sync error:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  app.post("/api/send-law-firm-lead", async (req: Request, res: Response) => {
    const parsed = lawFirmLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const data = parsed.data;

    try {
      await createTwentyOpportunity({
        source: "law-firm-demo",
        title: `Law firm inquiry - ${data.firmName}`,
        description: formatDetailLines([
          ["Submission type", "Law firm inquiry"],
          ["Firm name", data.firmName],
          ["Contact name", data.contactName],
          ["Email", data.email],
          ["Phone", data.phone],
          ["Practice areas", data.practiceAreas.join(", ")],
          ["Monthly case volume", data.caseVolume],
          ["Main challenge", data.challenge],
          ["Submitted", new Date().toISOString()],
        ]),
        contactName: data.contactName,
        companyName: data.firmName,
        email: data.email,
        phone: data.phone,
      });

      res.json({ success: true, message: "Demo request received" });
    } catch (error) {
      console.error("Twenty sync error:", error);
      res.status(500).json({ error: "Failed to process demo request" });
    }
  });

  app.post("/api/send-claim-order", async (req: Request, res: Response) => {
    const clientIP = getClientIP(req);
    const isLimited = await checkRateLimit(clientIP, 'send-claim-order', RATE_LIMIT_ORDER);
    if (isLimited) {
      return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
    }

    const parsed = claimOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "All required fields must be completed and service agreement must be accepted" });
    }

    const formData = parsed.data;

    if (!formData.serviceAgreement) {
      return res.status(400).json({ error: "Service agreement must be accepted" });
    }

    const orderId = `CPO-${Date.now().toString().slice(-6)}`;

    try {
      await createTwentyOpportunity({
        source: "claim-order",
        title: `Claim order - ${formData.firmName} (${orderId})`,
        description: formatDetailLines([
          ["Submission type", "Claim order"],
          ["Order ID", orderId],
          ["Law firm", formData.firmName],
          ["Attorney", formData.attorneyName],
          ["Email", formData.email],
          ["Phone", formData.phone],
          ["Practice areas", formData.practiceAreas.join(", ")],
          [
            "Selected cases",
            formData.selectedCases
              .map((selection) => `${selection.caseType} x${selection.quantity}`)
              .join(", "),
          ],
          ["Geographic preferences", formData.geographicPreferences.join(", ")],
          ["Special requirements", formData.requirements],
          ["Years in practice", formData.yearsInPractice],
          ["Referral source", formData.referralSource],
          ["Service agreement accepted", formData.serviceAgreement ? "Yes" : "No"],
          ["Submitted", new Date().toISOString()],
        ]),
        contactName: formData.attorneyName,
        companyName: formData.firmName,
        email: formData.email,
        phone: formData.phone,
      });

      res.json({ success: true, message: "Case purchase order submitted successfully", orderId });
    } catch (error) {
      console.error("Twenty sync error:", error);
      res.status(500).json({ error: "Failed to process case purchase order" });
    }
  });
}
