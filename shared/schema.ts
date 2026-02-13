import { pgTable, text, serial, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rateLimits = pgTable("rate_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  ipAddress: text("ip_address").notNull(),
  functionName: text("function_name").notNull(),
  requestCount: integer("request_count").notNull().default(1),
  windowStart: timestamp("window_start").notNull().defaultNow(),
  lastRequest: timestamp("last_request").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRateLimitSchema = createInsertSchema(rateLimits);

export const newsletterSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
});

export const contactSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email().max(255),
  phone: z.string().optional(),
  inquiryType: z.string().min(1),
  message: z.string().min(1).max(2000),
});

export const lawFirmLeadSchema = z.object({
  firmName: z.string().min(1).max(100),
  contactName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(10).max(20),
  practiceAreas: z.array(z.string()).min(1),
  caseVolume: z.string().min(1),
  challenge: z.string().max(500).optional(),
});

export const claimOrderSchema = z.object({
  firmName: z.string().min(1).max(200),
  attorneyName: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().min(1),
  practiceAreas: z.array(z.string()),
  selectedCases: z.array(z.object({
    caseType: z.string(),
    quantity: z.number(),
  })),
  geographicPreferences: z.array(z.string()),
  requirements: z.string().optional(),
  yearsInPractice: z.string(),
  referralSource: z.string(),
  serviceAgreement: z.boolean(),
});

export type Newsletter = z.infer<typeof newsletterSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type LawFirmLead = z.infer<typeof lawFirmLeadSchema>;
export type ClaimOrder = z.infer<typeof claimOrderSchema>;
export type RateLimit = typeof rateLimits.$inferSelect;
export type InsertRateLimit = typeof rateLimits.$inferInsert;
