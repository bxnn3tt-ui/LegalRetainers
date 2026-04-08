import http from "node:http";
import https from "node:https";

type TwentySubmission = {
  source: string;
  title: string;
  description: string;
  contactName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
};

type TwentyConfig = {
  apiKey: string;
  baseUrl: string;
  objectName: string;
  nameField: string;
  allowInsecureTls: boolean;
  descriptionField?: string;
  sourceField?: string;
  contactNameField?: string;
  companyNameField?: string;
  emailField?: string;
  phoneField?: string;
  stageField?: string;
  stageValue?: string;
};

function readTwentyConfig(): TwentyConfig {
  const apiKey = process.env.TWENTY_API_KEY;

  if (!apiKey) {
    throw new Error("TWENTY_API_KEY not configured");
  }

  return {
    apiKey,
    baseUrl: (process.env.TWENTY_BASE_URL || "https://api.twenty.com").replace(/\/+$/, ""),
    objectName: process.env.TWENTY_OBJECT_NAME || "opportunities",
    nameField: process.env.TWENTY_OPPORTUNITY_NAME_FIELD || "name",
    allowInsecureTls: process.env.TWENTY_ALLOW_INSECURE_TLS === "true",
    descriptionField: process.env.TWENTY_OPPORTUNITY_DESCRIPTION_FIELD || undefined,
    sourceField: process.env.TWENTY_OPPORTUNITY_SOURCE_FIELD,
    contactNameField: process.env.TWENTY_OPPORTUNITY_CONTACT_NAME_FIELD,
    companyNameField: process.env.TWENTY_OPPORTUNITY_COMPANY_NAME_FIELD,
    emailField: process.env.TWENTY_OPPORTUNITY_EMAIL_FIELD,
    phoneField: process.env.TWENTY_OPPORTUNITY_PHONE_FIELD,
    stageField: process.env.TWENTY_OPPORTUNITY_STAGE_FIELD,
    stageValue: process.env.TWENTY_OPPORTUNITY_STAGE_VALUE,
  };
}

function assignIfPresent(record: Record<string, string>, key: string | undefined, value: string | undefined) {
  if (!key || !value) {
    return;
  }

  record[key] = value;
}

function shouldUseInsecureLocalTls(config: TwentyConfig) {
  return (
    process.env.NODE_ENV === "development" &&
    config.allowInsecureTls &&
    config.baseUrl.startsWith("https://")
  );
}

async function postJson(url: string, body: Record<string, string>, apiKey: string, allowInsecureLocalTls: boolean) {
  if (!allowInsecureLocalTls) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
  }

  const target = new URL(url);
  const requestBody = JSON.stringify(body);
  const client = target.protocol === "https:" ? https : http;

  return new Promise<Response>((resolve, reject) => {
    const request = client.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || (target.protocol === "https:" ? 443 : 80),
        path: `${target.pathname}${target.search}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
          Authorization: `Bearer ${apiKey}`,
        },
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
    request.write(requestBody);
    request.end();
  });
}

export async function createTwentyOpportunity(submission: TwentySubmission) {
  const config = readTwentyConfig();
  const payload: Record<string, string> = {
    [config.nameField]: submission.title,
  };

  assignIfPresent(payload, config.descriptionField, submission.description);
  assignIfPresent(payload, config.sourceField, submission.source);
  assignIfPresent(payload, config.contactNameField, submission.contactName);
  assignIfPresent(payload, config.companyNameField, submission.companyName);
  assignIfPresent(payload, config.emailField, submission.email);
  assignIfPresent(payload, config.phoneField, submission.phone);
  assignIfPresent(
    payload,
    config.stageField,
    config.stageField && config.stageValue ? config.stageValue : undefined,
  );

  const response = await postJson(
    `${config.baseUrl}/rest/${config.objectName}`,
    payload,
    config.apiKey,
    shouldUseInsecureLocalTls(config),
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Twenty API error (${response.status}): ${errorBody.slice(0, 500)}`);
  }

  return response.json();
}
