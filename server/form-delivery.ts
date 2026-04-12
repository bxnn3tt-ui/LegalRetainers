import type { Request } from "express";
import { forwardSubmissionToN8n, type N8nSubmissionPayload } from "./n8n";
import { createTwentyOpportunity, type TwentySubmission } from "./twenty";

type DeliveryTarget = "twenty" | "n8n";

export type FormSubmission = {
  clientIp: string;
  twenty: TwentySubmission;
  n8n: Omit<N8nSubmissionPayload, "metadata">;
};

function readDeliveryTargets(): DeliveryTarget[] {
  const configuredTargets = (process.env.FORM_SUBMISSION_TARGETS || "twenty")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value): value is DeliveryTarget => value === "twenty" || value === "n8n");

  return configuredTargets.length > 0 ? configuredTargets : ["twenty"];
}

function getUserAgent(req: Request) {
  const userAgent = req.get("user-agent");
  return userAgent && userAgent.trim().length > 0 ? userAgent : undefined;
}

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

function isTwentyConfigured() {
  return Boolean(process.env.TWENTY_API_KEY);
}

function isN8nConfigured() {
  return Boolean(process.env.N8N_FORM_WEBHOOK_URL);
}

export async function deliverFormSubmission(req: Request, submission: FormSubmission) {
  const targets = readDeliveryTargets();
  let deliveredCount = 0;

  for (const target of targets) {
    if (target === "twenty") {
      if (!isTwentyConfigured()) {
        if (isDevelopment()) {
          console.warn("Skipping Twenty delivery in development because TWENTY_API_KEY is not configured.");
          continue;
        }

        throw new Error("TWENTY_API_KEY not configured");
      }

      await createTwentyOpportunity(submission.twenty);
      deliveredCount += 1;
      continue;
    }

    if (!isN8nConfigured()) {
      if (isDevelopment()) {
        console.warn("Skipping n8n delivery in development because N8N_FORM_WEBHOOK_URL is not configured.");
        continue;
      }

      throw new Error("N8N_FORM_WEBHOOK_URL not configured");
    }

    await forwardSubmissionToN8n({
      ...submission.n8n,
      metadata: {
        clientIp: submission.clientIp,
        endpoint: req.path,
        userAgent: getUserAgent(req),
      },
    });
    deliveredCount += 1;
  }

  if (deliveredCount === 0 && isDevelopment()) {
    console.warn("No form delivery targets are configured for development; skipping external delivery.");
  }
}
