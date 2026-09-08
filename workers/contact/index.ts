import { portfolio } from "../../app/data/portfolio";

export type Env = {
  emailService: {
    send: (message: {
      from: string;
      to: string;
      replyTo: string;
      subject: string;
      text: string;
    }) => Promise<{ messageId: string }>;
  };
  CONTACT_FROM: string;
  ALLOWED_ORIGINS?: string;
  CONTACT_RATE_LIMITER: { limit: (options: { key: string }) => Promise<{ success: boolean }> };
};

type Inquiry = {
  name: string;
  email: string;
  company: string;
  message: string;
  intention: string;
  context: string;
};

function validText(value: unknown, max: number, required = false): value is string {
  return typeof value === "string" && value.length <= max && (!required || value.trim().length > 0);
}

function isInquiry(value: Record<string, unknown>): value is Record<string, unknown> & Inquiry {
  const intention = portfolio.contact.intentions.find((option) => option.id === value.intention);
  return validText(value.name, 100, true)
    && validText(value.email, 254, true)
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)
    && !/[\r\n]/.test(value.name)
    && validText(value.company, 150)
    && validText(value.message, 5000, true)
    && validText(value.intention, 100)
    && (value.intention === "" || !!intention)
    && validText(value.context, 150)
    && (value.context === "" || !!intention?.followUp?.options.includes(value.context));
}

// Bound bytes before parsing, including requests without Content-Length.
async function readBody(request: Request): Promise<string> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        throw new Error("Body too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || portfolio.metadata.url).split(",").map((entry) => entry.trim());
    const headers = new Headers({ "Cache-Control": "no-store", Vary: "Origin" });
    const respond = (status: number, ok = false) => Response.json({ ok }, { status, headers });
    if (new URL(request.url).pathname !== "/api/contact") return respond(404);
    if (!allowed.includes(origin)) return respond(403);
    headers.set("Access-Control-Allow-Origin", origin);
    if (request.method === "OPTIONS") {
      headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      headers.set("Access-Control-Allow-Headers", "Content-Type");
      headers.set("Access-Control-Max-Age", "86400");
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== "POST") {
      headers.set("Allow", "POST, OPTIONS");
      return respond(405);
    }
    if (request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json") return respond(415);
    try {
      // Cloudflare sets this header; never trust a client-supplied forwarded IP.
      const ip = request.headers.get("CF-Connecting-IP") || "local";
      if (!(await env.CONTACT_RATE_LIMITER.limit({ key: ip })).success) {
        headers.set("Retry-After", "60");
        return respond(429);
      }
      let body: unknown;
      try {
        body = JSON.parse(await readBody(request));
      } catch {
        return respond(400);
      }
      if (!body || typeof body !== "object" || Array.isArray(body)) return respond(400);
      const data = body as Record<string, unknown>;
      if (!validText(data.website, 200)) return respond(400);
      if (data.website.trim()) return respond(200, true); // Quietly discard honeypot submissions.
      if (!isInquiry(data)) return respond(400);
      if (!env.emailService || !env.CONTACT_FROM) return respond(503);
      const intention = portfolio.contact.intentions.find((option) => option.id === data.intention);
      await env.emailService.send({
        from: env.CONTACT_FROM,
        to: portfolio.contact.email,
        replyTo: data.email.trim(),
        subject: `Portfolio conversation from ${data.name.trim()}`,
        text: [
          `Name: ${data.name.trim()}`,
          `Email: ${data.email.trim()}`,
          `Company / Team: ${data.company.trim() || "Not provided"}`,
          `Intention: ${intention?.label || "Open to discussion"}`,
          ...(intention?.followUp ? [`${intention.followUp.heading} ${data.context || "Open to discussion"}`] : []),
          "", data.message.trim(),
        ].join("\n"),
      });
      return respond(200, true);
    } catch {
      // Neither personal information nor provider errors are returned or logged.
      return respond(503);
    }
  },
};

export default worker;
