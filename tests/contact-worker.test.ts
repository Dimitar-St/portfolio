import assert from "node:assert/strict";
import { test, mock } from "node:test";
import worker, { type Env } from "../workers/contact/index";
import { portfolio } from "../app/data/portfolio";

const inquiry = { name: "Test Engineer", email: "engineer@example.com", company: "Example", message: "Help build an API.", website: "", intention: "team", context: "Part-time" };
const env: Env = { emailService: { send: async () => ({ messageId: "email-id" }) }, CONTACT_FROM: "contact@example.com", CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) } };
function request(body: unknown = inquiry, headers: Record<string, string> = {}) {
  return new Request("https://worker.example/api/contact", { method: "POST", headers: { Origin: portfolio.metadata.url, "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
}

test("delivers plain text to configured recipient, with visitor reply-to", async () => {
  const send = mock.method(env.emailService, "send", async (payload: Parameters<Env["emailService"]["send"]>[0]) => {
    assert.equal(payload.from, env.CONTACT_FROM);
    assert.equal(payload.to, portfolio.contact.email);
    assert.equal(payload.replyTo, inquiry.email);
    assert.match(payload.text, /Join our team/);
    assert.match(payload.text, /Part-time/);
    assert.equal("html" in payload, false);
    return { messageId: "email-id" };
  });
  try {
    const result = await worker.fetch(request(), env);
    assert.equal(result.status, 200);
    assert.deepEqual(await result.json(), { ok: true });
    assert.equal(send.mock.callCount(), 1);
  } finally { send.mock.restore(); }
});

test("invalid fields, forged options, malformed and oversized bodies never reach provider", async () => {
  const send = mock.method(env.emailService, "send", async () => { throw new Error("Must not send"); });
  try {
    for (const patch of [{ name: " " }, { email: "bad@" }, { message: " " }, { intention: "Invalid" }, { context: "Invalid" }, { intention: "build", context: "Part-time" }, { intention: "other", context: "Part-time" }, { company: null }, { message: "x".repeat(5001) }, { name: "x\nBcc: bad" }]) {
      assert.equal((await worker.fetch(request({ ...inquiry, ...patch }), env)).status, 400);
    }
    assert.equal((await worker.fetch(request(null), env)).status, 400);
    assert.equal((await worker.fetch(request({ ...inquiry, message: "x".repeat(25000) }), env)).status, 400);
    const malformed = new Request("https://worker.example/api/contact", { method: "POST", headers: { Origin: portfolio.metadata.url, "Content-Type": "application/json" }, body: "{" });
    assert.equal((await worker.fetch(malformed, env)).status, 400);
    assert.equal(send.mock.callCount(), 0);
  } finally { send.mock.restore(); }
});

test("honeypot silently succeeds without sending", async () => {
  const send = mock.method(env.emailService, "send", async () => { throw new Error("Must not send"); });
  try {
    assert.deepEqual(await (await worker.fetch(request({ ...inquiry, website: "spam" }), env)).json(), { ok: true });
    assert.equal(send.mock.callCount(), 0);
  } finally { send.mock.restore(); }
});

test("origin, method, content type, and rate protections", async () => {
  assert.equal((await worker.fetch(request(inquiry, { Origin: "https://untrusted.example" }), env)).status, 403);
  assert.equal((await worker.fetch(request(inquiry, { "Content-Type": "text/plain" }), env)).status, 415);
  const preflight = await worker.fetch(new Request("https://worker.example/api/contact", { method: "OPTIONS", headers: { Origin: portfolio.metadata.url } }), env);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get("Access-Control-Allow-Origin"), portfolio.metadata.url);
  assert.equal((await worker.fetch(new Request("https://worker.example/api/contact", { headers: { Origin: portfolio.metadata.url } }), env)).status, 405);
  const limited = await worker.fetch(request(), { ...env, CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("Retry-After"), "60");
});

test("binding failure and missing sender produce safe retryable errors", async () => {
  const send = mock.method(env.emailService, "send", async () => { throw new Error("sensitive delivery error"); });
  try {
    const result = await worker.fetch(request(), env);
    assert.equal(result.status, 503);
    assert.deepEqual(await result.json(), { ok: false });
  } finally { send.mock.restore(); }
  assert.equal((await worker.fetch(request(), { ...env, CONTACT_FROM: "" })).status, 503);
});


test("accepts optional answers and every contextual path", async () => {
  const send = mock.method(env.emailService, "send", async () => ({ messageId: "email-id" }));
  try {
    const choices = [{ intention: "", context: "" }, ...portfolio.contact.intentions.flatMap((option) =>
      ["", ...(option.followUp?.options || [])].map((context) => ({ intention: option.id, context }))
    )];
    for (const choice of choices) {
      assert.equal((await worker.fetch(request({ ...inquiry, ...choice }), env)).status, 200);
    }
  } finally { send.mock.restore(); }
});
