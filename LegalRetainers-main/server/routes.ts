import type { Express, Request, Response } from "express";
import { db } from "./db";
import { rateLimits, newsletterSchema, contactSchema, lawFirmLeadSchema, claimOrderSchema } from "../shared/schema";
import { eq, and, gte } from "drizzle-orm";
import { Resend } from "resend";

const RATE_LIMIT = 5;
const RATE_LIMIT_ORDER = 3;
const RATE_WINDOW = 60 * 60 * 1000;

function getClientIP(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || 
         (req.headers['cf-connecting-ip'] as string) || 
         req.ip ||
         'unknown';
}

async function checkRateLimit(clientIP: string, functionName: string, limit: number = RATE_LIMIT): Promise<boolean> {
  const now = Date.now();
  const windowStart = new Date(now - RATE_WINDOW);

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

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function registerRoutes(app: Express): void {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

    if (!resend) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    try {
      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: ["dylan@legalretainers.com"],
        subject: "New Newsletter Subscription",
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `,
      });

      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: [email],
        subject: "Thank you for subscribing to LegalRetainers",
        html: `
          <h2>Welcome to LegalRetainers, ${escapeHtml(name)}!</h2>
          <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
          <ul>
            <li>New legal case opportunities</li>
            <li>Industry news and insights</li>
            <li>Practice area updates</li>
            <li>Special offers for law firms</li>
          </ul>
          <p>Best regards,<br>The LegalRetainers Team</p>
        `,
      });

      res.json({ success: true, message: "Newsletter subscription successful" });
    } catch (error) {
      console.error("Email error:", error);
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

    if (!resend) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    try {
      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: ["dylan@legalretainers.com"],
        subject: `New Contact Form Submission - ${inquiryType}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : 'Not provided'}</p>
          <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryType)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        `,
      });

      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: [email],
        subject: "We received your message - LegalRetainers",
        html: `
          <h2>Thank you for contacting LegalRetainers, ${escapeHtml(firstName)}!</h2>
          <p>We have received your inquiry regarding: <strong>${escapeHtml(inquiryType.replace(/-/g, ' '))}</strong></p>
          <p>Our team will review your message and respond within 24-48 business hours.</p>
          <p>If your matter is urgent, please call us directly at (305) 900-5954.</p>
          <p>Best regards,<br>The LegalRetainers Team</p>
        `,
      });

      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  app.post("/api/send-law-firm-lead", async (req: Request, res: Response) => {
    const parsed = lawFirmLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const data = parsed.data;

    if (!resend) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    try {
      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: ["dylan@legalretainers.com"],
        subject: `New Law Firm Demo Request: ${data.firmName}`,
        html: `
          <h1>New Law Firm Demo Request</h1>
          <h2>Firm Information</h2>
          <p><strong>Firm Name:</strong> ${escapeHtml(data.firmName)}</p>
          <p><strong>Contact Name:</strong> ${escapeHtml(data.contactName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
          
          <h2>Practice Details</h2>
          <p><strong>Practice Areas:</strong> ${data.practiceAreas.join(", ")}</p>
          <p><strong>Monthly Case Volume:</strong> ${escapeHtml(data.caseVolume)}</p>
          ${data.challenge ? `<p><strong>Main Challenge:</strong> ${escapeHtml(data.challenge)}</p>` : ""}
          
          <p style="margin-top: 20px; padding: 10px; background-color: #f0f0f0;">
            Please follow up within 24 hours to schedule their demo.
          </p>
        `,
      });

      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: [data.email],
        subject: "Thanks for Your Interest in LegalRetainers",
        html: `
          <h1>Thank you, ${escapeHtml(data.contactName)}!</h1>
          <p>We've received your demo request for ${escapeHtml(data.firmName)}.</p>
          <p>Our team will reach out within 24 hours to schedule a personalized demo and discuss how we can help streamline your retainer process.</p>
          
          <h2>What to Expect</h2>
          <ul>
            <li>See how our platform increases signed retainers</li>
            <li>Learn about our simple pricing (no setup fees)</li>
            <li>Get answers to your specific questions about ${data.practiceAreas.join(" and ")}</li>
          </ul>
          
          <p style="margin-top: 20px;">
            In the meantime, if you have any questions, feel free to reply to this email.
          </p>
          
          <p>Best regards,<br>The LegalRetainers Team</p>
        `,
      });

      res.json({ success: true, message: "Demo request received" });
    } catch (error) {
      console.error("Email error:", error);
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

    if (!resend) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const orderId = `CPO-${Date.now().toString().slice(-6)}`;

    const casesHtml = formData.selectedCases.map(selection => 
      `<li><strong>Case Type:</strong> ${escapeHtml(selection.caseType)} <strong>Quantity:</strong> ${selection.quantity}</li>`
    ).join('');

    try {
      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: ["dylan@legalretainers.com"],
        subject: `New Exclusive Lead Order - ${formData.firmName}`,
        html: `
          <h2>New Exclusive Lead Order</h2>
          <p><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>
          
          <h3>Firm Information</h3>
          <p><strong>Law Firm:</strong> ${escapeHtml(formData.firmName)}</p>
          <p><strong>Attorney:</strong> ${escapeHtml(formData.attorneyName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(formData.phone)}</p>
          <p><strong>Practice Areas:</strong> ${formData.practiceAreas.map(area => escapeHtml(area)).join(', ')}</p>
          
          <h3>Lead Selection</h3>
          <ul>${casesHtml}</ul>
          
          ${formData.geographicPreferences.length > 0 ? 
            `<p><strong>Geographic Preferences:</strong> ${formData.geographicPreferences.map(pref => escapeHtml(pref)).join(', ')}</p>` : ''}
          
          ${formData.requirements ? 
            `<p><strong>Special Requirements:</strong><br>${escapeHtml(formData.requirements).replace(/\n/g, '<br>')}</p>` : ''}
          
          <h3>Firm Qualifications</h3>
          <p><strong>Years in Practice:</strong> ${escapeHtml(formData.yearsInPractice)}</p>
          <p><strong>Referral Source:</strong> ${escapeHtml(formData.referralSource)}</p>
          
          <p><strong>Service Agreement Accepted:</strong> ${formData.serviceAgreement ? 'Yes' : 'No'}</p>
          <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
          
          <p><strong>Action Required:</strong> Begin prospect screening and schedule live warm transfers within 24-48 hours.</p>
        `,
      });

      await resend.emails.send({
        from: "LegalRetainers <noreply@legalretainers.com>",
        to: [formData.email],
        subject: `Exclusive Lead Order Confirmed - ${orderId}`,
        html: `
          <h2>Exclusive Lead Order Confirmed</h2>
          <p>Dear ${escapeHtml(formData.attorneyName)},</p>
          <p>Thank you for ordering exclusive legal leads. We have received your firm's information and will begin screening prospects for live transfer to your intake team.</p>
          
          <div style="background-color: #f4f4f4; padding: 15px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${escapeHtml(orderId)}</p>
            <p><strong>Law Firm:</strong> ${escapeHtml(formData.firmName)}</p>
            <p><strong>Lead Packages Requested:</strong> ${formData.selectedCases.length}</p>
          </div>
          
          <h3>What happens next?</h3>
          <ul>
            <li>Qualified prospects will be transferred live within 24-48 hours</li>
            <li>Each lead is exclusive — no competing firms will receive the same prospect</li>
            <li>Your intake team will receive warm transfers during business hours</li>
            <li>Order confirmation and tracking details will be sent to your email</li>
          </ul>
          
          <p><strong>Important:</strong> Leads are pre-qualified but conversion depends on your intake team's engagement. We recommend prompt follow-up and professional handling of all transfers.</p>
          
          <p>For any questions about your order, please reference Order ID <strong>${escapeHtml(orderId)}</strong> and contact us at (305) 900-5954.</p>
          
          <p>Best regards,<br>The LegalRetainers Team</p>
        `,
      });

      res.json({ success: true, message: "Case purchase order submitted successfully", orderId });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to process case purchase order" });
    }
  });
}
