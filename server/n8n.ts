import http from "node:http";
import https from "node:https";

type N8nSubmissionMetadata = {
  clientIp: string;
  endpoint: string;
  userAgent?: string;
};

export type N8nSubmissionPayload = {
  type: string;
  title: string;
  description: string;
  submittedAt: string;
  contactName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  details: Record<string, unknown>;
  metadata: N8nSubmissionMetadata;
};

type N8nConfig = {
  webhookUrl: string;
  secret?: string;
  secretHeader: string;
  timeoutMs: number;
  allowInsecureTls: boolean;
};

export type N8nWebhookTarget = "default" | "contact" | "request-cases";

type N8nTestWebhookResult = {
  ok: boolean;
  status: number;
  redirected: boolean;
  location?: string | null;
};

function readWebhookUrl(target: N8nWebhookTarget) {
  if (target === "contact") {
    return process.env.N8N_CONTACT_WEBHOOK_URL || process.env.N8N_FORM_WEBHOOK_URL;
  }

  if (target === "request-cases") {
    return process.env.N8N_REQUEST_CASES_WEBHOOK_URL || process.env.N8N_FORM_WEBHOOK_URL;
  }

  return process.env.N8N_FORM_WEBHOOK_URL;
}

function readN8nConfig(target: N8nWebhookTarget = "default"): N8nConfig {
  const webhookUrl = readWebhookUrl(target);

  if (!webhookUrl) {
    throw new Error(`n8n webhook URL not configured for target "${target}"`);
  }

  const timeoutMs = Number.parseInt(process.env.N8N_FORM_WEBHOOK_TIMEOUT_MS || "10000", 10);

  return {
    webhookUrl,
    secret: process.env.N8N_FORM_WEBHOOK_SECRET || undefined,
    secretHeader: process.env.N8N_FORM_WEBHOOK_SECRET_HEADER || "x-legalretainers-secret",
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 10000,
    allowInsecureTls: process.env.N8N_ALLOW_INSECURE_TLS === "true",
  };
}

function shouldUseInsecureLocalTls(config: N8nConfig) {
  return (
    process.env.NODE_ENV === "development" &&
    config.allowInsecureTls &&
    config.webhookUrl.startsWith("https://")
  );
}

async function sendRequest(url: string, init: RequestInit, allowInsecureLocalTls: boolean) {
  if (!allowInsecureLocalTls) {
    return fetch(url, init);
  }

  const target = new URL(url);
  const requestBody =
    typeof init.body === "string" || init.body === undefined ? init.body : String(init.body);
  const client = target.protocol === "https:" ? https : http;
  const headers = new Headers(init.headers);

  if (requestBody !== undefined && !headers.has("Content-Length")) {
    headers.set("Content-Length", Buffer.byteLength(requestBody).toString());
  }

  return new Promise<Response>((resolve, reject) => {
    const request = client.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (target.protocol === "https:" ? 443 : 80),
        path: `${target.pathname}${target.search}`,
        method: init.method || "GET",
        headers: Object.fromEntries(headers.entries()),
        rejectUnauthorized: false,
      },
      (response) => {
        const chunks: Buffer[] = [];

        response.on("data", (chunk) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });

        response.on("end", () => {
          resolve(
            new Response(Buffer.concat(chunks), {
              status: response.statusCode || 500,
              statusText: response.statusMessage,
              headers: new Headers(
                Object.entries(response.headers).flatMap(([key, value]) => {
                  if (Array.isArray(value)) {
                    return value.map((item) => [key, item]);
                  }

                  return value ? [[key, value]] : [];
                }),
              ),
            }),
          );
        });
      },
    );

    request.on("error", reject);

    if (requestBody !== undefined) {
      request.write(requestBody);
    }

    request.end();
  });
}

export async function forwardSubmissionToN8n(payload: N8nSubmissionPayload) {
  return forwardSubmissionToN8nTarget("default", payload);
}

export async function forwardSubmissionToN8nTarget(target: N8nWebhookTarget, payload: N8nSubmissionPayload) {
  const config = readN8nConfig(target);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (config.secret) {
    headers[config.secretHeader] = config.secret;
  }

  const response = await sendRequest(
    config.webhookUrl,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(config.timeoutMs),
    },
    shouldUseInsecureLocalTls(config),
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`n8n webhook error (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function triggerN8nTestWebhook() {
  const testWebhookUrl = process.env.N8N_TEST_WEBHOOK_URL;

  if (!testWebhookUrl) {
    return null;
  }

  const timeoutMs = Number.parseInt(process.env.N8N_FORM_WEBHOOK_TIMEOUT_MS || "10000", 10);
  const allowInsecureLocalTls =
    process.env.NODE_ENV === "development" &&
    process.env.N8N_ALLOW_INSECURE_TLS === "true" &&
    testWebhookUrl.startsWith("https://");

  const response = await sendRequest(
    testWebhookUrl,
    {
      method: "GET",
      redirect: "manual",
      signal: AbortSignal.timeout(Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 10000),
    },
    allowInsecureLocalTls,
  );

  const result: N8nTestWebhookResult = {
    ok: response.ok,
    status: response.status,
    redirected: response.status >= 300 && response.status < 400,
    location: response.headers.get("location"),
  };

  if (result.redirected) {
    console.warn("n8n test webhook redirected before execution", result);
  }

  return result;
}
