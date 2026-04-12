import type { Express, Request, Response } from "express";
import { db } from "./db";
import { rateLimits, contactSchema, lawFirmLeadSchema, claimOrderSchema } from "../shared/schema";
import { eq, and, gte } from "drizzle-orm";
import { deliverFormSubmission } from "./form-delivery";
import { triggerN8nTestWebhook } from "./n8n";

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
  if (process.env.NODE_ENV === "development" || process.env.DISABLE_FORM_RATE_LIMITS === "true") {
    return false;
  }

  const useMemoryFallback = () => {
    const now = Date.now();
    const key = `${clientIP}:${functionName}`;
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
  };

  const now = Date.now();
  const windowStart = new Date(now - RATE_WINDOW);
  const key = `${clientIP}:${functionName}`;

  if (!db) {
    return useMemoryFallback();
  }

  try {
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
  } catch (error) {
    console.error("Rate limit storage unavailable, using in-memory fallback:", error);
    return useMemoryFallback();
  }
}

function formatDetailLines(details: Array<[string, string | undefined]>): string {
  return details
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function registerRoutes(app: Express): void {
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

    const fullName = `${firstName} ${lastName}`;
    const submittedAt = new Date().toISOString();

    try {
      await deliverFormSubmission(req, {
        clientIp: clientIP,
        n8nTarget: "contact",
        twenty: {
          source: "contact-form",
          title: `Contact inquiry - ${fullName}`,
          description: formatDetailLines([
            ["Submission type", "Contact inquiry"],
            ["Name", fullName],
            ["Email", email],
            ["Phone", phone],
            ["Inquiry type", inquiryType],
            ["Message", message],
            ["Submitted", submittedAt],
          ]),
          contactName: fullName,
          email,
          phone,
        },
        n8n: {
          type: "contact-form",
          title: `Contact inquiry - ${fullName}`,
          description: formatDetailLines([
            ["Submission type", "Contact inquiry"],
            ["Name", fullName],
            ["Email", email],
            ["Phone", phone],
            ["Inquiry type", inquiryType],
            ["Message", message],
            ["Submitted", submittedAt],
          ]),
          submittedAt,
          contactName: fullName,
          email,
          phone,
          details: {
            submissionType: "Contact inquiry",
            firstName,
            lastName,
            inquiryType,
            message,
          },
        },
      });

      triggerN8nTestWebhook().catch((error) => {
        console.error("n8n test webhook error:", error);
      });

      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Form delivery error:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  app.post("/api/send-law-firm-lead", async (req: Request, res: Response) => {
    const clientIP = getClientIP(req);
    const parsed = lawFirmLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const data = parsed.data;

    const submittedAt = new Date().toISOString();

    try {
      await deliverFormSubmission(req, {
        clientIp: clientIP,
        n8nTarget: "request-cases",
        twenty: {
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
            ["Submitted", submittedAt],
          ]),
          contactName: data.contactName,
          companyName: data.firmName,
          email: data.email,
          phone: data.phone,
        },
        n8n: {
          type: "law-firm-demo",
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
            ["Submitted", submittedAt],
          ]),
          submittedAt,
          contactName: data.contactName,
          companyName: data.firmName,
          email: data.email,
          phone: data.phone,
          details: {
            submissionType: "Law firm inquiry",
            firmName: data.firmName,
            practiceAreas: data.practiceAreas,
            caseVolume: data.caseVolume,
            challenge: data.challenge,
          },
        },
      });

      res.json({ success: true, message: "Demo request received" });
    } catch (error) {
      console.error("Form delivery error:", error);
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

    const submittedAt = new Date().toISOString();
    const selectedCasesSummary = formData.selectedCases
      .map((selection) => `${selection.caseType} x${selection.quantity}`)
      .join(", ");

    try {
      await deliverFormSubmission(req, {
        clientIp: clientIP,
        n8nTarget: "request-cases",
        twenty: {
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
            ["Selected cases", selectedCasesSummary],
            ["Geographic preferences", formData.geographicPreferences.join(", ")],
            ["Special requirements", formData.requirements],
            ["Years in practice", formData.yearsInPractice],
            ["Referral source", formData.referralSource],
            ["Service agreement accepted", formData.serviceAgreement ? "Yes" : "No"],
            ["Submitted", submittedAt],
          ]),
          contactName: formData.attorneyName,
          companyName: formData.firmName,
          email: formData.email,
          phone: formData.phone,
        },
        n8n: {
          type: "claim-order",
          title: `Claim order - ${formData.firmName} (${orderId})`,
          description: formatDetailLines([
            ["Submission type", "Claim order"],
            ["Order ID", orderId],
            ["Law firm", formData.firmName],
            ["Attorney", formData.attorneyName],
            ["Email", formData.email],
            ["Phone", formData.phone],
            ["Practice areas", formData.practiceAreas.join(", ")],
            ["Selected cases", selectedCasesSummary],
            ["Geographic preferences", formData.geographicPreferences.join(", ")],
            ["Special requirements", formData.requirements],
            ["Years in practice", formData.yearsInPractice],
            ["Referral source", formData.referralSource],
            ["Service agreement accepted", formData.serviceAgreement ? "Yes" : "No"],
            ["Submitted", submittedAt],
          ]),
          submittedAt,
          contactName: formData.attorneyName,
          companyName: formData.firmName,
          email: formData.email,
          phone: formData.phone,
          details: {
            submissionType: "Claim order",
            orderId,
            firmName: formData.firmName,
            attorneyName: formData.attorneyName,
            practiceAreas: formData.practiceAreas,
            selectedCases: formData.selectedCases,
            geographicPreferences: formData.geographicPreferences,
            requirements: formData.requirements,
            yearsInPractice: formData.yearsInPractice,
            referralSource: formData.referralSource,
            serviceAgreement: formData.serviceAgreement,
          },
        },
      });

      res.json({ success: true, message: "Case purchase order submitted successfully", orderId });
    } catch (error) {
      console.error("Form delivery error:", error);
      res.status(500).json({ error: "Failed to process case purchase order" });
    }
  });
}
