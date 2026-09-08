# Contact form setup

The contact section keeps the existing teal surface, Geist typography, pill buttons,
rounded-2xl controls, section spacing and sm breakpoint. Intention cards and contextual radio chips retain
native keyboard behavior. Only name, email and message are required. Failed requests
preserve every field; success is announced and receives keyboard focus.

## Architecture

The repository has a default Next.js configuration, not `output: "export"`, and no
existing Cloudflare adapter or deployment manifest. The website build configuration
is unchanged. A separate small Cloudflare Worker handles `/api/contact` and calls
Cloudflare through `env.emailService.send()` without an SDK, database, or traditional server. This also works
with a separately configured static frontend. Do not replace your website's current
Cloudflare deployment command with the contact Worker's deployment command.

The five plain-language intentions and their optional follow-up questions, recipient, social links, availability and option labels come from
`app/data/portfolio.ts`. The Worker validates options and required fields, bounds
request size, checks allowed origins and discards honeypot submissions. A Cloudflare
rate-limit binding permits five attempts per IP per minute. This is basic abuse
protection, not a global hard quota: Cloudflare's limiter is per location and
permissive/eventually consistent. CORS is not bot authentication.

## Local development

1. Run `npm ci`.
2. Create `.env.local` at the repository root:
   ```dotenv
   NEXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8787/api/contact
   ```
3. Create `workers/contact/.dev.vars` (gitignored):
   ```dotenv
   CONTACT_FROM=contact@your-verified-domain.example
   ALLOWED_ORIGINS=http://localhost:3000
   ```
   Use a sender address on your Cloudflare-enabled email domain. No API key is needed.
4. Run `npm run contact:dev` and `npm run dev` in separate terminals.
5. Open `http://localhost:3000/#contact` and send an inquiry. By default Wrangler
   simulates delivery and writes the email content to local files; inspect its
   terminal output. It does not send a real email. To test real delivery locally,
   sign in with `npx wrangler login` and temporarily add `"remote": true` to the
   `emailService` binding in the Wrangler configuration.

Replying to a delivered email addresses the visitor. Success means Cloudflare
accepted the message, not proof of inbox delivery; check your inbox and Cloudflare
email logs after a deployed test.

For preview origins or a different local port, set `ALLOWED_ORIGINS` to a
comma-separated list of exact origins (scheme and port, no paths/trailing slashes).
Its production default is `portfolio.metadata.url`. Never allow localhost in the
production list unless intentionally needed.

## Cloudflare deployment

1. Enable Cloudflare Email Routing/Email Service for your sender domain and verify
   the destination email address from `portfolio.contact.email`.
2. The manifest declares `send_email` with the exact binding name `emailService`.
   Ensure this binding is on the HTTP contact Worker (`portfolio-contact`), not
   only on a separate inbound-email Worker. If your existing Worker has another
   name, update `name` in the manifest to match before deploying. Set `CONTACT_FROM`
   to a sender address on your enabled domain, for example `contact@dimitarstoyanov.dev`:
   ```sh
   npx wrangler login
   npx wrangler secret put CONTACT_FROM --config workers/contact/wrangler.jsonc
   ```
   This address is configuration, not a credential; a Worker environment variable
   also works. No Resend account or email API key is required. An existing
   `RESEND_API_KEY` secret is unused and may be removed.
   The recipient is always read from portfolio configuration, never request data.
   If you added sender/recipient restrictions in the dashboard, mirror them in the
   manifest before deployment so Wrangler preserves those restrictions.
3. If the frontend origin differs from `portfolio.metadata.url`, add
   `ALLOWED_ORIGINS` under `vars` in `workers/contact/wrangler.jsonc`.
4. Run `npm run contact:check`, then `npm run contact:deploy`. The checked-in
   manifest configures the rate-limit binding automatically; no KV database is
   needed. Namespace `1001` should be unique among other rate limiters in your
   account; change it if already used.
5. Set **the website's build environment variable**
   `NEXT_PUBLIC_CONTACT_ENDPOINT=https://portfolio-contact.<your-subdomain>.workers.dev/api/contact`
   using the actual URL Wrangler prints. Rebuild/redeploy the website using its
   existing pipeline. This public URL is the only client-side environment value.
   `CONTACT_FROM` belongs on the Worker, not in the frontend build settings.
6. Test an actual submission from the production website and check delivery.

Alternatively, configure a Cloudflare route for `/api/contact` to this Worker and
omit the public endpoint variable; the frontend defaults to that same-origin path.
The standalone workers.dev URL is simplest when the website's hosting setup is
managed elsewhere. No route is created automatically by this change.

## Verification

```sh
npm run typecheck
npm run lint
npm run build
npm run test:contact
npm run contact:check
npx playwright install chromium
npm run test:contact:browser
```

Browser tests use mocked email responses and never send email. Run them without a
real endpoint override (unset `NEXT_PUBLIC_CONTACT_ENDPOINT` or use `/api/contact`
when starting the test server). They exercise desktop/mobile layouts, validation,
intention changes, contextual answers, optional questions, keyboard completion, loading, retry and success focus.
Screenshots are saved in the ignored `test-results` directory. Worker tests mock
the `emailService.send` binding and cover delivery payloads, invalid input, body limits, honeypot, origin,
rate limiting, provider failures and missing sender configuration. `contact:check` bundles
the Worker without deploying it. Real delivery requires the Cloudflare setup above.

References: [Cloudflare rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/),
[Cloudflare email Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/),
[local email simulation](https://developers.cloudflare.com/email-service/local-development/sending/).
