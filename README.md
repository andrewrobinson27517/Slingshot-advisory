# Slingshot Advisory

A production-quality marketing + lead-generation website for **Slingshot Advisory**, a
boutique business consulting and digital-solutions firm in Rochester, MN.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4**, with a
conditional intake system, an integration-ready lead API, and a structured website
assistant. No fabricated metrics, testimonials, or credentials; licensing disclosures are
scoped to each service.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Nothing needs to be configured to run or deploy the marketing site. Copy `.env.example` to
`.env.local` to enable email, lead storage, or an LLM-backed assistant (see below).

## Structure

```
app/
  page.tsx                 Home
  tenant-advisory/         Commercial Tenant Advisory
  digital-solutions/       Websites & AI Solutions
  investment-analysis/     Real Estate Underwriting
  business-advisory/       Business & Capital Advisory
  our-work/                Portfolio (permission-gated)
  about/  resources/[slug] About · Resources + articles
  contact/                 Intake form (reads ?service=)
  privacy/  terms/         Legal templates (review before launch)
  api/intake/route.ts      Lead API (validation, rate limit, email/webhook/dev-log)
  sitemap.ts robots.ts icon.tsx opengraph-image.tsx
components/                UI, layout, shared, home, forms, intake, assistant
data/                      site, services, intake, resources, work, faq (content source)
lib/                       cn, validation (zod), ratelimit, schema (JSON-LD)
styles/globals.css         Tailwind v4 design tokens
```

Content lives in `data/*.ts` — edit services, packages, intake questions, articles, and
FAQs there without touching markup. **Prices appear in both `data/services.ts` and
`data/faq.ts` (the assistant) — update both together.**

## Lead intake — how it behaves

The Contact form adapts its questions to the selected service (progressive disclosure) and
posts to `/api/intake`, which:

1. Rate-limits by IP and runs a honeypot + time-trap for spam.
2. Validates with zod (client **and** server), enforcing per-service required fields.
3. Processes the lead through whatever is configured, in this order:
   - **Resend email** (owner notification + client acknowledgment) if `RESEND_API_KEY` is set.
   - **Webhook** (`LEAD_WEBHOOK_URL`) for storage in your CRM/Supabase/etc.
   - **Dev file log** (`./.leads/leads.jsonl`) in development only, so you can test end to end.
4. Returns success **only** when a lead was actually sent or stored. With nothing configured
   in production it returns an honest “not connected” response, and the form then offers a
   **pre-filled email** fallback — it never shows a fake success.

Leads carry a status model (`New → Needs Information → Qualified → Proposal Sent → Won →
In Progress → Completed → Lost`) in the data you store; wire a private, authenticated admin
view to manage them (see “Not yet built” below).

## Website purchase & booking ("Build My Website")

Visitors can buy a website package directly: **Starter $500** or **Business Website+ $750**
(a $500 deposit, $250 balance at the final milestone). Flow:

1. **`/get-started`** — pick a package, enter business info, agree to the project terms
   (`/terms#website-projects`). `components/checkout/CheckoutFlow.tsx`.
2. **`POST /api/orders`** — zod-validates, saves the order (dev `./.orders/orders.jsonl` and/or
   `LEAD_WEBHOOK_URL`), emails the owner, and:
   - **With Stripe configured** (`STRIPE_SECRET_KEY`) → creates a Checkout Session and returns the
     URL; the client redirects to Stripe. `lib/stripe.ts` (REST, no SDK).
   - **Without Stripe** → returns `payment_not_configured` and shows an honest "payment not
     connected" state (order saved, owner notified) — **never a fake payment**.
3. **`POST /api/stripe/webhook`** — verifies the signature (`STRIPE_WEBHOOK_SECRET`, HMAC) and,
   on `checkout.session.completed`, marks the order **Paid** and sends onboarding emails. Payment
   is confirmed **only** by the webhook — never by visiting the success URL.
4. **`/get-started/success`** → **`/get-started/schedule`** — a 30–60 min strategy call. No live
   calendar yet: it collects preferred times and emails the owner ("pending confirmation").

Order statuses: `pending_payment → paid → discovery_scheduled → materials_received →
in_development → review → launched` (or `cancelled`). See `lib/orders.ts`.

**Stripe setup:** add `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`, and register a webhook
endpoint at `{domain}/api/stripe/webhook` for `checkout.session.completed`. Serverless
filesystems are ephemeral — for durable orders in production, point `LEAD_WEBHOOK_URL` at your
store (or add a database) so the webhook can persist the Paid state.

## Website assistant

A bottom-right launcher (`components/assistant/Assistant.tsx`) answers from the curated
knowledge base in `data/faq.ts` (structured FAQ matching — no LLM needed) and always offers
a path to a human. To upgrade to an LLM-backed assistant, add a secure server route that
reads `ANTHROPIC_API_KEY` and constrains responses to the knowledge base — never expose the
key in the browser.

## Configuration (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap base URL |
| `RESEND_API_KEY` | Enables acknowledgment + notification emails |
| `LEAD_FROM_EMAIL` / `LEAD_NOTIFY_EMAIL` | Verified sender / where leads go |
| `LEAD_WEBHOOK_URL` | Optional: post each lead **and order** to your CRM/storage |
| `STRIPE_SECRET_KEY` | Enables real Checkout for website packages |
| `STRIPE_WEBHOOK_SECRET` | Required to verify payment and mark orders paid |
| `ANTHROPIC_API_KEY` | Optional: LLM-backed assistant (server-side only) |

## Deploy

Netlify (`netlify.toml` included, with `@netlify/plugin-nextjs`) or Vercel. Set the env
vars above in the host. The API route runs on the Node.js runtime.

## Known placeholders to confirm before launch

- **Contact details** in `data/site.ts` (email/phone) are launch placeholders.
- **Legal pages** (`/privacy`, `/terms`) are templates — have counsel review.
- **Our Work:** the Seven Medicine project is shown as a client project. Confirm the client
  has approved public use of their name; `SHOW_CLIENT_PROJECTS` in `app/our-work/page.tsx`
  (and the `permission` flag in `data/work.ts`) gate this.

## Not yet built (integration-ready, documented)

These were specified and are scaffolded for but intentionally not faked without credentials:

- **Authenticated owner admin dashboard** for leads, orders, payment status, strategy calls,
  and care subscriptions. The data model + statuses exist (`lib/orders.ts`); a real dashboard
  needs durable storage (Supabase/Postgres) + authentication/server-side authorization — not
  faked here. Until then, orders/leads are emailed to the owner and (in dev) logged to
  `./.orders` / `./.leads`.
- **Live calendar scheduling** (the strategy-call page collects preferred times today).
- **Recurring billing** for care plans (opt-in subscriptions via Stripe Billing).
- **Private, access-controlled document uploads** (object storage + signed URLs).
- **LLM-backed assistant** (structured FAQ ships today).

Brand usage is documented in **`BRAND_GUIDELINES.md`**.
- **Automated tests** for intake validation/routing.

---

© Slingshot Advisory. An affiliate of Slingshot Real Estate.
