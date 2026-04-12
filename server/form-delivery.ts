import type { Request } from "express";
import {
  forwardSubmissionToN8nTarget,
  type N8nSubmissionPayload,
  type N8nWebhookTarget,
} from "./n8n";
import { createTwentyOpportunity, type TwentySubmission } from "./twenty";

type DeliveryTarget = "twenty" | "n8n";

export type FormSubmission = {
  clientIp: string;
  twenty: TwentySubmission;
  n8n: Omit<N8nSubmissionPayload, "metadata">;
  n8nTarget?: N8nWebhookTarget;
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

function getConfiguredN8nWebhookUrl(target: N8nWebhookTarget = "default") {
  if (target === "contact") {
    return process.env.N8N_CONTACT_WEBHOOK_URL || process.env.N8N_FORM_WEBHOOK_URL;
  }

  if (target === "request-cases") {
    return process.env.N8N_REQUEST_CASES_WEBHOOK_URL || process.env.N8N_FORM_WEBHOOK_URL;
  }

  return process.env.N8N_FORM_WEBHOOK_URL;
}

function isN8nConfigured(target: N8nWebhookTarget = "default") {
  return Boolean(getConfiguredN8nWebhookUrl(target));
}

export async function deliverFormSubmission(req: Request, submission: FormSubmission) {
  const targets = readDeliveryTargets();
  let deliveredCount = 0;
  const n8nTarget = submission.n8nTarget || "default";

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

    if (!isN8nConfigured(n8nTarget)) {
      if (isDevelopment()) {
        console.warn(`Skipping n8n delivery in development because the webhook URL for target "${n8nTarget}" is not configured.`);
        continue;
      }

      throw new Error(`n8n webhook URL not configured for target "${n8nTarget}"`);
    }

    await forwardSubmissionToN8nTarget(n8nTarget, {
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
